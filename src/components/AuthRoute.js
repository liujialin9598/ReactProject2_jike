//判断是否有token

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export function AuthRoute({ children }) {
  const token = getToken();
  if (token) {
    //有token  正常跳转
    return <>{children}</>;
  } else {
    //无token  去登录
    return <Navigate to={"/login"} replace />;
  }
}
