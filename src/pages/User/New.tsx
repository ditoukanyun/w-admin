import React from 'react';
import { Button, Card, Form, Input, InputNumber, Select, Space, message } from 'antd';
import { useNavigate } from 'react-router';

const { Option } = Select;

const UserNew: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log('提交的数据:', values);
    message.success('用户创建成功');
    navigate('/user');
  };

  const handleCancel = () => {
    navigate('/user');
  };

  return (
    <Card title="新增用户" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} max={120} placeholder="请输入年龄" />
        </Form.Item>

        <Form.Item
          name="address"
          label="地址"
          rules={[{ required: true, message: '请输入地址' }]}
        >
          <Input placeholder="请输入地址" />
        </Form.Item>

        <Form.Item
          name="tags"
          label="标签"
          rules={[{ required: true, message: '请选择标签' }]}
        >
          <Select mode="multiple" placeholder="请选择标签">
            <Option value="开发">开发</Option>
            <Option value="前端">前端</Option>
            <Option value="后端">后端</Option>
            <Option value="设计">设计</Option>
            <Option value="UI">UI</Option>
            <Option value="测试">测试</Option>
            <Option value="QA">QA</Option>
            <Option value="产品">产品</Option>
            <Option value="PM">PM</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={handleCancel}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserNew; 