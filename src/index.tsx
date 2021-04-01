import React from 'react';
import { Provider } from 'react-redux';

import Widget from './components/Widget';

import store from './store';

import { AnyFunction } from './utils/types';

type Props = {
  handleNewUserMessage: AnyFunction;
  handleQuickButtonClicked?: AnyFunction;
  title?: string;
  titleAvatar?: string;
  subtitle?: string;
  senderPlaceHolder?: string;
  showCloseButton?: boolean;
  fullScreenMode?: boolean;
  autofocus?: boolean;
  profileAvatar?: string;
  launcher?: AnyFunction;
  handleTextInputChange: (event: any) => void;
  chatId?: string;
  launcherOpenLabel?: string,
  launcherCloseLabel?: string,
  sendButtonAlt?: string;
  showTimeStamp?: boolean;
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
  loading: boolean;
} & typeof defaultProps;

function ConnectedWidget({
  title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  fullScreenMode,
  autofocus,
  profileAvatar,
  launcher,
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
  handleScrollToTop,
  loading
}: Props) {
  return (
    <Provider store={store}>
      <Widget
        title={title}
        titleAvatar={titleAvatar}
        subtitle={subtitle}
        handleNewUserMessage={handleNewUserMessage} //when user clicks send button
        handleQuickButtonClicked={handleQuickButtonClicked}
        senderPlaceHolder={senderPlaceHolder}
        profileAvatar={profileAvatar}
        showCloseButton={showCloseButton}
        fullScreenMode={fullScreenMode}
        autofocus={autofocus}
        customLauncher={launcher}
        handleTextInputChange={handleTextInputChange}
        chatId={chatId}
        launcherOpenLabel={launcherOpenLabel}
        launcherCloseLabel={launcherCloseLabel}
        sendButtonAlt={sendButtonAlt}
        showTimeStamp={showTimeStamp}
        imagePreview={imagePreview}
        zoomStep={zoomStep}
        handleSubmit={handleSubmit}
        showEmoji={showEmoji}
        input={input}
        setInput={setInput}
        handleSelectEmoji={handleSelectEmoji}
        handleRoomSelect={handleRoomSelect}
        currentRoom={currentRoom}
        courseChatRooms={courseChatRooms}
        privateChatRooms={privateChatRooms}
        handleScrollToTop={handleScrollToTop}
        loading={loading}
      />
    </Provider>
  );
}

const defaultProps = {
  title: 'Welcome',
  subtitle: 'This is your chat subtitle',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false,
  autofocus: true,
  chatId: 'rcw-chat-container',
  launcherOpenLabel: 'Open chat',
  launcherCloseLabel: 'Close chat',
  sendButtonAlt: 'Send',
  showTimeStamp: true,
  imagePreview: false,
  zoomStep: 80,
  showEmoji: true
};
ConnectedWidget.defaultProps = defaultProps;

export default ConnectedWidget;
