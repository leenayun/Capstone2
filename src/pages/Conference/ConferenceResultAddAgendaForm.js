import React, { useEffect, useState } from 'react';
import { Row, InputNumber, Col, Input, message, Radio } from 'antd';

import styled, { css } from 'styled-components';
import { render } from 'react-dom';
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
  margin-bottom: 30px;
  padding-right: 20px;
  padding-left: 20px;
`;

const ConferenceAddAgendaForm = (props) => {
  const [vote, setVote] = useState(1);
  const [quorum, setQuorum] = useState(0);
  const [agendaDecision, setAgendaDecision] = useState('');

  const onChangeVote = (e) => {
    let tmp = props.agendaData[props.index];
    tmp.voteMethod = e.target.value;
    let arr = props.agendaData;
    arr[props.index] = tmp;
    console.log('arr::', arr);
    props.setAgendaData(arr);
    setVote(e.target.value);
  };

  useEffect(() => {
    console.log('ConferenceAddAgendaForm::', props);
  }, [props]);

  useEffect(() => {
    console.log(
      'props.agendaData[props.index]::',
      props.agendaData[props.index]
    );
  }, [props.agendaData[props.index]]);
  return (
    <div>
      <StyledAgendaNum>제{props.index + 1}호 안건</StyledAgendaNum>

      <StyledAgenda>
        <p style={{ 'font-size': '18px' }}>{'>'} 안건정보</p>
        <Row>
          <Col span={4}>
            <StyledLable>제목</StyledLable>
          </Col>
          <Col span={18}>
            <StyledLable style={{ textAlign: 'left' }}>
              {props.agendaData[props.index].agendaTitle}
            </StyledLable>
          </Col>
        </Row>
        <Row>
          <Col span={4}>
            <StyledLable>내용</StyledLable>
          </Col>
          <Col span={18}>
            <StyledLable style={{ textAlign: 'left' }}>
              {props.agendaData[props.index].contents}
            </StyledLable>
          </Col>
        </Row>

        <p style={{ 'font-size': '18px' }}>{'>'} 안건상정 및 표결결과</p>

        <Row>
          <Col span={4}>
            <StyledLable>
              <StyledRequired>*</StyledRequired>표결방법
            </StyledLable>
          </Col>
          <Col span={18}>
            <Radio.Group onChange={onChangeVote} value={vote}>
              <Radio value={1}>거수/기립</Radio>
              <Radio value={2}>기명</Radio>
              <Radio value={3}>무기명</Radio>
              <Radio value={4}>전자투표</Radio>
            </Radio.Group>
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
                      color: 'black',
                      'font-size': '14px',
                    }}
                  >
                    정원
                  </p>
                </Col>
                <Col>
                  <InputNumber
                    min={1}
                    max={50}
                    onChange={(e) => {
                      let tmp = props.agendaData[props.index];
                      tmp.agendaCapacity = e;
                      if (
                        props.agendaData[props.index].agendaAttendee != null
                      ) {
                        tmp.quorum =
                          (props.agendaData[props.index].agendaCapacity * 2) /
                            3 >
                          props.agendaData[props.index].agendaAttendee
                            ? Math.ceil(
                                props.agendaData[props.index].agendaCapacity /
                                  2 +
                                  1
                              )
                            : Math.ceil(
                                props.agendaData[props.index].agendaAttendee /
                                  2 +
                                  1
                              );
                        setQuorum(tmp.quorum);
                        if (
                          tmp.numAgree != null &&
                          tmp.numOppo != null &&
                          tmp.numAbst != null &&
                          tmp.quorum != null
                        ) {
                          tmp.agendaDecision =
                            tmp.quorum < tmp.numAgree + tmp.numOppo
                              ? tmp.numAgree > tmp.numOppo
                                ? '가결(찬성)'
                                : '가결(반대)'
                              : '부결';
                          setAgendaDecision(tmp.agendaDecision);
                        }
                      }
                      let arr = props.agendaData;
                      arr[props.index] = tmp;
                      props.setAgendaData(arr);
                    }}
                    suffix="명"
                  />
                </Col>

                <Col>
                  <p
                    style={{
                      margin: '4px',
                      'font-weight': 'bold',
                      'margin-right': '10px',
                      color: 'black',
                      'font-size': '14px',
                    }}
                  >
                    참석자
                  </p>
                </Col>
                <Col>
                  <InputNumber
                    min={1}
                    max={500}
                    suffix="명"
                    onChange={(e) => {
                      let tmp = props.agendaData[props.index];
                      tmp.agendaAttendee = e;
                      if (
                        props.agendaData[props.index].agendaCapacity != null
                      ) {
                        tmp.quorum =
                          (props.agendaData[props.index].agendaCapacity * 2) /
                            3 >
                          props.agendaData[props.index].agendaAttendee
                            ? Math.ceil(
                                props.agendaData[props.index].agendaCapacity /
                                  2 +
                                  1
                              )
                            : Math.ceil(
                                props.agendaData[props.index].agendaAttendee /
                                  2 +
                                  1
                              );

                        setQuorum(tmp.quorum);
                        if (
                          tmp.numAgree != null &&
                          tmp.numOppo != null &&
                          tmp.numAbst != null &&
                          tmp.quorum != null
                        ) {
                          tmp.agendaDecision =
                            tmp.quorum < tmp.numAgree + tmp.numOppo
                              ? tmp.numAgree > tmp.numOppo
                                ? '가결(찬성)'
                                : '가결(반대)'
                              : '부결';
                          setAgendaDecision(tmp.agendaDecision);
                        }
                      }
                      let arr = props.agendaData;
                      arr[props.index] = tmp;
                      props.setAgendaData(arr);
                    }}
                  />
                </Col>

                <Col>
                  <p
                    style={{
                      margin: '4px',
                      'font-weight': 'bold',
                      'margin-right': '10px',
                      color: 'black',
                      'font-size': '14px',
                    }}
                  >
                    의결정족수
                  </p>
                </Col>
                <Col>
                  {' '}
                  <p
                    style={{
                      margin: '4px',
                      'font-weight': 'bold',
                      'margin-right': '10px',
                      color: 'black',
                      'font-size': '14px',
                    }}
                  >
                    {quorum}
                  </p>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>

        <Row>
          <Col span={4}>
            <StyledLable>
              <StyledRequired>*</StyledRequired>표결결과
            </StyledLable>
          </Col>

          <Col
            span={20}
            style={{
              border: '1px solid #c5c5c5',
              borderRadius: '5px',
              padding: '20px',
              margin: '10px 0px',
            }}
          >
            <Col>
              <Row>
                <Col>
                  <p
                    style={{
                      margin: '4px',
                      'font-weight': 'bold',
                      'margin-right': '10px',
                      color: 'black',
                      'font-size': '14px',
                    }}
                  >
                    찬성
                  </p>
                </Col>
                <Col>
                  <InputNumber
                    min={1}
                    max={50}
                    onChange={(e) => {
                      let tmp = props.agendaData[props.index];
                      tmp.numAgree = e;
                      if (
                        tmp.numAgree != null &&
                        tmp.numOppo != null &&
                        tmp.numAbst != null &&
                        tmp.quorum != null
                      ) {
                        tmp.agendaDecision =
                          tmp.quorum < tmp.numAgree + tmp.numOppo
                            ? tmp.numAgree > tmp.numOppo
                              ? '가결(찬성)'
                              : '가결(반대)'
                            : '부결';
                        setAgendaDecision(tmp.agendaDecision);
                      }
                      let arr = props.agendaData;
                      arr[props.index] = tmp;
                      props.setAgendaData(arr);
                    }}
                    suffix="명"
                  />
                </Col>

                <Col>
                  <p
                    style={{
                      margin: '4px',
                      'font-weight': 'bold',
                      'margin-right': '10px',
                      color: 'black',
                      'font-size': '14px',
                    }}
                  >
                    반대
                  </p>
                </Col>
                <Col>
                  <InputNumber
                    min={1}
                    max={500}
                    suffix="명"
                    onChange={(e) => {
                      let tmp = props.agendaData[props.index];
                      tmp.numOppo = e;
                      if (
                        tmp.numAgree != null &&
                        tmp.numOppo != null &&
                        tmp.numAbst != null &&
                        tmp.quorum != null
                      ) {
                        tmp.agendaDecision =
                          tmp.quorum < tmp.numAgree + tmp.numOppo
                            ? tmp.numAgree > tmp.numOppo
                              ? '가결(찬성)'
                              : '가결(반대)'
                            : '부결';
                        setAgendaDecision(tmp.agendaDecision);
                      }
                      let arr = props.agendaData;
                      arr[props.index] = tmp;
                      props.setAgendaData(arr);
                    }}
                  />
                </Col>
                <Col>
                  <p
                    style={{
                      margin: '4px',
                      'font-weight': 'bold',
                      'margin-right': '10px',
                      color: 'black',
                      'font-size': '14px',
                    }}
                  >
                    기권
                  </p>
                </Col>
                <Col>
                  <InputNumber
                    min={1}
                    max={500}
                    suffix="명"
                    onChange={(e) => {
                      let tmp = props.agendaData[props.index];
                      tmp.numAbst = e;
                      if (
                        tmp.numAgree != null &&
                        tmp.numOppo != null &&
                        tmp.numAbst != null &&
                        tmp.quorum != null
                      ) {
                        tmp.agendaDecision =
                          tmp.quorum < tmp.numAgree + tmp.numOppo
                            ? tmp.numAgree > tmp.numOppo
                              ? '가결(찬성)'
                              : '가결(반대)'
                            : '부결';
                        setAgendaDecision(tmp.agendaDecision);
                      }
                      let arr = props.agendaData;
                      arr[props.index] = tmp;
                      props.setAgendaData(arr);
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{ float: 'right' }}>
                  <p
                    style={{
                      margin: '4px',
                      'font-weight': 'bold',
                      'margin-right': '10px',
                      color: 'black',
                      'font-size': '14px',
                    }}
                  >
                    결과
                  </p>
                </Col>
                <Col>
                  <p
                    style={{
                      margin: '4px',
                      'font-weight': 'bold',
                      'margin-right': '10px',
                      color: 'red',
                      'font-size': '14px',
                    }}
                  >
                    {agendaDecision}
                  </p>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>

        <Row>
          <Col span={4}>
            <StyledLable>
              <StyledRequired>*</StyledRequired>의결사항
            </StyledLable>
          </Col>
          <Col span={18}>
            <TextArea
              style={{ height: '100px' }}
              onChange={(e) => {
                let tmp = props.agendaData[props.index];
                tmp.agendaContent = e.target.value;
                let arr = props.agendaData;
                arr[props.index] = tmp;
                props.setAgendaData(arr);
              }}
            />
          </Col>
        </Row>
      </StyledAgenda>
    </div>
  );
};

export default ConferenceAddAgendaForm;
