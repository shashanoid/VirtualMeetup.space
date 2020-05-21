import React, { useState, useEffect } from "react";
import "./room.css";

const autoBind = require("auto-bind");
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getRoom } from "../api/utils";
import { Link } from "react-router-dom";

// Redux Actions
import { roomInfoAction } from "../actions/roomInfoAction";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteLink: null,
      isHost: false,
      roomName: "",
      roomKey: "",
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
      await this.setState({
        isHost: true,
        roomName: roomInfo.title,
        roomKey: roomInfo.room_id,
      });
    } else {
      // User is attendee
      console.log("Attendee");
    }

    const api = await this.startConference(roomInfo.title, roomInfo.room_id);
  }

  // async componentDidMount(){
  //   await this.api.executeCommand('password', 'Nice One')
  // }

  // createInviteLink() {
  //   let roomLink = window.location.href.split("/");
  //   roomLink[6] = "attend";
  //   this.setState({ inviteLink: roomLink.join("/") });
  // }

  // Start Jitsi conference
  startConference(roomName, roomKey) {
    try {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomKey,
        password: roomKey,
        height: 400,
        parentNode: document.getElementById("jitsi-container"),
        interfaceConfigOverwrite: {
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false,
        },
        configOverwrite: {
          disableSimulcast: false,
        },
      };

      const api = new JitsiMeetExternalAPI(domain, options);
      api.addEventListener("videoConferenceJoined", () => {
        console.log("Local User Joined");
        api.executeCommand("displayName", "MyName");
      });
      return api;
    } catch (error) {
      console.error("Failed to load Jitsi API", error);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row title-container">
          <div className="col-auto room-title">
            <Link style={{ textDecoration: "none", color: "#000000" }} to="/">
              HOME
            </Link>
          </div>
          <div className="col profile-icon-container"></div>
        </div>

        <div className="jitsi-container">
          <div id="jitsi-container" style={{ width: "100%", height: "100%" }} />
        </div>
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
