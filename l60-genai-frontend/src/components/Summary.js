import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopMenu from './TopMenu';
import Chart from './Chart';
import summaryService from '../services/summaryService';
import './Summary.css';

const Summary = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await summaryService.getSummaryData();
        setChartData(data);
      } catch (err) {
        setError(err.message || 'Failed to load summary data');
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
      <div className="summary-wrapper">
        <TopMenu />
        <div className="loading-container">
          <p>Loading summary data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-wrapper">
        <TopMenu />
        <div className="error-container">
          <p role="alert">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="summary-wrapper">
      <TopMenu />
      <div className="summary-container" role="main">
        <h1>Generative AI Summary</h1>
        
        {chartData?.aiAdoption && chartData.aiAdoption.length > 0 && (
          <Chart
            data={chartData.aiAdoption}
            title="Enterprise AI Adoption Rate Over Time"
            description="This chart displays the growth of enterprise AI adoption over the past 6 months. The data shows a steady increase from 65% in July 2024 to 87% in December 2024, representing a 22 percentage point increase. This growth is driven by increased awareness of AI capabilities, improved accessibility of AI tools, and demonstrated ROI from early adopters. The data is sourced from industry surveys and enterprise technology adoption reports from leading research firms tracking AI implementation across various sectors."
            chartType="bar"
          />
        )}

        {chartData?.industryImplementation && chartData.industryImplementation.length > 0 && (
          <Chart
            data={chartData.industryImplementation}
            title="Generative AI Implementation by Industry Sector"
            description="This chart illustrates the distribution of Generative AI implementation across different industry sectors. Technology and software companies lead with 28% adoption, followed by financial services at 22%, healthcare at 18%, retail at 15%, manufacturing at 10%, and other sectors at 7%. The data reflects the varying levels of AI maturity and readiness across industries, with technology sectors naturally leading adoption while traditional industries are catching up. This information is based on comprehensive industry surveys and market analysis reports from the last 6 months."
            chartType="bar"
          />
        )}
      </div>
    </div>
  );
};

export default Summary;

