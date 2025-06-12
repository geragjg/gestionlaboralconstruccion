import React from 'react';
import { Header } from 'semantic-ui-react';

const Constructions = ({ title }) => {
  return (
    <div>
      <Header as="h2">{title}</Header>
      <p>Visualizar y gestionar obras aquí.</p>
      <p>Crear nuevas obras.</p>
      <p>Configurarla, agregandole empleados, ir abriedno nuevas quincenas, configuraciones de la jornalera</p>
    </div>
  );
};

export default Constructions;