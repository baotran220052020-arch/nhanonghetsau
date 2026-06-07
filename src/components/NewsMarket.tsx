import React, { useState, useEffect } from 'react';
import { BookOpen, Share2, Users, Flame, MessageSquare, Send, Bell, Globe, ArrowRight, Rss, Layers, CheckCircle2, Award, Zap, HelpCircle } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'trong_nuoc' | 'quoc_te' | 'ky_thuat' | 'chinh_sach';
  source: string;
  timeAgo: string;
  image: string;
  views: number;
}

interface ChatMessage {
  id: string;
  senderName: string;
  role: 'farmer' | 'enterprise' | 'agronomist' | 'system';
  avatarColor: string;
  text: string;
  time: string;
  likes: number;
}

export default function NewsMarket() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'trong_nuoc' | 'quoc_te' | 'ky_thuat'>('all');
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Community chat states
  const [chatUsername, setChatUsername] = useState<string>('');
  const [chatRole, setChatRole] = useState<'farmer' | 'enterprise'>('farmer');
  const [chatInput, setChatInput] = useState<string>('');
  const [isJoinedChat, setIsJoinedChat] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string>('');
  
  // Real-time ticking time for "Live Updated" feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const NEWS_DATABASE: NewsArticle[] = [
    {
      id: 'news_1',
      title: 'Giá sầu riêng Monthong loại A tại vựa đóng sọt Cai Lậy chạm mốc kỷ lục 125.000đ/kg',
      summary: 'Nhu cầu sấy lạnh xuất khẩu bùng nổ mạnh mẽ khiến các doanh nghiệp FDI tăng tốc thu mua gom tại các xã vùng xanh sông Tiền. Nhà vườn chuẩn sạch GlobalGAP rạng rỡ có cơm ngon béo ngậy.',
      content: 'Theo rà soát chỉ số thị trường nông sản Nam Bộ hôm nay, giá sầu riêng Dona (Monthong) lựa lựa chuẩn vại đẹp đang được các đầu mối xuất khẩu chính ngạch thu mua kịch trần 122.000 - 125.000 đ/kg. Đối với Ri6 đẹp, giá thu tại gốc dao động nhộn nhịp quanh mốc 78.000 - 82.000 đ/kg. Nguyên nhân chính là do chất lượng cơm mộc sầu Việt ngày càng ráo dẻo sáp béo đạt mốc kiểm tịnh hải quan nghiêm ngặt, tạo uy tín lớn lên kệ chuỗi siêu thị tỉnh Quảng Đông và Vân Nam.',
      category: 'trong_nuoc',
      source: 'Thời báo Nông nghiệp Nam Bộ',
      timeAgo: 'Cập nhật 5 phút trước',
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600',
      views: 1840
    },
    {
      id: 'news_2',
      title: 'Hải quan Trung Quốc bổ sung quy định mới về dán mã QR truy xuất mã số vùng trồng sầu riêng tươi',
      summary: 'Bắt đầu từ niên vụ này, 100% thùng bốc lên container xuất đi chốt quan biên giới buộc phải có mã số vùng trồng điện tử rà soát minh bạch toàn bộ nhật ký bón thuốc Canxi bồi hữu cơ.',
      content: 'Tổng cục Hải quan nước bạn vừa phát đi thông báo khẩn cấp hướng dẫn khai báo chỉ số vùng trồng sầu riêng tươi nhập khẩu. Các lô hàng không dán tem truy xuất hoặc nhật ký canh tác số bị đứt mút đứt gãy sụt thông tin sẽ bị tạm dừng thông quan luồng xanh 48 tiếng để lấy mẫu kiểm kiểm sinh vật hại. Điều này đòi hỏi bà con nông hộ Nam Bộ tham gia HTX Nhà nông Hết Sầu cần ghi chép mượt mà sổ điện tử đám mây hàng ngày nhằm giữ vững uy tín xuất khẩu.',
      category: 'quoc_te',
      source: 'Cổng thông tin Giao thương Biên mậu',
      timeAgo: 'Cập nhật 35 phút trước',
      image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=600',
      views: 2950
    },
    {
      id: 'news_3',
      title: 'Ứng phó mặn hạn xâm nhập sâu 55km trên sông Hàm Luông - Giải pháp lót bạt phễu trữ ngọt nông thôn',
      summary: 'Trạm khí tượng Chợ Lách phát văn thư đo mặn mương rơm chạm mốc 1.4‰. Bà con nhanh đóng kín cống mương túp, dùng bạt PE lót mương giữ nước sầu ngọt đầm ấm.',
      content: 'Xâm nhập mặn cực đoan kéo rộc khiến dòng nước sông Hàm Luông dâng cao nêm clo. Do sầu riêng mẫn cảm cực độ với Natri dột mặn (ngưỡng chịu đựng tối đa chỉ <0.5‰), tỉnh đã phối hợp hỗ trợ kỹ sư nông nghiệp phổ cập mô hình lót màng nylon giữ nước ngọt lóng bùn phù sa bón dột. Đồng thời bón lót Kali-Silic tăng độ dẻo của cuống hoa và rơm rạ phủ móng dày 15cm tránh thoát hơi ẩm cực tốt.',
      category: 'ky_thuat',
      source: 'Khuyến Nông Việt Nam',
      timeAgo: 'Cập nhật 1 giờ trước',
      image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=600',
      views: 740
    },
    {
      id: 'news_4',
      title: 'Thái Lan thắt chặt chuẩn khô tuyệt đối mộc cơm sầu riêng xuất khẩu lên mức 35.5% để cạnh tranh',
      summary: 'Bộ Nông nghiệp nước láng giềng áp luật bắt thương nhân chỉ hái quả sầu hộc đạt chuẩn tinh bột khô cao, cơm ráo dẻo sáp rực múp nhằm giữ đứt phân khúc béo đặc hạt lép.',
      content: 'Cuộc đua thâu tóm trái ngon bán biên giới ngày càng kịch tính khi nước đối thủ đẩy mạnh kiểm soát độ ẩm khay cơm lấy bạt. Để vượt qua vị sượng nọng cơm nhão, các vựa đóng sọt Thái Lan cam kết bồi Kali Sunfat triệt để nhằm hạ ẩm độ xuống dưới 32%. Để cạnh tranh sòng phẳng, kỹ sư AI tại Tổ hợp HTX Hết Sầu khuyên bà con thu hoạch đúng 9.5 tuổi bói, ngắt béc dội nước mương 15 ngày chót để tạo cơm sầu béo ráo sượng ngọt đậm chất lịm nhất.',
      category: 'quoc_te',
      source: 'Tin tức Agrisect châu Á',
      timeAgo: 'Cập nhật 3 giờ trước',
      image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=600&sig=thai',
      views: 4120
    }
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'chat_1',
      senderName: 'Chú Sáu Đức (Cai Lậy)',
      role: 'farmer',
      avatarColor: 'bg-emerald-600',
      text: 'Mưa giông chiều nay hơi lớn xíu, bà con có ai xới sâu rãnh thoát nước mương chưa? Đề phòng nấm Phytophthora nó ngấm thối tơ rễ bốc hại đọt nhé!',
      time: '15:42',
      likes: 8
    },
    {
      id: 'chat_2',
      senderName: 'Kỹ sư nông học Lâm (Hết Sầu)',
      role: 'agronomist',
      avatarColor: 'bg-blue-600',
      text: 'Bà con cực kỳ lưu ý dông ngập sau 1 tiếng phải rút khô đáy mương bãi nhé. Quét sệt nấm bằng Metalaxyl-M sơi sột miệng loét vết mủ cuống quả.',
      time: '15:45',
      likes: 15
    },
    {
      id: 'chat_3',
      senderName: 'Vựa sầu Anh Bảy Cái Bè',
      role: 'enterprise',
      avatarColor: 'bg-amber-600',
      text: 'Ri6 vựa tôi gom bốc thùng xuất Quảng Tây đang cần thêm 25 tấn chuẩn cơm khô ráo ráo óng béo. Chủ vườn nào có cọc Hết Sầu hối xe tải lạnh dốc lộc bãi lẹ nào.',
      time: '15:50',
      likes: 12
    },
    {
      id: 'chat_4',
      senderName: 'Hệ thống Hết Sầu Pay',
      role: 'system',
      avatarColor: 'bg-slate-800',
      text: '🤝 Giao dịch lưu ký đặt bảo chứng cọc 30% giữa vườn vựa Bảy Thạnh và MekongX vừa khớp lệnh phong tỏa thành công qua MB-Bank. Sẵn sàng bốc vận tải lộc sầu!',
      time: '15:52',
      likes: 24
    }
  ]);

  const handleJoinChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatUsername.trim()) {
      setChatError('Bà con vui lòng nhập bút danh / tên vườn dập khớp trò chuyện nhé!');
      return;
    }
    setIsJoinedChat(true);
    setChatError('');
    
    // Add join message
    const welcomeMsg: ChatMessage = {
      id: `chat_join_${Date.now()}`,
      senderName: 'Hệ thống Hết Sầu',
      role: 'system',
      avatarColor: 'bg-slate-700',
      text: `👋 Chào mừng bà con hội viên [${chatUsername}] đã hội nhập trực tuyến thành công vào Phòng Chat Trao đổi Giá sầu & Nông học miền Tây!`,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      likes: 0
    };
    setChatMessages(prev => [...prev, welcomeMsg]);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `chat_msg_${Date.now()}`,
      senderName: `${chatUsername} (${chatRole === 'farmer' ? 'Nhà vườn' : 'Vựa buôn'})`,
      role: chatRole,
      avatarColor: chatRole === 'farmer' ? 'bg-green-600' : 'bg-amber-500 text-slate-950',
      text: chatInput,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      likes: 0
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Simulated response from random farmer / expert to keep interaction lifelike
    setTimeout(() => {
      let replyText = '';
      const lowerInput = chatInput.toLowerCase();
      
      if (lowerInput.includes('giá') || lowerInput.includes('bán') || lowerInput.includes('thu mua')) {
        replyText = 'Dạ đúng đó anh chị ơi, nay tuyển lái vựa chốt sọt Monthong lộc lộc đẹp giá nhích lộc 123.000 rồi. Ri6 bói tay cũng vững lòng. Bà con cứ giữ múi cơm ráo khô béo là lượm tiền đẫy đó!';
      } else if (lowerInput.includes('mặn') || lowerInput.includes('nước') || lowerInput.includes('tưới')) {
        replyText = 'Hạn mặn sông Tiền khốc rộc quá bà con ơi. Trạm HTX Hết Sầu vừa phát bút đo EC dập, nhớ đo kỹ mương trước ngày lấy nước nhé. Đừng bơm liều cháy rụi móng rễ non.';
      } else if (lowerInput.includes('rầy') || lowerInput.includes('đọt') || lowerInput.includes('lá')) {
        replyText = 'Trị rầy xanh hại cơi đọt sầu thì phun Neem Oil phối nấm xanh khi đọt non nhú lưỡi mác tầm nửa ngón nhé, rải mù sương chiều mát bao trứng bám tịt!';
      } else {
        replyText = 'Chúc toàn thể bà con sầu riêng miền Tây mình mùa này đậu sai hộc, cơm sáp dẻo vàng rực nứt bốc thơm dính béo, tiền cọc cất ví Hết Sầu Pay an tâm vô biên!';
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `chat_reply_${Date.now()}`,
          senderName: 'Lão nông Út Mập (Chợ Lách)',
          role: 'farmer',
          avatarColor: 'bg-emerald-700',
          text: replyText,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          likes: 3
        }
      ]);
    }, 1500);
  };

  const handleLikeMessage = (id: string) => {
    setChatMessages(prev => prev.map(msg => msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg));
  };

  const filteredNews = NEWS_DATABASE.filter(news => activeCategory === 'all' || news.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Dynamic Header Banner with Realtime Clock */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-green-950 p-6 sm:p-10 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-emerald-850">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-left space-y-2.5 relative z-10">
          <span className="text-[10px] bg-yellow-400 text-slate-950 font-black px-3 py-1 rounded-full uppercase font-mono tracking-wider animate-pulse inline-flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping"></span>
            <span>LIÊN TỤC PHÁT SÓNG</span>
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight">
            Tin Tức Thị Trường & Kết Nối Nông Thôn Hội Nhập
          </h1>
          <p className="text-green-200/90 font-sans text-sm max-w-2xl">
            Cổng thông tin dự báo giá sầu riêng trong và ngoài nước, tin tức kỹ học, chính sách biên mậu và mạng xã hội giúp bà con miền Tây nắm bắt lách cơi đọt nhanh chóng bám sát dòng tiền thương hội dào dạt.
          </p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700 text-left w-full md:w-auto relative z-10 font-mono">
          <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-widest mb-1">ĐỒNG HỒ CẬP NHẬT:</span>
          <strong className="text-yellow-400 text-xl font-black block tracking-widest">{currentTime || '15:58:59'}</strong>
          <span className="text-[9.5px] block text-green-300 mt-1 font-semibold leading-none">Múi giờ: GMT+7 Sông Tiền</span>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: TIN TỨC LIÊN TỤC & HỘI NHẬP nôn hộ - 7 COLS */}
        <div className="lg:col-span-7 text-left space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-4">
            <h2 className="font-display font-bold text-lg text-slate-900 flex items-center space-x-2">
              <Rss className="w-5 h-5 text-green-600" />
              <span>Bản Tin Sầu Riêng Toàn Cầu Hàng Giờ</span>
            </h2>
            
            {/* Filter tags code */}
            <div className="flex gap-1.5 overflow-x-auto text-xs py-1">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'trong_nuoc', label: 'Trong nước' },
                { id: 'quoc_te', label: 'Ngoài nước/Biên mậu' },
                { id: 'ky_thuat', label: 'Kỹ nghệ rẫy sầu' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-green-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-250 text-slate-650'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredNews.map((news) => (
              <div
                id={`article-card-${news.id}`}
                key={news.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-green-400 transition-all flex flex-col md:flex-row gap-5 p-5 items-stretch hover:shadow-xs group duration-300"
              >
                {/* Photo cover */}
                <div className="w-full md:w-44 h-40 md:h-auto rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-103 duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-2xs text-[8.5px] text-white p-1 px-2 rounded-md font-bold uppercase tracking-wider border border-slate-700 font-mono">
                    {news.category === 'trong_nuoc' ? 'Nội địa' : news.category === 'quoc_te' ? 'Thế giới' : 'Kỹ thuật'}
                  </div>
                </div>

                {/* News breakdown description */}
                <div className="flex flex-col justify-between text-left space-y-3 flex-grow">
                  <div className="space-y-2">
                    <span className="text-[10px] text-green-700 font-extrabold flex items-center space-x-1.5 font-sans uppercase">
                      <span>• {news.source}</span>
                      <span>—</span>
                      <span className="text-slate-400 font-bold">{news.timeAgo}</span>
                    </span>
                    <h3 className="font-display font-medium text-base text-slate-850 group-hover:text-green-700 transition-colors leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-sans leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-sans">
                    <span>Đọc giả: <strong>{news.views} lượt xem</strong></span>
                    
                    <button
                      onClick={() => {
                        alert(`📖 Chi tiết bản tin: "${news.title}"\n\n${news.content}\n\n*Nguồn tin: ${news.source} — Lưu trữ Hợp Tác Xã Sầu Riêng Hết Sầu.*`);
                      }}
                      className="inline-flex items-center text-green-700 hover:text-green-800 font-black hover:underline cursor-pointer"
                    >
                      <span>Xem toàn văn</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SOCIAL NETWORK LINKS PORTAL (HỘI NHẬP MẠNG XÃ HỘI NÔNG SẢN) */}
          <div className="bg-gradient-to-br from-indigo-50 via-sky-50/40 to-white p-6 rounded-3xl border border-sky-150 text-left space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 text-sm">Hội Nhập Cổng Số - Liên Kết Hội Nhóm Nông Sản</h3>
                <p className="text-[11px] text-slate-500 font-sans">Bà con tham gia trao đổi trực tiếp trên các diễn đàn rôm rả để cập nhật cơi đọt sầu.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              
              {/* Box 1: Facebook Group */}
              <div className="bg-white p-4 rounded-2xl border border-indigo-100 flex items-start gap-3 justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] bg-indigo-100 text-indigo-700 font-extrabold px-2 py-0.5 rounded uppercase">Facebook Group</span>
                  <strong className="text-slate-800 font-bold block text-[11.5px] leading-snug">Cộng Đồng Sầu Riêng Miền Tây</strong>
                  <p className="text-[10px] text-slate-400">Hơn 45.000 thành viên nông dân gõ sầu Chợ Lách - Cai Lậy.</p>
                </div>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 bg-blue-600 text-white font-extrabold rounded-lg text-[10px] uppercase whitespace-nowrap self-center hover:bg-blue-700 transition-colors"
                >
                  Gia Nhập
                </a>
              </div>

              {/* Box 2: Zalo Warning group QR code */}
              <div className="bg-white p-4 rounded-2xl border border-sky-100 flex items-center gap-3 justify-between">
                <div className="space-y-1.5">
                  <span className="text-[9px] bg-sky-100 text-sky-700 font-extrabold px-2 py-0.5 rounded uppercase">Nhóm Zalo 24/7</span>
                  <strong className="text-slate-800 font-bold block text-[11.5px] leading-snug">Cảnh Báo Hạn Mặn & Rầy Đọt Sầu</strong>
                  <p className="text-[10px] text-slate-400">Trực tiếp kỹ sư Lâm hỗ trợ dập mủ, bồi hữu cơ.</p>
                  <p className="text-[9.5px] font-bold text-green-700">📞 Hotline: 0982 907 018</p>
                </div>
                <div className="flex-shrink-0 text-center space-y-1">
                  {/* Simulated QR block code */}
                  <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-lg p-1 mx-auto flex flex-col justify-between">
                    {/* Simulated pixel rows for QR */}
                    <div className="flex justify-between"><span className="w-3 h-3 bg-slate-900 rounded-2xs"></span><span className="w-2 h-1 bg-slate-900"></span><span className="w-3 h-3 bg-slate-900 rounded-2xs"></span></div>
                    <div className="flex justify-between"><span className="w-1 h-2 bg-slate-900"></span><span className="w-4 h-4 bg-green-700 rounded-xs mx-auto"></span><span className="w-1 h-3 bg-slate-900"></span></div>
                    <div className="flex justify-between"><span className="w-3 h-3 bg-slate-905 rounded-2xs"></span><span className="w-2 h-1 bg-slate-909"></span><span className="w-3 h-3 bg-slate-905 rounded-2xs"></span></div>
                  </div>
                  <span className="text-[8px] font-black uppercase text-slate-400 font-sans">Quét tham gia</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PHÒNG CHÁT CỘNG ĐỒNG SẦU RIÊNG - 5 COLS */}
        <div className="lg:col-span-5 text-left bg-white p-6 rounded-3xl border border-slate-200 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] bg-green-150 text-green-700 border border-green-250 font-extrabold px-2 py-0.5 rounded uppercase font-sans">
              Xôm tụ mương rơm
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900 mt-1 flex items-center space-x-1.5">
              <MessageSquare className="w-5 h-5 text-emerald-600 animate-bounce" />
              <span>Phòng Trò Chuyện Cộng Đồng Sầu Riêng Việt</span>
            </h3>
            <p className="text-slate-400 font-sans text-xs mt-0.5">
              Nơi bà con nông dâng và thương lái Cai Lậy, Cái Bè, Chợ Lách đàm đạo, chốt tỉa giá hái trái cây và bày cách dập rầy trị mặn rầm rập trực tiếp hàng ngày.
            </p>
          </div>

          {!isJoinedChat ? (
            /* Login to chat box */
            <form onSubmit={handleJoinChat} className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4 font-sans text-xs">
              <div className="text-center space-y-1.5 pb-2">
                <span className="text-2xl block">🧑‍🌾</span>
                <strong className="text-slate-800 text-xs block uppercase">Thiết thiết bút danh hội nhập</strong>
                <p className="text-[10px] text-slate-400">Cho mọi người nhận diện danh sườn khu vườn nhà bạn nhé!</p>
              </div>

              <div className="space-y-1 text-left col-span-1">
                <label className="text-slate-500 font-bold block mb-1">Tên vườn / Bút danh trò chuyện:</label>
                <input
                  id="chat-profile-name"
                  type="text"
                  placeholder="Ví dụ: Vườn Sầu Bảy Lù (Cai Lậy)"
                  value={chatUsername}
                  onChange={(e) => setChatUsername(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 bg-white rounded-xl focus:outline-hidden focus:border-green-600 font-semibold font-sans"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-slate-500 font-bold block">Vai trò hội nhập:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setChatRole('farmer')}
                    className={`flex-1 py-2 px-3 border rounded-xl font-bold transition-all text-center ${
                      chatRole === 'farmer'
                        ? 'border-green-600 bg-green-50 text-green-800'
                        : 'border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    Hộ Nhà Vườn
                  </button>
                  <button
                    type="button"
                    onClick={() => setChatRole('enterprise')}
                    className={`flex-1 py-2 px-3 border rounded-xl font-bold transition-all text-center ${
                      chatRole === 'enterprise'
                        ? 'border-amber-500 bg-amber-50 text-amber-800'
                        : 'border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    Doanh Nghiệp / Vựa
                  </button>
                </div>
              </div>

              {chatError && <p className="text-red-600 font-bold text-[10px]">{chatError}</p>}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded-xl cursor-pointer font-bold transition-all text-center shadow-xs"
              >
                Vào Phòng Trò Chuyện Trực Tuyến
              </button>
            </form>
          ) : (
            /* Active chat room area */
            <div className="space-y-4">
              {/* Chat user profile display badges */}
              <div className="flex justify-between items-center bg-green-50/50 p-2.5 rounded-xl border border-green-150 text-[11px] font-sans">
                <span className="text-slate-600">
                  Phát danh: <strong className="text-green-900 font-bold">{chatUsername}</strong>
                </span>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                  chatRole === 'farmer' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {chatRole === 'farmer' ? 'Nhà vườn' : 'Vựa thương'}
                </span>
                <button
                  onClick={() => setIsJoinedChat(false)}
                  className="text-red-700 font-bold hover:underline"
                >
                  Đổi
                </button>
              </div>

              {/* Messages container list */}
              <div className="h-96 overflow-y-auto bg-slate-50 p-3.5 border border-slate-100 rounded-2xl space-y-3 font-sans text-xs flex flex-col-reverse justify-start">
                <div className="space-y-3.5 flex flex-col justify-end">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-left space-y-1 max-w-[95%]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Avatar tag dot mock */}
                        <div className={`w-2.5 h-2.5 rounded-full ${msg.avatarColor} border border-white/20 flex-shrink-0`}></div>
                        <span className="font-extrabold text-slate-800 text-[10.5px] leading-none block">{msg.senderName}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{msg.time}</span>
                      </div>
                      
                      <div className={`p-3 rounded-2xl text-[11px] leading-relaxed border ${
                        msg.role === 'system'
                          ? 'bg-slate-100 border-slate-200 text-slate-600 font-medium font-sans'
                          : msg.role === 'agronomist'
                          ? 'bg-blue-50/50 border-blue-105 text-blue-900 font-sans'
                          : 'bg-white border-slate-150 text-slate-750 shadow-2xs'
                      }`}>
                        {msg.text}

                        {/* Likes counter indicator inside card */}
                        {msg.role !== 'system' && (
                          <div className="flex justify-end pt-1 mt-1 border-t border-slate-50">
                            <button
                              onClick={() => handleLikeMessage(msg.id)}
                              className="px-2 py-0.5 bg-slate-100 hover:bg-green-50 text-[9px] font-bold text-slate-500 hover:text-green-700 rounded-md transition-colors flex items-center space-x-1 cursor-pointer"
                            >
                              <span>👍</span>
                              <span>Thích</span>
                              {msg.likes > 0 && <span className="font-mono text-green-800 font-black">({msg.likes})</span>}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form chat inputs */}
              <form onSubmit={handleSendChatMessage} className="flex gap-2 font-sans text-xs">
                <input
                  id="chat-chat-box-input"
                  type="text"
                  placeholder="Bà con nhắn giá sầu hôm nay, dịch bệnh nứt rễ vào đây..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow p-2.5 border border-slate-200 rounded-xl outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 font-medium"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center border border-green-600"
                  title="Gửi tin nhắn"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {/* Guidelines support card block */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 text-xs text-left font-sans flex items-start space-x-2.5">
            <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-amber-950 font-bold block">Quy tắc trò chuyện văn minh:</strong>
              <p className="text-slate-650 text-[10.5px] leading-relaxed">
                Tập trung san sẻ kinh nghiệm bón lót kẽ mương mán, cảnh báo dông lốc mưa dầm bão sém đầu cơi, cập nhật giá thu hoạch chính quy, không mua bán găm hàng trái phép. Thương lái và nhà vườn kết nối văn minh, lịch thiệp.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
