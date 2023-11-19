import enums from "@/enums";
import { StoreTimingType, TimeType } from "@/types";

import StoreModel from "@/models/store.model";
import compareTime from "@/utils/compareTime";

// creates a store
const create = async (
  name: string,
  address: string,
  phoneNumber: string,
  email: string,
  timing: string,
  description: string,
) => {
  const store = await StoreModel.create({
    name,
    address,
    phoneNumber,
    email,
    timing,
    description,
  });

  return store;
};

// get all stores
const getAll = async () => {
  const stores = await StoreModel.find();
  return stores;
};

// get store by id
const getById = async (id: string) => {
  const store = await StoreModel.findById(id);
  return store;
};

// format time
const formatTime = (time: TimeType) => {
  return `${time.hours} ${time.period}`;
};

// get store status text
const getStoreStatus = (storeTiming: {
  monday: StoreTimingType;
  tuesday: StoreTimingType;
  wednessday: StoreTimingType;
  thursday: StoreTimingType;
  friday: StoreTimingType;
  saturday: StoreTimingType;
  sunday: StoreTimingType;
}) => {
  let storeCurrentStatus = "";

  //current date
  const currentDate = new Date();

  //current day
  const currentDayIndex = currentDate.getDay();
  const currentDay = enums.DAYS[currentDayIndex];

  // current time
  const currentTime: TimeType = {
    hours: currentDate.getHours() % 12,
    minutes: currentDate.getMinutes(),
    period: currentDate.getHours() >= 12 ? enums.PERIODS.PM : enums.PERIODS.AM,
  };

  // current day store timings
  type IndexType = keyof typeof storeTiming;
  const currentDayStoreTiming = storeTiming[currentDay as IndexType];

  // Case 1: Store is open now
  if (
    !currentDayStoreTiming.isClosed &&
    compareTime(currentTime, currentDayStoreTiming.closesAt) === -1
  ) {
    // CASE 1(a): Current Time < Opening Time
    if (compareTime(currentTime, currentDayStoreTiming.opensAt) === -1) {
      storeCurrentStatus = `Closed - Opens ${formatTime(
        currentDayStoreTiming.opensAt,
      )}`;
    }

    // CASE 1(b): Opening Time <= Current Time < Closing Time
    else if (
      compareTime(currentTime, currentDayStoreTiming.opensAt) >= 0 &&
      compareTime(currentTime, currentDayStoreTiming.closesAt) === -1
    ) {
      storeCurrentStatus = `Open - Closes  ${formatTime(
        currentDayStoreTiming.closesAt,
      )}`;
    }
  }

  // CASE 2: Store is closed now
  else {
    const nextDay = enums.DAYS[(currentDayIndex + 1) % 7];
    const nextDayTiming = storeTiming[nextDay as IndexType];

    // CASE 2(a) : Next day store is opened
    if (!nextDayTiming.isClosed) {
      storeCurrentStatus = `Closed - Opens  ${formatTime(
        currentDayStoreTiming.opensAt,
      )}`;
    }
    // CASE 2(b): Next day store is closed
    else {
      const startIndex = (currentDayIndex + 1) % 7;

      let i = startIndex;
      let searchIndex = startIndex;

      do {
        // find next day when store is opened
        if (!storeTiming[enums.DAYS[i] as IndexType].isClosed) {
          searchIndex = i;
          break;
        }

        i = (i + 1) % 7;
      } while (i !== startIndex);

      const nextOpenDay = enums.DAYS[searchIndex];
      const nextOpenDayTiming = storeTiming[nextOpenDay as IndexType];

      storeCurrentStatus = `Closed - Opens ${
        nextOpenDay[0].toUpperCase() + nextOpenDay.slice(1)
      }  ${formatTime(nextOpenDayTiming.opensAt)}`;
    }
  }

  return storeCurrentStatus;
};

export default {
  create,
  getAll,
  getById,
  getStoreStatus,
};
