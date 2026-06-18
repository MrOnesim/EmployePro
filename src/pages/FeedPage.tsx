import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { MessageSquare, Heart, Send, User } from 'lucide-react';

export default function FeedPage() {
  const { currentUser, posts, addPost, likePost, addComment } = useApp();
  const { addToast } = useToast();
  const [content, setContent] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const feedEndRef = useRef<HTMLDivElement>(null);

  const handlePost = () => {
    if (!content.trim()) return;
    if (!currentUser) return;
    addPost({
      authorId: currentUser.id,
      authorName: `${currentUser.firstName} ${currentUser.lastName}`,
      content: content.trim(),
    });
    setContent('');
    addToast('Publication créée', 'success');
  };

  const handleComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text || !currentUser) return;
    addComment(postId, {
      authorId: currentUser.id,
      authorName: `${currentUser.firstName} ${currentUser.lastName}`,
      content: text,
    });
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const formatDate = (d: Date) => {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60000) return "À l'instant";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}min`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Fil d'actualité</h1>
        <p className="text-gray-500">Annonces et publications internes</p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <textarea value={content} onChange={(e) => setContent(e.target.value)}
          placeholder="Quoi de neuf ?"
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm" />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">Partagez une information avec l'équipe</span>
          <button onClick={handlePost} disabled={!content.trim()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
            <Send size={16} /><span>Publier</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => {
          const isLiked = currentUser && post.likes.includes(currentUser.id);
          return (
            <div key={post.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">{post.authorName.split(' ').map((n) => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{post.authorName}</p>
                  <p className="text-xs text-gray-400">{formatDate(post.createdAt)}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-wrap mb-3">{post.content}</p>

              <div className="flex items-center space-x-4 text-xs text-gray-400 border-t border-gray-50 pt-3">
                <button onClick={() => currentUser && likePost(post.id, currentUser.id)}
                  className={`flex items-center space-x-1 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                  <Heart size={14} className={isLiked ? 'fill-current' : ''} /><span>{post.likes.length}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                  <MessageSquare size={14} /><span>{post.comments.length}</span>
                </button>
              </div>

              {post.comments.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-gray-50 pt-3">
                  {post.comments.map((c) => (
                    <div key={c.id} className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={12} className="text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs"><span className="font-medium text-gray-700">{c.authorName}</span> <span className="text-gray-500">{c.content}</span></p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(c.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-gray-50">
                <input type="text" value={commentInputs[post.id] || ''} onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleComment(post.id); }}
                  placeholder="Écrire un commentaire..." className="flex-1 px-3 py-1.5 bg-gray-50 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                <button onClick={() => handleComment(post.id)} disabled={!commentInputs[post.id]?.trim()}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50"><Send size={14} /></button>
              </div>
            </div>
          );
        })}
        <div ref={feedEndRef} />
      </div>
    </div>
  );
}
