import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Megaphone, Trash2 } from "lucide-react";
import { CampaignService } from "@/Services/CampaignService";
import CustomerSelectModal from "@/Companents/CustomerSelectModal";
import SegmentSelectModal from "@/Companents/SegmentSelectModal";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showSegmentModal, setShowSegmentModal] = useState(false);

  // Sayfa açıldığında kampanyaları getir
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const data = await CampaignService.getCampaigns();
    setCampaigns(data);
  };
  console.log(campaigns);

  function handleDelete(id: number): void {
    console.log(id);

    CampaignService.deleteCampaign(id);
    fetchCampaigns();
  }

  return (
    <div className="p-8  bg-linear-to-br from-gray-50 via-gray-100 to-gray-200">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Kampanya Yönetimi</h1>
        <p className="text-gray-500 mt-1">
          Kampanya işlemleri için aşağıdaki aksiyonları kullanın
        </p>
      </header>

      {/* Üst Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-lg transition cursor-pointer">
          <CardHeader className="flex flex-col items-center">
            <Megaphone className="h-12 w-12 text-pink-500 mb-2 animate-bounce" />
            <CardTitle>Müşteri Bazlı Kampanya</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => setShowCustomerModal(true)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
            >
              Oluştur
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition cursor-pointer">
          <CardHeader className="flex flex-col items-center">
            <Megaphone className="h-12 w-12 text-indigo-500 mb-2 animate-bounce" />
            <CardTitle>Segment Bazlı Kampanya</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => setShowSegmentModal(true)}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Oluştur
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alt: Kampanya Tablosu */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kod</TableHead>
            <TableHead>Müşteri / Segment</TableHead>
            <TableHead>İndirim %</TableHead>
            <TableHead>Bitiş Tarihi</TableHead>
            <TableHead>Kullanıldı</TableHead>
            <TableHead>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((c, index) => (
            <TableRow key={index}>
              <TableCell>{c.campaignCode}</TableCell>
              <TableCell>
                {c.customerName} / {c.customerSegment}{" "}
              </TableCell>
              <TableCell>{c.campaignPercentage}</TableCell>
              <TableCell>
                {new Date(c.expireDate).toLocaleDateString("tr-TR")}
              </TableCell>
              <TableCell>{c.used ? "Evet" : "Hayır"}</TableCell>
              <TableCell>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(c.id)}
                >
                  <Trash2 />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modallar */}
      <CustomerSelectModal
        open={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onCreated={fetchCampaigns}
      />
      <SegmentSelectModal
        open={showSegmentModal}
        onClose={() => setShowSegmentModal(false)}
        onCreated={fetchCampaigns}
      />
    </div>
  );
}
