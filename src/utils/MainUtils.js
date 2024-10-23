export const getCurrentDate = () => {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  var year = today.getFullYear();

  // Đảm bảo rằng ngày và tháng đều có hai chữ số bằng cách thêm '0' nếu cần
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return day + "-" + month + "-" + year;
  // return "26-08-2024";
};

export function sortDates(dateArray) {
  return dateArray.sort((a, b) => {
    // Tách chuỗi ngày thành mảng [dd, mm, yyyy]
    let [dayA, monthA, yearA] = a.split("-").map(Number);
    let [dayB, monthB, yearB] = b.split("-").map(Number);

    // Tạo đối tượng Date để so sánh
    let dateA = new Date(yearA, monthA - 1, dayA);
    let dateB = new Date(yearB, monthB - 1, dayB);

    // So sánh hai ngày
    return dateA - dateB;
  });
}

export function getCurrentFormattedDate() {
  // Get the current date
  // const currentDate = new Date("2024-08-26");
  const currentDate = new Date();

  // Format the date to 'MMM DD, YYYY'
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return formattedDate;
}

// send request to server

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const compareDates = (date1, date2) => {
  let [day1, month1, year1] = date1.split("/").map(Number);
  let [day2, month2, year2] = date2.split("/").map(Number);

  let d1 = new Date(year1, month1 - 1, day1);
  let d2 = new Date(year2, month2 - 1, day2);

  return d1 - d2;
};

export const getIndexTime = () => {
  const startTime = "31/05/2024";
  const currentTime = getCurrentDate();

  // Parse the date strings into Date objects
  const startDate = new Date(startTime.split("/").reverse().join("-"));
  const currentDate = new Date(currentTime.split("/").reverse().join("-"));

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentDate - startDate;

  // Convert the difference to days
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);

  return differenceInDays;
};
