export function formatCurrency(value) {
  // convert number if it's not a number
  if (typeof value !== "number") {
    value = Number(value);
  }
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }).replace("₫", "");
}
