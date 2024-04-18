import React, { Component } from "react";
import { Box, Typography } from "@mui/material";

import AutoSaveAndUpdateDraft from "./AutoSaveAndUpdateDraft";

class AddDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: true,
      idBook: "",
    };
  }

  componentDidMount() {
    try {
      let idBook = this.props.location.state.idBook;
      this.setState({ idBook: idBook });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props);
    return (
      <>
        <Box>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "500", color: "primary.sub" }}
            variant="h4"
          >
            Thêm Bản Thảo mới
          </Typography>
          <Typography
            sx={{ color: "primary.sub", marginBottom: "12px" }}
            variant="p"
            component="p"
          >
            Bạn có thể thêm bản thảo và xuất bản nó ngay lập tức ở đây, hoặc đơn
            giản chỉ muốn viết một đoạn và để nó tự lưu lại
          </Typography>
        </Box>

        <AutoSaveAndUpdateDraft
          isAdd={this.state.isAdd}
          idBook={this.state.idBook}
        />
      </>
    );
  }
}

export default AddDraft;
