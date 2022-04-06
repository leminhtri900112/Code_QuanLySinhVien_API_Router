import axios from "axios";

const BASE_URL = "https://620e4f75585fbc3359ddb276.mockapi.io";
export const quanLySinhVienService = {
  fetchDanhSachSinhVien: () => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/sinhvien`,
    });
  },
  fetchChiTietSinhVien: (id) => {
    return axios({
      method: "GET",
      url: `${BASE_URL}/sinhvien/${id}`,
    });
  },

  addSinhVien: (sv) => {
    return axios({
      method: "POST",
      url: `${BASE_URL}/sinhvien`,
      data: sv,
    });
  },

  updateSinhVien: (id, sv) => {
    return axios({
      method: "PUT",
      url: `${BASE_URL}/sinhvien/${id}`,
      data: sv,
    });
  },
  deleteSinhVien: (id) => {
    return axios({
      method: "DELETE",
      url: `${BASE_URL}/sinhvien/${id}`,
    });
  },
};
