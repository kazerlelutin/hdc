import classes from "./background.module.css";
const mountains = ['one','two','three','four','five','six','seven'];

export default function Background() {

    return <div className={classes.sand}>
        {mountains.map(mountain=> 
            <div key={mountain} className={`${classes.mountain} ${classes[mountain]}`} />
        )}
    </div>

}