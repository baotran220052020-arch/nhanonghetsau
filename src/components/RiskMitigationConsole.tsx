import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Coins, 
  Layers, 
  MapPin, 
  Users, 
  UserCheck, 
  Sparkles, 
  Scale, 
  Lock, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Info 
} from 'lucide-react';
import { FarmerProfile } from '../types';

interface RiskMitigationConsoleProps {
  farmerInfo: FarmerProfile;
  expectedYield: number;
  area: number;
  variety: string;
}

export default function RiskMitigationConsole({ 
  farmerInfo, 
  expectedYield, 
  area, 
  variety 
}: RiskMitigationConsoleProps) {
  // 1. Data Forgery States (Productivity logic check)
  const [testArea, setTestArea] = useState<number>(area);
  const [testYield, setTestYield] = useState<number>(expectedYield);
  const [auditorDispatched, setAuditorDispatched] = useState<boolean>(false);
  const [auditLog, setAuditLog] = useState<string>('Dữ liệu thô từ vệ tinh ghi nhận mật độ tán cây đồng bộ.');

  const calculatedProductivity = testArea > 0 ? (testYield / testArea) : 0;
  const isProductivitySuspicious = calculatedProductivity > 30 || calculatedProductivity < 15;

  const handleDispatchAuditor = () => {
    setAuditorDispatched(true);
    setAuditLog('Đội Field Auditors tại Chi cục Cai Lậy đã nhận lệnh. Đã lên lịch bay Drone quét quang phổ NDVI vào Sáng mai (08:00).');
  };

  // 2. Price Volatility States (Floor Price + Market Bonus model)
  const [floorPrice, setFloorPrice] = useState<number>(75000); // 75,000 VND/kg
  const [marketPrice, setMarketPrice] = useState<number>(95000); // 95,000 VND/kg
  
  // Floor Price + 50% * Range (Market Price - Floor Price)
  const sharedBonusPrice = marketPrice > floorPrice 
    ? floorPrice + 0.5 * (marketPrice - floorPrice) 
    : floorPrice;

  // 3. Off-Grade Routing (Hàng dạt Loại 2, Loại 1, Loại 3)
  const grade1Volume = (testYield * 0.7).toFixed(1); // 70% direct export
  const grade2Volume = (testYield * 0.2).toFixed(1); // 20% domestic retail matching
  const grade3Volume = (testYield * 0.1).toFixed(1); // 10% deep processing matching

  // 4. Privacy Radius Overlays
  const [isMasked, setIsMasked] = useState<boolean>(true);

  // 5. Direct deal evasion prevention stats
  const [repRating, setRepRating] = useState<number>(98);
  const commissionFee = repRating >= 95 ? '0.7%' : repRating >= 85 ? '1.5%' : '3.0%';

  return (
    <div className="bg-slate-900 border border-slate-800 text-slate-100 p-6 rounded-2xl space-y-8 text-left font-sans">
      {/* Risk Console Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span>Operational Risk Management Engine</span>
          </div>
          <h2 className="font-display font-bold text-xl text-white">
            Bách Khoa Kiểm Soát & Phòng Ngừa Rủi Ro Vận Hành
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed max-w-4xl">
            Cơ chế bảo chứng kép cùng các thuật toán chống phá vỡ cam kết, xử lý mượt mà rủi ro dòng tiền ký quỹ, biến động giá, dội lốp sầu riêng dạt và lách sàn ngoại hợp ước.
          </p>
        </div>
      </div>

      {/* Bento Grid Risk Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* rủi ro 1: KHAI KHỐNG DỮ LIỆU */}
        <div className="lg:col-span-6 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] bg-red-500/15 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase block">RỦI RO 1: KHAI KHỐNG DIỆN TÍCH / SẢN LƯỢNG</span>
              <h3 className="font-bold text-sm text-slate-200">Cơ chế Xác Thực Hai Tầng (2-Tier Audit)</h3>
            </div>
            <span className="p-1 rounded bg-red-500/10 text-red-400">
              <Scale className="w-4 h-4" />
            </span>
          </div>

          <p className="text-slate-405 text-slate-400 text-[11px] leading-relaxed">
            Áp dụng biên độ logic năng suất (<strong className="text-emerald-400">15 - 30 Tấn/ha</strong>). Hệ thống quét tự động gắn cờ đỏ nếu nhập sai lốp sinh học, kích hoạt mạng lưới Field Auditors xác thực thực địa bằng drone.
          </p>

          <div className="grid grid-cols-2 gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px]">
            <div>
              <label className="text-slate-500 font-semibold block mb-1">Quy mô đo lường (ha)</label>
              <input 
                type="number" 
                value={testArea} 
                onChange={(e) => setTestArea(Math.max(0.1, Number(e.target.value)))}
                className="w-full text-slate-200 p-1.5 bg-slate-950 border border-slate-800 rounded text-xs focus:border-red-500 outline-none"
                step="0.1"
              />
            </div>
            <div>
              <label className="text-slate-500 font-semibold block mb-1">Sản lượng mong đợi (Tấn)</label>
              <input 
                type="number" 
                value={testYield} 
                onChange={(e) => setTestYield(Math.max(1, Number(e.target.value)))}
                className="w-full text-slate-200 p-1.5 bg-slate-950 border border-slate-800 rounded text-xs focus:border-red-500 outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-900/60 p-3 rounded-lg border border-slate-800/60 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">Năng suất thuật toán phân tích:</span>
              <strong className={isProductivitySuspicious ? 'text-red-500 text-xs font-mono' : 'text-green-400 text-xs font-mono'}>
                {calculatedProductivity.toFixed(2)} Tấn/ha
              </strong>
            </div>
            <span className={`px-2 py-0.5 rounded-md font-bold text-[9px] ${
              isProductivitySuspicious ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/20'
            }`}>
              {isProductivitySuspicious ? 'CẢNH BÁO: BẤT THƯỜNG 🚨' : 'CHỈ SỐ AN TOÀN SINH HỌC VÀNG ✓'}
            </span>
          </div>

          {isProductivitySuspicious && (
            <div className="space-y-2">
              <div className="bg-red-500/10 border-l-3 border-red-505 border-red-500 p-2 text-[10px] text-red-300 rounded-r leading-relaxed">
                Năng suất sầu riêng Ri6/Monthong chuẩn chỉ dao động từ 15-30 tấn/ha. Chỉ số khai báo vượt ngưỡng sinh thái.
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 bg-slate-900 p-2 rounded">
                <span>Trạng thái thanh tra:</span>
                <span className="text-slate-200">{auditLog}</span>
              </div>
              {!auditorDispatched && (
                <button
                  id="btn-dispatch-auditor"
                  onClick={handleDispatchAuditor}
                  className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors"
                >
                  Yêu cầu kích hoạt thợ thẩm định Field Auditors & Drone giám sát
                </button>
              )}
            </div>
          )}
        </div>

        {/* rủi ro 2: BIẾN ĐỘNG GIÁ CẢ */}
        <div className="lg:col-span-6 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase block">RỦI RO 2: BIẾN ĐỘNG GIÁ THỊ TRƯỜNG ("BẺ CỌC")</span>
              <h3 className="font-bold text-sm text-slate-200">Mô hình Giá Sàn Bảo Hiểm + Chia Sẻ Biên Độ</h3>
            </div>
            <span className="p-1 rounded bg-amber-500/10 text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed">
            Công thức: <strong className="text-amber-400 font-mono">Giá chốt = Giá Sàn + 50% × (Giá thị trường - Giá Sàn)</strong>. Farmer luôn có mức chống lỗ (Giá sàn bảo hiểm), đồng thời được chia sẻ lộc lớn nếu thị trường sốt giá, tránh bẻ cọc hai phía.
          </p>

          <div className="space-y-3 bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px]">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Đặt Giá Sàn Bảo Hiểm Cam Kết:</span>
                <strong className="text-yellow-400">{floorPrice.toLocaleString('vi-VN')} VND/kg</strong>
              </div>
              <input 
                type="range" 
                min="60000" 
                max="90000" 
                step="2000"
                value={floorPrice} 
                onChange={(e) => setFloorPrice(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Giả lập Giá Thị Trường Ngày Cắt:</span>
                <strong className={marketPrice > floorPrice ? "text-emerald-400" : "text-slate-450"}>
                  {marketPrice.toLocaleString('vi-VN')} VND/kg
                </strong>
              </div>
              <input 
                type="range" 
                min="50000" 
                max="130000" 
                step="5000"
                value={marketPrice} 
                onChange={(e) => setMarketPrice(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-450 text-[10px] block">ĐƠN GIÁ HÀNH QUY ĐỊNH BÀN CÂN:</span>
              <strong className="text-lg text-amber-400 font-display font-black">
                {sharedBonusPrice.toLocaleString('vi-VN')} đ/kg
              </strong>
            </div>
            <div className="text-right text-[10px] leading-relaxed max-w-[200px] text-slate-400">
              {marketPrice > floorPrice ? (
                <span className="text-emerald-400 font-semibold block">
                  📈 Thâm thưởng múi vàng bồi chia đôi: +{((marketPrice - floorPrice) * 0.5).toLocaleString('vi-VN')} đ/kg lộc thị trường!
                </span>
              ) : (
                <span className="text-yellow-500 font-semibold block">
                  🛡️ Kích hoạt vách bảo hiểm giá sàn đập lỗ tuyệt đối cho nhà vườn!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* rủi ro 3: TẮC NGHẼN HÀNG LỢI 2, LOẠI 3 (HÀNG DẠT) */}
        <div className="lg:col-span-8 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] bg-green-500/15 text-green-400 border border-green-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase block">RỦI RO 3: TẮC NGHẼN ĐẦU RA - CHAI GAI HỘC DẠT</span>
              <h3 className="font-bold text-sm text-slate-200">Định Tuyến Phân Lớp Loại sầu & Khớp Tự Động matching sâu</h3>
            </div>
            <span className="p-1 rounded bg-green-500/10 text-emerald-400">
              <Layers className="w-4 h-4" />
            </span>
          </div>

          <p className="text-slate-405 text-slate-400 text-[11px] leading-relaxed">
            Hợp ước thầu sầu không dứt gãy: Bao tiêu thẳng <strong className="text-slate-105">70% Hạng A</strong> đi container, <strong className="text-slate-105">20% Hạng B</strong> tự động ghép đơn chợ sỉ toàn quốc, <strong className="text-slate-105">10% Hạng C / hàng méo dạt</strong> chuyển trực tiếp nhà máy sấy thăng hoa chế biến sâu.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-left space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>Hạng A (70%): Xuất Khấu</span>
                <span className="text-blue-400 font-bold">VIP</span>
              </div>
              <strong className="text-slate-100 text-sm font-display block">{grade1Volume} Tấn</strong>
              <span className="text-[9px] text-slate-500 block italic leading-none">Chuyển thẳng xe lạnh vựa đóng cảng</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-left space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>Hạng B (20%): Chợ Sỉ</span>
                <span className="text-amber-400 font-bold">Nội Địa</span>
              </div>
              <strong className="text-slate-100 text-sm font-display block">{grade2Volume} Tấn</strong>
              <span className="text-[9px] text-slate-500 block italic leading-none">Tự động xới tát khớp đơn lẻ nội tỉnh</span>
            </div>

            <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg text-left space-y-1 border-l-4 border-l-orange-500/80">
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>Hạng C (10%): Chế Biến Sâu</span>
                <span className="text-orange-400 font-semibold">Tự Động</span>
              </div>
              <strong className="text-orange-400 text-sm font-display block">{grade3Volume} Tấn</strong>
              <span className="text-[9px] text-slate-500 block italic leading-none">Duyệt thẳng về Nhà máy sấy Vinamilk</span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-450 italic text-[11px] text-left">
              * Kích hoạt tự động cổng Matching chế biến nếu vườn của bạn gặp hạn phèn đột ngột tỷ lệ quả dạt tăng vọt.
            </span>
            <button 
              onClick={() => alert(`Lệnh điều phối Matching khẩn chế biến sâu đã sẵn sàng cho sầu riêng nhà vườn!`)}
              className="py-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-[10px] rounded"
            >
              Kích hoạt khớp vách sấy
            </button>
          </div>
        </div>

        {/* rủi ro 4: "ĐI ĐÊM" BỎ QUA NỀN TẢNG & MẶT NẠ ĐỊA CHỈ */}
        <div className="lg:col-span-4 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[9px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase block">RỦI RO 4: "ĐI ĐÊM" & RÒ RỈ Vị TRÍ</span>
              <h3 className="font-bold text-sm text-slate-200">Bảo mật toạ độ lý tưởng & Tín nhiệm cước</h3>
            </div>
            <span className="p-1 rounded bg-indigo-500/10 text-indigo-400">
              <EyeOff className="w-4 h-4" />
            </span>
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed">
            Hết Sầu cam kết bảo mật danh tính, chỉ mở bán kính 2km ảo cho tới nông hộ & doanh nghiệp chốt cọc cấy thành công. Đối tác lách sàn chịu trừ điểm tín nhiệm kịch liệt.
          </p>

          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-slate-500">Mặt nạ bảo vệ vị trí vệ tinh:</span>
              <button 
                onClick={() => setIsMasked(!isMasked)}
                className={`py-1 px-2.5 rounded font-bold text-[10px] ${
                  isMasked ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'
                }`}
              >
                {isMasked ? 'Đang Mở Mặt Nạ (Bán Kính)' : 'Đã hiện Toạ độ đúng vị'}
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded border border-slate-850 text-[10px] font-mono text-slate-440">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>
                {isMasked ? 'Đồng bằng sông Tiền, Vùng sầu Cai Lậy (Bán kính 2,000M bảo mật)' : 'Tọa độ: 10.36442 N - 106.12453 E (Nhà vườn Sáu Đức)'}
              </span>
            </div>

            <div className="pt-1.5 flex justify-between items-center border-t border-slate-800 text-[11px]">
              <div>
                <span className="text-slate-500 block">Tín nhiệm cước phí sàn:</span>
                <strong className="text-emerald-400">Đạt Hạng A+ ({repRating}đ)</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Cước sàn hưởng:</span>
                <strong className="text-indigo-400 font-mono text-xs">{commissionFee}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust guarantees badge at footer of risk block */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4.5 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 rounded-xl border border-emerald-500/20 text-xs text-left gap-4">
        <div className="flex items-center space-x-3 text-slate-300">
          <UserCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="leading-relaxed text-[11px]">
            Hệ thống <strong>"Nhà nông Hết Sầu"</strong> cam kết bao tiêu – giữ cọc sòng phẳng 100% tài sản uỷ thác. Mọi bất đồng vụ mùa đều tự động khởi kích quy trình hoà giải 3 bên tại Uỷ ban quản lý địa phương nhanh chóng nhất.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="py-1 px-2 text-[9px] font-bold bg-slate-800 text-emerald-400 border border-emerald-500/30 rounded uppercase tracking-wider whitespace-nowrap">
            PRESTIGE GUARANTEED ✓
          </div>
        </div>
      </div>
    </div>
  );
}
