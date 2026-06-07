// Dedicated file for type declarations to ensure robust structure and type safety.

export type Role = 'giao_dien_ngoai' | 'nha_vuon' | 'doanh_nghiep';

export interface AgriculturalProduct {
  id: string;
  name: string;
  code: string;
  image: string;
  priceRange: string;
  description: string;
  characteristics: string[];
}

export interface CultivationDiary {
  id: string;
  date: string;
  stage: 'Xả nhụy' | 'Nuôi trái non' | 'Chuẩn bị thu hoạch' | 'Phục hồi cây' | 'Chăm sóc thường';
  workDone: string;
  weather: string;
  notes: string;
  waterAmount: string;
  fertilizerUsed?: string;
  photos?: string[];
}

export interface TransactionHistory {
  id: string;
  farmerName: string;
  enterpriseName: string;
  productName: string;
  volume: number; // in tons
  pricePerKg: number; // in VND
  date: string;
  status: 'Đã hoàn thành' | 'Đang vận chuyển' | 'Đang thương lượng' | 'Đã hủy' | 'Hợp đồng điện tử';
  ratingFarmer?: number; // 1-5 stars
  ratingEnterprise?: number; // 1-5 stars
  reviewFarmer?: string;
  reviewEnterprise?: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  province: 'Tiền Giang' | 'Bến Tre' | 'Vĩnh Long' | 'Cần Thơ';
  address: string;
  avatar: string;
  gardenImage: string;
  variety: 'Ri6' | 'Monthong' | 'Chuồng Bò' | 'Musang King';
  area: number; // in hectares (ha)
  expectedYield: number; // in tons
  harvestTime: string; // e.g. "Tháng 8 - Tháng 9"
  certifications: ('VietGAP' | 'GlobalGAP' | 'Mã số vùng trồng')[];
  creditScore: 'A+' | 'A' | 'B' | 'C';
  creditScoreNumber: number; // 100 base, e.g. 96
  diary: CultivationDiary[];
  transactions: TransactionHistory[];
  status?: 'Sắp thu hoạch' | 'Đang chăm sóc' | 'Đã chốt bao tiêu';
}

export interface EnterpriseProfile {
  id: string;
  name: string;
  representative: string;
  phone: string;
  address: string;
  avatar: string;
  creditScore: 'A+' | 'A' | 'B';
  demandVolume: number; // tons needed
  demandedCertifications: ('VietGAP' | 'GlobalGAP' | 'Mã số vùng trồng')[];
  transactions: TransactionHistory[];
  businessLicense?: string;
  exportCertificates?: string[];
  targetMarkets?: string[];
  packingPhotos?: string[];
  coldChainCapacity?: string;
  buyingDiary?: string[];
  status?: string;
}

export interface DirectConnection {
  id: string;
  farmerId: string;
  farmerName: string;
  enterpriseId: string;
  enterpriseName: string;
  productName: string;
  volume: number; // in tons
  priceOffer: number; // in VND/kg
  stage: 'Yêu cầu mới' | 'Đang thương lượng' | 'Đang soạn hợp đồng' | 'Đã ký hợp đồng' | 'Đang vận chuyển' | 'Hoàn thành' | 'Đã đánh giá';
  proposedDeliveryDate: string;
  notes: string;
  // electronic contract data
  contractSignedByFarmer: boolean;
  contractSignedByEnterprise: boolean;
  contractHash?: string;
  // rating values
  ratingToFarmer?: number;
  reviewToFarmer?: string;
  ratingToEnterprise?: number;
  reviewToEnterprise?: string;
}

export interface CropForecastData {
  month: string;
  'Tiền Giang': number;
  'Bến Tre': number;
  'Vĩnh Long': number;
  'Cần Thơ': number;
  total: number;
}
