import userReducer from "./user/userSlice";
import commonReducer from "./common/commonSlice";

const rootReducer = {
    user: userReducer,
    common: commonReducer,
};

export default rootReducer;
