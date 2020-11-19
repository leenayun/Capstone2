import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// state

const StyledDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0px;
`;

const Styledtext = styled.p`
  width: 20%;
  text-align: center;
  font-size: 20px;
  /* padding: 0px; */
  display: inline;
  padding: 30px 20px;
`;

const ConferenceProgress = (props) => {
  useEffect(() => {
    console.log('ConferenceProgress props', props);
  }, [props.state]);

  return (
    <StyledDiv>
      <Styledtext>
        <a
          onClick={() => {
            props.setContentsTitle('개최공고문');
          }}
        >
          개최공고문보기
        </a>
      </Styledtext>
      <Styledtext>
        <a
          onClick={() => {
            props.setContentsTitle('회의방청');
          }}
        >
          방청하기
        </a>
      </Styledtext>
      <Styledtext>
        <a
          onClick={() => {
            props.setContentsTitle('결과공고문');
          }}
        >
          결과공고문보기
        </a>
      </Styledtext>
      <Styledtext>
        <a
          onClick={() => {
            props.setContentsTitle('회의록');
          }}
        >
          회의록보기
        </a>
      </Styledtext>
      <Styledtext>
        {/* 검색조건등록하기 */}
        <Link to="/Agenda">안건처리내역보기</Link>
      </Styledtext>
    </StyledDiv>
  );
};

export default ConferenceProgress;
