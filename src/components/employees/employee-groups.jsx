import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employee-groups.css';

const EmployeeGroups = () => {
  const [groupName, setGroupName] = useState('');
  const [editGroupId, setEditGroupId] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getgroups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleAddGroup = async () => {
    if (groupName.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5000/api/addgroup', { groupName });
        const newGroup = response.data;
        setGroups([...groups, newGroup]);
        setGroupName('');
      } catch (error) {
        console.error('Error adding group:', error);
      }
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deletegroup/${id}`);
      const updatedGroups = groups.filter(group => group._id !== id);
      setGroups(updatedGroups);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleEditGroup = async (id, newGroupName) => {
    try {
      await axios.put(`http://localhost:5000/api/updategroup/${id}`, { groupName: newGroupName });
      const updatedGroups = groups.map(group => {
        if (group._id === id) {
          return { ...group, groupName: newGroupName };
        }
        return group;
      });
      setGroups(updatedGroups);
      setEditGroupId(null);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  return (
    <section className='groups-main'>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-6">
            <h2>Add Group</h2>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <button className="btn" onClick={handleAddGroup}>Add Group</button>
          </div>
        </div>
        <div className="row">
          <div>
            <table className="table group-table table-striped">
              <thead>
                <tr>
                  <th className='table-header'>Entry#</th>
                  <th className='table-header'>Group</th>
                  <th className='table-header'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(group => (
                  <tr key={group._id}>
                    <td>{group.entryNo}</td>
                    <td>
                      {editGroupId === group._id ?(
                        <div>
                          <input type="text" defaultValue={group.groupName} onChange={(e) => setGroupName(e.target.value)} />
                          <button onClick={() => handleEditGroup(group._id, groupName)}>Save</button>
                          <button onClick={() => setEditGroupId(null)}>Cancel</button>
                        </div>
                      ) : ( group.groupName)}
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDeleteGroup(group._id)}>Delete</button>{' '}
                      <button className="btn btn-warning" onClick={() => setEditGroupId(group._id)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeGroups;
