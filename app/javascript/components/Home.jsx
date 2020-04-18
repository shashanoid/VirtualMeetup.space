import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const autoBind = require("auto-bind");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Home extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isAccountDetailsPage: false,
      userLoggedIn: true,
    };
  }

  componentDidMount() {
    //[TODO]
  }

  render() {
    let { isAccountDetailsPage, userLoggedIn } = this.state;
    return (
      <div class="container">
        <div className="row title-container">
          <div className="col-auto homepage-title">
            {isAccountDetailsPage ? "ACCOUNT" : "HOME"}
          </div>
          <div className="col profile-icon-container">
            <div className="profile-icon">
              {userLoggedIn ? (
                <div className="dropdown-content">
                  <div className="dropdown-link">
                    {isAccountDetailsPage ? "Home" : "Account"}
                  </div>
                  <div className="dropdown-link">Logout</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="row tagline-container">Work Better Together.</div>

        <div className="row cards-container">
          <div className="browse-card">BROWSE</div>

          <div className="create-card">CREATE</div>
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
