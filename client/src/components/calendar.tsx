const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export function isLeapYear(year: number) {
  return !(year % 4 || (!(year % 100) && year % 400));
}
export function getDaysInMonth(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  if (isLeapYear(year) && month === 1) {
    return DAYS_IN_MONTH[month] + 1;
  } else {
    return DAYS_IN_MONTH[month];
  }
}

export function getDayOfWeek(date: Date) {
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0) return 6;

  return dayOfWeek - 1;
}

export function getDayNow(currentDate: Date, checkDate: Date) {
  if (!currentDate || !checkDate) return false;
  if (
    currentDate.getFullYear() === checkDate.getFullYear() &&
    currentDate.getMonth() === checkDate.getMonth() &&
    currentDate.getDate() === checkDate.getDate()
  ) {
    return true;
  } else {
    return false;
  }
}

export function getMonthData(year: number, month: number) {
  const result:Date[][] = [];
  const date = new Date(year, month);
  const prevDate = new Date(year, month - 1);
  let prevMonth = getDaysInMonth(prevDate);
  let nextMonth = 1;
  const daysInMonth = getDaysInMonth(date);
  const monthStartOn = getDayOfWeek(date);
  let dayPrevMonth = [];
  let day = 1;
  for (let i = 0; i < 6; i++) {
    result[i] = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < monthStartOn) {
        dayPrevMonth[j] = new Date(year, month - 1, prevMonth--);
      } else if (day > daysInMonth) {
        result[i][j] = new Date(year, month + 1, nextMonth++);
      } else {
        result[i][j] = new Date(year, month, day++);
      }
    }
  }
  dayPrevMonth.reverse();

  let todayMonth = dayPrevMonth.concat(result[0]).filter((i) => i);
  result[0] = todayMonth;
  return result;
}
