import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import DevMenu from '../organisms/devMenu';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = (value) => console.log(value);

const styleTitle = {
  textAlign: 'center',
  color: '#2257a7',
  fontWeight: 'bold',
  fontSize: '30px',
  marginBottom: '50px',
};

const styleInputLayout = {
  textAlign: 'center',
  margin: '0 auto',
  width: '80%',
};
console.log('확인');
const Login = (props) => {
  return (
    <div>
      <DevMenu />

      <div
        style={{
          padding: '120px 0px',
          maxWidth: '1000px',
          textAlign: 'center',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <div style={{ marginBottom: '20px' }}>
              <p style={styleTitle}>공동주택 회의관리 시스템</p>
            </div>
            <div>
              {/* 아이디*/}
              <div>
                <Row>
                  <Col span={4}>
                    <p style={{ textAlign: 'right', marginRight: '15px' }}>
                      아이디
                    </p>
                  </Col>
                  <Col span={16}>
                    <Search
                      placeholder="공동주택명"
                      allowClear
                      onSearch={onSearch}
                      style={{ width: '100%', margin: '0 auto' }}
                    />
                  </Col>
                  <Col span={4}></Col>
                </Row>
                <Row>
                  <Col span={4}></Col>
                  <Col span={16}>
                    <Input
                      placeholder="동"
                      style={{ width: '50%', margin: '0 auto' }}
                    />
                    <Input
                      placeholder="호수"
                      style={{ width: '50%', margin: '0 auto' }}
                    />
                  </Col>
                  <Col span={4}></Col>
                </Row>
              </div>

              {/* 비밀번호*/}
              <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Row>
                  <Col span={4}>
                    <p style={{ textAlign: 'right', marginRight: '15px' }}>
                      비밀번호
                    </p>
                  </Col>
                  <Col span={16}>
                    <Input
                      placeholder="비밀번호"
                      style={{ width: '100%', margin: '0 auto' }}
                    />
                  </Col>
                  <Col span={4}></Col>
                </Row>
              </div>
              <Row>
                <Col span={4}></Col>
                <Col span={16}>
                  <Button type="primary" style={{ width: '100%' }}>
                    로그인
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
