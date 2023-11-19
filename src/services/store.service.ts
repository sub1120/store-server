import enums from "@/enums";

import StoreModel, { IStoreTime, ITime } from "@/models/store.model";
import compareTime from "@/utils/compareTime";

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

const getAll = async () => {
  const stores = await StoreModel.find();
  return stores;
};

const getById = async (id: string) => {
  const store = await StoreModel.findById(id);
  return store;
};

const getStoreStatus = (storeTiming: {
  monday: IStoreTime;
  tuesday: IStoreTime;
  wednessday: IStoreTime;
  thursday: IStoreTime;
  friday: IStoreTime;
  saturday: IStoreTime;
  sunday: IStoreTime;
}) => {
  const index = new Date().getDay();
  const currentTime: ITime = {
    hours: new Date().getHours() % 12,
    minutes: new Date().getMinutes(),
    period: new Date().getHours() >= 12 ? "PM" : "AM",
  };

  const currentDay = enums.DAYS[index % 7].toLowerCase();
  const currentDayStoreTiming =
    storeTiming[currentDay as keyof typeof storeTiming];

  let storeCurrentStatus = "";

  console.log(
    compareTime(currentTime, currentDayStoreTiming.opensAt),
    compareTime(currentTime, currentDayStoreTiming.closesAt),
  );

  if (compareTime(currentTime, currentDayStoreTiming.opensAt) === -1) {
    storeCurrentStatus = `Closed - Opens ${currentDayStoreTiming.opensAt.hours} ${currentDayStoreTiming.opensAt.period}`;
  } else if (
    compareTime(currentTime, currentDayStoreTiming.opensAt) >= 0 &&
    compareTime(currentTime, currentDayStoreTiming.closesAt) === -1
  ) {
    storeCurrentStatus = `Open - Closes ${currentDayStoreTiming.closesAt.hours} ${currentDayStoreTiming.closesAt.period}`;
  } else {
    const nextDay = enums.DAYS[(index + 1) % 7].toLowerCase();
    const nextDayTiming = storeTiming[nextDay as keyof typeof storeTiming];

    if (!nextDayTiming.isClosed) {
      storeCurrentStatus = `Closed - Opens ${nextDayTiming.opensAt.hours} ${currentDayStoreTiming.opensAt.period}`;
    } else {
      const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednessday",
        "thrusday",
        "friday",
        "saturday",
      ];

      const currentIndex = (index + 1) % 7;
      let i = currentIndex;
      do {
        if (
          !storeTiming[days[i].toLowerCase() as keyof typeof storeTiming]
            .isClosed
        ) {
          break;
        }
        i = (i + 1) % 7;
      } while (i !== currentIndex);

      const nextOpenDay = days[i].toLowerCase();
      const nextOpenDayTiming =
        storeTiming[nextOpenDay as keyof typeof storeTiming];

      storeCurrentStatus = `Closed - Opens ${
        nextOpenDay[0].toUpperCase() + nextOpenDay.slice(1)
      } ${nextOpenDayTiming.opensAt.hours} ${nextOpenDayTiming.opensAt.period}`;
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
