import React, { Component } from "react";
import io from "socket.io-client";
import "./styles.css";
import Message from "./Message";

export default class Chat extends Component {
  state = {
    handle: "",
    message: "",
    socket: io("http://localhost:3001"),
    messages: [{ message: "", handle: "" }],
    typing: ""
  };
  whenChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  whenChangeM = () => {
    this.state.socket.emit("typing", {
      typing: this.state.handle
    });
    this.state.socket.on("typing", this.typing);
  };
  chat = data => {
    this.setState({
      messages: this.state.messages.concat({
        message: data.message,
        handle: data.handle
      }),
      typing: ""
    });
  };
  typing = data => {
    this.setState({
      typing: data.typing + " is typing..."
    });
  };
  whenSubmit = () => {
    this.state.socket.emit("chat", {
      message: this.state.message,
      handle: this.state.handle
    });
    this.setState({ message: "" });
  };
  UNSAFE_componentWillMount() {
    this.state.socket.on("chat", this.chat);
  }
  render() {
    return (
      <div id="mario">
        <h2>Hatooooooooooo! Yeh Mera Chat xD</h2>
        <div id="chat-window">
          <div id="output">
            {this.state.messages.map((msg, i) =>
              i !== 0 ? (
                <Message key={i} handle={msg.handle} message={msg.message} />
              ) : (
                <React.Fragment key={i}></React.Fragment>
              )
            )}
          </div>
          <div id="feedback">
            <p>
              <em>{this.state.typing}</em>
            </p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Handle"
          onChange={this.whenChange}
          value={this.state.handle}
          name="handle"
          required
        />
        <input
          type="text"
          placeholder="Message"
          onChange={this.whenChange}
          onKeyPress={this.whenChangeM}
          value={this.state.message}
          name="message"
          required
        />
        <button onClick={this.whenSubmit}>Send</button>
      </div>
    );
  }
}
