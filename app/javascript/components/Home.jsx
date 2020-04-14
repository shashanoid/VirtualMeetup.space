import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
          <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
              <h1 className="display-4">Browse Meetups</h1>
              <hr className="my-4" />

              <Link
                to="/event/create_event/"
                className="btn custom-button"
                role="button"
              >
                <h1 className="display-4">Create</h1>
              </Link>
              <hr className="my-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
