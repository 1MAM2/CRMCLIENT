import type { CreateCampaignCustomerSegmentDTO } from "@/DTO/CreateCampaignCustomerSegmentDTO";
import type { ApplyCampaignDTO } from "../DTO/ApplyCampaignDTO";
import type { CreateCampaignForCustomer } from "@/DTO/CreateCampaingForCustomer";
import type { PurchaseDTO } from "@/DTO/PurchaseDTO";

const APIConnection = import.meta.env.VITE_APIConnection;

export const CampaignService = {
  getCampaigns: async () => {
    const response = await fetch(`${APIConnection}/api/Customer/getcampaigns`);
    return response.json();
  },
  getCampaignById: async (id: number) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/getcampaign/${id}`
    );
    return response.json();
  },
  createcampaigncustomersegment: async (
    campaign: CreateCampaignCustomerSegmentDTO
  ) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/createcampaigncustomersegment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      }
    );
    return response;
  },
  deleteCampaign: async (id: number) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/deletecampaign/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  },
  createCampaignForCustomer: async (campaign: CreateCampaignForCustomer) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/createcampaignforcustomer`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      }
    );

    if (response.ok) {
      const data = await response.json();
      data.CampaignExpireTime = new Date(data.CampaignExpireTime);
      console.log("Kampanya oluşturuldu:", data); // Bu görünmeli
      alert("Kampanya başarıyla oluşturuldu!");
    } else {
      const error = await response.text();
      console.error("Hata:", error);
      alert(error);
    }
  },
  startPurchaseCampaignsProcessing: async (purchase: PurchaseDTO) => {
    const response = await fetch(`${APIConnection}/api/Customer/purchase/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(purchase),
    });
    return response;
  },
  applycampaign: async (dto: ApplyCampaignDTO) => {
    const response = await fetch(
      `${APIConnection}/api/Customer/applycampaign/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      }
    );
    return response.json();
  },
};
