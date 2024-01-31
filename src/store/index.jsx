//组装redux

import { configureStore } from "@reduxjs/toolkit";
import user from "./modules/user";

export default configureStore({
  reducer: {
    user: user,
  },
});

//下一步 : index.js 关联redux
//import { Provider } from "react-redux";
