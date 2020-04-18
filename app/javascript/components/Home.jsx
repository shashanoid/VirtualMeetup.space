import React from "react";
import "./home.css";

const autoBind = require("auto-bind");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// API utils
import { getUserInfo } from "../api/utils";

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
    let { userLoggedIn } = this.state;
    var userInfoResponse = await getUserInfo();
    if (!userInfoResponse.error) {
      this.setState({
        userLoggedIn: true,
        profilePicture: userInfoResponse.picture,
      });
      console.log(userInfoResponse);
    } else {
      console.log("ERROR");
    }
  }

  handleCreate() {
    let { userLoggedIn } = this.state;
    {
      userLoggedIn
        ? this.setState({ isCreating: true })
        : this.setState({ showSignUp: true });
    }
  }

  renderCreate() {
    return (
      <div className="create-container">
        <div className="create-public">Public</div>

        <div className="create-private">Private</div>
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
  const { test } = state;
  return { test };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Actions go here
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
