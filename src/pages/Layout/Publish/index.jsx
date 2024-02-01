import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { getChannelAPI, publishArticleAPI } from "@/apis/article";

const { Option } = Select;

const Publish = () => {
  //获取频道列表
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    //1. 封装函数 ,在函数体内调用接口
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    //2. 调用函数
    getChannelList();
  }, []);

  //提交表单
  const onFinish = (formValue) => {
    //1. 按照接口文档处理表单格式
    const { title, content, channel_id } = formValue;
    const reqData = {
      title,
      content,
      cover: {
        type: 0,
        images: [],
      },
      channel_id,
    };
    //2. 调用接口提交
    publishArticleAPI(reqData);
  };

  //上传图片
  const [imageList, setImageList] = useState([]);
  const onChange = (value) => {
    setImageList(value.fileList);
  };

  //切换图片封面类型
  const [imageNumber, setImageNumber] = useState(0);
  const onTypeChange = (e) => {
    setImageNumber(e.target.value);
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: "Article Publish" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Please enter title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: "Please select channel" }]}
          >
            <Select placeholder="Please select channel" style={{ width: 400 }}>
              {channelList.map((items, index) => (
                <Option value={items.id} key={items.id}>
                  {index}. {items.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listTupe : 决定选择文件框的外观样式
              showUploadList : 控制显示上传列表
              action : 上传的地址
              onChange : 上传过程中不断执行
            */}
            {imageNumber>0 && (
              <Upload
                listType="picture-card"
                name="image"
                showUploadList
                onChange={onChange}
                action={"http://geek.itheima.net/v1_0/upload"}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please write content" }]}
          >
            {/*  富文本编辑器 react-quill*/}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Please write the content"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Publish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
