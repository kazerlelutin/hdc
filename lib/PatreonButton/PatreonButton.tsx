import classes from "./PatreonButton.module.css";
import Image from "next/image";

export default function PatreonButton() {
  return (
    <a
      href="https://patreon.com/kazerlelutin"
      target="_blank"
      className={classes.container}
    >
      <Image src="/patreon.webp" alt="logo patreon" width="20" height="20" />
      <div className="txt">Soutenez-moi !</div>
    </a>
  );
}
