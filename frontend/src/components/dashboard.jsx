import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const dashboard = () => {
    function handle_users_page(){        
        const navigate = useNavigate();
        navigate(`admin/users/${id}`)
    }
    return (
        <div>
            <div className="bg-gray-100 min-h-screen">
                {/* Sidebar */}
                <div className="bg-gray-800 text-white h-screen w-64 fixed left-0 top-0 overflow-y-auto">
                    <div className="p-4">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="mt-2 text-sm">Welcome, Admin</p>
                    </div>
                    <nav className="mt-10">
                        <Link className="block py-2.5 px-4 hover:bg-gray-700">
                            Dashboard
                        </Link>
                        <Link onClick={handle_users_page} to="admin/users" className="block py-2.5 px-4 hover:bg-gray-700">
                            Users
                        </Link>
                        <Link className="block py-2.5 px-4 hover:bg-gray-700">
                            Profile
                        </Link>
                        <Link className="block py-2.5 px-4 hover:bg-gray-700">
                            Logout
                        </Link>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="ml-64">
                    <div className="p-4">
                        <header className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold">Dashboard</h2>
                            </div>
                            <div>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                    Create
                                </button>
                            </div>
                        </header>

                        {/* Content Area */}
                        <div className="mt-4 bg-white shadow-md rounded-lg p-6">
                            {/* Replace with actual content */}
                            <p>This is where your dashboard content will go.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard