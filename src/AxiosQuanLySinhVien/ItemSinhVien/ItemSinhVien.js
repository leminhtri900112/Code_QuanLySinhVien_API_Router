import React, { Component } from "react";
import { connect } from "react-redux";
import { createAction } from "../Redux/Actions/quanLySinhVienAction";
import {
  FETCH_DANH_SACH_SV,
  SUA_SINH_VIEN,
  XOA_SINH_VIEN,
} from "../Redux/Constants/quanLySinhVienConstants";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import { quanLySinhVienService } from "../Services/AxiosQuanLySinhVien";

class ItemSinhVien extends Component {
  deleteSinhVien = (id) => {
    quanLySinhVienService
      .deleteSinhVien(id)
      .then((res) => {
        // console.log(res)
        //xóa thành công;
        Swal.fire({
          icon: "success",
          title: "Xóa thành công",
        });

        quanLySinhVienService
          .fetchDanhSachSinhVien()
          .then((res) => {
            // console.log(res);
            this.props.dispatch(createAction(FETCH_DANH_SACH_SV, res.data));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Xóa không thành công",
        });
      });
  };

  render() {
    let { sv } = this.props;
    return (
      <tr>
        <td>{sv.id}</td>
        <td>{sv.name}</td>
        <td>{sv.email}</td>
        <td>{sv.phone}</td>
        <td>
          <button
            onClick={() => {
              this.props.dispatch(createAction(SUA_SINH_VIEN, sv));
            }}
            data-toggle="modal"
            data-target="#modelId"
            className="btn btn-warning ml-2"
          >
            Sửa
          </button>
          <button
            onClick={() => {
              this.deleteSinhVien(sv.id);
              // this.props.dispatch(createAction(XOA_SINH_VIEN, sv));
            }}
            className="btn btn-danger ml-2"
          >
            Xóa
          </button>
          <button className="btn btn-success ml-2">
            <NavLink className="text-white " to={`/detail/${sv.id}`}>
              Chi tiết
            </NavLink>
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(null)(ItemSinhVien);
