import { ElementType } from 'react';

import { Message as MessageI, Link, CustomCompMessage, LinkParams } from '../store/types';

import Message from '../components/Widget/components/Conversation/components/Messages/components/Message';
import Snippet from '../components/Widget/components/Conversation/components/Messages/components/Snippet';
import QuickButton from '../components/Widget/components/Conversation/components/QuickButtons/components/QuickButton';

import { MESSAGES_TYPES, MESSAGE_SENDER, MESSAGE_BOX_SCROLL_DURATION } from '../constants';

export function createNewMessage(text: string, sender: string, author: string, time: string, id?: string): any {
  return {
    type: MESSAGES_TYPES.TEXT,
    component: Message,
    text,
    sender,
    author,
    time,
    timestamp: new Date(),
    showAvatar: sender === MESSAGE_SENDER.RESPONSE,
    customId: id,
    unread: sender === MESSAGE_SENDER.RESPONSE
  };
}

export function createLinkSnippet(link: LinkParams, id?: string): Link {
  return {
    type: MESSAGES_TYPES.SNIPPET.LINK,
    component: Snippet,
    title: link.title,
    link: link.link,
    target: link.target || '_blank',
    sender: MESSAGE_SENDER.RESPONSE,
    timestamp: new Date(),
    showAvatar: true,
    customId: id,
    unread: true
  };
}

export function createComponentMessage(component: ElementType, props: any, showAvatar: boolean, id?: string): CustomCompMessage {
  return {
    type: MESSAGES_TYPES.CUSTOM_COMPONENT,
    component,
    props,
    sender: MESSAGE_SENDER.RESPONSE,
    timestamp: new Date(),
    showAvatar,
    customId: id,
    unread: true
  };
}

export function createQuickButton(button: { label: string, value: string | number }) {
  return {
    component: QuickButton,
    label: button.label,
    value: button.value
  };
}

// TODO: Clean functions and window use for SSR

function sinEaseOut(timestamp: any, begining: any, change: any, duration: any) {
  return change * ((timestamp = timestamp / duration - 1) * timestamp * timestamp + 1) + begining;
}

/**
 * 
 * @param {*} target scroll target
 * @param {*} scrollStart the start position calculating from the top. DO NOT use negative number here
 * @param {*} scroll scroll distance used to scroll towards the bottom, if it's a negative number, no scroll effect would happen. 
 */
function scrollWithSlowMotion(target: any, scrollStart: any, scroll: number) {
  const raf = window?.requestAnimationFrame;
  let start = 0;
  const step = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    let stepScroll = sinEaseOut(timestamp - start, 0, scroll, MESSAGE_BOX_SCROLL_DURATION);
    let total = scrollStart + stepScroll;
    target.scrollTop = total;
    if (total < scrollStart + scroll) {
      raf(step);
    }
  }
  raf(step);
}

export function scrollToBottom(messagesDiv: HTMLDivElement | null) {
  if (!messagesDiv) return;
  const screenHeight = messagesDiv.clientHeight; //height of the visible chat window
  const scrollTop = messagesDiv.scrollTop; // # of pixels that we have scrolled from the top
  // scrollHeight is the total height of the chat window (including the part hidden by the scrollbar)
  const scrollOffset = messagesDiv.scrollHeight - (scrollTop + screenHeight); // # of pixels that we need to scroll the screen down to reach the bottom
  // console.log(messagesDiv.clientHeight, messagesDiv.scrollTop, messagesDiv.scrollHeight);
  if (scrollOffset) scrollWithSlowMotion(messagesDiv, scrollTop, scrollOffset);
}

let prevScrollHeight = 0;

export function maintainScrollPosition(messagesDiv: HTMLDivElement | null) {
  if (!messagesDiv) return;

  const scrollHeightDiff = messagesDiv.scrollHeight - prevScrollHeight;
  const scrollOffset = messagesDiv.scrollHeight - (messagesDiv.scrollTop + messagesDiv.scrollHeight);

  // console.log(messagesDiv.clientHeight, messagesDiv.scrollTop, messagesDiv.scrollHeight);
  // if (scrollOffset) scrollWithSlowMotion(messagesDiv, messagesDiv.scrollTop, scrollHeightDiff);
  // if (scrollOffset) scrollWithSlowMotion(messagesDiv, 500, 100);
  messagesDiv.scrollTop += scrollHeightDiff;
  prevScrollHeight = messagesDiv.scrollHeight;
}
