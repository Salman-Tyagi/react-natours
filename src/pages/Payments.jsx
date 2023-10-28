import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './Payments.module.css';

function Payments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [seconds, setSeconds] = useState(5);
  const [failedSeconds, setFailedSeconds] = useState(10);
  const navigate = useNavigate();

  const status = searchParams.get('status');
  const orderId = searchParams.get('order');
  const code = searchParams.get('code');
  const err = searchParams.get('err');

  useEffect(() => {
    searchParams.size == '0' && navigate('/');

    if (status === 'true') {
      if (seconds >= 0) {
        const id = setInterval(() => {
          setSeconds(sec => sec - 1);
        }, 1000);

        return () => clearInterval(id);
      }

      navigate('/bookings');
    } else {
      if (failedSeconds >= 0) {
        const id2 = setInterval(() => {
          setFailedSeconds(sec => sec - 1);
        }, 1000);

        return () => clearInterval(id2);
      }

      navigate('/');
    }
  }, [seconds, failedSeconds, searchParams]);

  return (
    <div className={styles.payments}>
      <h1>
        {status === 'true'
          ? '🎊 Congratulations! Tour has been successfully purchased'
          : 'There is an error while purchasing tour 😥'}
      </h1>
      {status === 'true' ? (
        <p>Order id: {orderId}</p>
      ) : (
        <p>
          {code}: {err}
        </p>
      )}
      <p className={styles.redirectLine}>
        {status === 'true'
          ? `Redirecting to the purchased tours page in ${seconds} seconds...`
          : `Redirecting to the tours page in ${failedSeconds} seconds`}
      </p>
    </div>
  );
}

export default Payments;
