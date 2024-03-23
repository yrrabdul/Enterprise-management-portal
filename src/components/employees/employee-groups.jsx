import React, { useState } from 'react';
import './employee-groups.css';

const EmployeeGroups = () => {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);

  const handleAddGroup = () => {
    if (groupName.trim() !== '') {
      const newGroup = {
        id: groups.length + 1,
        name: groupName.trim()
      };
      setGroups([...groups, newGroup]);
      setGroupName('');
    }
  };

  const handleDeleteGroup = (id) => {
    const updatedGroups = groups.filter(group => group.id !== id);
    setGroups(updatedGroups);
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
        <table class="table group-table table-striped">
            <thead>
              <tr>
                <th className='table-header'>Entry#</th>
                <th className='table-header'>Group</th>
                <th className='table-header'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map(group => (
                <tr key={group.id}>
                  <td>{group.id}</td>
                  <td>{group.name}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDeleteGroup(group.id)}>Delete</button>{' '}
                    <button className="btn btn-warning">Edit</button>
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
