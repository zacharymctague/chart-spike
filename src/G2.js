import React from 'react'
import * as G2 from '@antv/g2'
import DataSet from '@antv/data-set'

const clickData = [
  { count: 40, unique: 5, date: '2020-10-14' },
  { count: 28, unique: 1, date: '2020-10-15' },
  { count: 13, unique: 3, date: '2020-10-16' },
  { count: 8, unique: 2, date: '2020-10-17' },
  { count: 44, unique: 0, date: '2020-10-18' },
  { count: 13, unique: 0, date: '2020-10-19' },
  { count: 20, unique: 6, date: '2020-10-20' },
]

const viewData = [
  { count: 50, unique: 0, date: '2020-10-14' },
  { count: 110, unique: 0, date: '2020-10-15' },
  { count: 131, unique: 1, date: '2020-10-16' },
  { count: 125, unique: 5, date: '2020-10-17' },
  { count: 104, unique: 4, date: '2020-10-18' },
  { count: 108, unique: 8, date: '2020-10-19' },
  { count: 64, unique: 4, date: '2020-10-20' },
]

function Page() {
  const addTypeToData = (data) => {
    return Object.entries(data).reduce((accumulator, [key, array]) => {
      return [...accumulator, ...array.map((item) => ({ ...item, type: key }))]
    }, [])
  }

  const handleChartInit = (element) => {
    const data = addTypeToData({ clicks: clickData, views: viewData })

    const chart = new G2.Chart({
      container: element,
      autoFit: true,
      height: 500,
      padding: 100,
    }).data(data)

    // Create alternative view for CTR part
    // const view = chart.createView({})

    chart.scale({
      date: { type: 'category' },
      count: { sync: 'x1', tickCount: 6, nice: true },
      unique: { sync: 'x1', tickCount: 6 },
    })

    chart.axis({
      count: { position: 'left' },
      unique: { position: 'left', grid: null },
      date: { position: 'bottom' },
    })

    chart
      .interval()
      .position('date*count')
      .color('type', ['#b7f3d7', '#dac9ff'])
      .adjust([{ type: 'dodge', dodgeBy: 'type', marginRatio: 0 }])
      .tooltip('type*count', (type, value) => {
        return { value, name: `Total ${type}` }
      })

    chart
      .interval()
      .position('date*unique')
      .color('type', ['#39e09b', '#7551e9'])
      .adjust([{ type: 'dodge', dodgeBy: 'type', marginRatio: 0 }])
      .tooltip('type*unique', (type, value) => {
        return { value, name: `Unique ${type}` }
      })

    chart.tooltip({
      showCrosshairs: false,
      shared: true,
    })

    chart.legend({
      slidable: false,
      marker: {
        symbol: 'circle',
      },
    })

    // chart.interaction('tooltip', {
    //   start: [{ trigger: 'plot:click', action: 'tooltip:show' }],
    // })

    chart.tooltip({
      showMarkers: false, // 不展示 tooltip markers
      shared: true,
    })

    chart.interaction('active-region') // 使用 active-region 交互行为

    chart.render()
  }

  return <div ref={handleChartInit} />
}

export default Page
