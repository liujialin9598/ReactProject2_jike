import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/logo.png";
import { fetchLogin } from "@/store/modules/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish =async (value) => {
    //触发异步请求 trigger asynchronous actions
    //等待fetch正确返回 await fetch success
    await dispatch(fetchLogin(value));

    // 1. 跳转到首页 go to home page
    navigate("/");
    // 2. 提示一下用户 alert user
    message.success("Login success");
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        {/* login form */}
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            name="mobile"
            initialValue="13888888888"
            rules={[
              // 多条逻辑 按照顺序校验
              {
                required: true,
                message: "please input your username, default: admin",
              },
              {
                pattern: /^1[3-9]\d{9}$|admin/,
                message: "Phone number doesn't match the format or admin",
              },
            ]}
          >
            <Input size="large" placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="code"
            initialValue="246810"
            rules={[
              {
                required: true,
                message: "please input your password,  default: admin",
              },
            ]}
          >
            <Input size="large" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
