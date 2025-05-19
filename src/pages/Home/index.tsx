import { Button, Card } from 'antd';
import React, { useState } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      Home1231
      <Card title={`总共：${count}`}>
        <Button
          type="primary"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          加
        </Button>
      </Card>
    </div>
  );
};

export default Home;
