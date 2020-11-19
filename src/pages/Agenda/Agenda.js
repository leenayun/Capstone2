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
  DatePicker,
  Form,
} from 'antd';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
import moment from 'moment';

import AgendaTable from './AgendaTable';
const { Option } = Select;
const { RangePicker } = DatePicker;
const Agenda = (props) => {
  const [paging, setPaging] = useState('5');
  const [type, setType] = useState('전체회의');
  const [state, setState] = useState('전체상태');
  const [dates, setDates] = useState([moment().subtract(1, 'y'), moment()]);
  const [text, setText] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [btn, setBtn] = useState(false);

  useEffect(() => {
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
    console.log('onFinish', values);
    setDates(values.dates);

    values.searchType == undefined
      ? setSearchType(null)
      : setSearchType(values.searchType);

    values.text == undefined || values.text == ''
      ? setText(null)
      : setText(values.text);
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
            <Breadcrumb.Item>안건처리내역</Breadcrumb.Item>
            <Breadcrumb.Item>목록</Breadcrumb.Item>
          </Breadcrumb>
          <Card bordered={false}>
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
                <Select defaultValue="전체회의" onChange={onChangeTypeSelect}>
                  <Option value="전체회의">전체회의</Option>
                  <Option value="임시">임시회의</Option>
                  <Option value="정기">정기회의</Option>
                </Select>
              </Col>
              <Col
                style={{ maxWidth: '250px', minWidth: '120px', margin: '0px' }}
              >
                <Select defaultValue="전체상태" onChange={onChangeStateSelect}>
                  <Option value="전체상태">전체상태</Option>
                  <Option value="공고중">공고중</Option>
                  <Option value="안건처리중">안건처리중</Option>
                  <Option value="회의중">회의중</Option>
                  <Option value="처리완료">처리완료</Option>
                </Select>
              </Col>
            </Row>

            <AgendaTable
              paging={paging}
              type={type}
              state={state}
              dates={dates}
              text={text}
              searchType={searchType}
              btn={btn}
            />

            <Form
              onFinish={onFinish}
              initialValues={{
                dates: dates,
                searchType: 'title',
              }}
              layout={'inline'}
            >
              <Form.Item name="searchType">
                <Select
                  style={{
                    border: '1px solid #b7b7b7',
                    borderRadius: ' 5px',
                    margin: '4px',
                    width: '140px',
                    textAlign: 'left',
                  }}
                  defaultValue="title"
                >
                  <Option value="title">회의제목</Option>
                  <Option value="agendaTitle">안건제목</Option>
                  <Option value="agendaTitleAndcontents">안건제목+내용</Option>
                  <Option value="writer">작성자</Option>
                </Select>
              </Form.Item>
              <Form.Item name="text" style={{ display: 'inline' }}>
                <Input
                  style={{
                    width: '300px',
                    margin: '4px',
                    border: '1px solid #b7b7b7',
                    borderRadius: '5px',
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
                    borderRadius: ' 5px',
                  }}
                  onClick={() => {
                    setBtn(true);
                  }}
                >
                  검색
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Agenda;
