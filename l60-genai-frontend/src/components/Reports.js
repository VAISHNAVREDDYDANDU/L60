import React, { useState, useEffect, useRef } from 'react';
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
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent duplicate API calls
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const data = await reportsService.getReportsData();
        console.log('Reports data received in genai:', data);
        setReportsData(data);
      } catch (err) {
        console.error('Error fetching reports data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load reports data');
        if (err.response?.status === 401 || err.message?.includes('401') || err.message?.includes('token')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        
        {!reportsData && !loading && !error && (
          <div className="error-container">
            <p>No data available. Please seed the database.</p>
          </div>
        )}

        {reportsData?.marketGrowth && reportsData.marketGrowth.length > 0 ? (
          <Chart
            data={reportsData.marketGrowth}
            title="Generative AI Market Growth (Billions USD)"
            description={reportsData.descriptions?.marketGrowth}
            chartType="line"
          />
        ) : reportsData && (
          <div className="error-container">
            <p>Market Growth data not available. Please seed the database with key: 'market-growth'</p>
          </div>
        )}

        {reportsData?.marketShare && reportsData.marketShare.length > 0 ? (
          <Chart
            data={reportsData.marketShare}
            title="Consumer Generative AI Tool Market Share (%)"
            description={reportsData.descriptions?.marketShare}
            chartType="bar"
          />
        ) : reportsData && (
          <div className="error-container">
            <p>Market Share data not available. Please seed the database with key: 'market-share'</p>
          </div>
        )}

        {reportsData?.productivityGains && reportsData.productivityGains.length > 0 ? (
          <Chart
            data={reportsData.productivityGains}
            title="Productivity Gains from Generative AI (%)"
            description={reportsData.descriptions?.productivityGains}
            chartType="bar"
          />
        ) : reportsData && (
          <div className="error-container">
            <p>Productivity Gains data not available. Please seed the database with key: 'productivity-gains'</p>
          </div>
        )}

        {reportsData?.adoptionBarriers && reportsData.adoptionBarriers.length > 0 ? (
          <Chart
            data={reportsData.adoptionBarriers}
            title="Generative AI Adoption Barriers (%)"
            description={reportsData.descriptions?.adoptionBarriers}
            chartType="bar"
          />
        ) : reportsData && (
          <div className="error-container">
            <p>Adoption Barriers data not available. Please seed the database with key: 'adoption-barriers'</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
