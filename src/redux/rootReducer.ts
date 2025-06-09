import userReducer from "./user/userSlice";
import commonReducer from "./common/commonSlice";
import contractReducer from "./contract/contractSlice";
import notificationReducer from "./notification/notificationSlice";

const rootReducer = {
  user: userReducer,
  common: commonReducer,
  contract: contractReducer,
  notification: notificationReducer,
};

export default rootReducer;
