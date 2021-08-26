import AvatarEdit from "../lib/AvatarEdit/AvatarEdit"
import classes from "../styles/profil.module.css"
export default function Profil(){

    return <div className={classes.container}>
     <div className={classes.page}>
     
     <AvatarEdit/>

     <p>
    à Protéger si pas de user. 
     </p>
     </div>
    </div>
}