const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const db = require('../db/db');
const axios = require('axios');
const moment = require('moment');

app.use(cors());

app.use(bodyParser.json());
app.use('/api', (req, res) => res.json({ username: 'bryan' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/apartment', (req, res) => {
  // //console.log('app apartment::::', req, res);
  db.query('SELECT * FROM apartment', (err, data) => {
    // //console.log('err::::', err);
    // //console.log('data::::', data);
    if (!err) res.send({ apartment: data });
    else res.send(err);
  });
});

// 전체회의
app.get('/conference', (req, res) => {
  ////console.log('전체회의---------');
  db.query('SELECT * FROM conference ORDER BY conDate DESC', (err, data) => {
    // console.log('err::::', err);
    // console.log('data::::', data);
    if (!err) res.send({ conference: data });
    else res.send(err);
  });
});

app.get('/conference/search?:type?:state?', (req, res) => {
  // //console.log('/conference/search::::::::::', req.query);

  //전체검색
  let queryStr = 'SELECT * FROM conference ';

  if (req.query.state == 'all' && req.query.type == 'all') {
    //'SELECT * FROM conference'

    // 검색조건
    if (req.query.title != undefined)
      queryStr += ' where conTitle LIKE "%' + req.query.title + '%"';
    else if (req.query.writer != undefined)
      queryStr += ' where writerName LIKE "%' + req.query.writer + '%"';
  } else {
    // 상단바
    if (req.query.state != 'all' && req.query.type != 'all')
      queryStr +=
        ' Where type=' + req.query.type + ' AND conState=' + req.query.state;
    else if (req.query.state == 'all' && req.query.type != 'all')
      queryStr += ' Where type=' + req.query.type;
    else if (req.query.state != 'all' && req.query.type == 'all')
      queryStr += ' Where conState=' + req.query.state;
    //console.log('/conference/search err req.query::::::', req.query);
    // 검색조건
    else if (req.query.title != undefined)
      queryStr += ' AND conTitle LIKE "%' + req.query.title + '%"';
    else if (req.query.writer != undefined)
      queryStr += ' AND writerName LIKE "%' + req.query.writer + '%"';
  }

  queryStr += ' ORDER BY conDate DESC';

  db.query(queryStr, (err, data) => {
    console.log('err::::', err);
    console.log('data::::', data);
    if (!err) res.send({ conference: data });
    else res.send(err);
  });
});

// 아이디검색
app.get('/conference/:id', (req, res) => {
  ////console.log('/conference/:id::::::::::');
  db.query(
    'SELECT * FROM conference where conID="' + req.params.id + '"',
    (err, data) => {
      ////console.log('err::::', err);
      ////console.log('data::::', data);
      if (!err) res.send({ conference: data });
      else res.send(err);
    }
  );
});

// 회의 상세내역
app.get('/get-conference-id', (req, res) => {
  db.query(
    'SELECT conID FROM conference ORDER BY conID DESC LIMIT 1',
    (err, data) => {
      ////console.log('err::::', err);
      ////console.log('data::::', data);
      if (!err) res.send({ id: data });
      else res.send(err);
    }
  );
});

// 안건 상세내역
app.get('/get-agenda-id', (req, res) => {
  db.query(
    'SELECT agendaID FROM agenda ORDER BY agendaID DESC LIMIT 1',
    (err, data) => {
      ////console.log('err::::', err);
      ////console.log('data::::', data);
      if (!err) res.send({ id: data });
      else res.send(err);
    }
  );
});

//안건목록

app.get('/agenda/:id', (req, res) => {
  ////console.log('/agenda/:id::::::::::', req.params);
  db.query(
    'SELECT * FROM agenda where conID="' +
      req.params.id +
      '" ORDER BY agendaID ASC',
    (err, data) => {
      ////console.log('err::::', err);
      ////console.log('data::::', data);
      if (!err) res.send({ agenda: data });
      else res.send(err);
    }
  );
});

// 회의등록
app.post('/conference', (req, res) => {
  let queryStr =
    'insert into conference values ("' +
    req.body.data.conID +
    '", "' +
    req.body.data.conTitle +
    '", "' +
    req.body.data.conDate +
    '", "' +
    req.body.data.writerName +
    '","' +
    req.body.data.userID +
    '","' +
    req.body.data.noticeRegiDate +
    '",null,' +
    req.body.data.type +
    ',1,"' +
    req.body.data.audApiMeth +
    '","' +
    req.body.data.conPlace +
    '","' +
    req.body.data.noticeDeadlineStart +
    '","' +
    req.body.data.noticeDeadlineEnd +
    '","' +
    req.body.data.noticePostingPlace +
    '","' +
    req.body.data.noticePublisher +
    '","' +
    req.body.data.noticeNum +
    '",null,null,null,null,null,null,null,null,null,null,null,null,null);';

  db.query(queryStr, (err, data) => {
    ////console.log('err::::', err);
    ////console.log('data::::', data);
    if (!err) res.send({ conference: data });
    else res.send(err);
  });
});

// 안건등록
app.post('/agenda', (req, res) => {
  let count = 0;
  for (let i = 0; i < req.body.data.length; i++) {
    let queryStr =
      'insert into agenda values ("' +
      req.body.data[i].agendaID +
      '", "' +
      req.body.data[i].conID +
      '", "' +
      req.body.data[i].agendaTitle +
      '", "' +
      req.body.data[i].contents +
      '", "' +
      req.body.data[i].agendaState +
      '",null,null,null,null,null,null,null,null,null,null,null,null,null,null );';
    // //console.log('queryStr::', queryStr);
    db.query(queryStr, (err, data) => {
      count++;
      if (count == req.body.data.length) {
        res.send(true);
      }
    });
  }
});

// 회의등록
app.post('/conStart', (req, res) => {
  let queryStr =
    'UPDATE conference SET conState=2 WHERE conID="' +
    req.body.data.conID +
    '"';
  // //console.log('queryStr::', queryStr);
  db.query(queryStr, (err, data) => {
    if (!err) res.send({ conference: data });
    else res.send(err);
  });
});

// 회의상태변경
app.post('/conResult', (req, res) => {
  let queryStr =
    'UPDATE conference SET resultNum="' +
    req.body.data.resultNum +
    '",  resultPublisher="' +
    req.body.data.resultPublisher +
    '",  resultPostingPlace="' +
    req.body.data.resultPostingPlace +
    '",  resultDeadlineStart="' +
    req.body.data.resultDeadlineStart +
    '",  resultDeadlineEnd="' +
    req.body.data.resultDeadlineEnd +
    '",  conCapacity=' +
    req.body.data.conCapacity +
    ',  conMember=' +
    req.body.data.conMember +
    ',  conRegident=' +
    req.body.data.conRegident +
    ',  conAttendee=' +
    req.body.data.conAttendee +
    ',  conAbsentee=' +
    req.body.data.conAbsentee +
    ',  statement="' +
    req.body.data.statement +
    '",  resultRegiDate="' +
    req.body.data.resultRegiDate +
    '",  conState=' +
    req.body.data.conState +
    ' WHERE conID="' +
    req.body.data.conID +
    '"';
  ////console.log('queryStr::', queryStr);

  db.query(queryStr, (err, data) => {
    if (!err) res.send({ conference: data });
    else res.send(err);
  });
});

// 회의트랜잭션+인덱스디비 저장
app.post('/conResultTran', (req, res) => {
  console.log('req.body.data::', req.body.data);

  axios
    .post('http://localhost:3030/api/Conference', {
      $class: 'org.example.mynetwork.Conference',
      conID: req.body.data.conID,
      conTitle: req.body.data.conTitle,
      conDate: req.body.data.conDate,
      writerName: req.body.data.writerName,
      userID: req.body.data.userID,
      type: req.body.data.type,
      conMember: req.body.data.conMember,
      conRegident: req.body.data.conRegident,
      conCapacity: req.body.data.conCapacity,
      conAttendee: req.body.data.conAttendee,
      conAbsentee: req.body.data.conAbsentee,
      writer: 'resource:org.example.mynetwork.Member#' + req.body.data.userID,
    })
    .then((response_transaction) => {
      console.log('response_transaction: data :', response_transaction.data);
      console.log('response_transaction: error:', response_transaction.error);
      let queryStr =
        'insert into transaction_event_index values ("' +
        req.body.data.conID +
        '", "' +
        req.body.data.conID +
        '", "c2-01", "' +
        moment().format('YYYY-MM-DD HH:mm:ss') +
        '", "' +
        req.body.data.conTitle +
        ' 결과등록' +
        '", "' +
        req.body.data.writerName +
        '", "' +
        req.body.data.userID +
        '",null,null,null);';

      // //console.log('queryStr::', queryStr);
      db.query(queryStr, (err, data) => {
        console.log('DB err', err);
        console.log('DB data', data);
        if (!err)
          res.send({
            response_transaction: response_transaction.data,
            response_db: data,
          });
        else res.send(err);
      });
    })
    .catch((err) => {
      //console.log('error:::::::::::::::::::::::::::::::', err.response);
      //res.send(err);
    });
  ////console.log('queryStr::', queryStr);
});

// 안건 트랜잭션+인덱스디비 저장
app.post('/agendaResultTran', (req, res) => {
  //console.log('req.body.data::', req.body.data);
  let count = 0;
  for (let i = 0; i < req.body.data.length; i++) {
    axios
      .post('http://localhost:3030/api/Agenda', {
        $class: 'org.example.mynetwork.Agenda',
        agendaID: req.body.data[i].agendaID,
        conID: req.body.data[i].conID,
        agendaTitle: req.body.data[i].agendaTitle,
        voteMethod: req.body.data[i].voteMethod,
        numAgree: req.body.data[i].numAgree,
        numOppo: req.body.data[i].numOppo,
        numAbst: req.body.data[i].numAbst,
        agendaDecision: req.body.data[i].agendaDecision,
        agendaContent: req.body.data[i].agendaContent,
        conCapacity: req.body.data[i].conCapacity,
        agendaAttendee: req.body.data[i].agendaAttendee,
        agendaCapacity: req.body.data[i].agendaCapacity,
        procRegiDate: req.body.data[i].procRegiDate,
      })
      .then((response_transaction) => {
        let queryStr =
          'insert into transaction_event_index values ("' +
          req.body.data[i].agendaID +
          '", "' +
          req.body.data[i].agendaID +
          '", "c3-01", "' +
          moment().format('YYYY-MM-DD HH:mm:ss') +
          '", "' +
          req.body.data[i].conTitle +
          '안건 결과등록' +
          '", "' +
          req.body.data[i].writerName +
          '", "' +
          req.body.data[i].userID +
          '",null,null,null);';
        console.log('response_transaction: data :', response_transaction.data);
        console.log('response_transaction: error:', response_transaction.error);
        // //console.log('queryStr::', queryStr);
        db.query(queryStr, (err, data) => {
          console.log('DB err', err);
          console.log('DB data', data);
          count++;
          if (count == req.body.data.length) {
            res.send(true);
          }
        });
      })
      .catch((err) => {
        //console.log('error:::::::::::::::::::::::::::::::', err.response);
        //res.send(err);
      });
    ////console.log('queryStr::', queryStr);
  }
});

// 안건상태변경
app.post('/agendaResult', (req, res) => {
  let count = 0;
  for (let i = 0; i < req.body.data.length; i++) {
    let queryStr =
      'UPDATE agenda SET voteMethod=' +
      req.body.data[i].voteMethod +
      ', numAgree=' +
      req.body.data[i].numAgree +
      ', numOppo=' +
      req.body.data[i].numOppo +
      ', numAbst=' +
      req.body.data[i].numAbst +
      ', agendaDecision="' +
      req.body.data[i].agendaDecision +
      '", agendaContent="' +
      req.body.data[i].agendaContent +
      '", quorum=' +
      req.body.data[i].quorum +
      ', agendaCapacity=' +
      req.body.data[i].agendaCapacity +
      ', agendaAttendee=' +
      req.body.data[i].agendaAttendee +
      ', agendaState=' +
      req.body.data[i].agendaState +
      ', procRegiDate="' +
      req.body.data[i].procRegiDate +
      '" WHERE agendaID="' +
      req.body.data[i].agendaID +
      '"';
    console.log('queryStr::', queryStr);
    db.query(queryStr, (err, data) => {
      count++;
      if (count == req.body.data.length) {
        res.send(true);
      }
    });
  }

  // //console.log('queryStr::', queryStr);
});

app.get('/bc/conference', (req, res) => {
  axios.get('http://localhost:3030/api/Conference').then((resp) => {
    //console.log(resp.data);
    let tmp = [];
    for (let i = 0; i < resp.data.length; i++) {
      if (resp.data[i].conTitle.indexOf(req.query.input) !== -1)
        tmp.push(resp.data[i]);
    }
    res.send({ data: tmp });
  });

  if (req.query.searchType == 'conTitle') {
    axios.get('http://localhost:3030/api/Conference').then((resp) => {
      //console.log(resp.data);
      let tmp = [];
      for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].conTitle.indexOf(req.query.input) !== -1)
          tmp.push(resp.data[i]);
      }
      res.send({ data: tmp });
    });
  } else if (req.query.searchType == 'writer') {
    axios.get('http://localhost:3030/api/Conference').then((resp) => {
      //console.log(resp.data);
      let tmp = [];
      for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].writerName.indexOf(req.query.input) !== -1)
          tmp.push(resp.data[i]);
      }
      res.send({ data: tmp });
    });
  }
});

app.listen(port, () => {
  //console.log(`express is running on ${port}`);
});
