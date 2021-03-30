import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleChat, addUserMessage } from '../../store/actions';
import { AnyFunction } from '../../utils/types';

import WidgetLayout from './layout';

type Props = {
  title: string;
  titleAvatar?: string;
  subtitle: string;
  senderPlaceHolder: string;
  profileAvatar?: string;
  showCloseButton: boolean;
  fullScreenMode: boolean;
  autofocus: boolean;
  customLauncher?: AnyFunction;
  handleNewUserMessage: AnyFunction;
  handleQuickButtonClicked?: AnyFunction;
  handleTextInputChange: (event: any) => void;
  chatId: string;
  launcherOpenLabel: string;
  launcherCloseLabel: string;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  imagePreview?: boolean;
  zoomStep?: number;
  handleSubmit?: AnyFunction;
  showEmoji: boolean;
  input: string;
  setInput: AnyFunction;
  handleSelectEmoji: AnyFunction;
  handleRoomSelect: (any) => any;
  currentRoom: string;
  courseChatRooms: string[];
  privateChatRooms: string[];
  handleScrollToTop: any;
}

function Widget({
  title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  profileAvatar,
  showCloseButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  handleNewUserMessage,
  handleQuickButtonClicked,
  handleTextInputChange,
  chatId,
  launcherOpenLabel,
  launcherCloseLabel,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  handleSubmit,
  showEmoji,
  input,
  setInput,
  handleSelectEmoji,
  handleRoomSelect,
  currentRoom,
  courseChatRooms,
  privateChatRooms,
  handleScrollToTop
}: Props) {
  // let [input, setInput] = useState("");
  const dispatch = useDispatch();

  const toggleConversation = () => {
    dispatch(toggleChat());
  }

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const userInput = event.target.message.value;

    //if no message
    if (!userInput.trim()) {
      return;
    }

    handleSubmit?.(userInput);
    // dispatch(addUserMessage(userInput));
    handleNewUserMessage(userInput);
    event.target.message.value = '';
  }

  const onQuickButtonClicked = (event, value) => {
    event.preventDefault();
    handleQuickButtonClicked?.(value)
  }

  return (
    <WidgetLayout
      onToggleConversation={toggleConversation}
      onSendMessage={handleMessageSubmit}
      onQuickButtonClicked={onQuickButtonClicked}
      title={title}
      titleAvatar={titleAvatar}
      subtitle={subtitle}
      senderPlaceHolder={senderPlaceHolder}
      profileAvatar={profileAvatar}
      showCloseButton={showCloseButton}
      fullScreenMode={fullScreenMode}
      autofocus={autofocus}
      customLauncher={customLauncher}
      onTextInputChange={handleTextInputChange}
      chatId={chatId}
      launcherOpenLabel={launcherOpenLabel}
      launcherCloseLabel={launcherCloseLabel}
      sendButtonAlt={sendButtonAlt}
      showTimeStamp={showTimeStamp}
      imagePreview={imagePreview}
      zoomStep={zoomStep}
      showEmoji={showEmoji}
      input={input}
      setInput={setInput}
      handleSelectEmoji={handleSelectEmoji}
      handleRoomSelect={handleRoomSelect}
      currentRoom={currentRoom}
      courseChatRooms={courseChatRooms}
      privateChatRooms={privateChatRooms}
      handleScrollToTop={handleScrollToTop}
    />
  );
}

export default Widget;
