import React, { Component } from 'react';
import { Segment, Header, Icon, Grid, Button, Image, Loader, Dimmer } from 'semantic-ui-react';
import ModuleContent from './moduleContent';
import Fortnight from './fortnight';
import Constructions from './constructions';
import Reports from './reports';
import Salaries from './salaries';
import Employees from './employees';
import companyLogo from "../images/logoNorte.jpeg";


class Page extends Component {
  state = {
    icons: [
      {
        name: 'Jornalera',
        iconName: 'clipboard',
        clickComponent: Fortnight,
        hoverText: 'Gestionar Jornaleros',
        propsObject: { title: 'Jornalera Modulo', fortnightNumber: '1', year: '2025' },
      },
      {
        name: 'Obras',
        iconName: 'gavel',
        clickComponent: Constructions,
        hoverText: 'Ver y Crear Obras',
        propsObject: { title: 'Obras Modulo' },
      },
      {
        name: 'Reportes',
        iconName: 'file text',
        clickComponent: Reports,
        hoverText: 'Generar Reportes',
        propsObject: { title: 'Reportes Modulo' },
      },
      {
        name: 'Sueldos',
        iconName: 'money bill alternate', // <- Money icon
        clickComponent: Salaries,
        hoverText: 'Calcular Sueldos',
        propsObject: { title: 'Sueldos Modulo' },
      },
      {
        name: 'Empleados',
        iconName: 'address card', // <- Money icon
        clickComponent: Employees,
        hoverText: 'Gestiona Empleados',
        propsObject: { title: 'Empleados Modulo' },
      }
      
    ],
    activeComponent: null,
    activeProps: {},
  };

  handleClick = (component, props) => {
    this.setState({ loading: true });

    // Small timeout to simulate loading effect
    setTimeout(() => {
      this.setState({ activeComponent: component, activeProps: props, loading: false });
    }, 800); // Simulate a loading time of 800ms
  };

  handleHomeClick = () => {
    this.setState({ activeComponent: null, activeProps: {} });
  };

  render() {
    const { icons, activeComponent, activeProps, loading } = this.state;

    return (
      <div 
        style={{ 
          backgroundColor: '#f0f0f0', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        {/* Fixed Header */}
        <Segment          
          style={{ 
            borderColor: 'grey', 
            borderWidth: '1px', 
            // position: 'fixed', 
            // top: 0, 
            //width: '100%', 
            zIndex: 1000,
            backgroundColor: '#fff'
          }}
        >
          <Grid>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={13}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', width: '100%' }}>
              <Image 
                src={companyLogo}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px', marginBottom: '-4px' }}
              />
              <Header as="h1" textAlign="left">
                GESTIÓN LABORAL CONSTRUCCIÓN (GLC)
              </Header>
            </div>
              </Grid.Column>
              <Grid.Column width={3} textAlign="right">
                <Button icon onClick={this.handleHomeClick}>
                  <Icon name="home" size="large" />
                </Button>
                <Button icon>
                  <Icon name="settings" size="large" />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <hr style={{ borderColor: 'grey', margin: '10px 0' }} />
        </Segment>

        {/* Main Content Area */}
        
          {activeComponent ? (
            <ModuleContent clickComponent={activeComponent} propsObject={activeProps} />
          ) : (
            <Dimmer.Dimmable as={Segment} blurring dimmed={loading}>
              <Dimmer active={loading} inverted>
                <Loader size="large">Loading...</Loader>
              </Dimmer>
              <Grid  columns={4}>
                {icons.map((icon, index) => (
                 <Grid.Column key={index} textAlign="left">
                 <div 
                   style={{ 
                     display: 'flex', 
                     flexDirection: 'column', 
                     alignItems: 'center', 
                     cursor: 'pointer' 
                   }} 
                   onClick={() => this.handleClick(icon.clickComponent, icon.propsObject)}
                 >
                   {/* Fixed-size circular container */}
                   <Segment 
                     circular 
                     style={{ 
                       width: '120px',
                       height: '80px',
                       padding: '0',
                       border: '1px solid grey',
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center'
                     }}
                   >
                     <Icon name={icon.iconName} size="big" />
                   </Segment>
                   <div style={{ marginTop: '10px', color: '#4a4a4a', textAlign: 'center' }}>
                     {icon.name}
                   </div>
                 </div>
               </Grid.Column>
                ))}
              </Grid>
            </Dimmer.Dimmable>
          )}
        </div>
   
    );
  }

}

export default Page;




