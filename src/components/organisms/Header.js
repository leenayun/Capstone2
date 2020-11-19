import React from 'react';
import { Link } from 'react-router-dom';

const styleLogo = {
  margin: '10px',
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#1890ff',
};

const Header = () => {
  return (
    <div>
      <p style={styleLogo}>
        <Link to="/">공동주택 회의 관리시스템</Link>
      </p>
    </div>
  );
};

export default Header;
