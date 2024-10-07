import { TRoute, TUserPath } from "../types/shared.type";

export const routeGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {


    if (item.path && item.element) {
      console.log(item)
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: `${item.path}/${child.path!}`,
          element: child.element,
        });

      });

     

    }

    console.log(acc)
    return acc;
  }, []);

  return routes;
};
