import type { CreateCustomerDTO } from "@/DTO/CreateCustomerDTO";

const APIConnection = import.meta.env.VITE_APIConnection;

export { APIConnection };

export const CustomerService = {
  getCustomers: async () => {
    const response = await fetch(`${APIConnection}/api/Customer/getcustomers`);
    return response.json();
  },
  getCustomerById: async (id: number) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/getcustomer/${id}`
    );
    return response.json();
  },
  createCustomer: async (customer: CreateCustomerDTO) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/createcustomer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    );
    console.log(APIConnection);

    return response;
  },
  updateCustomer: async (id: number, customer: any) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/updatecustomer/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      }
    );
    return response.json();
  },
  deleteCustomer: async (id: number) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/deletecustomer/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  },
  addNoteToCustomer: async (id: number, note: string) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/addnotetocustomer/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note }),
      }
    );
    return response.json();
  },
};
