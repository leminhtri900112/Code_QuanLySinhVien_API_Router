import React, { Component } from "react";
import { connect } from "react-redux";
import { createAction } from "../Redux/Actions/quanLySinhVienAction";
import {
  SUA_SINH_VIEN,
  XOA_SINH_VIEN,
} from "../Redux/Constants/quanLySinhVienConstants";
import Swal from "sweetalert2";

class ItemSinhVien extends Component {
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
            className="btn btn-warning mr-2"
          >
            Sửa
          </button>
          <button
            onClick={() => {
              this.props.dispatch(createAction(XOA_SINH_VIEN, sv));
              Swal.fire({
                icon: "success",
                title: "Xóa thành công",
              });
            }}
            className="btn btn-danger"
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(null)(ItemSinhVien);
