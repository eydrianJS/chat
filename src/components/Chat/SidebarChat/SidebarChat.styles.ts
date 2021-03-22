import { makeStyles } from "@material-ui/core";
import { globalColors } from "../../../shared/styles/Auth.styles";

const useStyles = makeStyles((theme) => ({
    userDetailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(4),
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        fontSize: '42px',
        color: globalColors.main,
        marginRight: theme.spacing(2)
    },
    logoText: {
        fontSize: '20px',
        fontWeight: 700
    }
}))

export default useStyles;