import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Popconfirm,
} from "antd";
// 引入date-picker汉化包
// import locale from "antd/es/date-picker/locale/zh_CN";

// 导入资源--表格区域
import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
import { useEffect, useState } from "react";
import { deleteArticleAPI, getArticleListApi } from "@/apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const navigate = useNavigate();
  // 准备列数据
  const columns = [
    {
      title: "Cover",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) =>
        data == 1 ? (
          <Tag color="yellow">Pending</Tag>
        ) : (
          <Tag color="green">Published</Tag>
        ),
    },
    {
      title: "pubdate",
      dataIndex: "pubdate",
    },
    {
      title: "Read",
      dataIndex: "read_count",
    },
    {
      title: "Comments",
      dataIndex: "comment_count",
    },
    {
      title: "Thumbs Up",
      dataIndex: "like_count",
    },
    {
      title: "Process",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => confirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //获取频道列表
  const { channelList } = useChannel();

  //筛选功能
  //1. 准备数据
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  //获取文章列表
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getList() {
      const res = await getArticleListApi(reqData);
      setList(res.data.results);
      setCount(res.data.total_count);
    }
    getList();
  }, [reqData]);

  //2. 获取数据
  const onFinish = (formValue) => {
    setReqData({
      ...reqData,
      status: formValue.status,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date[0].format("YYYY-MM-DD"),
      end_pubdate: formValue.date[1].format("YYYY-MM-DD"),
    });

    //3. 重新渲染table  (复用代码)
  };

  //分页功能:
  const onPageChange = (page) => {
    setReqData({
      ...reqData,
      page,
    });
  };

  //删除功能
  const confirm = async (data) => {
    await deleteArticleAPI(data.id);
    setReqData({
      ...reqData,
    });
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: "Article List" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={""}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={2}>Verified</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Please select a channel"
              style={{ width: 120 }}
            >
              {channelList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={` ${count} results found：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
