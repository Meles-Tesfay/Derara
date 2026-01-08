import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart, Coffee, Users, ClipboardList, MessageSquare, Plus, 
  Settings, Save, Trash2, CheckCircle, Clock, AlertCircle 
} from 'lucide-react';

const ManagerDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('content'); // 'content', 'tasks', 'requests'
    const [services, setServices] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [requests, setRequests] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = user.token;
            const headers = { 'Authorization': `Bearer ${token}` };

            if (activeTab === 'content') {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/services`);
                setServices(await res.json());
            } else if (activeTab === 'tasks') {
                const [tasksRes, usersRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/ops/tasks/all`, { headers }),
                    fetch(`${import.meta.env.VITE_API_URL}/users`, { headers })
                ]);
                setTasks(await tasksRes.json());
                const allUsers = await usersRes.json();
                setEmployees(allUsers.filter(u => u.role === 'employee'));
            } else if (activeTab === 'requests') {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/requests/all`, { headers });
                setRequests(await res.json());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newService = Object.fromEntries(formData.entries());
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/services`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newService)
            });
            if (res.ok) {
                setMessage('Service created successfully!');
                fetchData();
                e.target.reset();
            }
        } catch (err) { console.error(err); }
    };

    const handleAssignTask = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = Object.fromEntries(formData.entries());
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/tasks`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(newTask)
            });
            if (res.ok) {
                setMessage('Task assigned successfully!');
                fetchData();
                e.target.reset();
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="pt-24 px-6 min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 transition-colors">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                            <BarChart className="text-red-600" /> Operations Center
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage Derara Coffee content, tasks, and customer inquiries.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-8 bg-gray-200/50 dark:bg-gray-800/50 p-1.5 rounded-2xl w-fit">
                    {[
                        { id: 'content', icon: Coffee, label: 'UI & Content' },
                        { id: 'tasks', icon: ClipboardList, label: 'Task Console' },
                        { id: 'requests', icon: MessageSquare, label: 'Customer Requests' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                activeTab === tab.id 
                                ? 'bg-white dark:bg-gray-700 text-red-600 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </div>

                {message && <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl border border-green-200 dark:border-green-800 flex items-center gap-2 shadow-sm font-bold animate-fade-in"><CheckCircle size={20} /> {message}</div>}

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT PANEL: Forms */}
                    <div className="lg:col-span-1 space-y-8">
                        {activeTab === 'content' && (
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white"><Plus className="text-red-600" /> Add New Product/Service</h2>
                                <form onSubmit={handleCreateService} className="space-y-4">
                                    <input name="name" placeholder="Service Name" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none" required />
                                    <textarea name="description" placeholder="Description" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none" required />
                                    <input name="category" placeholder="Category (e.g. Coffee Beans)" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none" required />
                                    <button type="submit" className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-1">Publish to UI</button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'tasks' && (
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white"><ClipboardList className="text-red-600" /> Assign Operation Task</h2>
                                <form onSubmit={handleAssignTask} className="space-y-4">
                                    <input name="title" placeholder="Task Title" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none" required />
                                    <textarea name="description" placeholder="Detailed Instructions" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none" required />
                                    <select name="assignedTo" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none" required>
                                        <option value="">Select Employee</option>
                                        {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
                                    </select>
                                    <input type="date" name="dueDate" className="w-full p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none" />
                                    <button type="submit" className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all">Send Task</button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* RIGHT PANEL: List Displays */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden h-full">
                            <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-lg dark:text-white capitalize">{activeTab} List</h3>
                                <div className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-500">Live Sync Active</div>
                            </div>

                            <div className="p-0 max-h-[600px] overflow-y-auto">
                                {loading ? (
                                    <div className="p-20 text-center text-gray-400">Loading data...</div>
                                ) : (
                                    <div className="divide-y divide-gray-50 dark:divide-gray-700">
                                        {activeTab === 'content' && services.map(s => (
                                            <div key={s._id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold dark:text-white">{s.name}</h4>
                                                        <p className="text-sm text-gray-500 mt-1">{s.description}</p>
                                                        <span className="inline-block mt-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-md border border-red-100 dark:border-red-900/30">{s.category}</span>
                                                    </div>
                                                    <button className="text-gray-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                                                </div>
                                            </div>
                                        ))}
                                        {activeTab === 'tasks' && tasks.map(t => (
                                            <div key={t._id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold dark:text-white">{t.title}</h4>
                                                        <p className="text-xs text-gray-500 mt-1">Assigned to: <span className="font-bold text-gray-900 dark:text-gray-300">{t.assignedTo?.name}</span></p>
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg ${
                                                                t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                            }`}>
                                                                {t.status === 'completed' ? <CheckCircle size={14}/> : <Clock size={14}/>} {t.status}
                                                            </div>
                                                            {t.dueDate && <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10}/> Due {new Date(t.dueDate).toLocaleDateString()}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {activeTab === 'requests' && requests.map(r => (
                                            <div key={r._id} className="p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                               <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{r.type}</span>
                                                            <h4 className="font-bold dark:text-white">{r.subject}</h4>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-2">From: <span className="font-bold text-gray-900 dark:text-gray-300">{r.user?.name}</span></p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800 italic">"{r.description}"</p>
                                                    </div>
                                                    <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"><MessageSquare size={18}/></button>
                                               </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
