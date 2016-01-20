export function minutesToTime(minutes) {
  // Returns minutes as [hour, minute, period] tuple representing time
  // in 12-hour notation
  minutes = parseInt(minutes, 10);
  if (isNaN(minutes)) {
    throw new Error(`minutes must be an integer value: ${minutes}`);
  }
  if (minutes < 0) {
    throw new RangeError('minutes must not be negative');
  }
  if (minutes > 1439) {
    throw new RangeError('minutes must less than 1439');
  }
  let hour = Math.floor(minutes / 60);
  let minute = minutes % 60;
  let period = hour < 12 ? 'AM' : 'PM';
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour = hour - 12;
  }
  return [hour, minute, period];
}
