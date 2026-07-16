import React, { useState } from 'react';
import { Timeline, Transfer } from 'antd';
import type { TransferProps } from 'antd';
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,CheckCircleOutlined
} from '@ant-design/icons';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData = Array.from({ length: 20 }).map<RecordType>((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>([]);

  const onChange: TransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll: TransferProps['onScroll'] = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  return (
    // <Transfer
    //   dataSource={mockData}
    //   titles={['Source', 'Target']}
    //   showSearch
    //   targetKeys={targetKeys}
    //   selectedKeys={selectedKeys}
    //   onChange={onChange}
    //   onSelectChange={onSelectChange}
    //   onScroll={onScroll}
    //   render={(item) => item.title}
    // />

    <Timeline variant='filled' items={[{
      title: 'Create a services site 2015-09-01',
      content:"第一次创建blog"
    },{
      title: 'Create a services site 2016-09-01',
      content:"加入antd组件库"
    },{
      // "color":'pink',
      icon:<CheckCircleOutlined />,
      title: 'Create a services site 2018-09-01',
      content:"引入评论功能，山东化工付军所多过不不不不不不不不所多付所付说过付或所过付说付过军所付过所军付过所军付所军"
    },{
      title: 'Create a services site 2022-09-01',
      content:"使用flex布局"
    }]}></Timeline>
  );
};

export default App;