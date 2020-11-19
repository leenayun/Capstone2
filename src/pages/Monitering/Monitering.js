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

const StyledBox = styled.div`
  border: 3px solid #9e9e9e;
  padding: 20px;
  background-color: white;
  font-size: 16px;
  margin-bottom: 50px;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 10px;
`;

const StyledView = styled.div`
  width: 90%;
  /* padding-top: 50px; */
  margin: auto;
  margin-top: 80px;
  padding: 30px;
  background-color: #d4e3ec;
`;

const { Option } = Select;
const Monitering = (props) => {
  const [searchType, setSearchType] = useState('conTitle');
  const [inputText, setInputText] = useState('');
  const [clickBtn, setClickBtn] = useState(false);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    console.log('Monitering useEffect ', props);
  }, [props]);

  const onClickBtn = () => {
    getSearchData();
  };

  const getSearchData = async () => {
    let link =
      'http://localhost:3001/bc/conference?searchType=' +
      searchType +
      '&input=' +
      inputText;

    let chk = await fetch(link)
      .then((res) => res.json())
      .then((data) => {
        console.log('data::', data.data);
        setSearchData(data.data);
      });

    return chk;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DevMenu></DevMenu>
      <Header />
      <SideMenu path={props.location.pathname} history={props.history} />
      <Layout>
        <Layout.Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>블록체인 모니터링</Breadcrumb.Item>
            <Breadcrumb.Item>조회</Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false}>
            <Row>
              <Col span={4}>
                <Select
                  style={{
                    margin: '4px',
                    width: '95%',
                    textAlign: 'left',
                  }}
                  defaultValue="conTitle"
                  onChange={(value) => {
                    setSearchType(value);
                  }}
                >
                  <Option value="conTitle">회의제목</Option>
                  {/* <Option value="agendaTitle">안건제목</Option>
                  <Option value="writer">작성자</Option>*/}
                </Select>
              </Col>
              <Col span={17}>
                <Input
                  style={{
                    width: '98%',
                    margin: '4px',
                  }}
                  onChange={(e) => {
                    setInputText(e.target.value);
                  }}
                  placeholder="검색어를 입력하세요."
                />
              </Col>
              <Col span={3}>
                <Button
                  type="primary"
                  style={{
                    width: '95%',
                    margin: '4px',
                    fontWeight: 'bold',
                    display: 'inline',
                    'border-radius': ' 5px',
                  }}
                  onClick={onClickBtn}
                >
                  검색
                </Button>
              </Col>
            </Row>
            <Row>
              <StyledView>
                {searchData.length == 0 ? (
                  <p>검색 결과가 없습니다.</p>
                ) : (
                  searchData.map((value, index) => {
                    return (
                      <div>
                        <StyledTitle># {index + 1}</StyledTitle>
                        <StyledBox>
                          <Row>
                            <p>
                              {JSON.stringify(value).replace(/,/g, function (
                                match,
                                p1
                              ) {
                                return match + '\n';
                              })}
                            </p>
                          </Row>
                        </StyledBox>
                      </div>
                    );
                  })
                )}
              </StyledView>
            </Row>
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Monitering;
