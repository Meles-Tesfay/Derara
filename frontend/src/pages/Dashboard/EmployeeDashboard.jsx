import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ClipboardList, CheckCircle, Clock, AlertCircle, Send, FileText, Coffee } from 'lucide-react';

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchMyTasks();
    }, []);

    const fetchMyTasks = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/tasks/my`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            setTasks(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleUpdateStatus = async (taskId, status, report = '') => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/tasks/${taskId}/status`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ status, report })
            });
            if (res.ok) {
                setMessage('Task status updated!');
                fetchMyTasks();
                setSelectedTask(null);
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="pt-24 px-6 min-h-screen bg-[#FDFCFB] dark:bg-gray-950 pb-12 transition-colors">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Coffee className="text-red-600" /> Employee Workspace
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Focus on task execution and reporting coffee operations.</p>
                </div>

                {message && <div className="mb-8 p-4 bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl border border-green-500/20 flex items-center gap-3 font-bold animate-fade-in"><CheckCircle size={20} /> {message}</div>}

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Tasks</p>
                        <h3 className="text-3xl font-black mt-2 dark:text-white">{tasks.filter(t => t.status !== 'completed').length}</h3>
                     </div>
                     <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Completed</p>
                        <h3 className="text-3xl font-black mt-2 text-green-600">{tasks.filter(t => t.status === 'completed').length}</h3>
                     </div>
                     <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Reports Filed</p>
                        <h3 className="text-3xl font-black mt-2 text-blue-600">{tasks.filter(t => t.report).length}</h3>
                     </div>
                </div>

                <h2 className="text-xl font-black mb-6 dark:text-white flex items-center gap-2 underline decoration-red-600 decoration-4 underline-offset-8">Assigned Tasks</h2>

                <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                        <div className="py-20 text-center text-gray-400 animate-pulse">Brewing your task list...</div>
                    ) : tasks.length === 0 ? (
                        <div className="bg-white dark:bg-gray-900 p-12 rounded-3xl text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
                            <ClipboardList size={48} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-500 font-bold italic">No tasks assigned yet. Enjoy a coffee!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <div key={task._id} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-red-100 dark:hover:border-red-900/30 transition-all group">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                                task.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                                task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {task.status.replace('-', ' ')}
                                            </span>
                                            {task.dueDate && <span className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1"><Clock size={12}/> {new Date(task.dueDate).toLocaleDateString()}</span>}
                                        </div>
                                        <h3 className="text-xl font-bold dark:text-white group-hover:text-red-600 transition-colors">{task.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">{task.description}</p>
                                        
                                        {task.report && (
                                            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Last Report</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-300 italic">"{task.report}"</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex md:flex-col gap-2 shrink-0">
                                        {task.status !== 'completed' && (
                                            <>
                                                <button 
                                                    onClick={() => setSelectedTask(task)}
                                                    className="flex-1 md:w-40 flex items-center justify-center gap-2 bg-black dark:bg-red-600 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-red-600 dark:hover:bg-red-700 transition-all shadow-lg shadow-black/10"
                                                >
                                                    <FileText size={16}/> Submit Report
                                                </button>
                                                {task.status === 'pending' && (
                                                     <button 
                                                        onClick={() => handleUpdateStatus(task._id, 'in-progress')}
                                                        className="flex-1 md:w-40 flex items-center justify-center gap-2 border-2 border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 font-black text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-gray-50 transition-all"
                                                    >
                                                        Start Task
                                                    </button>
                                                )}
                                                {task.status === 'in-progress' && (
                                                     <button 
                                                        onClick={() => handleUpdateStatus(task._id, 'completed', 'Task completed without detailed report.')}
                                                        className="flex-1 md:w-40 flex items-center justify-center gap-2 bg-green-600 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl shadow-lg shadow-green-600/20"
                                                    >
                                                        <CheckCircle size={16}/> Complete
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        {task.status === 'completed' && (
                                            <div className="md:w-40 text-center py-3 bg-green-50 dark:bg-green-900/20 text-green-600 font-black text-xs uppercase tracking-widest rounded-xl border border-green-100 dark:border-green-800 flex items-center justify-center gap-2">
                                                <CheckCircle size={16}/> Finished
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Reporting Modal */}
            {selectedTask && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 scale-in">
                        <h3 className="text-2xl font-black mb-2 dark:text-white">Submit Report</h3>
                        <p className="text-gray-500 mb-6 text-sm">Provide details for: <span className="font-bold text-gray-800 dark:text-gray-200">{selectedTask.title}</span></p>
                        
                        <textarea 
                            id="reportText"
                            placeholder="Describe what you achieved or any issues encountered..." 
                            className="w-full h-40 p-5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-red-500 dark:text-white mb-6 resize-none"
                        />
                        
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setSelectedTask(null)}
                                className="flex-1 py-4 font-black uppercase text-xs tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleUpdateStatus(selectedTask._id, 'completed', document.getElementById('reportText').value)}
                                className="flex-1 py-4 bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-2"
                            >
                                <Send size={16}/> Finalize & Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDashboard;
