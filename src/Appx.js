// import logo from './logo.svg';
import "./App.css";
import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./fonts/KoreanKRSM.woff";
import Box from "./Box";
const client = new W3CWebSocket("wss://sociabuzz.com:8283");
var data = {
  user_id: 4005709989,
  recipient_id: 4005709989,
  message: null,
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "aji",
      value: "asli",
      style: {
        display: "none"
      }
    };
  }
  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Successfully Connected");
      console.log("Send Data");
      client.send(JSON.stringify(data));
    };
    client.onmessage = (message) => {
      //  // console.log(message.data.message);
      const json = JSON.parse(message.data)
      // console.log(json.message)
      if (json.message === "notif" || json.message === "test") {
            delete json["tts"];
            console.log(json);
            this.setState({name: json.fullname, value: json.note,style: {
              display: "block"
            }})
            setTimeout(function(){this.setState({
              display: "none"
            })},3000);
          }
    };
  }
  render() {
    return (
      <div className="oke" style={this.state.style}>
        <button
          onClick={() => this.setState({ name: "asolole", value: "asik" })}
        >
          OEE
        </button>
        <Box message={this.state} />
      </div>
    );
  }
}

export default App;
