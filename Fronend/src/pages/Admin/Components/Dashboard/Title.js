import { motion } from 'framer-motion';
import { FaHeartbeat } from 'react-icons/fa';

function Title() {
  return (
    <div className="text-center mb-5">
      <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <FaHeartbeat style={{ color: '#1565c0', fontSize: '28px' }} />
        </motion.div>

        <motion.h2
          className="fw-bold m-0"
          style={{ fontSize: '28px', color: '#0d47a1' }}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Choose an Option
        </motion.h2>
      </div>

      <motion.p
        style={{ fontSize: '14px', color: '#78909c' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Welcome to your clinic dashboard — select what you'd like to manage.
      </motion.p>
    </div>
  );
}

export { Title };
