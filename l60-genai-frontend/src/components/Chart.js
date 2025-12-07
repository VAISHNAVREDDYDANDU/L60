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

    const margin = { top: 50, right: 30, bottom: 100, left: 80 };
    const width = containerRef.current.offsetWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('overflow', 'visible')
      .style('overflow', 'visible');
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Use 'g' instead of 'svg' for chart elements
    const chartGroup = g;

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
    const xAxis = chartGroup.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));
    
    // Only rotate text for bar charts (categorical data)
    if (chartType === 'bar') {
      xAxis.selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.5em')
        .attr('dy', '.8em')
        .attr('transform', 'rotate(-45)')
        .style('font-size', '12px')
        .style('overflow', 'visible');
    } else {
      // For line charts, center the text
      xAxis.selectAll('text')
        .style('text-anchor', 'middle')
        .style('font-size', '12px');
    }

    chartGroup.append('g')
      .call(d3.axisLeft(yScale));

    // Add axis labels
    chartGroup.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Value');

    // Draw bars or line
    if (chartType === 'bar') {
      chartGroup.selectAll('.bar')
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

      chartGroup.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#3498db')
        .attr('stroke-width', 2)
        .attr('d', line);

      chartGroup.selectAll('.dot')
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
      chartGroup.append('text')
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

