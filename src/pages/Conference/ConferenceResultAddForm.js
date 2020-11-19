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
  DatePicker,
  InputNumber,
  Space,
} from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
import ConferenceResultAddAgendaForm from './ConferenceResultAddAgendaForm';

import moment from 'moment';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
const { TextArea } = Input;

const StyledLable = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #001529;
  text-align: right;
  padding-right: 15px;
`;
const StyledRequired = styled.p`
  display: inline;
  color: red;
  margin: 0px;
  padding-right: 3px;
`;
const StyledText = styled.p`
  font-size: 18px;
  font-weight: bold;
  padding-right: 5px;
  padding-left: 5px;
  display: inline;
`;

const StyledAgendaAdd = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border: 1px solid #1890ff;
  border-style: dashed;
  border-radius: 20px;
  color: #1890ff;
  padding: 40px 0px;
`;

const { Option } = Select;
const { RangePicker } = DatePicker;
const Conference = (props) => {
  const [paging, setPaging] = useState('5');
  const [type, setType] = useState('all');
  const [state, setState] = useState('all');
  const [dates, setDates] = useState([moment().subtract(1, 'y'), moment()]);
  const [text, setText] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [btn, setBtn] = useState(false);
  const [agendaKey, setAgendaKey] = useState(1);
  const [agenda, setAgenda] = useState([
    { key: 1, agendaTitle: null, contents: null },
  ]);
  useEffect(() => {}, [props]);

  const onFinish = async (values) => {
    console.log('onFinish', values);
    console.log('onFinish props', props);

    let tmp = props.conData;

    tmp.resultNum = values.resultNum;
    tmp.resultPublisher = values.resultPublisher;
    tmp.resultPostingPlace = values.resultPostingPlace;
    tmp.resultDeadlineStart = values.resultDeadline[0].format('YYYY-MM-DD');
    tmp.resultDeadlineEnd = values.resultDeadline[1].format('YYYY-MM-DD');

    tmp.conCapacity = values.conCapacity; //총원
    tmp.conMember = values.conMember; // 구성원
    tmp.conRegident = values.conRegident; // 미선출

    tmp.conAttendee = values.conAttendee; //참석
    tmp.conAbsentee = values.conAbsentee; //불참

    tmp.statement = values.statement; //발언내용

    tmp.resultRegiDate = moment().format('YYYY-MM-DD HH:mm:ss'); //결과등록시간
    tmp.conState = 3; //상태 안건처리중으로 변경

    //console.log('tmp:::::::', JSON.stringify(tmp));

    //안건
    let agendaTmp = props.agendaData;

    for (let i = 0; i < props.agendaData.length; i++) {
      agendaTmp[i].agendaState = 3;
      agendaTmp[i].procRegiDate = moment().format('YYYY-MM-DD HH:mm:ss');
      agendaTmp[i].writerName = tmp.writerName;
      agendaTmp[i].userID = tmp.userID;
      agendaTmp[i].conTitle = tmp.conTitle;
    }
    let conChk = await fetch('http://localhost:3001/conResult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: '200', data: tmp }),
    })
      .then((res) => res.json())
      .then((data) => {
        return true;
      });
    console.log('conChk:::', conChk);

    console.log('agendaTmp::::', agendaTmp);
    let agendaChk = await fetch('http://localhost:3001/agendaResult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: '200', data: agendaTmp }),
    }).then(() => {
      return true;
    });
    console.log('agendaChk:::', agendaChk);

    let conTranChk = await fetch('http://localhost:3001/conResultTran', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: '200', data: tmp }),
    })
      .then((res) => res.json())
      .then((data) => {
        return true;
      });

    console.log('conTranChk:::', conTranChk);

    let agendaTranChk = await fetch('http://localhost:3001/agendaResultTran', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: '200', data: agendaTmp }),
    })
      .then((res) => res.json())
      .then((data) => {
        return true;
      });

    console.log('agendaTranChk:::', agendaTranChk);

    if (
      conChk == true &&
      agendaChk == true &&
      conTranChk == true &&
      agendaTranChk == true
    ) {
      let path = '/Conference/' + tmp.conID;
      props.history.push({
        pathname: path,
        id: tmp.conID,
      });
    }
  };

  return (
    <Form onFinish={onFinish} style={{ maxWidth: '900px' }}>
      <Row>
        <Col span={4}>
          <StyledLable>회의제목</StyledLable>
        </Col>
        <Col span={20}>
          <StyledLable style={{ textAlign: 'left' }}>
            {props.conData.conTitle}
          </StyledLable>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <StyledLable>공고번호</StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="resultNum">
            <Input
              style={{ width: '130px', margin: '0px' }}
              placeholder="0000-00호"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>게시자</StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="resultPublisher">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>게시장소</StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="resultPostingPlace">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>게시기한</StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="resultDeadline">
            <RangePicker bordered={true} placeholder={['시작일', '마감일']} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>성원보고
          </StyledLable>
        </Col>

        <Col span={20}>
          <Col>
            <Row>
              <Col>
                <p
                  style={{
                    margin: '4px',
                    'font-weight': 'bold',
                    'margin-right': '10px',
                  }}
                >
                  총원
                </p>
              </Col>
              <Col>
                <Form.Item name="conCapacity">
                  <InputNumber min={1} max={50} suffix="명" />
                </Form.Item>
              </Col>

              <Col>
                <p
                  style={{
                    margin: '4px',
                    'font-weight': 'bold',
                    'margin-right': '10px',
                  }}
                >
                  구성원
                </p>
              </Col>
              <Col>
                <Form.Item name="conMember">
                  <InputNumber min={1} max={500} suffix="명" />
                </Form.Item>
              </Col>

              <Col>
                <p
                  style={{
                    margin: '4px',
                    'font-weight': 'bold',
                    'margin-right': '10px',
                  }}
                >
                  미선출
                </p>
              </Col>
              <Col>
                <Form.Item name="conRegident">
                  <InputNumber min={1} max={500} suffix="명" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col>
            <Row>
              <Col>
                <p
                  style={{
                    margin: '4px',
                    'font-weight': 'bold',
                    'margin-right': '10px',
                  }}
                >
                  참석
                </p>
              </Col>
              <Col>
                <Form.Item name="conAttendee">
                  <InputNumber min={1} max={50} suffix="명" />
                </Form.Item>
              </Col>

              <Col>
                <p
                  style={{
                    margin: '4px',
                    'font-weight': 'bold',
                    'margin-right': '10px',
                  }}
                >
                  불참
                </p>
              </Col>
              <Col>
                <Form.Item name="conAbsentee">
                  <InputNumber min={1} max={50} suffix="명" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>발언내용
          </StyledLable>
        </Col>
        <Col span={18}>
          <Form.Item name="statement">
            <TextArea style={{ height: '150px' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>안건
          </StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="agenda">
            <Divider />
            {props.agendaData.map((value, index) => {
              let formName = 'agenda' + index;
              return (
                <ConferenceResultAddAgendaForm
                  index={index}
                  agendaData={props.agendaData}
                  setAgendaData={props.setAgendaData}
                />
              );
            })}
            {/* tmp.push({
                  key: tmpKey,
                  voteMethod: null,
                  agendaCapacity: null,
                  agendaAttendee: null,
                  quorum: null,
                  numAgree: null,
                  numOppo: null,
                  numAbst: null,
                  agendaDecision: null,
                  agendaContent: null,
                }); */}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          style={{
            width: '180px',
            height: '40px',
            fontSize: '20px',
            padding: '5px',
            fontWeight: 'bold',
            display: 'inline',
            borderRadius: ' 5px',
            float: 'right',
          }}
        >
          결과등록
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Conference;
