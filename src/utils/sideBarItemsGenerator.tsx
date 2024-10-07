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
        icon: item.icon, // Use the icon directly
        label: item.children ? (
          <span>{!collapsed && item.name}</span>
        ) : (
          <NavLink to={`/${role}/${item.path}`}>
            {!collapsed && item.name} {/* Show name only if not collapsed */}
          </NavLink>
        ),
      };

      // If the item has children (sub-menu), create a parent item
      if (item.children) {
        const parentMenuItem: TSidebarItem = {
          ...baseMenuItem, // Spread the base menu item properties
          children: item.children
            .map((child) => {
              if (child.name && child.path) {
                // Construct the full path for the child item using the parent path
                const childFullPath = `/${role}/${item.path}/${child.path}`;
                return {
                  key: child.name, // Unique key for the sub-menu item
                  label: <NavLink to={childFullPath}>{child.name}</NavLink>,
                } as TSidebarItem; // Type assertion
              }
              return null; // Return null for invalid children
            })
            .filter((child): child is TSidebarItem => child !== null), // Filter out any null entries
        };

        // Add the parent with children to the accumulator
        acc.push(parentMenuItem);
      } else {
        // If no children, just add the base menu item
        acc.push(baseMenuItem);
      }
    }

    return acc;
  }, []);

  return sidebarItems;
};
