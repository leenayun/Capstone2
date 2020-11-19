import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// 인증 컴포넌트 전용 라우트
function AuthRoute({ authenticated, component: Component, render, ...rest }) {
  console.log('AuthRoute authenticated::', authenticated);
  console.log('AuthRoute rest', rest);
  console.log('AuthRoute render', render);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          //인증이 됐으면
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          console.log('Redirect::') || (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        )
      }
    />
  );
}

export default AuthRoute;
