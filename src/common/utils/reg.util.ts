
export const isPureNumber = (value: string): boolean => {
  const pattern = new RegExp(/^\d{1,}$/);
  return pattern.test(value);
};

export const isStrongPassword = (value: string): boolean => {
  const pattern = new RegExp(/^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/);
  return pattern.test(value);
};
