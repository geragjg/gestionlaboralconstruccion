import React, { Component } from 'react';

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.state = { style: {} };
  }

  componentDidMount() {
    this.updatePosition();
    // Listen for clicks outside the menu to auto-close it.
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  updatePosition = () => {
    const { anchorRect } = this.props;
    const menuNode = this.menuRef.current;
    console.log(menuNode)
    debugger
    if (!anchorRect || !menuNode) return;
    const menuRect = menuNode.getBoundingClientRect();
    let left, top;

    // Horizontal positioning:
    // If there is enough space to show the menu to the right of the button,
    // position it to the right (i.e. left edge of menu = button's right edge).
    // Otherwise, position it so that the menu’s right edge aligns with the button's left edge.
    if (anchorRect.right + menuRect.width <= window.innerWidth) {
      left = anchorRect.left;
    } else {
      left = anchorRect.left - menuRect.width;
    }

    // Vertical positioning:
    // If there is enough space below the button, show it below (top of menu = button's bottom edge).
    // Otherwise, show it above the button (bottom of menu = button's top edge).
    if (anchorRect.bottom + menuRect.height <= window.innerHeight) {
      top = anchorRect.bottom;
    } else {
      top = anchorRect.top - menuRect.height;
    }

    this.setState({ style: { left, top, zIndex: 1000 } });
  };

  handleClickOutside = (e) => {
    if (this.menuRef.current && !this.menuRef.current.contains(e.target)) {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  };

  render() {
    const { style } = this.state;
    return (
      <div className='groupConstructionMenuContext'
        ref={this.menuRef}
        style={{
          ...style,
          background: '#fff',
          border: '1px solid #ccc',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          padding: '8px'
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ContextMenu;
