import React, { useEffect, useState } from 'react';
import { Row, Col, Input, message } from 'antd';

import styled, { css } from 'styled-components';
const { TextArea } = Input;

const StyledLable = styled.p`
  font-size: 14px;
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
const StyledAgendaNum = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #001529;
`;
const StyledAgendaDelete = styled.p`
  text-align: right;
  color: #5a5656;
  font-weight: bold;
`;

const StyledAgenda = styled.div`
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #1890ff;
  border-radius: 20px;
  color: #1890ff;
  padding: 40px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
`;

const ConferenceAddAgendaForm = (props) => {
  useEffect(() => {}, [props]);
  return (
    <div>
      <StyledAgendaNum>
        제{props.agenda[props.index].key}호 안건
      </StyledAgendaNum>

      <StyledAgenda>
        <Row>
          <Col span={4}>
            <StyledLable>
              <StyledRequired>*</StyledRequired>제목
            </StyledLable>
          </Col>
          <Col span={18}>
            <Input
              onChange={(e) => {
                let agendaData = props.agenda;
                let tmp = props.agenda[props.index];
                tmp.agendaTitle = e.target.value;
                agendaData[props.index] = tmp;
                props.setAgenda(agendaData);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <StyledLable>
              <StyledRequired>*</StyledRequired>내용
            </StyledLable>
          </Col>
          <Col span={18}>
            <TextArea
              style={{ height: '100px' }}
              onChange={(e) => {
                let agendaData = props.agenda;
                let tmp = props.agenda[props.index];
                tmp.contents = e.target.value;
                agendaData[props.index] = tmp;
                props.setAgenda(agendaData);
              }}
            />
          </Col>
        </Row>
      </StyledAgenda>

      <StyledAgendaDelete
        onClick={() => {
          if (props.agendaKey == 1) {
            message.info('최소 한 개의 안건을 등록해야합니다.');
          } else {
            let tmp = [];
            let count = 1;

            for (let i = 0; i < props.agenda.length; i++) {
              if (props.agenda[i].key != props.agendaKey) {
                let data = props.agenda[i];
                data.key = count;
                tmp.push(data);
                count++;
              }
            }
            props.setAgendaKey(props.agendaKey - 1);
            props.setAgenda(tmp);
          }
        }}
      >
        삭제 X
      </StyledAgendaDelete>
    </div>
  );
};

export default ConferenceAddAgendaForm;
