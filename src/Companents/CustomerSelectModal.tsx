import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CampaignService } from "@/Services/CampaignService";
import type { CreateCampaignForCustomer } from "@/DTO/CreateCampaingForCustomer";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void; // Kampanya oluşturulunca tabloyu yenilemek için
}

export default function CustomerSelectModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [phone, setPhone] = useState("");
  const [percentage, setPercentage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dto: CreateCampaignForCustomer = {
        CustomerPhone: phone,
        CampaignPercentage: Number(percentage),
      };

      // The service method does not return a Response; await it and treat no-throw as success.
      await CampaignService.createCampaignForCustomer(dto);

      // If no error was thrown, consider it successful.
      alert("Kampanya başarıyla oluşturuldu!");
      setPhone("");
      setPercentage("");
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Sunucu hatası oluştu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Müşteri Bazlı Kampanya Oluştur</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Telefon Numarası</Label>
            <Input
              type="text"
              placeholder="5XX XXX XX XX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>İndirim Oranı (%)</Label>
            <Input
              type="number"
              placeholder="Örn: 15"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white"
              disabled={loading}
            >
              {loading ? "Oluşturuluyor..." : "Oluştur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
