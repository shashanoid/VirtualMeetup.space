import React from "react";

const autoBind = require("auto-bind");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { createRoom } from "../api/utils";

// Redux Actions
import { roomInfoAction } from "../actions/roomInfoAction";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let splitURL = window.location.href.split("/");
    let roomType = splitURL[4];
    let roomTitle = splitURL[5];
    let roomHost = splitURL[6];
    let roomId = splitURL[7];

    let roomData = {
      title: roomTitle,
      host: roomHost,
      room_id: roomId,
      room_type: roomType,
    };

    let roomInfo = await createRoom(roomData);
    await this.props.roomInfoAction(roomInfo);

    console.log(roomInfo);
  }

  render() {
    return (
      <div>
        <h1>Room Created !</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { test, room, userInfo } = state;
  return { test, room, userInfo };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // Actions go here
      roomInfoAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Room);
