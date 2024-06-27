import Link from "next/link";
import React from "react";
import styles from "./sideBar.module.scss"; // Import CSS file for styling
import { sidebarItems } from "./constant";

const Sidebar = () => {
  return (
    <div className={styles.sideBarWrapper}>
      <ul className={styles.listWrapper}>
      <li key={sidebarItems[0].id} className={styles.list}>
        <Link href={sidebarItems[0].link}>
        <img src="/images/dashboard.png" alt=""/> {sidebarItems[0].title}
        </Link>
          </li>

          <li key={sidebarItems[1].id} className={styles.list}>
            <Link href={sidebarItems[1].link}><img src="/images/project.png" alt="" /> {sidebarItems[1].title}</Link>
          </li>

          <li key={sidebarItems[2].id} className={styles.list}>
            <Link href={sidebarItems[2].link}><img src="/images/supplier.png" alt="" /> {sidebarItems[2].title}</Link>
          </li>
          <li key={sidebarItems[3].id} className={styles.list}>
            <Link href={sidebarItems[3].link}><img src="/images/dataEntry.png" alt="" /> {sidebarItems[3].title}</Link>
          </li>

        {/* {sidebarItems.map((item) => (
          <li key={item.id} className={styles.list}>
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Sidebar;