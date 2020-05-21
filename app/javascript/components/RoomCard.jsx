import React from "react";
import "./roomCard.css";

import { Link } from "react-router-dom";

class RoomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomURL: null,
    };
  }

  render() {
    let { roomType, host, roomTitle, roomId } = this.props;
    return (
      <Link
        to={`/meet/${roomType}/${roomTitle}/${host}/${roomId}`}
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <div onClick={() => this.openRoom()} class="card-container">
          <div class="card-snapshot">
            <img
              className="card-snapshot-image"
              src="https://miro.medium.com/max/3416/1*5nbbUSIRdpM5ihCwEDrN4g.jpeg"
            ></img>{" "}
          </div>
          <div class="card-divider"> </div>
          <div class="card-title">
            {this.props.roomTitle.split("_").join(" ")}
          </div>
        </div>
      </Link>
    );
  }
}

export default RoomCard;
