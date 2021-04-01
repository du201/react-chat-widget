import React from 'react';
import cn from 'classnames';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';

import { AnyFunction } from '../../../../utils/types';

import './style.scss';

type Props = {
  title: string;
  subtitle: string;
  senderPlaceHolder: string;
  showCloseButton: boolean;
  disabledInput: boolean;
  autofocus: boolean;
  className: string;
  sendMessage: AnyFunction;
  toggleChat: AnyFunction;
  profileAvatar?: string;
  titleAvatar?: string;
  onQuickButtonClicked?: AnyFunction;
  onTextInputChange: (event: any) => void;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  showEmoji: boolean;
  input: string;
  setInput: AnyFunction;
  handleSelectEmoji: AnyFunction;
  handleRoomSelect: (any) => any;
  currentRoom: string;
  courseChatRooms: string[];
  privateChatRooms: string[];
  handleScrollToTop: any;
  loading: boolean;
};

function Conversation({
  title,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  disabledInput,
  autofocus,
  className,
  sendMessage,
  toggleChat,
  profileAvatar,
  titleAvatar,
  onQuickButtonClicked,
  onTextInputChange,
  sendButtonAlt,
  showTimeStamp,
  showEmoji,
  input,
  setInput,
  handleSelectEmoji,
  handleRoomSelect,
  currentRoom,
  courseChatRooms,
  privateChatRooms,
  handleScrollToTop,
  loading
}: Props) {
  return (
    <div className={cn('rcw-conversation-container', className)} aria-live="polite">
      <Header
        title={title}
        subtitle={subtitle}
        toggleChat={toggleChat}
        showCloseButton={showCloseButton}
        titleAvatar={titleAvatar}
        handleRoomSelect={handleRoomSelect}
        currentRoom={currentRoom}
        courseChatRooms={courseChatRooms}
        privateChatRooms={privateChatRooms}
      />
      <Messages
        profileAvatar={profileAvatar}
        showTimeStamp={showTimeStamp}
        handleScrollToTop={handleScrollToTop}
        loading={loading}
      />
      <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
      <Sender
        sendMessage={sendMessage}
        placeholder={senderPlaceHolder}
        disabledInput={disabledInput}
        autofocus={autofocus}
        onTextInputChange={onTextInputChange}
        buttonAlt={sendButtonAlt}
        showEmoji={showEmoji}
        input={input}
        setInput={setInput}
        handleSelectEmoji={handleSelectEmoji}
      />
    </div>
  );
}

export default Conversation;
