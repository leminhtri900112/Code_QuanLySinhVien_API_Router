import React, { Component } from "react";
import DanhSachSinhVien from "./DanhSachSinhVien/DanhSachSinhVien";
import ModalSinhVien from "./ModalSinhVien/ModalSinhVien";

export default class QuanLySinhVien extends Component {
  render() {
    return (
      <div className="container">
        <h1 className=" display-4 text-center text-success">
          Quản Lý Sinh Viên Redux-Axios
        </h1>
        <ModalSinhVien />
        <DanhSachSinhVien />
      </div>
    );
  }
}
