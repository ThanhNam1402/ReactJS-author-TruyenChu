import React, { Component } from "react";

import serviceCMTopics from "../../../services/commentTopicsService";
import AddComment from "./AddComment";

import { Box, Typography } from "@mui/material";

import ListComments from "./ListComment";

class CommentTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listComments: [],
      isLoading: false,
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props?.topicID !== prevProps?.topicID) {
      this.handleGetAllComments();
    }
  }

  handleGetAllComments = async () => {
    let topicID = this.props.topicID;

    this.setState({ isLoading: true });

    let res = await serviceCMTopics.handleGetAllCommentTopics(topicID);

    try {
      this.setState({ listComments: res.data });

      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    let { listComments, isLoading } = this.state;
    let topicID = this.props.topicID;

    return (
      <>
        <Box sx={{ my: 2 }}>
          <Typography variant="h6" gutterBottom>
            Bình Luận
          </Typography>

          <AddComment
            topicID={topicID}
            handleGetAllComment={this.handleGetAllComments}
          />
        </Box>

        <ListComments
          topicID={topicID}
          listComments={listComments}
          handleGetAllComments={this.handleGetAllComments}
        />
      </>
    );
  }
}

export default CommentTopic;
