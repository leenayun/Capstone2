import React, { useEffect, useState } from 'react';
import moment from 'moment';

import styled, { css } from 'styled-components';

const StyledText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 100px 0px;
`;

const ConferenceMinutes = (props) => {
  useEffect(() => {
    console.log('ConferenceMinutes props', props);
  }, [props]);

  if (props.conData.conState == 3 || props.conData.conState == 4) {
    return (
      <div style={{ margin: 'auto ', maxWidth: '1000px' }}>
        <table border={1}>
          <tbody>
            <tr style={{ width: '100%', textAlign: 'center' }}>
              <th
                colspan="10"
                style={{ width: '50%', padding: '20px 5px', fontSize: '30px' }}
              >
                {moment(props.conData.conDate).format('MM')}월 입주자대표회의록
                [2-1]
              </th>
            </tr>
            <tr>
              <th
                colspan="10"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                회의록 작성자 : 입주자대표회의
                {props.conData.writerName}
              </th>
            </tr>

            <tr>
              <th
                colspan="2"
                style={{
                  width: '10%',
                  padding: '15px 5px',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                회의 구분
              </th>
              <th
                colspan="5"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {props.conData.type == 0 ? '정기' : '임시'}회의
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                총인원
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {props.conData.conCapacity} 명
              </th>
            </tr>

            <tr>
              <th
                colspan="2"
                rowspan="3"
                style={{
                  width: '10%',
                  padding: '15px 5px',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                회의일시
              </th>
              <th
                colspan="5"
                rowspan="3"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {moment(props.conData.conDate).format('YYYY년 MM월 DD일')}(
                {moment(props.conData.conDate).day() == 0
                  ? '일요일'
                  : moment(props.conData.conDate).day() == 1
                  ? '월요일'
                  : moment(props.conData.conDate).day() == 2
                  ? '화요일'
                  : moment(props.conData.conDate).day() == 3
                  ? '수요일'
                  : moment(props.conData.conDate).day() == 4
                  ? '목요일'
                  : moment(props.conData.conDate).day() == 5
                  ? '금요일'
                  : moment(props.conData.conDate).day() == 6
                  ? '토요일'
                  : null}
                )
                <br />
                {moment(props.conData.conDate).format('HH시 mm분')}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                미선출
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {props.conData.conRegident} 명
              </th>
            </tr>
            <tr>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                구성원
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {props.conData.conMember} 명
              </th>
            </tr>
            <tr>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                의결정족수
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {Math.ceil(props.conData.conMember / 2)} 명
              </th>
            </tr>

            <tr>
              <th
                colspan="2"
                rowspan="2"
                style={{
                  width: '10%',
                  padding: '15px 5px',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                회의장소
              </th>
              <th
                colspan="5"
                rowspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {props.conData.conPlace}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                참석
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {props.conData.conAttendee} 명
              </th>
            </tr>
            <tr>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                불참
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {props.conData.conAbsentee} 명
              </th>
            </tr>

            <tr>
              <th
                colspan="10"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {props.conData.statement}
                <br />
                <br />
                <p
                  style={{
                    padding: '5px',
                    fontSize: '18px',
                    textAlign: 'center',
                  }}
                >
                  {moment(props.conData.resultRegiDate).format('YYYY.MM.DD')}
                </p>
                <p
                  style={{
                    padding: '5px',
                    fontSize: '30px',
                    textAlign: 'center',
                  }}
                >
                  입주자대표회의
                </p>
              </th>
            </tr>

            <tr>
              <th
                colspan="10"
                style={{
                  width: '10%',
                  padding: '15px 5px',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                입주자대표회의의 출석을 확인하고 참석위원 서명(또는 날인)한다.
              </th>
            </tr>

            <tr>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                동
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                직책
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                성명
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                서명
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                동
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                직책
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                성명
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                서명
              </th>
            </tr>

            <tr>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
            </tr>
            <tr>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
            </tr>
            <tr>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
            </tr>
            <tr>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
            </tr>
            <tr>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="2"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
              <th
                colspan="1"
                style={{ width: '10%', padding: '15px 5px', fontSize: '16px' }}
              >
                {' '}
                -{' '}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else return <StyledText>회의록이 등록되지 않았습니다. </StyledText>;
};

export default ConferenceMinutes;
