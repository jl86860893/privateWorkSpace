import React, { Component } from 'react';

import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';

class DeviceInfoMapChart extends Component {
  echartRef = React.createRef();

  data = [
    { name: '西藏' },
    { name: '青海' },
    { name: '宁夏' },
    { name: '海南' },
    { name: '甘肃' },
    { name: '贵州' },
    { name: '新疆' },
    { name: '云南' },
    { name: '重庆' },
    { name: '吉林' },
    { name: '山西' },
    { name: '天津' },
    { name: '江西' },
    { name: '广西' },
    { name: '陕西' },
    { name: '黑龙江' },
    { name: '内蒙古' },
    { name: '安徽' },
    { name: '北京' },
    { name: '福建' },
    { name: '上海' },
    { name: '湖北', selected: true },
    { name: '湖南' },
    { name: '四川' },
    { name: '辽宁' },
    { name: '河北' },
    { name: '河南' },
    { name: '浙江' },
    { name: '山东' },
    { name: '江苏' },
    { name: '广东' },
    { name: '台湾' },
  ]

  myChart = null;

  componentDidMount() {
    const { actionRef, updateProvinceName } = this.props;
    echarts.registerMap('zhongguo', geoJson);
    this.myChart = echarts.init(this.echartRef.current);
    this.initalECharts()
    actionRef.current = {
      resetMap: value => this.resetMap(value),
    }
    this.myChart.on('click', params => {
      if (params.componentType === 'series') {
        const provinceName = params.name;
        updateProvinceName(provinceName)
        this.data.map(item => {
          if (item.name === provinceName) {
            item.selected = true;
            return item;
          }
          item.selected = false;
          return item
        })
      }
      this.updateOptions()
    });
  }

  componentWillUnmount() {
    this.myChart.off('click')
  }

  resetMap = () => {
    this.myChart.clear();
    this.initalECharts();
  }

  updateOptions = () => {
    this.myChart.setOption({
      series: [
        {
          data: this.data,
        },
      ],
    })
  }

  initalECharts = () => {
    this.myChart.setOption({
      title: {
        text: '设备信息总览',
        left: 'left',
        padding: [15, 0, 0, 20],
        textStyle: {
          color: '#5C6280',
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: '{b}',
      },
      series: [
        {
          type: 'map',
          map: 'china',
          roam: true,
          zoom: 1,
          scaleLimit: {
            min: 0.5,
            max: 6,
          },
          itemStyle: {
            normal: { // 未选中状态
              borderWidth: 1, // 边框大小
              borderColor: '#6598FF',
              areaColor: '#F2F7FF', // 背景颜色
              label: {
                show: true, // 显示名称
                formatter: params => {
                  if (params.name === '南海诸岛' || params.name === '澳门' || params.name === '香港') {
                    return ' ';
                  }
                  return params.name;
                },
              },
            },
            emphasis: {
              borderWidth: 5, // 边框大小
              borderColor: '#6598FF',
              areaColor: '#6598FF', // 背景颜色
              zoom: 1.3,
            },
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          data: this.data,
        },
      ],
    });
  }

  render() {
    return (
      <>
        <div ref={this.echartRef} style={{ width: '100%', height: '100%' }}>
        </div>
      </>
    )
  }
}

export default DeviceInfoMapChart;
