import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../utils/constants';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        // Set the Authorization header with the token
        const response = await axios.get(`${API_BASE_URL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // If the request is successful, update the state with the fetched users
        setUsers(response.data);
        console.log("response", response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Failed to fetch users');
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">User List</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{user.name}</h3>
            <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-700"><strong>Number:</strong> {user.number}</p>
            {user.hasPurchasedCourse && (
              <div className="mt-4">
                <h4 className="text-lg font-medium text-gray-800">Course Details</h4>
                <p className="text-gray-600"><strong>Course Name:</strong> {user.courseDetails.courseName}</p>
                <p className="text-gray-600"><strong>Duration:</strong> {user.courseDetails.courseDuration}</p>
                <p className="text-gray-600"><strong>Purchase Date:</strong> {new Date(user.courseDetails.purchaseDate).toLocaleDateString()}</p>
                <p className="text-gray-600"><strong>Receipt ID:</strong> {user.courseDetails.receiptId}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
