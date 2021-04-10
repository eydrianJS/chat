import { Color, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

type Props = {
  open: boolean;
  handleClose: () => void;
  duration: number;
  severity?: Color | undefined;
};

const AlertMessage: React.FC<Props> = ({
  open,
  handleClose,
  duration,
  severity,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity || 'error'}>
        Unauthorized!
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
