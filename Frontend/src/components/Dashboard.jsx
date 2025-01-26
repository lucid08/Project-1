import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', dob: '' });
  const [editId, setEditId] = useState(null); // Track the ID of the item being edited

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/v1/items/get-items');
      setItems(response.data);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const calculateAge = (dob) =>
    Math.floor((new Date() - new Date(dob)) / (365.25 * 24 * 60 * 60 * 1000));

  const handleAdd = async () => {
    if (!form.name || !form.dob) {
      toast.error('Please fill out all fields');
      return;
    }
    const response = await axios.post('http://localhost:5000/api/v1/items/add-item', form);
    setItems([...items, response.data]);
    setForm({ name: '', dob: '' }); // Reset the form
    toast.success('Item added');
  };

  const handleEdit = (item) => {
    // Pre-fill the form with the selected item's data
    setForm({ name: item.name, dob: item.dob });
    setEditId(item.id); // Set the ID of the item being edited
  };

  const handleUpdate = async () => {
    if (!form.name || !form.dob) {
      toast.error('Please fill out all fields');
      return;
    }
    const response = await axios.put(
      `http://localhost:5000/api/v1/items/update-item/${editId}`,
      form
    );
    setItems(
      items.map((item) => (item.id === editId ? response.data : item))
    );
    setForm({ name: '', dob: '' }); // Reset the form
    setEditId(null); // Exit edit mode
    toast.success('Item updated');
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/items/delete-item/${id}`);
    setItems(items.filter((item) => item.id !== id));
    toast.success('Item deleted');
  };

  return (
    <div className="p-8">
      {/* ToastContainer */}
      <ToastContainer />
      
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="date"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        {editId ? (
          <button
            onClick={handleUpdate}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="p-2 bg-green-500 text-white rounded"
          >
            Add
          </button>
        )}
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">DOB</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td colSpan="4" className="p-2">
                  <Skeleton height={20} />
                </td>
              </tr>
            ))
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{calculateAge(item.dob)}</td>
                <td className="border p-2">{item.dob}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
