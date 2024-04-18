
import React from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

class SelectCateBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueInput: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.valueInputDefault !== prevProps.valueInputDefault) {
            this.setState({ valueInput: this.props.valueInputDefault });
        }
    }

    handleChange = (e) => {
        this.setState({ valueInput: e.target.value });
        this.props.handelInputVale(e, this.props.keyInput)
    }

    render() {
        let { labelName, cateValue } = this.props;
        let { valueInput } = this.state;

        return (
            <>
                <Box sx={{ mb: '16px' }} >
                    <InputLabel id={labelName}>{labelName}</InputLabel>

                    <FormControl sx={{ my: 1, minWidth: '100%', backgroundColor: 'primary.main', borderRadius: '4px' }} size="small">
                        <Select
                            color="secondary"
                            labelId={labelName}
                            value={valueInput}
                            displayEmpty
                            onChange={(e) => this.handleChange(e)}
                        >
                            {cateValue && cateValue.length > 0 &&
                                cateValue.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </>
        )
    }

}

export default SelectCateBook;