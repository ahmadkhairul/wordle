"use client";

import { useMemo, useState } from "react";
import dummyData from "./data.json";

type DataProps = {
  username: string;
  role: string;
  status: string;
  lastlogin: string | null;
  lastmodified: string;
};

export default function App() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("username");

  const filteredData = useMemo(() => {
    let _data: DataProps[] = [...dummyData];

    if (username) {
      _data = _data.filter((item) =>
        item.username.toLocaleLowerCase().includes(username.toLocaleLowerCase())
      );
    }

    if (role) {
      _data = _data.filter((item) => item.role === role);
    }

    if (status) {
      _data = _data.filter((item) => item.status === status);
    }

    if (sortBy) {
      _data = _data.sort((a, b) => {
        const key = sortBy as keyof DataProps;

        const nameA = a[key];
        const nameB = b[key];

        if (nameA == null) return 1;
        if (nameB == null) return -1;

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      });
    }

    return _data;
  }, [username, role, status, sortBy]);

  return (
    <div className="App p-4">
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
        <table className="min-w-full table-auto bg-gray-900 text-sm text-white">
          <thead className="bg-gray-800 text-gray-200 uppercase text-xs">
            <tr>
              <th
                className="px-6 py-3 text-left font-semibold tracking-wider cursor-pointer hover:text-white"
                onClick={() => setSortBy("username")}
              >
                Username
              </th>
              <th
                className="px-6 py-3 text-left font-semibold tracking-wider cursor-pointer hover:text-white"
                onClick={() => setSortBy("role")}
              >
                Role
              </th>
              <th
                className="px-6 py-3 text-left font-semibold tracking-wider cursor-pointer hover:text-white"
                onClick={() => setSortBy("status")}
              >
                Status
              </th>
              <th
                className="px-6 py-3 text-left font-semibold tracking-wider cursor-pointer hover:text-white"
                onClick={() => setSortBy("lastlogin")}
              >
                Last Logged In
              </th>
              <th
                className="px-6 py-3 text-left font-semibold tracking-wider cursor-pointer hover:text-white"
                onClick={() => setSortBy("lastmodified")}
              >
                Last Modified
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-800 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4">{item.username}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4">{convertDate(item.lastlogin)}</td>
                <td className="px-6 py-4">{convertDate(item.lastmodified)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>

  );
}

const convertDate = (date: string | null) => {
  if (!date) return "-";
  const _date = new Date(parseInt(date) * 1000);
  return _date.toISOString();
};
