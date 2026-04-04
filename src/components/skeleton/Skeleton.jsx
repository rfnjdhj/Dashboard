import React from 'react';
import './skeleton.scss';

const Skeleton = ({ type = 'chart', height = 300, width = '100%' }) => {
  return (
    <div className="skeleton" style={{ width, height }}>
      {type === 'chart' && (
        <div className="skeleton-chart">
          <div className="skeleton-chart-header"></div>
          <div className="skeleton-chart-body"></div>
        </div>
      )}
      {type === 'pie' && (
        <div className="skeleton-pie">
          <div className="skeleton-chart-header"></div>
          <div className="skeleton-pie-body"></div>
          <div className="skeleton-pie-legend"></div>
        </div>
      )}
      {type === 'bar' && (
        <div className="skeleton-bar">
          <div className="skeleton-chart-header"></div>
          <div className="skeleton-bar-body">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="skeleton-bar-item"></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Skeleton;