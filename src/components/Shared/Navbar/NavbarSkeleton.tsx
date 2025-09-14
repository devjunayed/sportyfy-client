// NavbarSkeleton.tsx - Create this as a separate component
const NavbarSkeleton = () => {
  return (
    <div className="fixed top-0 left-0 text-white w-full z-50 bg-[#1B1F3B]">
      <div className="navbar m-0 p-0 max-w-7xl mx-auto text-white">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile menu button skeleton */}
          <div className="lg:hidden">
            <div className="btn btn-ghost">
              <div className="w-5 h-5 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Desktop logo skeleton */}
          <div className="lg:block hidden">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded animate-pulse"></div>
              <div className="w-24 h-6 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center">
          {/* Mobile logo skeleton */}
          <div className="text-xl lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded animate-pulse"></div>
              <div className="w-20 h-5 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Desktop menu skeleton */}
          <div className="hidden w-full lg:flex">
            <ul className="flex flex-wrap items-center gap-4 menu-horizontal px-1">
              {/* Menu items skeleton */}
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className="animate-pulse">
                  <div className="w-16 h-6 bg-gray-600 rounded"></div>
                </li>
              ))}
              {/* Dashboard link skeleton */}
              <li className="animate-pulse">
                <div className="w-20 h-6 bg-gray-600 rounded"></div>
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {/* User avatar skeleton */}
          <div className="dropdown dropdown-end">
            <div className="avatar border rounded-full avatar-placeholder animate-pulse">
              <div className="bg-gray-600 w-10 h-10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSkeleton;