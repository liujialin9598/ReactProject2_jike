// 用户相关的状态管理

import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token_key") || "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token_key", action.payload);
    },
  },
});

//解构导出action
export const { setToken } = userStore.actions;

//解构导出reducer
export default userStore.reducer;

//异步代码

//登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    //发送异步请求 Send asynchronous request
    const res = await request.post("/authorizations", loginForm);
    //存入token save token
    dispatch(setToken(res.data.token));
  };
};

//导出异步代码
export { fetchLogin };
