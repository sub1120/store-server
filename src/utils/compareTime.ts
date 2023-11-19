import { ITime } from "@/models/store.model";

const compareTime = (time1: ITime, time2: ITime) => {
  // PM > AM
  if (time1.period !== time2.period) {
    return time2.period === "PM" ? -1 : 1;
  }

  // Compare hours
  if (time1.hours !== time2.hours) {
    return time2.hours > time1.hours ? -1 : 1;
  }

  // Compare minutes
  if (time1.minutes !== time2.minutes) {
    return time2.minutes > time1.minutes ? -1 : 1;
  }

  return 0;
};

export default compareTime;
