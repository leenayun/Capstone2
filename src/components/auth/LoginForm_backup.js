import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function LoginForm({ authenticated, login, location }) {
  const [aptName, setAptName] = useState('');
  const [dong, setDong] = useState('');
  const [houseHold, setHouseHold] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    try {
      login({ aptName, dong, houseHold, password });
    } catch (e) {
      alert('Failed to login');
      setAptName('');
      setDong('');
      setHouseHold('');
      setPassword('');
    }
  };

  const { from } = location.state || { from: { pathname: '/' } };
  if (authenticated) return <Redirect to={from} />;

  return (
    <>
      <h1>Login</h1>
      <input
        value={aptName}
        onChange={({ target: { value } }) => setAptName(value)}
        type="text"
        placeholder="공동주택명"
      />
      <input
        value={dong}
        onChange={({ target: { value } }) => setDong(value)}
        type="text"
        placeholder="동"
      />
      <input
        value={houseHold}
        onChange={({ target: { value } }) => setHouseHold(value)}
        type="text"
        placeholder="호수"
      />
      <input
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        type="password"
        placeholder="password"
      />
      <button onClick={handleClick}>Login</button>
    </>
  );
}

export default LoginForm;
