import React from "react";

export default class Message extends React.Component {
  render() {
    return (
      <p>
        <strong> {this.props.handle}: </strong>
        {this.props.message}
      </p>
    );
  }
}
