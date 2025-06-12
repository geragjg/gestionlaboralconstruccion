import React from 'react';
import { Header } from 'semantic-ui-react';

const Reports = ({ title }) => {
  return (
    <div>
      <Header as="h2">{title}</Header>
      <p>Ver reportes sobre las quincenas y obras</p>
      <p>totales, etc</p>      
    </div>
  );
};
export default Reports;