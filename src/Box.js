import React from "react";
import "./style.css";
import box from "./box.png";
import avatar from "./avatar.png";

import "./fonts/KoreanKRSM.ttf";

const Box = ({ message }) => {
  return (
    <table className="container">
      <tbody>
        <tr>
          <td className="avatar">
            <img className="avatar" src={avatar} alt="avatar" />
          </td>
          <td>
            <img className="Box" src={box} alt="BoxMessage" />
            <div className="rotate">{message.name}</div>
            <div className="first-txt">{message.value}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Box;
