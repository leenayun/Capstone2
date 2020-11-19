import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Card, Select, DatePicker } from 'antd';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
import ConferenceAddForm from './ConferenceAddForm';

const ConferenceAdd = (props) => {
  useEffect(() => {}, [props]);

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
            <Breadcrumb.Item>입주자대표회의</Breadcrumb.Item>
            <Breadcrumb.Item>목록</Breadcrumb.Item>
            <Breadcrumb.Item>등록</Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false}>
            <ConferenceAddForm history={props.history} />
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default ConferenceAdd;
