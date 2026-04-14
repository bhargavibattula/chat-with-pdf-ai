import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Brain, ChevronRight, ChevronDown, Circle } from 'lucide-react';

interface MindMapNode {
  name: string;
  children?: MindMapNode[];
}

const MindMapPanel: React.FC = () => {
  const [data, setData] = useState<MindMapNode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMindMap = async () => {
      try {
        const response = await fetch('http://localhost:5000/mindmap');
        if (response.ok) {
          const mindMapData = await response.json();
          setData(mindMapData.mindmap);
        }
      } catch (err) {
        console.error("Failed to fetch mind map", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMindMap();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 text-gray-500">
        <Loader2 className="animate-spin text-purple-600" size={40} />
        <p className="font-bold text-lg animate-pulse">Visualizing concepts...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <div className="p-6 pb-2 border-b border-gray-100 shrink-0">
         <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 rounded-full text-purple-600 text-[10px] font-black uppercase tracking-widest mb-2">
           <Brain size={12} />
           <span>Dynamic Knowledge Map</span>
         </div>
         <h2 className="text-xl font-black text-gray-900 tracking-tight">Interactive Mind Map</h2>
      </div>

      <div className="flex-1 overflow-auto p-6 custom-scrollbar">
         {data ? (
           <div className="max-w-2xl mx-auto py-4">
             <TreeNode node={data} depth={0} isLast={true} />
           </div>
         ) : (
           <div className="h-full flex items-center justify-center text-gray-400 font-medium italic">
             No structure found. Try a more technical document.
           </div>
         )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100 text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
        Click nodes to expand or collapse your learning path
      </div>
    </div>
  );
};

const TreeNode: React.FC<{ node: MindMapNode, depth: number, isLast: boolean }> = ({ node, depth, isLast }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: depth * 0.05 }}
        className={`
          flex items-center space-x-3 py-2 px-4 rounded-xl transition-all cursor-pointer group mb-1
          ${depth === 0 ? 'bg-purple-600 text-white shadow-lg' : 'hover:bg-gray-50 text-gray-700'}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`relative z-10 ${depth === 0 ? 'text-white' : 'text-purple-500'}`}>
           {hasChildren ? (
             isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
           ) : (
             <Circle size={8} fill="currentColor" strokeWidth={0} className="mx-1" />
           )}
        </div>
        <span className={`text-sm font-bold tracking-tight ${depth === 0 ? 'text-lg' : ''}`}>
          {node.name}
        </span>
      </motion.div>

      {hasChildren && isOpen && (
        <div className={`ml-6 pl-4 border-l-2 border-purple-100 mt-1 pb-2`}>
           {node.children!.map((child, i) => (
             <TreeNode 
               key={i} 
               node={child} 
               depth={depth + 1} 
               isLast={i === node.children!.length - 1} 
             />
           ))}
        </div>
      )}
    </div>
  );
};

export default MindMapPanel;
