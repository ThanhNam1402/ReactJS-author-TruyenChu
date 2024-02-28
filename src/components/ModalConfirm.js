


import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


class ModalConfirm extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            openModal: true
        }
    }
    handleClickOpen = () => {
        this.setState({
            openModal: !this.state.openModal

        })
    }

    render() {

        let { openModal } = this.state
        let contentModalConfrim = this.props.contentModalConfirm

        console.log(this.props);


        return (
                <Dialog
                    open={openModal}
                    onClose={() => this.handleClickOpen()}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Subscribe
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {contentModalConfrim}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => this.handleClickOpen()}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleClickOpen()}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
        )
    }
}



export default ModalConfirm