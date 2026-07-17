import {Abc} from "@cf/ui-components"
import {Button,Flex,Steps} from "antd"
import {  CheckOutlined } from '@ant-design/icons';
import { useState } from "react";
// import "./index.css"

const content = 'This is a content.';
const items = [
  {
    title: 'Finished',
    content,
    subTitle:"first item"
  },
  {
    title: 'In Progress',
    content,
    subTitle: 'Left 00:00:08'
  },
  {
    title: 'Waiting',
    content,
    subTitle:"the end"
    //status:"wait"  //"error" | "wait" | "process" | "finish" | undefined
  },
];

 // 自定义渲染步骤节点和箭头
  const customProgressDot = (dot: React.ReactNode, { status, index }: any) => {
    const isLast = index === items.length - 1;
    const isFinished = status === 'finish';
    const isProcess = status === 'process';

    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {/* 步骤节点 */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isProcess ? '2px solid #1890ff' : isFinished ? '2px solid #52c41a' : '2px solid #d9d9d9',
            background: isProcess ? '#1890ff' : isFinished ? '#52c41a' : '#fff',
            color: isFinished ? '#fff' : isProcess ? '#fff' : '#d9d9d9',
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {isFinished ? <CheckOutlined /> : index + 1}
        </div>

        {/* 箭头：只在非最后一步显示 */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              height: 2,
              margin: '0 12px',
              background: isFinished ? '#52c41a' : '#d9d9d9',
              position: 'relative',
            }}
          >
            {/* 三角形箭头 */}
            <div
              style={{
                position: 'absolute',
                right: -8,
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: `10px solid ${isFinished ? '#52c41a' : '#d9d9d9'}`,
              }}
            />
          </div>
        )}
      </div>
    );
  };

  // 官方推荐的 iconRender 自定义步骤节点
  const customIconRender = (oriNode: React.ReactNode, info: { status: 'finish' | 'process' | 'wait'; index: number }) => {
    const { status, index } = info;
    if (status === 'finish') {
      return <CheckOutlined style={{ color: '#52c41a' }} />;
    }
    if (status === 'process') {
      return <span style={{ color: '#1890ff' }}>{index + 1}</span>;
    }
    return <span style={{ color: '#d9d9d9' }}>{index + 1}</span>;
  };

const App: React.FC = () => {
  console.info("patHandelCenter loading...")
  const [loading,setLoading]=useState<boolean>(false)
  const doSomeThing=()=>{
    setLoading(true)
    setTimeout(() => {
      console.info("doSomeThing in 2s...")
      setLoading(false)
    }, 2000);
  }
  
  return (
    <div>
      <h1>患者处置中心</h1>
      <Abc></Abc>
      <Button type="primary" loading={loading} onClick={doSomeThing}>test</Button>
      <Flex vertical gap="large">
        <Steps current={1} items={items}   percent={70} />
        <Steps current={1} items={items} variant="outlined" />
        <Steps current={1} items={items} size="small" />
        <Steps current={1} items={items} size="small" variant="outlined" />
      </Flex>
    </div>
  );
};

export default App;