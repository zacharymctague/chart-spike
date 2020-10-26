import React from 'react'
import * as c3 from 'c3'
import * as d3 from 'd3'

import 'c3/c3.css'

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
  const handleChartInit = (container) => {
    const getClickThroughRate = ({ clicks, views }) => {
      return views.map((view) => {
        const click = clicks.find((click) => click.date === view.date)
        return (click.count / view.count) * 100
      })
    }

    const dateRange = viewData.map(({ date }) => date)
    const totalViews = viewData.map(({ count }) => count)
    const uniqueViews = viewData.map(({ unique }) => unique)
    const totalClicks = clickData.map(({ count }) => count)
    const uniqueClicks = clickData.map(({ unique }) => unique)
    const clickThroughRate = getClickThroughRate({
      views: viewData,
      clicks: clickData,
    })

    c3.generate({
      bindto: d3.select(container),
      subchart: {
        show: false,
        subchart: {
          onbrush: function (domain) {
            console.log(domain)
          },
        },
      },
      tooltip: {
        show: true,
        grouped: true,
        position: function (data, width, height, element) {
          return { top: 0, left: 0 }
        },
      },
      legend: {
        show: true,
      },
      data: {
        x: 'dateRange',
        type: 'bar',
        types: {
          clickThroughRate: 'line',
        },
        columns: [
          ['dateRange', ...dateRange],
          ['totalViews', ...totalViews],
          ['uniqueViews', ...uniqueViews],
          ['totalClicks', ...totalClicks],
          ['uniqueClicks', ...uniqueClicks],
          ['clickThroughRate', ...clickThroughRate],
        ],
        groups: [
          ['totalViews', 'uniqueViews'],
          ['totalClicks', 'uniqueClicks'],
        ],
        axes: {
          clickThroughRate: 'y2',
        },
        names: {
          totalViews: 'Total Views',
          uniqueViews: 'Unique Views',
          totalClicks: 'Total Clicks',
          uniqueClicks: 'Unique Clicks',
          clickThroughRate: 'CTR',
        },
        colors: {
          totalViews: '#7aebbc',
          uniqueViews: '#00d775',
          totalClicks: '#c0a4ff',
          uniqueClicks: '#7c41ff',
          clickThroughRate: '#00b6ff',
        },
      },
      grid: {
        y: {
          show: true,
        },
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%m/%d',
          },
        },
        y: {
          padding: { bottom: 0 },
          min: 0,
          tick: {
            count: 6,
            format: d3.format('$,'),
          },
        },
        y2: {
          default: [0, 100],
          type: 'linear',
          padding: { top: 0, bottom: 0 },
          show: true,
          min: 0,
          max: 100,
          // max: d3.max(clickThroughRate) <= 100 ? 100 : d3.max(clickThroughRate),
          tick: {
            count: 6,
            format: (value) => `${value}%`,
          },
        },
      },
      bar: {
        width: {
          ratio: 0.5,
        },
      },
    })
  }

  return <div ref={handleChartInit} />
}

export default Page
