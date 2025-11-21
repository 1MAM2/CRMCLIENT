import { Button } from "@/components/ui/button";

interface Props {
  onClose: () => void;
}

export default function CampaignModal({ onClose }: Props) {
  const handleSubmit = () => {
    // API çağrısı burada yapılacak
    console.log("Kampanya başlatıldı");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Yeni Kampanya Başlat</h2>
        {/* Buraya form alanları ekleyebilirsin */}
        <input
          type="text"
          placeholder="Kampanya adı"
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="number"
          placeholder="İndirim %"
          className="w-full border p-2 mb-4 rounded"
        />
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>İptal</Button>
          <Button
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            Başlat
          </Button>
        </div>
      </div>
    </div>
  );
}
