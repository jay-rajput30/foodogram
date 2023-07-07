import React from "react";
import styles from "./Explore.module.css";
import { useLocation } from "react-router-dom";
import { checkPageLocation } from "../../utils/utls,";
import MobileNavbar from "../../components/Navbar/MobileNavbar/MobileNavbar";
import DesktopNavbar from "../../components/Navbar/DesktopNavbar/DesktopNavbar";
const Explore = () => {
  const location = useLocation();
  const checkPath = checkPageLocation(location.pathname);

  return (
    <div className={styles.exploreWrapper}>
      {!checkPath && <MobileNavbar />}
      {!checkPath && <DesktopNavbar />}
    </div>
  );
};

export default Explore;
