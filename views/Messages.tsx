
import React, { useState } from 'react';
import { 
  Search, 
  Phone, 
  User as UserIcon, 
  Smile, 
  Paperclip, 
  Send,
  Calendar as CalendarIcon,
  Clock,
  Zap,
  MoreVertical,
  CheckCheck
} from 'lucide-react';

export const Messages: React.FC = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [msgInput, setMsgInput] = useState('');
  
  const [contacts, setContacts] = useState([
    { 
      name: 'Jenny Wilson', 
      messages: [
        { text: 'Hello, Cynthia! Your lesson request for Business Analysis was received.', isMe: false, time: '2:15pm' },
        { text: 'Looking forward to our session!', isMe: false, time: '2:16pm' }
      ], 
      lastMsg: 'Hello, Cynthia! Your lesson request...', 
      time: 'Just now', 
      unread: 0, 
      avatar: 'https://picsum.photos/seed/jenny/40/40', 
      status: 'Online' 
    },
    { 
      name: 'Dominick Romaguera', 
      messages: [
        { text: 'Hey Jenny, I\'ll prepare some tools for the next UI session.', isMe: false, time: '10:00am' }
      ], 
      lastMsg: 'Hey Jenny, I\'ll prepare some to...', 
      time: '10min ago', 
      unread: 5, 
      avatar: 'https://picsum.photos/seed/dom/40/40', 
      status: 'Offline' 
    },
    { 
      name: 'Dolores Raynor', 
      messages: [
        { text: 'The assignment is graded. Check your portal.', isMe: false, time: 'Yesterday' }
      ], 
      lastMsg: 'Already done! ✅ Btw I was loo...', 
      time: '27min ago', 
      unread: 3, 
      avatar: 'https://picsum.photos/seed/dol/40/40', 
      status: 'Away' 
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    const newContacts = [...contacts];
    newContacts[activeChat].messages.push({
      text: msgInput,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    newContacts[activeChat].lastMsg = msgInput;
    setContacts(newContacts);
    setMsgInput('');

    // Simulated reply
    setTimeout(() => {
      const replyContacts = [...contacts];
      replyContacts[activeChat].messages.push({
        text: "I've received your message. I'll get back to you shortly!",
        isMe: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setContacts(replyContacts);
    }, 2000);
  };

  return (
    <div className="h-full bg-white rounded-[40px] shadow-sm border border-gray-100 flex overflow-hidden animate-in fade-in duration-500">
      {/* Contact List */}
      <div className="w-96 border-r border-gray-50 flex flex-col shrink-0">
         <div className="p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Messages</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search contacts..." 
                className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#9D72FF]/20 transition-all"
              />
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-1 scrollbar-hide">
            {contacts.map((c, i) => (
              <button 
                key={i}
                onClick={() => setActiveChat(i)}
                className={`w-full p-5 flex gap-4 text-left rounded-[28px] transition-all relative group ${activeChat === i ? 'bg-[#9D72FF]/5' : 'hover:bg-gray-50/50'}`}
              >
                <div className="relative shrink-0">
                  <img src={c.avatar} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-[#9D72FF]/20 transition-all" alt="" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${c.status === 'Online' ? 'bg-emerald-500' : c.status === 'Away' ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-black text-gray-900 truncate">{c.name}</h4>
                      <span className="text-[10px] text-gray-400 shrink-0 font-bold uppercase tracking-tight">{c.time}</span>
                   </div>
                   <p className="text-xs text-gray-500 truncate font-medium">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <div className="absolute right-4 bottom-4 w-6 h-6 bg-[#9D72FF] rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-[#9D72FF]/20">
                    {c.unread}
                  </div>
                )}
                {activeChat === i && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#9D72FF] rounded-r-full"></div>}
              </button>
            ))}
         </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/20">
         {/* Chat Header */}
         <div className="bg-white p-6 border-b border-gray-50 flex items-center justify-between shrink-0 shadow-sm relative z-10">
            <div className="flex items-center gap-4">
               <img src={contacts[activeChat].avatar} className="w-12 h-12 rounded-2xl ring-4 ring-gray-50" alt="" />
               <div>
                  <h4 className="text-base font-black text-gray-900 leading-none mb-1">{contacts[activeChat].name}</h4>
                  <div className="flex items-center gap-2">
                     <span className={`w-2 h-2 rounded-full ${contacts[activeChat].status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></span>
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{contacts[activeChat].status}</span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"><Phone className="w-5 h-5" /></button>
               <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"><MoreVertical className="w-5 h-5" /></button>
               <button className="px-6 py-2.5 bg-gray-900 text-white text-xs font-black rounded-xl hover:bg-black transition-all shadow-xl shadow-black/10 ml-2">Open Portal</button>
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
            <div className="flex flex-col items-center">
               <span className="px-5 py-2 bg-white text-gray-400 text-[10px] font-black rounded-2xl border border-gray-100 shadow-sm uppercase tracking-widest">April 14, 2024</span>
            </div>

            {/* Simulated Booking Data */}
            <div className="max-w-sm bg-[#1A1C1E] rounded-[36px] p-8 text-white shadow-2xl shadow-black/10 border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700"><CalendarIcon className="w-24 h-24" /></div>
               <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6">Booking Details</p>
               <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-3 rounded-2xl"><CalendarIcon className="w-5 h-5 text-[#9D72FF]" /></div>
                    <div>
                      <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Next Session</p>
                      <p className="text-sm font-black">Tomorrow, 14:30</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white/10 p-3 rounded-2xl"><Clock className="w-5 h-5 text-blue-400" /></div>
                    <div>
                      <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Duration</p>
                      <p className="text-sm font-black">60 Minutes</p>
                    </div>
                  </div>
               </div>
               <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">Modify Schedule</button>
            </div>

            {contacts[activeChat].messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                {!m.isMe && (
                   <div className="w-8 h-8 rounded-lg bg-[#9D72FF]/20 flex items-center justify-center shrink-0 mt-1">
                      <Zap className="w-4 h-4 text-[#9D72FF]" />
                   </div>
                )}
                <div className={`max-w-md p-6 rounded-[28px] shadow-sm relative group ${
                  m.isMe 
                    ? 'bg-[#9D72FF] text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                }`}>
                  <p className="text-sm font-semibold leading-relaxed">{m.text}</p>
                  <div className={`flex items-center gap-2 mt-3 ${m.isMe ? 'justify-end text-white/50' : 'justify-start text-gray-400'}`}>
                    <span className="text-[9px] font-black uppercase tracking-widest">{m.time}</span>
                    {m.isMe && <CheckCheck className="w-3 h-3 text-white/50" />}
                  </div>
                </div>
              </div>
            ))}
         </div>

         {/* Message Input */}
         <div className="p-8 shrink-0 bg-white border-t border-gray-50 shadow-2xl">
            <form onSubmit={handleSendMessage} className="flex items-center gap-4 bg-gray-50 p-2.5 pl-6 rounded-3xl border border-transparent focus-within:border-[#9D72FF]/30 transition-all shadow-inner">
               <button type="button" className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"><Smile className="w-5 h-5" /></button>
               <button type="button" className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"><Paperclip className="w-5 h-5" /></button>
               <input 
                 type="text" 
                 value={msgInput}
                 onChange={(e) => setMsgInput(e.target.value)}
                 placeholder="Compose your message..." 
                 className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 placeholder:text-gray-300"
               />
               <button 
                 type="submit"
                 disabled={!msgInput.trim()}
                 className="w-12 h-12 bg-[#9D72FF] text-white rounded-[20px] flex items-center justify-center shadow-xl shadow-[#9D72FF]/20 hover:bg-[#8A5CF5] hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100 disabled:shadow-none"
               >
                  <Send className="w-5 h-5" />
               </button>
            </form>
         </div>
      </div>
    </div>
  );
};
