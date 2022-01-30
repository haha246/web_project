import React from 'react'
import './App.css'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { createMuiTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';

import AppBar from './components/app-bar/AppBar'
import { AuthProvider, useAuthState } from "./context";

import { routes } from './router'

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: orange[300],
    },
  },
});

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       render={props => (
//         // pass the sub-routes down to keep nesting
//         <route.component {...props} routes={route.routes} />
//       )}
//     />
//   );
// }

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {

  const userState = useAuthState();
  console.log('userState', userState, children, rest)
  return userState.user ? (
    <Route {...rest} />
  ) :
  (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppBar></AppBar>

          {routes.map((route, i) => route.private ? <PrivateRoute key={i} {...route} />: <Route key={i} {...route} />)}
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
