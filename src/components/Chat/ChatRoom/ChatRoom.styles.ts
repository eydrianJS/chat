import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    chatRoomContainer: {
        padding: theme.spacing(4),
        height: '100%',
        background: '#eaeaea',
    },
    infoBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '42px',
        marginBottom: theme.spacing(4),
    },
    chatRoomMessagesContainer: {
        maxHeight: '70vh',
        flex: 1,
        overflow: 'auto',
    },
    messageContainer: {
        display: 'flex',
        marginTop: 'auto',
        alignItems: 'center',
        height: '64px'
    }
}));


export default useStyles;