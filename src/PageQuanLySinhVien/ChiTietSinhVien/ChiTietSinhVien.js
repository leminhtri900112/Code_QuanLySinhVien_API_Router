import axios from "axios";
import React, { Component } from "react";
import { quanLySinhVienService } from "../../AxiosQuanLySinhVien/Services/AxiosQuanLySinhVien";

export default class ChiTietSinhVien extends Component {
  state = {
    thongTinChiTiet: null,
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    quanLySinhVienService
      .fetchChiTietSinhVien(id)
      .then((res) => {
        // console.log(res);
        this.setState({
          thongTinChiTiet: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container">
        <h3 className="display-3 text-center">Chi tiết sinh viên</h3>
        <div>
          <div>ID: {this.state.thongTinChiTiet?.id}</div>
          <div>Tên: {this.state.thongTinChiTiet?.name}</div>
          <div>Email: {this.state.thongTinChiTiet?.email}</div>
          <div>Số điện thoại: {this.state.thongTinChiTiet?.phone}</div>
        </div>
      </div>
    );
  }
}
