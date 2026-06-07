/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, ShieldCheck, MapPin, Handshake, ArrowRight, Award, Flame, Users, Calendar, Sparkles, Star, ChevronRight, Check, Search, Filter, Grid, AlertTriangle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import DurianMap from './components/DurianMap';
import ForecastReport from './components/ForecastReport';
import Marketplace from './components/Marketplace';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import ToastNotification from './components/ToastNotification';
import LiveChatSupport from './components/LiveChatSupport';
import NewsMarket from './components/NewsMarket';
import HetSauPay from './components/HetSauPay';
import { AGRICULTURAL_PRODUCTS, FARMING_EXPERTISE, MOCK_FARMERS } from './data';
import { Role, FarmerProfile } from './types';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('trang_chu');

  // Authentication State
  const [userRole, setUserRole] = useState<Role>('giao_dien_ngoai');
  const [userName, setUserName] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState<boolean>(false);

  // Cross-page connection handler: passing designated farmer from Map page to Marketplace connect initiation
  const [initiatedFarmer, setInitiatedFarmer] = useState<FarmerProfile | null>(null);

  // Homepage Search and filter states for Farmer agricultural listings
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVariety, setSelectedVariety] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedHarvestTime, setSelectedHarvestTime] = useState<string>('');
  const [selectedFarmerForDiary, setSelectedFarmerForDiary] = useState<FarmerProfile | null>(null);

  // Image report states
  const [reportingFarm, setReportingFarm] = useState<FarmerProfile | null>(null);
  const [reportReason, setReportReason] = useState<string>('sai_anh');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  // Compute filtered growers
  const filteredFarmers = useMemo(() => {
    return MOCK_FARMERS.filter(farm => {
      // 1. Keyword search check (name or address)
      const matchesKeyword = searchQuery.trim() === '' || 
        farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farm.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Variety match
      const matchesVariety = selectedVariety === '' || farm.variety === selectedVariety;
      
      // 3. Province geographic match
      const matchesProvince = selectedProvince === '' || farm.province === selectedProvince;
      
      // 4. Expected Harvest season match
      const matchesHarvest = selectedHarvestTime === '' || farm.harvestTime === selectedHarvestTime;

      return matchesKeyword && matchesVariety && matchesProvince && matchesHarvest;
    });
  }, [searchQuery, selectedVariety, selectedProvince, selectedHarvestTime]);

  // Handle successful sign in
  const handleAuthSuccess = (name: string, role: Role) => {
    setUserName(name);
    setUserRole(role);
    setShowAuth(false);
    // Auto navigate to dashboard when logging in
    setActiveTab('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setUserName(null);
    setUserRole('giao_dien_ngoai');
    setActiveTab('trang_chu');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Dynamic Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        userName={userName}
        onLogout={handleLogout}
        onOpenAuth={() => setShowAuth(true)}
      />

      {/* Main Pages Router with animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'trang_chu' && (
            <motion.div
              id="page-home"
              key="trang_chu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 pb-20"
            >
              {/* 1. HERO SECTION WITH IMAGE POSTER BACKGROUND & ADVANTAGES */}
              <Hero
                onSearchSupply={() => setActiveTab('ban_do')}
                onRegisterFarm={() => {
                  if (userName) {
                    setActiveTab('dashboard');
                  } else {
                    setShowAuth(true);
                  }
                }}
              />

              {/* 1.5. TÌM KIẾM VÀ BỘ LỌC NGUỒN CUNG NÔNG SẢN CHUYÊN SÂU */}
              <section id="homepage-search-filter-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8 scroll-mt-20">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-2.5 py-1 rounded-full">
                    Giao Dịch Trực Tiếp - Bảo Chứng Vàng
                  </span>
                  <h2 className="font-display font-medium text-3xl text-slate-900 tracking-tight">
                    Tìm Kiếm Nguồn Cung Sầu Riêng Sẵn Thu Hoạch
                  </h2>
                  <p className="text-slate-500 font-sans text-sm">
                    Sử dụng công nghệ lọc số thông minh để tìm kiếm nhanh theo giống quả sầu riêng, khu vực địa lý, và thời gian thu hoạch dự kiến.
                  </p>
                </div>

                {/* Filter Toolbar Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-green-50 text-green-700 rounded-xl">
                        <Filter className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-slate-800">
                          Bộ Lọc Khớp Nguồn Cung Thông Minh
                        </h3>
                        <p className="text-[11px] text-slate-500 font-sans">
                          Khai thác dữ liệu bản đồ để tìm nguồn cung nông sản phù hợp nhất với tiêu chí thu mua của bạn.
                        </p>
                      </div>
                    </div>
                    {/* Active results indicators */}
                    <span className="text-xs bg-green-50 text-green-800 font-bold font-sans p-1.5 px-3.5 rounded-full border border-green-200">
                      Sẵn sàng: <strong className="text-green-950 font-black">{filteredFarmers.length} nhà vườn</strong>
                    </span>
                  </div>

                  {/* Inputs grid layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                    {/* Search Field */}
                    <div className="space-y-1.5">
                      <label className="text-slate-500 font-bold block flex items-center space-x-1">
                        <Search className="w-3.5 h-3.5 text-slate-400" />
                        <span>Từ khóa tìm kiếm</span>
                      </label>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tên vườn, Long Hồ, Cai Lậy..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded-xl outline-none focus:ring-1 focus:ring-green-600 focus:bg-white transition-all text-slate-850 font-medium font-sans"
                      />
                    </div>

                    {/* Variety Filter option */}
                    <div className="space-y-1.5">
                      <label className="text-slate-500 font-bold block">Giống sầu riêng</label>
                      <select
                        value={selectedVariety}
                        onChange={(e) => setSelectedVariety(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded-xl outline-none focus:ring-1 focus:ring-green-600 focus:bg-white transition-all text-slate-850 font-medium"
                      >
                        <option value="">-- Tất cả giống sầu --</option>
                        <option value="Ri6">Sầu riêng Ri6</option>
                        <option value="Monthong">Sầu riêng Monthong (Thái)</option>
                        <option value="Chuồng Bò">Sầu riêng Chuồng Bò</option>
                        <option value="Musang King">Sầu riêng Musang King</option>
                      </select>
                    </div>

                    {/* Geography/Province Filter option */}
                    <div className="space-y-1.5">
                      <label className="text-slate-500 font-bold block">Khu vực địa lý (Tỉnh)</label>
                      <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded-xl outline-none focus:ring-1 focus:ring-green-600 focus:bg-white transition-all text-slate-850 font-medium"
                      >
                        <option value="">-- Tất cả khu vực --</option>
                        <option value="Tiền Giang">Tiền Giang (nôi sầu Cái Lậy)</option>
                        <option value="Bến Tre">Bến Tre (Cổ truyền Chợ Lách)</option>
                        <option value="Vĩnh Long">Vĩnh Long (sông nước Long Hồ)</option>
                        <option value="Cần Thơ">Cần Thơ (vùng bồi Mỹ Khánh)</option>
                      </select>
                    </div>

                    {/* Harvest times Filter option */}
                    <div className="space-y-1.5">
                      <label className="text-slate-500 font-bold block">Thời gian thu hoạch dự kiến</label>
                      <select
                        value={selectedHarvestTime}
                        onChange={(e) => setSelectedHarvestTime(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-250 rounded-xl outline-none focus:ring-1 focus:ring-green-600 focus:bg-white transition-all text-slate-850 font-medium"
                      >
                        <option value="">-- Tất cả thời điểm gặt bói --</option>
                        <option value="Tháng 6 - Tháng 7">Tháng 6 - Tháng 7</option>
                        <option value="Tháng 7 - Tháng 8">Tháng 7 - Tháng 8</option>
                        <option value="Tháng 8 - Tháng 9">Tháng 8 - Tháng 9</option>
                      </select>
                    </div>
                  </div>

                  {/* Clean Filter Trigger Button */}
                  {(searchQuery || selectedVariety || selectedProvince || selectedHarvestTime) && (
                    <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-4">
                      <p className="text-slate-400 font-medium">Bấm xóa để hủy tất cả bộ lọc hoạt động</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedVariety('');
                          setSelectedProvince('');
                          setSelectedHarvestTime('');
                        }}
                        className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg transition-colors cursor-pointer border border-red-200 flex items-center space-x-1"
                      >
                        <span>✕ Xóa bộ lọc hiện hành</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Farmer/Crop listings grid displays */}
                {filteredFarmers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                    {filteredFarmers.map((farm) => (
                      <div
                        id={`home-crop-card-${farm.id}`}
                        key={farm.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-1 duration-300 bg-gradient-to-b from-white to-slate-50/20"
                      >
                        <div>
                          {/* Status Label above cover image */}
                          <div className={`px-4 py-2 font-mono font-bold text-[10.5px] uppercase tracking-wider flex items-center gap-1.5 border-b text-left ${
                            farm.status === 'Sắp thu hoạch' ? 'bg-amber-500/10 text-amber-800 border-amber-500/20' :
                            farm.status === 'Đã chốt bao tiêu' ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' :
                            'bg-sky-500/10 text-sky-800 border-sky-500/20'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              farm.status === 'Sắp thu hoạch' ? 'bg-amber-500 animate-pulse' :
                              farm.status === 'Đã chốt bao tiêu' ? 'bg-emerald-500' :
                              'bg-sky-500 animate-pulse'
                            }`}></span>
                            <span>Trạng thái: <span className="font-extrabold">{farm.status || 'Đang chăm sóc'}</span></span>
                          </div>

                          {/* Garden Landscape Cover Image */}
                          <div className="h-44 relative overflow-hidden bg-slate-100">
                            <img
                              src={farm.gardenImage}
                              alt={farm.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Variety Category Tag */}
                            <div className="absolute top-4 left-4 bg-green-900 border border-green-700 text-white font-mono font-bold text-[9.5px] p-1 px-2 rounded-lg shadow-sm">
                              SẦU {farm.variety.toUpperCase()}
                            </div>

                            {/* Credit ratings badge */}
                            <div className="absolute top-4 right-4 bg-slate-900/85 text-white font-mono font-bold text-[10px] p-1 px-2.5 rounded-lg border border-slate-700 flex items-center space-x-1 shadow-sm">
                              <span className="text-slate-450 text-[8px] font-semibold">UY TÍN:</span>
                              <span className="text-yellow-400 font-black">{farm.creditScore}</span>
                            </div>

                            {/* Province location tag */}
                            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-slate-950 border border-slate-200 font-bold text-[10px] p-1 px-2 rounded-md shadow-xs flex items-center space-x-1">
                              <MapPin className="w-3.5 h-3.5 text-rose-600" />
                              <span>{farm.province}</span>
                            </div>

                            {/* Report Image Button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setReportingFarm(farm);
                                setReportReason('sai_anh');
                                setReportDescription('');
                                setReportSuccess(false);
                              }}
                              className="absolute bottom-3 right-3 bg-red-650 hover:bg-red-700 active:scale-95 text-white font-bold text-[9.5px] p-1 px-2 rounded-md shadow-xs flex items-center space-x-1 border border-red-500/30 transition-all cursor-pointer pointer-events-auto"
                              title="Báo cáo ảnh nông sản này bị sai hoặc lỗi hiển thị"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              <span>Báo cáo ảnh</span>
                            </button>
                          </div>

                          {/* Crop Details Description content */}
                          <div className="p-5 text-left space-y-3.5">
                            <div>
                              <h4 className="font-display font-bold text-base text-slate-850 truncate leading-snug">
                                {farm.name}
                              </h4>
                              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{farm.address}</p>
                            </div>

                            {/* Specifications listed vertically with prominent icons */}
                            <div className="space-y-2.5 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200/80 text-[11.5px] font-sans">
                              {/* 1. Diện tích */}
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shrink-0">
                                  <Grid className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 flex justify-between items-center min-w-0">
                                  <span className="text-slate-500 font-medium whitespace-nowrap">Quy mô diện tích</span>
                                  <strong className="text-slate-800 font-bold">{farm.area} Hécta</strong>
                                </div>
                              </div>

                              {/* 2. Sản lượng */}
                              <div className="flex items-center gap-3 border-t border-slate-100 pt-2.5">
                                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
                                  <Sprout className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 flex justify-between items-center min-w-0">
                                  <span className="text-slate-500 font-medium whitespace-nowrap">Sản lượng dự tính</span>
                                  <strong className="text-emerald-800 font-extrabold">{farm.expectedYield} Tấn</strong>
                                </div>
                              </div>

                              {/* 3. Thời điểm thu hoạch */}
                              <div className="flex items-center gap-3 border-t border-slate-100 pt-2.5">
                                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 shrink-0">
                                  <Calendar className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 flex justify-between items-center min-w-0">
                                  <span className="text-slate-500 font-medium whitespace-nowrap">Thời điểm thu hoạch</span>
                                  <strong className="text-slate-700 font-bold">{farm.harvestTime}</strong>
                                </div>
                              </div>
                            </div>

                            {/* Certifications row list */}
                            <div className="flex flex-wrap gap-1">
                              {farm.certifications.map((ct, idx) => (
                                <span key={idx} className="bg-emerald-50 text-[9px] font-bold text-emerald-800 p-0.5 px-2 rounded border border-emerald-200 uppercase tracking-wide">
                                  ✓ {ct}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Card interactions area */}
                        <div className="p-5 pt-0 bg-white border-t border-slate-100 grid grid-cols-2 gap-3 pt-4">
                          <button
                            id={`read-diary-home-btn-${farm.id}`}
                            onClick={() => setSelectedFarmerForDiary(farm)}
                            className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-xl cursor-pointer transition-colors text-center"
                          >
                            Nhật Ký Canh Tác
                          </button>
                          <button
                            id={`connect-lead-home-btn-${farm.id}`}
                            onClick={() => {
                              setInitiatedFarmer(farm);
                              setActiveTab('san_giao_dich');
                            }}
                            className="py-2 px-3 bg-green-700 hover:bg-green-800 text-white font-bold text-[11px] rounded-xl cursor-pointer transition-all text-center hover:scale-[1.02]"
                          >
                            Bao Tiêu Đóng Cọc
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-350 p-12 rounded-3xl bg-slate-50/50 text-center max-w-md mx-auto space-y-3 font-sans">
                    <span className="text-2xl block">⚠️</span>
                    <strong className="text-slate-800 text-sm block">Không tìm thấy vườn sầu riêng nào tương ứng!</strong>
                    <p className="text-xs text-slate-450">Vui lòng tinh chỉnh lại bộ lọc giống sầu, địa hạt sông nước Tây Nam Bộ hoặc từ khóa cần tìm.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedVariety('');
                        setSelectedProvince('');
                        setSelectedHarvestTime('');
                      }}
                      className="py-2 px-4 bg-green-700 text-white font-bold rounded-xl text-xs hover:bg-green-850 cursor-pointer"
                    >
                      Thiết lập lại bộ lọc
                    </button>
                  </div>
                )}
              </section>

              {/* 2. CROP CATEGORIES / AGRICULTURAL LIST (DANH MỤC NÔNG SẢN) */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest bg-green-100/80 px-2.5 py-1 rounded-full">
                    Sản Vật Thượng Hạng miền Tây
                  </span>
                  <h2 className="font-display font-medium text-3xl text-slate-900 tracking-tight">
                    Danh Mục Giống Sầu Riêng Xuất Khẩu Trọng Điểm
                  </h2>
                  <p className="text-slate-500 font-sans text-sm">
                    Khám phá đặc trưng cơm múi, độ béo ráo dẻo và phân khúc giá trị thương mại quốc tế của sầu riêng đồng bằng Sông Cửu Long.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {AGRICULTURAL_PRODUCTS.map((prod) => (
                    <div
                      id={`crop-card-${prod.id}`}
                      key={prod.id}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-green-400 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Image banner crop */}
                        <div className="h-44 relative overflow-hidden bg-slate-100">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 bg-green-700 text-white text-[10px] p-1 px-2 rounded-md font-bold uppercase tracking-wider font-mono">
                            Chính Ngạch
                          </div>
                        </div>

                        {/* Text values */}
                        <div className="p-5 text-left space-y-3">
                          <h3 className="font-display font-semibold text-lg text-slate-800 leading-tight">
                            {prod.name}
                          </h3>
                          <p className="text-green-700 text-xs font-bold font-sans">
                            Giá ước: {prod.priceRange}
                          </p>
                          <p className="text-slate-500 text-xs font-sans leading-relaxed min-h-[64px]">
                            {prod.description}
                          </p>
                        </div>
                      </div>

                      {/* Characteristics listed neatly */}
                      <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-2.5 text-left bg-slate-50/40">
                        <span className="text-[9px] font-bold text-slate-400 block pt-3 uppercase tracking-wider">Đặc tính múi:</span>
                        <div className="space-y-1 text-[11px] text-slate-500 font-sans font-medium">
                          {prod.characteristics.slice(0, 3).map((char, i) => (
                            <div key={i} className="flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                              <span>{char}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. CORE OPERATIONAL workflow (5 stages preview) */}
              <section className="bg-gradient-to-br from-emerald-800 to-green-950 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-yellow-300 text-[10px] font-bold uppercase tracking-widest block font-mono">Giải Pháp Mũi Nhọn Số</span>
                    <h2 className="font-display font-medium text-3xl text-white">Quy Trình 5 Bước Vận Hành & Khớp Nhu Cầu</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
                    {[
                      { step: '01', title: 'Thu Thập Số Liệu', desc: 'Bà con khai báo số lượng, giống sầu riêng và ngày xả nhụy hoa sầu.' },
                      { step: '02', title: 'Bản Đồ Nguồn Cung', desc: 'Hiển thị mật độ cung sầu riêng thực tế theo từng mường sông Nam Bộ.' },
                      { step: '03', title: 'Dự Báo Sản Lượng', desc: 'Tính toán biểu đồ chín sầu theo tháng dự phòng đợt dội giá dồn ứ.' },
                      { step: '04', title: 'Khớp Đối Tác', desc: 'Sắp xếp danh gia nhà vườn với nhu cầu bọc đóng xuất của khách mua.' },
                      { step: '05', title: 'Ký Kế Giao Điện', desc: 'Ký số thỏa thuận bao tiêu đúng giá trị, giảm 40% trung gian hao tổn.' },
                    ].map((step, idx) => (
                      <div key={idx} className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/50 space-y-3 flex flex-col justify-between">
                        <span className="font-display font-bold text-3xl text-green-400 block">{step.step}</span>
                        <div className="space-y-1">
                          <h4 className="font-sans font-bold text-sm text-slate-100">{step.title}</h4>
                          <p className="text-slate-400 text-xs leading-relaxed font-sans">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 4. INTRO SECTION WITH BRAND ILLUSTRATION */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
                <div className="lg:col-span-5 relative order-2 lg:order-1">
                  <img
                    src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800"
                    alt="Sầu riêng xuất khẩu logistics"
                    className="rounded-3xl shadow-lg w-full max-h-[350px] object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 -right-4 bg-slate-900 text-white p-3.5 rounded-2xl shadow-md border border-slate-800 text-xs font-sans z-20 flex flex-col items-start">
                    <span className="text-[10px] text-green-400 block font-bold uppercase tracking-wider">Hạt tiêu cơm béo 9/10</span>
                    <strong className="text-sm mt-0.5 font-display">Monthong Hoàn Hảo</strong>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                  <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest bg-green-100/80 px-2.5 py-1 rounded-full">
                    Sứ Mệnh Đồng Hành
                  </span>
                  <p className="font-serif italic text-2xl text-slate-700 tracking-tight leading-snug">
                    "Góp một bàn tay số hóa vùng trồng – Vực dậy chiếc nôi sầu riêng chín muồi miền Tây."
                  </p>
                  <p className="text-slate-500 font-sans text-sm leading-relaxed">
                    Dự án Nhà nông Hết Sầu ra đời từ sự trăn trở của những kỹ sư nông nghiệp khao khát ứng dụng chuyển đổi số thực tế. Chúng tôi tin rằng bằng sự minh bạch dữ liệu, nông dân sẽ không bao giờ lo thương lái bỏ cọc, ép giá khi rộ mùa gặt, sầu riêng Việt sẽ sánh vai cùng thương phẩm ngoại.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 px-2 bg-green-50 text-green-700 rounded-lg font-bold text-xs">
                        ✓
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-sm text-slate-850 font-sans block">Sổ Nhật Ký Canh Tác Sạch</strong>
                        <p className="text-xs text-slate-400 font-sans">Lưu giữ toàn trình ngày xịt Canxi bón phân hữu cơ chuẩn ráo.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <div className="p-1 px-2 bg-green-50 text-green-700 rounded-lg font-bold text-xs">
                        ✓
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-sm text-slate-850 font-sans block">Bao Tiêu Ký Điện Tử</strong>
                        <p className="text-xs text-slate-400 font-sans">Hợp đồng pháp lý số bảo chứng an toàn cọc 30% tại chân vườn.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    id="find-about-more-btn"
                    onClick={() => setActiveTab('gioi_thieu')}
                    className="inline-flex items-center text-green-700 font-bold hover:underline font-sans text-sm"
                  >
                    <span>Khám phá Mô hình Business Model Canvas</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'ban_do' && (
            <motion.div
              id="page-map"
              key="ban_do"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DurianMap
                onInitiateConnect={(farmer) => {
                  setInitiatedFarmer(farmer);
                  setActiveTab('san_giao_dich');
                }}
              />
            </motion.div>
          )}

          {activeTab === 'du_bao' && (
            <motion.div
              id="page-forecast"
              key="du_bao"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ForecastReport />
            </motion.div>
          )}

          {activeTab === 'san_giao_dich' && (
            <motion.div
              id="page-marketplace"
              key="san_giao_dich"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Marketplace
                userRole={userRole}
                initiatedFarmerSelection={initiatedFarmer}
                clearInitiatedFarmerSelection={() => setInitiatedFarmer(null)}
              />
            </motion.div>
          )}

          {activeTab === 'tin_tuc' && (
            <motion.div
              id="page-news"
              key="tin_tuc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NewsMarket />
            </motion.div>
          )}

          {activeTab === 'thanh_toan' && (
            <motion.div
              id="page-payment"
              key="thanh_toan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HetSauPay />
            </motion.div>
          )}

          {activeTab === 'gioi_thieu' && (
            <motion.div
              id="page-about"
              key="gioi_thieu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AboutSection />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              id="page-dashboard"
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard userRole={userRole} userName={userName} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-850 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Logo brand */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-base">Hệ Sinh Thái Nhà Nông Hết Sầu</h4>
            <p className="leading-relaxed">
              Giải pháp bản đồ nhiệt và bao tiêu thu mua sầu riêng chính ngạch toàn miền cực kỳ chuẩn xác, nâng cao uy tín cho nông sản Việt.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-200">Bản Đồ Nguồn Cung</h5>
            <ul className="space-y-1 text-slate-400">
              <li><button onClick={() => setActiveTab('ban_do')} className="hover:text-green-400">Đặc khu Tiền Giang</button></li>
              <li><button onClick={() => setActiveTab('ban_do')} className="hover:text-green-400">Đặc khu Bến Tre</button></li>
              <li><button onClick={() => setActiveTab('ban_do')} className="hover:text-green-400">Đặc khu Vĩnh Long</button></li>
            </ul>
          </div>

          {/* Contact Details from image */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-200">Thông Tin Liên Hệ</h5>
            <p className="leading-relaxed">
              Địa chỉ: Vùng sầu huyện Cai Lậy, Tỉnh Tiền Giang<br />
              Email: contact@nhanonghetsau.vn<br />
              Hotline hỗ trợ: 0982 907 018
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-slate-200">Được Bảo Trợ Bởi</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li>• Chi cục Trồng trọt và Bảo vệ thực vật Tây Nam Bộ</li>
              <li>• Hiệp hội xuất khẩu Rau quả Việt Nam Vinafruit</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800 text-center text-slate-500">
          <p>© 2026 nhanonghetsau.vn. Kết nối giá trị – Kiến tạo tương lai nông nghiệp Việt.</p>
        </div>
      </footer>

      {/* Auth Modal Split Screen View */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onLoginSuccess={handleAuthSuccess}
        />
      )}

      {/* Floating real-time warning & transaction updates */}
      <ToastNotification />

      {/* Floating Global 24/7 Live Chat Support Assistant */}
      <LiveChatSupport />

      {/* CULTIVATION DIARY MODAL POPUP FOR HOME PAGE */}
      {selectedFarmerForDiary && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-900 to-green-800 p-5 text-white flex justify-between items-center bg-green-800">
              <div className="text-left space-y-1">
                <span className="text-[10px] bg-white/20 text-yellow-300 font-mono font-bold px-2.5 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
                  Sổ Điện Tử Vườn Gốc
                </span>
                <h4 className="font-display font-bold text-lg">
                  Nhật Ký Canh Tác Hữu Cơ: {selectedFarmerForDiary.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedFarmerForDiary(null)}
                className="p-1 px-2.5 hover:bg-white/10 text-white rounded-xl transition-colors cursor-pointer text-sm font-black"
                title="Đóng nhật ký"
              >
                ✕
              </button>
            </div>

            {/* Content Lists */}
            <div className="p-6 overflow-y-auto space-y-5 text-left flex-1 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-4 text-xs font-sans bg-white p-4 rounded-2xl border border-slate-150">
                <div>
                  <span className="text-slate-400 block font-semibold">Địa bàn vườn sầu:</span>
                  <strong>{selectedFarmerForDiary.address}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Giống quả chăm sóc:</span>
                  <strong>Sầu riêng {selectedFarmerForDiary.variety} (Chuẩn {selectedFarmerForDiary.certifications.join(', ')})</strong>
                </div>
              </div>

              <h5 className="font-display font-semibold text-slate-800 text-sm flex items-center gap-1.5 border-b border-rose-100 pb-2">
                <span className="p-1 px-2 bg-green-100 text-green-700 rounded-lg text-xs font-mono">LOGS</span>
                <span>Hoạt Động Ghi Chép Nhật Ký Điện Tử Theo Kỳ Sinh Trưởng</span>
              </h5>

              <div className="space-y-4 font-sans">
                {selectedFarmerForDiary.diary.map((log) => (
                  <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-150 shadow-xs space-y-2.5 relative">
                    {/* Date & Stage Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-500 font-mono">{log.date}</span>
                      <span className="inline-flex items-center text-[10px] text-green-700 font-bold px-2 py-0.5 bg-green-50 rounded-md border border-green-200">
                        Kỳ: {log.stage}
                      </span>
                    </div>

                    {/* Work done */}
                    <p className="text-[12px] text-slate-700 font-sans leading-relaxed">
                      📝 <strong>Nhiệm vụ:</strong> {log.workDone}
                    </p>

                    {/* Technical Specs */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-sans">
                      <div>
                        <span className="text-slate-400 font-semibold block">Lượng nước tưới:</span>
                        <strong>{log.waterAmount}</strong>
                      </div>
                      {log.fertilizerUsed && (
                        <div>
                          <span className="text-slate-400 font-semibold block">Dùng phân organic:</span>
                          <strong>{log.fertilizerUsed}</strong>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <p className="text-[11px] text-slate-500 font-sans leading-normal italic">
                      * <strong>Ghi nhận thời tiết:</strong> {log.weather} — {log.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-5 bg-white border-t border-slate-150 flex justify-end gap-3">
              <button
                onClick={() => setSelectedFarmerForDiary(null)}
                className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 font-sans cursor-pointer"
              >
                Đóng lại
              </button>
              <button
                onClick={() => {
                  setInitiatedFarmer(selectedFarmerForDiary);
                  setSelectedFarmerForDiary(null);
                  setActiveTab('san_giao_dich');
                }}
                className="py-2.5 px-5 bg-green-700 hover:bg-green-800 rounded-xl text-xs font-bold text-white font-sans cursor-pointer shadow-xs"
              >
                Liên Kết Đóng Cọc Bao Tiêu Vườn Này
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE REPORT MODAL POPUP */}
      {reportingFarm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-800 to-red-700 p-5 text-white flex justify-between items-center">
              <div className="text-left space-y-1">
                <span className="text-[10px] bg-white/20 text-yellow-300 font-mono font-bold px-2.5 py-0.5 rounded-full border border-white/10 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> PHẢN HỒI HÌNH ẢNH
                </span>
                <h4 className="font-display font-bold text-base">
                  Báo cáo ảnh nông sản lỗi sườn
                </h4>
              </div>
              <button
                onClick={() => setReportingFarm(null)}
                className="p-1 px-2.5 hover:bg-white/10 text-white rounded-xl transition-colors cursor-pointer text-sm font-black"
              >
                ✕
              </button>
            </div>

            {/* Content Form */}
            <div className="p-6 text-left space-y-4 font-sans">
              {reportSuccess ? (
                <div className="text-center py-6 space-y-3.5 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-slate-800 text-sm">Gửi báo cáo thành công!</h5>
                    <p className="text-xs text-slate-500 leading-relaxed px-4">
                      Hợp tác xã sầu riêng <strong className="text-green-800">Hết Sầu</strong> đã tiếp nhận báo cáo từ quý bà con/đối tác. Đội ngũ kiểm soát viên sẽ rà soát ảnh của nhà vườn <strong className="text-slate-800">{reportingFarm.name}</strong> và cập nhật lại trong vòng 12h.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 text-xs flex items-center gap-3">
                    <img 
                      src={reportingFarm.gardenImage} 
                      alt={reportingFarm.name} 
                      className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Vườn sầu đang báo cáo</span>
                      <strong className="text-slate-800 font-bold text-[12.5px]">{reportingFarm.name}</strong>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 block">Lý do hình ảnh không chuẩn xác (*)</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700 transition-colors">
                        <input
                          type="radio"
                          name="reportReason"
                          value="sai_anh"
                          checked={reportReason === 'sai_anh'}
                          onChange={() => setReportReason('sai_anh')}
                          className="text-red-650 focus:ring-red-500 h-4 w-4"
                        />
                        <span>Ảnh không khớp thực tế vườn sầu riêng</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700 transition-colors">
                        <input
                          type="radio"
                          name="reportReason"
                          value="loi_hien_thi"
                          checked={reportReason === 'loi_hien_thi'}
                          onChange={() => setReportReason('loi_hien_thi')}
                          className="text-red-650 focus:ring-red-500 h-4 w-4"
                        />
                        <span>Ảnh bị lỗi hiển thị, mờ nhoè hoặc hỏng file</span>
                      </label>
                      <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700 transition-colors">
                        <input
                          type="radio"
                          name="reportReason"
                          value="gia_mao"
                          checked={reportReason === 'gia_mao'}
                          onChange={() => setReportReason('gia_mao')}
                          className="text-red-650 focus:ring-red-500 h-4 w-4"
                        />
                        <span>Ảnh giả mạo vùng trồng (mượn sầu vườn khác)</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-600 block">Chi tiết mô tả thêm (nếu có)</label>
                    <textarea
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Mô tả cụ thể lỗi hiển thị hoặc điểm sai sót của ảnh sầu riêng này..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-250 focus:ring-1 focus:ring-red-500 outline-none min-h-[80px] bg-slate-50 focus:bg-white resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-150 flex justify-end gap-2.5 bg-slate-50/50">
              {reportSuccess ? (
                <button
                  type="button"
                  onClick={() => setReportingFarm(null)}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer font-sans shadow-xs transition-colors"
                >
                  Hoàn tất và đóng
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setReportingFarm(null)}
                    className="py-2.5 px-4 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-650 font-sans cursor-pointer transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setReportSuccess(true);
                    }}
                    className="py-2.5 px-5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold font-sans cursor-pointer shadow-xs transition-colors"
                  >
                    Gửi phản hồi ảnh
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
