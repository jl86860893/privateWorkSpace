import React from 'react';
import { Table, Spin } from 'antd';
import performanceFn from '@/utils/performance';

class Performance extends React.Component {
  columns = [
    {
      title: '参数',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '毫秒',
      dataIndex: 'result',
      width: 200,
    },
    {
      title: '说明',
      dataIndex: 'des',
      width: 500,
    },
  ];

  constructor(props) {
    super(props)
    this.state = {
      datas: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        datas: performanceFn(),
      })
    }, 2000);
  }

  render() {
    const { datas } = this.state;
    return (
      <>
        {datas ? (<Table
          columns={this.columns}
          dataSource={datas}
          pagination={false}
        />) : <Spin size="large" /> }
      </>
    )
  }
}

export default Performance;
