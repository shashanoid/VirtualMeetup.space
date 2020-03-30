import React from "react";
import DateTimePicker from "./common/DateTimePicker";
import "./event.css";

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null
    };
  }

  render() {
    return (
      <div>
        <h1 className="display-4">Create Event</h1>
        <hr className="my-4" />

        <div className="event-form-container">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text event-input-title">
                Event Name
              </span>
            </div>

            <input
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            ></input>
          </div>
          <br />

          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text event-input-title">
                Event Details
              </span>
            </div>

            <textarea
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              rows="6"
            ></textarea>
          </div>
          <br />

          <h3 className="display-5">Start Time</h3>
          <DateTimePicker />
          <br />

          <h3 className="display-5">End Time</h3>
          <DateTimePicker />
        </div>

        <br />
        <button>Submit</button>
      </div>
    );
  }
}

export default Event;
