import React, { useState } from 'react';
import { Target, Eye, AlertTriangle, Lightbulb, Users, BarChart3, HelpCircle, ArrowRight, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  const [activeBmcBlock, setActiveBmcBlock] = useState<string | null>(null);

  const bmcBlocks = [
    {
      id: 'kp',
      num: 1,
      title: 'ĐỐI TÁC CHÍNH (Key Partners)',
      icon: Users,
      color: 'border-l-4 border-green-500 bg-green-50/10',
      items: [
        'Các Hợp tác xã (HTX) và Hội Nông dân tại các tỉnh trọng điểm sầu riêng (ĐBSCL).',
        'Chi cục Trồng trọt & Bảo vệ Thực vật địa phương (hỗ trợ xác thực Mã số vùng trồng).',
        'Chuyên gia Công nghệ (AI, phân tích dữ liệu) & Chuyên gia Nông nghiệp.',
        'Đơn vị cung cấp giải pháp bản đồ số (Hạ tầng Google Maps API).'
      ]
    },
    {
      id: 'ka',
      num: 2,
      title: 'HOẠT ĐỘNG CHÍNH (Key Activities)',
      icon: Zap,
      color: 'border-l-4 border-emerald-500 bg-emerald-50/10',
      items: [
        'Xây dựng, bảo trì và tối ưu hóa giao diện ứng dụng số tối giản cho nông dân sầu riêng.',
        'Thu thập, chuẩn hóa dữ liệu vùng trồng và cập nhật thời gian thực từ nhà vườn.',
        'Phát triển thuật toán thông minh phân tích, dự báo sản lượng và biến động giá mùa vụ.',
        'Tổ chức các buổi tập huấn hướng dẫn số hóa, VietGAP cho nông dân.'
      ]
    },
    {
      id: 'vp',
      num: 3,
      title: 'TUYÊN BỐ GIÁ TRỊ (Value Propositions)',
      icon: Target,
      color: 'border-l-4 border-yellow-500 bg-yellow-50/10',
      isDouble: true,
      subSections: [
        {
          name: 'ĐỐI VỚI NHÀ VƯỜN:',
          items: [
            'Tiếp cận trực tiếp doanh nghiệp xuất khẩu chính ngạch, xóa bỏ tầng nấc trung gian ép giá.',
            'Nhận thông tin cảnh báo thiên tai, hạn mặn sớm và dự báo xu hướng giá thị trường.'
          ]
        },
        {
          name: 'ĐỐI VỚI DOANH NGHIỆP XUẤT KHẨU:',
          items: [
            'Chủ động nguồn cung sầu riêng trước mùa vụ 45 ngày nhờ số liệu thời gian thực.',
            'Tiết kiệm 40% chi phí khảo sát trực tiếp thực địa thủ công.',
            'Bảo đảm tính minh bạch, chính xác về nguồn gốc trái đạt chuẩn VietGAP/GlobalGAP.'
          ]
        }
      ]
    },
    {
      id: 'cr',
      num: 4,
      title: 'QUAN HỆ KHÁCH HÀNG (Customer Relationships)',
      icon: Eye,
      color: 'border-l-4 border-indigo-500 bg-indigo-50/10',
      items: [
        'Chăm sóc và hỗ trợ kỹ thuật trực tiếp cho nông dân qua mạng lưới "Đại sứ nông nghiệp" tại các ấp.',
        'Hỗ trợ kỹ thuật 24/7 và tư vấn giải pháp dữ liệu hữu ích cho hệ thống kinh doanh doanh nghiệp.',
        'Xây dựng cộng đồng chia sẻ bí quyết canh tác đạt chuẩn VietGAP/GlobalGAP.'
      ]
    },
    {
      id: 'cs',
      num: 5,
      title: 'PHÂN KHÚC KHÁCH HÀNG (Customer Segments)',
      icon: HelpCircle,
      color: 'border-l-4 border-blue-500 bg-blue-50/10',
      subSections: [
        {
          name: 'NHÓM NGƯỜI DÙNG (Miễn phí):',
          items: [
            'Hộ nông dân canh tác sầu riêng nhỏ lẻ và các trang trại trung bình - lớn miền Tây.',
            'Các Tổ hợp tác, Hợp tác xã sầu riêng tại các tỉnh ĐBSCL.'
          ]
        },
        {
          name: 'NHÓM KHÁCH HÀNG TRẢ PHÍ:',
          items: [
            'Doanh nghiệp thu mua, đóng gói và trực tiếp xuất khẩu sầu riêng tươi/đông lạnh.',
            'Các doanh nghiệp dịch vụ Logistics chuỗi cung ứng lạnh nông sản Việt.'
          ]
        }
      ]
    },
    {
      id: 'kr',
      num: 6,
      title: 'NGUỒN LỰC CHÍNH (Key Resources)',
      icon: BarChart3,
      color: 'border-l-4 border-amber-500 bg-amber-50/10',
      items: [
        'Hệ thống cơ sở dữ liệu (Database) nguồn cung sầu riêng độc quyền phân tích thời gian thực.',
        'Nền tảng công nghệ ưu việt tích hợp bản đồ số thông minh và thuật toán dự báo AI.',
        'Đội ngũ nhân sự chuyên gia nông nghiệp sâu sát và kỹ sư chuyển đổi số nhiệt huyết.'
      ]
    },
    {
      id: 'ch',
      num: 8,
      title: 'KÊNH TIẾP CẬN (Channels)',
      icon: ArrowRight,
      color: 'border-l-4 border-orange-500 bg-orange-50/10',
      items: [
        'Kênh trực tiếp (Direct): Tiếp cận tại các hội nghị nông dân hợp tác xã, nhà đóng gói.',
        'Kênh số (Digital): Website, Nhóm Zalo chia sẻ kiến thức, quảng bá cộng đồng sầu riêng.',
        'Kênh đối tác: Thông qua Hiệp hội Rau quả Việt Nam (Vinafruit) và các Chi cục Khuyến nông.'
      ]
    },
    {
      id: 'co',
      num: 7,
      title: 'CƠ CẤU CHI PHÍ (Cost Structure)',
      icon: AlertTriangle,
      color: 'border-l-4 border-rose-500 bg-rose-50/10',
      items: [
        'Chi phí vận hành và lưu trữ máy chủ (Cloud Server), bảo mật cơ sở dữ liệu.',
        'Chi phí Marketing sự kiện, in ấn tài liệu cầm tay hướng dẫn nông dân.',
        'Chi phí nhân sự quản lý hệ thống, kỹ sư khảo nghiệm vùng trồng.'
      ]
    },
    {
      id: 're',
      num: 9,
      title: 'DÒNG DOANH THU (Revenue Streams)',
      icon: TrendingUp,
      color: 'border-l-4 border-teal-500 bg-teal-50/10',
      items: [
        'Phí đăng ký thuê bao phần mềm (Subscription) từ doanh nghiệp xuất khẩu lớn (5-15 triệu/tháng).',
        'Phí hoa hồng ghép đôi thành công (Matching fee) 1% - 2% dựa trên các hợp đồng sầu riêng số hóa lớn.',
        'Gói cung cấp báo cáo dự đoán sản lượng sầu theo quý/năm phục vụ phòng thu mua.',
        'Phí dịch thuật số và dán mác chuẩn xác thực vùng vườn sầu riêng uy tín đạt chuẩn.'
      ]
    }
  ];

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 space-y-20">
      {/* 1. Sứ mệnh & Tầm nhìn */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-green-700 tracking-widest uppercase bg-green-100/75 px-3 py-1 rounded-full">
            Tập Hợp Sức Mạnh Số
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Vực Dậy Giá Trị Sầu Riêng Việt
          </h2>
          <p className="text-slate-600 font-sans text-base leading-relaxed">
            Nhà nông Hết Sầu ra đời như một giải pháp số đột phá, biến sầu riêng – nông sản tỷ đô của Việt Nam – thành ngành hàng phát triển bền vững, minh bạch và có giá trị nhất trên thị trường quốc tế.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl border border-green-50 shadow-xs hover:shadow-md transition-shadow group text-left">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl text-slate-800 mb-3">Sứ mệnh của chúng tôi</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Chúng tôi bảo vệ quyền lợi nông dân bằng cách loại bỏ các tầng thương lái phức tạp, ổn định đầu ra để sầu không bị ép giá bấp bênh. Đồng thời giúp doanh nghiệp chủ động nguồn hàng đạt chuẩn, truy xuất tận nguồn gốc bằng kỹ nghệ chuyển đổi số tinh nhuệ.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl border border-green-50 shadow-xs hover:shadow-md transition-shadow group text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl text-slate-800 mb-3">Tầm nhìn chiến lược</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Trở thành Hệ sinh thái thông tin nông sản lớn nhất khu vực sông Mê Kông vào năm 2030, bắt đầu từ trái sầu riêng, nhân rộng ra bưởi da xanh, xoài cát. Chúng tôi định hình chuẩn dữ liệu khép kín giúp xuất khẩu nông nghiệp Việt tự tin khẳng định vị thế xanh.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Thực trạng & Giải pháp với ảnh minh họa thật sinh động */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left order-2 lg:order-1">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight">
            Nền Nông Nghiệp Đầy "Nỗi Sầu" & Giải Pháp Số Hóa Triệt Để
          </h3>

          <div className="space-y-5">
            {/* Market Difficulties */}
            <div className="flex items-start space-x-3.5 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <div className="p-2 bg-rose-100 text-rose-700 rounded-lg mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-rose-950 font-sans">Nỗi lo ép giá, sạt vườn & thông tin mù</h4>
                <p className="text-xs text-rose-800 font-medium font-sans leading-relaxed">
                  Bà con miền Tây trước đây thường bói sầu riêng qua lời lái buôn, dễ bị bỏ cọc ép giá khi rộ vụ gặt, không biết giá thực tế Trung Quốc tăng sập dầm. Doanh nghiệp thì thiếu nguồn cung an toàn chuẩn xuất thối trái.
                </p>
              </div>
            </div>

            {/* Breakthrough Solution */}
            <div className="flex items-start space-x-3.5 bg-green-50/60 p-4 rounded-xl border border-green-100">
              <div className="p-2 bg-green-100 text-green-700 rounded-lg mt-0.5">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-green-950 font-sans">Ứng dụng "Nhà nông Hết Sầu" giải tỏa thế bí</h4>
                <p className="text-xs text-green-800/90 font-medium font-sans leading-relaxed">
                  Chúng tôi xây dựng Bản đồ nhiệt sầu riêng thời gian thực, lưu vết nhật ký bón thuốc, tính số lượng tấn chín chín tự động giúp hai bên gặp gỡ thương lượng, ký điện tử ngay tại vườn cực kỳ thuận an toàn.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Image from assets */}
        <div className="relative order-1 lg:order-2">
          <div className="absolute inset-0 bg-green-600 rounded-3xl rotate-2 opacity-5 scale-98"></div>
          <img
            src="/src/assets/images/digital_farming_connect_1780736951800.png"
            alt="Mô tả kết nối nông nghiệp số"
            className="rounded-3xl shadow-xl w-full max-h-[380px] object-cover border border-slate-200 relative z-10 transition-transform duration-500 hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-md border border-green-100 text-xs font-semibold text-slate-800 z-20 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Công nghệ IoT & Bản đồ số</span>
          </div>
        </div>
      </div>

      {/* 3. Sơ đồ vận hành nền tảng (5 bước sinh động) */}
      <div className="max-w-7xl mx-auto text-center space-y-10">
        <div className="space-y-3">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
            Sơ Đồ Vận Hành 5 Bước Khép Kín
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Hạ tầng kết nối và xử lý thông tin tự động liên tục giữa nhà vườn và doanh nghiệp thu mua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left">
          {[
            {
              step: '1',
              title: 'Cập nhật vườn',
              desc: 'Nông dân cập nhật: giống sầu, diện tích, ngày xả nhụy, ngày thu hoạch dự kiến, chứng chỉ VietGap.',
              color: 'text-green-600 bg-green-50 animate-pulse'
            },
            {
              step: '2',
              title: 'Xử lý dữ liệu',
              desc: 'Hệ thống tự động kiểm tra chứng nhận qua mã số vùng trồng địa phương và số hóa lưu giữ phân tích.',
              color: 'text-indigo-600 bg-indigo-50'
            },
            {
              step: '3',
              title: 'Dự báo sản lượng',
              desc: 'Tính toán tổng hợp biểu lượng chín nông sản của các tỉnh theo tháng để cảnh báo rủi ro sớm dội giá.',
              color: 'text-yellow-600 bg-yellow-50'
            },
            {
              step: '4',
              title: 'Lọc kết nối',
              desc: 'Doanh nghiệp tìm thấy nhà vườn thích hợp qua bộ lọc nâng cao theo giống, ngày già sầu riêng và đặt vấn đề.',
              color: 'text-pink-600 bg-pink-50'
            },
            {
              step: '5',
              title: 'Giao dịch & Ký',
              desc: 'Thương thảo điều khoản thuận lợi, ký kết hợp đồng số hóa có hiệu lực, theo dõi giao hàng và đánh giá sao.',
              color: 'text-teal-600 bg-teal-50'
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs relative hover:border-green-300 transition-all flex flex-col justify-between">
              <div>
                <div className={`w-10 h-10 rounded-xl font-display font-bold text-lg flex items-center justify-center mb-6 ${item.color}`}>
                  {item.step}
                </div>
                <h4 className="font-sans font-bold text-slate-800 text-sm mb-2">{item.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-sans">{item.desc}</p>
              </div>
              {index < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-4 translate-y-1/2 z-20 text-slate-300">
                  <ArrowRight className="w-5 h-5 font-bold" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. BUSINESS MODEL CANVAS (CHI TIẾT CHUYÊN SÂU NHẤT) */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 uppercase">
            Mô Hình Business Model Canvas
          </h2>
          <p className="text-slate-500 text-xs">
            Bản phác thảo kế hoạch kinh doanh & giá trị nền móng vận hành độc quyền Nhà nông Hết Sầu. Vui lòng click chọn từng khối để xem chi tiết mục tiêu.
          </p>
        </div>

        {/* Elegant Interactive BMC Grid Layout with warm durian colors and glass-card look */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-5 font-sans">
          {/* Box 1 Partner - 2 cols, height 2 rows */}
          <div
            id="bmc-block-kp"
            className={`md:col-span-2 md:row-span-2 p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[240px] ${
              activeBmcBlock === 'kp' ? 'ring-3 ring-green-500 shadow-md bg-emerald-50/40 border-green-300' : 'bg-white border-slate-200 shadow-sm'
            }`}
            onClick={() => setActiveBmcBlock(activeBmcBlock === 'kp' ? null : 'kp')}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-green-700 font-display font-black text-xs uppercase tracking-wider bg-green-100/60 px-2.5 py-1 rounded-lg">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>1. Đối Tác Chính</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold font-mono">KP</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2.5 text-left font-sans list-none pl-0">
                {bmcBlocks.find(b => b.id === 'kp')?.items?.map((it, i) => (
                  <li key={i} className="leading-relaxed flex items-start space-x-1">
                    <span className="text-green-500 font-bold mr-1">✦</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
              <span>Bán sầu vững bền</span>
              <span className="font-extrabold text-green-600">Xem thêm →</span>
            </div>
          </div>

          {/* Column structure for Activity + Resources */}
          <div className="md:col-span-2 md:row-span-2 space-y-5">
            {/* Box 2 Activity */}
            <div
              id="bmc-block-ka"
              className={`p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer min-h-[220px] flex flex-col justify-between ${
                activeBmcBlock === 'ka' ? 'ring-3 ring-emerald-500 shadow-md bg-emerald-50/40 border-emerald-300' : 'bg-white border-slate-200 shadow-sm'
              }`}
              onClick={() => setActiveBmcBlock(activeBmcBlock === 'ka' ? null : 'ka')}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5 text-emerald-700 font-display font-black text-xs uppercase tracking-wider bg-emerald-100/60 px-2.5 py-1 rounded-lg">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2. Hoạt Động</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">KA</span>
                </div>
                <ul className="text-[11px] text-slate-500 space-y-2 text-left font-sans pl-0 list-none">
                  {bmcBlocks.find(b => b.id === 'ka')?.items?.slice(0, 3).map((it, i) => (
                    <li key={i} className="leading-snug flex items-start space-x-1">
                      <span className="text-emerald-500 font-extrabold">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                <span>Số hóa sản vườn</span>
                <span className="text-emerald-600">Chi tiết...</span>
              </div>
            </div>

            {/* Box 6 Resources */}
            <div
              id="bmc-block-kr"
              className={`p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer min-h-[220px] flex flex-col justify-between ${
                activeBmcBlock === 'kr' ? 'ring-3 ring-amber-500 shadow-md bg-amber-50/40 border-amber-300' : 'bg-white border-slate-200 shadow-sm'
              }`}
              onClick={() => setActiveBmcBlock(activeBmcBlock === 'kr' ? null : 'kr')}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5 text-amber-700 font-display font-black text-xs uppercase tracking-wider bg-amber-100/60 px-2.5 py-1 rounded-lg">
                    <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                    <span>6. Nguồn Lực</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">KR</span>
                </div>
                <ul className="text-[11px] text-slate-500 space-y-2 text-left font-sans pl-0 list-none">
                  {bmcBlocks.find(b => b.id === 'kr')?.items?.slice(0, 3).map((it, i) => (
                    <li key={i} className="leading-snug flex items-start space-x-1">
                      <span className="text-amber-500 mr-1">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                <span>Kho dữ liệu</span>
                <span className="text-amber-600">Chi tiết...</span>
              </div>
            </div>
          </div>

          {/* Box 3 Value Prop - 2 cols, height 2 rows */}
          <div
            id="bmc-block-vp"
            className={`md:col-span-2 md:row-span-2 p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[240px] ${
              activeBmcBlock === 'vp' ? 'ring-3 ring-yellow-500 shadow-md bg-yellow-55/30 border-yellow-350' : 'bg-white border-slate-200 shadow-sm'
            }`}
            onClick={() => setActiveBmcBlock(activeBmcBlock === 'vp' ? null : 'vp')}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-amber-900 font-display font-black text-xs uppercase tracking-wider bg-yellow-100 px-2.5 py-1 rounded-lg">
                  <Target className="w-4 h-4 text-yellow-600" />
                  <span>3. Tuyên Bố Giá Trị</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold font-mono">VP</span>
              </div>
              <div className="text-left space-y-4 font-sans focus:outline-hidden">
                <div className="bg-green-50/50 p-2.5 rounded-xl border border-green-100">
                  <span className="text-[9px] font-extrabold text-green-800 uppercase block mb-1">CHO BÀ CON NHÀ VƯỜN:</span>
                  <p className="text-[11px] text-slate-700 leading-normal font-medium">
                    ✦ Thấu hiểu giá xuất đúng chính ngạch, xóa bỏ ép giá trung gian mù mờ.<br />
                    ✦ Dự báo thiên hạn mặn trực tiếp trên smartphone.
                  </p>
                </div>
                <div className="bg-amber-50/40 p-2.5 rounded-xl border border-amber-100">
                  <span className="text-[9px] font-extrabold text-amber-800 uppercase block mb-1">CHO DOANH NGHIỆP:</span>
                  <p className="text-[11px] text-slate-700 leading-normal font-medium">
                    ✦ Chốt sớm sản lượng thu mua chuỗi lạnh 45 ngày trước thu hoạch.<br />
                    ✦ Kiểm nghiệm nguồn sạch vi sinh chuẩn xác thực.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 mt-2">
              <span>Khớp kết nối đôi bên</span>
              <span className="text-amber-600 font-black">Cung & Cầu →</span>
            </div>
          </div>

          {/* CRM + Channels */}
          <div className="md:col-span-2 md:row-span-2 space-y-5">
            {/* Box 4 CRM */}
            <div
              id="bmc-block-cr"
              className={`p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer min-h-[220px] flex flex-col justify-between ${
                activeBmcBlock === 'cr' ? 'ring-3 ring-indigo-500 shadow-md bg-indigo-50/40 border-indigo-300' : 'bg-white border-slate-200 shadow-sm'
              }`}
              onClick={() => setActiveBmcBlock(activeBmcBlock === 'cr' ? null : 'cr')}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5 text-indigo-700 font-display font-black text-xs uppercase tracking-wider bg-indigo-100/60 px-2.5 py-1 rounded-lg">
                    <Eye className="w-3.5 h-3.5 text-indigo-600" />
                    <span>4. Quan Hệ KH</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">CR</span>
                </div>
                <ul className="text-[11px] text-slate-500 space-y-2 text-left font-sans pl-0 list-none">
                  {bmcBlocks.find(b => b.id === 'cr')?.items?.slice(0, 3).map((it, i) => (
                    <li key={i} className="leading-snug flex items-start space-x-1">
                      <span className="text-indigo-500">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                <span>Đại sứ bản nông</span>
                <span className="text-indigo-600 font-semibold">Chi tiết...</span>
              </div>
            </div>

            {/* Box 8 Channels */}
            <div
              id="bmc-block-ch"
              className={`p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer min-h-[220px] flex flex-col justify-between ${
                activeBmcBlock === 'ch' ? 'ring-3 ring-orange-500 shadow-md bg-orange-50/40 border-orange-300' : 'bg-white border-slate-200 shadow-sm'
              }`}
              onClick={() => setActiveBmcBlock(activeBmcBlock === 'ch' ? null : 'ch')}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5 text-orange-700 font-display font-black text-xs uppercase tracking-wider bg-orange-100/60 px-2.5 py-1 rounded-lg">
                    <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
                    <span>8. Kênh Tiếp Cận</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">CH</span>
                </div>
                <ul className="text-[11px] text-slate-500 space-y-2 text-left font-sans pl-0 list-none">
                  {bmcBlocks.find(b => b.id === 'ch')?.items?.slice(0, 3).map((it, i) => (
                    <li key={i} className="leading-snug flex items-start space-x-1">
                      <span className="text-orange-500">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                <span>Hiệp hội VinaFruit</span>
                <span className="text-orange-600">Chi tiết...</span>
              </div>
            </div>
          </div>

          {/* Box 5 Customer Segment - 2 cols, height 2 rows */}
          <div
            id="bmc-block-cs"
            className={`md:col-span-2 md:row-span-2 p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[240px] ${
              activeBmcBlock === 'cs' ? 'ring-3 ring-blue-500 shadow-md bg-blue-50/30 border-blue-300' : 'bg-white border-slate-200 shadow-sm'
            }`}
            onClick={() => setActiveBmcBlock(activeBmcBlock === 'cs' ? null : 'cs')}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-blue-900 font-display font-black text-xs uppercase tracking-wider bg-blue-100 px-2.5 py-1 rounded-lg">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>5. Phân Khúc KH</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold font-mono">CS</span>
              </div>
              <div className="text-left space-y-3 font-sans">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-500 block mb-1">MIỄN PHÍ TRỌN ĐỜI:</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                    • Hộ cá thể nông dân miền Tây sầu riêng chín vườn.<br />
                    • Tổ hợp tác xã Tam Bình, Cai Lậy.
                  </p>
                </div>
                <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-150">
                  <span className="text-[9px] font-bold text-amber-800 block mb-1">GÓI TRẢ PHÍ DOANH NGHIỆP:</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                    • Chuỗi thu đóng gói sầu riêng bốc container.<br />
                    • Logistics phân phối lạnh VinaFruit, Anh Bảy Đò.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 mt-2">
              <span>Đa dạng hóa lợi nhuận</span>
              <span className="text-blue-600 font-bold">Khách hàng →</span>
            </div>
          </div>

          {/* Box 7 Cost structure - 5 cols, bottom row */}
          <div
            id="bmc-block-co"
            className={`md:col-span-5 p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[160px] ${
              activeBmcBlock === 'co' ? 'ring-3 ring-rose-500 shadow-md bg-rose-50/40 border-rose-300' : 'bg-white border-slate-200 shadow-sm'
            }`}
            onClick={() => setActiveBmcBlock(activeBmcBlock === 'co' ? null : 'co')}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-rose-700 font-display font-black text-xs uppercase tracking-wider bg-rose-100 px-2.5 py-1 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>7. Cơ Cấu Chi Phí (Cost Structure)</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold font-mono">CO</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-none pl-0 text-left font-sans">
                {bmcBlocks.find(b => b.id === 'co')?.items?.map((it, i) => (
                  <li key={i} className="leading-snug flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end text-[10px] text-rose-600 font-bold mt-2">
              <span>Tối ưu hóa tài nguyên số</span>
            </div>
          </div>

          {/* Box 9 Revenue stream - 5 cols, bottom row */}
          <div
            id="bmc-block-re"
            className={`md:col-span-5 p-6 rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[160px] ${
              activeBmcBlock === 're' ? 'ring-3 ring-teal-500 shadow-md bg-teal-50/40 border-teal-300' : 'bg-white border-slate-200 shadow-sm'
            }`}
            onClick={() => setActiveBmcBlock(activeBmcBlock === 're' ? null : 're')}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-teal-700 font-display font-black text-xs uppercase tracking-wider bg-teal-100 px-2.5 py-1 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  <span>9. Dòng Doanh Thu (Revenue Streams)</span>
                </div>
                <span className="text-[10px] text-slate-400 font-bold font-mono">RE</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-none pl-0 text-left font-sans">
                {bmcBlocks.find(b => b.id === 're')?.items?.map((it, i) => (
                  <li key={i} className="leading-snug flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end text-[10px] text-teal-600 font-bold mt-2">
              <span>Doanh thu bám chặt giá trị thực</span>
            </div>
          </div>
        </div>

        {/* Selected Block Spotlight Detail card */}
        {activeBmcBlock && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/60 shadow-inner text-left max-w-4xl mx-auto">
            <h4 className="font-display font-bold text-base text-green-900 mb-2">
              🔍 CHI TIẾT Ô MỤC TIÊU: {bmcBlocks.find(b => b.id === activeBmcBlock)?.title}
            </h4>
            <div className="space-y-2 mt-2">
              {bmcBlocks.find(b => b.id === activeBmcBlock)?.subSections ? (
                bmcBlocks.find(b => b.id === activeBmcBlock)?.subSections?.map((sub, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-xs font-bold text-slate-700 block">{sub.name}</span>
                    <ul className="list-disc list-inside text-xs text-slate-600 pl-2 space-y-1">
                      {sub.items.map((item, id) => (
                        <li key={id}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 font-sans">
                  {bmcBlocks.find(b => b.id === activeBmcBlock)?.items?.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
