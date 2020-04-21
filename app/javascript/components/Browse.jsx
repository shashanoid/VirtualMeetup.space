import React from "react";
import "./browse.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const autoBind = require("auto-bind");

import { getAllRooms } from "../api/utils";
import { Link } from "react-router-dom";

import RoomCard from "./RoomCard";

class Browse extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      userRooms: [{ title: "Loading" }],
    };
  }

  async componentDidMount() {
    var userRooms = await getAllRooms();
    await this.setState({ userRooms: userRooms });
  }

  render() {
    let { userRooms } = this.state;
    return (
      <div className="container">
        <div className="row title-container">
          <div className="col-auto browse-title">
            <Link style={{ textDecoration: "none", color: "#000000" }} to="/">
              HOME
            </Link>
          </div>
          <div className="col profile-icon-container"></div>
        </div>

        <div className="room-container">
          <div className="my-rooms">My Rooms</div>

          <div className="my-rooms-container">
            {userRooms.map((_item) => (
              <RoomCard
                host={_item.host}
                roomId={_item.room_id}
                roomType={_item.room_type}
                roomTitle={_item.title.split("_").join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { test, userInfo } = state;
  return { test, userInfo };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Actions go here
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
