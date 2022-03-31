import axios from "axios";

const BASE_URL = "https://620e4f75585fbc3359ddb276.mockapi.io/sinhvien";
export const quanLySinhVienService = {
  fetchDanhSachSinhVien: () => {
    return axios({
      method: "GET",
      url: BASE_URL,
    });
  },
};
