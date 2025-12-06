import React from 'react';
import TopMenu from './TopMenu';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <TopMenu />
      <div className="dashboard-container" role="main">
        <div className="dashboard-header">
          <h1>Generative AI Innovations Dashboard</h1>
        </div>
        
        <div className="summary-section">
          <h2>Recent Innovations in Generative AI: Transforming Enterprise Operations</h2>
          <div className="summary-content">
            <p>
              Generative AI has emerged as a transformative force in enterprise technology, with recent innovations 
              revolutionizing how businesses operate, create content, and interact with customers. Over the past six 
              months, significant advancements have been made in AI agent technology, collaborative automation, and 
              industry-specific applications. Companies like Intel and Deloitte have been at the forefront of developing 
              AI solutions that enable seamless integration of generative AI capabilities into existing business workflows.
            </p>
            
            <p>
              One of the most notable innovations is the development of AI agents capable of collaborative automation, 
              where intelligent systems work alongside human employees to enhance productivity and decision-making. These 
              agents can now handle complex multi-step processes, from customer service interactions to data analysis and 
              content generation. The integration of generative AI into various industries including healthcare, finance, 
              manufacturing, and retail has demonstrated substantial improvements in efficiency, with some organizations 
              reporting up to 35% productivity gains and 28% cost reductions.
            </p>
            
            <p>
              The evolution of AI use cases has expanded beyond simple chatbots to include sophisticated applications 
              such as personalized investment planning, predictive analytics for healthcare diagnostics, automated 
              quality control in manufacturing, and intelligent supply chain optimization. As generative AI continues 
              to mature, enterprises are discovering new ways to leverage these technologies for competitive advantage, 
              with market growth projections showing exponential expansion from $15 billion to over $42 billion in just 
              six months.
            </p>
            
            <p>
              <a 
                href="https://www.intel.com/content/www/us/en/learn/ai-use-cases.html" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Source: Intel AI Use Cases (opens in new tab)"
              >
                Source: Intel AI Use Cases
              </a>
            </p>
          </div>
          
          <div className="tech-stack-section">
            <h3>Technical Implementation</h3>
            <p>
              This Generative AI Dashboard is built as a Single Page Application (SPA) using React 18 with React Router 
              for client-side routing and state management. The frontend leverages D3.js for interactive data visualization, 
              providing dynamic charts that update asynchronously via HTTP requests to a Node.js/Express backend. 
              Authentication is handled through JSON Web Tokens (JWT) with protected routes ensuring secure access to 
              dashboard content. Data is stored in a MongoDB database, allowing for flexible schema evolution as new AI 
              metrics become available. The application follows RESTful API principles with the backend running independently 
              on port 3000, while the frontend is served via NGINX on port 80. The architecture emphasizes separation of 
              concerns, with the frontend and backend fully decoupled and communicating exclusively through HTTP calls. 
              Accessibility features are implemented following WCAG 2.1 guidelines, including proper ARIA labels, keyboard 
              navigation support, and semantic HTML structure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

