import React, { Component } from "react";
import { connect } from "react-redux";

import { Typography, Box, TextField } from "@mui/material";

import serviceCMTopics from "../../../services/commentTopicsService";
import { IconButton, Stack, Divider } from "@mui/material";
import { Send } from "@mui/icons-material";
import { toast } from "react-toastify";

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  handleAddComment = async () => {
    let { topicID } = this.props;
    let creatorID = this.props.userAccount?.id;

    let comment = {
      ...this.state,
      creatorID,
      topicID,
    };

    if (this.state.content !== "") {
      let res = await serviceCMTopics.handleAddComment(comment);

      if (res && res.success) {
        toast.success(res.message);

        this.setState({ content: "" });
        this.props.handleGetAllComment();
      }
    } else {
      toast.error("Vui lòng nhập thêm thông tin");
    }
  };

  handelInputVale = (e) => {
    this.setState({ content: e.target.value });
  };

  render() {
    let content = this.state.content;
    console.log(content);

    return (
      <>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <TextField
            className="bookDescription"
            fullWidth
            hiddenLabel
            color="secondary"
            sx={{ backgroundColor: "primary.main" }}
            multiline
            id="input-content"
            size="small"
            value={content}
            onChange={(e) => this.handelInputVale(e)}
          />

          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => this.handleAddComment()}
          >
            <Send fontSize="small" />
          </IconButton>
        </Stack>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.user.userInfo.account,
  };
};

export default connect(mapStateToProps)(AddComment);
