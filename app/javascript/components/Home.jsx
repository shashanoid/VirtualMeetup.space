import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const autoBind = require("auto-bind");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// API utils
import { getUserInfo } from "../api/utils";
import { userInfoAction } from "../actions/userInfoAction";

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

  // Handles when create card is clicked
  handleCreate() {
    let { userLoggedIn } = this.state;
    {
      userLoggedIn
        ? this.setState({ isCreating: true })
        : this.setState({ showSignUp: true });
    }
  }

  // Inside of the create card
  renderCreate() {
    var randomRoomKey =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    return (
      <div className="create-container">
        <div className="create-public">
          <Link
            to={`/meet/public/${randomRoomKey}`}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            Public
          </Link>
        </div>

        <div className="create-private">
          <Link
            to={`/meet/private/${randomRoomKey}`}
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
        SIGN IN GOOGLE
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
            {isAccountDetailsPage ? "ACCOUNT" : "HOME"}
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

        <div className="row tagline-container">Work Better Together.</div>

        <div className="row cards-container">
          <div className="browse-card">BROWSE</div>

          <div onClick={() => this.handleCreate()} className="create-card">
            {showSignUp
              ? this.renderSignUp()
              : isCreating
              ? this.renderCreate()
              : "CREATE"}
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
