import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NODE_WIDTH = 160;
const NODE_HEIGHT = 60;
const VERTICAL_SPACING = 160;

const RoadmapGraph = ({ data }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const { nodes, links } = JSON.parse(JSON.stringify(data)); // Deep copy to avoid mutation

    // --- Calculate node depth for flowchart layout (Topological Sort) ---
    const nodesById = new Map(nodes.map(node => [node.id, node]));
    const adj = new Map(nodes.map(node => [node.id, []]));
    const inDegree = new Map(nodes.map(node => [node.id, 0]));

    links.forEach(link => {
      const sourceId = link.source;
      const targetId = link.target;
      const sourceEdges = adj.get(sourceId);
      if (sourceEdges) {
        sourceEdges.push(targetId);
      }
      inDegree.set(targetId, (inDegree.get(targetId) || 0) + 1);
    });

    const queue = [];
    nodes.forEach(node => {
      node.depth = 0;
      if (inDegree.get(node.id) === 0) {
        queue.push(node.id);
      }
    });

    let head = 0;
    while (head < queue.length) {
      const u = queue[head++];
      const uNode = nodesById.get(u);
      adj.get(u)?.forEach(v => {
        const vNode = nodesById.get(v);
        if (vNode && uNode) {
            vNode.depth = Math.max(vNode.depth ?? 0, (uNode.depth ?? 0) + 1);
            inDegree.set(v, (inDegree.get(v) ?? 1) - 1);
            if (inDegree.get(v) === 0) {
            queue.push(v);
            }
        }
      });
    }
    // --- End of depth calculation ---

    const { width, height } = containerRef.current.getBoundingClientRect();
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height]);

    svg.selectAll("*").remove(); // Clear previous graph

    const simulationLinks = links;

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(simulationLinks).id(d => d.id).distance(120).strength(0.3))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(0, 0))
      .force('y', d3.forceY(d => (d.depth ?? 0) * VERTICAL_SPACING).strength(1))
      .force('x', d3.forceX(0).strength(0.08))
      .force('collide', d3.forceCollide(NODE_WIDTH / 2 + 15).strength(0.9));
    
    const zoom = d3.zoom()
      .scaleExtent([0.2, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    
    svg.call(zoom);

    const g = svg.append('g');

    g.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 45)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#000')
      .style('stroke', 'none');

    const link = g.append('g')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.8)
      .selectAll('line')
      .data(simulationLinks)
      .join('line')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g');

    const tooltip = d3.select(containerRef.current)
      .append("div")
      .attr("class", "absolute opacity-0 pointer-events-none p-2 text-sm bg-gray-900 border border-gray-600 rounded-md shadow-lg transition-opacity duration-300 z-20")
      .style("transform", "translate(-50%, -110%)");

    node.append('rect')
      .attr('width', NODE_WIDTH)
      .attr('height', NODE_HEIGHT)
      .attr('x', -NODE_WIDTH / 2)
      .attr('y', -NODE_HEIGHT / 2)
      .attr('rx', 8)
      .attr('ry', 8)
      .attr('fill', '#FF7200')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);
    
    node.append('foreignObject')
        .attr('width', NODE_WIDTH - 16)
        .attr('height', NODE_HEIGHT - 16)
        .attr('x', -NODE_WIDTH/2 + 8)
        .attr('y', -NODE_HEIGHT/2 + 8)
        .append('xhtml:div')
        .style('width', `${NODE_WIDTH - 16}px`)
        .style('height', `${NODE_HEIGHT - 16}px`)
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .style('text-align', 'center')
        .style('color', 'white')
        .style('font-size', '13px')
        .style('line-height', '1.2')
        .style('overflow', 'hidden')
        .style('word-break', 'break-word')
        .html(d => d.label);

    node.on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(d.description)
          .style("left", `${event.pageX - containerRef.current.offsetLeft}px`)
          .style("top", `${event.pageY - containerRef.current.offsetTop}px`);
        d3.select(event.currentTarget).select('rect').transition().duration(200).style('filter', 'brightness(1.2)');
      })
      .on('mouseout', (event) => {
        tooltip.transition().duration(500).style("opacity", 0);
        d3.select(event.currentTarget).select('rect').transition().duration(200).style('filter', 'brightness(1)');
      });

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
        simulation.stop();
        tooltip.remove();
    };

  }, [data]);

  return (
    <div ref={containerRef} className="w-full min-h-screen relative animate-fade-in">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default RoadmapGraph;