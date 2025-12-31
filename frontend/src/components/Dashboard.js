import React, { useEffect, useState } from 'react';
import api from '../api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [role] = useState(localStorage.getItem('role'));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ fullName: '', email: '' });
  
  // Change Password States
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passData, setPassData] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
    if (role === 'admin') fetchAllUsers(page);
  }, [role, page]);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/user');
      setUser(res.data);
      setEditData({ fullName: res.data.fullName, email: res.data.email });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllUsers = async (pageNum) => {
    try {
      const res = await api.get(`/users?page=${pageNum}`);
      setUsersList(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', editData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      setMessage('Error updating profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/password', passData);
      setMessage('Password updated successfully!');
      setIsChangingPass(false);
      setPassData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error changing password');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    if (window.confirm(`Make user ${newStatus}?`)) {
      await api.put(`/users/${id}/status`, { status: newStatus });
      fetchAllUsers(page);
    }
  };

  if (!user) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading...</div>;

  return (
    <div>
      <h1 style={{ color: '#6a1b9a' }}>Welcome, {user.fullName}</h1>
      {message && <div className={`error-msg`} style={{background: '#e8f5e9', color: 'green'}}>{message}</div>}

      <div className="dashboard-grid">
        {/* === ADMIN SECTION === */}
        {role === 'admin' && (
          <div className="card" style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <h3>User Management</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(u => (
                  <tr key={u._id}>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td><strong>{u.role}</strong></td>
                    <td style={{ color: u.status === 'active' ? 'green' : 'red', fontWeight: 'bold' }}>
                      {u.status}
                    </td>
                    <td>
                      {u.role !== 'admin' && (
                        <button 
                          className={`action-btn ${u.status === 'active' ? 'btn-danger' : 'btn-success'}`}
                          onClick={() => toggleStatus(u._id, u.status)}
                        >
                          {u.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
              <span> Page {page} of {totalPages} </span>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
          </div>
        )}

        {/* === USER PROFILE SECTION === */}
        <div className="card" style={{ height: 'fit-content' }}>
          <h3>My Profile</h3>
          
          {!isEditing && !isChangingPass ? (
            <>
              <p><strong>Name:</strong> {user.fullName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button className="primary-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button className="primary-btn" style={{marginTop: '10px', background: '#333'}} onClick={() => setIsChangingPass(true)}>Change Password</button>
            </>
          ) : isEditing ? (
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={editData.fullName} onChange={(e) => setEditData({...editData, fullName: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} required />
              </div>
              <button type="submit" className="primary-btn">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} style={{marginTop: '10px', width: '100%'}}>Cancel</button>
            </form>
          ) : (
            <form onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" value={passData.currentPassword} onChange={(e) => setPassData({...passData, currentPassword: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" value={passData.newPassword} onChange={(e) => setPassData({...passData, newPassword: e.target.value})} required />
              </div>
              <button type="submit" className="primary-btn">Update Password</button>
              <button type="button" onClick={() => setIsChangingPass(false)} style={{marginTop: '10px', width: '100%'}}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;