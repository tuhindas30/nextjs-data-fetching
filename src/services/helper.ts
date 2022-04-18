export const logError = (error: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
};
