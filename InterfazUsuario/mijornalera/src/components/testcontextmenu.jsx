import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
import ContextMenu from './testcontextmenucomp'; // adjust the import path as needed

class SampleIntegration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContextMenu: false,
      anchorRect: null,
    };
    this.buttonRef = React.createRef();
    this.buttonRef2 = React.createRef();
  }

  // When the button is clicked, get its bounding rectangle and show the menu.
  handleButtonClick = (btn) => {
    let buttonRef;
    if (btn == 1)
        buttonRef = this.buttonRef.current
    else
        buttonRef = this.buttonRef2.current
    if (buttonRef) {
        console.log(buttonRef)
      const rect = buttonRef.getBoundingClientRect();
      debugger;
      this.setState({ anchorRect: rect, showContextMenu: true });
    }
  };

  // Close the context menu
  handleCloseContextMenu = () => {
    this.setState({ showContextMenu: false, anchorRect: null });
  };

  render() {
    const { showContextMenu, anchorRect } = this.state;
    console.log("SAMPLE integration", showContextMenu);
    return (
      <div style={{ margin: '100px' }}>
        <span>ffffffffffffff</span>
        {/* The 3-dots button that triggers the context menu */}
        <div className='groupConstructionMenuContextButton' ref={this.buttonRef}>
        <Button 
          icon="ellipsis horizontal" 
          onClick={() =>this.handleButtonClick(1)} 
         
        />
        </div >
        {/* Render the ContextMenu if needed */}
        {showContextMenu && (
          <ContextMenu 
            anchorRect={anchorRect} 
            onClose={() => this.handleButtonClick(1)}
          >
            <div style={{ padding: '4px 8px', cursor: 'pointer' }}>Option 1</div>
            <div style={{ padding: '4px 8px', cursor: 'pointer' }}>Option 2</div>
            <div style={{ padding: '4px 8px', cursor: 'pointer' }}>Option 3</div>
          </ContextMenu>
        )}
        <div>
            <span>ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</span>
            <div className='groupConstructionMenuContextButton' ref={this.buttonRef2}>
                <Button 
                    icon="ellipsis horizontal" 
                    onClick={() => this.handleButtonClick(2)}          
                />
            </div >
        </div>
      </div>
    );
  }
}

export default SampleIntegration;
