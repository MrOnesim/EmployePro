import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, Send, Phone, Video, Paperclip, MoreVertical,
  ArrowLeft, Smile, Image
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantPosition: string;
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: '2',
    participantName: 'Ama Gbeko',
    participantPosition: 'Responsable RH',
    lastMessage: 'Le rapport de ce mois est prêt !',
    lastMessageTime: new Date(Date.now() - 300000),
    unread: 2,
    online: true,
    messages: [
      { id: '1', senderId: '2', senderName: 'Ama Gbeko', content: 'Bonjour Kofi ! J\'ai besoin de votre signature sur les contrats.', timestamp: new Date(Date.now() - 3600000), type: 'text' },
      { id: '2', senderId: '1', senderName: 'Kofi Mensah', content: 'Bien sûr, je les signe ce matin.', timestamp: new Date(Date.now() - 3500000), type: 'text' },
      { id: '3', senderId: '2', senderName: 'Ama Gbeko', content: 'Merci ! Le rapport de ce mois est prêt !', timestamp: new Date(Date.now() - 300000), type: 'text' },
    ]
  },
  {
    id: '2',
    participantId: '3',
    participantName: 'Kwame Adjei',
    participantPosition: 'Développeur Senior',
    lastMessage: 'La fonctionnalité est déployée ✅',
    lastMessageTime: new Date(Date.now() - 1800000),
    unread: 0,
    online: true,
    messages: [
      { id: '1', senderId: '3', senderName: 'Kwame Adjei', content: 'J\'ai terminé la refacturation du module de paie.', timestamp: new Date(Date.now() - 7200000), type: 'text' },
      { id: '2', senderId: '1', senderName: 'Kofi Mensah', content: 'Excellent ! On peut faire un test ?', timestamp: new Date(Date.now() - 5400000), type: 'text' },
      { id: '3', senderId: '3', senderName: 'Kwame Adjei', content: 'La fonctionnalité est déployée ✅', timestamp: new Date(Date.now() - 1800000), type: 'text' },
    ]
  },
  {
    id: '3',
    participantId: '4',
    participantName: 'Efua Asante',
    participantPosition: 'Comptable',
    lastMessage: 'Les factures de novembre sont traitées',
    lastMessageTime: new Date(Date.now() - 7200000),
    unread: 1,
    online: false,
    messages: [
      { id: '1', senderId: '4', senderName: 'Efua Asante', content: 'Les factures de novembre sont traitées et envoyées par email.', timestamp: new Date(Date.now() - 7200000), type: 'text' },
    ]
  },
  {
    id: '4',
    participantId: '5',
    participantName: 'Yaw Boakye',
    participantPosition: 'Designer UI/UX',
    lastMessage: 'Tu as vu les nouvelles maquettes ?',
    lastMessageTime: new Date(Date.now() - 86400000),
    unread: 0,
    online: false,
    messages: [
      { id: '1', senderId: '5', senderName: 'Yaw Boakye', content: 'Tu as vu les nouvelles maquettes ? Je les ai mises dans le dossier partagé.', timestamp: new Date(Date.now() - 86400000), type: 'text' },
    ]
  },
  {
    id: '5',
    participantId: '7',
    participantName: 'Kossi Amoussou',
    participantPosition: 'Développeur Full Stack',
    lastMessage: 'Je vais corriger le bug ce soir',
    lastMessageTime: new Date(Date.now() - 172800000),
    unread: 0,
    online: true,
    messages: [
      { id: '1', senderId: '1', senderName: 'Kofi Mensah', content: 'Il y a un bug sur le pointage, les employés ne peuvent pas se connecter.', timestamp: new Date(Date.now() - 200000000), type: 'text' },
      { id: '2', senderId: '7', senderName: 'Kossi Amoussou', content: 'Je vais corriger le bug ce soir', timestamp: new Date(Date.now() - 172800000), type: 'text' },
    ]
  }
];

export default function MessagesPage() {
  const { currentUser } = useApp();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  const currentConv = conversations.find(c => c.id === selectedConversation);

  const filteredConversations = conversations.filter(c => 
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const newMessage: ChatMessage = {
      id: String(Date.now()),
      senderId: currentUser?.id || '1',
      senderName: `${currentUser?.firstName} ${currentUser?.lastName}`,
      content: messageInput,
      timestamp: new Date(),
      type: 'text'
    };

    setConversations(prev => prev.map(c => 
      c.id === selectedConversation 
        ? { ...c, messages: [...c.messages, newMessage], lastMessage: messageInput, lastMessageTime: new Date() }
        : c
    ));
    setMessageInput('');

    // Simulate reply
    setTimeout(() => {
      const conv = conversations.find(c => c.id === selectedConversation);
      const replies = [
        'D\'accord, je vais m\'en occuper ! 👍',
        'Bien reçu, merci !',
        'Je t\'envoie les détails plus tard.',
        'C\'est noté ! Je vous tiens informé(e).',
        'Parfait, on se tient au courant !',
      ];
      const replyMessage: ChatMessage = {
        id: String(Date.now() + 1),
        senderId: conv?.participantId || '',
        senderName: conv?.participantName || '',
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date(),
        type: 'text'
      };
      setConversations(prev => prev.map(c => 
        c.id === selectedConversation 
          ? { ...c, messages: [...c.messages, replyMessage], lastMessage: replyMessage.content, lastMessageTime: new Date() }
          : c
      ));
    }, 2000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 60000) return 'À l\'instant';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}min`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="h-[calc(100vh-8rem)] dark:bg-gray-800 bg-white rounded-2xl shadow-sm border dark:border-gray-700 border-gray-100 overflow-hidden flex">
      {/* Conversation List */}
      <div className={`w-full md:w-80 border-r dark:border-gray-700 border-gray-100 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        {/* Search */}
        <div className="p-4 border-b dark:border-gray-700 border-gray-100">
          <h2 className="text-lg font-semibold dark:text-gray-100 text-gray-800 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-gray-500 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 dark:bg-gray-800/50 bg-gray-50 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                setSelectedConversation(conv.id);
                setShowMobileChat(true);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 dark:hover:bg-gray-700 hover:bg-gray-50 transition-colors ${
                selectedConversation === conv.id ? 'dark:bg-blue-900/30 bg-blue-50' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="dark:text-blue-400 text-blue-600 font-medium">
                    {conv.participantName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className={`truncate ${conv.unread > 0 ? 'font-semibold dark:text-gray-100 text-gray-800' : 'font-medium dark:text-gray-300 text-gray-600'}`}>
                    {conv.participantName}
                  </span>
                  <span className="text-xs dark:text-gray-500 text-gray-400 flex-shrink-0 ml-2">{formatTime(conv.lastMessageTime)}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs dark:text-gray-400 text-gray-500 truncate">{conv.participantPosition}</p>
                  {conv.unread > 0 && (
                    <span className="ml-2 flex-shrink-0 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {currentConv && (
        <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 border-gray-100">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowMobileChat(false)}
                className="md:hidden p-1 dark:hover:bg-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={20} className="dark:text-gray-300 text-gray-600" />
              </button>
              <div className="relative">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="dark:text-blue-400 text-blue-600 font-medium text-sm">
                    {currentConv.participantName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {currentConv.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <p className="font-medium dark:text-gray-100 text-gray-800">{currentConv.participantName}</p>
                <p className="text-xs dark:text-gray-400 text-gray-500">
                  {currentConv.online ? 'En ligne' : 'Hors ligne'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 dark:hover:bg-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone size={18} className="dark:text-gray-400 text-gray-500" />
              </button>
              <button className="p-2 dark:hover:bg-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Video size={18} className="dark:text-gray-400 text-gray-500" />
              </button>
              <button className="p-2 dark:hover:bg-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical size={18} className="dark:text-gray-400 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {currentConv.messages.map((msg) => {
              const isMe = msg.senderId === currentUser?.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${isMe ? 'order-1' : ''}`}>
                    <div className={`rounded-2xl px-4 py-2 ${
                      isMe 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-100 dark:text-gray-100 text-gray-800 rounded-bl-none'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className={`text-xs dark:text-gray-500 text-gray-400 mt-1 ${isMe ? 'text-right' : ''}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div className="border-t dark:border-gray-700 border-gray-100 p-3">
            <div className="flex items-center space-x-2">
              <button className="p-2 dark:hover:bg-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip size={18} className="dark:text-gray-400 text-gray-500" />
              </button>
              <button className="p-2 dark:hover:bg-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Image size={18} className="dark:text-gray-400 text-gray-500" />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm"
              />
              <button className="p-2 dark:hover:bg-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Smile size={18} className="dark:text-gray-400 text-gray-500" />
              </button>
              <button
                onClick={handleSend}
                disabled={!messageInput.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!currentConv && (
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 dark:bg-blue-900/30 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold dark:text-gray-100 text-gray-800 mb-1">Sélectionnez une conversation</h3>
            <p className="dark:text-gray-400 text-gray-500 text-sm">Choisissez un contact pour commencer à discuter</p>
          </div>
        </div>
      )}
    </div>
  );
}
