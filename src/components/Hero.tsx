import React from 'react';
import { Sprout, Shield, Calendar, Truck, ArrowRight, TrendingUp } from 'lucide-react';

interface HeroProps {
  onSearchSupply: () => void;
  onRegisterFarm: () => void;
}

export default function Hero({ onSearchSupply, onRegisterFarm }: HeroProps) {
  // Use the generated hero image representing a bustling durian packing and trading market hub
  const heroImgUrl = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200';

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-amber-700 text-white min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* Background Image with elegant overlay gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImgUrl}
          alt="Bến bãi giao thương thâu mua và đóng gói sầu riêng xuất khẩu"
          className="w-full h-full object-cover opacity-50 scale-102 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-955/85 via-emerald-900/60 to-amber-700/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-green-900/30 to-amber-500/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Key Pitch & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-yellow-400/20 border border-yellow-400/40 px-3 py-1.5 rounded-full text-yellow-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
            <span>Ứng dụng công nghệ bản đồ số & kết nối cung cầu</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
            Kết nối giá trị – Kiến tạo chiếc cầu vàng <span className="text-yellow-400 bg-linear-to-r from-yellow-300 to-amber-400 bg-clip-text">Sầu Riêng Việt</span>
          </h1>

          <p className="font-sans text-lg text-slate-300 max-w-2xl leading-relaxed">
            Nền tảng số kết nối trực tiếp nhà vườn sầu riêng với doanh nghiệp thu mua - xuất khẩu. Chúng tôi tối ưu hóa mùa vụ, cung cấp bản đồ nguồn cung số hóa và minh bạch tuyệt đối chuỗi cung ứng.
          </p>

          <div className="bg-green-950/40 border-l-4 border-green-500 p-4 rounded-r-xl max-w-xl">
            <p className="font-serif italic text-base text-green-200">
              "Không ai bị bỏ lại phía sau trên hành trình nâng tầm nông sản Việt"
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              id="hero-search-supply-btn"
              onClick={onSearchSupply}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl text-base shadow-lg shadow-green-900/30 hover:scale-102 transition-all cursor-pointer group"
            >
              <span>Tìm nguồn cung sầu riêng</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-register-farm-btn"
              onClick={onRegisterFarm}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-800 hover:bg-slate-700/85 border border-slate-700 text-white font-semibold rounded-xl text-base hover:scale-102 transition-all cursor-pointer"
            >
              Dành cho Nhà Vườn Đăng Ký
            </button>
          </div>

          {/* Quick core values badge of poster */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800">
            {[
              { label: 'MINH BẠCH', desc: 'Dữ liệu chuẩn xác' },
              { label: 'HIỆU QUẢ', desc: 'Tối ưu chi phí' },
              { label: 'KẾT NỐI', desc: 'Trực tiếp 1-1' },
              { label: 'BỀN VỮNG', desc: 'Nông nghiệp xanh' }
            ].map((value, i) => (
              <div key={i}>
                <span className="block text-[10px] uppercase font-bold text-green-400 tracking-wider">
                  {value.label}
                </span>
                <span className="block text-xs text-slate-400 font-medium">
                  {value.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Stat grid & Quick Benefits list representing poster highlights */}
        <div className="lg:col-span-5 bg-slate-900/80 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-xs space-y-6">
          <h3 className="font-display font-bold text-xl text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Sự Kiện & Thống Kê Dự Án</span>
            <span className="text-[10px] px-2 py-1 bg-green-500/10 text-green-400 rounded-md border border-green-500/20 font-mono">Dữ liệu thực tế</span>
          </h3>

          {/* Replicating the 4 stats on poster */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/30 hover:border-green-500/30 transition-colors">
              <span className="block font-display font-medium text-green-400 text-3xl">1.250+</span>
              <span className="block text-xs text-slate-400 font-medium font-sans">Nhà vườn tham gia</span>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/30 hover:border-green-500/30 transition-colors">
              <span className="block font-display font-medium text-green-400 text-3xl">320+</span>
              <span className="block text-xs text-slate-400 font-medium font-sans">Doanh nghiệp thu mua</span>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/30 hover:border-green-500/30 transition-colors">
              <span className="block font-display font-medium text-green-400 text-3xl">12.500+</span>
              <span className="block text-xs text-slate-400 font-medium font-sans">Tấn sầu cung ứng</span>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/30 hover:border-green-500/30 transition-colors">
              <span className="block font-display font-medium text-green-400 text-3xl">15+</span>
              <span className="block text-xs text-slate-400 font-medium font-sans">Tỉnh thành kết nối</span>
            </div>
          </div>

          {/* Quick checklist of 5 benefits from image poster */}
          <div className="space-y-3.5 pt-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">LỢI ÍCH GIAO DỊCH NỔI BẬT</p>
            {[
              { icon: Sprout, title: 'Kết nối trực tiếp', desc: 'Nhà vườn kết nối thẳng không qua cò, thương lái ép bớt.' },
              { icon: Shield, title: 'Minh bạch thông tin', desc: 'Truy xuất mã vùng trồng, nhật ký nhật canh khép kín.' },
              { icon: Calendar, title: 'Dự báo mùa vụ thông minh', desc: 'Kế hoạch thu hoạch số hóa chu kỳ và sản lượng.' },
              { icon: Truck, title: 'Tối ưu hóa Logistics', desc: 'Hợp đồng khép kín giảm 40% hao hụt và hao mòn.' }
            ].map((benefit, i) => (
              <div key={i} className="flex items-start space-x-3 text-left">
                <div className="flex-shrink-0 p-1.5 rounded-lg bg-green-500/10 text-green-400 mt-0.5">
                  <benefit.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white leading-tight">{benefit.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-normal">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
