import classes from "./LinksMenu.module.css";
import { menuLinks } from "./menuLinks";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LinksMenuMobile() {
  const router = useRouter();

  return (
    <div className={classes.containerMobile}>
      {menuLinks.map((link) => (
        <Link {...link} key={link.name}>
          <div
            className={classes.linkMobile}
            data-current={router.pathname === link.href}
          >
            {link.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
