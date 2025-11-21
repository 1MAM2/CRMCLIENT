"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CustomerService } from "@/Services/CustomerService";

interface CustomerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CustomerModal({ open, onClose }: CustomerModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      let customer = {
        FullName: fullName,
        Phone: phone,
      };
      const res = await CustomerService.createCustomer(customer);
      console.log(res.ok);
      
      if (res.ok) {
        alert("Müşteri başarıyla eklendi!");
        setFullName("");
        setPhone("");
        onClose();
      }
    } catch (error) {
      console.error("Müşteri eklenirken hata oluştu:", error);
      alert("Müşteri eklenirken hata oluştu!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Müşteri Ekle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
          <input
            type="text"
            placeholder="Ad Soyad"
            className="border p-2 rounded w-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Telefon"
            className="border p-2 rounded w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600"
          >
            Kaydet
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
