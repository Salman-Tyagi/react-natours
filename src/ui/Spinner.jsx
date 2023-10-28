import { Oval } from 'react-loader-spinner';

import styles from './Spinner.module.css';

function Spinner() {
  return (
    <div className={styles.spinner}>
      <Oval
        height={80}
        width={80}
        color='green'
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='lightgreen'
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
    </div>
  );
}

export default Spinner;
