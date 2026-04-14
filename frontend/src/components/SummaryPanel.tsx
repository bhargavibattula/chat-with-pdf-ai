import React from 'react';
import { CheckCircle2, List, Target, Lightbulb, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SummaryPanel: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto px-6 py-8 space-y-8 custom-scrollbar bg-gray-50/50">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-blue-600 font-bold uppercase tracking-wider text-xs">
          <SparkleIcon className="w-4 h-4" />
          <span>AI Generated Summary</span>
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
          Modern Web Development Trends in 2024
        </h2>
      </div>

      <div className="grid gap-6">
        <SummaryCard 
          icon={<Target className="text-blue-600" size={20} />}
          title="Core Objective"
          content="This document explores the shift towards server-side rendering, the rise of edge computing, and how AI is being integrated directly into the development workflow to increase productivity."
        />

        <div className="bg-white p-6 rounded-2xl premium-shadow border border-gray-100 space-y-4">
          <div className="flex items-center space-x-2 mb-2">
            <List className="text-blue-600" size={20} />
            <h3 className="font-bold text-gray-900">Key Points</h3>
          </div>
          <div className="space-y-4">
            {[
              "Adoption of Next.js and the App Router as industry standards.",
              "Integration of Large Language Models (LLMs) into IDEs.",
              "The transition from REST APIs to type-safe GraphQL and tRPC.",
              "Rise of local-first application architectures for better offline support."
            ].map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-3 group"
              >
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 size={16} className="text-green-500" />
                </div>
                <p className="text-sm font-medium text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <SummaryCard 
          icon={<Lightbulb className="text-purple-600" size={20} />}
          title="Key Takeaways"
          content="Developers should focus on mastering React Server Components and exploring how to leverage vector databases for RAG-based AI applications."
          bgColor="bg-purple-50/50"
        />
      </div>

      <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 transition-all group">
         <span className="text-sm font-semibold text-gray-700">Detailed mind map analysis</span>
         <ArrowUpRight size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
      </button>

      <div className="pt-8 text-center">
        <p className="text-xs text-gray-400">
          Last updated today at 2:45 PM • 1,240 words analyzed
        </p>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, title, content, bgColor = "bg-white" }: { icon: React.ReactNode, title: string, content: string, bgColor?: string }) => (
  <div className={`${bgColor} p-6 rounded-2xl premium-shadow border border-gray-100 space-y-2`}>
    <div className="flex items-center space-x-2 mb-1">
      {icon}
      <h3 className="font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-sm font-medium text-gray-700 leading-relaxed">
      {content}
    </p>
  </div>
);

const SparkleIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 3L14.5 9L21 11.5L14.5 14L12 21L9.5 14L3 11.5L9.5 9L12 3Z" fill="currentColor"/>
  </svg>
);

export default SummaryPanel;
