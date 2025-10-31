export const formatDisplayDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatDisplayTime = (timeString: string) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    
  });
};
