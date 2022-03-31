const ENTER_KEY = "Enter";

export const isEnter = (event: KeyboardEvent): boolean => {
  return event.key === ENTER_KEY && !event.shiftKey;
};
