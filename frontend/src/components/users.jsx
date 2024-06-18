import React, { useEffect, useState } from 'react';

const Users = () => {
    const [Data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/dashboard/admin`);
                if (res.ok) {
                    const result = await res.json();
                    setData(result.invalid_user);
                } else {
                    const error = await res.json();
                    console.error("Request failed with status:", res.status, error);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event, index) => {
        const { value } = event.target;
        setData(prevData => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], role: value };
            return newData;
        });
    };

    function getStatusColor(status) {
        switch (status) {
            case 'approved':
                return 'bg-green-600 text-white';
            case 'Pending':
                return 'bg-blue-600 text-white';
            case 'rejected':
                return 'bg-red-600 text-white';
            default:
                return '';
        }
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
    }

    return (
        <>
            <div className="text-4xl font-bold mt-20 ml-40 mr-40">
                Assign Role to user
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 ml-40 mr-40">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Register Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((item, index) => (
                            <tr key={index} className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.user_id}
                                </th>
                                <td className="px-6 py-4">
                                    {item.username}
                                </td>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDate(item.created_at)}
                                </td>
                                <td className="px-2 py-4 w-70">
                                    <div className="relative">
                                        <select
                                            value={item.role || ''}
                                            onChange={(event) => handleChange(event, index)}
                                            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="">None</option>
                                            <option value="admin">Admin</option>
                                            <option value="dealer">Dealer</option>
                                            <option value="rm">Relationship Manager</option>
                                            <option value="invalid-user">Invalid User</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.293 11.293a1 1 0 0 1 1.414 0l4 4a1 1 0 1 1-1.414 1.414l-3.293-3.293-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Users;
