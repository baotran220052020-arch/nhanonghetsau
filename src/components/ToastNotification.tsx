import React, { useState, useEffect } from 'react';
import { Bell, X, ArrowRight, ShieldAlert, BadgePercent, Sprout, TrendingDown, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Live simulated notifications representing both transaction updates and weather/salinity warnings
const SIMULATED_ALERTS = [
  {
    id: 1,
    type: 'GIAO DỊCH',
    icon: Sprout,
    iconColor: 'bg-green-100 text-green-700',
    borderColor: 'border-l-green-500',
    title: 'Khớp lệnh thành công!',
    detail: 'Hợp tác xã sầu riêng Tam Bình vừa chốt thỏa thuận bao tiêu 45 tấn Monthong với Tập đoàn VinaFruit.',
    time: 'Vừa xong',
    roleTarget: 'Cả hai'
  },
  {
    id: 2,
    type: 'CẢNH BÁO',
    icon: ShieldAlert,
    iconColor: 'bg-rose-100 text-rose-700',
    borderColor: 'border-l-rose-500',
    title: 'Xâm nhập mặn Cái Bè',
    detail: 'Độ mặn tại vàm sông Cái Bè vượt mức 1.5g/l. Bà con tạm ngưng lấy nước mương tưới sầu riêng non.',
    time: '3 phút trước',
    roleTarget: 'nha_vuon'
  },
  {
    id: 3,
    type: 'BIẾN ĐỘNG GIÁ',
    icon: BadgePercent,
    iconColor: 'bg-amber-100 text-amber-700',
    borderColor: 'border-l-amber-500',
    title: 'Giá Monthong xuất khẩu tăng vọt',
    detail: 'Trung Quốc mở thêm cửa khẩu hữu nghị đông lạnh. Nhu cầu Monthong loại 1 tăng 15% so với đầu mùa.',
    time: '12 phút trước',
    roleTarget: 'doanh_nghiep'
  },
  {
    id: 4,
    type: 'GIAO DỊCH mới',
    icon: Users,
    iconColor: 'bg-emerald-100 text-emerald-700',
    borderColor: 'border-l-emerald-500',
    title: 'Thương lái đề xuất mới',
    detail: 'Thương lái Anh Bảy Đò vừa mở gom tuyến Vĩnh Long với giá cạnh tranh 78.000đ/kg Ri6 xô vườn.',
    time: '25 phút trước',
    roleTarget: 'nha_vuon'
  },
  {
    id: 5,
    type: 'KHUYẾN NÔNG',
    icon: Sprout,
    iconColor: 'bg-blue-100 text-blue-700',
    borderColor: 'border-l-blue-500',
    title: 'Thu hái già sầu đạt chuẩn',
    detail: 'Chi cục Bảo vệ thực vật hướng dẫn: Đo gõ gầm đĩa trái đủ tuổi già xuất khẩu đạt 8.5-9 tuổi mới cắt.',
    time: '1 giờ trước',
    roleTarget: 'nha_vuon'
  }
];

export default function ToastNotification() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Cycle notifications automatically every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExpanded) {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % SIMULATED_ALERTS.length);
          setIsVisible(true);
        }, 500); // fade out and in gracefully
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isExpanded]);

  const currentAlert = SIMULATED_ALERTS[currentIndex];

  const handleNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SIMULATED_ALERTS.length);
      setIsVisible(true);
    }, 300);
  };

  const IconComponent = currentAlert.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm font-sans">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            id={`live-toast-alert-${currentAlert.id}`}
            key={currentAlert.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-2xl border-t-2 border-l-4 ${currentAlert.borderColor} border-slate-200 shadow-xl overflow-hidden flex flex-col`}
          >
            {/* Quick alert headline */}
            <div className="p-4 flex items-start space-x-3.5">
              {/* Cycling animated bell icon */}
              <div className={`p-2 rounded-xl scale-95 flex-shrink-0 relative ${currentAlert.iconColor}`}>
                <IconComponent className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-white animate-ping"></span>
              </div>

              {/* Text content */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold uppercase bg-slate-150 text-slate-800 px-2 py-0.5 rounded-md font-mono tracking-wider">
                    {currentAlert.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium font-mono">{currentAlert.time}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1.5 leading-tight">{currentAlert.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
                  {currentAlert.detail}
                </p>
              </div>

              {/* Dismiss close button */}
              <button
                id="close-live-toast-btn"
                onClick={() => setIsVisible(false)}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded hover:bg-slate-100 transition-colors cursor-pointer self-start"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Micro footer actions inside toast alert */}
            <div className="bg-slate-50 px-4 py-2 border-t border-slate-150 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-semibold font-mono">
                Bản tin {currentIndex + 1}/{SIMULATED_ALERTS.length}
              </span>
              <button
                id="next-toast-btn"
                onClick={handleNext}
                className="text-green-700 hover:text-green-900 font-bold flex items-center space-x-0.5 cursor-pointer"
              >
                <span>Cập nhật tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
