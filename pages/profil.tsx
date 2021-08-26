import AvatarEdit from "../lib/AvatarEdit/AvatarEdit";
import EmailInput from "../lib/emailInput/emailInput";
import NicknameEdit from "../lib/NicknameEdit/NicknameEdit";
import classes from "../styles/profil.module.css";
export default function Profil() {
  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <AvatarEdit />
        <NicknameEdit/>
        <EmailInput />
      </div>
    </div>
  );
}
