import React from 'react';
import { Header } from 'semantic-ui-react';

const Salaries = ({ title }) => {
  return (
    <div>
      <Header as="h2">{title}</Header>
      <p>calcular los salarios</p>
      <p>Basandose en jornalera, incentivos, valores hora, etc</p>      
      <p>Generar reportes PDF con el salario a cobras desglosado</p>
    </div>
  );
};

export default Salaries;