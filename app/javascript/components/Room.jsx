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
      room: "nix",
      name: "nix",
      password: "ok",
      loading: true,
    };

    this.loading = this.state.loading;

    const jitsiContainerStyle = {
      display: this.loading ? "none" : "block",
      width: "100%",
      height: "100%",
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

  startConference() {
    try {
      const domain = "meet.jit.si";
      const options = {
        roomName: "roomName",
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
        setLoading(false);
        api.executeCommand("displayName", "MyName");
      });
    } catch (error) {
      console.error("Failed to load Jitsi API", error);
    }
  }

  async componentDidMount() {
    await this.startConference();
  }

  render() {
    let { isHost, room, name, password } = this.state;
    return (
      <div className="container">
        <div className="row title-container">
          <div className="col-auto room-title">
            <Link style={{ textDecoration: "none", color: "#000000" }} to="/">
              ROOM
            </Link>
          </div>
          <div className="col profile-icon-container"></div>
        </div>

        <div id="jitsi-container" style={{ width: "100%", height: "100%" }} />
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
