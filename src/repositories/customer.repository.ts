import { getRepository } from "typeorm";
import { Customer } from "../models";

export interface ICustomerPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  identityType: string;
  identityNumber: string;
  dateOfBirth: Date;
}

export const getCustomers = async (): Promise<Array<Customer>> => {
  const customerRepository = getRepository(Customer);
  return customerRepository.find({
    relations: ['loans'],
    order: {'createdAt': 'DESC'}
  });
};

export const createCustomer = async (payload: ICustomerPayload): Promise<Customer> => {
  const customerRepository = getRepository(Customer);
  const customer = new Customer();
  return customerRepository.save({
    ...customer,
    ...payload,
  });
};

export const updateCustomer = async (id: number, payload: ICustomerPayload): Promise<Customer> => {
  const customerRepository = getRepository(Customer);
  const customer = await customerRepository.findOne({ customerId: id });
  return customerRepository.save({
    ...customer,
    ...payload,
  });
};


export const getCustomer = async (id: number): Promise<Customer | null> => {
  const customerRepository = getRepository(Customer);
  const customer = await customerRepository.findOne({ customerId: id }, { relations: ['loans']});
  if (!customer) return null;
  return customer;
};