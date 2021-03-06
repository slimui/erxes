import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import { List } from './containers';

const routes = () => (
  <Route
    path="/settings/email-templates/"
    component={({ location }) => {
      return <List queryParams={queryString.parse(location.search)} />;
    }}
  />
);

export default routes;
