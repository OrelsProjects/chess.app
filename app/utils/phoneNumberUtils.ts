export const formatPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.startsWith("0") ? phoneNumber.replace("0", "+972") : phoneNumber;
