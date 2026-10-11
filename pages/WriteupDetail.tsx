import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css'; // Or another style you prefer
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Writeup } from '../types';
import { Agent } from 'node:http';
import NotFound from './NotFound';

const WriteupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { writeups } = useData();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <NotFound />;
  }

  const [writeup, setWriteup] = useState<Writeup | undefined>(undefined);

  useEffect(() => {
    if (id && writeups.length > 0) {
      const found = writeups.find(w => w.id === id);
      setWriteup(found);
    } 
  }, [id, writeups]);

  // Fallback fetch if not found
  useEffect(() => {
      if (id && !writeup && writeups.length === 0) {
         fetch(`/api/writeups/${id}`)
           .then(res => {
             if (res.ok) return res.json();
             throw new Error('Not found');
           })
           .then(data => setWriteup(data))
           .catch(() => {});
      }
  }, [id, writeup, writeups.length]);


  if (!writeup) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyber-neon"></div>
            <p>Accessing Archives...</p>
         </div>
      </div>
    );
  }

  if (!writeup) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyber-neon"></div>
            <p>Accessing Archives...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#050505]">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <Link 
          to="/writeups" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyber-neon transition-colors mb-8 font-mono text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO ARCHIVES
        </Link>
        
        {/* Header */}
        <header className="mb-12 border-b border-cyber-dim pb-8">
            <div className="flex items-center gap-3 mb-4">
                <span className="bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/20 px-3 py-1 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                    <Tag size={12} /> {writeup.category}
                </span>
                <span className="text-gray-500 text-xs font-mono flex items-center gap-2">
                    <Calendar size={12} /> {new Date(writeup.date).toLocaleDateString()}
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {writeup.challengeName}
            </h1>

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-cyber-dim flex items-center justify-center text-white">
                    <User size={20} />
                </div>
                <div>
                     <p className="text-sm text-gray-300 font-medium">Agent {writeup.author}</p>
                     <p className="text-xs text-gray-500 font-mono">Crypton Club</p>
                </div>
            </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-invert">
           <ReactMarkdown
             rehypePlugins={[rehypeHighlight]}
             remarkPlugins={[remarkGfm]}
             components={{
                img: ({node, ...props}) => (
                    <div className="my-8 border border-cyber-dim rounded-lg overflow-hidden bg-black/50">
                        <img {...props} className="max-w-full h-auto mx-auto" alt={props.alt || 'Writeup Image'} />
                         {props.alt && <p className="text-center text-gray-500 text-sm mt-2 mb-4">{props.alt}</p>}
                    </div>
                ),
                a: ({node, ...props}) => (
                    <a {...props} className="text-cyber-neon hover:text-white underline decoration-dashed underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer" />
                )
             }}
           >
               {writeup.content}
           </ReactMarkdown>
        </div>

      </article>
    </div>
  );
};

export default WriteupDetail;
