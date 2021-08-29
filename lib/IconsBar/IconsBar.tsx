import classes from "./IconsBar.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    name: "créer",
    href: "/creer",
    title: "ajouter une recette !",
    icon: "/cross.webp",
  },
];
export default function IconsBar() {
  const router = useRouter();

  return (
    <div className={classes.container}>
      <aside className={classes.aside}>
        {routes.map((route) => (
          <div
            className={classes.link}
            key={route.name}
            data-current={router.pathname === route.href}
          >
            <Link href={route.href}>
              <a>
              <Image
                src={route.icon}
                title={route.title}
                alt={route.name}
                width="25"
                height="25"
              />
              </a>
            </Link>
          </div>
        ))}
      </aside>
    </div>
  );
}
