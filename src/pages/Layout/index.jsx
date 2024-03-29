import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo, fetchUserInfo } from "@/store/modules/user";

const { Header, Sider } = Layout;

const items = [
  {
    label: "Home",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Article Manage",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "Article Publish",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  //点击切换路由
  const navigate = useNavigate();
  const onMenuClick = (route) => {
    navigate(route.key);
  };

  //设置高亮
  const location = useLocation();
  const selectedKey = location.pathname;

  // 获取个人信息
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  const user = useSelector((state) => state.user);

  //确认退出
  const exitConfirm = () => {
    dispatch(clearUserInfo());
    navigate('/login')
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{user.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="Do you want to exit?"
              okText="Exit"
              cancelText="Cancel"
              onConfirm={exitConfirm}
            >
              <LogoutOutlined /> Logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            onClick={onMenuClick}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级理由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
