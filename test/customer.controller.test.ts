import CustomerController from "../src/controllers/Customer.controller";
import * as CustomerRepository from "../src/repositories/Customer.repository";
import {
  generateCustomersData,
  generateCustomerPayload,
  generateCustomerData,
} from "./utils/generate";

afterEach(() => {
  jest.resetAllMocks();
});

describe("CustomerController", () => {
  describe("getCustomers", () => {
    test("should return empty array", async () => {
      const spy = jest
        .spyOn(CustomerRepository, "getCustomers")
        .mockResolvedValueOnce([]);
      const controller = new CustomerController();
      const Customers = await controller.getCustomers();
      expect(Customers).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    // test("should return Customer list", async () => {
    //   const CustomersList = [
    //     {
    //       customerId: 1,
    //       firstName: "firstName",
    //       lastName: "lastName",
    //       email: "email@example.com",
    //       address: "aaa street",
    //       dateOfBirth: new Date(),
    //       identityType: "passport",
    //       identityNumber: "ABC123",
    //       loans: [],
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ];
    //   const spy = jest
    //     .spyOn(CustomerRepository, "getCustomers")
    //     .mockResolvedValueOnce(CustomersList);
    //   const controller = new CustomerController();
    //   const Customers = await controller.getCustomers();
    //   expect(Customers).toEqual(CustomersList);
    //   expect(spy).toHaveBeenCalledWith();
    //   expect(spy).toHaveBeenCalledTimes(1);
    //   spy.mockRestore();
    // });
//     test("should return Customer list", async () => {
//       const CustomersData = generateCustomersData(2);
//       const spy = jest
//         .spyOn(CustomerRepository, "getCustomers")
//         .mockResolvedValueOnce(CustomersData);
//       const controller = new CustomerController();
//       const Customers = await controller.getCustomers();
//       expect(Customers).toEqual(CustomersData);
//       expect(spy).toHaveBeenCalledWith();
//       expect(spy).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe("addCustomer", () => {
//     test("should add Customer to the database", async () => {
//       const payload = generateCustomerPayload();
//       const CustomerData = generateCustomerData(payload);
//       const spy = jest
//         .spyOn(CustomerRepository, "createCustomer")
//         .mockResolvedValueOnce(CustomerData);
//       const controller = new CustomerController();
//       const Customer = await controller.createCustomer(payload);
//       expect(Customer).toMatchObject(payload);
//       expect(Customer).toEqual(CustomerData);
//       expect(spy).toHaveBeenCalledWith(payload);
//       expect(spy).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe("getCustomer ", () => {
//     test("should return Customer from the database", async () => {
//       const id = 1;
//       const CustomerData = generateCustomerData({ id });
//       const spy = jest
//         .spyOn(CustomerRepository, "getCustomer")
//         .mockResolvedValueOnce(CustomerData);
//       const controller = new CustomerController();
//       const Customer = await controller.getCustomer(id.toString());
//       expect(Customer).toEqual(CustomerData);
//       expect(Customer?.customerId).toBe(id);
//       expect(spy).toHaveBeenCalledWith(id);
//       expect(spy).toHaveBeenCalledTimes(1);
//     });

    test("should return null if Customer not found", async () => {
      const id = 1;
      const spy = jest
        .spyOn(CustomerRepository, "getCustomer")
        .mockResolvedValueOnce(null);
      const controller = new CustomerController();
      const Customer = await controller.getCustomer(id.toString());
      expect(Customer).toBeNull();
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});