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
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  getArticleById,
  publishArticleAPI,
  updateArticleById,
} from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  //获取频道列表
  const { channelList } = useChannel();

  //提交表单
  const onFinish = (formValue) => {
    // 校验imageNumer 和 imageList 匹配的
    if (imageList.length !== imageNumber)
      return message.warning("Image number and images uploaded don't match ");

    //1. 按照接口文档处理表单格式
    const { title, content, channel_id } = formValue;
    const reqData = {
      title,
      content,
      cover: {
        type: imageNumber,

        //更新图片会改变格式
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
      channel_id,
    };

    //2. 调用接口提交
    //不同状态不同接口
    if (articleId) {
      updateArticleById({ ...reqData, id: articleId });
    } else {
      publishArticleAPI(reqData);
    }
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

  //回填数据
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  //获取表单
  const [form] = Form.useForm();
  useEffect(() => {
    //1. 通过id获取数据
    async function getArticleDetail() {
      const res = await getArticleById(articleId);
      form.setFieldsValue({
        ...res.data,
        type: res.data.cover.type,
      });
      setImageNumber(res.data.cover.type);
      setImageList(
        res.data.cover.images.map((url) => {
          return { url };
        })
      );
    }
    // 只有编辑的时候才需要回填
    if (articleId) {
      getArticleDetail();
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>Home</Link> },
              { title: articleId ? "Article Edit" : "Article Publish" },
            ]}
          />
        }
      >
        <Form
          form={form}
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
          <Form.Item label="Cover">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>single picture</Radio>
                <Radio value={3}>three pictures</Radio>
                <Radio value={0}>no picture</Radio>
              </Radio.Group>
            </Form.Item>
            {/* 
              listTupe : 决定选择文件框的外观样式
              showUploadList : 控制显示上传列表
              action : 上传的地址
              onChange : 上传过程中不断执行
            */}
            {imageNumber > 0 && (
              <Upload
                listType="picture-card"
                name="image"
                showUploadList
                onChange={onChange}
                action={"http://geek.itheima.net/v1_0/upload"}
                maxCount={imageNumber}
                fileList={imageList}
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
