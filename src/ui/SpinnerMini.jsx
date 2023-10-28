import { Oval } from 'react-loader-spinner';

function SpinnerMini() {
  return (
    <Oval
      height={15}
      width={15}
      color='green'
      wrapperStyle={{ textAlign: 'center' }}
      wrapperClass=''
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor='lightgreen'
      strokeWidth={6}
      strokeWidthSecondary={6}
    />
  );
}

export default SpinnerMini;
