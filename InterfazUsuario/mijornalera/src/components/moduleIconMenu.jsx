import React from 'react';
import { Menu } from 'semantic-ui-react';

const ModuleIconMenu = ({ menuItems, onMenuItemClick }) => {
  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  return (
    <Menu vertical compact>
      {menuItems.map((item, index) => (
        <Menu.Item
          key={index}
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from bubbling if necessary
            onMenuItemClick(item.clickComponent, item.propsObject);
          }}
        >
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default ModuleIconMenu;
