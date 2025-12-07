import React from 'react';
import TopMenu from './TopMenu';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <TopMenu />
      <div className="dashboard-container" role="main">
        <div className="dashboard-header">
          <h1>Generative AI Statistics Dashboard</h1>
        </div>
        
        <div className="summary-section">
          <h2>Generative AI Statistics to Know in 2025: Market Growth and Enterprise Adoption</h2>
          <div className="summary-content">
            <p>
              Generative AI has transformed from a niche technology into a mainstream business tool, reshaping industries 
              and workflows across the globe. The global generative AI market is currently valued at $44.89 billion, up from 
              $29 billion in 2022, representing a 54.7% increase in just three years. This explosive growth is expected to 
              continue, with projections showing the market exceeding $66.62 billion by the end of 2025 and potentially 
              reaching $1.3 trillion by 2032. The United States alone is expected to contribute over $23 billion to this 
              total, while North America dominates the current market with a 40.8% share of global generative AI revenue.
            </p>
            
            <p>
              Enterprise adoption has reached unprecedented levels, with 92% of Fortune 500 companies now using OpenAI 
              technology, including over 2 million developers working with its API. A staggering 94% of executives believe 
              AI will be critical to business success within five years, while 64% of tech businesses plan to adopt 
              generative AI. The adoption rate has accelerated dramatically, with 45% of companies actively piloting 
              generative AI programs, up from just 15% earlier in 2023. Marketing departments lead the charge, with 73% 
              already using generative AI, primarily for image and text generation, while 86% of IT leaders expect 
              generative AI will soon be essential to their organization.
            </p>
            
            <p>
              The impact on productivity is measurable and significant. Programmers using generative AI are 88% more 
              productive, especially on repetitive tasks, while management consultants using AI tools complete tasks 25% 
              faster with 40% higher quality. Chatbots save an average of 2 hours and 20 minutes per day. However, 
              challenges remain: 58% of organizations cite cybersecurity as the biggest adoption barrier, 73% believe 
              generative AI introduces new security risks, and 62% of executives lack the skills to implement genAI 
              strategies. Despite these concerns, 78% of executive leaders believe the benefits outweigh the risks, 
              signaling continued investment and adoption across industries.
            </p>
            
            <p>
              <a 
                href="https://www.mend.io/blog/generative-ai-statistics-to-know-in-2025/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Source: Mend.io Generative AI Statistics 2025 (opens in new tab)"
              >
                Source: Mend.io - 58 Generative AI Statistics to Know in 2025
              </a>
            </p>
          </div>
          
          <div className="tech-stack-section">
            <h3>Technical Implementation</h3>
            <p>
              This Generative AI Statistics Dashboard is built as a Single Page Application (SPA) using React 18 with React Router 
              for client-side routing and state management. The frontend leverages D3.js for interactive data visualization, 
              providing dynamic charts that update asynchronously via HTTP requests to a Node.js/Express backend. 
              Authentication is handled through JSON Web Tokens (JWT) with protected routes ensuring secure access to 
              dashboard content. Data is stored in a MongoDB database, allowing for flexible schema evolution as new AI 
              metrics become available. The architecture emphasizes separation of 
              concerns, with the frontend and backend fully decoupled and communicating exclusively through HTTP calls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
