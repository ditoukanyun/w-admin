import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Switch,
  TimePicker,
} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const { Option } = Select;
const { RangePicker } = DatePicker;

const TestOne: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState<'large' | 'middle' | 'small'>('middle');

  const onFormLayoutChange = ({ size }: { size: 'large' | 'middle' | 'small' }) => {
    setComponentSize(size);
  };

  const handleFinish = (values: any) => {
    console.log('表单提交的数据:', values);
  };

  const handleBack = () => {
    navigate('/test');
  };

  return (
    <Card title="测试页面1 - 表单组件" bordered={false}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{ maxWidth: 800 }}
        onFinish={handleFinish}
      >
        <Form.Item label="表单尺寸" name="size">
          <Radio.Group>
            <Radio.Button value="small">小</Radio.Button>
            <Radio.Button value="middle">中</Radio.Button>
            <Radio.Button value="large">大</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="输入框" name="input">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="选择器" name="select">
          <Select placeholder="请选择">
            <Option value="option1">选项1</Option>
            <Option value="option2">选项2</Option>
            <Option value="option3">选项3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="树选择器" name="treeSelect">
          <Select showSearch style={{ width: '100%' }} placeholder="请选择">
            <Option value="parent1">父节点1</Option>
            <Option value="parent1-0">子节点1-0</Option>
            <Option value="parent1-1">子节点1-1</Option>
            <Option value="parent2">父节点2</Option>
          </Select>
        </Form.Item>
        <Form.Item label="级联选择" name="cascader">
          <Select
            style={{ width: '100%' }}
            placeholder="请选择"
            options={[
              {
                value: 'zhejiang',
                label: '浙江',
                children: [
                  {
                    value: 'hangzhou',
                    label: '杭州',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="日期选择器" name="datePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="日期范围" name="rangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="时间选择器" name="timePicker">
          <TimePicker />
        </Form.Item>
        <Form.Item label="数字输入框" name="inputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="开关" name="switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="滑动输入条" name="slider">
          <InputNumber />
        </Form.Item>
        <Form.Item label="单选框" name="radio">
          <Radio>单选</Radio>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={handleBack}>返回</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TestOne;
