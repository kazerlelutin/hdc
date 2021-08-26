import foods from "../services/food/foods";
import food from "../services/food/food";
import login from "../services/user/login";
import loginByToken from "../services/user/loginByToken";
import updateAvatar from "../services/user/updateAvatar";
import updateName from "../services/user/updateName";


export default {
    Query: {
        foods,
        food
    },
    Mutation: {
        login,
        loginByToken,
        updateAvatar,
        updateName
    }
}