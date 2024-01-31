// 用户相关的状态管理

import { getToken, request, setToken as _setToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

//解构导出action
export const { setToken, setUserInfo } = userStore.actions;

//解构导出reducer
export default userStore.reducer;

//异步代码

//登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    //发送异步请求 Send asynchronous request
    const res = await request.post("/authorizations", loginForm);
    //存入token save tokeni
    dispatch(setToken(res.data.token));
  };
};

//异步方法: 获取个人用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile');
    dispatch(setUserInfo(res.data));
  };
};

//导出异步代码
export { fetchLogin, fetchUserInfo };
