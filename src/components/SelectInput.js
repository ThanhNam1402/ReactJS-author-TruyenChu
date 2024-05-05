import React from "react";

import { MenuItem, Select, FormControl } from '@mui/material';

class SelectInput extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            valueInput: 20
        }

    }

    handleOnChangeInput = (e) => {
        let { handleOnChange } = this.props;

        console.log('selec ', e.target.value);

        this.setState({ valueInput: e.target.value });
        handleOnChange(e.target.value)

    }



    render() {

        let { valueInput } = this.state
        return (
            <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        value={valueInput}
                        displayEmpty
                        size='small'
                        onChange={(e) => this.handleOnChangeInput(e)}
                        color="secondary"
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={10}>Còn tiếp</MenuItem>
                        <MenuItem value={20}>Hoàn thành</MenuItem>
                        <MenuItem value={30}>Tạm dừng</MenuItem>
                    </Select>
                </FormControl>
            </div >
        );
    }
}

export default SelectInput;
