import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Layout, Breadcrumb, Card, Divider, Row } from 'antd';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
import ConferenceProgress from './ConferenceProgress';
import ConferenceNotice from './ConferenceNotice';
import ConferenceAttend from './ConferenceAttend';
import ConferenceResult from './ConferenceResult';
import ConferenceMinutes from './ConferenceMinutes';

const ConferenceDetail = (props) => {
  const [conData, setConData] = useState({});
  const [agendaData, setAgendaData] = useState([]);
  const [stateView, setStateView] = useState(null);
  const [contentsTitle, setContentsTitle] = useState(null);
  const [contents, setContents] = useState(null);

  const StyledTitle = styled.div`
    padding: 2px;
    ${(props) =>
      props.subTitle &&
      css`
        font-size: 20px;
        font-weight: bold;
        display: inline;
      `}
  `;

  const StyledState = styled.div`
    border-radius: 20px;
    border: 1px solid;
    color: white;
    float: right;
    font-size: 16px;
    padding: 5px 20px 5px 20px;
    display: inline;
    margin: 0px;
    font-weight: bold;
    text-align: right;
    ${(props) =>
      props.notice &&
      css`
        background: green;
      `}
    ${(props) =>
      props.progress &&
      css`
        background: purple;
      `}
  ${(props) =>
      props.handing &&
      css`
        background: orange;
      `}
  ${(props) =>
      props.finish &&
      css`
        background: gray;
      `};
  `;

  useEffect(() => {
    console.log('ConferenceDetail useEffect ', props);

    getConData();
    getAgendaData();
  }, [props]);

  useEffect(() => {
    console.log('ConferenceDetail contents ', props);
    getConData();
  }, [contents]);

  useEffect(() => {
    console.log('contentsTitle::::::', contentsTitle);
    getConData();
    switch (contentsTitle) {
      case '개최공고문':
        setContents(
          <ConferenceNotice
            conData={conData}
            agenda={agendaData}
            setContentsTitle={setContentsTitle}
          />
        );
        break;
      case '회의방청':
        setContents(
          <ConferenceAttend
            conData={conData}
            history={props.history}
            setContentsTitle={setContentsTitle}
          />
        );
        break;
      case '결과공고문':
        setContents(<ConferenceResult conData={conData} agenda={agendaData} />);
        break;
      case '회의록':
        setContents(
          <ConferenceMinutes conData={conData} agenda={agendaData} />
        );
        break;
      case '안건처리내역':
        break;
    }
  }, [contentsTitle]);

  useEffect(() => {}, [stateView, conData]);

  const getConData = async () => {
    let link = 'http://localhost:3001/conference/' + props.match.params.id;

    await fetch(link)
      .then((res) => res.json())
      .then((data) => {
        if (data.conference[0].conState == 1) {
          setStateView(<StyledState notice={true}>공고중</StyledState>);
        } else if (data.conference[0].conState == 2) {
          setStateView(<StyledState progress={true}>회의중</StyledState>);
        } else if (data.conference[0].conState == 3) {
          setStateView(<StyledState handing={true}>안건처리중</StyledState>);
        } else if (data.conference[0].conState == 4) {
          setStateView(<StyledState finish={true}>처리완료</StyledState>);
        } else {
          setStateView(<StyledState>{null}</StyledState>);
        }
        setConData(data.conference[0]);
      });
  };

  const getAgendaData = async () => {
    let link = 'http://localhost:3001/Agenda/' + props.match.params.id;

    await fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setAgendaData(data.agenda);
      });
  };

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
            <Breadcrumb.Item>{conData.conTitle}</Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false}>
            <Row>
              <div style={{ width: '100%' }}>
                <StyledTitle subTitle={true}>진행사항</StyledTitle>
                {stateView}
              </div>

              <Divider
                style={{ border: '1px solid #7f7f7f', marginTop: '10px' }}
              />
              <ConferenceProgress
                state={conData.conState}
                contentsTitle={contentsTitle}
                setContentsTitle={setContentsTitle}
              />
            </Row>
            {console.log('contentsTitle::', contentsTitle)}
            {contentsTitle == null ? (
              <p></p>
            ) : (
              <Row style={{ marginTop: '30px' }}>
                <div style={{ width: '100%' }}>
                  <StyledTitle subTitle={true}>{contentsTitle}</StyledTitle>
                </div>

                <Divider
                  style={{ border: '1px solid #7f7f7f', marginTop: '10px' }}
                />
                {contents}
              </Row>
            )}

            <Row></Row>
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default ConferenceDetail;
