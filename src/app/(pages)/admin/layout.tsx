const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen mt-15">
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
