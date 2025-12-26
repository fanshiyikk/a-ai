
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const KnowledgeTree: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const data = {
      name: "代数基础",
      children: [
        { 
          name: "一元一次方程", 
          children: [
            { name: "移项原则", value: 80 },
            { name: "合并同类项", value: 40 },
            { name: "系数化1", value: 90 }
          ]
        },
        { 
          name: "因式分解", 
          children: [
            { name: "提公因式", value: 30 },
            { name: "公式法", value: 65 }
          ]
        }
      ]
    };

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([height, width - 160]);
    treeLayout(root);

    const g = svg.append('g').attr('transform', 'translate(80,0)');

    // Links
    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#E2E8F0')
      .attr('stroke-width', 2)
      .attr('d', d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x) as any
      );

    // Nodes
    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 6)
      .attr('fill', (d: any) => d.data.value && d.data.value < 50 ? '#EF4444' : '#3B82F6');

    node.append('text')
      .attr('dy', 3)
      .attr('x', (d: any) => d.children ? -12 : 12)
      .style('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .text((d: any) => d.data.name)
      .attr('class', 'text-xs font-medium fill-slate-600');

  }, []);

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="mb-4 flex items-center justify-between">
         <span className="text-sm font-bold text-slate-700">五级知识点连续精准诊断</span>
         <div className="flex gap-2">
            <span className="flex items-center gap-1 text-[10px]"><span className="w-2 h-2 rounded-full bg-red-500"></span> 薄弱点</span>
            <span className="flex items-center gap-1 text-[10px]"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 掌握点</span>
         </div>
      </div>
      <svg ref={svgRef} className="w-full h-auto" viewBox="0 0 600 400"></svg>
    </div>
  );
};

export default KnowledgeTree;
