import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BuyerLoginForm from './BuyerLoginForm';
import SellerLoginForm from './SellerLoginForm';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('buyer');

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <div
        className="card shadow"
        style={{ width: '100%', maxWidth: '450px', borderTop: '4px solid #0d6efd' }}
      >
        <div className="card-body">
          <Tabs
            activeKey={activeTab}
            onSelect={setActiveTab}
            className="mb-4 justify-content-center"
            style={{ borderBottom: '2px solid #0d6efd' }}
          >
            <Tab
              eventKey="buyer"
              title={
                <span style={{ color: activeTab === 'buyer' ? '#0d6efd' : '#333' }}>
                  Buyer Login
                </span>
              }
            >
              <BuyerLoginForm />
            </Tab>

            <Tab
              eventKey="seller"
              title={
                <span style={{ color: activeTab === 'seller' ? '#0d6efd' : '#333' }}>
                  Seller Login
                </span>
              }
            >
              <SellerLoginForm />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
