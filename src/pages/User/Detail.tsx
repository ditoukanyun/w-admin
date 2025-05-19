import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, Card, Form, Input, InputNumber, Select, Space, message, Spin } from 'antd';

const { Option } = Select;

interface UserData {
  id: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

// 模拟数据
const mockUsers: UserData[] = [
  {
    id: 1,
    name: '张三',
    age: 32,
    address: '北京市朝阳区',
    tags: ['开发', '前端'],
  },
  {
    id: 2,
    name: '李四',
    age: 42,
    address: '上海市浦东新区',
    tags: ['设计', 'UI'],
  },
  {
    id: 3,
    name: '王五',
    age: 28,
    address: '广州市天河区',
    tags: ['测试', 'QA'],
  },
  {
    id: 4,
    name: '赵六',
    age: 35,
    address: '深圳市南山区',
    tags: ['产品', 'PM'],
  },
];

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  // 模拟获取用户数据
  useEffect(() => {
    const fetchData = async () => {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (id === 'new') {
        setUserData({
          id: 0,
          name: '',
          age: 0,
          address: '',
          tags: [],
        });
      } else {
        const userId = parseInt(id || '0', 10);
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          setUserData(user);
          form.setFieldsValue(user);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [id, form]);

  const handleSubmit = (values: any) => {
    console.log('提交的数据:', values);
    message.success(`用户${id === 'new' ? '创建' : '更新'}成功`);
    navigate('/user');
  };

  const handleCancel = () => {
    navigate('/user');
  };

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  return (
    <Card title={id === 'new' ? '新增用户' : `编辑用户: ${userData?.name}`} bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
        initialValues={userData || {}}
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

export default UserDetail; 