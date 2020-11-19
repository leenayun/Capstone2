import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import styled, { css } from 'styled-components';

const StyledText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 100px 0px;
`;

const ConferenceAttend = (props) => {
  useEffect(() => {}, [props]);

  if (props.conData.conState == 1) {
    return <StyledText>공고중입니다.</StyledText>;
  } else if (props.conData.conState == 2) {
    return (
      <StyledText>
        <StyledText>회의중입니다.</StyledText>
        <div style={{ float: 'right' }}>
          {props.conData.conState == '2' ? (
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
              onClick={() => {
                let path = '/Conference/' + props.conData.conID + '/ResultAdd';
                props.history.push({
                  pathname: path,
                  id: props.conData.conID,
                });
              }}
            >
              회의결과등록
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
              회의결과등록
            </Button>
          )}
        </div>
      </StyledText>
    );
  } else if (props.conData.conState == 3 || props.conData.conState == 4) {
    return <StyledText>종료된 회의입니다.</StyledText>;
  }
};

export default ConferenceAttend;
