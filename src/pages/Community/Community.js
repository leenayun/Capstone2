import React, { useEffect, useState } from 'react';
import {
  Layout,
  Breadcrumb,
  Card,
  Divider,
  Select,
  Row,
  Col,
  Button,
  Input,
  Form,
} from 'antd';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
const Community = (props) => {
  console.log('Community:::::::::::');
  useEffect(() => {
    console.log('Community useEffect ', props);
  }, [props]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DevMenu></DevMenu>
      <Header />
      <SideMenu
        path={props.location.pathname}
        history={props.history}
        userInfo={props.userInfo}
      />
      <Layout>
        <Layout.Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Community</Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false}>
            contents: Community::::::::::::::::::::::::
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Community;
