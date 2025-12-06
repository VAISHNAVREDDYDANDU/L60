import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './Chart.css';

const Chart = ({ data, title, description, chartType = 'bar' }) => {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const width = containerRef.current.offsetWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = chartType === 'bar' 
      ? d3.scaleBand()
          .domain(data.map(d => d.x))
          .range([0, width])
          .padding(0.2)
      : d3.scaleLinear()
          .domain(d3.extent(data, d => d.x))
          .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .nice()
      .range([height, 0]);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    svg.append('g')
      .call(d3.axisLeft(yScale));

    // Add axis labels
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Value');

    // Draw bars or line
    if (chartType === 'bar') {
      svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.x))
        .attr('width', xScale.bandwidth())
        .attr('y', d => yScale(d.y))
        .attr('height', d => height - yScale(d.y))
        .attr('fill', '#3498db')
        .attr('role', 'img')
        .attr('aria-label', d => `${d.x}: ${d.y}`);
    } else {
      const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#3498db')
        .attr('stroke-width', 2)
        .attr('d', line);

      svg.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 5)
        .attr('fill', '#3498db')
        .attr('role', 'img')
        .attr('aria-label', d => `${d.x}: ${d.y}`);
    }

    // Add title
    if (title) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0 - margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(title);
    }

  }, [data, chartType, title]);

  return (
    <div className="chart-container" ref={containerRef}>
      <svg ref={svgRef} role="img" aria-label={title || 'Chart'}></svg>
      {description && (
        <p className="chart-description" role="note">
          {description}
        </p>
      )}
    </div>
  );
};

export default Chart;

