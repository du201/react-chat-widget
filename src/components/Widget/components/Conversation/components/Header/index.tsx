import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const close = require('../../../../../../../assets/clear-button.svg') as string;

import './style.scss';
const { SubMenu } = Menu;

type Props = {
  title: string;
  subtitle: string;
  toggleChat: () => void;
  showCloseButton: boolean;
  titleAvatar?: string;
  handleRoomSelect: (any) => any;
  currentRoom: string;
  courseChatRooms: string[];
  privateChatRooms: string[];
}

function Header({ title, subtitle, toggleChat, showCloseButton, titleAvatar, handleRoomSelect, currentRoom, courseChatRooms, privateChatRooms }: Props) {
  let courseChats = courseChatRooms.map(course => <Menu.Item key={course}>{course}</Menu.Item>);
  let privateChats = privateChatRooms.map(personal => <Menu.Item key={personal}>{personal}</Menu.Item>);
  return (
    <React.Fragment>
      <div className="rcw-header">
        {showCloseButton &&
          <button className="rcw-close-button" onClick={toggleChat}>
            <img src={close} className="rcw-close" alt="close" />
          </button>
        }
        <h4 className="rcw-title">
          {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
          {currentRoom === "" ? "Please Select a Chat Room" : currentRoom}
        </h4>
        <span>{subtitle}</span>
      </div>
      <Menu onClick={handleRoomSelect} selectedKeys={[currentRoom]}>
        <SubMenu key="SubMenu" icon={<TeamOutlined />} title="Select Chat Room">
          <Menu.ItemGroup title="Course Chat">
            {courseChats}
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Private Chat">
            {privateChats}
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </React.Fragment>
  );
}

export default Header;
