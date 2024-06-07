import React, { Component } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import serviceCMTopics from "../../../services/commentTopicsService";

import {
  Typography,
  Box,
  TextField,
  Avatar,
  Stack,
  Grid,
  Button,
  IconButton,
} from "@mui/material";

import { DeleteOutline } from "@mui/icons-material";
import ReplyIcon from "@mui/icons-material/Reply";
import ActionsComment from "./ActionsComment";

class ItemCommentTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        commentID: null,
        content: "",
      },
      isShowReply: false,
    };
  }

  togleReplyComment = (commentID, userReply) => {
    let coppyState = { ...this.state };
    coppyState.comment["content"] = `@${userReply} `;
    coppyState.comment["commentID"] = commentID;
    coppyState.isShowReply = !this.state.isShowReply;
    this.setState({ ...coppyState });
  };

  closeReply = () => {
    this.setState({ isShowReply: false });
  };

  handleAddComment = async () => {
    let { topicID } = this.props;
    let creatorID = this.props.userAccount?.id;

    let comment = {
      ...this.state.comment,
      creatorID,
      topicID,
    };

    if (this.state.content !== "") {
      let res = await serviceCMTopics.handleAddComment(comment);

      if (res && res.success) {
        toast.success(res.message);
        this.props.handleGetAllComments();

        this.closeReply();
      }
    } else {
      toast.error("Vui lòng nhập thêm thông tin");
    }
  };

  handelInputVale = (e) => {
    let coppyState = { ...this.state };
    coppyState.comment["content"] = e.target.value;
    this.setState({ ...coppyState });
  };

  handleDelComment = async (id) => {
    let res = await serviceCMTopics.handleDelComment(id);
    try {
      toast.success(res.message);
      this.props.handleGetAllComments();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { isShowReply } = this.state;
    let { itemComment } = this.props;
    let creatorID = this.props.userAccount?.id;
    let content = this.state.comment.content;

    console.log(this.props);

    return (
      <>
        <Box sx={{ my: 2 }}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Typography variant="subtitle2" gutterBottom>
              {itemComment.user_name}
            </Typography>
            <Typography variant="caption" gutterBottom>
              {moment(itemComment.createdAt).format("HH:mm DD-MM-YYYY ")}
            </Typography>
          </Stack>

          <Stack mt={2} />

          <Typography variant="body2">{itemComment.content}</Typography>

          <Stack mt={1} />

          <Stack direction="column" alignItems="left" spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <div>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() =>
                    this.togleReplyComment(
                      itemComment.id,
                      itemComment.user_name
                    )
                  }
                >
                  <ReplyIcon fontSize="small" />
                </IconButton>
                {itemComment.userID === creatorID && (
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => this.handleDelComment(itemComment.id)}
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                )}
              </div>

              <ActionsComment />
            </Stack>
          </Stack>

          {isShowReply && (
            <>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <TextField
                  fullWidth
                  hiddenLabel
                  variant="standard"
                  color="secondary"
                  sx={{ backgroundColor: "primary.main" }}
                  multiline
                  id="input-content"
                  size="small"
                  value={content}
                  onChange={(e) => this.handelInputVale(e)}
                />

                <Button onClick={() => this.closeReply()} color="secondary">
                  Hủy
                </Button>
                <Button
                  color="secondary"
                  onClick={() => this.handleAddComment()}
                >
                  Gửi
                </Button>
              </Grid>
            </>
          )}
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.user.userInfo.account,
  };
};

export default connect(mapStateToProps)(ItemCommentTopic);
