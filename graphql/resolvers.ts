import foods from "../services/foods/foods";
import food from "../services/food/food";
import login from "../services/user/login";

export default {
    Query: {
        foods,
        food
    },
    Mutation: {
        login
    }
}