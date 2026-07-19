import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />

      <main className="ml-64 w-full min-h-screen bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;