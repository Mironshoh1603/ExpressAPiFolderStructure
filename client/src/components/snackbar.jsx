import { IconButton, Snackbar as Snack } from '@mui/material';
import { CloseOutlined as CloseIcon } from '@mui/icons-material';

export default function Snackbar({ open, duration, children, onClose, type='inherit'}) {
    return (
        <Snack
            className={`snackbar--${type}`}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={open}
            autoHideDuration={duration}
            message={children}
            ContentProps={{"aria-describedby": "notification-message"}}
            onClose={onClose}
            action={[
                <IconButton
                    onClick={onClose}
                    color={'inherit'}
                    key={'close'}
                    aria-label={'close'}
                >
                    <CloseIcon/>
                </IconButton>
            ]}
        />
    );
}