import CustomerModal from "@/Companents/AddCustomer";
import SaleModal from "@/Companents/SaleModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Megaphone,
  CalendarDays,
  BarChart3,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [openSaleModal, setOpenSaleModal] = useState(false);
  const navigate = useNavigate();
  console.log(openModal);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 p-8">
      {/* Sayfa Başlığı */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          CRM Kontrol Paneli
        </h1>
        <p className="text-gray-500 mt-2">
          Hızlı erişim için aşağıdaki işlemlerden birini seçin
        </p>
      </header>

      {/* Ana içerik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Müşteri Ekle */}
        <Card className="hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
          <CardHeader className="flex flex-col items-center justify-center">
            <Users className="h-12 w-12 text-indigo-500 mb-2 animate-pulse" />
            <CardTitle className="text-center">Müşteri Ekle</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => setOpenModal(true)}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition"
            >
              Yeni Müşteri
            </Button>
          </CardContent>
        </Card>

        {/* Kampanya Gönder */}
        <Card className="hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
          <CardHeader className="flex flex-col items-center justify-center">
            <Megaphone className="h-12 w-12 text-pink-500 mb-2 animate-bounce" />
            <CardTitle className="text-center">Kampanya Yönetimi</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={() => navigate("/create-campaign")}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white transition"
            >
              Kampanyaları Yönet
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
          <CardHeader className="flex flex-col items-center justify-center">
            <DollarSign className="h-12 w-12 text-orange-500 mb-2 animate-bounce" />
            <CardTitle className="text-center">Satış İşlemleri</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button  className="w-full bg-orange-500 hover:bg-orange-600 text-white transition" onClick={()=>setOpenSaleModal(true)}>
              Satış Yap
            </Button>
          </CardContent>
        </Card>

        {/* Hatırlatıcı Planla */}
        <Card className="hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
          <CardHeader className="flex flex-col items-center justify-center">
            <CalendarDays className="h-12 w-12 text-teal-500 mb-2 animate-pulse" />
            <CardTitle className="text-center">Hatırlatıcı Planla</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white transition"  onClick={() => navigate("/reminder")}>
              Randevu Ekle
            </Button>
          </CardContent>
        </Card>

        {/* İstatistikler */}
        <Card className="hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
          <CardHeader className="flex flex-col items-center justify-center">
            <BarChart3 className="h-12 w-12 text-yellow-500 mb-2 animate-bounce" />
            <CardTitle className="text-center">İstatistikler</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={()=>navigate("/dashboard")} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white transition">
              Görüntüle
            </Button>
          </CardContent>
        </Card>
      </div>
      <CustomerModal open={openModal} onClose={() => setOpenModal(false)} />
      <SaleModal
        open={openSaleModal}
        onClose={() => setOpenSaleModal(false)}
        onComplete={(data:any) => console.log("Satış tamamlandı:", data)}
      />
    </div>
  );
}
