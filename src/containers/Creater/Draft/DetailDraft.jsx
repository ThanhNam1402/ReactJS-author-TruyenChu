import React, { Component } from "react";

import { Box, Typography } from "@mui/material";

import draftsService from "../../../services/draftsService";
import AutoSaveAndUpdateDraft from "./AutoSaveAndUpdateDraft";

class DetailDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUpdate: {},
      isUpdate: true,
    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    let res = await draftsService.handelGetOneDraft(id);

    if (res && res.success === true) {
      this.setState({
        dataUpdate: res.data,
      });
    }
  }

  render() {
    console.log(this.state);

    return (
      <>
        <Box>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "500", color: "primary.sub" }}
            variant="h4"
          >
            Sửa bản thảo
          </Typography>
          <Typography
            sx={{ color: "primary.sub", marginBottom: "24px" }}
            variant="p"
            component="p"
          >
            Bạn có thể sửa bản thảo và xuất bản nó ngay lập tức ở đây, hoặc đơn
            giản chỉ muốn viết thêm một đoạn và để nó tự lưu lại
          </Typography>
        </Box>

        <AutoSaveAndUpdateDraft
          dataUpdate={this.state.dataUpdate}
          isUpdate={this.state.isUpdate}
        />
      </>
    );
  }
}

export default DetailDraft;
