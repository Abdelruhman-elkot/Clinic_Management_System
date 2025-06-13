import React from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

function DashboardCard({ icon, title, count }) {
  return (
    <div className="text-center mb-4">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          style={{
            width: '260px', // 👈 ثابت لكل الكروت
            height: '240px', // 👈 ارتفاع ثابت
            margin: '0 auto',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #f4faff, #e3f2fd)',
            boxShadow: '0 12px 24px rgba(0, 123, 255, 0.12)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-3 p-0">
            <div
              style={{
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                backgroundColor: '#dceeff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div style={{ fontSize: '30px', color: '#0d47a1' }}>{icon}</div>
            </div>

            {/* النصوص في المنتصف */}
            <div>
              <h5 style={{ color: '#0d47a1', marginBottom: '6px' }}>{title}</h5>
              <div style={{ fontSize: '13px', color: '#7b8b9a' }}>Total</div>
              <h2 style={{ fontWeight: 'bold', color: '#0d47a1', fontSize: '28px' }}>{count}</h2>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
}

export { DashboardCard };
