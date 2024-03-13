//Customer Layout

import React from "react";

import Header from "@/components/customer/header/header";
import Footer from "@/components/customer/footer/footer";

function CustomerLayOut({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Header></Header> */}
      <main>{children}</main>
      {/* <Footer></Footer> */}
    </>
  );
}

export default CustomerLayOut;
