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

import styled, { css } from 'styled-components';

// state

const StyledDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0px;
`;

const MyPage = (props) => {
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
            <Breadcrumb.Item>내정보</Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false}>
            <StyledDiv>
              <p>내정보</p>
              <p>이름 : 이나윤</p>
              <p>직책 : 회장</p>
            </StyledDiv>
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MyPage;
