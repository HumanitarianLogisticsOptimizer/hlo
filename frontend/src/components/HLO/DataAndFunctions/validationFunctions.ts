{ /* Shared validation functions for all types of couriers */ }
export const validateEmail = (value: string) => {
  if (!value) {
    return 'Email must not be empty';
  } else {
    return '';
  }
};

export const validatePassword = (value: string) => {
  if (!value) {
    return 'Password must not be empty';
  } else {
    return '';
  }
};

export const validatePhoneNumber = (value: string) => {
  if (!value) {
    return 'Phone number must not be empty';
  } else {
    return '';
  }
};

{ /* Validations for Volunteer Couriers */ }
export const validateFullName = (value: string) => {
  if (!value) {
    return 'Full name must not be empty';
  } else {
    return '';
  }
};

export const validateVehicleType = (value: string) => {
  if (!value) {
    return 'Vehicle type must not be empty';
  } else {
    return '';
  }
};

export const validateCarPlate = (value: string) => {
  if (!value) {
    return 'Car plate number must not be empty';
  } else {
    return '';
  }
};

export const validateNationalId = (value: string) => {
  if (!value) {
    return 'National ID number must not be empty';
  } else {
    return '';
  }
};

export const validateCity = (value: string) => {
  if (!value) {
    return 'City must not be empty';
  } else {
    return '';
  }
};

export const validateCountry = (value: string) => {
  if (!value) {
    return 'Country must not be empty';
  } else {
    return '';
  }
};

{ /*  Validations for Enterprise Courier */ }
export const validateCompanyName = (value: string) => {
  if (!value) {
    return 'Company name must not be empty';
  } else {
    return '';
  }
};

export const validateCompanyAddress = (value: string) => {
  if (!value) {
    return 'Company address must not be empty';
  } else {
    return '';
  }
};

export const validateTradeRegistrationNumber = (value: string) => {
  if (!value) {
    return 'Trade registration number must not be empty';
  } else {
    return '';
  }
};

export const validateNumberOfLightDuty = (value: string) => {
  if (!value) {
    return 'Number of light-duty vehicles must not be empty';
  } else {
    return '';
  }
};

export const validateNumberOfMediumDuty = (value: string) => {
  if (!value) {
    return 'Number of medium-duty vehicles must not be empty';
  } else {
    return '';
  }
};

export const validateNumberOfHeavyDuty = (value: string) => {
  if (!value) {
    return 'Number of heavy-duty vehicles must not be empty';
  } else {
    return '';
  }
};