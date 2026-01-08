import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Users, Trash2, Edit, CheckCircle, Coffee, Briefcase, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Fetch Users Error:', err);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
                setSuccessMessage(`Role updated successfully for ${users.find(u => u._id === userId).name}`);
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to update role');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                setUsers(users.filter(u => u._id !== userId));
                setSuccessMessage('User deleted successfully');
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Shield className="w-4 h-4 text-purple-500" />;
            case 'manager': return <Briefcase className="w-4 h-4 text-blue-500" />;
            case 'employee': return <Coffee className="w-4 h-4 text-green-500" />;
            default: return <User className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="pt-24 px-6 min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
            {/* Header section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <Users className="text-red-600" /> Admin Command Center
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage users, roles and system permissions for Derara Coffee.</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-semibold shadow-sm"
                >
                  Logout
                </button>
            </div>

            {/* Quick Stats */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Users</p>
                            <h3 className="text-2xl font-bold mt-1 dark:text-white">{users.length}</h3>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            <Users className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Managers</p>
                            <h3 className="text-2xl font-bold mt-1 dark:text-white">{users.filter(u => u.role === 'manager').length}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Employees</p>
                            <h3 className="text-2xl font-bold mt-1 dark:text-white">{users.filter(u => u.role === 'employee').length}</h3>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <Coffee className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Customers</p>
                            <h3 className="text-2xl font-bold mt-1 dark:text-white">{users.filter(u => u.role === 'customer').length}</h3>
                        </div>
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                            <UserCheck className="w-6 h-6 text-amber-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="max-w-7xl mx-auto mb-6">
                {error && <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/50 mb-4">{error}</div>}
                {successMessage && <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800/50 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> {successMessage}</div>}
            </div>

            {/* Users Table */}
            <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Registry</h2>
                    <div className="flex gap-2">
                         <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">Total: {users.length}</span>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-8 py-4">User Details</th>
                                <th className="px-8 py-4">Email Address</th>
                                <th className="px-8 py-4">Status / Role</th>
                                <th className="px-8 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                            Searching for coffee lovers...
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-10 text-center text-gray-400">No users found in the plantation.</td>
                                </tr>
                            ) : (
                                users.map(u => (
                                    <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/20">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white">{u.name}</div>
                                                    <div className="text-xs text-gray-400">{u.role === 'admin' ? 'System Root' : 'Team Member'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-gray-600 dark:text-gray-400 text-sm">{u.email}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                    disabled={u._id === user._id}
                                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none transition-all ${
                                                        u.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400' :
                                                        u.role === 'manager' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400' :
                                                        u.role === 'employee' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400' :
                                                        'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300'
                                                    } cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                                                >
                                                    <option value="customer">Customer</option>
                                                    <option value="employee">Employee</option>
                                                    <option value="manager">Manager</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {getRoleIcon(u.role)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <button
                                                onClick={() => handleDeleteUser(u._id)}
                                                disabled={u._id === user._id}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all disabled:opacity-0"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
