import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';

const StyledText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 100px 0px;
`;

// state

const ConferenceResult = (props) => {
  useEffect(() => {
    console.log('ConferenceResult props', props);
  }, [props]);
  console.log('ConferenceResult props', props);
  if (props.conData.conState == 3 || props.conData.conState == 4) {
    return (
      <div style={{ margin: 'auto ', width: '100%', maxWidth: '1200px' }}>
        <table border={1}>
          <tbody>
            <tr style={{ width: '100%', textAlign: 'center', height: '130px' }}>
              <th style={{ width: '10%', padding: '15px 5px' }}>공고번호</th>
              <th style={{ width: '15%' }}>{props.conData.resultNoticeNum}</th>
              <th
                rowspan="2"
                style={{ width: '50%', padding: '20px 5px', fontSize: '40px' }}
              >
                입　주　자　대　표　회　의
                <br />공{'　　　'}고{'　　　'}문
              </th>
              <th style={{ width: '10%', padding: '15px 5px' }}>게시장소</th>
              <th style={{ width: '15%' }}>
                {props.conData.resultPostingPlace}
              </th>
            </tr>
            <tr style={{ width: '100%', textAlign: 'center', height: '130px' }}>
              <th style={{ width: '10%', padding: '15px 5px' }}>게시기한</th>
              <th>
                {moment(props.conData.resultDeadlineStart).format('YYYY.MM.DD')}{' '}
                -{moment(props.conData.resultDeadlineEnd).format('YYYY.MM.DD')}
              </th>
              <th>게시자</th>
              <th>{props.conData.resultPublisher}</th>
            </tr>
            <tr>
              <th colspan="5" style={{ width: '100%', textAlign: 'center' }}>
                <p style={{ fontSize: '30px', padding: '50px 10px 0px 0px' }}>
                  {props.conData.conTitle} 결과 공고
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    padding: '10px 80px',
                    lineHeight: '40px',
                  }}
                >
                  {moment(props.conData.conDate).format('YYYY년도 MM월 DD일')}{' '}
                  입주자대표 {props.conData.type == 0 ? '정기' : '임시'}
                  회의 의결사항을 아래와 같이 공고합니다. 바랍니다.
                </p>
                <div
                  style={{
                    fontSize: '18px',
                    padding: '10px 40px',
                    lineHeight: '40px',
                  }}
                >
                  <p>- 아래 - </p>
                  <div
                    style={{
                      fontSize: '18px',
                      padding: '10px',
                      lineHeight: '30px',
                      textAlign: 'left',
                    }}
                  >
                    <p>
                      1. 회의 일시:
                      {moment(props.conData.conDate).format('YYYY.MM.DD HH:mm')}
                    </p>
                    <p>
                      2. 성원보고: 정원 : {props.conData.conCapacity} 참석자 :{' '}
                      {props.conData.conAttendee}{' '}
                      {props.conData.conCapacity / 2 <=
                      props.conData.conAttendee
                        ? '(과반수이상으로 성원)'
                        : '(참석자수 미달)'}
                    </p>
                    <p>3. 안건</p>
                    <div
                      style={{
                        fontSize: '16px',
                        paddingLeft: '30px',
                        lineHeight: '25px',
                        textAlign: 'left',
                      }}
                    >
                      {props.agenda == undefined ? (
                        <div></div>
                      ) : (
                        props.agenda.map((value, index) => {
                          return (
                            <div>
                              <p>
                                {index + 1}) {value.agendaTitle}
                              </p>
                              <p>{value.agendaContent}</p>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '30px',
                        padding: '50px',
                        lineHeight: '80px',
                        textAlign: 'center',
                      }}
                    >
                      {moment(props.conData.resultRegiDate).format(
                        'YYYY.MM.DD'
                      )}
                      <p
                        style={{
                          fontSize: '40px',
                        }}
                      >
                        입주자대표회의회장
                      </p>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else return <StyledText>결과공고문이 등록되지 않았습니다.</StyledText>;
};

export default ConferenceResult;
