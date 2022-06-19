import React, { Component } from "react";
import Box from "./Box";
import Setting from "./menu/Setting";
var ws_url = "wss://sociabuzz.com:8283";
const dataclient = JSON.parse(localStorage.getItem("data"));
const id = parseInt(dataclient.id);
export class Ws extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "asolole",
      value: "asik",
      isShow: true,
      isShowSetting: false,
      dataFromServer: {},
    };
  }
  ws = new WebSocket(ws_url); //initiate ws
  openConnection() {
    this.ws.onopen = () => {
      const data = JSON.stringify({
        user_id: id,
        recipient_id: id,
        message: null,
      });
      // on connecting, do nothing but log it to the console
      console.log("Connected to -> ", ws_url);
      this.ws.send(data);
      console.log("Sended ->", data);
    };
  }
  Message() {
    this.ws.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      this.setState({ dataFromServer: message });

      if (message.message === "notif" || message.message === "test") {
        console.log(message);
        this.setState({
          name: message.fullname,
          value: message.note,
        });
        this.setState({ isShow: true });
        if (dataclient.tts && dataclient.notif) {
          //notif and tts on
          console.log();
          const suara = [
            new Audio(
              "https://sociabuzz.s3.ap-southeast-1.amazonaws.com//files/profile/influencer/wang/1655282891-arigato_dattebayo .mp3"
            ),
            new Audio("data:audio/wav;base64," + message.tts),
          ];
          this.playSound(suara);
        } else if (dataclient.tts) {
          this.playSound([new Audio("data:audio/wav;base64," + message.tts)]);
        } else if (dataclient.notif) {
          this.playSound([
            new Audio(
              "https://sociabuzz.s3.ap-southeast-1.amazonaws.com//files/profile/influencer/wang/1655282891-arigato_dattebayo .mp3"
            ),
          ]);
        }
        setTimeout(() => this.setState({ isShow: false }), dataclient.timeout);
      }
    };
  }
  closeConnection() {
    this.ws.close(); //close ws connection
    console.log("Closed ws connection");
  }
  check() {
    if (this.ws !== undefined) {
      if (this.ws.readyState !== 1 && this.ws.readyState !== 0) {
        //check if ws still connected, 1 = connected / 0 =connecting /3 =disconnect
        console.log("Trying....");
        this.ws = new WebSocket(ws_url);
        this.ws.onopen = () => {
          const data = {
            user_id: id,
            recipient_id: id,
            message: "reconect",
          };
          this.ws.send(JSON.stringify(data));
          console.log("Reconnected");
          console.log("Sended ->", data);
        };
        this.Message();
      }
    }
  }
  playSound(audio) {
    var i = 0;
    while (i < audio.length) {
      console.log("Playing : " + i);
      audio[i].play();
      setTimeout(() => {
        console.log(audio[i])
        if (typeof audio[i] != "undefined") {
          audio[i].pause();
          audio[i].currentTime = 0;
        }
      }, dataclient.timeout);
      i++;
    }
  }

  componentDidMount() {
    this.openConnection();
    this.Message();
    setInterval(() => this.check(), 3000); //check connection every 3s
  }
  componentWillUnmount() {
    this.closeConnection(); //close when unmount
  }
  render() {
    return (
      <div>
        <div className="button-dev">
          <button onClick={() => this.setState({ isShow: !this.state.isShow })}>
            OPEN/CLOSE
          </button>
          <button
            onClick={() =>
              this.setState({ isShowSetting: !this.state.isShowSetting })
            }
          >
            Setting
          </button>
          <button onClick={() => this.closeConnection()}> Close WS</button>
          <button onClick={() => window.location.reload()}>Refresh</button>;
        </div>
        <div className={this.state.isShow ? "open" : "close"}>
          <Box message={this.state} />
        </div>
        <div className={this.state.isShowSetting ? "open" : "close"}>
          <Setting />
        </div>
      </div>
    );
  }
}
export default Ws;
