"use client";

import NavbarAvatarPreview from "./navBar";
import Breadcrumbs from "./breadcrumbs";
import Link from "next/link";
import Sport_Link from "./sport_link";

function Header() {
  return (
    <>
      <NavbarAvatarPreview></NavbarAvatarPreview>
      <div className="pt-6 pl-10">
        <Breadcrumbs></Breadcrumbs>
      </div>
      <Link href="/about"> About </Link>
      <Link href="/manager"> Manager </Link>
      <Link href="/manager/add_field">Thêm sân</Link>
      <Sport_Link></Sport_Link>
    </>
  );
}

export default Header;
