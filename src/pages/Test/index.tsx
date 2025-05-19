import React from 'react';
import { Button, Card, Col, Row, Statistic, List, Typography, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, ShoppingCartOutlined, FileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const { Title, Paragraph } = Typography;

const TestPage: React.FC = () => {
  const navigate = useNavigate();

  const statisticsData = [
    { title: '活跃用户', value: 1128, prefix: <UserOutlined />, color: '#3f8600', percent: 11 },
    { title: '订单数量', value: 93, prefix: <ShoppingCartOutlined />, color: '#cf1322', percent: -3.5 },
    { title: '文章数量', value: 257, prefix: <FileOutlined />, color: '#1677ff', percent: 7.2 },
  ];

  const listData = [
    '测试页面可以包含多种组件和功能',
    '点击下方测试按钮可以跳转到测试子页面',
    '这些页面都会在顶部生成对应的标签页',
    '关闭标签页时会自动切换到其他标签',
    '动态路由页面会在关闭后返回到父级页面',
  ];

  return (
    <div>
      <Card title="测试页面" bordered={false}>
        <Row gutter={16}>
          {statisticsData.map((item, index) => (
            <Col span={8} key={index}>
              <Card>
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={0}
                  valueStyle={{ color: item.color }}
                  prefix={item.prefix}
                  suffix={
                    item.percent > 0 ? (
                      <span>
                        <ArrowUpOutlined /> {item.percent}%
                      </span>
                    ) : (
                      <span>
                        <ArrowDownOutlined /> {Math.abs(item.percent)}%
                      </span>
                    )
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Divider />

        <Typography>
          <Title level={4}>测试页面说明</Title>
          <Paragraph>
            这是一个测试页面，用于展示多页签导航的功能。您可以通过点击下方的按钮跳转到不同的测试子页面。
          </Paragraph>

          <List
            bordered
            dataSource={listData}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Divider />

          <Row gutter={16}>
            <Col>
              <Button type="primary" onClick={() => navigate('/test/test_one')}>
                测试页面1
              </Button>
            </Col>
          </Row>
        </Typography>
      </Card>
    </div>
  );
};

export default TestPage;
