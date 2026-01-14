import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { 
  Users, Shield, Briefcase, Coffee, 
  LayoutDashboard, LogOut, Menu, X, 
  Settings, Package, CheckCircle, History,
  MessageSquare, ClipboardList
} from 'lucide-react';
import Logo from '../common/Logo';

const Sidebar = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        signOut({ redirectUrl: '/' });
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    // Roles and navigation
    const userRole = user?.publicMetadata?.role || 'customer';

    const getNavItems = () => {
        const items = [
            {icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['customer'] },
            { icon: LayoutDashboard, label: 'Admin View', path: '/admin-dashboard', roles: ['admin'] },
            { icon: ClipboardList, label: 'Task Console', path: '/manager-dashboard?tab=tasks', roles: ['manager'] },
            { icon: Coffee, label: 'UI & Content', path: '/manager-dashboard?tab=content', roles: ['manager'] },
            { icon: Users, label: 'People', path: '/manager-dashboard?tab=users', roles: ['manager'] },
            { icon: MessageSquare, label: 'Requests', path: '/manager-dashboard?tab=requests', roles: ['manager'] },
            { icon: LayoutDashboard, label: 'Task Center', path: '/employee-dashboard', roles: ['employee'] },
        ];

        if (userRole === 'admin') {
            items.push(
                { icon: Shield, label: 'All Users', path: '/admin-dashboard', roles: ['admin'] },
                { icon: Briefcase, label: 'Managers', path: '/admin-dashboard?role=manager', roles: ['admin'] },
                { icon: Coffee, label: 'Employees', path: '/admin-dashboard?role=employee', roles: ['admin'] },
                { icon: Users, label: 'Customers', path: '/admin-dashboard?role=customer', roles: ['admin'] }
            );
        }

        if (userRole === 'customer') {
            items.push(
                { icon: History, label: 'My Requests', path: '/dashboard', roles: ['customer'] }
            );
        }

        return items.filter(item => item.roles.includes(userRole));
    };

    const navItems = getNavItems();

    return (
        <>
            {/* Mobile Toggle */}
            <button 
                onClick={toggleSidebar}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-red-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 
                z-40 transition-all duration-300 ease-in-out
                ${isOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col h-full">
                    <div className="p-8">
                        <NavLink to="/" className="block transition-transform hover:scale-105 active:scale-95">
                            <Logo />
                        </NavLink>
                    </div>

                    <nav className="flex-grow px-4 space-y-2 overflow-y-auto pb-10">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label + item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group
                                    ${isActive 
                                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 shadow-sm' 
                                        : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'}
                                `}
                            >
                                <item.icon size={22} className="transition-transform group-hover:scale-110" />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}

                        {/* Logout Link in the list */}
                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all group"
                            >
                                <LogOut size={22} className="transition-transform group-hover:translate-x-1" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div 
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                />
            )}
        </>
    );
};

export default Sidebar;
