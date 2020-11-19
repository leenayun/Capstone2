import React, { useEffect, useState } from 'react';

// const AgendaTable = (props) => {
//   console.log('AgendaTable');
//   return <div>안건처리테이블</div>;
// };

// export default AgendaTable;

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
import { Link } from 'react-router-dom';
const { Option } = Select;
const AgendaTable = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [btn, setBtn] = useState();

  useEffect(() => {
    // console.log('111useEffect props:::::::::::', props);
    getData();
    if (props.btn == true) {
      getSearchData();
      setBtn(false);
    }
  }, [props]);

  // useEffect(() => {
  //   getSearchData();
  //   setbtn(false);
  // }, [props.btn]);

  const getData = () => {
    // 페이징은 복잡하니 나중에
    // console.log('mockup.conference', mockup.conference);
    // console.log('props', props);

    let data = [];

    // 안건목록 쿼리문 추가 (예정)
    let tmp = [];
    for (let i = 0; i < mockup.conference.length; i++) {
      for (let j = 0; j < mockup.conference[i].agenda.length; j++) {
        let tmpData = mockup.conference[i].agenda[j];
        tmpData.conDate = mockup.conference[i].conDate;
        tmpData.title = mockup.conference[i].title;
        tmpData.type = mockup.conference[i].type;
        tmpData.conId = mockup.conference[i].conId;
        // console.log('tmpData::', tmpData);
        tmp.push(tmpData);
      }
      // data.push(mockup.conference[i]);
    }
    // console.log('tmp::::::', tmp);

    if (props.type == '전체회의' && props.state == '전체상태') {
      for (let i = 0; i < tmp.length; i++) {
        data.push(tmp[i]);
      }
      setDataSource(data);
    } else if (props.type != '전체회의' && props.state == '전체상태') {
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].type == props.type) data.push(tmp[i]);
      }
      setDataSource(data);
    } else if (props.type == '전체회의' && props.state != '전체상태') {
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].state == props.state) data.push(tmp[i]);
      }
      setDataSource(data);
    } else if (props.type != '전체회의' && props.state != '전체상태') {
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].type == props.type && tmp[i].state == props.state)
          data.push(tmp[i]);
      }
      setDataSource(data);
    }
  };

  const getSearchData = () => {
    console.log('111useEffect getSearchData props:::::::::::', props);

    console.log('dataSource:::', dataSource);
    let tmp = [];
    if (props.text == null) {
      // 날짜검색할경우
      for (let i = 0; i < dataSource.length; i++) {
        if (
          dataSource[i].conDate.slice(0, 10) >=
            props.dates[0].format('YYYY.MM.DD') &&
          dataSource[i].conDate.slice(0, 10) <=
            props.dates[1].format('YYYY.MM.DD')
        ) {
          tmp.push(dataSource[i]);
        }

        console.log(
          'dates[0].format(MM.DD.YYYY):::',
          props.dates[0].format('YYYY.MM.DD')
        );
        console.log(
          'dataSource[i].conDate:::',
          dataSource[i].conDate.slice(0, 10)
        );
        console.log(
          '>:::',
          dataSource[i].conDate.slice(0, 10) <
            props.dates[0].format('YYYY.MM.DD')
        );
        console.log('-------------------');
      }
      setDataSource(tmp);
    } else {
      // 날짜
      for (let i = 0; i < dataSource.length; i++) {
        if (
          dataSource[i].conDate.slice(0, 10) >=
            props.dates[0].format('YYYY.MM.DD') &&
          dataSource[i].conDate.slice(0, 10) <=
            props.dates[1].format('YYYY.MM.DD')
        ) {
          tmp.push(dataSource[i]);
        }
      }

      let tmp2 = [];
      switch (props.searchType) {
        case 'title':
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].title.indexOf(props.text) != -1) {
              tmp2.push(tmp[i]);
            }
          }

        case 'agendaTitle':
          for (let i = 0; i < tmp.length; i++) {
            for (let j = 0; j < tmp[i].agenda.length; j++) {
              if (tmp[i].agenda[j].agenTitle.indexOf(props.text) != -1) {
                tmp2.push(tmp[i]);
                break;
              }
            }
          }
        case 'agendaTitleAndcontents':
          for (let i = 0; i < tmp.length; i++) {
            for (let j = 0; j < tmp[i].agenda.length; j++) {
              if (
                tmp[i].agenda[j].agenTitle.indexOf(props.text) != -1 &&
                tmp[i].agenda[j].contents.indexOf(props.text) != -1
              ) {
                tmp2.push(tmp[i]);
                break;
              }
            }
          }
        case 'writer':
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].writer.indexOf(props.text) != -1) {
              tmp2.push(tmp[i]);
            }
          }
      }
      setDataSource(tmp);
    }
    /*
    for (let i = 0; i < dataSource.length; i++) {
      if(dataSource[i].type==)
      
    }
*/
  };

  const columns = [
    {
      title: '종류',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '회의제목',
      dataIndex: 'title',
      render: (text, record) => {
        let path = '/Conference/' + record.conId;
        return <Link to={path}>{text}</Link>;
      },
      align: 'center',
    },
    {
      title: '안건제목',
      dataIndex: 'agenTitle',
      align: 'center',
      render: (text, record) => {
        let path = '/Agenda/' + record.conId;
        return <Link to={path}>{text}</Link>;
      },
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
      title: '상태',
      dataIndex: 'state',
      align: 'center',
      render: (text) => {
        // console.log('상태:::::::::', text);
        if (text == '안건처리중')
          return <p style={{ color: 'orange', fontWeight: 'bold' }}>{text}</p>;
        else if (text == '처리완료')
          return <p style={{ color: 'gray', fontWeight: 'bold' }}>{text}</p>;
        else if (text == '공고중')
          return <p style={{ color: 'green', fontWeight: 'bold' }}>{text}</p>;
        else if (text == '회의중')
          return <p style={{ color: 'purple', fontWeight: 'bold' }}>{text}</p>;
        else return null;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      pagination={{ position: ['bottomCenter'] }}
      style={{ marginTop: '100px', marginBottom: '30px', fontSize: '40px' }}
    />
  );
};

export default AgendaTable;
