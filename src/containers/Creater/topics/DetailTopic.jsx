import React, { Component } from "react";
import moment from "moment";

import { Card, CardContent, Typography, Box } from "@mui/material";

import topicsService from "../../../services/topicsService";
import CommentTopic from "../ComentTopics/CommentTopics";

class DetailTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleGetOneTopic();
  }

  handleGetOneTopic = async () => {
    try {
      let slug = this.props.match.params.slug;

      let res = await topicsService.handlegetTopicBySlug(slug);

      if (res && res.success) {
        this.setState({
          topic: res.data,
        });
        console.log(this.state.topic);
      } else {
        console.log("Not foound Book ??? ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { topic } = this.state;

    return (
      <>
        <Card>
          <CardContent>
            <Box
              sx={{
                mb: "16px",
              }}
            >
              <Typography variant="h6" component="h6">
                {topic.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "primary.contrastText" }}
                component="span"
              >
                {moment(topic.createdAt).format("DD-MM-YYYY")}
              </Typography>
            </Box>

            <pre> {topic.content} </pre>

            <CommentTopic topicID={topic.id} />
          </CardContent>
        </Card>
      </>
    );
  }
}

export default DetailTopic;
