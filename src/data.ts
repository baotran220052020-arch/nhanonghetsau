// Comprehensive mock data for Nhà nông Hết Sầu.
import { FarmerProfile, EnterpriseProfile, AgriculturalProduct, CropForecastData, TransactionHistory } from './types';

export const AGRICULTURAL_PRODUCTS: AgriculturalProduct[] = [
  {
    id: 'p1',
    name: 'Sầu riêng Ri6 (Gốc Tây Nam Bộ)',
    code: 'DURIAN_RI6',
    image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=600',
    priceRange: '70,000 - 90,000 VND/kg',
    description: 'Vua sầu riêng nội địa với sắc cơm vàng rực rỡ óng ả, mùi thơm nồng nàn quyến rũ, vị ngọt béo ngậy tan chảy tê tái. Thích hợp thổ nhưỡng sông Tiền Cai Lậy.',
    characteristics: [
      'Cơm vàng ươm rực rỡ, hạt lép vừa',
      'Độ béo bơ cực cao, vị ngọt đậm đà',
      'Vỏ mỏng xanh tươi dẻo gai tròn trịa',
      'Trọng lượng lý tưởng: 2.5kg - 4.5kg/trái'
    ]
  },
  {
    id: 'p2',
    name: 'Sầu riêng Monthong (Dona Thái)',
    code: 'DURIAN_MONTHONG',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600',
    priceRange: '85,000 - 115,000 VND/kg',
    description: 'Giống sầu riêng quả thuôn dài, cơm màu vàng nhạt sang trọng, đặc tính cơm khô ráo ráo tuyệt hảo, không bị xơ, vị ngọt thanh không hắc, cực kỳ được chuộng để xuất khẩu chính ngạch.',
    characteristics: [
      'Cơm cực dày dặn, siêu lép bén hạt',
      'Thớ cơm khô ráo ráo mịn màng không nát',
      'Độ ngọt thanh cao béo thanh nhã',
      'Dễ bảo quản lạnh xuất khẩu chuỗi dài'
    ]
  },
  {
    id: 'p3',
    name: 'Sầu riêng Chuồng Bò (Cổ Truyền)',
    code: 'DURIAN_CHU_BO',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=600',
    priceRange: '75,000 - 95,000 VND/kg',
    description: 'Giống sầu riêng lâu đời lừng danh xứ Chợ Lách. Trái tháp nhỏ múp bầu, cơm xám sệt sữa nhão mềm mịn, vị ngọt gắt béo ngậy tột đỉnh ăn một lần nhớ cả đời.',
    characteristics: [
      'Cơm nhão dẻo dính tay béo sữa ngậy',
      'Hương thơm lan tỏa rất rộng xa nồng',
      'Chu kỳ sinh trưởng lâu truyền thống',
      'Số lượng khan hiếm phân khúc đặc sản'
    ]
  },
  {
    id: 'p4',
    name: 'Sầu riêng Musang King (Ươm Trồng Thử)',
    code: 'DURIAN_MUSANG',
    image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=600&sig=musang',
    priceRange: '190,000 - 260,000 VND/kg',
    description: 'Vua sầu ngoại Malaysia đang thích nghi tuyệt vời trên đất phù sa bồi Mỹ Khánh Cần Thơ. Cơm vàng cam đậm bóng loáng, cuống phẳng dẹt, vị đắng thảo mộc ngọt hậu thượng hạng.',
    characteristics: [
      'Cơm vàng cam sậm như màu nghệ chín',
      'Hạt phẳng xẹt lép mỏng dính tuyệt đối',
      'Hậu vị nhân nhẫn sâm thảo mộc rất đặc biệt',
      'Phân khúc thượng hạng giá trị kinh tế siêu cao'
    ]
  }
];

export const MOCK_TRANSACTIONS: TransactionHistory[] = [
  {
    id: 'tx1',
    farmerName: 'Vườn sầu riêng Chú Sáu Đức',
    enterpriseName: 'Tập đoàn VinaFruit',
    productName: 'Sầu riêng Ri6',
    volume: 18,
    pricePerKg: 76000,
    date: '2026-05-15',
    status: 'Đã hoàn thành',
    ratingFarmer: 5,
    ratingEnterprise: 5,
    reviewFarmer: 'Doanh nghiệp cắt sầu đúng hẹn ngày gặt, đặt cọc 35% đúng tỷ lệ giao kèo, tiền chuyển khoản hoàn tất ngay tại bàn nẹp cân.',
    reviewEnterprise: 'Chủ vườn bồi phân hữu cơ chuẩn ráo, ghi chép nhật ký điện tử hàng ngày cực kỳ chi tiết, vỏ gai căng tròn đạt chuẩn Hạng A xuất đi Quảng Châu.'
  },
  {
    id: 'tx2',
    farmerName: 'Hợp tác xã sầu riêng Tam Bình',
    enterpriseName: 'Công ty Xuất Nhập Khẩu MekongX',
    productName: 'Sầu riêng Monthong',
    volume: 45,
    pricePerKg: 94000,
    date: '2026-05-22',
    status: 'Đã hoàn thành',
    ratingFarmer: 5,
    ratingEnterprise: 4,
    reviewFarmer: 'MekongX điều đội xe lạnh bốc dỡ nhanh nhẹn, bao bù rủi ro móp hộc rất công bằng cho bà con nông gia xã viên.',
    reviewEnterprise: 'HTX Tam Bình thu gom sầu đồng loạt, mã số vùng trồng chính chủ chuẩn ráo mọc thịt ngọt thanh đạt chất khô béo 33.5%.'
  },
  {
    id: 'tx3',
    farmerName: 'Vườn sầu riêng Bảy Thạnh',
    enterpriseName: 'Tập đoàn VinaFruit',
    productName: 'Sầu riêng Chuồng Bò',
    volume: 8,
    pricePerKg: 82000,
    date: '2026-05-28',
    status: 'Đã hoàn thành',
    ratingFarmer: 4,
    ratingEnterprise: 5,
    reviewFarmer: 'Cắt chuẩn lộc bói vừa hái tay, thanh toán nhanh không mè nheo bớt giá gai.'
  },
  {
    id: 'tx4',
    farmerName: 'Nhà vườn Cô Tư Lê',
    enterpriseName: 'Logistics Toàn Cầu An Bình',
    productName: 'Sầu riêng Ri6',
    volume: 12,
    pricePerKg: 78000,
    date: '2026-06-01',
    status: 'Đang vận chuyển',
    ratingFarmer: undefined,
    ratingEnterprise: undefined,
  },
  {
    id: 'tx5',
    farmerName: 'Vườn sầu Musang King Ba Út',
    enterpriseName: 'Công ty Xuất Nhập Khẩu MekongX',
    productName: 'Sầu riêng Musang King',
    volume: 3,
    pricePerKg: 210000,
    date: '2026-06-03',
    status: 'Hợp đồng điện tử',
    ratingFarmer: undefined,
    ratingEnterprise: undefined,
  }
];

export const MOCK_FARMERS: FarmerProfile[] = [
  {
    id: 'f1',
    name: 'Vườn sầu riêng Chú Sáu Đức',
    phone: '0982 907 018',
    province: 'Tiền Giang',
    address: 'Ấp Tam Bình, Huyện Cai Lậy, Tỉnh Tiền Giang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    gardenImage: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=600',
    variety: 'Ri6',
    area: 3.5,
    expectedYield: 28,
    harvestTime: 'Tháng 6 - Tháng 7',
    certifications: ['VietGAP', 'Mã số vùng trồng'],
    creditScore: 'A+',
    creditScoreNumber: 98,
    status: 'Sắp thu hoạch',
    diary: [
      {
        id: 'd1_1',
        date: '2026-04-12',
        stage: 'Xả nhụy',
        workDone: 'Hỗ trợ rung bông thụ phấn nhân tạo bằng chổi quét tơ từ 19h00 đến 21h00 đêm khi phấn hoa búp mở rộ lộc. Điều tiết béc nước nhỏ giọt 20L/gốc, ngưng tưới dồng rãnh đề phòng sốc nước.',
        weather: 'Trời hanh nóng gay gắt, gió nam sông Tiền bồi ẩm',
        notes: 'Xả hoa thụ phấn đều sáp bông, chưa phát hiện mầm nấm cổ nụ hoa.',
        waterAmount: '20L/gốc',
        fertilizerUsed: 'Bộ Canxi Bo hữu cơ bồi gốc kèm vi chất dưỡng nụ.'
      },
      {
        id: 'd1_2',
        date: '2026-05-02',
        stage: 'Nuôi trái non',
        workDone: 'Cưa tỉa định vị hộc trái đợt một: Loại sạch quả bẹp gai, méo hộc móp mọc ở nọng nọng cành tơ, chỉ lưu giữ 2-4 trái thon tròn đều ở tay cành già to mập.',
        weather: 'Mưa rào dông đột ngột chiều mọc mương',
        notes: 'Nước mưa mang axit cao, vội vàng xới rãnh mương sâu ngập tháo úng chân mây rễ.',
        waterAmount: '0L (Mưa đủ dồn dào)',
        fertilizerUsed: 'Bồi gốc bổ vung Kali Hữu Cơ vi sinh tự ủ.'
      },
      {
        id: 'd1_3',
        date: '2026-05-18',
        stage: 'Chăm sóc thường',
        workDone: 'Cột dây nẹp lốp gai mềm, chằng treo quả chống bão giông giật đổ cuống cành. Căng xơ dừa che chắn bệ móng rễ ẩm thông thoáng.',
        weather: 'Nắng nóng chiều tối hanh khô chói chang',
        notes: 'Gai sầu nở to đều lộc bóng, quả Ri6 tròn kén nọng hộc thơm nhẹ.',
        waterAmount: '45L/gốc',
        fertilizerUsed: 'Kali Sunfat hữu cơ tự nhiên cô sậm cơm múi béo.'
      },
      {
        id: 'd1_4',
        date: '2026-06-05',
        stage: 'Chuẩn bị thu hoạch',
        workDone: 'Theo sát chỉ số tỷ lệ chất khô, hạn chế ráo nước tưới kịch trần (giảm xuống 10L) giúp ráo béo sệt cơm vàng không nhão nước.',
        weather: 'Nắng ấm dào dạt thanh bình gió bay nhẹ',
        notes: 'Gõ cuống sầu bói rỗng vang, gai chuyển sắc vàng nâu căng thớ cơm.',
        waterAmount: '10L/gốc'
      }
    ],
    transactions: []
  },
  {
    id: 'f2',
    name: 'Hợp tác xã sầu riêng Tam Bình',
    phone: '0977 123 456',
    province: 'Tiền Giang',
    address: 'Ấp Vực Sầu, Xã Tam Bình, Huyện Cai Lậy, Tỉnh Tiền Giang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    gardenImage: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600',
    variety: 'Monthong',
    area: 14.5,
    expectedYield: 110,
    harvestTime: 'Tháng 7 - Tháng 8',
    certifications: ['GlobalGAP', 'Mã số vùng trồng', 'VietGAP'],
    creditScore: 'A+',
    creditScoreNumber: 99,
    status: 'Đã chốt bao tiêu',
    diary: [
      {
        id: 'd2_1',
        date: '2026-05-10',
        stage: 'Nuôi trái non',
        workDone: 'Toàn thể nông gia xã viên thực hiện bao bọc túi vi sinh organic từng trái Monthong dãi màng chặn sáp côn bọ châm hút mốc vỏ sầu.',
        weather: 'Nắng chói lòa oi nóng ẩm độ đạt 75%',
        notes: 'Chỉ số đo IoT mương rơm ngọt lịm ngọt, đất tơi mỏng xốp dẻo dai.',
        waterAmount: '50L/gốc',
        fertilizerUsed: 'Đạm cá thuỷ phân tạt sương bờ mương.'
      },
      {
        id: 'd2_2',
        date: '2026-06-01',
        stage: 'Nuôi trái non',
        workDone: 'Hãm bồi Kali muối mù mịt gốc Monthong. Quan sát cuống giòn đanh hộc kẽ nứt đui sầu bói.',
        weather: 'Trời quang trời dông thưa thớt',
        notes: 'Lấy mẫu kiểm định âm tính hóa chất bảo vệ thực vật ép phổng cơm sầu.',
        waterAmount: '30L/gốc'
      }
    ],
    transactions: []
  },
  {
    id: 'f3',
    name: 'Vườn sầu riêng Bảy Thạnh',
    phone: '0912 345 678',
    province: 'Bến Tre',
    address: 'Huyện Chợ Lách, Tỉnh Bến Tre',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    gardenImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=600',
    variety: 'Chuồng Bò',
    area: 2.2,
    expectedYield: 18,
    harvestTime: 'Tháng 6 - Tháng 7',
    certifications: ['VietGAP'],
    creditScore: 'A',
    creditScoreNumber: 92,
    status: 'Sắp thu hoạch',
    diary: [
      {
        id: 'd3_1',
        date: '2026-05-25',
        stage: 'Chuẩn bị thu hoạch',
        workDone: 'Gia cố nẹp đai toàn bộ thân cây cổ thụ thụ mọc trái trĩu trịt. Vệ sinh thung lũng cỏ mương sạch sẽ đón thợ thương lái dẫm vườn.',
        weather: 'Mát lành lộng gió rười rượi miền sông Hàm Luông',
        notes: 'Cơm sầu đạt độ ngầy béo ngầy béo đặc quánh dính hàm của giống Chuồng Bò xưa bản cổ.',
        waterAmount: '20L/gốc'
      }
    ],
    transactions: []
  },
  {
    id: 'f4',
    name: 'Nhà vườn Cô Tư Lê',
    phone: '0945 888 999',
    province: 'Vĩnh Long',
    address: 'Xã Phú Quới, Huyện Long Hồ, Tỉnh Vĩnh Long',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    gardenImage: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600&sig=cotule',
    variety: 'Ri6',
    area: 3.1,
    expectedYield: 24,
    harvestTime: 'Tháng 8 - Tháng 9',
    certifications: ['VietGAP', 'Mã số vùng trồng'],
    creditScore: 'B',
    creditScoreNumber: 86,
    status: 'Đang chăm sóc',
    diary: [
      {
        id: 'd4_1',
        date: '2026-05-28',
        stage: 'Nuôi trái non',
        workDone: 'Tưới lỏng gốc giữ bạt mát, phun phòng rệp múp nhộng sinh học, đắp mùn dừa nuôi dưỡng ngọn lá.',
        weather: 'Mưa to tầm tã tháo dông giông rỉ mương',
        notes: 'Đắp rơm tơi ngăn xé chân rễ sầu đất non.',
        waterAmount: '0L (Mưa lớn tràn đầy)'
      }
    ],
    transactions: []
  },
  {
    id: 'f5',
    name: 'Vườn sầu Musang King Ba Út',
    phone: '0909 333 444',
    province: 'Cần Thơ',
    address: 'Xã Mỹ Khánh, Huyện Phong Điền, Thành phố Cần Thơ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    gardenImage: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600',
    variety: 'Musang King',
    area: 1.8,
    expectedYield: 10,
    harvestTime: 'Tháng 8 - Tháng 9',
    certifications: ['GlobalGAP'],
    creditScore: 'A',
    creditScoreNumber: 94,
    status: 'Đã chốt bao tiêu',
    diary: [
      {
        id: 'd5_1',
        date: '2026-05-30',
        stage: 'Nuôi trái non',
        workDone: 'Chỉnh dây giột IoT tự động sấy bệ móng. Xịt phòng nhện đỏ phá bông đọt.',
        weather: 'Nắng gió hanh lành lộng',
        notes: 'Sầu riêng thích nghi tốt với bãi bồi đất phù sa Mỹ Khánh màu mỡ, múi múp cam đỏ bơ.',
        waterAmount: '35L/gốc'
      }
    ],
    transactions: []
  }
];

// Map transactions to farmers of our mock lists
MOCK_FARMERS[0].transactions = [MOCK_TRANSACTIONS[0]];
MOCK_FARMERS[1].transactions = [MOCK_TRANSACTIONS[1]];
MOCK_FARMERS[2].transactions = [MOCK_TRANSACTIONS[2]];
MOCK_FARMERS[3].transactions = [MOCK_TRANSACTIONS[3]];
MOCK_FARMERS[4].transactions = [MOCK_TRANSACTIONS[4]];

export const MOCK_ENTERPRISES: EnterpriseProfile[] = [
  {
    id: 'e1',
    name: 'Tập đoàn VinaFruit (Sầu Xuất Khẩu)',
    representative: 'Bà Nguyễn Thị Ngọc Mai',
    phone: '028 3840 9999',
    address: 'Orchard Towers, Quận 1, Thành phố Hồ Chí Minh',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    creditScore: 'A+',
    demandVolume: 180,
    demandedCertifications: ['VietGAP', 'Mã số vùng trồng'],
    transactions: [MOCK_TRANSACTIONS[0], MOCK_TRANSACTIONS[2]],
    businessLicense: 'MSDN-0301984251-VNF',
    exportCertificates: ['HACCP Codex', 'ISO 22000', 'FDA Certificate', 'Halal Export Approved'],
    targetMarkets: ['Trung Quốc (Thượng Hải, Quảng Châu)', 'Hoa Kỳ', 'Singapore', 'Canada'],
    packingPhotos: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=400'
    ],
    coldChainCapacity: 'Kho lạnh khí quyển biến đổi (CA) rộng 2,500m2 sức chứa 800 tấn sầu tươi, đội 12 xe kéo container ThermoKing bọc chuyên sâu.',
    buyingDiary: [
      '05/06/2026: Đã kiểm duyệt mỏ hộc chín bói và chốt cọc 20 tấn sầu riêng Ri6 ráo bơ của vườn Chú Sáu Đức.',
      '02/06/2026: Trích lập quỹ dự án "Nhà nông Hết Sầu" trợ giá 2,000 đ/kg cho bà con dính sụt mặn nước sông mương Cái Lậy.',
      '28/05/2026: Hoàn tất đóng gói lô container sầu riêng Monthong dẻo ngọt thông quan luồng xanh xuất sang Thượng Hải.'
    ],
    status: 'Đang mở đợt thu mua cao điểm sầu riêng già bói cơm vàng béo ráo (riêng dòng Monthong và Ri6).'
  },
  {
    id: 'e2',
    name: 'Công ty Xuất Nhập Khẩu MekongX',
    representative: 'Ông Trần Vĩnh Lộc',
    phone: '0292 3822 555',
    address: 'Khu công nghiệp Trà Nóc, Quận Bình Thủy, Thành phố Cần Thơ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    creditScore: 'A+',
    demandVolume: 400,
    demandedCertifications: ['GlobalGAP', 'Mã số vùng trồng'],
    transactions: [MOCK_TRANSACTIONS[1], MOCK_TRANSACTIONS[4]],
    businessLicense: 'MSDN-1801874250-MKX',
    exportCertificates: ['GlobalGAP Chain of Custody (CoC)', 'Phytosanitary China Standard', 'HACCP Standard'],
    targetMarkets: ['Trung Quốc (Bắc Kinh, Trùng Khánh, Thành Đô)', 'Hồng Kông', 'Nhật Bản (Osaka)'],
    packingPhotos: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=400'
    ],
    coldChainCapacity: 'Bể tách sấy múi hút chân không đóng hộp đông lạnh tầng sưởi nitơ lòng sâu âm 40 độ C, trữ tải 1,200 tấn sầu riêng dạt múi tơi.',
    buyingDiary: [
      '04/06/2026: Chuyển khoản dứt điểm 1.25 tỷ VND tiền gặt sầu riêng Monthong cho đại diện HTX Tam Bình, thanh khoản chuẩn mực.',
      '30/05/2026: Lập trạm thẩm tra laser rà quét xơ sượng nứt nẻ, giảm thiểu tỷ lệ bẹp vỏ héo múi từ 6% xuống còn 1.5%.'
    ],
    status: 'Ưu tiên kết nối thu mua đại điền có Mã số vùng trồng xuất khẩu chính ngạch sang Trung Quốc.'
  },
  {
    id: 'e3',
    name: 'Logistics Toàn Cầu An Bình',
    representative: 'Bà Lê Hoài Thu',
    phone: '028 6262 7777',
    address: 'Cảng Cát Lái, Cát Lái, Quận 2, Thành phố Hồ Chí Minh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    creditScore: 'A',
    demandVolume: 150,
    demandedCertifications: ['VietGAP'],
    transactions: [MOCK_TRANSACTIONS[3]],
    businessLicense: 'MSDN-0314251670-ABL',
    exportCertificates: ['ISO 9001:2015 Logistics', 'Cold Chain Certified Professional', 'Food Safety Warehousing'],
    targetMarkets: ['Đài Loan (Cao Hùng)', 'Malaysia (Kuala Lumpur)', 'Singapore (Changi Airport Hub)'],
    packingPhotos: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=400&sig=e3'
    ],
    coldChainCapacity: 'Hạm đội liên hợp vựa bay gồm 5 phà chạy mớn nước sông sâu Cái Bè và 20 đầu kéo rơ-moóc thùng lạnh chuyên sọc Bắc Nam.',
    buyingDiary: [
      '03/06/2026: Thiết lập thành công hợp tác cam kết đền bù 200% giá trị hợp đồng sầu riêng Chuồng Bò dột cuống nếu xảy ra sự cố hụt nhiệt lạnh.',
      '22/05/2026: Điều phối kíp thợ gõ chuyên sâu sầu riêng miền Tây cắt bói, bảo đảm tỷ lệ gõ chuẩn ráo sệt dộp cơm vỏ tơi.'
    ],
    status: 'Gom gom chuyên sâu sầu riêng đặc sản quý miền Tây (Chuồng Bò, Musang King) với hạm đội hái gom tận vườn.'
  }
];

export const MOCK_FORECAST_DATA: CropForecastData[] = [
  { month: 'T5', 'Tiền Giang': 280, 'Bến Tre': 140, 'Vĩnh Long': 90, 'Cần Thơ': 30, total: 540 },
  { month: 'T6', 'Tiền Giang': 480, 'Bến Tre': 210, 'Vĩnh Long': 130, 'Cần Thơ': 50, total: 870 },
  { month: 'T7', 'Tiền Giang': 920, 'Bến Tre': 460, 'Vĩnh Long': 280, 'Cần Thơ': 90, total: 1750 },
  { month: 'T8', 'Tiền Giang': 1550, 'Bến Tre': 720, 'Vĩnh Long': 490, 'Cần Thơ': 210, total: 2970 },
  { month: 'T9', 'Tiền Giang': 2100, 'Bến Tre': 890, 'Vĩnh Long': 620, 'Cần Thơ': 280, total: 3890 },
  { month: 'T10', 'Tiền Giang': 1100, 'Bến Tre': 480, 'Vĩnh Long': 350, 'Cần Thơ': 130, total: 2060 },
  { month: 'T11', 'Tiền Giang': 520, 'Bến Tre': 240, 'Vĩnh Long': 180, 'Cần Thơ': 60, total: 1000 }
];

export const FARMING_EXPERTISE = {
  stages: [
    {
      title: '1. Giai đoạn Xả nhụy - Đậu trái non (Cực kỳ nhạy cảm)',
      duration: '7 - 12 ngày đầu',
      actions: [
        'Đo độ mặn nguồn nước tưới mương sầu đất từ sông Tiền hàng ngày. Nếu chỉ số muối muối TDS > 0.5g/L (độ mặn 0.5‰) thì tuyệt đối KHÔNG bơm ngập tưới đất. Sử dụng túi nước trữ ngọt tạm thời lót bạt.',
        'Hạn chế nước tưới tối đa ở ngưỡng bão hòa khô nhẹ (khoảng 15L - 25L/gốc cách ngày). Nước dồng đột ngột kích rễ non, trồi lá non cực thốc đè giật rớt hoa nụ.',
        'Hỗ trợ rung bông thụ phấn nhân tạo tối ưu: Tiến hành dùng bàn chổi mềm lướt sượt nhẹ chùm nụ hoa lúc chập tối hoàng hôn (18h30 - 21h00) lúc nướu cái sụt nhầy phấn bao đực chín lộc.',
        'Xịt phun Canxi - Bo hữu cơ dạng phân sương mép rìa lá và nọng cuống nhằm gia cố dẻo dai bám bọng sinh học không sém đuôi.'
      ],
      warnings: 'Sốc nước do nắng hạn gắt dồn dập rụng hoa cả vệt vườn. Ủ rơm rạ khô tơi đường kính 2M vạt quanh móng rễ dưỡng ẩm mát đất nền.',
      symptom: 'Cuống hoa khô xạm rụng rớt hàng loạt. Khắc phục ngay bằng đo lường độ sụt canxi pH bệ gốc sầu riêng.'
    },
    {
      title: '2. Giai đoạn Nuôi trái mập (Từ quả trứng đến quả cam hộc)',
      duration: '45 - 60 ngày xơ hóa',
      actions: [
        'Tiến hành tỉa thưa định hình trái đợt một: Loại sạch sành sanh quả sần gai méo hộc móp mọc nọng cành tơ hay những trái bị sâu đụt, chỉ lưu giữ 2-4 trái thon tròn đều phân bố cách móng thân chủ.',
        'Dùng bẫy sinh học Pheromone chăng quanh cây xua tháo côn rầy, rệp sáp múp nọng bọ xít phá hại, tuyệt đối KHÔNG dội thuốc hóa học nặng sém lồi vỏ.',
        'Bối phân lân hữu cơ vi sinh organic hữu ích, tưới dịch đạm cá thủy phân vi sinh Trichoderma giúp nâng cao lực chống chịu thối cổ rễ non phù sa.'
      ],
      warnings: 'Rầy bông rệp sáp phát tác phá hộc gai tạo các đốm xám mốc không đạt mã xuất khẩu quả tươi.',
      symptom: 'Xuất hiện tơ mọc thối cuống lộc bói. Mài tước, đắp vôi quét rễ xơ bông hạ hỏa gốc rễ.'
    },
    {
      title: '3. Giai đoạn Già quả trữ béo (Chuẩn bị thu hoạch chín bói)',
      duration: '20 - 30 ngày dốc vị',
      actions: [
        'Xử kỹ kỹ nghệ hãm ráo nước trước hái thu hoạch 15 ngày (giảm sệt lượng nước về mức 10L ẩm bề mặt bụi gốc), kích đanh thịt cơm vàng ngọt sắc thơm nồng, chặn tối đa nhão dạt múi sầu.',
        'Nẹp các dây dù nhựa đen dẻo bám chặt cuống quả vào thân cành chủ tránh dông rách giật lốc mùa hè.',
        'Tuyệt đối dừng tất thảy phân bón hóa học thốc lớn ngọn ngọn trước ngày thương lái cắt gặt 30 ngày phòng biến sượng dòn thớ cơm dạt loại.'
      ],
      warnings: 'Mưa rào dồn đột ngột cuối mùa lỏng béo múi thịt dạt sượng phồng.',
      symptom: 'Cơm mọng sượng rộp nước nhâm đui quả sầu. Tăng đào rãnh khơi thông mương mán, phủ nilon bạt rải mông sườn gốc dốc.'
    }
  ],
  weatherAlerts: [
    {
      id: 'w1',
      date: 'Niên vụ 2026',
      type: 'Xâm Nhập Hạn Mặn Báo Động IV',
      detail: 'Độ mặn mương mán sông ven Cai Lậy chạm mốc dốc 1.2-1.5‰ thọc sâu 60km. Khuyến cáo khẩn bà con không lấy nước trực tiếp sông mương, đóng khít cống lót mương bạt trữ nước, dùng sensor đo nước nông hộ liên tục của Nhà nông Hết Sầu bồi tưới.',
      severity: 'high'
    },
    {
      id: 'w2',
      date: 'Tháng 6 - Tháng 7 Năm 2026',
      type: 'Nắng Nóng Cực Đoan El Nino Ngưỡng 39 độ',
      detail: 'Nắng nóng thêu cháy đọt sầu đọt non và làm chùn rễ non rễ tơ. Bà con che chắn mùn cỏ dừa quanh vành đai tán gốc đường kính 2M ẩm sương dịu sớm tốt hơn chập hoàng hôn.',
      severity: 'medium'
    }
  ]
};

export const ENTERPRISE_QUALITY_STANDARDS = {
  gradingRules: [
    {
      grade: 'Hạng A (Chuẩn xuất khẩu tươi)',
      standards: [
        'Trọng lượng quả Monthong/Ri6 cân đối căng mập từ 2.6kg đến 4.5kg.',
        'Đầy đủ 4 đến 5 hộc múi căng đều rực màu không bị háp hay mốp vai.',
        'Múi cơm sầu ráo dẻo sệt mịn vàng óng đặc béo tinh khiết brix bốc > 15%.',
        'Kiểm mộc phân tích âm tính 100% dư lượng hóa học hay kim loại sỏi mương.'
      ],
      valuePercentage: '100% Giá cao kịch trần'
    },
    {
      grade: 'Hạng B (Trái chợ cao cấp)',
      standards: [
        'Trọng lượng từ 2.0kg - 2.5kg hoặc đại quả lớn hơn 4.6kg.',
        'Có tơi thiểu từ 3 hộc chứa múi đầy cơm mềm nở dẻo bơ.',
        'Hơi trầy sượt móng vảy ngoài vỏ gai gai không sém thối vào thịt cơm sầu.',
        'Chỉ số ngọt chất béo đạt xơ dẻo tiêu thụ nội địa tốt.'
      ],
      valuePercentage: '80% - 85% Giá trị'
    },
    {
      grade: 'Hạng C (Sáp cơm múi đông lạnh)',
      standards: [
        'Quả méo móp chỉ còn 1 - 2 hộc múi rõ ràng dệt.',
        'Cuống gãy sứt mẻ sâu mắt mốc vỏ mủ.',
        'Tách nẹp đóng khay lấy bóc múi đông lạnh xuất sấy múi cốc dầm.'
      ],
      valuePercentage: '45% - 50% Định thương'
    }
  ],
  creditRatingSystem: {
    title: 'Hệ thống chấm điểm tín nhiệm quốc tế (Credit Scoring Model)',
    description: 'Chỉ số bảo bảo chứng vàng giúp hợp tác nâng đỡ liên kết 1-1 không bị đứt gãy sụt kèo giật cọc.',
    farmerCriteria: [
      { score: 'Hạng A+ (95 - 100đ):', details: 'Nhật ký chăn nuôi bón phân hữu cơ cập nhật liên tục hàng ngày, đạt GlobalGAP lộng lẫy chính chuẩn, tỉ lệ giao hàng chính quy gác sụt sương < 1%.' },
      { score: 'Hạng A (85 - 94đ):', details: 'Sổ điện tử đều đặn hàng tuần, VietGAP sòng phẳng đạt chuẩn hộc cơm chín đều bói cắt hái.' },
      { score: 'Hạng B (70 - 84đ):', details: 'Ghi nhật ký thưa thớt bông hoa, dời hẹn ngày cắt ép giá buôn sụt sai lệch ước định.' }
    ],
    enterpriseCriteria: [
      { score: 'Hạng A+ (95 - 100đ):', details: 'Đặt cọc 30-35% đúng ngày kí số hợp đồng mỏ dải, không bớt xén cân quả cân độ giật hộc, thanh tế 100% tiền tươi tại bàn bốc xe nẹp vườn.' },
      { score: 'Hạng A (85 - 94đ):', details: 'Đặt sầu thu hoạch đúng tuần không hoãn dầm rụng sầu bọc, định giá và cắt quả chuẩn ráo dẻo sương bồi bù tỉ lệ hao hụt đúng quy định.' }
    ]
  }
};
