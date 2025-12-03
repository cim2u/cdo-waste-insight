import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, Info, TrendingUp } from "lucide-react";
import { Button } from "./ui/button.tsx";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // FIXED: Must include /dashboard/ prefix
    const navItems = [
        { to: "/dashboard/prediction", icon: TrendingUp, label: "Classification" },
        { to: "/dashboard/about", icon: Info, label: "About" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside
                className={`bg-green border-r border-slate-200 transition-all duration-300 ${
                    sidebarOpen ? 'w-64' : 'w-20'
                }`}
            >
                <div className="p-4 border-b border-slate-200">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="mb-2"
                    >
                        <Menu className="size-5" />
                    </Button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`
                            }
                        >
                            <item.icon className="size-5 flex-shrink-0" />
                            {sidebarOpen && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
