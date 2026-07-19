import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    //{ name: "Categories", path: "/admin/categories" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
    { name: "Coupons", path: "/admin/coupons"},
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex flex-col p-4 gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;