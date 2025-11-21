// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Users, Repeat, Percent, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { APIConnection } from "@/Services/CustomerService";

// ---- StatsCard Component ----
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => (
  <Card className="flex items-center justify-between p-4 shadow-sm">
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
    <div className="bg-muted p-3 rounded-full">{icon}</div>
  </Card>
);

// ---- Extra Static Data for Visualization ----
const extraMonthlySales = [
  { month: "Ocak", sales: 20 },
  { month: "Şubat", sales: 35 },
  { month: "Mart", sales: 28 },
  { month: "Nisan", sales: 40 },
  { month: "Mayıs", sales: 32 },
  { month: "Haziran", sales: 37 },
];

const extraCampaignPerformance = [
  { name: "Kampanya X", sales: 15 },
  { name: "Kampanya Y", sales: 22 },
  { name: "Kampanya Z", sales: 18 },
];

// ---- Dashboard Component ----
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<{
    totalCustomers: number;
    sadikCount: number;
    activeCampaigns: number;
    usedCampaigns: number;
    monthlySales: { month: string; sales: number }[];
    campaignPerformance: { name: string; sales: number }[];
    allCustomers?: any[];
  }>({
    totalCustomers: 0,
    sadikCount: 0,
    activeCampaigns: 0,
    usedCampaigns: 0,
    monthlySales: [],
    campaignPerformance: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await fetch(
        `${APIConnection}/api/Customer/dashboard-summary`
      );
      const data = await res.json();

      setDashboardData({
        totalCustomers: data.totalCustomers,
        sadikCount: data.sadikCount,
        activeCampaigns: data.activeCampaigns,
        usedCampaigns: data.usedCampaigns,
        monthlySales: [...data.monthlySales, ...extraMonthlySales], // API + static data
        campaignPerformance: [
          ...data.campaignPerformance,
          ...extraCampaignPerformance,
        ],
        allCustomers: data.allCustomers,
      });
    };
    fetchDashboard();
  }, []);
  console.log(dashboardData);

  return (
    <div className="p-6 grid gap-6">
      {/* KPI Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Toplam Müşteri"
          value={dashboardData.totalCustomers.toString()}
          icon={<Users className="text-blue-500" />}
        />
        <StatsCard
          title="Sadık Müşteriler"
          value={dashboardData.sadikCount.toString()}
          icon={<Repeat className="text-purple-500" />}
        />
        <StatsCard
          title="Aktif Kampanyalar"
          value={dashboardData.activeCampaigns.toString()}
          icon={<Percent className="text-green-500" />}
        />
        <StatsCard
          title="Kullanılmış Kampanyalar"
          value={dashboardData.usedCampaigns.toString()}
          icon={<DollarSign className="text-orange-500" />}
        />
      </div>
      {/* Aylık Satış Grafiği */}
      <Card>
        <CardHeader>
          <CardTitle>Aylık Satış Grafiği</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboardData.monthlySales}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* Kampanya Performansı */}
      <Card>
        <CardHeader>
          <CardTitle>Kampanya Performansı</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboardData.campaignPerformance}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Müşteri Listesi</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İsim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri Tipi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oluşturulma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Ziyaret
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satın Alma Sayısı
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(dashboardData?.allCustomers ?? []).map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.email || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.customerType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.lastVisit
                      ? new Date(customer.lastVisit).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.purchaseCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
