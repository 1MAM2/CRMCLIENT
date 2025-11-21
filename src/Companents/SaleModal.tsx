"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { CampaignService } from "@/Services/CampaignService";
import type { PurchaseDTO } from "@/DTO/PurchaseDTO";
import type { ApplyCampaignDTO } from "@/DTO/ApplyCampaignDTO";

interface SaleModalProps {
  open: boolean;
  onClose: () => void;
  onComplete?: (data: any) => void;
}

export default function SaleModal({
  open,
  onClose,
  onComplete,
}: SaleModalProps) {
  const [productName, setProductName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [price, setPrice] = useState<number>(0);

  const [couponAvailable, setCouponAvailable] = useState(false); // checkbox
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = async () => {
    if (!customerPhone) {
      alert("Telefon numarası gerekli!");
      return;
    }

    try {
      var couponDTO: ApplyCampaignDTO = {
        Phone: customerPhone,
        CampaignCode: couponCode,
        PaymentAmount: price,
      };
      const newPrice = await CampaignService.applycampaign(couponDTO);
      console.log(newPrice);
      setPrice(newPrice.finalAmount);
      setCouponApplied(false);
      return (
        <p className="text-green-600 font-semibold mt-2">{newPrice.message}</p>
      );
    } catch (err) {
      console.error("Kupon uygulanamadı:", err);
      alert("Kupon uygulanamadı!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const saleData: PurchaseDTO = {
        ProductName: productName,
        Price: price,
        CustomerPhone: customerPhone,
      };

      const res = await CampaignService.startPurchaseCampaignsProcessing(
        saleData
      );
      if (res.ok) {
        alert("Satış kaydedildi!");
        setProductName("");
        setCustomerPhone("");
        setPrice(0);
        setCouponApplied(false);
        setCouponAvailable(false);
        onClose();
        if (onComplete) onComplete(saleData);
      } else {
        const error = await res.text();
        alert("Hata: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("Satış eklenirken hata oluştu!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Satış İşlemi</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
          <input
            type="text"
            placeholder="Ürün Adı"
            className="border p-2 rounded w-full"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Telefon Numarası"
            className="border p-2 rounded w-full"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Fiyat"
            className="border p-2 rounded w-full"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          {/* Kupon checkbox */}
          <label className="flex items-center gap-2 mt-2">
            <Checkbox
              checked={couponAvailable}
              onCheckedChange={(checked) => {
                setCouponAvailable(!!checked);
                setCouponApplied(false);
              }}
            />
            Kupon var mı?
          </label>

          {/* Kupon satırı */}
          {couponAvailable && !couponApplied && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Kupon Kodu"
                className="border p-2 rounded w-full"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                required
              />
              <span>Phone {customerPhone}</span>
              <span>Toplam: {price} TL</span>

              <Button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Kuponu Uygula
              </Button>
            </div>
          )}

          {couponApplied && (
            <span className="text-green-600 font-semibold mt-2">
              Kupon uygulandı! Yeni fiyat: {price} TL
            </span>
          )}

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
          >
            Satışı Kaydet
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
