export const isMobileNumberValidator = (value: string) => {
  const regex = /^[0-9]{10}$/;
  if (!regex.test(value)) {
    return "Not a valid mobile number";
  }
};

export const isEmailValidator = (value: string) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regex.test(value)) {
    return "Not a valid email";
  }
};

export const isTimeValid = (value: {
  hours: number;
  minutes: number;
  period: string;
}) => {
  if (value.hours < 0 || value.hours > 12) {
    return "Invalid hours (hours => 0 and <=12)";
  }

  if (value.minutes < 0 || value.minutes > 59) {
    return "Invalid minutes (minutes => 0 and <=59)";
  }

  if (value.period !== "AM" && value.period !== "PM") {
    return "Invalid period (period = AM or PM)";
  }
};
