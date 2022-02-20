import React from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";
import {
  Nav,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
  return (
    <IconContext.Provider value={{ color: "#272343" }}>
      <Nav>
        <NavbarContainer>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks
                style={{ fontFamily: "Roboto" }}
                exact
                activeClassName="active"
                to="/"
              >
                Home
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks exact activeClassName="active" to="/about">
                About
              </NavLinks>
            </NavItem>

            <NavItem>
              <NavLinks exact activeClassName="active" to="/comingSoon">
                Coming Soon
              </NavLinks>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
