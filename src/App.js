import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Box from "./Box";
function App() {
  const [count, setCount] = useState({ name: "asolole", value: "asik" });
  // const [style,setStyle] = useState({
  //   display: "none"
  // })
  const [show,setShow] = useState('close')
  useEffect(() => {
    const client = new W3CWebSocket("wss://sociabuzz.com:8283");
    var data = {
      user_id: 4005709989,
      recipient_id: 4005709989,
      message: null,
    };
    client.onopen = () => {
      console.log("WebSocket Successfully Connected");
      console.log("Send Data");
      client.send(JSON.stringify(data));
    };
    client.onmessage = (message) => {
      //  // console.log(message.data.message);
      const json = JSON.parse(message.data);
      // console.log(json.message)
      if (json.message === "notif" || json.message === "test") {
        delete json["tts"];
        console.log(json);
        setCount({
          name: json.fullname,
          value: json.note,
        });
        setShow('open');
        setTimeout(function () {
          setShow('close');
        }, 10000);
      }}
    },[]);

    return (
      <div className="oke" >
        <button onClick={()=>setShow('close')} >OK</button>
        <button onClick={()=>setShow('open')} >OYE</button>
        <div className={show}><Box message={count} /></div>
      </div>
    );
}

export default App;
