import React from 'react';
import { Link } from 'react-router-dom';

const devMenu = () => {
  return <div style={{ padding: '30px' }}></div>;
  return (
    <div>
      <p>
        개발메뉴{' '}
        <span>
          <Link to="/Login">Login </Link>`
        </span>
        <span>
          <Link to="/">Home </Link>
        </span>
        <span>
          <Link to="/Conference">입주자대표회의 </Link>
        </span>
        <span>
          <Link to="/Agenda">안건처리내역 </Link>
        </span>
        <span>
          <Link to="/Community">커뮤니티 </Link>
        </span>
        <span>
          <Link to="/Mypage">내정보 </Link>
        </span>
        <span>
          <Link to="/Admin">관리 </Link>
        </span>
      </p>
    </div>
  );
};

export default devMenu;
