import React from "react";

import { LinearProgress, Typography } from "@mui/material";

function CsLoading(props) {
    let { title } = props;

    return (
        <>
            <LinearProgress
                size={40}
                thickness={4}
                variant="indeterminate"
                color="secondary"
            />

            {title && title === true ? (
                <Typography sx={{ textAlign: "center", py: 2 }}>Đang Tải...</Typography>
            ) : (
                ""
            )}
        </>
    );
}

export default CsLoading;
