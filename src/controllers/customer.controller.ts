import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Customer } from "../models";
import {
  getCustomers,
  createCustomer,
  ICustomerPayload,
  getCustomer,
} from "../repositories/customer.repository";

@Route("customers")
@Tags("Customer")
export default class CustomerController {
  @Get("/")
  public async getCustomers(): Promise<Array<Customer>> {
    return getCustomers();
  }

  @Post("/")
  public async createCustomer(@Body() body: ICustomerPayload): Promise<Customer> {
    return createCustomer(body);
  }

  @Get("/:id")
  public async getCustomer(@Path() id: string): Promise<Customer | null> {
    return getCustomer(Number(id));
  }
}