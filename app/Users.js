import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row">
        <div className="column">
          <div className="indicator">
            <h3>Number of Clients</h3>
            <p>100</p>
          </div>
        </div>
        <div className="column">
          <div className="indicator">
            <h3>Email Results Sent</h3>
            <p>50</p>
          </div>
        </div>
      </div>
      <h3>Top 5 Studies</h3>
      <ul>
        <li>Study 1</li>
        <li>Study 2</li>
        <li>Study 3</li>
        <li>Study 4</li>
        <li>Study 5</li>
      </ul>
      <h3>Clinic Results Details</h3>
      {/* Add the table with columns ID, Date, Name, Status, and Actions here */}
    </div>
  );
};

export default Dashboard;
