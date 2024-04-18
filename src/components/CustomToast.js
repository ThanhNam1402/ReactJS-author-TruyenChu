import React, { Component, Fragment } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import './CustomToast.scss';

class CustomToast extends Component {

    render() {
        const { titleId, message, messageId, time } = this.props;
        return (
            <Fragment>
                <div className="custom-toast">
                    {
                        (message && typeof message === 'object') ?

                            message.map((msg, index) => {
                                return (
                                    <Fragment key={index}>
                                        <div className="toast-content">{msg}</div>
                                    </Fragment>
                                )
                            })
                            :
                            <div className="toast-content">
                                {message ? message : (messageId ? messageId : null)}
                                {/* {message ? message : (messageId ? (<FormattedMessage id={messageId} />) : null)} */}
                            </div>
                    }
                </div>
            </Fragment>
        );
    }
}

export class CustomToastCloseButton extends Component {

    render() {
        return (
            <button type="button" className="toast-close" onClick={this.props.closeToast}>
                <ClearIcon />
            </button>
        );
    }
}

export default CustomToast;