import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import styles from "./GlobalLayout.module.scss";
import { ComponentChild, ComponentChildren } from "preact";
import { IconType } from "react-icons";
import { Link } from "../Link";

export function GlobalLayout({
  children,
}: {
  children: ComponentChildren;
}): ComponentChild {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        {links.map(({ href, Icon }) => (
          <Link key={href} href={href}>
            <Icon className={styles.icon} />
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}

const links: Link[] = [
  { href: "https://www.instagram.com/assignedgayatband/", Icon: FaInstagram },
  {
    href: "https://www.facebook.com/p/Assigned-Gay-At-Band-61573790732133/",
    Icon: FaFacebook,
  },
  { href: "https://www.youtube.com/@AssignedGayAtBand", Icon: FaYoutube },
];

type Link = { href: string; Icon: IconType };
