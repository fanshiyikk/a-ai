
import React from 'react';

interface SlideLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="h-full flex flex-col p-12 slide-enter bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold mb-4 flex items-center gap-4">
           <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
           {title}
        </h1>
        {subtitle && <p className="text-2xl text-slate-500 font-medium">{subtitle}</p>}
      </div>
      <div className="flex-grow">
        {children}
      </div>
      <div className="mt-8 text-sm text-slate-400 border-t pt-4 flex justify-between items-center">
        <span>智诊AI - 诊疗式学习新范式</span>
        <span className="font-mono uppercase tracking-widest text-blue-500">Privileged & Confidential</span>
      </div>
    </div>
  );
};

export default SlideLayout;
