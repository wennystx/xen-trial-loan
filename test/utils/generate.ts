import faker from '@faker-js/faker';
import { Customer} from "../../src/models";

export function generateCustomerData(overide = {}) {
  return {
    customerData: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    dateOfBirth: new Date(),
    identityType: faker.datatype.string(),
    identityNumber: faker.datatype.string(),
    createdAt: new Date(),
    updatedAt: new Date(),
    loans: [],
    ...overide,
  };
}

export function generateCustomersData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCustomerData({ id: i, ...overide });
    }
  );
}

export function generateCustomerPayload() {
    return {
      customerData: faker.datatype.number(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      dateOfBirth: new Date(),
      identityType: faker.datatype.string(),
      identityNumber: faker.datatype.string(),
    }
}

