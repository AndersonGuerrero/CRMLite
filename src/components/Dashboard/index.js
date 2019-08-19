import React, { Fragment } from 'react';
import { Clients } from './Clients';

export const Dashboard = () => (
  <Fragment>
    <h2 className="text-center my-4">Top 10 Clientes</h2>
    <Clients />
  </Fragment>
)
