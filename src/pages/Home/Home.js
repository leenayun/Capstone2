import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Card, Divider, Row, Col } from 'antd';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledTitle = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledListText = styled.p`
  font-size: 18px;
  margin: 10px;
  color: #4c4c4c;
  font-weight: bold;
  padding-bottom: 15px;
`;

const Home = (props) => {
  const [conData, setConData] = useState([]);

  useEffect(() => {
    getConData();
  }, [props]);

  useEffect(() => {}, [conData]);
  const getConData = async () => {
    let link = 'http://localhost:3001/conference';
    let data = await fetch(link)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.conference);
        let tmp = data.conference.slice(0, 5);
        setConData(tmp);
        return true;
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
            <Breadcrumb.Item>홈</Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false}>
            <div>
              <Row>
                <Col>
                  <StyledTitle>최근 입주자대표회의</StyledTitle>
                </Col>
              </Row>
              <Col>
                <Divider
                  style={{ border: '1px solid #7f7f7f', marginTop: '10px' }}
                />
                {conData.length == 0 ? (
                  <div>최근 회의가 없습니다.</div>
                ) : (
                  conData.map((value, index) => {
                    let path = '/Conference/' + value.conID;
                    return (
                      <Link to={path}>
                        <StyledListText>
                          {index + 1}. {value.conTitle}
                        </StyledListText>
                      </Link>
                    );
                  })
                )}
              </Col>
            </div>
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Home;
