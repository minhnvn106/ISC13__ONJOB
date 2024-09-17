import React from 'react';

import { toast } from 'react-toastify';
import ErrorIcon from '@material-ui/icons/Error';
import DoneIcon from '@material-ui/icons/Done';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import WarningIcon from '@material-ui/icons/Warning';

const Alert = (type, message) => {
    switch (type) {
        case 'warning':
            return toast.warning(<div><WarningIcon/> {message}</div>)
        case 'error':
            return toast.error(<div><ErrorIcon/> {message}</div>)
        case 'success':
            return toast.success(<div><DoneIcon/> {message}</div>)
        case 'info':
            return toast.info(<div><NotificationsNoneIcon/> {message}</div>)
        case 'dark':
            return toast.dark(message)
        default:
            return toast(message)
    }
}
export default Alert;