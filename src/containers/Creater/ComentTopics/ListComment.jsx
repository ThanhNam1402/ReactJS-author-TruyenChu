import React, { Component } from "react";

import serviceCMTopics from "../../../services/commentTopicsService";
import ItemCommentTopic from "./ItemCommentTopic";

import CsLoading from "../../../components/CsLoading";
import { delay } from "../../../utils";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

class ListComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      listReplys: [],
    };
  }
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props?.topicID !== prevProps?.topicID) {
      console.log(this.props);
      // this.props.handleGetAllComments();
    }
  }

  render() {
    let { isLoading } = this.state;
    let { topicID, listComments, handleGetAllComments } = this.props;

    console.log("run");

    return (
      <Box mt={5}>
        {isLoading ? (
          <CsLoading />
        ) : (
          listComments &&
          listComments.length > 0 &&
          listComments.map((itemComment, index) => {
            return (
              <div key={index}>
                <ItemCommentTopic
                  topicID={topicID}
                  itemComment={itemComment}
                  handleGetAllComments={handleGetAllComments}
                />
              </div>
            );
          })
        )}
      </Box>
    );
  }
}

export default ListComments;
