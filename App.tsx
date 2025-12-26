
import React, { useState, useEffect, useCallback } from 'react';
import SlideLayout from './components/SlideLayout';
import KnowledgeTree from './components/KnowledgeTree';
import { Icons, COLORS } from './constants';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const exportPDF = () => {
    // 强制显示所有幻灯片用于打印，或者简单调用 window.print()
    // 在本应用中，window.print() 结合 CSS media query 是最轻量且高质量的方案
    window.print();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f' || e.key === 'F') toggleFullScreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const slides = [
    {
      title: "智诊AI - 诊疗式学习智能体",
      content: (
        <div className="h-full flex flex-col justify-center items-center text-center space-y-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 blur-2xl rounded-full opacity-50"></div>
            <h1 className="text-8xl font-black gradient-text relative">智诊AI</h1>
          </div>
          <p className="text-4xl text-slate-700 tracking-widest font-light">告别盲目刷题，开启精准诊疗</p>
          <div className="bg-blue-600 text-white px-10 py-4 rounded-full text-2xl font-bold shadow-xl animate-bounce">
            每天半小时，错题全学会
          </div>
          <div className="mt-12 text-slate-400 flex gap-8 text-lg font-medium">
             <span>项目路演 · 2024</span>
             <span>|</span>
             <span>智诊AI 核心团队</span>
          </div>
        </div>
      )
    },
    {
      title: "用户痛点：努力方式失效",
      subtitle: "不是不够努力，而是陷入了低效率的死循环",
      content: (
        <div className="grid grid-cols-3 gap-8 mt-12">
          {[
            { title: "乱吃药", desc: "盲目题海战术，买一堆课从头听到尾，效率极低", icon: "💊", color: "bg-red-50 text-red-600 border-red-100" },
            { title: "没人管", desc: "在家自学遇到困难没人点拨，卡题卡一晚，滋生厌学情绪", icon: "👤", color: "bg-orange-50 text-orange-600 border-orange-100" },
            { title: "辅导贵", desc: "高质量资源有限，一对一个性化辅导成本极高且难持续", icon: "💰", color: "bg-amber-50 text-amber-600 border-amber-100" }
          ].map((item, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border-2 flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition-all ${item.color}`}>
              <span className="text-6xl">{item.icon}</span>
              <h3 className="text-3xl font-bold">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
            </div>
          ))}
          <div className="col-span-3 mt-8 p-6 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-6">
            <span className="text-2xl font-bold">核心病因：</span>
            <p className="text-xl text-slate-300 italic">“缺少一套‘先诊断、再干预、可复盘’的学习机制”</p>
          </div>
        </div>
      )
    },
    {
      title: "产品定位：学习医疗档案",
      subtitle: "模仿私人医生的诊疗逻辑，构建精准提分闭环",
      content: (
        <div className="flex items-center gap-12 h-full">
          <div className="w-1/2 space-y-8">
             <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <Icons.Microscope />
                </div>
                <div>
                   <h3 className="text-2xl font-bold mb-2">体检 (诊断)</h3>
                   <p className="text-slate-500">通过试卷、作业扫描识别，定位五级知识点漏洞</p>
                </div>
             </div>
             <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                   <Icons.Stethoscope />
                </div>
                <div>
                   <h3 className="text-2xl font-bold mb-2">处方 (规划)</h3>
                   <p className="text-slate-500">根据诊断报告，自动生成个性化的“滴灌式”学习计划</p>
                </div>
             </div>
             <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                   <Icons.Navigation />
                </div>
                <div>
                   <h3 className="text-2xl font-bold mb-2">治疗 (学习)</h3>
                   <p className="text-slate-500">AI老师互动讲解，聚焦最小知识单元，30分钟高效通关</p>
                </div>
             </div>
          </div>
          <div className="w-1/2 relative">
             <div className="absolute inset-0 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
             <div className="relative bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-slate-700">学习成长档案 (示例)</h4>
                  <span className="text-xs text-blue-500 font-mono">ID: 99281-A</span>
                </div>
                <div className="space-y-4">
                   <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[75%]"></div>
                   </div>
                   <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[45%]"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-slate-50 rounded-xl text-center">
                        <p className="text-2xl font-bold text-slate-800">98%</p>
                        <p className="text-xs text-slate-500">目标达成率</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl text-center">
                        <p className="text-2xl font-bold text-slate-800">+15分</p>
                        <p className="text-xs text-slate-500">平均提分</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      title: "三层诊断机制：深度洞察",
      subtitle: "逐步还原学生的真实学习问题",
      content: (
        <div className="flex flex-col gap-8 h-full">
           <div className="grid grid-cols-3 gap-6">
              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                <div className="text-blue-600 font-bold mb-2">第一层：静态诊断</div>
                <div className="text-2xl font-bold mb-4">像X光一样扫描</div>
                <p className="text-slate-600 text-sm">基于试卷、作业痕迹，快速扫描当前的知识漏洞。</p>
              </div>
              <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100">
                <div className="text-purple-600 font-bold mb-2">第二层：动态诊断</div>
                <div className="text-2xl font-bold mb-4">像医生问诊互动</div>
                <p className="text-slate-600 text-sm">通过AI老师互动追问，判断错误成因：是马虎还是逻辑断层？</p>
              </div>
              <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
                <div className="text-green-600 font-bold mb-2">第三层：全貌诊断</div>
                <div className="text-2xl font-bold mb-4">长期健康档案</div>
                <p className="text-slate-600 text-sm">结合历史数据，区分偶发性失误与长期薄弱点。</p>
              </div>
           </div>
           <div className="flex-grow flex items-center justify-center bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <div className="text-center">
                <p className="text-slate-400 text-sm mb-4 uppercase tracking-widest">诊断路径引擎示例</p>
                <div className="flex items-center gap-8">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center font-bold text-blue-500">用户层</div>
                  <div className="h-px w-20 bg-slate-300"></div>
                  <div className="w-32 h-32 rounded-3xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-xl">核心调度</div>
                  <div className="h-px w-20 bg-slate-300"></div>
                  <div className="grid grid-cols-2 gap-2">
                     <div className="px-4 py-2 bg-slate-200 rounded text-xs font-medium">开场寒暄</div>
                     <div className="px-4 py-2 bg-slate-200 rounded text-xs font-medium">水平诊断</div>
                     <div className="px-4 py-2 bg-slate-200 rounded text-xs font-medium">内容决策</div>
                     <div className="px-4 py-2 bg-slate-200 rounded text-xs font-medium">总结反馈</div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "核心模块：全维度 CT 扫描",
      subtitle: "不再凭感觉，用数据说话",
      content: (
        <div className="flex gap-12 items-center h-full">
           <div className="w-1/2">
             <KnowledgeTree />
           </div>
           <div className="w-1/2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="p-2 bg-blue-100 text-blue-600 rounded-lg">1</span>
                  五级知识点层级
                </h4>
                <p className="text-slate-500">定位到树状结构的末梢。例如：不只是“三角函数”错，是“诱导公式三”应用错误。</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">2</span>
                  人机协同校验
                </h4>
                <p className="text-slate-500">AI初步筛选，结合真人专家逻辑校验，确保诊断零误判。</p>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "动态“导航地图”",
      subtitle: "摒弃大水漫灌，专注精准滴灌",
      content: (
        <div className="grid grid-cols-2 gap-12 h-full">
           <div className="space-y-4">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-sm font-bold text-blue-500 mb-2">微创式规划</p>
                <p className="text-slate-600">将原本 1-2 小时的内容，压缩为约 30 分钟的高效通关。</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-sm font-bold text-purple-500 mb-2">靶向讲解</p>
                <p className="text-slate-600">推送短小精悍的知识切片讲解，拒绝冗长视频课程。</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-sm font-bold text-green-500 mb-2">互动辅导</p>
                <p className="text-slate-600">支持投屏互动与随时提问，就像面对面请教私人老师。</p>
              </div>
           </div>
           <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center text-slate-400 text-xs mb-4">
                 <span>LIVE SESSION</span>
                 <span className="text-green-400">● 实时录制中</span>
              </div>
              <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 italic">
                 [ AI 虚拟人教学演示界面 ]
              </div>
              <div className="mt-6 space-y-3">
                 <div className="w-full h-2 bg-slate-800 rounded-full">
                    <div className="h-full bg-blue-500 w-[60%]"></div>
                 </div>
                 <p className="text-xs text-slate-400">正在分析：二次函数顶点式变换过程...</p>
              </div>
           </div>
        </div>
      )
    },
    {
      title: "高度落地的“积木式”能力",
      subtitle: "深度嵌入，全景协同",
      content: (
        <div className="flex items-center gap-12 h-full">
           <div className="w-1/2 grid grid-cols-2 gap-4">
              <div className="p-8 bg-blue-500 text-white rounded-2xl shadow-lg transform translate-y-4">深度诊断引擎</div>
              <div className="p-8 bg-slate-800 text-white rounded-2xl shadow-lg">动态规划模块</div>
              <div className="p-8 bg-purple-500 text-white rounded-2xl shadow-lg transform translate-x-4">虚拟人答疑</div>
              <div className="p-8 bg-green-500 text-white rounded-2xl shadow-lg transform -translate-y-4">数据中心</div>
           </div>
           <div className="w-1/2 space-y-8">
              <h4 className="text-3xl font-bold text-slate-800 leading-tight">像积木一样嵌入<br/>不同教育场景</h4>
              <ul className="space-y-4">
                 <li className="flex items-center gap-3 text-xl text-slate-600"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> 班课系统深度集成</li>
                 <li className="flex items-center gap-3 text-xl text-slate-600"><span className="w-3 h-3 bg-purple-500 rounded-full"></span> 智能学习机形态赋能</li>
                 <li className="flex items-center gap-3 text-xl text-slate-600"><span className="w-3 h-3 bg-green-500 rounded-full"></span> 个人数字化助学助手</li>
              </ul>
           </div>
        </div>
      )
    },
    {
      title: "核心团队：专业领航",
      content: (
        <div className="grid grid-cols-5 gap-6 h-full items-center">
           {[
             { name: "陈佳豪", role: "团队队长", color: "bg-blue-100" },
             { name: "刘子韬", role: "核心成员", color: "bg-purple-100" },
             { name: "孔祥威", role: "核心成员", color: "bg-green-100" },
             { name: "陈醉", role: "核心成员", color: "bg-amber-100" },
             { name: "魏宇", role: "核心成员", color: "bg-slate-100" }
           ].map((member, idx) => (
             <div key={idx} className="flex flex-col items-center text-center">
                <div className={`w-32 h-32 rounded-full mb-6 ${member.color} flex items-center justify-center text-3xl font-bold text-slate-700`}>
                   {member.name[0]}
                </div>
                <h4 className="text-xl font-bold text-slate-800">{member.name}</h4>
                <p className="text-sm text-blue-600 font-medium">{member.role}</p>
             </div>
           ))}
        </div>
      )
    },
    {
      title: "让成长被持续理解",
      content: (
        <div className="h-full flex flex-col justify-center items-center text-center space-y-12">
           <div className="max-w-4xl space-y-6">
              <h2 className="text-6xl font-black text-slate-800 leading-tight">长期赢得用户的，<br/>是持续理解与真正帮助的体验。</h2>
           </div>
           
           <div className="flex items-center gap-16 mt-8">
              <div className="space-y-4">
                <p className="text-4xl font-bold gradient-text">感谢审阅</p>
                <p className="text-slate-400 font-mono">SCAN FOR DEMO</p>
              </div>
              {/* Simulated QR Code for Professionalism */}
              <div className="p-4 bg-white border-4 border-slate-100 rounded-2xl shadow-xl">
                 <div className="w-32 h-32 grid grid-cols-4 grid-rows-4 gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-slate-800' : 'bg-transparent'}`}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="w-full max-w-[1440px] aspect-[16/9] relative group presentation-wrapper">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-all duration-700 slide-container ${
              index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
            }`}
          >
            {index === currentSlide && (
              <SlideLayout title={slide.title} subtitle={slide.subtitle}>
                {slide.content}
              </SlideLayout>
            )}
          </div>
        ))}

        {/* Floating Controls (Hidden on Print) */}
        <div className="no-print absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prevSlide} className="text-white p-2 hover:bg-white/10 rounded-full">
             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <div className="text-white font-mono text-sm px-4">
             {currentSlide + 1} / {slides.length}
          </div>

          <button onClick={nextSlide} className="text-white p-2 hover:bg-white/10 rounded-full">
             <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div className="w-px h-6 bg-white/20 mx-2"></div>

          <button onClick={toggleFullScreen} title="全屏演示" className="text-white p-2 hover:bg-white/10 rounded-full">
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8V3h5m9 5V3h-5M3 12v5h5m9-5v5h-5"/></svg>
          </button>

          <button onClick={exportPDF} title="导出 PDF" className="text-white p-2 hover:bg-white/10 rounded-full">
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 17h12M10 3v10m-4-4l4 4 4-4"/></svg>
          </button>
        </div>
      </div>

      {/* Footer (Hidden on Print) */}
      <div className="no-print fixed bottom-4 left-8 right-8 flex justify-between items-center text-slate-500 text-sm">
         <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               路演倒计时: {formatTime(timeLeft)}
            </span>
         </div>
         <div className="text-slate-500 font-medium">按 [F] 全屏 | 按 [Space] 翻页 | 点击 [下载图标] 导出讲义</div>
      </div>
    </div>
  );
};

export default App;
