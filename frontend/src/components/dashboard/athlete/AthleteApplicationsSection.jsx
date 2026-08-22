import React from 'react';

export default function AthleteApplicationsSection({ applications }) {
  return (
    <div className="applications-pane matchpoint-fade-in">
      <div className="court-panel-container">
        <div className="panel-header">
          <div>
            <span className="panel-tag font-mono">04 // APPLICATIONS</span>
            <h2 className="panel-title-display">SUBMITTED APPLICATIONS</h2>
          </div>
        </div>

        <div className="matchpoint-table-wrapper">
          <div className="matchpoint-table-header">
            <span>APP ID</span>
            <span>OPPORTUNITY TITLE</span>
            <span>ORGANIZATION</span>
            <span>SUBMITTED DATE</span>
            <span>STATUS</span>
          </div>

          <div className="matchpoint-table-body">
            {applications.map((app) => (
              <div key={app.id} className="matchpoint-table-row">
                <span className="font-mono text-lime">{app.id}</span>
                <span className="font-bold text-white">{app.title}</span>
                <span>{app.org}</span>
                <span>{app.date}</span>
                <span className={`matchpoint-status-pill ${app.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
