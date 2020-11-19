import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
  IdcardOutlined,
  SettingOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const SideMenu = (props) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    console.log('useEffect props', props);
    const selected = [];
    switch (props.path) {
      case '/':
        selected.push('home');
        break;
      case '/Conference':
        selected.push('conference');
        break;
      case '/Agenda':
        selected.push('agenda');
        break;
      case '/Community':
      case '/Community/all':
      case '/Community/notice':
      case '/Community/report':
      case '/Community/free':
        selected.push('community');
        break;
      case '/Mypage':
        selected.push('mypage');
        break;
      case '/Admin':
        selected.push('admin');
        break;
      default:
        break;
    }

    setSelectedKeys(selected);
    return () => {};
  }, [props.path]);
  return (
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={selectedKeys}
        style={{ float: 'right', marginRight: '20px' }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">
            <span>홈</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="conference" icon={<UserOutlined />}>
          <Link to="/Conference">
            <span>입주자대표회의</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="agenda" icon={<LaptopOutlined />}>
          <Link to="/Agenda">
            <span>안건처리내역</span>
          </Link>
        </Menu.Item>
        {/* 
        <Menu.Item key="community" icon={<NotificationOutlined />}>
          <Link to="/Community">
            <span>커뮤니티</span>
          </Link>
        </Menu.Item>
        */}
        <Menu.Item key="mypage" icon={<IdcardOutlined />}>
          <Link to="/Mypage">
            <span>내정보</span>
          </Link>
        </Menu.Item>
        {/* 
        <Menu.Item key="admin" icon={<SettingOutlined />}>
          <Link to="/Admin">
            <span>관리</span>
          </Link>
        </Menu.Item>
           */}
        <Menu.Item key="monitering" icon={<BlockOutlined />}>
          <Link to="/Monitering">
            <span>블록체인모니터링</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default SideMenu;
