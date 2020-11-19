// 인증 서버의 데이터베이스 역할을 한다고 가정
//https://www.daleseo.com/react-router-authentication/

const users = [
  { email: 'kim@test.com', password: '123', name: 'Kim' },
  { email: 'lee@test.com', password: '456', name: 'Lee' },
  { email: 'park@test.com', password: '789', name: 'Park' },
];

const usersInfo = [
  {
    aptName: 'a',
    aptId: '1',
    dong: '101',
    houseHold: '1001',
    name: '이나윤',
    position: '회장',
    email: 'test1@test.com',
    password: '123',
    userId: 1,
  },
  {
    aptName: 'a',
    aptId: '1',
    dong: '101',
    houseHold: '1002',
    name: '황승민',
    position: '이사',
    email: 'test2@test.com',
    password: '123',
    userId: 2,
  },
  {
    aptName: 'b',
    aptId: '3',
    dong: '101',
    houseHold: '1001',
    name: '오승환',
    position: '회장',
    email: 'test3@test.com',
    password: '123',
    userId: 3,
  },
];

// 로그인 (임시)
export function signIn({ aptName, dong, houseHold, password }) {
  const user = {
    aptName: 'a',
    aptId: '1',
    dong: '101',
    houseHold: '1001',
    name: '이나윤',
    position: '회장',
    email: 'test1@test.com',
    password: '123',
    userId: 1,
  };
  /*
  const user = usersInfo.find(
    (user) =>
      user.aptName === aptName &&
      user.dong === dong &&
      user.houseHold === houseHold &&
      user.password === password
  );
*/
  if (user === undefined) throw new Error();
  return user;
}
