import React from 'react';
import { Header } from 'semantic-ui-react';

const Employees = ({ title }) => {
  return (
    <div>
      <Header as="h2">{title}</Header>
      <p>Visualizar y gestionar empleados de la compania</p>
      <p>Mantiene registro historico</p>
    </div>
  );
};

export default Employees;