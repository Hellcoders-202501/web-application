import userReducer from "./user/userSlice";
import commonReducer from "./common/commonSlice";
import contractReducer from "./contract/contractSlice";

const rootReducer = {
  user: userReducer,
  common: commonReducer,
  contract: contractReducer,
};

export default rootReducer;
