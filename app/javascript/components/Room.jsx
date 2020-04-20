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
    let roomId = splitURL[5];

    let roomDetails = await createRoom(roomType, roomId);
    await this.props.roomInfoAction(roomDetails);

    console.log(roomDetails);
  }

  render() {
    return (
      <div>
        <h1>Room Created !</h1>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { test, room } = state;
  return { test, room };
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
