import React, { useEffect, useState } from 'react';
import {
  Divider,
  Select,
  Row,
  Col,
  Button,
  Input,
  Form,
  DatePicker,
  InputNumber,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ConferenceAddAgendaForm from './ConferenceAddAgendaForm';

import moment from 'moment';
import styled, { css } from 'styled-components';

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
  const [agendaKey, setAgendaKey] = useState(1);
  const [agenda, setAgenda] = useState([
    { key: 1, agendaTitle: null, contents: null },
  ]);
  useEffect(() => {}, [props]);

  const onFinish = async (values) => {
    let id = await fetch('http://localhost:3001/get-conference-id')
      .then((res) => res.json())
      .then((data) => {
        return data.id[0].conID;
      });

    //console.log('id:::', id);
    let tmpID = id.slice(3, 8);
    tmpID = String(Number(tmpID) + 1);
    tmpID =
      tmpID.length >= 5
        ? tmpID
        : new Array(5 - tmpID.length + 1).join('0') + tmpID;
    tmpID = 'CON' + tmpID;
    let tmp = {};

    tmp.type = Number(values.type);
    tmp.noticeNum = values.noticeNum;
    tmp.noticePublisher = values.noticePublisher;
    tmp.noticePostingPlace = values.noticePostingPlace;
    tmp.noticeDeadlineStart = values.noticeDeadline[0].format('YYYY-MM-DD');
    tmp.noticeDeadlineEnd = values.noticeDeadline[1].format('YYYY-MM-DD');

    let hour = values.conDateHour;
    if (values.conDateAMPM == 'pm') {
      hour += 12;
    } else {
      if (hour < 10) hour = '0' + String(hour);
    }
    tmp.conDate =
      values.conDateDay.format('YYYY-MM-DD') +
      ' ' +
      hour +
      ':' +
      values.conDateMin;

    tmp.conPlace = values.conPlace;
    tmp.conTitle = values.conTitle;
    tmp.audApiMeth = values.audApiMeth;

    tmp.conID = tmpID;
    tmp.writerName = '이나윤';
    tmp.userID = 'USER000001';
    tmp.noticeRegiDate = moment().format('YYYY-MM-DD HH:mm:ss');
    tmp.conState = 1;

    //console.log('tmp:::::::', JSON.stringify(tmp));

    //안건
    let agendaId = await fetch('http://localhost:3001/get-agenda-id')
      .then((res) => res.json())
      .then((data) => {
        return data.id[0].agendaID;
      });

    //console.log('id:::', id);
    let tmpAgendaID = agendaId.slice(3, 8);
    let agendaTmp = [];

    for (let i = 0; i < agenda.length; i++) {
      tmpAgendaID = String(Number(agendaId.slice(3, 8)) + (i + 1));

      //console.log('tmpAgendaID 111111:::', tmpAgendaID);
      tmpAgendaID =
        tmpAgendaID.length >= 5
          ? tmpAgendaID
          : new Array(5 - tmpAgendaID.length + 1).join('0') + tmpAgendaID;
      tmpAgendaID = 'AGD' + tmpAgendaID;
      //console.log('tmpAgendaID 2222222:::', tmpAgendaID);

      agendaTmp.push({
        agendaID: tmpAgendaID,
        conID: tmpID,
        agendaTitle: agenda[i].agendaTitle,
        contents: agenda[i].contents,
        agendaState: 1,
      });
    }

    let conChk = await fetch('http://localhost:3001/conference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: '200', data: tmp }),
    })
      .then((res) => res.json())
      .then((data) => {
        return true;
      });

    let agendaChk = await fetch('http://localhost:3001/agenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: '200', data: agendaTmp }),
    }).then(() => {
      return true;
    });

    if (conChk == true && agendaChk == true) {
      props.history.push({
        pathname: '/Conference',
      });
    }
  };

  return (
    <Form onFinish={onFinish} style={{ maxWidth: '900px' }}>
      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>회의종류
          </StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="type">
            <Select placeholder="회의 종류를 선택해주세요" allowClear>
              <Option value="0">정기회의</Option>
              <Option value="1">임시회의</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>공고번호</StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="noticeNum">
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
          <Form.Item name="noticePublisher">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>게시장소</StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="noticePostingPlace">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>게시기한</StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="noticeDeadline">
            <RangePicker bordered={true} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>일시
          </StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="conDate">
            <Row>
              <Col style={{ marginRight: '5px' }}>
                <Form.Item name="conDateDay">
                  <DatePicker placeholder="날짜" bordered={true} />
                </Form.Item>
              </Col>
              <Col style={{ marginRight: '5px' }}>
                <Form.Item name="conDateAMPM">
                  <Select placeholder="시간">
                    <Option value="pm">오후</Option>
                    <Option value="am">오전</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="conDateHour">
                  <InputNumber min={1} max={12} placeholder="시" suffix="시" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="conDateMin">
                  <InputNumber
                    min={0}
                    max={55}
                    step={5}
                    placeholder="분"
                    suffix="분"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>장소
          </StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="conPlace">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>제목
          </StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="conTitle">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>방청신청방법
          </StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="audApiMeth">
            <Input />
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
            {agenda.map((value, index) => {
              return (
                <ConferenceAddAgendaForm
                  index={index}
                  setAgenda={setAgenda}
                  agenda={agenda}
                  agendaKey={agendaKey}
                  setAgendaKey={setAgendaKey}
                />
              );
            })}

            <StyledAgendaAdd
              onClick={() => {
                let tmp = agenda;
                let tmpKey = agendaKey;
                tmpKey += 1;
                tmp.push({ key: tmpKey, agendaTitle: null, contents: null });
                setAgenda(tmp);
                setAgendaKey(tmpKey);
              }}
            >
              <PlusCircleOutlined style={{ fontSize: '30px' }} />
              <br />
              안건추가하기
            </StyledAgendaAdd>
          </Form.Item>
        </Col>
      </Row>

      {/* 보류
      <Row>
        <Col span={4}>
          <StyledLable>
            <StyledRequired>*</StyledRequired>개최사유
          </StyledLable>
        </Col>
        <Col span={20}>
          <Form.Item name="conTitle">
            <Input />
          </Form.Item>
        </Col>
      </Row>
 */}
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
          등록
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Conference;
