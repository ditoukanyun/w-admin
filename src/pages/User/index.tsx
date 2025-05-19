import React, { useState } from 'react';
import { Button, Card, Space, Table, Tag, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

interface UserData {
  id: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

// 模拟数据
const initialData: UserData[] = [
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

const UserList: React.FC = () => {
  const [data, setData] = useState<UserData[]>(initialData);
  const navigate = useNavigate();

  // 处理编辑用户
  const handleEdit = (id: number) => {
    navigate(`/user/${id}`);
  };

  // 处理删除用户
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      onOk: () => {
        setData(data.filter(item => item.id !== id));
        message.success('删除成功');
      },
    });
  };

  // 处理新增用户
  const handleAdd = () => {
    navigate('/user/new');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserData) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record.id)}
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title="用户管理" 
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          新增用户
        </Button>
      }
    >
      <Table rowKey="id" columns={columns} dataSource={data} />
    </Card>
  );
};

export default UserList;
