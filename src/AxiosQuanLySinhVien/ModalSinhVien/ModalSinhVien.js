import React, { Component } from "react";
import { connect } from "react-redux";
import { createAction } from "../Redux/Actions/quanLySinhVienAction";
import {
  CAP_NHAT_SINH_VIEN,
  FETCH_DANH_SACH_SV,
  SUA_SINH_VIEN,
  THEM_SINH_VIEN,
} from "../Redux/Constants/quanLySinhVienConstants";

import Swal from "sweetalert2";
import { quanLySinhVienService } from "../Services/AxiosQuanLySinhVien";

class ModalSinhVien extends Component {
  state = {
    sinhVien: {
      id: "",
      name: "",
      email: "",
      phone: "",
    },

    error: {
      id: "",
      name: "",
      email: "",
      phone: "",
    },
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.editSinhVien) {
      // console.log(nextProps);
      this.setState({
        sinhVien: nextProps.editSinhVien,
      });
    } else {
      this.setState({
        sinhVien: {
          id: "",
          name: "",
          email: "",
          phone: "",
        },
      });
    }
  }

  handleChange(e) {
    let { name, value } = e.target;
    // console.log(name, value);
    let newSinhVien = { ...this.state.sinhVien, [name]: value };
    let newError = { ...this.state.error };

    if (value.trim() === "") {
      newError[name] = `Vui lòng nhập trường này`;
    } else {
      if (name === "id") {
        const regexID = /^[0-9]+$/;
        if (!regexID.test(value.trim())) {
          newError[name] = `Vui lòng nhập trường này là số`;
        } else {
          newError[name] = "";
        }
      }

      if (name === "name") {
        const regexID = /^[a-zA-Z ]*$/;
        if (!regexID.test(value.trim())) {
          newError[name] = `Vui lòng nhập trường này là chữ không dấu`;
        } else {
          newError[name] = "";
        }
      }

      if (name === "email") {
        const regexEmail =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!regexEmail.test(value.trim())) {
          newError[name] = `Vui lòng nhập trường này là email`;
        } else {
          newError[name] = "";
        }
      }

      if (name === "phone") {
        const regexPhone = /^((\+)33|0)[1-9](\d{2}){4}$/;
        if (!regexPhone.test(value.trim())) {
          newError[name] = `Vui lòng nhập trường này là số điện thoại`;
        } else {
          newError[name] = "";
        }
      }
    }

    this.setState({
      sinhVien: newSinhVien,
      error: newError,
    });
  }

  handleSubmit(type) {
    let { error } = this.state;
    let valid = true;
    for (let key in error) {
      if (error[key] !== "") {
        // alert("Thêm không thành công");
        valid = false;
      }
    }

    if (valid) {
      switch (type) {
        case THEM_SINH_VIEN:
          {
            quanLySinhVienService
              .addSinhVien(this.state.sinhVien)
              .then((res) => {
                // console.log(res);
                // alert("Thêm thành công");
                Swal.fire({
                  icon: "success",
                  title: "Thêm thành công",
                });
                quanLySinhVienService
                  .fetchDanhSachSinhVien()
                  .then((res) => {
                    console.log("ok");
                    this.props.dispatch(
                      createAction(FETCH_DANH_SACH_SV, res.data)
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
                Swal.fire({
                  icon: "error",
                  title: "Thêm không thành công",
                });
              });
          }
          break;
        case CAP_NHAT_SINH_VIEN: {
          quanLySinhVienService
            .updateSinhVien(this.state.sinhVien.id, this.state.sinhVien)
            .then((res) => {
              // console.log(res);
              // alert("Thêm thành công");
              Swal.fire({
                icon: "success",
                title: "Cập nhật thành công",
              });
              quanLySinhVienService
                .fetchDanhSachSinhVien()
                .then((res) => {
                  this.props.dispatch(
                    createAction(FETCH_DANH_SACH_SV, res.data)
                  );
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: "error",
                title: "Cập nhật không thành công",
              });
            });
        }
        default:
          break;
      }
    } else {
      Swal.fire({
        icon: "error",
        title:
          type === THEM_SINH_VIEN
            ? "Thêm không thành công"
            : "Cập nhật không thành công",
      });
    }
  }
  render() {
    // console.log(this.state.sinhVien);
    return (
      <div>
        <div>
          {/* Button trigger modal */}
          <button
            onClick={() => {
              this.props.dispatch(createAction(SUA_SINH_VIEN, null));
            }}
            type="button"
            className="btn btn-primary mb-4"
            data-toggle="modal"
            data-target="#modelId"
          >
            Thêm sinh viên
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="modelId"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {this.props.editSinhVien
                      ? "Cập nhật sinh viên"
                      : "Thêm sinh viên"}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="id">ID</label>
                      {this.props.editSinhVien ? (
                        <input
                          disabled
                          value={this.state.sinhVien.id}
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                          type="text"
                          name="id"
                          id="id"
                          className="form-control"
                          aria-describedby="helpId"
                        />
                      ) : (
                        <input
                          value={this.state.sinhVien.id}
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                          type="text"
                          name="id"
                          id="id"
                          className="form-control"
                          aria-describedby="helpId"
                        />
                      )}

                      <small id="helpId" className="text-danger">
                        {this.state.error.id}
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Họ và tên</label>
                      <input
                        value={this.state.sinhVien.name}
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        aria-describedby="helpId"
                      />
                      <small id="helpId" className="text-danger">
                        {this.state.error.name}
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        value={this.state.sinhVien.email}
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        aria-describedby="helpId"
                      />
                      <small id="helpId" className="text-danger">
                        {this.state.error.email}
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Số điện thoại</label>
                      <input
                        value={this.state.sinhVien.phone}
                        onChange={(e) => {
                          this.handleChange(e);
                        }}
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                        aria-describedby="helpId"
                      />
                      <small id="helpId" className="text-danger">
                        {this.state.error.phone}
                      </small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    {this.props.editSinhVien ? (
                      <button
                        onClick={() => {
                          this.handleSubmit(CAP_NHAT_SINH_VIEN);
                        }}
                        type="button"
                        className="btn btn-primary"
                        // data-dismiss="modal"
                      >
                        Cập nhật
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          this.handleSubmit(THEM_SINH_VIEN);
                        }}
                        type="button"
                        className="btn btn-primary"
                      >
                        Thêm
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editSinhVien: state.quanLySinhVienReducer.editSinhVien,
  };
};

export default connect(mapStateToProps)(ModalSinhVien);
