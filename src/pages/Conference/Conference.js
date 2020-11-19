import React, { useEffect, useState } from 'react';
import {
  Layout,
  Breadcrumb,
  Card,
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
import ConferenceTable from './ConferenceTable';
import moment from 'moment';

const { Option } = Select;
const Conference = (props) => {
  const [paging, setPaging] = useState('5');
  const [type, setType] = useState('all');
  const [state, setState] = useState('all');
  const [dates, setDates] = useState([moment().subtract(1, 'y'), moment()]);
  const [text, setText] = useState(null);
  const [searchType, setSearchType] = useState('title');
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    //console.log('db:::::::::::::::');
    //console.log('Conference useEffect ', props);
  }, [props]);

  const onChangePagingSelect = (value) => {
    setPaging(value);
  };
  const onChangeTypeSelect = (value) => {
    setType(value);
  };
  const onChangeStateSelect = (value) => {
    setState(value);
  };

  const onFinish = (values) => {
    //console.log('onFinish', values);
    setDates(values.dates);

    values.searchType == undefined
      ? setSearchType(null)
      : setSearchType(values.searchType);

    values.text == undefined || values.text == ''
      ? setText(null)
      : setText(values.text);
    setBtn(true);
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
          </Breadcrumb>
          <Card bordered={false}>
            {/* 조건 */}
            <Row
              style={{
                marginTop: '10px',
                marginBottom: '20px',
                float: 'right',
              }}
            >
              <Col></Col>
              <Col
                style={{ maxWidth: '250px', minWidth: '120px', margin: '0px' }}
              >
                <Select defaultValue="5" onChange={onChangePagingSelect}>
                  <Option value="5">5개씩보기</Option>
                  <Option value="10">10개씩보기</Option>
                  <Option value="15">15개씩보기</Option>{' '}
                  <Option value="20">20개씩보기</Option>
                </Select>
              </Col>
              <Col
                style={{ maxWidth: '250px', minWidth: '120px', margin: '0px' }}
              >
                <Select defaultValue="all" onChange={onChangeTypeSelect}>
                  <Option value="all">전체회의</Option>
                  <Option value="0">정기회의</Option>
                  <Option value="1">임시회의</Option>
                </Select>
              </Col>
              <Col
                style={{ maxWidth: '250px', minWidth: '120px', margin: '0px' }}
              >
                <Select defaultValue="all" onChange={onChangeStateSelect}>
                  <Option value="all">전체상태</Option>
                  <Option value="1">공고중</Option>
                  <Option value="2">회의중</Option>
                  <Option value="3">안건처리중</Option>
                  <Option value="4">처리완료</Option>
                </Select>
              </Col>
            </Row>

            <ConferenceTable
              paging={paging}
              type={type}
              state={state}
              dates={dates}
              text={text}
              searchType={searchType}
              btn={btn}
              setBtn={setBtn}
            />
            <Row
              style={{
                display: 'block',
              }}
            >
              <Button
                type="primary"
                style={{
                  width: '100px',
                  height: '34px',
                  margin: '4px',
                  fontWeight: 'bold',
                  display: 'inline',
                  'border-radius': ' 5px',
                  float: 'right',
                  display: 'block',
                }}
                onClick={() => {
                  props.history.push({
                    pathname: '/Conference/Add',
                  });
                }}
              >
                등록하기
              </Button>
            </Row>
            <Row
              style={{
                width: '100%',
                margin: 'auto 0',
              }}
            >
              <Col span={4}></Col>

              <Col span={16}>
                <Form
                  onFinish={onFinish}
                  initialValues={{
                    dates: dates,
                    searchType: 'title',
                  }}
                  layout={'inline'}
                >
                  {/* 날짜검색은일단보류 */}
                  {/* <Form.Item name="dates">
                  <RangePicker
                    defaultValue={dates}
                    bordered={true}
                    style={{
                      border: '1px solid #b7b7b7',
                      'border-radius': ' 5px',
                      margin: '4px',
                    }}
                  />
                </Form.Item> */}
                  <Form.Item name="searchType">
                    <Select
                      style={{
                        margin: '4px',
                        width: '140px',
                        textAlign: 'left',
                      }}
                      defaultValue="title"
                    >
                      <Option value="title">회의제목</Option>
                      {/* <Option value="agendaTitle">안건제목</Option>
                      <Option value="agendaTitleAndcontents">
                        안건제목+내용
                      </Option> */}
                      <Option value="writer">작성자</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="text"
                    style={{ width: '60%', display: 'inline' }}
                  >
                    <Input
                      style={{
                        width: '100%',
                        margin: '4px',
                      }}
                      placeholder="검색어를 입력하세요."
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{
                        width: '80px',
                        margin: '4px',
                        fontWeight: 'bold',
                        display: 'inline',
                        'border-radius': ' 5px',
                      }}
                    >
                      검색
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={4}></Col>
            </Row>
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Conference;
