import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Shield, Terminal, Activity, Lock, AlertTriangle, ChevronRight, ChevronLeft, 
  Server, Database, Wifi, Cpu, Layers, CheckCircle, Zap 
} from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const CYBER_BLUE = "#00f3ff";

const datasetData = [
  { name: 'Attack', value: 39.8, fill: '#ff4d4d' },
  { name: 'Benign', value: 60.2, fill: '#00f3ff' },
];

const attackCategoryData = [
  { name: 'Recon', value: 33500 },
  { name: 'DoS', value: 18500 },
  { name: 'DDoS', value: 18000 },
  { name: 'MitM', value: 8000 },
  { name: 'Malware', value: 7500 },
  { name: 'Web', value: 2500 },
  { name: 'Brute', value: 1500 },
];

const correlationData = [
  { name: 'MSS Max', value: 0.526 },
  { name: 'MSS Avg', value: 0.525 },
  { name: 'Hdr Len Min', value: 0.464 },
  { name: 'Proto Count', value: 0.423 },
  { name: 'Pkt Count', value: 0.367 },
];

const anomalyResults = [
  { name: 'Isolation Forest', F1: 0.812, AUPRC: 0.860, MCC: 0.694 },
  { name: 'One-Class SVM', F1: 0.789, AUPRC: 0.826, MCC: 0.663 },
  { name: 'LOF (Best)', F1: 0.831, AUPRC: 0.873, MCC: 0.721 },
];

const prCurveData = [
  { recall: 0, lof: 1.0, if: 1.0, svm: 1.0 },
  { recall: 0.1, lof: 0.98, if: 0.96, svm: 0.99 },
  { recall: 0.3, lof: 0.97, if: 0.96, svm: 0.94 },
  { recall: 0.5, lof: 0.96, if: 0.95, svm: 0.92 },
  { recall: 0.7, lof: 0.94, if: 0.90, svm: 0.91 },
  { recall: 0.8, lof: 0.90, if: 0.86, svm: 0.75 },
  { recall: 0.9, lof: 0.70, if: 0.55, svm: 0.46 },
  { recall: 1.0, lof: 0.40, if: 0.40, svm: 0.40 },
];

const classificationResults = [
  { name: 'Random Forest', F1: 0.927, MCC: 0.890, AUC: 0.961 },
  { name: 'Grad Boosting', F1: 0.925, MCC: 0.886, AUC: 0.961 },
  { name: 'SVM (RBF)', F1: 0.874, MCC: 0.811, AUC: 0.935 },
];

const fgsmData = [
  { eps: '0', acc: 90.2 },
  { eps: '0.01', acc: 32.1 },
  { eps: '0.05', acc: 17.7 },
  { eps: '0.10', acc: 13.3 },
  { eps: '0.50', acc: 3.1 },
];

const poisonData = [
  { rate: '0%', acc: 68.8 },
  { rate: '10%', acc: 67.0 },
  { rate: '20%', acc: 63.0 },
  { rate: '25%', acc: 60.5 },
];

const robustnessData = [
  { name: 'Linear SVM', Astute: 90.2, Robust: 3.1 },
  { name: 'Grad Boost', Astute: 94.4, Robust: 34.2 },
  { name: 'Random Forest', Astute: 94.6, Robust: 41.8 },
];

const SlideContainer = ({ children, className = "" }) => (
  <div className={`w-full h-full flex flex-col p-8 md:p-16 relative overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-80 shadow-[0_0_10px_#00f3ff]" />
    {children}
    <div className="absolute inset-0 -z-20 bg-[#050a14] opacity-90" 
         style={{ backgroundImage: 'radial-gradient(#1a2c4e 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
    </div>
    <motion.div
      className="absolute top-0 left-0 w-full h-2 bg-cyan-400/20 shadow-[0_0_20px_#00f3ff] z-0 pointer-events-none"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    />
    <motion.div 
      animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] -z-10 opacity-20"
    />
     <motion.div 
      animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.1, 0.4, 0.1], scale: [1, 1.3, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-600 rounded-full blur-[100px] -z-10 opacity-20"
    />
  </div>
);

const Title = ({ children }) => (
  <motion.h1 
    initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.6, type: "spring" }}
    className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 tracking-tight font-mono relative z-10"
  >
    {children}
  </motion.h1>
);

const SubTitle = ({ children }) => (
  <motion.h2 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="text-xl md:text-2xl text-slate-300 mb-6 font-light flex items-center"
  >
    <motion.span 
      initial={{ width: 0 }} 
      animate={{ width: "2rem" }} 
      className="h-[1px] bg-cyan-500 mr-4 inline-block" 
    />
    {children}
  </motion.h2>
);

const Card = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(6, 182, 212, 0.15)", borderColor: "rgba(6, 182, 212, 0.5)" }}
    transition={{ delay, duration: 0.4 }}
    className={`bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-6 rounded-xl shadow-2xl relative overflow-hidden group h-full ${className}`}
  >
    <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-cyan-400 to-purple-500 group-hover:h-full transition-all duration-500" />
    {children}
  </motion.div>
);

const SlideTitle = () => (
  <div className="flex flex-col justify-center h-full items-center text-center relative z-10">
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="relative"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 scale-150 pointer-events-none"
      />
      <div className="mb-6 inline-flex items-center justify-center p-6 bg-blue-500/10 rounded-full ring-2 ring-blue-400/50 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
        <Shield className="w-20 h-20 text-cyan-400" />
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter drop-shadow-lg">
        CIC-IIoT-2025
      </h1>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 mb-8"
      >
        Security Analysis
      </motion.div>
      <p className="text-xl md:text-2xl text-slate-400 mb-12 font-light max-w-2xl mx-auto">
        Machine Learning for Intrusion Detection in Industrial IoT
      </p>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-2 gap-8 text-left max-w-3xl mx-auto border-t border-slate-800 pt-8"
      >
        <div className="pl-4 border-l-2 border-cyan-500/50">
          <p className="text-cyan-500 text-sm font-bold uppercase tracking-wider mb-1">Authors</p>
          <p className="text-slate-300 leading-relaxed">Alexis Le Trung, Yahya Ahachim,<br/>Rayan Drissi, Aniss Outaleb</p>
        </div>
        <div className="pl-4 border-l-2 border-purple-500/50">
          <p className="text-purple-500 text-sm font-bold uppercase tracking-wider mb-1">Context</p>
          <p className="text-slate-300">ML Security -- EPITA SCIA 2026<br/>January 2026</p>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

const SlideAgenda = () => (
  <div className="flex flex-col h-full justify-center">
    <Title>Mission Agenda</Title>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        {[
          "Dataset Overview & Exploration",
          "Anomaly Detection (Unsupervised)",
          "Classification (Supervised)",
          "Adversarial Machine Learning",
          "Strategic Recommendations"
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 100 }}
            className="flex items-center space-x-6 group cursor-default"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-mono text-xl group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-lg group-hover:shadow-[0_0_15px_#06b6d4]">
                0{i + 1}
              </div>
              {i < 4 && <div className="absolute top-14 left-7 w-[1px] h-8 bg-slate-800 -z-10" />}
            </div>
            <span className="text-xl md:text-2xl text-slate-300 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 font-medium">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all" />
        
        <div className="flex items-center gap-4 mb-6">
           <div className="p-3 bg-yellow-500/20 rounded-lg">
             <Zap className="text-yellow-400 w-8 h-8 animate-pulse" />
           </div>
           <h3 className="text-3xl font-bold text-white">Objective</h3>
        </div>
        
        <p className="text-xl text-slate-300 leading-relaxed">
          Evaluate Machine Learning methods for IIoT intrusion detection and critically assess their <span className="text-yellow-400 font-bold">robustness</span> against adversarial attacks.
        </p>
      </motion.div>
    </div>
  </div>
);

const SlideDataset = () => (
  <div className="flex flex-col h-full">
    <Title>CIC-IIoT-2025 Intelligence</Title>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
      <Card delay={0.2}>
         <div className="flex items-center space-x-3 mb-2">
          <Activity className="text-purple-400 w-6 h-6" />
          <h3 className="text-2xl font-bold text-white">Class Distribution</h3>
        </div>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={datasetData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1500}
                animationBegin={500}
              >
                {datasetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0)" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }} />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
            <div className="text-3xl font-bold text-white">227k</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest">Total</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
             <motion.div whileHover={{ y: -5 }} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-xs uppercase font-bold mb-1">Samples</p>
                <p className="text-white font-mono text-xl text-cyan-400"><AnimatedCounter value={227191} /></p>
             </motion.div>
             <motion.div whileHover={{ y: -5 }} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-xs uppercase font-bold mb-1">Features</p>
                <p className="text-white font-mono text-xl text-purple-400"><AnimatedCounter value={94} /></p>
             </motion.div>
             <motion.div whileHover={{ y: -5 }} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-xs uppercase font-bold mb-1">Types</p>
                <p className="text-white font-mono text-xl text-yellow-400"><AnimatedCounter value={7} /></p>
             </motion.div>
        </div>
      </Card>

      <Card delay={0.4}>
        <div className="flex items-center space-x-3 mb-6">
          <Database className="text-cyan-400 w-6 h-6" />
          <h3 className="text-2xl font-bold text-white">Attack Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={attackCategoryData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#fff" width={70} tick={{fontSize: 12, fontWeight: 600}} />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px' }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={24} animationDuration={1500}>
               {attackCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#ef4444', '#f97316', '#eab308', '#84cc16', '#06b6d4', '#8b5cf6', '#d946ef'][index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

const SlideFeatures = () => (
  <div className="flex flex-col h-full">
    <Title>Feature Engineering</Title>
    <SubTitle>Key Discriminative Features (Top Correlation)</SubTitle>
    <div className="flex-1 w-full max-w-5xl mx-auto">
      <Card className="flex flex-col">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={correlationData} margin={{ left: 40, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" domain={[0, 0.6]} stroke="#94a3b8" />
              <YAxis dataKey="name" type="category" stroke="#fff" width={140} tick={{fontSize: 14, fontWeight: 500}} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={32} animationDuration={2000}>
                {correlationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#06b6d4' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-center"
        >
          <p className="text-slate-300 text-lg">
            <span className="text-cyan-400 font-bold">Insight:</span> TCP MSS (Maximum Segment Size) and Protocol diversity are the strongest attack indicators (Corr {'>'} 0.5).
          </p>
        </motion.div>
      </Card>
    </div>
  </div>
);

const SlideAnomaly = () => (
  <div className="flex flex-col h-full">
    <Title>Unsupervised Anomaly Detection</Title>
    <SubTitle>Detecting deviations from benign traffic patterns</SubTitle>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
      <Card delay={0.2}>
         <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="text-cyan-400" /> Precision-Recall Curves
          </h3>
        </div>
         <ResponsiveContainer width="100%" height={320}>
          <LineChart data={prCurveData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="recall" stroke="#94a3b8" label={{ value: 'Recall', position: 'insideBottom', offset: -5 }} />
            <YAxis domain={[0.4, 1]} stroke="#94a3b8" label={{ value: 'Precision', angle: -90, position: 'insideLeft' }} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
            <Legend verticalAlign="top" height={36}/>
            <Line type="monotone" dataKey="lof" stroke="#ef4444" name="LOF (0.873)" strokeWidth={4} dot={{r:4}} activeDot={{r:8}} animationDuration={2000} />
            <Line type="monotone" dataKey="if" stroke="#3b82f6" name="IsoForest (0.860)" strokeWidth={2} dot={false} animationDuration={2000} animationBegin={500} />
            <Line type="monotone" dataKey="svm" stroke="#10b981" name="OC-SVM (0.826)" strokeWidth={2} dot={false} animationDuration={2000} animationBegin={1000} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card delay={0.4}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Performance Metrics</h3>
          <motion.span 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-bold shadow-lg"
          >
            Winner: LOF
          </motion.span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={anomalyResults} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
            <YAxis domain={[0.6, 1]} stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="F1" fill="#3b82f6" name="F1 Score" radius={[4, 4, 0, 0]} animationDuration={1500} />
            <Bar dataKey="AUPRC" fill="#06b6d4" name="AUPRC" radius={[4, 4, 0, 0]} animationDuration={1500} animationBegin={300} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

const SlideClassification = () => (
  <div className="flex flex-col h-full">
    <Title>Supervised Classification</Title>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <Card delay={0.1}>
          <div className="flex items-center mb-6">
            <CheckCircle className="text-green-400 mr-3 w-8 h-8" />
            <h3 className="text-2xl font-bold text-white">Methodology</h3>
          </div>
          <ul className="space-y-6 text-slate-300">
            {[
              { label: "Random Forest", desc: "Ensemble voting (High Robustness)", color: "text-cyan-400" },
              { label: "Gradient Boosting", desc: "Sequential error correction", color: "text-purple-400" },
              { label: "SVM (RBF)", desc: "Non-linear kernels via RBF", color: "text-pink-400" },
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.2) }}
                className="flex items-start p-3 bg-slate-800/40 rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <span className={`mr-3 mt-1 text-xl ${item.color}`}>▪</span> 
                <div>
                   <strong className="text-white block text-lg">{item.label}</strong>
                   <span className="text-slate-400 text-sm">{item.desc}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>
        
        <Card delay={0.3}>
          <h3 className="text-xl font-bold text-white mb-4">Results Comparison</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={classificationResults} layout="vertical">
              <XAxis type="number" domain={[0.8, 1]} stroke="#94a3b8" hide />
              <YAxis dataKey="name" type="category" stroke="#fff" width={110} tick={{fontSize: 12}} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0f172a' }} />
              <Bar dataKey="F1" fill="#8b5cf6" barSize={24} radius={[0, 10, 10, 0]} animationDuration={1500}>
                {classificationResults.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#d8b4fe' : '#7c3aed'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center mt-4 text-sm font-bold text-purple-300 bg-purple-900/30 py-2 rounded">
            Random Forest leads with 92.7% F1
          </div>
        </Card>
      </div>

      <div className="flex flex-col justify-center space-y-6">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="bg-slate-800/50 p-8 rounded-xl border-l-8 border-yellow-400 shadow-2xl"
         >
           <h4 className="text-yellow-400 font-bold uppercase text-sm mb-4 tracking-widest flex items-center gap-2">
             <Lock className="w-4 h-4"/> Concept Definition
           </h4>
           
           <div className="mb-6">
             <p className="text-white text-xl font-bold mb-1">Astute Accuracy</p>
             <p className="text-slate-400 pl-4 border-l border-slate-600">Performance on clean, standard test data.</p>
           </div>
           
           <div>
             <p className="text-white text-xl font-bold mb-1 flex items-center gap-2">
                Robust Accuracy 
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded animate-pulse">CRITICAL</span>
             </p>
             <p className="text-slate-400 pl-4 border-l border-slate-600">Performance under active adversarial attack.</p>
           </div>
         </motion.div>
      </div>
    </div>
  </div>
);

const SlideAdversarialFGSM = () => (
  <div className="flex flex-col h-full">
    <Title>Exploratory Attack (FGSM)</Title>
    <SubTitle>Fast Gradient Sign Method: Perturbing test-time inputs</SubTitle>
    
    <div className="flex flex-col md:flex-row gap-8 items-center flex-1">
      <div className="md:w-1/3 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-slate-800 rounded-xl border border-slate-700 font-mono text-sm text-cyan-300 break-words shadow-lg relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-bl-full" />
           <span className="text-xl font-bold">x_adv = x + ε · sign(∇x J(θ, x, y))</span>
        </motion.div>
        
        <div className="text-slate-300 space-y-4">
          <p className="leading-relaxed">Small perturbations (ε) cause massive drops in confidence for linear models.</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-900/20 rounded border border-red-500/20">
              <span>Epsilon 0.01:</span> 
              <span className="text-red-400 font-bold text-xl">32.1% Acc</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-900/40 rounded border border-red-500/40">
              <span>Epsilon 0.10:</span> 
              <span className="text-red-500 font-bold text-2xl animate-pulse">13.3% Acc</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:w-2/3 h-full max-h-[400px]">
        <Card className="p-4" delay={0.3}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fgsmData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="eps" stroke="#94a3b8" label={{ value: 'Epsilon (Perturbation)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
              <Area 
                type="monotone" 
                dataKey="acc" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorAcc)" 
                name="Accuracy %" 
                animationDuration={2500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  </div>
);

const SlideAdversarialPoison = () => (
  <div className="flex flex-col h-full">
    <Title>Causative Attack (Poisoning)</Title>
    <SubTitle>Label Flipping: Corrupting the training data</SubTitle>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
      <Card delay={0.2}>
         <div className="flex items-center mb-6">
            <div className="p-2 bg-yellow-500/20 rounded-lg mr-3">
              <AlertTriangle className="text-yellow-500 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Mechanism</h3>
         </div>
         <p className="text-slate-300 mb-8 text-lg leading-relaxed">
           Attacker injects mislabeled samples into the training set. The model learns incorrect decision boundaries, affecting <span className="text-yellow-400 font-bold">ALL</span> future predictions.
         </p>
         
         <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-slate-400">Poison Rate 0% (Baseline)</span>
                <span className="text-green-400">68.8% Acc</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '68.8%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="bg-green-500 h-full rounded-full shadow-[0_0_10px_#22c55e]"
                ></motion.div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-slate-400">Poison Rate 25% (Compromised)</span>
                <span className="text-red-400">60.5% Acc</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '60.5%' }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="bg-red-500 h-full rounded-full shadow-[0_0_10px_#ef4444]"
                ></motion.div>
              </div>
            </div>
         </div>
      </Card>
      
      <Card delay={0.4}>
        <h3 className="text-xl font-bold text-white mb-6">Boundary Shift Impact</h3>
        <ResponsiveContainer width="100%" height={300}>
           <LineChart data={poisonData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="rate" stroke="#94a3b8" label={{ value: 'Poison Rate', position: 'insideBottom', offset: -10, fill: '#94a3b8' }} />
            <YAxis domain={[50, 75]} stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
            <Line 
              type="monotone" 
              dataKey="acc" 
              stroke="#eab308" 
              strokeWidth={4} 
              dot={{r: 6, fill: "#eab308", strokeWidth: 2, stroke: "#fff"}} 
              animationDuration={2500}
            />
           </LineChart>
        </ResponsiveContainer>
        <p className="text-center text-sm text-slate-500 mt-2 font-mono">Linear SVM (2D PCA) Performance Decay</p>
      </Card>
    </div>
  </div>
);

const SlideRobustness = () => (
  <div className="flex flex-col h-full">
    <Title>Robustness Analysis</Title>
    <SubTitle>Model performance under FGSM Attack (ε=0.5)</SubTitle>

    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-5xl h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={robustnessData} barGap={0} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#fff" tick={{fontSize: 14, fontWeight: 600}} />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} 
            />
            <Legend verticalAlign="top" height={36}/>
            <Bar dataKey="Astute" name="Astute Accuracy (Clean)" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1500} />
            <Bar dataKey="Robust" name="Robust Accuracy (Attacked)" fill="#ef4444" radius={[4, 4, 0, 0]} animationDuration={1500} animationBegin={500} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 rounded-xl border-l-4 border-cyan-500 mt-6 shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 bg-cyan-500/20 rounded-full animate-pulse">
           <Shield className="text-cyan-400 w-6 h-6" />
        </div>
        <div>
          <h4 className="text-cyan-400 font-bold text-lg mb-1">Key Insight</h4>
          <p className="text-slate-300">
            <span className="text-white font-bold text-lg">Random Forest</span> retains 44% accuracy under heavy attack, while linear models collapse to near-random performance (3.5%). 
            <span className="block mt-1 text-sm text-slate-400">Ensemble methods provide inherent regularization against gradient-based attacks.</span>
          </p>
        </div>
      </div>
    </motion.div>
  </div>
);

const SlideSummary = () => (
  <div className="flex flex-col h-full justify-center">
    <Title>Tactical Summary</Title>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { task: "Zero-day Detection", model: "Local Outlier Factor", metric: "AUPRC 0.873", color: "text-blue-400", border: "border-blue-500", shadow: "shadow-blue-500/20", icon: Activity },
        { task: "Attack Classification", model: "Random Forest", metric: "F1 0.927", color: "text-purple-400", border: "border-purple-500", shadow: "shadow-purple-500/20", icon: Layers },
        { task: "Adversarial Defense", model: "Random Forest", metric: "44.2% Robustness", color: "text-green-400", border: "border-green-500", shadow: "shadow-green-500/20", icon: Shield },
      ].map((item, i) => (
         <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ delay: i * 0.2, type: "spring" }}
            className={`bg-slate-900/80 p-8 rounded-2xl border-t-4 ${item.border} flex flex-col items-center text-center shadow-2xl ${item.shadow} backdrop-blur-sm relative overflow-hidden`}
         >
           <div className={`absolute top-0 left-0 w-full h-20 bg-gradient-to-b ${item.color.replace('text', 'from')}/10 to-transparent`} />
           <div className={`p-4 rounded-full bg-slate-800 mb-6 ${item.color} bg-opacity-20`}>
             <item.icon className="w-10 h-10" />
           </div>
           
           <h3 className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-4">{item.task}</h3>
           <div className="text-2xl font-bold text-white mb-3">{item.model}</div>
           <div className={`text-2xl font-mono font-bold ${item.color}`}>{item.metric}</div>
         </motion.div>
      ))}
    </div>
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 1.5 }}
      className="mt-16 text-center"
    >
       <p className="text-2xl text-slate-300 italic font-light">
         "No single model excels at all tasks -- <span className="text-cyan-400 font-normal">Defense-in-Depth</span> is required."
       </p>
    </motion.div>
  </div>
);

const SlideRecommendations = () => (
  <div className="flex flex-col h-full">
    <Title>Strategic Recommendations</Title>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 flex-1">
      <div>
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <Layers className="mr-3 text-cyan-400 w-8 h-8"/> Multi-Layer Defense
        </h3>
        <div className="space-y-6 relative pl-8 border-l-2 border-slate-700 ml-4">
          <div className="absolute top-0 bottom-0 left-[-5px] w-2 bg-gradient-to-b from-cyan-500 via-purple-500 to-green-500 rounded-full opacity-50"></div>
          
          {[
            { title: "Layer 1: LOF", text: "Early warning system for zero-day anomalies.", color: "text-cyan-400", bg: "bg-cyan-500" },
            { title: "Layer 2: Random Forest", text: "Robust classification of known threats.", color: "text-purple-400", bg: "bg-purple-500" },
            { title: "Layer 3: Validation", text: "Adversarial training & input sanitization.", color: "text-green-400", bg: "bg-green-500" }
          ].map((item, i) => (
             <motion.div 
                key={i}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (i * 0.2) }}
                className="bg-slate-800 p-6 rounded-xl relative hover:bg-slate-700/80 transition-colors border border-slate-700/50"
             >
              <div className={`absolute -left-[44px] top-1/2 -translate-y-1/2 w-6 h-6 ${item.bg} rounded-full border-4 border-slate-900 shadow-[0_0_10px_currentColor]`}></div>
              <h4 className={`font-bold text-lg ${item.color} mb-1`}>{item.title}</h4>
              <p className="text-slate-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
          <Server className="mr-3 text-yellow-400 w-8 h-8"/> Production Hardening
        </h3>
        <div className="space-y-6">
           {[
             "Implement adversarial training with augmented FGSM samples",
             "Regular model retraining cycle with new threat intelligence",
             "Real-time feature monitoring for distribution drift"
           ].map((text, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1 + (i * 0.2) }}
               className="flex items-center bg-slate-900/60 p-5 rounded-xl border border-slate-700 shadow-lg hover:border-yellow-500/30 transition-all group"
             >
                <div className="p-2 bg-green-500/10 rounded-full mr-4 group-hover:bg-green-500/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-slate-200 text-lg">{text}</span>
             </motion.div>
           ))}
           
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2 }}
             className="mt-8 p-6 bg-blue-600/10 rounded-xl border border-blue-500/20 text-center"
           >
             <p className="text-blue-300">Ready for deployment?</p>
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-lg transition-colors"
             >
               Initiate Protocol
             </motion.button>
           </motion.div>
        </div>
      </div>
    </div>
  </div>
);

const SlideEnd = () => (
  <div className="flex flex-col justify-center items-center h-full text-center relative z-10">
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="p-16 border border-slate-700 bg-slate-900/90 backdrop-blur-2xl rounded-[3rem] relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] max-w-2xl w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
      
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <h1 className="text-7xl font-bold text-white mb-8 relative z-10 drop-shadow-2xl">Q&A</h1>
      </motion.div>
      
      <p className="text-2xl text-cyan-400 font-mono mb-8 relative z-10 animate-pulse">
        System Status: <span className="text-green-400">Analysis Complete</span>
      </p>
      
      <div className="text-slate-400 relative z-10 space-y-2 text-lg">
        <p>CIC-IIoT-2025 Security Analysis</p>
        <p>EPITA SCIA 2026</p>
      </div>
      
      <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
      <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>
    </motion.div>
  </div>
);

const slides = [
  SlideTitle,
  SlideAgenda,
  SlideDataset,
  SlideFeatures,
  SlideAnomaly,
  SlideClassification,
  SlideAdversarialFGSM,
  SlideAdversarialPoison,
  SlideRobustness,
  SlideSummary,
  SlideRecommendations,
  SlideEnd
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="w-full h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <SlideContainer>
            <CurrentSlideComponent />
            
            <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end text-xs text-slate-500 font-mono uppercase tracking-widest pointer-events-none z-50">
              <div className="flex flex-col">
                <span className="text-cyan-600 mb-1">Confidential // EPITA SCIA</span>
                <span>{new Date().getFullYear()} Security Audit</span>
              </div>
              <div className="flex flex-col items-end">
                 <div className="flex space-x-1 mb-2">
                   {slides.map((_, idx) => (
                     <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-10 bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'w-2 bg-slate-800'}`} />
                   ))}
                 </div>
                 <span className="text-slate-400">Slide {currentSlide + 1} <span className="text-slate-600">/</span> {slides.length}</span>
              </div>
            </div>
          </SlideContainer>
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-50 opacity-0 hover:opacity-100 transition-all duration-300 translate-y-4 hover:translate-y-0 bg-slate-900/90 backdrop-blur px-6 py-3 rounded-full border border-slate-700 shadow-2xl">
        <button onClick={prevSlide} className="p-3 hover:bg-slate-700 rounded-full transition-colors text-white hover:text-cyan-400"><ChevronLeft /></button>
        <button onClick={nextSlide} className="p-3 hover:bg-slate-700 rounded-full transition-colors text-white hover:text-cyan-400"><ChevronRight /></button>
      </div>
    </div>
  );
}
