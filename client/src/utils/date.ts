export const getFormattedDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};