import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CampaignService } from "@/Services/CampaignService";
import type { CreateCampaignCustomerSegmentDTO } from "@/DTO/CreateCampaignCustomerSegmentDTO";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function SegmentSelectModal({
  open,
  onClose,
  onCreated,
}: Props) {
  // customerType: number tutuyoruz
  const [customerType, setCustomerType] = useState<number>(0);

  // percentage: input string, submitte Number(...) ile parse edilecek
  const [percentage, setPercentage] = useState<string>("0");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dto: CreateCampaignCustomerSegmentDTO = {
        CustomerType: customerType,
        CampaignPercentage: Number(percentage),
        ExpireDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // direkt Date
      };

      const res = await CampaignService.createcampaigncustomersegment(dto);

      if (res.ok) {
        alert("Segment bazlı kampanya oluşturuldu!");
        setCustomerType(0);
        setPercentage("0");
        onCreated();
        onClose();
      } else {
        const text = await res.text();
        console.error("Hata:", text);
        alert("Kampanya oluşturulamadı!");
      }
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
          <DialogTitle>Segment Bazlı Kampanya Oluştur</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Müşteri Tipi</Label>
            {/* value string olmalı -> toString */}
            <Select
              value={customerType.toString()}
              onValueChange={(v) => setCustomerType(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seçiniz..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Potansiyel</SelectItem>
                <SelectItem value="1">Yeni</SelectItem>
                <SelectItem value="2">Mevcut</SelectItem>
                <SelectItem value="3">Sadık</SelectItem>
                <SelectItem value="4">Olumsuz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>İndirim Oranı (%)</Label>
            {/* Input value string, onChange da string verir */}
            <Input
              type="number"
              placeholder="Örn: 20"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
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
