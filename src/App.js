import React, { useState, useEffect , Link } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Box from "./Box";
function App() {
  const id = JSON.parse(localStorage.getItem('data')).id
  const [count, setCount] = useState({ name: "asolole", value: "asik" });
  const [show,setShow] = useState('close')
  useEffect(() => {
    const client = new W3CWebSocket("wss://sociabuzz.com:8283");
    var data = {
      user_id: parseInt(id),
      recipient_id: parseInt(id),
      message: null,
    };
    client.onopen = () => {
      console.log("WebSocket Successfully Connected");
      console.log("Send Data : " + JSON.stringify(data));
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
        <button onClick={()=>setShow('close')} >CLOSE</button> 
        <span> | </span>
        <button onClick={()=>setShow('open')} >OPEN</button>
        <span> | </span>
        <a href="setting"><button>Setting</button></a>
        <div className={show}><Box message={count} /></div>
      </div>
    );
}

export default App;
