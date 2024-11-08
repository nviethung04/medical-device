export const CATEGORY_LIST = [
  {
    value: "surgical_instruments",
    name: "Dụng cụ phẫu thuật"
  },
  {
    value: "diagnostic_tools",
    name: "Thiết bị chẩn đoán"
  },
  {
    value: "medical_supplies",
    name: "Vật tư tiêu hao"
  },
  {
    value: "personal_protective_equipment",
    name: "Thiết bị bảo hộ cá nhân"
  },
  {
    value: "patient_monitoring",
    name: "Thiết bị theo dõi bệnh nhân"
  },
  {
    value: "mobility_aids",
    name: "Dụng cụ hỗ trợ di chuyển"
  },
  {
    value: "respiratory_equipment",
    name: "Thiết bị hô hấp"
  },
  {
    value: "surgical_consulting_room",
    name: "Phòng tư vấn phẫu thuật"
  },
  {
    value: "dental_supplies",
    name: "Dụng cụ nha khoa"
  },
  {
    value: "rehabilitation",
    name: "Thiết bị phục hồi chức năng"
  },
  {
    value: "imaging_equipment",
    name: "Thiết bị hình ảnh"
  },
  {
    value: "emergency_supplies",
    name: "Vật tư cấp cứu"
  },
  {
    value: "laboratory_equipment",
    name: "Thiết bị phòng thí nghiệm"
  }
];

export const PRODUCT_STATUS = {
  1: "Đang sử dụng",
  2: "Bảo hành",
  3: "Bảo trì"
};

export const TRANSACTION_STATUS = {
  0: "Hủy",
  1: "Đang chờ",
  2: "Đang chuẩn bị hàng",
  3: "Đang vận chuyển",
  4: "Đã giao hàng",
  5: "Đã nhận hàng"
};

export const TRANSACTION_TYPE = {
  import: "Đặt hàng",
  export: "Xuất hàng"
};
