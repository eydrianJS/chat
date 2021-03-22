import makeStyles from "@material-ui/core/styles/makeStyles";
import { globalColors } from "../../../shared/styles/Auth.styles";

const useStyles = makeStyles((theme) => ({
    sendIcon: {
        background: globalColors.main,
        marginLeft: theme.spacing(2),
        padding: theme.spacing(2),
    }
}))

export default useStyles;