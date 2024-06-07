import React, { Component } from "react";

import { Stack, Button, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import "./comment.scss";
class ActionsComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAction: false,
    };
  }

  showAction = () => {
    this.setState({ isShowAction: !this.state.isShowAction });
  };

  render() {
    let { isShowAction } = this.state;
    return (
      <div>
        <IconButton aria-label="show" onClick={() => this.showAction()}>
          <MoreVertIcon />
        </IconButton>

        {isShowAction && (
          <Box className="model-action">
            <Stack
              direction="column"
              alignItems="center"
              spacing={0.5}
              className="model-action-item"
              sx={{
                bgColor: "secondary.main",
                border: 1,
                borderRadius: 3,
              }}
            >
              <Button size="small" fullWidth color="secondary">
                Chỉnh Sửa
              </Button>
              <Button size="small" fullWidth color="secondary">
                Xóa
              </Button>
            </Stack>
          </Box>
        )}
      </div>
    );
  }
}

export default ActionsComment;
