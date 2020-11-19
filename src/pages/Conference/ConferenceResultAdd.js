import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Card } from 'antd';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
import ConferenceResultAddForm from './ConferenceResultAddForm';

const ConferenceResultAdd = (props) => {
  const [conData, setConData] = useState({});
  const [agendaData, setAgendaData] = useState([]);

  useEffect(() => {
    console.log('ConferenceResultAdd:::::::::::::::', props);
    getConData();
    getAgendaData();
  }, [props]);

  const getConData = async () => {
    let link = 'http://localhost:3001/conference/' + props.match.params.id;

    let data = await fetch(link)
      .then((res) => res.json())
      .then((data) => {
        console.log('getConDate conference:::', data.conference[0]);
        return data.conference[0];
      });
    setConData(data);
  };

  const getAgendaData = async () => {
    let link = 'http://localhost:3001/Agenda/' + props.match.params.id;
    let data = await fetch(link)
      .then((res) => res.json())
      .then((data) => {
        return data.agenda;
      });
    for (let i = 0; i < data.length; i++) {
      data[i].voteMethod = 1;
    }
    setAgendaData(data);
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
            <Breadcrumb.Item>결과 및 회의록 등록</Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false}>
            <ConferenceResultAddForm
              history={props.history}
              conData={conData}
              agendaData={agendaData}
              setAgendaData={setAgendaData}
            />
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default ConferenceResultAdd;
