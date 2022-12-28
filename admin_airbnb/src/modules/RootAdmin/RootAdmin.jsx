import React from "react";
import SideBar from "./SideBar/SideBar";

import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./RootAdmin.module.scss";


const RootAdmin = () => {

  return (
    <div className={styles.rootAdmin}>
      <div className={styles.SideBar}>
        <SideBar />
      </div>
      <div className={styles.content}>
        {/* <div className={styles.Header}>
          <Header />
        </div> */}
        <div className={styles.Home}>
          <Outlet />
        </div>
      </div>
    </div>


  );
};

export default RootAdmin;
