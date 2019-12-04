export const formattedDate = (date) => new Date(date).toISOString().slice(0,10);
export const addDays = (date, numberOfDays)  => new Date(date).setDate(new Date(date).getDate() + numberOfDays);
export const subDays = (date, numberOfDays) => new Date(date).setDate(new Date(date).getDate() - numberOfDays);