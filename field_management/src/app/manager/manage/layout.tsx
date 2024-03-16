//Customer Layout

import React from "react";
import ManagerHeader from "@/components/manager/ManagerHeader";

function CustomerLayOut({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ManagerHeader></ManagerHeader>
      <main>{children}</main>
      {/* <Footer></Footer> */}
    </>
  );
}

export default CustomerLayOut;
