import React, { useState, useEffect, useRef } from 'react';
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
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent duplicate API calls
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const data = await summaryService.getSummaryData();
        console.log('Summary data received in genai:', data);
        setChartData(data);
      } catch (err) {
        console.error('Error fetching summary data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load summary data');
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
        
        {!chartData && !loading && !error && (
          <div className="error-container">
            <p>No data available. Please seed the database.</p>
          </div>
        )}

        {chartData?.aiAdoption && chartData.aiAdoption.length > 0 ? (
          <Chart
            data={chartData.aiAdoption}
            title="Enterprise Generative AI Adoption Rates (%)"
            description="This chart displays the adoption rates of Generative AI across different enterprise segments. Fortune 500 companies lead with 92% adoption, followed by executives who believe AI is critical (94%), IT leaders expecting it to be essential (86%), marketing departments (73%), tech businesses planning to adopt (64%), and companies currently piloting programs (45%). These statistics demonstrate the rapid mainstream adoption of generative AI in business operations, with enterprise leaders recognizing its strategic importance. The data is sourced from comprehensive industry surveys including Financial Times, Deloitte, Gartner, Salesforce, and Botco research reports from 2024-2025."
            chartType="bar"
          />
        ) : chartData && (
          <div className="error-container">
            <p>AI Adoption data not available. Please seed the database with key: 'ai-adoption'</p>
          </div>
        )}

        {chartData?.demographicAdoption && chartData.demographicAdoption.length > 0 ? (
          <Chart
            data={chartData.demographicAdoption}
            title="Generative AI Adoption by Country (%)"
            description="This chart illustrates the national usage rates of Generative AI tools across different countries. India leads with 73% adoption, followed by Australia at 49%, the United States at 45%, and the United Kingdom at 29%. These variations reflect differences in technology infrastructure, digital literacy, regulatory environments, and cultural attitudes toward AI adoption. The data highlights the global nature of generative AI adoption while showing significant regional disparities. This information is based on Salesforce research and global usage surveys conducted in 2024-2025."
            chartType="bar"
          />
        ) : chartData && (
          <div className="error-container">
            <p>Demographic Adoption data not available. Please seed the database with key: 'demographic-adoption'</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
