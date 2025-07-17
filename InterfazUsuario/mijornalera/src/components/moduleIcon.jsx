import React, { Component } from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ModuleIconMenu from './moduleIconMenu'; // Import the new menu component


class ModuleIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false,
    };
    this.wrapperRef = React.createRef();
    this.hideMenuTimer = null;
  }


   componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
 componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    clearTimeout(this.hideMenuTimer);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      if (this.state.isMenuVisible) {
        this.setState({ isMenuVisible: false });
      }
    }
  };

  handleContainerMouseEnter = () => {
    const { icon } = this.props;
    if (icon.menuItems && icon.menuItems.length > 0) {
      clearTimeout(this.hideMenuTimer);
      this.setState({ isMenuVisible: true });
    }
  };

  handleContainerMouseLeave = () => {
    const { icon } = this.props;
    if (icon.menuItems && icon.menuItems.length > 0) {
      this.hideMenuTimer = setTimeout(() => {
        this.setState({ isMenuVisible: false });
      }, 200); // Delay to allow moving mouse to menu
    }
  };

  handleIconClick = () => {
    const { icon, onClick } = this.props;
    // If there are no menu items, or if you want a default action when the icon itself is clicked
    // even with menu items, use the icon's direct clickComponent and propsObject.
    if (!icon.menuItems || icon.menuItems.length === 0) {
      if (icon.clickComponent) { // Ensure clickComponent exists
        onClick(icon.clickComponent, icon.propsObject);
      }
    } else if (icon.clickComponent && icon.menuItems && icon.menuItems.length > 0) {
      // Optional: if menuItems exist, but icon itself is also clickable for a default action
      // For example, clicking the icon could open the first menu item or a general page.
      // onClick(icon.clickComponent, icon.propsObject);
      // For now, if menuItems exist, icon click does nothing directly, menu items handle navigation.
    }
  };

  handleMenuItemClick = (component, props) => {
    this.props.onClick(component, props);
    this.setState({ isMenuVisible: false }); // Hide menu after a menu item is clicked
  };

  render() {
    const { icon } = this.props;
    const { isMenuVisible } = this.state;

    return (
      <Grid.Column
        textAlign="left"
        style={{ position: 'relative' }} // For absolute positioning of the menu
        ref={this.wrapperRef}
        onMouseEnter={this.handleContainerMouseEnter}
        onMouseLeave={this.handleContainerMouseLeave}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: (icon.menuItems && icon.menuItems.length > 0) || icon.clickComponent ? 'pointer' : 'default',
          }}
          onClick={this.handleIconClick}
          title={icon.hoverText} // Show hover text if available
        >
          <Segment
            circular
            style={{
              width: '120px',
              height: '80px',
              padding: '0',
              border: '1px solid grey',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name={icon.iconName} size="big" />
          </Segment>
          <div style={{ marginTop: '10px', color: '#4a4a4a', textAlign: 'center' }}>
            {icon.name}
          </div>
        </div>
        {isMenuVisible && icon.menuItems && icon.menuItems.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 1001, marginTop: '5px' }}>
            <ModuleIconMenu
              menuItems={icon.menuItems}
              onMenuItemClick={this.handleMenuItemClick}
            />
          </div>
        )}
      </Grid.Column>
    );
  }
}

export default ModuleIcon;
