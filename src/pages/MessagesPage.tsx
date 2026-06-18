import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Send, Phone, Video, Paperclip, MoreVertical, ArrowLeft, Smile, Image, Plus } from 'lucide-react';
import Modal from '../components/Modal';

const EMOJIS = ['😀', '😊', '😂', '❤️', '👍', '🎉', '🔥', '👋', '😎', '🙏'];

function formatMessageTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 60000) return "À l'instant";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function formatDateHeader(date: Date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (target.getTime() === today.getTime()) return "Aujourd'hui";
  if (target.getTime() === yesterday.getTime()) return 'Hier';
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
}

function getDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export default function MessagesPage() {
  const { currentUser, employees, conversations, addMessage, addConversation, readConversation } = useApp();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showNewConv, setShowNewConv] = useState(false);
  const [typing, setTyping] = useState<string | null>(null);
  const [activeCall, setActiveCall] = useState<'audio' | 'video' | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  const currentConv = conversations.find(c => c.id === selectedConversation);

  const filteredConversations = conversations.filter(c =>
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConv?.messages.length]);

  useEffect(() => {
    if (selectedConversation) {
      readConversation(selectedConversation);
    }
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [selectedConversation, readConversation]);

  const handleSend = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    const conv = conversations.find(c => c.id === selectedConversation);
    if (!conv) return;

    addMessage(selectedConversation, {
      senderId: currentUser?.id || '1',
      senderName: `${currentUser?.firstName} ${currentUser?.lastName}`,
      content: messageInput,
      timestamp: new Date(),
      type: 'text',
    });
    setMessageInput('');
    setShowEmojiPicker(false);

    setTyping(conv.participantName);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      const replies = [
        "D'accord, je vais m'en occuper !",
        'Bien reçu, merci !',
        "Je t'envoie les détails plus tard.",
        "C'est noté ! Je vous tiens informé(e).",
        'Parfait, on se tient au courant !',
      ];
      addMessage(selectedConversation, {
        senderId: conv.participantId,
        senderName: conv.participantName,
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date(),
        type: 'text',
      });
      setTyping(null);
    }, 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedConversation) return;
    const reader = new FileReader();
    reader.onload = () => {
      addMessage(selectedConversation, {
        senderId: currentUser?.id || '1',
        senderName: `${currentUser?.firstName} ${currentUser?.lastName}`,
        content: reader.result as string,
        timestamp: new Date(),
        type: 'image',
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const insertEmoji = (emoji: string) => {
    setMessageInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleNewConversation = (employee: { id: string; firstName: string; lastName: string; position: string }) => {
    addConversation({ id: employee.id, name: `${employee.firstName} ${employee.lastName}`, position: employee.position });
    setShowNewConv(false);
  };

  const availableContacts = employees.filter(
    (e) => e.id !== currentUser?.id && !conversations.some((c) => c.participantId === e.id),
  );

  const selectConversation = (convId: string) => {
    setSelectedConversation(convId);
    setShowMobileChat(true);
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex relative">
      <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
            <button onClick={() => setShowNewConv(true)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Nouvelle conversation">
              <Plus size={18} className="text-gray-500" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Rechercher..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button key={conv.id} onClick={() => selectConversation(conv.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${selectedConversation === conv.id ? 'bg-blue-50' : ''}`}>
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{conv.participantName.split(' ').map(n => n[0]).join('')}</span>
                </div>
                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className={`truncate ${conv.unread > 0 ? 'font-semibold text-gray-800' : 'font-medium text-gray-600'}`}>{conv.participantName}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatMessageTime(conv.lastMessageTime)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage || conv.participantPosition}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-gray-400 truncate">{conv.participantPosition}</p>
                  {conv.unread > 0 && <span className="ml-2 flex-shrink-0 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{conv.unread}</span>}
                </div>
              </div>
            </button>
          ))}
          {filteredConversations.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">Aucune conversation</div>
          )}
        </div>
      </div>

      {currentConv && (
        <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <button onClick={() => setShowMobileChat(false)} className="md:hidden p-1 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div className="relative">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-sm">{currentConv.participantName.split(' ').map(n => n[0]).join('')}</span>
                </div>
                {currentConv.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div>
                <p className="font-medium text-gray-800">{currentConv.participantName}</p>
                <p className="text-xs text-gray-500">{currentConv.online ? 'En ligne' : 'Hors ligne'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setActiveCall('audio')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Phone size={18} className="text-gray-500" /></button>
              <button onClick={() => setActiveCall('video')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Video size={18} className="text-gray-500" /></button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><MoreVertical size={18} className="text-gray-500" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {currentConv.messages
              .filter((m) => m.type === 'text' || m.type === 'image')
              .map((msg, idx, arr) => {
                const isMe = msg.senderId === currentUser?.id;
                const prevMsg = idx > 0 ? arr[idx - 1] : null;
                const showDateSeparator = !prevMsg || getDateKey(prevMsg.timestamp) !== getDateKey(msg.timestamp);

                return (
                  <div key={msg.id}>
                    {showDateSeparator && (
                      <div className="flex justify-center my-4">
                        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{formatDateHeader(msg.timestamp)}</span>
                      </div>
                    )}
                    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%]`}>
                        {msg.type === 'image' ? (
                          <div className={`rounded-2xl overflow-hidden ${isMe ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                            <img src={msg.content} alt="Image" className="max-w-full h-auto rounded-2xl" style={{ maxHeight: '240px', objectFit: 'cover' }} />
                          </div>
                        ) : (
                          <div className={`rounded-2xl px-4 py-2 ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        )}
                        <p className={`text-xs text-gray-400 mt-1 ${isMe ? 'text-right' : ''}`}>{formatMessageTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-none px-4 py-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">{typing} écrit</span>
                    <span className="flex space-x-0.5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-100 p-3">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
            <div className="flex items-center space-x-2">
              <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Paperclip size={18} className="text-gray-500" /></button>
              <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><Image size={18} className="text-gray-500" /></button>
              <div className="relative flex-1">
                <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                  placeholder="Tapez votre message..."
                  className="w-full px-4 py-2 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm pr-10" />
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors">
                  <Smile size={16} className="text-gray-400" />
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 grid grid-cols-5 gap-1 z-10">
                    {EMOJIS.map((emoji) => (
                      <button key={emoji} onClick={() => insertEmoji(emoji)} className="w-8 h-8 hover:bg-gray-100 rounded-lg text-lg flex items-center justify-center">
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={handleSend} disabled={!messageInput.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!currentConv && (
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Sélectionnez une conversation</h3>
            <p className="text-gray-500 text-sm">Choisissez un contact pour commencer à discuter</p>
          </div>
        </div>
      )}

      {activeCall && currentConv && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-24 h-24 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              {activeCall === 'audio' ? <Phone size={40} /> : <Video size={40} />}
            </div>
            <h2 className="text-2xl font-bold mb-2">{currentConv.participantName}</h2>
            <p className="text-blue-200 mb-8">{activeCall === 'audio' ? 'Appel audio' : 'Appel vidéo'} en cours...</p>
            <button onClick={() => setActiveCall(null)}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto hover:bg-red-600 transition-colors">
              <Phone size={28} className="rotate-135" />
            </button>
          </div>
        </div>
      )}

      <Modal open={showNewConv} onClose={() => setShowNewConv(false)} title="Nouvelle conversation">
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {availableContacts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">Tous vos collègues sont déjà dans vos conversations</p>
          ) : (
            availableContacts.map((emp) => (
              <button key={emp.id} onClick={() => handleNewConversation(emp)}
                className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl transition-colors text-left">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-medium text-sm">{emp.firstName[0]}{emp.lastName[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 text-sm">{emp.firstName} {emp.lastName}</p>
                  <p className="text-xs text-gray-500">{emp.position}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
