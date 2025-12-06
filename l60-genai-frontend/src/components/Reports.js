import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopMenu from './TopMenu';
import Chart from './Chart';
import reportsService from '../services/reportsService';
import './Reports.css';

const Reports = () => {
  const [reportsData, setReportsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await reportsService.getReportsData();
        setReportsData(data);
      } catch (err) {
        setError(err.message || 'Failed to load reports data');
        if (err.message?.includes('401') || err.message?.includes('token')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="reports-wrapper">
        <TopMenu />
        <div className="loading-container">
          <p>Loading reports data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reports-wrapper">
        <TopMenu />
        <div className="error-container">
          <p role="alert">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-wrapper">
      <TopMenu />
      <div className="reports-container" role="main">
        <h1>Generative AI Reports</h1>
        
        {reportsData?.marketGrowth && reportsData.marketGrowth.length > 0 && (
          <Chart
            data={reportsData.marketGrowth}
            title="Generative AI Market Growth (Billions USD)"
            description={reportsData.descriptions?.marketGrowth}
            chartType="line"
          />
        )}

        {reportsData?.useCaseDistribution && reportsData.useCaseDistribution.length > 0 && (
          <Chart
            data={reportsData.useCaseDistribution}
            title="Generative AI Use Case Distribution by Percentage"
            description={reportsData.descriptions?.useCaseDistribution}
            chartType="bar"
          />
        )}
      </div>
    </div>
  );
};

export default Reports;

