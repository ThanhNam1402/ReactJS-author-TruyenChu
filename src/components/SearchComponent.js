import React from "react";

import { Box, InputBase, IconButton } from '@mui/material';
import { Search } from "@mui/icons-material";

class SearchComponent extends React.Component {
    render() {
        return (
            <Box
                component="form"
                sx={{ display: 'flex', alignItems: 'center', width: 220, border: 1, borderRadius: '4px' }}
            >
                <InputBase
                    className='bookDescription'
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm Kiếm"
                    inputProps={{ 'aria-label': 'Tìm Kiếm' }}
                />
                <IconButton type="button" aria-label="search" sx={{ p: '6px' }}>
                    <Search />
                </IconButton>
            </Box >
        );
    }
}


export default SearchComponent;
