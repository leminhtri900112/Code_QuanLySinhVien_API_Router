import {
  CAP_NHAT_SINH_VIEN,
  FETCH_DANH_SACH_SV,
  SUA_SINH_VIEN,
  THEM_SINH_VIEN,
  XOA_SINH_VIEN,
} from "../Constants/quanLySinhVienConstants";

let initialState = {
  dssv: [],
  editSinhVien: null,
};

export const quanLySinhVienReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DANH_SACH_SV: {
      state.dssv = action.payload;
      return { ...state };
    }

    case THEM_SINH_VIEN: {
      let cloneDanhSachSV = [...state.dssv];
      let index = cloneDanhSachSV.findIndex((sv) => {
        return sv.id === action.payload.id;
      });

      if (index === -1) {
        cloneDanhSachSV.push(action.payload);
        state.dssv = cloneDanhSachSV;
      }
      return { ...state };
    }

    case XOA_SINH_VIEN: {
      let cloneDanhSachSinhVien = [...state.dssv];
      let danhSachSinhVienUpdate = cloneDanhSachSinhVien.filter((sv) => {
        return sv.id !== action.payload.id;
      });

      state.dssv = danhSachSinhVienUpdate;
      return { ...state };
    }

    case SUA_SINH_VIEN: {
      state.editSinhVien = action.payload;
      return { ...state };
    }

    case CAP_NHAT_SINH_VIEN: {
      let cloneDanhSachSinhVien = [...state.dssv];
      let index = cloneDanhSachSinhVien.findIndex((sv) => {
        return sv.id === action.payload.id;
      });

      if (index !== -1) {
        cloneDanhSachSinhVien[index] = action.payload;
      }
      state.dssv = cloneDanhSachSinhVien;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
