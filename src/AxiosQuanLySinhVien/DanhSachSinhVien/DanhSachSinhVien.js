import React, { Component } from "react";
import { connect } from "react-redux";
import ItemSinhVien from "../ItemSinhVien/ItemSinhVien";
import { FETCH_DANH_SACH_SV } from "../Redux/Constants/quanLySinhVienConstants";
import { quanLySinhVienService } from "../Services/AxiosQuanLySinhVien";

class DanhSachSinhVien extends Component {
  render() {
    let { dssv } = this.props;
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sinh viên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {dssv.map((sv, index) => {
              return <ItemSinhVien sv={sv} key={index} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    quanLySinhVienService
      .fetchDanhSachSinhVien()
      .then((res) => {
        console.log(res);
        this.props.dispatch({
          type: FETCH_DANH_SACH_SV,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const mapStateToPorps = (state) => {
  return {
    dssv: state.quanLySinhVienReducer.dssv,
  };
};

export default connect(mapStateToPorps)(DanhSachSinhVien);
