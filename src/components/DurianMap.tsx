import React, { useState, useMemo } from 'react';
import { Filter, Star, BookOpen, Calendar, MapPin, Phone, Award, ShieldAlert, History, MessageSquare, Briefcase, ChevronRight, Check, Building, Layers, Eye, QrCode } from 'lucide-react';
import { MOCK_FARMERS, MOCK_ENTERPRISES } from '../data';
import { FarmerProfile, EnterpriseProfile, CultivationDiary, TransactionHistory } from '../types';

interface DurianMapProps {
  onInitiateConnect: (farmer: FarmerProfile) => void;
}

export default function DurianMap({ onInitiateConnect }: DurianMapProps) {
  // Category switch: 'farmers' (Nhà vườn) | 'enterprises' (Doanh nghiệp)
  const [activeCategory, setActiveCategory] = useState<'farmers' | 'enterprises'>('farmers');

  // Map View Mode: Google My Maps or SVG density blueprint
  const [mapViewType, setMapViewType] = useState<'google' | 'blueprint'>('google');

  // --- FARMER FILTERS ---
  const [selectedProvince, setSelectedProvince] = useState<string>('Tất cả');
  const [selectedVariety, setSelectedVariety] = useState<string>('Tất cả');
  const [selectedHarvestTime, setSelectedHarvestTime] = useState<string>('Tất cả');
  const [selectedCert, setSelectedCert] = useState<string>('Tất cả');

  // --- ENTERPRISE FILTERS ---
  const [entSelectedCert, setEntSelectedCert] = useState<string>('Tất cả');
  const [entSelectedMarket, setEntSelectedMarket] = useState<string>('Tất cả');
  const [entSelectedCapacity, setEntSelectedCapacity] = useState<string>('Tất cả');

  // Active Selections
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>(MOCK_FARMERS[0].id);
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>(MOCK_ENTERPRISES[0].id);

  // Tabs
  const [activeProfileTab, setActiveProfileTab] = useState<'info' | 'diary' | 'transactions'>('info');
  const [activeEntProfileTab, setActiveEntProfileTab] = useState<'info' | 'diary' | 'transactions'>('info');

  // Selected Stage Photo for Growers
  const [activeStageIdx, setActiveStageIdx] = useState<number>(3); // Default harvest stage

  // Filtered Grower lists
  const filteredFarmers = useMemo(() => {
    return MOCK_FARMERS.filter((farmer) => {
      const matchProv = selectedProvince === 'Tất cả' || farmer.province === selectedProvince;
      const matchVariety = selectedVariety === 'Tất cả' || farmer.variety === selectedVariety;
      const matchCert =
        selectedCert === 'Tất cả' ||
        (selectedCert === 'VietGAP' && farmer.certifications.includes('VietGAP')) ||
        (selectedCert === 'GlobalGAP' && farmer.certifications.includes('GlobalGAP')) ||
        (selectedCert === 'Mã số vùng trồng' && farmer.certifications.includes('Mã số vùng trồng'));

      const matchTime =
        selectedHarvestTime === 'Tất cả' ||
        (selectedHarvestTime === 'Tháng 6 - Tháng 7' && farmer.harvestTime.includes('Tháng 6')) ||
        (selectedHarvestTime === 'Tháng 7 - Tháng 8' && farmer.harvestTime.includes('Tháng 7')) ||
        (selectedHarvestTime === 'Tháng 8 - Tháng 9' && farmer.harvestTime.includes('Tháng 8')) ||
        (selectedHarvestTime === 'Tháng 9 - Tháng 10' && farmer.harvestTime.includes('Tháng 9'));

      return matchProv && matchVariety && matchCert && matchTime;
    });
  }, [selectedProvince, selectedVariety, selectedHarvestTime, selectedCert]);

  // Filtered Enterprise lists
  const filteredEnterprises = useMemo(() => {
    return MOCK_ENTERPRISES.filter((ent) => {
      // Certification filter
      const matchCert =
        entSelectedCert === 'Tất cả' ||
        ent.demandedCertifications.includes(entSelectedCert as any);

      // Target market filter
      const matchMarket =
        entSelectedMarket === 'Tất cả' ||
        (ent.targetMarkets && ent.targetMarkets.some(m => m.includes(entSelectedMarket)));

      // Capacity rating filters
      let matchCap = true;
      if (entSelectedCapacity !== 'Tất cả') {
        const capacityVal = ent.demandVolume;
        if (entSelectedCapacity === 'high') {
          matchCap = capacityVal >= 200;
        } else {
          matchCap = capacityVal < 200;
        }
      }

      return matchCert && matchMarket && matchCap;
    });
  }, [entSelectedCert, entSelectedMarket, entSelectedCapacity]);

  // Selected Objects
  const selectedFarmer = useMemo(() => {
    return MOCK_FARMERS.find((f) => f.id === selectedFarmerId) || MOCK_FARMERS[0];
  }, [selectedFarmerId]);

  const selectedEnterprise = useMemo(() => {
    return MOCK_ENTERPRISES.find((e) => e.id === selectedEnterpriseId) || MOCK_ENTERPRISES[0];
  }, [selectedEnterpriseId]);

  // Stage details with images for growers
  const growerGrowthStages = [
    {
      name: 'GĐ 1: Trổ hoa ra mắt cua',
      desc: 'Nụ bông phình mọc tơi sờ xù xì, tưới nước ẩm sương bảo tồn rễ.',
      time: '65 ngày trước thu hoạch',
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=400&sig=flowering'
    },
    {
      name: 'GĐ 2: Thụ phấn xả nhụy',
      desc: 'Rung cành chổi mềm tối muộn hạt phấn chín vàng, bọc keo cuống.',
      time: '45 ngày trước thu hoạch',
      image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=400&sig=pollination'
    },
    {
      name: 'GĐ 3: Nuôi nọng phình hộc',
      desc: 'Khoét loại dạt sần gai, nẹp dù cành chống dông, bón vi sinh dẻo dốc.',
      time: '25 ngày trước thu hoạch',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=400&sig=growing'
    },
    {
      name: 'GĐ 4: Chín bói cắt cơm béo',
      desc: 'Hãm ráo nước trước hái 12 ngày, cơm vàng sệt bột ngọt đẫy đà.',
      time: 'Sẵn sàng thu hoạch cắt gốc',
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=400&sig=harvest'
    }
  ];

  // Map representation coordinates
  const mapPoints = {
    'f1': { cx: 280, cy: 190, color: '#10b981', label: 'Sáu Đức', desc: 'Có sầu Ri6 già' },
    'f2': { cx: 340, cy: 170, color: '#10b981', label: 'Tam Bình', desc: 'Gom sầu Monthong' },
    'f3': { cx: 210, cy: 220, color: '#f59e0b', label: 'Bảy Thạnh', desc: 'Dưỡng non hộc' },
    'f4': { cx: 160, cy: 180, color: '#3b82f6', label: 'Cô Tư Lê', desc: 'Mới rộ bông hoa' },
    'f5': { cx: 90, cy: 260, color: '#ef4444', label: 'Ba Út', desc: 'Thời tiết dột mặn nhẹ' },
    'e1': { cx: 380, cy: 70, color: '#8b5cf6', label: 'VNF Corp', desc: 'Cảng Cát Lái thu gom' },
    'e2': { cx: 120, cy: 230, color: '#8b5cf6', label: 'MekongX', desc: 'Kho lạnh Cần Thơ' },
    'e3': { cx: 290, cy: 230, color: '#8b5cf6', label: 'An Bình', desc: 'Hạm đội phà Cái Bè' }
  };

  const handleProactiveConnectToEnterprise = (ent: EnterpriseProfile) => {
    // Farmer simulation to connect
    const myFarm = MOCK_FARMERS[0]; // assume Sáu Đức is logged in or role is gardener
    alert(`🌻 [KẾT NỐI CHỦ ĐỘNG THÀNH CÔNG]
Gửi đề xuất thành công đến ${ent.name}!
Mã vạch và định vị số của vườn đã được truyền tải lên Hệ thống điều hành trung tâm. Đại diện mua ${ent.representative} sẽ gọi lại qua số điện thoại ${ent.phone} trong thời gian ngắn nhất!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header and selection tabs */}
      <div className="text-left space-y-4 border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center space-x-2">
            <span>Bản Đồ Nguồn Cung Sầu Riêng Số Hóa</span>
            <span className="text-xs px-2.5 py-1 bg-green-100 text-green-800 rounded-full font-mono font-bold uppercase animate-pulse">Live</span>
          </h1>
          <p className="text-slate-500 font-sans text-sm mt-1">
            Hạ tầng truy vết nguồn cung kép: Nơi nhà vườn số hóa vùng trồng kết nối trực tiếp với chuỗi thu mua doanh nghiệp xuất khẩu lớn bảo chứng minh bạch.
          </p>
        </div>

        {/* Global category selector */}
        <div className="flex p-1 bg-slate-100/90 border border-slate-200 rounded-2xl font-sans" id="map-category-switcher">
          <button
            onClick={() => {
              setActiveCategory('farmers');
              setActiveProfileTab('info');
            }}
            className={`py-2 px-5 text-sm font-semibold rounded-xl transition-all flex items-center space-x-2 ${
              activeCategory === 'farmers'
                ? 'bg-green-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>🌾 Danh Sách Nhà Vườn</span>
          </button>
          <button
            onClick={() => {
              setActiveCategory('enterprises');
              setActiveEntProfileTab('info');
            }}
            className={`py-2 px-5 text-sm font-semibold rounded-xl transition-all flex items-center space-x-2 ${
              activeCategory === 'enterprises'
                ? 'bg-indigo-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>🏢 Doanh Nghiệp Thu Mua</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT PANEL: Filters and interactive sidebars depending on active category - 4 cols */}
        <div className="lg:col-span-4 space-y-6 text-left">
          {activeCategory === 'farmers' ? (
            /* GARDEN LISTS */
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-display font-semibold text-base text-slate-800 flex items-center space-x-2">
                <Filter className="w-5 h-5 text-green-600" />
                <span>Tìm Nguồn Cung Nhà Vườn</span>
              </h3>

              <div className="space-y-3.5">
                {/* Geographics */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 block uppercase">Địa hạt Tỉnh</label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-250 font-medium text-slate-700 focus:ring-1 focus:ring-green-600"
                  >
                    <option value="Tất cả">Tất cả tỉnh miền Tây</option>
                    <option value="Tiền Giang">Tiền Giang (Cai Lậy)</option>
                    <option value="Bến Tre">Bến Tre (Chợ Lách)</option>
                    <option value="Vĩnh Long">Vĩnh Long (Long Hồ)</option>
                    <option value="Cần Thơ">Cần Thơ (Phong Điền)</option>
                  </select>
                </div>

                {/* Varieties */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 block uppercase">Giống Sầu Riêng</label>
                  <select
                    value={selectedVariety}
                    onChange={(e) => setSelectedVariety(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-250 font-medium text-slate-700 focus:ring-1 focus:ring-green-600"
                  >
                    <option value="Tất cả">Tất cả chủng loại</option>
                    <option value="Ri6">Ri6 múi thon béo dẻo</option>
                    <option value="Monthong">Monthong cơm tấm lột trái</option>
                    <option value="Chuồng Bò">Chuồng Bò truyền thống béo nồng</option>
                    <option value="Musang King">Musang King quý tộc ngọt lịm</option>
                  </select>
                </div>

                {/* Harvesting Period */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 block uppercase">Tháng Dự Kiến Cắt</label>
                  <select
                    value={selectedHarvestTime}
                    onChange={(e) => setSelectedHarvestTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-250 font-medium text-slate-700 focus:ring-1 focus:ring-green-600"
                  >
                    <option value="Tất cả">Thời vụ gặt hái bất kỳ</option>
                    <option value="Tháng 6 - Tháng 7">Tháng 6 - Tháng 7 (Bắt đầu bói)</option>
                    <option value="Tháng 7 - Tháng 8">Tháng 7 - Tháng 8 (Rộ chín rộ)</option>
                    <option value="Tháng 8 - Tháng 9">Tháng 8 - Tháng 9 (Mùa muộn rực)</option>
                  </select>
                </div>

                {/* Standard quality certificates */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 block uppercase">Chứng chỉ bọc an toàn</label>
                  <select
                    value={selectedCert}
                    onChange={(e) => setSelectedCert(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-250 font-medium text-slate-700 focus:ring-1 focus:ring-green-600"
                  >
                    <option value="Tất cả">Không giới hạn điều kiện</option>
                    <option value="VietGAP">Đạt chuẩn an toàn VietGAP</option>
                    <option value="GlobalGAP">Chuẩn thị trường khó tính GlobalGAP</option>
                    <option value="Mã số vùng trồng">Có mã vùng đã cấp phép xuất khẩu</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 text-[10px] text-slate-400 font-sans flex items-center justify-between border-t border-slate-100">
                <span>Số vườn tìm thấy: <strong>{filteredFarmers.length}</strong></span>
                <button
                  onClick={() => {
                    setSelectedProvince('Tất cả');
                    setSelectedVariety('Tất cả');
                    setSelectedHarvestTime('Tất cả');
                    setSelectedCert('Tất cả');
                  }}
                  className="text-green-700 hover:underline font-bold"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          ) : (
            /* ENTERPRISES LISTS */
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-display font-semibold text-base text-slate-800 flex items-center space-x-2">
                <Filter className="w-5 h-5 text-indigo-600" />
                <span>Tìm Doanh Nghiệp Mua Cầu</span>
              </h3>

              <div className="space-y-3.5">
                {/* Certificate demanded */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 block uppercase">Yêu cầu chứng nhận tối thiểu</label>
                  <select
                    value={entSelectedCert}
                    onChange={(e) => setEntSelectedCert(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-250 font-medium text-slate-700 focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="Tất cả">Yêu cầu bất kỳ</option>
                    <option value="VietGAP">Bắt buộc từ VietGAP trở lên</option>
                    <option value="GlobalGAP">Bắt buộc GlobalGAP xuất ngoại</option>
                    <option value="Mã số vùng trồng">Bắt buộc có Mã vùng trồng</option>
                  </select>
                </div>

                {/* Target export markets */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 block uppercase">Quốc gia đích xuất khẩu</label>
                  <select
                    value={entSelectedMarket}
                    onChange={(e) => setEntSelectedMarket(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-250 font-medium text-slate-700 focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="Tất cả">Mọi thị trường luân chuyển</option>
                    <option value="Trung Quốc">Trung Quốc Đại Lục (Chính ngạch)</option>
                    <option value="Hoa Kỳ">Hoa Kỳ (FDA nghiêm tuyển)</option>
                    <option value="Singapore">Đông Nam Á (Singapore, Singapore Hub)</option>
                  </select>
                </div>

                {/* Purchasing Capacity */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 block uppercase">Quy mô thu mua tối thiểu</label>
                  <select
                    value={entSelectedCapacity}
                    onChange={(e) => setEntSelectedCapacity(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-250 font-medium text-slate-700 focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="Tất cả">Mọi sản lượng</option>
                    <option value="high">Săn gom lô cực lớn (&ge; 200 Tấn)</option>
                    <option value="low">Lập vựa gom gom trung bình (&lt; 200 Tấn)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 text-[10px] text-slate-400 font-sans flex items-center justify-between border-t border-slate-100">
                <span>Doanh nghiệp: <strong>{filteredEnterprises.length}</strong></span>
                <button
                  onClick={() => {
                    setEntSelectedCert('Tất cả');
                    setEntSelectedMarket('Tất cả');
                    setEntSelectedCapacity('Tất cả');
                  }}
                  className="text-indigo-700 hover:underline font-bold"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          )}

          {/* LISTS CARDS RESULTS RENDER (FARMERS / ENTERPRISES) */}
          <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
            {activeCategory === 'farmers' ? (
              /* Grow cards list */
              filteredFarmers.map((f) => {
                const isActive = f.id === selectedFarmerId;
                return (
                  <div
                    key={f.id}
                    onClick={() => {
                      setSelectedFarmerId(f.id);
                      setActiveProfileTab('info');
                    }}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'border-green-500 bg-green-50/25 ring-1 ring-green-400 shadow-xs'
                        : 'border-slate-205 bg-white hover:bg-slate-50/40'
                    }`}
                  >
                    <div className="flex items-start space-x-3 text-slate-800">
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-100/80 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold truncate max-w-[120px]">{f.name}</h4>
                          <span className="text-[9px] px-1.5 py-0.5 bg-green-100 text-green-800 font-bold rounded-md font-sans">
                            Sầu {f.variety}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{f.address}</p>

                        <div className="flex justify-between items-center text-[11px] text-slate-600 mt-3 border-t border-slate-100 pt-2 font-sans font-medium">
                          <span>Sản lượng: <strong className="text-slate-800 text-xs font-semibold">{f.expectedYield} tấn</strong></span>
                          <span className="flex items-center text-yellow-500 text-[10px] font-bold">
                            <Star className="w-3 h-3 fill-yellow-400 mr-0.5" />
                            <span>{f.creditScoreNumber}đ ({f.creditScore})</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Enterprise cards list */
              filteredEnterprises.map((e) => {
                const isActive = e.id === selectedEnterpriseId;
                return (
                  <div
                    key={e.id}
                    onClick={() => {
                      setSelectedEnterpriseId(e.id);
                      setActiveEntProfileTab('info');
                    }}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'border-indigo-500 bg-indigo-50/25 ring-1 ring-indigo-400 shadow-xs'
                        : 'border-slate-205 bg-white hover:bg-slate-50/40'
                    }`}
                  >
                    <div className="flex items-start space-x-3 text-slate-800">
                      <img
                        src={e.avatar}
                        alt={e.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-150 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold truncate max-w-[140px] text-slate-900">{e.name}</h4>
                          <span className="text-[9px] px-1.5 py-0.5 bg-indigo-100 text-indigo-800 font-bold rounded-md">
                            Cấp {e.creditScore}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">Đại diện: {e.representative}</p>

                        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-3 border-t border-slate-100 pt-2 font-sans font-medium">
                          <span>Nhu cầu: <strong className="text-indigo-950 font-bold text-xs">{e.demandVolume} Tấn</strong></span>
                          <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 border border-indigo-150 rounded">
                            {e.targetMarkets ? e.targetMarkets[0].split(' ')[0] : 'Xuất khẩu'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {activeCategory === 'farmers' && filteredFarmers.length === 0 && (
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center text-slate-400">
                <p className="text-xs font-semibold">Chưa tìm thấy nhà vườn thích hợp với bộ lọc.</p>
              </div>
            )}

            {activeCategory === 'enterprises' && filteredEnterprises.length === 0 && (
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center text-slate-400">
                <p className="text-xs font-semibold">Chưa tìm thấy tập đoàn/vựa xuất khẩu thích hợp với bộ lọc.</p>
              </div>
            )}
          </div>
        </div>

        {/* CENTER PANEL: Interactive Simulated SVG Delta maps - 4 cols */}
        <div className="lg:col-span-4 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between align-middle text-center text-white min-h-[500px] relative overflow-hidden">
          {/* Map Type toggle switcher */}
          <div className="flex bg-slate-900/90 p-1 rounded-xl border border-white/5 space-x-1 mb-2 backdrop-blur-md">
            <button
              onClick={() => setMapViewType('google')}
              className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                mapViewType === 'google'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🗺️ Google Maps Vệ Tinh
            </button>
            <button
              onClick={() => setMapViewType('blueprint')}
              className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                mapViewType === 'blueprint'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 Quy hoạch Vực Sầu Tây Nam
            </button>
          </div>

          <div className="z-10 bg-slate-900/70 p-3 rounded-xl border border-white/5 text-left text-[11px] space-y-1 backdrop-blur-md mb-2">
            <span className="font-bold text-yellow-400 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-ping mr-2"></span>
              <span>📍 {mapViewType === 'google' ? 'GOOGLE MY MAPS VECTOR VỰNG' : 'BẢN ĐỒ MẬT ĐỘ VÙNG CUNG'}</span>
            </span>
            <span className="text-[10px] text-slate-300 block leading-relaxed font-normal">
              {mapViewType === 'google'
                ? 'Nhúng địa chỉ GPS tuyệt đối vệ tinh của từng mã số vùng sầu riêng mương mán.'
                : 'Thống kê mật độ kết nối thu hoạch thực tế cho nhà nông.'}
            </span>
          </div>

          {/* Map drawing representation */}
          <div className="relative flex-grow flex items-center justify-center min-h-[310px] bg-slate-95s rounded-xl border border-slate-850 bg-slate-900/30 overflow-hidden">
            {mapViewType === 'google' ? (
              <div className="w-full h-full min-h-[310px]">
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=12_JUmA8uOz6Qhl8t8u82ejVxVSG7Zvg&ll=10.201555338170625%2C106.16404355000002&z=11"
                  className="w-full h-full min-h-[310px] border-none"
                  allowFullScreen
                  title="Google Custom Map VệTinh"
                ></iframe>
              </div>
            ) : (
              /* Beautiful Delta representation with reactive points */
              <svg viewBox="0 0 450 350" className="w-full max-w-[420px] h-auto drop-shadow-2xl">
                {/* Geometrics rivers & provinces */}
                {/* Tiền Giang backplane */}
                <path d="M 220,130 L 380,120 L 340,210 L 250,190 Z" fill="#15803d" fillOpacity="0.25" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
                <text x="310" y="145" fill="#fef08a" fontSize="10" fontWeight="bold" opacity="0.6">TIỀN GIANG</text>

                {/* Bến Tre backplane */}
                <path d="M 340,210 L 410,230 L 310,280 L 250,190 Z" fill="#16a34a" fillOpacity="0.3" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
                <text x="330" y="245" fill="#fef08a" fontSize="10" fontWeight="bold" opacity="0.6">BẾN TRE</text>

                {/* Vĩnh Long backplane */}
                <path d="M 150,160 L 250,190 L 310,280 L 180,240 Z" fill="#14532d" fillOpacity="0.3" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
                <text x="190" y="215" fill="#fef08a" fontSize="10" fontWeight="bold" opacity="0.6">VĨNH LONG</text>

                {/* Cần Thơ backplane */}
                <path d="M 60,220 L 150,160 L 180,240 L 100,290 Z" fill="#0f291b" fillOpacity="0.3" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 2" />
                <text x="115" y="250" fill="#fef08a" fontSize="10" fontWeight="bold" opacity="0.6">CẦN THƠ</text>

                {/* Draw links of supply flow chains */}
                <line x1="280" y1="190" x2="380" y2="70" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                <line x1="340" y1="170" x2="380" y2="70" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                <line x1="120" y1="230" x2="90" y2="260" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                <line x1="210" y1="220" x2="290" y2="230" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />

                {/* Render combined points */}
                {Object.entries(mapPoints).map(([id, pt]) => {
                  const isEnt = id.startsWith('e');
                  const isActive = isEnt
                    ? (activeCategory === 'enterprises' && id === selectedEnterpriseId)
                    : (activeCategory === 'farmers' && id === selectedFarmerId);

                  // Filter visibility check
                  let matches = false;
                  if (isEnt) {
                    matches = activeCategory === 'enterprises' && filteredEnterprises.some(ent => ent.id === id);
                  } else {
                    matches = activeCategory === 'farmers' && filteredFarmers.some(farm => farm.id === id);
                  }

                  return (
                    <g
                      key={id}
                      className="cursor-pointer"
                      onClick={() => {
                        if (isEnt) {
                          setActiveCategory('enterprises');
                          setSelectedEnterpriseId(id);
                          setActiveEntProfileTab('info');
                        } else {
                          setActiveCategory('farmers');
                          setSelectedFarmerId(id);
                          setActiveProfileTab('info');
                        }
                      }}
                      opacity={matches ? 1 : 0.3}
                    >
                      {/* Pulse circle path design */}
                      <circle
                        cx={pt.cx}
                        cy={pt.cy}
                        r={isActive ? 14 : 9}
                        fill="none"
                        stroke={isActive ? '#facc15' : pt.color}
                        strokeWidth="2.1"
                        className="animate-pulse"
                      />
                      {/* Central marker circle */}
                      <circle
                        cx={pt.cx}
                        cy={pt.cy}
                        r={isActive ? 7 : 5}
                        fill={isActive ? '#facc15' : pt.color}
                      />
                      {/* Identification Text */}
                      <text
                        x={pt.cx}
                        y={pt.cy - 16}
                        fill={isActive ? '#fbbf24' : '#ffffff'}
                        fontSize={isActive ? 9 : 8}
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        {pt.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}
          </div>

          {/* Map Legends */}
          <div className="z-10 bg-slate-900 border border-white/5 p-3 rounded-xl grid grid-cols-3 gap-2 text-[9px] font-sans text-left mt-1.5">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>Hộ vườn sầu riêng</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-505 inline-block" style={{ backgroundColor: '#8b5cf6' }}></span>
              <span>Doanh nghiệp mua</span>
            </div>
            <div className="flex items-center space-x-1.5 text-yellow-400">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
              <span>Đang chọn tiêu điểm</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Comprehensive detailed profiles (Symmetrical Gardener vs Enterprise) - 4 cols */}
        <div className="lg:col-span-12 xl:col-span-4 bg-white rounded-2xl border border-slate-205 p-5 flex flex-col justify-between text-left shadow-xs">
          {activeCategory === 'farmers' ? (
            /* ==============================================
               FARMER DETAILED PROFILE VIEW
               ============================================== */
            <div className="flex flex-col flex-1 justify-between space-y-6">
              {/* Profile Card Upper Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                  <img
                    src={selectedFarmer.avatar}
                    alt={selectedFarmer.name}
                    className="w-14 h-14 rounded-xl object-cover border border-green-500/20"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-semibold text-lg text-slate-800 leading-tight truncate">{selectedFarmer.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center mt-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1" />
                      <span>{selectedFarmer.address}</span>
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {selectedFarmer.certifications.map((ct, idx) => (
                        <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded font-semibold font-mono">
                          {ct}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* DIGITAL PASSPORT: "Mã số vùng trồng" & "Sổ điện tử" & "Điểm uy tín" */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50/70 p-4 rounded-xl border border-green-200/60 shadow-inner space-y-2.5 font-sans text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <div className="flex items-center space-x-1.5">
                      <QrCode className="w-4 h-4 text-green-700" />
                      <span className="font-bold text-green-950 font-display">HỘ SỔ TAY ĐIỆN TỬ VIETGAP</span>
                    </div>
                    <span className="text-[10px] bg-green-200/60 font-mono text-green-900 px-2 py-0.5 rounded-md font-bold">
                      ĐÃ LƯU TRỮ TRÊN LEDGER
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="bg-white p-2 rounded-lg border border-green-100">
                      <span className="text-slate-400 block text-[9px] font-bold">MÃ SỐ VÙNG TRỒNG GP</span>
                      <strong className="text-emerald-800 font-mono">TG-SG-C.L-00{selectedFarmer.id.slice(1) || '12'}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-green-100">
                      <span className="text-slate-400 block text-[9px] font-bold">SỐ HIỆU SỔ ĐIỆN TỬ</span>
                      <strong className="text-emerald-800 font-mono">PASSPORT-DURIAN-{selectedFarmer.id.toUpperCase()}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1.5">
                    <span className="text-slate-500">Tín nhiệm bảo chứng: <strong>{selectedFarmer.creditScore} ({selectedFarmer.creditScoreNumber}đ)</strong></span>
                    <span className="text-[10px] text-green-700 font-extrabold flex items-center">
                      <Check className="w-3.5 h-3.5 mr-0.5" /> Thống nhất chuẩn 100%
                    </span>
                  </div>
                </div>

                {/* Sub tab selectors */}
                <div className="flex bg-slate-100/90 p-0.5 border border-slate-200 rounded-xl">
                  {[
                    { id: 'info', label: 'Cực địa & Ảnh GĐ', icon: Eye },
                    { id: 'diary', label: 'Nhật ký canh tác', icon: BookOpen },
                    { id: 'transactions', label: 'Giao dịch cũ', icon: History }
                  ].map((subT) => {
                    const SIcon = subT.icon;
                    return (
                      <button
                        key={subT.id}
                        onClick={() => setActiveProfileTab(subT.id as any)}
                        className={`flex-1 py-1 px-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center space-x-1 ${
                          activeProfileTab === subT.id
                            ? 'bg-white text-green-700 shadow-xs border border-green-100'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <SIcon className="w-3.5 h-3.5" />
                        <span>{subT.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* SUB TAB VALUE CONTENTS */}
                <div className="min-h-[220px] font-sans text-xs">
                  {activeProfileTab === 'info' && (
                    <div className="space-y-4">
                      {/* STATS MATRIX */}
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block text-[9px] font-bold uppercase">Ủy quyền giống</span>
                          <strong className="text-slate-800 font-display">Sầu riêng {selectedFarmer.variety}</strong>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block text-[9px] font-bold uppercase">Diện tích mã số</span>
                          <strong className="text-slate-800 font-display">{selectedFarmer.area} Héc-ta (ha)</strong>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block text-[9px] font-bold uppercase">Sản lượng dự gieo</span>
                          <strong className="text-green-700 font-display">{selectedFarmer.expectedYield} Tấn chuẩn</strong>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block text-[9px] font-bold uppercase">Khung gặt dự kiến</span>
                          <strong className="text-slate-800 font-display">{selectedFarmer.harvestTime}</strong>
                        </div>
                      </div>

                      {/* STAGE PHOTO TIMELINE - "hình ảnh sầu riêng theo từng giai đoạn hình ảnh thực tế tại vườn" */}
                      <div className="space-y-2 border-t border-slate-100 pt-3">
                        <span className="text-xs font-bold text-slate-500 block uppercase">Ảnh chụp sinh trưởng giai đoạn mỏ hộc</span>
                        
                        <div className="relative rounded-xl overflow-hidden group h-32 bg-slate-900 border border-slate-200">
                          <img
                            src={growerGrowthStages[activeStageIdx].image}
                            alt={growerGrowthStages[activeStageIdx].name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-2 text-white">
                            <span className="text-[10px] font-bold text-yellow-405 block" style={{ color: '#fbbf24' }}>
                              {growerGrowthStages[activeStageIdx].name}
                            </span>
                            <span className="text-[9px] text-slate-300 block">{growerGrowthStages[activeStageIdx].desc}</span>
                          </div>
                        </div>

                        {/* Interactive Growth stages indicators buttons */}
                        <div className="grid grid-cols-4 gap-1 pt-1 text-[9px] font-serif">
                          {growerGrowthStages.map((stg, sIdx) => {
                            const isCur = sIdx === activeStageIdx;
                            return (
                              <button
                                key={sIdx}
                                onClick={() => setActiveStageIdx(sIdx)}
                                className={`p-1 text-center rounded border-b-2 font-sans font-bold transition-all ${
                                  isCur
                                    ? 'bg-green-50 text-green-700 border-green-600 font-black'
                                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                }`}
                              >
                                T-Gđ {sIdx + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProfileTab === 'diary' && (
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                      {selectedFarmer.diary.map((entry) => (
                        <div key={entry.id} className="p-2.5 bg-slate-50 border-l-2 border-green-600 rounded-r-xl space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-400 font-semibold font-sans">
                            <span>📅 Nguyệt: {entry.date}</span>
                            <span className="px-1.5 py-0.5 bg-green-200/50 text-green-900 rounded font-bold uppercase text-[8px]">
                              {entry.stage}
                            </span>
                          </div>
                          <p className="font-sans leading-normal font-medium text-slate-700">{entry.workDone}</p>
                          {entry.fertilizerUsed && (
                            <p className="text-[10.5px] font-bold text-green-800">🧪 Loại bón bồi: {entry.fertilizerUsed}</p>
                          )}
                          <p className="text-[9.5px] font-mono text-slate-500">Nước mương: {entry.waterAmount} - Khí: {entry.weather}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeProfileTab === 'transactions' && (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {selectedFarmer.transactions.length > 0 ? (
                        selectedFarmer.transactions.map((t) => (
                          <div key={t.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-150 text-[11px] space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-700 truncate max-w-[150px]">{t.enterpriseName}</span>
                              <span className="text-[9px] font-bold font-mono text-green-700 bg-green-100 px-1 border border-green-200 rounded uppercase">{t.status}</span>
                            </div>
                            <div className="space-y-0.5 text-slate-500 font-sans">
                              <p>Lượng: <strong className="text-slate-800">{t.volume} Tấn</strong> sầu gặt.</p>
                              <p>Giá hái: <strong className="text-slate-800">{t.pricePerKg.toLocaleString('vi-VN')} VND/kg</strong>, Thu: {t.date}</p>
                            </div>
                            {t.reviewEnterprise && (
                              <p className="text-[10px] italic border-t border-slate-200 pt-1 text-slate-600">
                                Evaluation: "{t.reviewEnterprise}"
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-slate-400 font-semibold pt-10">Chưa có lịch sử thu mua trên cổng bảo chứng.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Farmer connection submit footer action */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <a
                  href={`tel:${selectedFarmer.phone}`}
                  className="w-full justify-center inline-flex items-center py-2 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all font-sans"
                >
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  <span>Gọi Nhà Vườn ({selectedFarmer.phone})</span>
                </a>
                <button
                  onClick={() => onInitiateConnect(selectedFarmer)}
                  className="w-full justify-center inline-flex items-center py-2.5 px-4 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer font-sans"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-2" />
                  <span>Đặt Đặt Mua & Khởi Tạo Giao Dịch</span>
                </button>
              </div>
            </div>
          ) : (
            /* ==============================================
               ENTERPRISE DETAILED PROFILE VIEW (Symmetric)
               ============================================== */
            <div className="flex flex-col flex-1 justify-between space-y-6">
              {/* Profile Card Upper Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-4 border-b border-indigo-100">
                  <img
                    src={selectedEnterprise.avatar}
                    alt={selectedEnterprise.name}
                    className="w-14 h-14 rounded-xl object-cover border border-indigo-505/20 animate-spin-slow"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-semibold text-lg text-slate-800 leading-tight truncate">{selectedEnterprise.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center mt-1 truncate">
                      <Building className="w-3.5 h-3.5 text-indigo-500 mr-1" />
                      <span>{selectedEnterprise.representative} (Đại diện)</span>
                    </p>
                    <span className="inline-block mt-1 text-[9px] px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded font-bold uppercase font-mono">
                      Khớp mua sầu riêng
                    </span>
                  </div>
                </div>

                {/* DIGITAL PASSPORT: "Mã số doanh nghiệp", "Chứng chỉ xuất khẩu", "Điểm tín dụng" */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/40 p-4 rounded-xl border border-indigo-200/60 shadow-inner space-y-2.5 font-sans text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <div className="flex items-center space-x-1.5">
                      <QrCode className="w-4 h-4 text-indigo-700" />
                      <span className="font-bold text-indigo-950 font-display">CHỨNG CHỈ THỦ TỤC QUỐC TẾ</span>
                    </div>
                    <span className="text-[10px] bg-indigo-200/60 font-mono text-indigo-900 px-2 py-0.5 rounded-md font-bold uppercase">
                      Xác thực FDA
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="bg-white p-2 rounded-lg border border-indigo-100">
                      <span className="text-slate-400 block text-[9px] font-bold">MÃ DOANH NGHIỆP</span>
                      <strong className="text-indigo-800 font-mono">{selectedEnterprise.businessLicense || 'MSDN-0012-GDT'}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-indigo-100">
                      <span className="text-slate-400 block text-[9px] font-bold">TẦN SUẤT MUA SẮM</span>
                      <strong className="text-indigo-800 font-mono">&ge; {selectedEnterprise.demandVolume} Tấn/Mùa</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1.5">
                    <span className="text-slate-500">Tín nhiệm: <strong className="text-indigo-700 font-bold">{selectedEnterprise.creditScore} Hạng A</strong></span>
                    <span className="text-[10px] text-indigo-600 font-extrabold flex items-center">
                      <Check className="w-3.5 h-3.5 mr-0.5" /> Có kho lạnh móng sâu
                    </span>
                  </div>
                </div>

                {/* Sub tab selectors of enterprise */}
                <div className="flex bg-slate-100/90 p-0.5 border border-slate-200 rounded-xl">
                  {[
                    { id: 'info', label: 'Hồ sơ & Kho bãi', icon: Eye },
                    { id: 'diary', label: 'Bản tin mua sắm', icon: BookOpen },
                    { id: 'transactions', label: 'Lịch sử thâu mua', icon: History }
                  ].map((subT) => {
                    const SIcon = subT.icon;
                    return (
                      <button
                        key={subT.id}
                        onClick={() => setActiveEntProfileTab(subT.id as any)}
                        className={`flex-1 py-1 px-1.5 rounded-lg text-[10.5px] font-bold transition-all flex items-center justify-center space-x-1 ${
                          activeEntProfileTab === subT.id
                            ? 'bg-white text-indigo-700 shadow-xs border border-indigo-100'
                            : 'text-slate-500 hover:text-slate-805'
                        }`}
                      >
                        <SIcon className="w-3.5 h-3.5" />
                        <span>{subT.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* COMPONENT SUB TAB OF ENTERPRISE */}
                <div className="min-h-[220px] font-sans text-xs">
                  {activeEntProfileTab === 'info' && (
                    <div className="space-y-4">
                      {/* STATS MATRIX */}
                      <div className="space-y-2.5">
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <span className="text-slate-400 block text-[9px] font-bold uppercase">Hạ tầng chuỗi lạnh bảo quản sầu</span>
                          <p className="text-slate-700 font-medium font-sans leading-relaxed text-[11px] mt-0.5">
                            {selectedEnterprise.coldChainCapacity || 'Kho bãi trung chuyển hạ nhiệt lạnh sâu 0-4 độ C, bảo dưỡng hộc gai tơi bói dẻo.'}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[10px]">
                            <span className="text-slate-400 block text-[9.5px] font-bold uppercase">Chứng nhận quốc tế</span>
                            {selectedEnterprise.exportCertificates ? (
                              <ul className="list-disc list-inside text-slate-700 pl-1 font-semibold space-y-0.5">
                                {selectedEnterprise.exportCertificates.slice(0, 2).map((c, i) => <li key={i} className="truncate">{c}</li>)}
                              </ul>
                            ) : (
                              <span className="font-semibold text-slate-800">HACCP, ISO 22000</span>
                            )}
                          </div>

                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[10px]">
                            <span className="text-slate-400 block text-[9.5px] font-bold uppercase">Thị trường xuất khẩu</span>
                            {selectedEnterprise.targetMarkets ? (
                              <ul className="list-disc list-inside text-slate-700 pl-1 font-semibold space-y-0.5">
                                {selectedEnterprise.targetMarkets.slice(0, 2).map((m, i) => <li key={i} className="truncate">{m.split(' ')[0]}</li>)}
                              </ul>
                            ) : (
                              <span className="font-semibold text-slate-850">Trung Quốc, Mỹ</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* WORKHOUSE PHOTO PREVIEWS */}
                      <div className="space-y-2 border-t border-slate-100 pt-3">
                        <span className="text-xs font-bold text-slate-500 block uppercase">Hình ảnh trạm thu gom & đóng gói mẫu</span>
                        <img
                          src={selectedEnterprise.packingPhotos ? selectedEnterprise.packingPhotos[0] : 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=350&sig=mapfallback'}
                          alt="Warehouse loading station inspection"
                          className="w-full h-24 object-cover rounded-xl border border-slate-205"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}

                  {activeEntProfileTab === 'diary' && (
                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {/* BUYING LEDGER ENTRIES */}
                      {selectedEnterprise.buyingDiary ? (
                        selectedEnterprise.buyingDiary.map((item, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-50 border-l-2 border-indigo-600 rounded-r-xl space-y-1">
                            <span className="text-[10px] text-slate-400 font-semibold block">📋 Bản tin mua:</span>
                            <p className="font-sans leading-normal font-medium text-slate-700">{item}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-slate-450 pt-10 font-sans font-semibold">Chưa thiết lập nhật ký giao thương điện tử.</p>
                      )}
                    </div>
                  )}

                  {activeEntProfileTab === 'transactions' && (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {selectedEnterprise.transactions.length > 0 ? (
                        selectedEnterprise.transactions.map((tx) => (
                          <div key={tx.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-150 text-[11px] space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-700 truncate max-w-[150px]">Lấy sầu: {tx.farmerName}</span>
                              <span className="text-[9px] font-bold font-mono text-indigo-700 bg-indigo-100 px-1 border border-indigo-190 rounded uppercase">Giao xong</span>
                            </div>
                            <div className="space-y-0.5 text-slate-500 font-sans">
                              <p>Lượng chốt: <strong className="text-slate-850">{tx.volume} Tấn sầu chín</strong></p>
                              <p>Giá trung bình: <strong className="text-indigo-805 font-bold">{tx.pricePerKg.toLocaleString('vi-VN')} VND/kg</strong></p>
                            </div>
                            {tx.reviewFarmer && (
                              <p className="text-[10px] italic border-t border-slate-200 pt-1 text-slate-650">
                                Đánh giá của DN: "{tx.reviewFarmer}"
                              </p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-slate-400 font-semibold pt-10">Chưa ghi dịch thành khoản.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Proactive Farmer To Enterprise Connect Footer actions -> allows farmer to actively initiate! */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <a
                  href={`tel:${selectedEnterprise.phone}`}
                  className="w-full justify-center inline-flex items-center py-2 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all font-sans"
                >
                  <Phone className="w-3.5 h-3.5 mr-2" />
                  <span>Gọi Liên Hệ Doanh Nghiệp ({selectedEnterprise.phone})</span>
                </a>
                <button
                  onClick={() => handleProactiveConnectToEnterprise(selectedEnterprise)}
                  className="w-full justify-center inline-flex items-center py-2.5 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer font-sans"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-2 animate-bounce" />
                  <span>Chủ Động Chào Hàng Vườn & Liên Kết</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
