import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { 
  MessageCircle, History, Coffee, HelpCircle, Send, 
  CheckCircle, Clock, Search, ExternalLink, ArrowRight
} from 'lucide-react';

import DashboardLayout from '../../components/dashboard/DashboardLayout';

const CustomerDashboard = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [activeView, setActiveView] = useState('new');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (activeView === 'history') fetchMyRequests();
    }, [activeView]);

    const fetchMyRequests = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/requests/my`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setRequests(Array.isArray(data) ? data : []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleNewRequest = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const token = await getToken();
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/requests`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                setMessage('Your request has been sent to the managers!');
                setActiveView('history');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) { console.error(err); }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-4">
                            Welcome back, <span className="text-red-600 underline decoration-red-600/30 underline-offset-8">
                                {user?.firstName || 'Coffee Lover'}
                            </span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg font-medium">Ready to explore Derara's premium coffee selection?</p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        <button 
                            onClick={() => setActiveView('new')}
                            className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeView === 'new' ? 'bg-black dark:bg-white text-white dark:text-black shadow-xl scale-105' : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            <div className="flex items-center gap-2 italic"><Send size={18}/> New Request</div>
                        </button>
                        <button 
                            onClick={() => setActiveView('history')}
                            className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${activeView === 'history' ? 'bg-red-600 text-white shadow-xl shadow-red-500/30 scale-105' : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            <div className="flex items-center gap-2 italic"><History size={18}/> Inquiries</div>
                        </button>
                    </div>

                    {message && <div className="mb-8 p-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-3xl border border-green-200 dark:border-green-800/50 flex items-center gap-4 font-bold animate-fade-in"><CheckCircle size={24}/> {message}</div>}

                    {/* Content */}
                    <div className="grid grid-cols-1 gap-8">
                        {activeView === 'new' && (
                            <div className="max-w-2xl mx-auto w-full bg-white dark:bg-gray-800 p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Send size={150}/>
                                </div>
                                <h2 className="text-2xl font-black mb-8 dark:text-white flex items-center gap-3 italic">Submit New Inquiry</h2>
                                <form onSubmit={handleNewRequest} className="space-y-6 relative z-10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Request Type</label>
                                        <select name="type" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-600/50 outline-none transition-all dark:text-white font-bold" required>
                                            <option value="Quote">Price Quote</option>
                                            <option value="Inquiry">General Inquiry</option>
                                            <option value="Sample">Sample Request</option>
                                            <option value="Consulting">Consulting services</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Phone Number</label>
                                        <input name="phone" placeholder="+251..." className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-600/50 outline-none transition-all dark:text-white font-bold" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Subject</label>
                                        <input name="subject" placeholder="What is this about?" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-600/50 outline-none transition-all dark:text-white font-bold" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">Details</label>
                                        <textarea name="description" rows="4" placeholder="Tell us more about your needs..." className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-transparent focus:border-red-600/50 outline-none transition-all dark:text-white font-bold" required />
                                    </div>
                                    <button type="submit" className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-500/30 transition-all flex items-center justify-center gap-3">
                                        Sign & Send <Send size={18}/>
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeView === 'history' && (
                            <div className="space-y-6">
                                {requests.length === 0 ? (
                                    <div className="bg-white dark:bg-gray-800 p-20 rounded-[3rem] text-center border-4 border-dashed border-gray-100 dark:border-gray-700">
                                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                            <HelpCircle size={40}/>
                                        </div>
                                        <h3 className="text-xl font-bold dark:text-white mb-2">No Requests Found</h3>
                                        <p className="text-gray-500 font-medium">Your requests will appear here once you submit them.</p>
                                    </div>
                                ) : (
                                    requests.map(r => (
                                        <div key={r._id} className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between gap-8 group hover:-translate-y-1 transition-all">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-black uppercase rounded-lg">{r.type}</span>
                                                    <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase ${
                                                        r.status === 'responded' ? 'bg-green-100 text-green-700' : 
                                                        r.status === 'in-review' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {r.status}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold dark:text-white mb-2">{r.subject}</h3>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm italic font-medium">"{r.description}"</p>
                                                
                                                {r.response && (
                                                    <div className="mt-6 p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border-l-4 border-red-600 relative">
                                                        <div className="flex items-center gap-2 mb-2 text-red-600 font-black text-xs uppercase tracking-widest">
                                                            <MessageCircle size={14}/> Manager's Note:
                                                        </div>
                                                        <p className="text-gray-900 dark:text-gray-200 font-bold italic">{r.response}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-between items-end min-w-[150px]">
                                                <div className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-2 tracking-[0.2em]">
                                                    <Clock size={14}/> {new Date(r.createdAt).toLocaleDateString()}
                                                </div>
                                                <button className="text-gray-400 hover:text-red-600 transition-colors p-2">
                                                    <ExternalLink size={20}/>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CustomerDashboard;
