import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";

import ROUTES from "@/config/routes";

function NavBar({ currentRoute }: { currentRoute: string }) {
  return (
    <Navbar className="justify-start -mx-6">
      <NavbarContent justify="start">
        <NavbarItem isActive={currentRoute === ROUTES.HOME}>
          <Link to={ROUTES.HOME}>Users List</Link>
        </NavbarItem>

        <NavbarItem isActive={currentRoute === ROUTES.CREATE_USER}>
          <Link to={ROUTES.CREATE_USER}>Create User</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
