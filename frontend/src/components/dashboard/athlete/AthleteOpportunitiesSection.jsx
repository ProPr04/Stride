import React, { useState } from 'react';
import { MapPin, Clock, Search } from 'lucide-react';

export default function AthleteOpportunitiesSection({ opportunities }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Trial', 'Sponsorship', 'Grant'];

  const filteredOpps = activeFilter === 'All'
    ? opportunities
    : opportunities.filter(o => o.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="opportunities-pane matchpoint-fade-in">
      <div className="court-panel-container">
        <div className="panel-header flex-between">
          <div>
            <span className="panel-tag font-mono">03 // EXPLORE</span>
            <h2 className="panel-title-display">FIND SPORTING OPPORTUNITIES</h2>
          </div>

          <div className="matchpoint-filter-group">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`matchpoint-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="opportunities-card-grid">
          {filteredOpps.map((opp, idx) => (
            <div key={opp.id} className="court-opportunity-card">
              <div className="card-top-row">
                <span className="opp-type-tag">{opp.type}</span>
                <span className="opp-index-tag font-mono">0{idx + 1}</span>
              </div>
              <h3 className="opp-card-heading">{opp.title}</h3>
              <p className="opp-card-org">{opp.organization}</p>

              <div className="opp-card-meta">
                <span><MapPin size={14} className="text-lime" /> {opp.location}</span>
                <span><Clock size={14} className="text-lime" /> {opp.deadline}</span>
              </div>

              <div className="opp-card-footer">
                <span className="opp-card-grant-val">{opp.grant}</span>
                <button
                  className="matchpoint-pill-btn action-sm"
                  onClick={() => alert(`Submitted application for ${opp.title}`)}
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
