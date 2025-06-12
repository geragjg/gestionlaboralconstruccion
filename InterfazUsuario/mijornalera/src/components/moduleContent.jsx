import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class ModuleContent extends Component {
  render() {
    const { clickComponent: ClickComponent, propsObject } = this.props;

    return (
      <Segment padded style={{ 
                            margin: '0 40px', 
                            borderColor: 'grey', 
                            borderWidth: '1px',
                            height:'calc(100vh - 200px)', // Adjusts height to prevent overflow
                            overflowY: 'auto'}}>
        <ClickComponent {...propsObject} />
      </Segment>
    );
  }
}

export default ModuleContent;
