import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/shared.type";

export const sideBarItemsGenerator = (
  items: TUserPath[],
  role: string,
  collapsed: boolean // Parameter to handle collapsed state
): TSidebarItem[] => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    // Check if the item has a valid path and name
    if (item.path && item.name) {
      // Create a base menu item with icon and name
      const baseMenuItem: TSidebarItem = {
        key: item.name,
        icon: item.icon, 
        label: item.children ? (
          <span>{!collapsed && item.name}</span>
        ) : (
          <NavLink to={`/${role}/${item.path}`}>
            {!collapsed && item.name} 
          </NavLink>
        ),
      };

      // If the item has children (sub-menu), create a parent item
      if (item.children) {
        const parentMenuItem: TSidebarItem = {
          ...baseMenuItem, 
          children: item.children
            .map((child) => {
              if (child.name && child.path) {
                
                const childFullPath = `/${role}/${item.path}/${child.path}`;
                return {
                  key: child.name, 
                  label: <NavLink to={childFullPath}>{child.name}</NavLink>,
                } as TSidebarItem; 
              }
              return null; 
            })
            .filter((child): child is TSidebarItem => child !== null), 
        };

        
        acc.push(parentMenuItem);
      } else {
        
        acc.push(baseMenuItem);
      }
    }

    return acc;
  }, []);

  return sidebarItems;
};
