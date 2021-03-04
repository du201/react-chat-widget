import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalState } from 'src/store/types';
const send_activate = require('../../../../../../../assets/send_button_activate.svg') as string;
const send_deactivate = require('../../../../../../../assets/send_button_deactivate.svg') as string;

import './style.scss';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmileWink } from '@fortawesome/free-regular-svg-icons'


type Props = {
  placeholder: string;
  disabledInput: boolean;
  autofocus: boolean;
  sendMessage: (event: any) => void;
  buttonAlt: string;
  onTextInputChange?: (event: any) => void;
  showEmoji: boolean;
}

function Sender({ sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, buttonAlt, showEmoji }: Props) {
  let [openEmoji, setOpenEmoji] = useState(false);
  let [input, setInput] = useState("");
  let [mouseOverEmoji, setMouseOverEmoji] = useState(false);

  const showChat = useSelector((state: GlobalState) => state.behavior.showChat);
  // const inputRef = useRef(null);
  // @ts-ignore
  // useEffect(() => { if (showChat && autofocus) inputRef.current?.focus(); }, [showChat]);

  useEffect(() => {
    if (openEmoji) {
      document.addEventListener("click", closeEmojiSelectMenu);
    }
  }, [openEmoji]);

  let closeEmojiSelectMenu = () => {
    setOpenEmoji(!openEmoji);
    document.removeEventListener("click", closeEmojiSelectMenu);
    console.log("closed");
  };

  let openEmojiSelectMenu = () => {
    setOpenEmoji(!openEmoji);
    console.log("opened");
  };

  let handleSelectEmoji = (emoji) => {
    console.log(emoji);
    console.log(emoji.native);
    let newInput = input + emoji.native;
    setInput(newInput);
  };

  let handleMouseOverEmoji = () => {
    setMouseOverEmoji(true);
  }

  let handleMouseLeaveEmoji = () => {
    setMouseOverEmoji(false);
  }

  // A hack to clear the textbox after type "ENTER"
  let handleTextInput = (e) => {
    if (e.key === "Enter") {
      setTimeout(() => setInput(""), 10); // this is requried to not block sending messege
    }
  } 

  return (
    <form className="rcw-sender" onSubmit={sendMessage}>
      <input
        type="text"
        className="rcw-new-message"
        name="message"
        // ref={inputRef}
        placeholder={placeholder}
        disabled={disabledInput}
        autoFocus={autofocus}
        autoComplete="off"
        value={input}
        onKeyPress={(event) => handleTextInput(event)}
        onChange={(e) => setInput(e.target.value)}
        // onChange={onTextInputChange}
      />
      <span onClick={() => openEmojiSelectMenu()}>
        {showEmoji ? 
          <span onMouseEnter={handleMouseOverEmoji} 
                onMouseOut={handleMouseLeaveEmoji} 
                style={mouseOverEmoji ? {display:"inline-block", width:"2rem", height:"2rem", backgroundColor:"#E2E2E2"} : {display:"inline-block", width:"2rem", height:"2rem"}}
                className="d-flex justify-content-center align-items-center">
            {mouseOverEmoji ? 

              String.fromCodePoint(0x1f609) :
              <FontAwesomeIcon icon={faSmileWink} style={{fontSize:"1.2rem"}}/>
              // <span style={{position:"relative", bottom:"2px", left:"2px"}}>
            }
          </span> 
          : null}
      </span>
      {openEmoji ? 
        <Picker 
          set='apple' 
          onSelect={handleSelectEmoji}
          emojiTooltip={true}
          showPreview={false}
          showSkinTones={false}
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '20px',
            fontSize: "0.8rem",
            width: "25rem"
          }}
        /> : null}
      <button type="submit" className={input === "" ? "rcw-send-activate grey-background" : "rcw-send-activate"}>
        <img src={input === "" ? send_deactivate : send_activate} className={input === "" ? "rcw-send-icon-activate" : "rcw-send-icon-activate"} alt={buttonAlt} />
        {/* <img src={send_deactivate} className="rcw-send-icon" alt={buttonAlt} /> */}
      </button>
    </form>
  );
}

export default Sender;
