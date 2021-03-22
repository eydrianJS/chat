import { makeStyles } from "@material-ui/core";
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
    sideBarContainer: {
        padding: theme.spacing(4),
        background: grey[50]
    }
}))

export default useStyles;