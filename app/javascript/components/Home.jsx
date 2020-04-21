import React from "react";
import { Link } from "react-router-dom";
import { snakeCase } from "snake-case";
import "./home.css";

const autoBind = require("auto-bind");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// API utils
import { getUserInfo } from "../api/utils";
import { createRoom } from "../api/utils";

// Redux
import { roomInfoAction } from "../actions/roomInfoAction";
import { userInfoAction } from "../actions/userInfoAction";

// Image Assets
import googleSignInImage from "../../assets/images/google-signin.png"

class Home extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isAccountDetailsPage: false,
      userLoggedIn: false,
      showSignUp: false,
      isCreating: false,
      profilePicture: null,
    };
  }

  async componentDidMount() {
    var userInfoResponse = await getUserInfo();
    await this.props.userInfoAction(userInfoResponse);
    if (!userInfoResponse.error) {
      this.setState({
        userLoggedIn: true,
        profilePicture: userInfoResponse.picture,
      });
    } else {
      console.log("ERROR");
    }
  }

  //Handle Browse
  handleBrowse() {
    console.log("browse");
  }

  // Handles when create card is clicked
  handleCreate() {
    let { userLoggedIn } = this.state;
    {
      userLoggedIn
        ? this.setState({ isCreating: true })
        : this.setState({ showSignUp: true });
    }
  }

  // Creates a room
  async handleRoomCreate(roomType, roomTitle, roomHost, roomId, hostEmail) {
    let roomData = {
      title: roomTitle,
      host: roomHost,
      room_id: roomId,
      room_type: roomType,
      host_email: hostEmail,
    };

    let roomInfo = await createRoom(roomData);
    await this.props.roomInfoAction(roomInfo);
  }

  // Inside of the create card
  renderCreate() {
    let { userInfo } = this.props;

    var randomRoomKey =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    var roomTitle = "Some Room Name";
    var roomTitle = snakeCase(roomTitle);

    var roomHost = userInfo.user.first_name;
    var roomHost = snakeCase(roomHost);

    var hostEmail = userInfo.user.email;
    return (
      <div className="create-container">
        <div className="create-public">
          <Link
            onClick={() =>
              this.handleRoomCreate(
                "public",
                roomTitle,
                roomHost,
                randomRoomKey,
                hostEmail
              )
            }
            to={`/meet/public/${roomTitle}/${roomHost}/${randomRoomKey}`}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            Public
          </Link>
        </div>

        <div className="create-private">
          <Link
            onClick={() =>
              this.handleRoomCreate(
                "private",
                roomTitle,
                roomHost,
                randomRoomKey,
                hostEmail
              )
            }
            to={`/meet/private/${roomTitle}/${roomHost}/${randomRoomKey}`}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            Private
          </Link>
        </div>
      </div>
    );
  }

  renderSignUp() {
    return (
      <div
        onClick={() => (window.location.href = "/login")}
        className="signup-container"
      >
        SIGN IN
      </div>
    );
  }

  async handleLogout() {
    await this.setState({
      userLoggedIn: false,
    });
    window.location.href = "/logout";
  }

  async handleAccountPage() {
    let { isAccountDetailsPage } = this.state;
    await this.setState({
      isAccountDetailsPage: !isAccountDetailsPage,
    });
  }

  render() {
    let {
      isAccountDetailsPage,
      userLoggedIn,
      showSignUp,
      isCreating,
      profilePicture,
    } = this.state;

    return (
      <div className="container">
        <div className="row title-container">
          <div className="col-auto homepage-title">
            <Link
              to={isAccountDetailsPage ? "/" : "/"}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              {isAccountDetailsPage ? "ACCOUNT" : "VMS"}
            </Link>
          </div>
          <div className="col profile-icon-container">
            <div className="profile-icon">
              {userLoggedIn ? (
                <img className="profile-icon" src={profilePicture} />
              ) : null}
              {userLoggedIn ? (
                <div className="dropdown-content">
                  <div
                    onClick={() => this.handleAccountPage()}
                    className="dropdown-link"
                  >
                    {isAccountDetailsPage ? "Home" : "Account"}
                  </div>
                  <div
                    onClick={() => this.handleLogout()}
                    className="dropdown-link"
                  >
                    Logout
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="info-cards-container">
          <div className="info-container">
            <div className="info-tagline">Work Better Together.</div>
            <div className="info-description">
              Create co-working, studying, coding, and workout spaces
            </div>

            <div className="social-login-buttons">
              {userLoggedIn ? null : (
                <img
                  onClick={() => (window.location.href = "/login")}
                  src={googleSignInImage}
                  width="200"
                />
              )}
            </div>
          </div>
          <div className="middle-line"></div>

          <div className="cards-container">
            <div onClick={() => this.handleCreate()} className="create-card">
              {showSignUp
                ? this.renderSignUp()
                : isCreating
                ? this.renderCreate()
                : "CREATE"}
            </div>
            <Link
              style={{ textDecoration: "none", color: "#000000" }}
              className="browse-card"
              to={"/browse"}
            >
              <div onClick={() => this.handleBrowse()}>BROWSE</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { userInfo } = state;
  return { userInfo };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Actions go here
      userInfoAction,
      roomInfoAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
