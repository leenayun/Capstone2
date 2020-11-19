import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// state
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
  DatePicker,
  Space,
  Tree,
} from 'antd';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
import mockup from '../../mockup.json';
import moment from 'moment';

const StyledCircle = styled.div`
  padding: 2px;
  ${(props) =>
    props.subTitle &&
    css`
      font-size: 20px;
      font-weight: bold;
    `}
`;

const AgendaDetail = (props) => {
  const [conData, setConData] = useState({});
  const [stateView, setStateView] = useState(null);
  const [contentsTitle, setContentsTitle] = useState(null);
  const [contents, setContents] = useState(null);
  const [dates, setDates] = useState([moment().subtract(1, 'y'), moment()]);
  const [text, setText] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [btn, setBtn] = useState(false);

  useEffect(() => {}, [props.state]);

  useEffect(() => {
    console.log('ConferenceDetail useEffect ', props);
    // console.log(
    //   'ConferenceDetail props.match.params.id ',
    //   props.match.params.id
    // );
    //getConDate();
  }, [props]);

  // const getConDate = () => {
  //   console.log(':::::::::', mockup.conference[props.match.params.id]);
  //   setConData(mockup.conference[props.match.params.id]);
  // };
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
            <Breadcrumb.Item>안건처리내역</Breadcrumb.Item>
            <Breadcrumb.Item>목록</Breadcrumb.Item>
            <Breadcrumb.Item>안건제목불러올예정</Breadcrumb.Item>
            {/* <Breadcrumb.Item>{conData.title}</Breadcrumb.Item> */}
          </Breadcrumb>
          <Card bordered={false}>내용(추가예정)</Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AgendaDetail;
