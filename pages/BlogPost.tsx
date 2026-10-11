import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';
import { useData } from '../context/DataContext';
import TerminalCard from '../components/TerminalCard';
import { ArrowLeft, Calendar, User, Hash, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts, writeups } = useData();
  const post = blogPosts.find(p => p.id === id);
  // State for expanded writeups (for 'writeup' type posts)
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleWriteup = (wId: string) => {
    setExpandedIds(prev => 
      prev.includes(wId) ? prev.filter(id => id !== wId) : [...prev, wId]
    );
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <TerminalCard title="error.log" glowing>
           <h1 className="text-2xl text-red-500 font-bold mb-4">Error 404: Intel Not Found</h1>
           <p className="text-gray-400 mb-6">The requested log file has been corrupted or does not exist.</p>
           <Link to="/blog" className="text-cyber-neon hover:underline">Return to Index</Link>
        </TerminalCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-cyber-neon mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" />
        Back to Intel Index
      </Link>

      <TerminalCard title={`${post.id}.md`} glowing={true} className="min-h-[60vh]">
        <header className="mb-8 border-b border-cyber-dim pb-6">
          <div className="flex gap-2 mb-4">
            {post.tags.map(tag => (
                <span key={tag} className="flex items-center text-xs bg-cyber-dim/30 text-cyber-neon px-2 py-1 rounded">
                    <Hash size={10} className="mr-1"/> {tag}
                </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 font-mono">
            <div className="flex items-center gap-2">
                <User size={16} className="text-cyber-neon" />
                {post.author}
            </div>
            <div className="flex items-center gap-2">
                <Calendar size={16} className="text-cyber-neon" />
                {post.date}
            </div>
          </div>
        </header>

        <div className="markdown-content">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* Linked Writeups Section */}
        {post.type === 'writeup' && post.writeupIds && post.writeupIds.length > 0 && (
            <div className="mt-12 pt-8 border-t border-cyber-dim">
                <h3 className="text-xl font-bold text-cyber-neon mb-6 flex items-center mb-8">
                    <Terminal className="mr-2" size={20} /> MISSION_LOGS
                </h3>
                
                <div className="space-y-4">
                    {post.writeupIds.map(wId => {
                        const writeup = writeups.find(w => w.id === wId);
                        if (!writeup) return null;
                        
                        const isExpanded = expandedIds.includes(wId);
                        
                        return (
                            <div key={wId} className="border border-gray-800 rounded-lg overflow-hidden bg-black/50">
                                <button 
                                    onClick={() => toggleWriteup(wId)}
                                    className="w-full flex items-center justify-between p-4 bg-gray-900/50 hover:bg-gray-900 transition-colors text-left"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-bold text-white text-lg hover:text-cyber-neon transition-colors">
                                                {writeup.challengeName}
                                            </span>
                                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-dim text-cyber-neon border border-cyber-dim/50">
                                                {writeup.category}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 font-mono">
                                            AUTHOR: {writeup.author} // DATE: {new Date(writeup.date).toLocaleDateString('en-GB')}
                                        </div>
                                    </div>
                                    <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={20} className="text-gray-400" />
                                    </div>
                                </button>
                                
                                {isExpanded && (
                                    <div className="p-6 border-t border-gray-800 bg-black/20 animate-in fade-in slide-in-from-top-2 duration-200">
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
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
      </TerminalCard>
    </div>
  );
};

export default BlogPost;