import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Button } from 'antd';
// state

const ConferenceNotice = (props) => {
  useEffect(() => {}, [props.state]);

  const onClickStart = async () => {
    let conChk = await fetch('http://localhost:3001/conStart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        state: '200',
        data: { conID: props.conData.conID },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return true;
      });
    if (conChk == true) {
      props.setContentsTitle('방청하기');
    }
  };

  return (
    <div style={{ margin: 'auto ', width: '100%', maxWidth: '1000px' }}>
      <table border={1}>
        <tbody>
          <tr style={{ width: '100%', textAlign: 'center' }}>
            <th style={{ width: '10%', padding: '15px 5px', height: '130px' }}>
              공고번호
            </th>
            <th style={{ width: '15%' }}>{props.conData.noticeNum}</th>
            <th
              rowspan="2"
              style={{ width: '50%', padding: '20px 5px', fontSize: '35px' }}
            >
              입　주　자　대　표　회　의
              <br />공{'　　　'}고{'　　　'}문
            </th>
            <th style={{ width: '10%', padding: '15px 5px' }}>게시장소</th>
            <th style={{ width: '15%' }}>{props.conData.noticePostingPlace}</th>
          </tr>

          <tr style={{ width: '100%', textAlign: 'center' }}>
            <th style={{ width: '10%', padding: '15px 5px', height: '130px' }}>
              게시기한
            </th>
            <th>
              {moment(props.conData.noticeDeadlineStart).format('YYYY.MM.DD')} -
              {moment(props.conData.noticeDeadlineEnd).format('YYYY.MM.DD')}
            </th>
            <th>게시자</th>
            <th>{props.conData.noticePublisher}</th>
          </tr>
          <tr>
            <th colspan="5" style={{ width: '100%', textAlign: 'center' }}>
              <p style={{ fontSize: '30px', padding: '50px 10px 0px 0px' }}>
                {props.conData.conTitle} 개최 공고
              </p>
              <p
                style={{
                  fontSize: '18px',
                  padding: '10px 80px',
                  lineHeight: '40px',
                }}
              >
                공동주택관리규약 준칙 제 34조 및 제 36조에 의거하여 아래와 같이
                입주자대표회의를 개최하오니 입주민 여러분들께서는 참고하시기
                바랍니다.
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
                    1. 회의 일시 :
                    {moment(props.conData.conDate).format('YYYY.MM.DD HH:mm')}
                  </p>
                  <p>2. 회의 장소 : {props.conData.conPlace}</p>
                  <p>3. 방청신청방법 : {props.conData.audApiMeth}</p>
                  <p>4. 안건</p>
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
                            <p
                              style={{
                                fontWeight: 500,
                              }}
                            >
                              {index + 1}) {value.agendaTitle}
                            </p>
                            <p
                              style={{
                                fontWeight: 500,
                                paddingLeft: '20px',
                              }}
                            >
                              {value.contents}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: '30px',
                  padding: '50px',
                  lineHeight: '80px',
                }}
              >
                {moment(props.conData.noticeRegiDate).format('YYYY.MM.DD')}
                <p
                  style={{
                    fontSize: '40px',
                  }}
                >
                  입주자대표회의회장
                </p>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
      <div style={{ float: 'right' }}>
        {props.conData.conState == '1' ? (
          <Button
            style={{
              background: '#f93737',
              border: '1px solid #5d0808',
              'border-radius': '8px',
              margin: '10px 0px',
              color: 'white',
              'text-align': 'center',
              'font-weight': 'bold',
              width: '160px',
              height: '40px',
              'font-size': '18px',
            }}
            onClick={onClickStart}
          >
            회의시작
          </Button>
        ) : (
          <Button
            style={{
              background: 'gray',
              border: '1px solid black',
              'border-radius': '8px',
              margin: '10px 0px',
              color: 'white',
              'text-align': 'center',
              'font-weight': 'bold',
              width: '160px',
              height: '40px',
              'font-size': '18px',
            }}
            disabled={true}
          >
            회의시작
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConferenceNotice;
