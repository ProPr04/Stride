import React from 'react';
import { Star } from 'lucide-react';

export default function AthleteReviewsSection() {
  return (
    <div className="reviews-pane matchpoint-fade-in">
      <div className="court-panel-container">
        <div className="panel-header">
          <div>
            <span className="panel-tag font-mono">07 // REPUTATION</span>
            <h2 className="panel-title-display">ENDORSEMENTS & REVIEWS</h2>
          </div>
        </div>

        <div className="matchpoint-reviews-list">
          <div className="court-review-card">
            <div className="review-top flex-between">
              <span className="reviewer-name font-bold text-white">Coach Marcus Vance (Metro Track Alliance)</span>
              <div className="star-rating text-lime"><Star size={16} fill="#F2FF65" /> ★★★★★</div>
            </div>
            <p className="review-quote font-italic">
              "Alex has world-class sprint mechanics, incredible competitive focus, and impeccable professionalism. Highly recommended for top tier brand sponsorships and international trials."
            </p>
            <span className="review-date font-mono text-lime">AUG 02, 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
