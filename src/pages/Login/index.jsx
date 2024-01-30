import "./index.scss";
import { Card, Form, Input, Button } from "antd";
import logo from "@/assets/logo.png";

const Login = () => {
  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        {/* login form */}
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            name="username"
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
            name="password"
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
