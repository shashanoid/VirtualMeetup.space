import React from "react";

const autoBind = require("auto-bind");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getRoom } from "../api/utils";

// Redux Actions
import { roomInfoAction } from "../actions/roomInfoAction";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteLink: null,
      isHost: false,
    };
  }

  async componentDidMount() {
    let roomLink = window.location.href.split("/");
    let roomType = roomLink[4];
    let roomTitle = roomLink[5];
    let roomHost = roomLink[6];
    let roomId = roomLink[7];

    let roomData = {
      title: roomTitle,
      host: roomHost,
      room_id: roomId,
      room_type: roomType,
    };

    let roomInfo = await getRoom(roomId);
    await this.props.roomInfoAction(roomInfo);

    if (roomHost != "attend") {
      this.setState({ isHost: true });
    } else {
      // User is attendee
      console.log("Attendee");
    }
  }

  createInviteLink() {
    let roomLink = window.location.href.split("/");
    roomLink[6] = "attend";
    this.setState({ inviteLink: roomLink.join("/") });
  }

  render() {
    let { isHost } = this.state;
    return (
      <div>
        <h1>Room Created !</h1>
        {isHost ? (
          <button onClick={() => this.createInviteLink()}> Invite Link</button>
        ) : null}
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
