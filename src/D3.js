import React from 'react';
import * as d3 from 'd3'

const clickData = [
  { "count": 5,"date": "2020-10-14" },
  { "count": 11,"date": "2020-10-15" },
  { "count": 13,"date": "2020-10-16" },
  { "count": 12,"date": "2020-10-17" },
  { "count": 10,"date": "2020-10-18" },
  { "count": 10,"date": "2020-10-19" },
  { "count": 6,"date": "2020-10-20"}
]

const viewData = [
  { "count": 50,"date": "2020-10-14" },
  { "count": 110,"date": "2020-10-15" },
  { "count": 131,"date": "2020-10-16" },
  { "count": 125,"date": "2020-10-17" },
  { "count": 104,"date": "2020-10-18" },
  { "count": 108,"date": "2020-10-19" },
  { "count": 64,"date": "2020-10-20" }
]

function Page() {
  const margin = { top: 60, right: 60, bottom: 60, left: 60 }
  const graphHeight = 300
  const graphWidth = 600
  const containerHeight = graphHeight + margin.top + margin.bottom
  const containerWidth = graphWidth + margin.left + margin.right


  const handleChartInit = (element) => {

    let container = d3.select(element)
    .attr("height", containerHeight)
    .attr("width", containerWidth)
    .style("border", "1px solid #DDDDDD")

    const xScale = d3.scaleTime()
    .domain(d3.extent(clickData, (d) => d3.timeParse("%Y-%m-%d")(d.date)))
    .range([0, graphWidth])

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(clickData, d => d.count)])
    .range([graphHeight, 0])

    container.append("g")
    .attr("id", "xAxis")
    .attr('transform', `translate(${margin.left}, ${graphHeight + margin.top})`)
    .call(d3.axisBottom(xScale))

    container.append("g")
    .attr("id", "yAxis")
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(d3.axisLeft(yScale))

    container
    .select("path")
      .datum(clickData)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d) { return xScale(d3.timeParse("%Y-%m-%d")(d.date)) })
        .y0(yScale(0))
        .y1(function(d) { return yScale(d.count) })
        )


    // container
    // .selectAll("rect")
    // .data(clickData)
    // .enter()
    // .append("rect")
    // .attr("fill", "#69b3a2")
    // .attr("width", (d, index) => xScale(index))
    // .attr("height", y.bandwidth() )
    // .attr('x', xScale(0))

    return container.node()
  }

  return (
    <svg ref={handleChartInit} />
  );
}

export default Page;
