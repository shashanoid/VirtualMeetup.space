import React from "react";
import Datetime from "react-datetime";

import "./dateTime.css";

class DateTimePicker extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { value: this.props.initialValue };
  }
  render() {
    return (
      <Datetime
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}

export default DateTimePicker;
