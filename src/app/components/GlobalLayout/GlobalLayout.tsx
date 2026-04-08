import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import styles from "./GlobalLayout.module.scss";
import { ComponentChild, ComponentChildren } from "preact";

export function GlobalLayout({
  children,
}: {
  children: ComponentChildren;
}): ComponentChild {
  return (
    <div className={styles.container}>
      <div key="navbar" className={styles.navbar}>
        <a href="https://www.instagram.com/assignedgayatband/" target="_blank">
          <FaInstagram className={styles.icon} />
        </a>
        <a
          href="https://www.facebook.com/p/Assigned-Gay-At-Band-61573790732133/"
          target="_blank"
        >
          <FaFacebook className={styles.icon} />
        </a>
        <a href="https://www.youtube.com/@AssignedGayAtBand" target="_blank">
          <FaYoutube className={styles.icon} />
        </a>
      </div>
      {children}
    </div>
  );
}
