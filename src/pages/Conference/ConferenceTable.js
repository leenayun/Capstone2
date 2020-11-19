import React, { useEffect, useState } from 'react';
import mockup from '../../mockup.json';
import {
  Layout,
  Breadcrumb,
  Card,
  Divider,
  Select,
  Row,
  Col,
  Button,
  Input,
  Form,
  Table,
} from 'antd';
import SideMenu from '../../components/organisms/SideMenu';
import Header from '../../components/organisms/Header';
import DevMenu from '../../components/organisms/devMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ConferenceTable = (props) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {}, [props]);

  useEffect(() => {}, [dataSource]);

  useEffect(() => {
    if (props.text == null) {
      getConferenceData();
      // 아무일도 일어나지 않음 (전체검색)
    } else {
      //  검색
      getSearchData();
    }
    //getSearchData();
    props.setBtn(false);
  }, [props.btn]);

  const getConferenceData = async () => {
    //페이징 제외하고 검색

    let link =
      'http://localhost:3001/conference/search?type=' +
      props.type +
      '&state=' +
      props.state;
    console.log('conference link:::', link);
    await fetch(link)
      .then((res) => res.json())
      .then((data) => {
        console.log('conference:::', data.conference);
        setDataSource(data.conference);
      });
  };

  const getSearchData = async () => {
    let link =
      'http://localhost:3001/conference/search?type=' +
      props.type +
      '&state=' +
      props.state +
      '&' +
      props.searchType +
      '=' +
      props.text;

    await fetch(link)
      .then((res) => res.json())
      .then((data) => {
        // console.log('conference:::', data.conference);
        setDataSource(data.conference);
      });
  };

  const columns = [
    {
      title: '종류',
      dataIndex: 'type',
      align: 'center',
      render: (text) => {
        if (text == 0) return <p>정기</p>;
        else return <p>임시</p>;
      },
    },
    {
      title: '회의제목',
      dataIndex: 'conTitle',
      render: (text, record) => {
        let path = '/Conference/' + record.conID;
        return <Link to={path}>{text}</Link>;
      },
      align: 'center',
    },
    {
      title: '날짜',
      dataIndex: 'conDate',
      render: (text) => {
        return <p>{text.slice(0, 10)}</p>;
      },
      align: 'center',
    },
    {
      title: '작성자',
      dataIndex: 'writerName',
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'conState',
      align: 'center',
      render: (text) => {
        // console.log('상태:::::::::', text);
        if (text == 1)
          return <p style={{ color: 'green', fontWeight: 'bold' }}>공고중</p>;
        else if (text == 2)
          return <p style={{ color: 'purple', fontWeight: 'bold' }}>회의중</p>;
        else if (text == 3)
          return (
            <p style={{ color: 'orange', fontWeight: 'bold' }}>안건처리중</p>
          );
        else if (text == 4)
          return <p style={{ color: 'gray', fontWeight: 'bold' }}>처리완료</p>;
        else return null;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      pagination={{
        position: ['bottomCenter'],
        pageSize: Number(props.paging),
      }}
      style={{
        marginTop: '100px',
        marginBottom: '30px',
        fontSize: '40px',
      }}
    />
  );
};

export default ConferenceTable;
