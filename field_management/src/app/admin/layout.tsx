//Admin Layout

import React from "react";
import AdminHeader from "@/components/admin/header/AdminHeader";

function AdminLayOut({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminHeader></AdminHeader>
      <main>
        <div className="container mx-auto px-40">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayOut;
