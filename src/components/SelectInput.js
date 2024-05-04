import React from "react";

import { MenuItem, Select, FormControl } from '@mui/material';

class SelectInput extends React.Component {
    render() {
        return (
            <div>
                <FormControl sx={{ m: 1, width: 120 }}>
                    <Select
                        value={10}
                        displayEmpty
                        size='small'
                        color="secondary"
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={10}>Còn Tiếp</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div >
        );
    }
}

export default SelectInput;
