<template>
    <div class='map-data'>
        <div id="main"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
import geoJson from '../../assets/data.json'
export default {
    data() {
        return {}
    },
    mounted() {
        var myChart = echarts.init(document.getElementById('main'))
        echarts.registerMap('china', geoJson) // 注册可用的地图,必须包括geo组件或者map图表类型的时候才能使用。
        // console.log(geoJson)
        // 地图上散点的数据
        var points = [
            { value: [118.8062, 31.9208], itemStyle: { color: '#4ab2e5' } }
            , { value: [127.9688, 45.368], itemStyle: { color: '#4fb6d2' } }
            , { value: [110.3467, 41.4899], itemStyle: { color: '#52b9c7' } }
            , { value: [125.8154, 44.2584], itemStyle: { color: '#5abead' } }
            , { value: [116.4551, 40.2539], itemStyle: { color: '#f34e2b' } }
            , { value: [123.1238, 42.1216], itemStyle: { color: '#f56321' } }
            , { value: [114.4995, 38.1006], itemStyle: { color: '#f56f1c' } }
            , { value: [117.4219, 39.4189], itemStyle: { color: '#f58414' } }
            , { value: [112.3352, 37.9413], itemStyle: { color: '#f58f0e' } }
            , { value: [109.1162, 34.2004], itemStyle: { color: '#f5a305' } }
            , { value: [103.5901, 36.3043], itemStyle: { color: '#e7ab0b' } }
            , { value: [106.3586, 38.1775], itemStyle: { color: '#dfae10' } }
            , { value: [101.4038, 36.8207], itemStyle: { color: '#d5b314' } }
            , { value: [103.9526, 30.7617], itemStyle: { color: '#c1bb1f' } }
            , { value: [108.384366, 30.439702], itemStyle: { color: '#b9be23' } }
            , { value: [113.0823, 28.2568], itemStyle: { color: '#a6c62c' } }
            , { value: [102.9199, 25.46639], itemStyle: { color: '#96cc34' } }
            , { value: [119.4543, 25.9222]}
        ]
        var path = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
        var option = {
            backgroundColor: 'rgb(121, 145, 209)',
            geo: {
                map: 'china', // 地图类型
                aspectScale: 0.75, // scale地图长宽比
                zoom: 1.1, // 当前视角缩放比
                itemStyle: {
                    normal: {
                        areaColor: {
                            type: 'radial', // 径向渐变
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: '#09132c' // 0%处的颜色
                            }, {
                                offset: 1,
                                color: '#274d68' // 100%处的颜色
                            }],
                            globalCoord: true
                        },
                        shadowColor: 'rgb(58, 115, 192)',
                        shadowOffsetX: 10,
                        shadowOffsetY: 11
                    }
                },
                regions: [{
                    name: '南海诸岛',
                    itemStyle: {
                        opacity: 0
                    }
                }]
            },
            series: [
                // 配置地图相关参数，绘制地图，这个对象是关于地图图表的相关设置
                {
                    type: 'map',
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#1DE9B6'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: 'rgb(183,185,14)'
                            }
                        }
                    },
                    itemStyle: { // 地图区域的图形样式
                        normal: {
                            borderColor: 'rgb(147, 235, 248)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgb(31, 54, 150)' // 0%处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgb(89, 128, 142)' // 100%处的颜色
                                }],
                                globalCoord: true
                            }
                        },
                        emphasis: {
                            areaColor: 'rgb(46, 229, 206)',
                            borderWidth: 0.1
                        }
                    },
                    zoom: 1.1,
                    map: 'china'
                },
                // 关于地图中散点图的配置
                {
                    type: 'effectScatter', // 散点图
                    coordinateSystem: 'geo',
                    showEffectOn: 'render',
                    zlevel: 1,
                    symbolSize: 10, //散点大小
                    data: points,
                    rippleEffect: { // 涟漪特效配置
                        period: 15, // 动画周期,秒数
                        scale: 4, // 动画中波纹的最大缩放比例
                        brushType: 'fill'
                    }
                },
                // 关于地图中线路动画效果设置
                {
                    type: 'lines',
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 4,
                        trailLength: 0.4,
                        symbol: 'arrow',
                        symbolSize: 7,
                    },
                    lineStyle: {
                        normal: {
                            color: '#1DE9B6',
                            width: 1,
                            opacity: 0.1,
                            curveness: 0.3
                        }
                    },
                    data: [
                        { coords: [[118.8062, 31.9208],[119.4543, 25.9222]], lineStyle: { color: '#4ab2e5' } }
                        , { coords: [[127.9688, 45.368],[119.4543, 25.9222]], lineStyle: { color: '#4fb6d2' } }
                        , { coords: [[110.3467, 41.4899],[119.4543, 25.9222]], lineStyle: { color: '#52b9c7' } }
                        , { coords: [[125.8154, 44.2584],[119.4543, 25.9222]], lineStyle: { color: '#5abead' } }
                        , { coords: [[116.4551, 40.2539],[119.4543, 25.9222]], lineStyle: { color: '#f34e2b' } }
                        , { coords: [[123.1238, 42.1216],[119.4543, 25.9222]], lineStyle: { color: '#f56321' } }
                        , { coords: [[114.4995, 38.1006],[119.4543, 25.9222]], lineStyle: { color: '#f56f1c' } }
                        , { coords: [[117.4219, 39.4189],[119.4543, 25.9222]], lineStyle: { color: '#f58414' } }
                        , { coords: [[112.3352, 37.9413],[119.4543, 25.9222]], lineStyle: { color: '#f58f0e' } }
                        , { coords: [[109.1162, 34.2004],[119.4543, 25.9222]], lineStyle: { color: '#f5a305' } }
                        , { coords: [[103.5901, 36.3043],[119.4543, 25.9222]], lineStyle: { color: '#e7ab0b' } }
                        , { coords: [[106.3586, 38.1775],[119.4543, 25.9222]], lineStyle: { color: '#dfae10' } }
                        , { coords: [[101.4038, 36.8207],[119.4543, 25.9222]], lineStyle: { color: '#d5b314' } }
                        , { coords: [[103.9526, 30.7617],[119.4543, 25.9222]], lineStyle: { color: '#c1bb1f' } }
                        , { coords: [[108.384366, 30.439702],[119.4543, 25.9222]], lineStyle: { color: '#b9be23' } }
                        , { coords: [[113.0823, 28.2568],[119.4543, 25.9222]], lineStyle: { color: '#a6c62c' } }
                        , { coords: [[102.9199, 25.46639],[119.4543, 25.9222]], lineStyle: { color: '#96cc34' } }
                        , { coords: [[119.4543, 25.9222],[119.4543, 25.9222]]}
                    ]
                }
            ]
        }

        myChart.setOption(option)
    }
}
</script>
<style lang="scss">
.map-data {
    width: 100%;
    #main {
        width: 100%;
        height: 600px;
    }
}
</style>