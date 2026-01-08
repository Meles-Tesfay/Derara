import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  MessageCircle, History, Coffee, HelpCircle, Send, 
  CheckCircle, Clock, Search, ExternalLink, ArrowRight
} from 'lucide-react';

const CustomerDashboard = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('services'); // 'services', 'history', 'new'
    const [requests, setRequests] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (activeView === 'history') fetchMyRequests();
        if (activeView === 'services') fetchServices();
    }, [activeView]);

    const fetchMyRequests = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/requests/my`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            setRequests(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/services`);
            const data = await res.json();
            setServices(data.filter(s => s.isVisible));
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleNewRequest = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/requests`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                setMessage('Your request has been sent! We will get back to you soon.');
                setActiveView('history');
                setTimeout(() => setMessage(''), 5000);
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="pt-24 px-6 min-h-screen bg-[#FAFAFA] dark:bg-gray-950 pb-12 transition-colors">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Welcome, <span className="text-red-600 font-black">{user?.name.split(' ')[0]}</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Explore Derara Coffee services and manage your inquiries.</p>
                    </div>
                </div>

                {/* Navigation Tiles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { id: 'services', icon: Coffee, title: 'Explore Menu', desc: 'Browse approved services & beans' },
                        { id: 'new', icon: MessageCircle, title: 'Post Inquiry', desc: 'Need a custom coffee solution?' },
                        { id: 'history', icon: History, title: 'Inquiry History', desc: 'Track your existing requests' }
                    ].map(tile => (
                        <button
                            key={tile.id}
                            onClick={() => setActiveView(tile.id)}
                            className={`p-8 rounded-[2rem] text-left transition-all border-2 ${
                                activeView === tile.id 
                                ? 'bg-white dark:bg-gray-900 border-red-600 shadow-2xl shadow-red-500/10' 
                                : 'bg-transparent border-gray-100 dark:border-gray-900 hover:border-gray-200 dark:hover:border-gray-800'
                            }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                                activeView === tile.id ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                            }`}>
                                <tile.icon size={28} />
                            </div>
                            <h3 className={`text-xl font-black mb-2 dark:text-white ${activeView === tile.id ? 'text-red-600' : ''}`}>{tile.title}</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{tile.desc}</p>
                        </button>
                    ))}
                </div>

                {message && <div className="mb-10 p-5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-3xl border border-green-500/20 flex items-center gap-3 font-bold animate-fade-in"><CheckCircle size={22} /> {message}</div>}

                {/* Content Panel */}
                <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-4 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800 min-h-[400px]">
                    
                    {activeView === 'services' && (
                        <div className="animate-fade-in">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-black dark:text-white">Our Selection</h2>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input placeholder="Search products..." className="pl-12 pr-6 py-3 rounded-full bg-gray-50 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-red-500 dark:text-white" />
                                </div>
                            </div>
                            {loading ? (
                                <div className="py-20 text-center text-gray-400">Pouring your list...</div>
                            ) : services.length === 0 ? (
                                <p className="text-center text-gray-500 py-20 italic font-bold">Manager has not approved any services yet.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {services.map(s => (
                                        <div key={s._id} className="group bg-gray-50/50 dark:bg-gray-800/30 p-8 rounded-[2.5rem] border border-transparent hover:border-red-100 dark:hover:border-red-900/30 transition-all">
                                            <span className="text-[10px] font-black uppercase text-red-600 tracking-widest">{s.category}</span>
                                            <h4 className="text-xl font-bold mt-2 mb-3 dark:text-white">{s.name}</h4>
                                            <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-3">{s.description}</p>
                                            <button onClick={() => setActiveView('new')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-red-600 transition-colors">
                                               Request Quote <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeView === 'new' && (
                        <div className="max-w-2xl mx-auto animate-fade-in">
                            <h2 className="text-3xl font-black mb-8 dark:text-white text-center">New Inquiry</h2>
                            <form onSubmit={handleNewRequest} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Inquiry Type</label>
                                        <select name="type" className="w-full p-5 rounded-3xl bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-red-500 outline-none font-bold" required>
                                            <option value="Quote">Price Quote</option>
                                            <option value="Inquiry">General Inquiry</option>
                                            <option value="Support">Business Support</option>
                                            <option value="Feedback">Feedback</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Subject</label>
                                        <input name="subject" placeholder="What's this about?" className="w-full p-5 rounded-3xl bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-red-500 outline-none font-bold" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Message Detail</label>
                                    <textarea name="description" placeholder="How can Derara Coffee help you today?" className="w-full h-40 p-6 rounded-[2rem] bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-red-500 outline-none font-medium resize-none" required />
                                </div>
                                <button type="submit" className="w-full py-6 bg-red-600 text-white font-black uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all transform hover:-translate-y-1">Send your Request</button>
                            </form>
                        </div>
                    )}

                    {activeView === 'history' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-black mb-10 dark:text-white">Your Requests</h2>
                            {loading ? (
                                <div className="py-20 text-center animate-pulse text-gray-400">Fetching history...</div>
                            ) : requests.length === 0 ? (
                                <div className="text-center py-20">
                                    <HelpCircle size={48} className="mx-auto text-gray-200 mb-4" />
                                    <p className="text-gray-500 font-bold italic">You haven't made any requests yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {requests.map(r => (
                                        <div key={r._id} className="p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-white/[0.02]">
                                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-3">
                                                       <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                                                           r.status === 'responded' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                       }`}>
                                                           {r.status}
                                                       </span>
                                                       <span className="text-[10px] text-gray-400 font-bold">{new Date(r.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <h4 className="text-xl font-bold dark:text-white">{r.subject}</h4>
                                                    <p className="text-sm text-gray-500 mt-2 italic">"{r.description}"</p>
                                                    
                                                    {r.response && (
                                                        <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-3xl border border-red-50 shadow-sm">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <MessageCircle size={14} className="text-red-600" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Response from Derara</span>
                                                            </div>
                                                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{r.response}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
