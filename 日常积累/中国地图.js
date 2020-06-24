import React, { Component } from 'react';

import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';
import { Button } from 'antd';

class MapTest extends Component {
  state = {
    data: [
      { name: '西藏', value: 605.83 },
      { name: '青海', value: 1670.44 },
      { name: '宁夏', value: 2102.21 },
      { name: '海南', value: 2522.66 },
      { name: '甘肃', value: 5020.37 },
      { name: '贵州', value: 5701.84 },
      { name: '新疆', value: 6610.05 },
      { name: '云南', value: 8893.12 },
      { name: '重庆', value: 10011.37 },
      { name: '吉林', value: 10568.83 },
      { name: '山西', value: 11237.55 },
      { name: '天津', value: 11307.28 },
      { name: '江西', value: 11702.82 },
      { name: '广西', value: 11720.87 },
      { name: '陕西', value: 12512.3 },
      { name: '黑龙江', value: 12582 },
      { name: '内蒙古', value: 14359.88 },
      { name: '安徽', value: 15300.65 },
      { name: '北京', value: 16251.93 },
      { name: '福建', value: 17560.18 },
      { name: '上海', value: 19195.69 },
      { name: '湖北', value: 19632.26 },
      { name: '湖南', value: 19669.56 },
      { name: '四川', value: 21026.68 },
      { name: '辽宁', value: 22226.7 },
      { name: '河北', value: 24515.76 },
      { name: '河南', value: 26931.03 },
      { name: '浙江', value: 32318.85 },
      { name: '山东', value: 45361.85 },
      { name: '江苏', value: 49110.27 },
      { name: '广东', value: 53210.28 },
    ],
    selectedProvince: null,
  }

  componentDidMount() {
    this.initalECharts();
  }

  handleClick = () => {
    const { data } = this.state;
    this.setState({
      data,
    })
  }

  initalECharts = () => {
    const { data } = this.state;
    echarts.registerMap('zhongguo', geoJson);
    const myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      title: {
        text: '中国地图',
        left: 'left'
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: '{b}<br/>{c} (p / km2)'
      },
      // visualMap: {
      //   min: 800,
      //   max: 50000,
      //   left: 'right',
      //   text: ['High', 'Low'],
      //   realtime: false,
      //   calculable: true,
      //   inRange: {
      //       color: ['lightskyblue', 'yellow', 'orangered']
      //   }
      // },
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
            normal: {//未选中状态
              borderWidth:2,//边框大小
              borderColor:'#60BDFF',
              areaColor: '#6B80F3',//背景颜色
              label: {
                show: true//显示名称
              }
            },
            emphasis: {
              borderWidth:5,//边框大小
              borderColor:'#60BDFF',
              areaColor: 'red',//背景颜色
              zoom: 1.3,
            }
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: data,
          selectedMode: 'single',
        }
      ],
    });
    myChart.on('click', params => {
      if (params.componentType === 'series') {
        const provinceName = params.name;
        console.log(provinceName)
        this.setState({
          selectedProvince: provinceName,
        })
      }
    })
  }

    // convertData(data) {
    //     var res = [];
    //     for (var i = 0; i < data.length; i++) {
    //         var geoCoord = geoCoordMap[data[i].name];
    //         if (geoCoord) {
    //             res.push({
    //                 name: data[i].name,
    //                 value: geoCoord.concat(data[i].area),
    //                 area: data[i].area,
    //                 type: data[i].type,
    //             });
    //         }
    //     }
    //     console.log(res);
    //     return res;
    // }

  render() {
    return (
      <>
        <div id="main" style={{width: '700px', height: '700px'}}></div>
        <Button type="primary" onClick={this.handleClick}>tijiao</Button>
      </>
    )
  }
}

export default MapTest;
