import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, ChevronUp, Sparkles, PhoneCall, HelpCircle, BadgeCheck, Paperclip, Loader2 } from 'lucide-react';

interface ChatMsg {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
  channel: 'expert' | 'coordinate';
  fileAttachment?: {
    name: string;
    size: string;
    blobUrl: string;
    type: string;
    base64?: string;
  };
}

export default function LiveChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'expert' | 'coordinate' | 'bug'>('expert');
  const [inputValue, setInputValue] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  // States for Technical Bug / Incident Reporting flow
  const [bugCategory, setBugCategory] = useState('payment');
  const [bugPhone, setBugPhone] = useState('');
  const [bugName, setBugName] = useState('');
  const [bugDesc, setBugDesc] = useState('');
  const [bugSubmitted, setBugSubmitted] = useState(false);
  const [bugSubmitting, setBugSubmitting] = useState(false);
  const [bugTicketId, setBugTicketId] = useState('');

  // --- FILE UPLOADS AND DRAG-AND-DROP IN LIVE SUPPORT ---
  const [attachedFile, setAttachedFile] = useState<null | { name: string, size: string, blobUrl: string, type: string, base64?: string }>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileAttach = (file: File) => {
    // Generate a temporary blob URL for previews
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        blobUrl: URL.createObjectURL(file),
        type: file.type,
        base64: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileAttach(e.target.files[0]);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileAttach(e.dataTransfer.files[0]);
    }
  };
  
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'init-1',
      sender: 'agent',
      text: 'Chào anh/chị! Tôi là Lâm - Kỹ sư Nông nghiệp thuộc Ban hỗ trợ kỹ thuật vườn của dự án "Nhà nông Hết Sầu". Anh/chị cần giải đáp thắc mắc về kỹ thuật bón vi sinh, phòng muội búp sầu riêng hay nhật ký VietGAP không ạ? 🌸',
      time: 'Vừa xong',
      channel: 'expert'
    },
    {
      id: 'init-2',
      sender: 'agent',
      text: 'Xin chào quý doanh nghiệp và bà con thương lái! Trạm điều phối thu gom Hết Sầu luôn trực tuyến hỗ trợ liên thông đặt xe lạnh và kết nối với các nhà vườn uy tín. Hãy nhắn mã liên kết để chúng tôi hỗ trợ ngay.',
      time: '10:05',
      channel: 'coordinate'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerResponseLogic = (typedText: string, hasImage: boolean, fileName: string, currentChannel: 'expert' | 'coordinate') => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      let agentReply = '';

      if (currentChannel === 'expert') {
        if (hasImage) {
          if (typedText.includes('mặn') || typedText.includes('lá') || typedText.includes('cháy')) {
            agentReply = `💡 Chẩn đoán hình ảnh rễ/lá sầu riêng từ ảnh vườn dính kèm "${fileName}": Phát hiện mép cơi lá cháy xém vàng sần sùi do ảnh hưởng tích tụ clo từ độ mặn nguồn nước tưới cao. Chỉ mức độ xâm mặn mương đang đo ~1.2‰. Bà con chú trọng khóa van cống mương túp ngọt và phun phục hồi bằng tinh chất Brassinolide kết hợp đạm sinh học humic gấp nhé!`;
          } else if (typedText.includes('gốc') || typedText.includes('mủ') || typedText.includes('vỏ') || typedText.includes('thân')) {
            agentReply = `💡 Chẩn đoán hình ảnh vết loét mủ đính kèm "${fileName}": Lớp vỏ hóa nâu rỉ nước nhựa kẹo dẻo đích thị là vết Thối cổ rễ gummosis do nấm Phytophthora bọc rễ. Bà con nhanh gọt sột lớp vỏ thối xám, quét sệt đậm đặc thuốc Metalaxyl quét kín sẹo vỏ sầu 2 bận cách 5 ngày nhé!`;
          } else {
            agentReply = `Cảm ơn anh/chị đã gửi hình ảnh thực tế "${fileName}". Chuyên gia thực địa htx đã nạp tệp phân tích: Nhận thấy đốm muội lá rầy phấn tơ đầu cơi non vừa mở lá và dấu hiệu thiếu hụt chất Ca-Bo gây vách múi móp bông. Bà con cần tăng canxi bo tạt sương sớm ráo sương chuẩn hữu cơ VietGAP nhé!`;
          }
        } else if (fileName) {
          agentReply = `Trạm kỹ thuật đã nạp tài liệu phân kiểm mẫu "${fileName}". Dựa trên phân tích tham thông, lô sầu chuẩn ráo vỏ cơm béo hoàn toàn đạt mốc sạch dạt dư lượng, đáp ứng tươm tất bộ chuẩn kiểm mẫu VietGAP xuất khẩu chính ngạch!`;
        } else if (typedText.includes('mặn') || typedText.includes('nước mặn') || typedText.includes('hạn mặn') || typedText.includes('muối') || typedText.includes('độ mặn')) {
          agentReply = `🌊 KỊCH BẢN ỨNG PHÓ XÂM NHẬP MẶN SẦU RIÊNG (CAI LẬY - CHỢ LÁCH):
Sầu riêng cực kỳ mẫn cảm với khí clo và muối Natri. Độ mặn nước > 0.5‰ hành rụng lá lẹ, đen chồi và hư hoại cả cội cây già.

🛡️ PHƯƠNG ÁN PHÒNG CHỐNG CẤP BÁCH:
1. Đo cẩn thận nguồn nước sông tát mương trước những ngày xả tưới bằng bút đo EC. Tưới sầu chỉ khi mốc mặn < 0.5‰.
2. Đóng tuyệt đối cống đóng bao mương máng giữ cự ngọt nước. Trải phủ màng bạt nylon đáy mương trữ nước tơm sọt ngọt ngọt.
3. Phủ phủ rơm khô rạ hoai hay rập bèo tây cao 15-20cm che bệ rễ gốc giúp tránh gió dạo, giảm tủa hơi nước gốc cát cát.
4. Xịt lá Silic-Kali kết dính giúp tế bào vách rễ khỏe ngậm phèn chịu mặn, bón lân nung chảy kích sẹo tơ ra rễ bói hoa tốt.`;
        } else if (typedText.includes('thối rễ') || typedText.includes('chảy mủ') || typedText.includes('xì mủ') || typedText.includes('thối gốc') || typedText.includes('chảy nhựa') || typedText.includes('nấm')) {
          agentReply = `🪵 KỊCH BẢN CHỮA TRỊ NẤM PHYTOPHTHORA GÂY THỐI GỐC CHẢY MỦ SẦU:
Tác sinh bởi nấm Phytophthora palmivora xực hại tơ sọc rễ bọc vỏ trong kỳ mưa bão úng xối khí cống mương ẩm dột.

🚑 QUY TRÌNH CHIA THỜI GẤP CỦA KỸ SƯ:
1. Gọt cọ sột nhẹ vũng sẹo mủ kẹo đến thấu gộc vỏ gỗ ráo lành trắng bóng.
2. Trét phết quét trực tiếp thuốc gói Metalaxyl-M sệt nguyên chất tủa lên sẹo hớ vết phạt 2 bận cách 4-5 ngày để ngắt nhựa chọc loét rộp.
3. Khớp tưới tưới nấm đè Trichoderma đối kháng sục chọc nền quanh chu vi tủa vòng tán rễ bói hoa dập mốc nấm dột đất.
4. Cắt ráo tuyệt bón đạm hóa học (Nitơ khô) vì đạm làm trương ngậm đọt tơi sụt vách tế bào mủ loét mủ.`;
        } else if (typedText.includes('rầy') || typedText.includes('rầy phấn') || typedText.includes('rầy xanh') || typedText.includes('đọt héo') || typedText.includes('muội búp')) {
          agentReply = `🦟 KỊCH BẢN DIỆT TRỪ RẦY PHẤN XANH HẠI CƠI ĐỌT NON SẦU RIÊNG:
Côn trùng rầy chọc gai vòi bám hút bầu đọt từ mốc non 'mũi giáo' mở búp tơi làm cháy rộc và rụng thui đọt tột chỉ còn trơ cành xương cá.

🍃 PHÁC ĐỒ TỰ NHIÊN CHUẨN XUẤT VIETGAP:
1. Lúc đọt non rộ cơi bọc nhú 'mũi giáo' tầm 1-2cm, xịt phòng bằng dầu hữu cơ Neem oil dập muội muội trứng bói rầy.
2. Xung xịt thuốc sinh học gốc khuẩn nấm Beauveria rầy, xịt đè sâm sớm tờ mờ khi rầy ướt cánh đọng sương chưa rập cánh rộ bay.
3. Giữ nền phủ lách xanh cỏ dại mương mát tầm 10cm làm sinh quyển bảo quản nhện ăn rầy bộc hại đầu vườn.`;
        } else if (typedText.includes('rụng hoa') || typedText.includes('rụng bông') || typedText.includes('rụng quả') || typedText.includes('rụng trái') || typedText.includes('sốc nước') || typedText.includes('mưa dầm')) {
          agentReply = `🍒 KỊCH BẢN GIẢM THIỂU RỤNG HOA VÀ TRÁI NON DO SỐC NƯỚC MƯA BÃO:
Thay nhiệt ẩm hanh rộc nắng vầy dột mưa bão giông ập khiến gốc sầu hút ẩm ồ ạt sưng cuống, bẻ rách khớp đốt tủa tầng tháo hột hoa quả rụng xáp.

🚒 PHÒNG NẠN TỨC THÌ ĐỠ THẤT VẬT:
1. Đập xẻ đào sâu ngách rãnh thoát nước gấp ngang 20cm, dốc thẳng mương chính xả tháo úng trong 1 tiếng sau giông ngập.
2. Phun tinh chặn cơi đọt bằng sương Kali Sunfat giảm súc cây kéo đọt sinh trưởng cạnh tranh dưỡng năng với nụ non quả non.
3. Đắp xịt bồi vách cuống bằng sương vi chất Canxi Bo hữu cơ tạt liên tục gấp đôi liều thường khép màng tầng dẻo dai cuống trái.`;
        } else if (typedText.includes('sượng') || typedText.includes('sượng cơm') || typedText.includes('nhão cơm') || typedText.includes('chín nhão')) {
          agentReply = `🍈 KỊCH BẢN GIẢI QUYẾT SƯỢNG LỌT CƠM & CHÍN NHÃO TRONG VƯỜN SẦU:
Nhận đạm cao mỏi cơi ngậm úng úng tủa làm cơm dập dẻo cứng lóc thịt chai vàng sượng sần hoặc biến chất rữa rục chín vữa chảy mật mật.

💡 BẢO CHỨNG RAO CƠM BÉO SÁP CHẮC MÚI:
1. Chặn chặt đạm và phân khoáng giàu Nitơ hóa hộc trước ngày cắt bói thu quả từ 35-40 ngày liền kề dạt hộc.
2. Xịt lá Kali Sunfat bối tăng vị tinh sột tinh bột lên màu vàng mật mật dẻo kẹo đậm bọt bọt cơm dẻo dẻo ráo cơm.
3. Rút siết kiệt đáy bùn mương nước cạn kiệt 15 ngày chót giúp gốc khô hanh bệ mùn bóng mịn sầu múi cơm ngon nhất!`;
        } else if (typedText.includes('ri6') || typedText.includes('monthong') || typedText.includes('giá') || typedText.includes('bán')) {
          agentReply = 'Hiện tại giá thu hoạch sầu Ri6 đẹp từ vườn đang neo từ 78.000đ - 82.000đ/kg hoa đọt; Monthong lựa chuẩn sọt bốc vỏ tôm từ 115.000đ - 124.000đ/kg dạo chợ. HHTX đang giúp nhà vườn lên cơi VietGAP bao cọc thương vị sớm. Năng suất vườn chuẩn mực cơm ráo ngọt!';
        } else if (typedText.includes('bón phân') || typedText.includes('vi sinh') || typedText.includes('canh tác') || typedText.includes('vietgap')) {
          agentReply = 'Lời bối nông vận: Chắt rỉ cá mật hoai bón xới ẩm bệ gốc kết hợp humic lân trung vi lượng tơm tắp sau 60 ngày thụ phấn xả nụ. Bà con rà bọc vào Dashboard hầm sổ viết tót đầy dủ sổ gốc nhé!';
        } else {
          agentReply = 'Đối diện lo âu mận xâm, gạt rầy cháy, chảy loét sần sùi sầu riêng đã có kỹ sư Lâm nông vận sát rọ rào. Bà con gửi ngay đính ảnh hoặc tệp thống kê loét lá để htx lập túp kê toa tư vấn sớm tốc lực nhất!';
        }
      } else {
        // coordinate channel replies
        if (hasImage) {
          if (typedText.includes('xe') || typedText.includes('lạnh')) {
            agentReply = `🚛 Đối soát định vựng xe tải container lạnh từ ảnh gửi kèm "${fileName}": Cảm biến lõi container đo được nhiệt trơn 14.3°C, ẩm tủa 85% khớp đúng luồng, đậu vị bãi rào Cai Lậy. HTX đã ký thông lệnh thông dỡ bốc hóa đơn!`;
          } else if (typedText.includes('tiền') || typedText.includes('cọc') || typedText.includes('bảo chứng')) {
            agentReply = `🤝 Đối rà tệp sao kê chuyển khoản bao tiêu cọc "${fileName}": Đã nhận phong tỏa an toàn khoản lưu ký 30% ước trị thương gói tại Mb-Mockbank. Hệ thống đã mở hóa đơn điện tử bảo hộ đầu cuối uy tín cho nhà vườn và thương lái!`;
          } else {
            agentReply = `Trạm điều phối đã xác nhận khớp tài liệu đính kèm "${fileName}". Hồ sơ bọc sạt lo hàng đã lưu vào sườn biên biên nhận thương lái an tâm vận chuyển!`;
          }
        } else if (fileName) {
          agentReply = `HTX Hết Sầu nông vận đã nhận tệp vận tải hồ sơ vùng dạt xuất bọc "${fileName}". Đang liên vận hải quan cửa khẩu thông kiểm dịch nhanh chóng mượt mà chỉ 3 tiếng!`;
        } else if (typedText.includes('thanh toán') || typedText.includes('cọc') || typedText.includes('tiền') || typedText.includes('bùng cọc') || typedText.includes('bẻ kèo') || typedText.includes('tranh chấp')) {
          agentReply = `🤝 KỊCH BẢN XỬ LÝ TRANH CHẤP & RỦI RO BÙNG CỌC GIAO DỊCH:
Trồi sụt giá cả rất dễ nảy sinh bẻ bộc (lái ép ép gõ sụt giá xô dạn trái khi thị trường tụt dột, nhà vườn rầu lòng bẻ kèo bán xô ngoài khi vựa vọt cao).

🛡️ BẢO VỆ 2 TẦNG CHUYÊN BIỆT KHỚP MẠNG:
1. Hợp Đồng Bản Mẫu 3 Bên điện tử ràng buộc nghĩa vụ pháp lý Hộ nông dân - Nhà thu vựa xuất khẩu - Tổ trọng tài Hợp tác xã điều phối.
2. Đóng cọc ký thác 30% bảo lưu ví Hết Sầu Pay phong tỏa MB-Bank liên thông. Nếu cố ý tà bẻ kèo bùng hứa bốc gai, tự động cấn trích phạt tiền đền bù lập tức sang bên bị hại.
3. Tổ trực sạt HTX gõ gai đo lứa bao sọt phân Loại A B đối chất công khai minh bạch chuẩn quốc gia!`;
        } else if (typedText.includes('vận chuyển') || typedText.includes('xe') || typedText.includes('lạnh') || typedText.includes('container')) {
          agentReply = `🚛 KỊCH BẢN ĐIỀU PHỐI CONTAINER LẠNH XUẤT KHẨU CHÍNH NGẠCH:
Trái già cắt tươi rải rộ khí etylen ủ chua cần giữ lạnh ráo dẻo 13 - 15°C thông suốt gió sườn hông để tránh thối gai và lên men sạt ngột cơm hộc quả.

⚙️ ĐẦU VẬN TẢI CHUẨN CONTAINER HẾT SẦU:
1. Container xe ráo lạnh của bãi liên vận dốc dạt có mặt nổ máy chạy làm phên thùng xe trước 2 tiếng bốc sầu.
2. Luồn cảm biến IoT đo biểu đồ nhiệt lõi thùng xe đồng bộ dán trực tuyến thẳng lên Dashboard giám sát ròng rọc.
3. Chờ đón cấp phiếu ưu tiên thông luồng xanh tờ khai vùng trồng xuất chính sang biên mượt mà 3-4 tiếng!`;
        } else if (typedText.includes('giá sầu') || typedText.includes('giá bán') || typedText.includes('thị trường')) {
          agentReply = `📈 CHỈ SỐ GIAO DỊCH GIÁ SẦU RIÊNG TÂY NAM BỘ HÔM NAY:
Dữ liệu cập nhật trực tiếp tại vựa bãi đóng sọt huyện Cai Lậy & Chợ Lách:
- Sầu Ri6 đẹp (A - Lựa chuẩn vựa): 78.500 đ/kg (đầy hộc, gai ráo tơm đều).
- Sầu Monthong Thái đẹp (A - Xuất tuyển): 118.000 đ/kg (cơm ráo sáp béo dịu).
- Sầu dạt xô rổ mém hộc (Loại B-C): 42.000 - 55.000 đ/kg tùy độ tươm dộ bóng vỏ.
*Khuyến khuyến bối:* Bà con thu hoạch khớp cọc bao dạt sớm trên bảo chứng Hết Sầu Pay của chung tôi để chốt giá đầm ấm phòng dịch biến!`;
        } else {
          agentReply = 'Hệ thống điều phối xe vận, bảo chứng lưu cọc thanh toán Mb-bank và hợp đồng 3 bên an tâm tơm sọt cho nhà vườn và đại lý Cai Lậy/Cái Bè luôn trực tuyến tốt. Anh chị thương lái cứ chia sẻ lo hàng để trọng tài giám sát khớp nhanh!';
        }
      }

      setMessages(prev => [...prev, {
        id: `msg_a_${Date.now()}`,
        sender: 'agent',
        text: agentReply,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        channel: currentChannel
      }]);
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !attachedFile) return;

    const currentInput = inputValue;
    const currentAttachment = attachedFile;

    const userMsg: ChatMsg = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: currentInput || `[Gửi đính kèm tài liệu: ${currentAttachment?.name}]`,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      channel: activeTab,
      fileAttachment: currentAttachment || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    
    const typedText = currentInput.toLowerCase();
    const hasImage = currentAttachment?.type.startsWith('image/') || false;
    const fileName = currentAttachment?.name || '';
    
    setInputValue('');
    setAttachedFile(null); // clear after sending
    
    triggerResponseLogic(typedText, hasImage, fileName, activeTab);
  };

  const handleQuickSelectBubble = (text: string) => {
    // Dispatch user bubble
    const userMsg: ChatMsg = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      channel: activeTab
    };

    setMessages(prev => [...prev, userMsg]);
    
    triggerResponseLogic(text.toLowerCase(), false, '', activeTab);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      {/* Floating launcher trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 bg-gradient-to-tr from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer ring-4 ring-green-150"
          id="btn-open-livechat-launcher"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-black text-slate-950">
              {unreadCount}
            </span>
          )}
          
          <span className="absolute -bottom-2 bg-slate-950 text-white font-bold text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-full whitespace-nowrap opacity-85 border border-slate-700">
            Hỗ trợ 24/7
          </span>
        </button>
      )}

      {/* Expanded chat drawer support */}
      {isOpen && (
        <div className="bg-white rounded-2xl w-80 md:w-96 h-[480px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col justify-between animate-in slide-in-from-bottom duration-200">
          
          {/* Chat box title header */}
          <div className="bg-gradient-to-r from-green-905 via-green-800 to-emerald-800 p-3.5 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></div>
              <div>
                <h4 className="font-display font-black text-xs uppercase tracking-wider flex items-center">
                  <span>Trực Tuyến Hết Sầu Live Chat</span>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 ml-1" />
                </h4>
                <p className="text-[9.5px] text-slate-350 font-medium">Đối thoại cùng các hộ sầu & Trạm nông vận</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Service Channel stream Tabs */}
          <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200 p-1 text-[9.5px] font-sans font-extrabold gap-0.5">
            <button
              onClick={() => setActiveTab('expert')}
              className={`py-1.5 rounded-md text-center cursor-pointer transition-colors ${activeTab === 'expert' ? 'bg-white text-green-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="Kênh tư vấn kỹ sư nông học"
            >
              👩‍🔬 Tư Vấn Vườn
            </button>
            <button
              onClick={() => setActiveTab('coordinate')}
              className={`py-1.5 rounded-md text-center cursor-pointer transition-colors ${activeTab === 'coordinate' ? 'bg-white text-green-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="Kênh kết nối điều xe bến bãi"
            >
              🚛 Điều Xe Bãi
            </button>
            <button
              id="switcher-tab-bug-report"
              onClick={() => setActiveTab('bug')}
              className={`py-1.5 rounded-md text-center cursor-pointer transition-all ${activeTab === 'bug' ? 'bg-rose-600 text-white font-black shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
              title="Báo cáo lỗi kỹ thuật hoặc tranh chấp gấp"
            >
              ⚠️ Báo Lỗi 24/7
            </button>
          </div>

          {activeTab === 'bug' ? (
            <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto min-h-0 text-left">
              {bugSubmitted ? (
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-md ring-4 ring-emerald-50 mix-blend-multiply">
                    <BadgeCheck className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm font-display font-black text-slate-900 block uppercase">
                      Đăng Ký Báo Lỗi Thành Công!
                    </strong>
                    <span className="text-[11px] text-emerald-800 font-mono font-bold bg-emerald-50 border border-emerald-250 px-2.5 py-0.5 rounded-full inline-block">
                      Mã Số: {bugTicketId}
                    </span>
                  </div>
                  <p className="text-[10.5px] leading-relaxed text-slate-600 max-w-xs font-sans">
                    Hệ thống đã mã hóa SHA256 và lập trình phiếu xử lý gửi đến Ban Trọng Tài Kỹ Thuật liên ngành HTX "Nhà nông Hết Sầu". Một chuyên viên trực ban sẽ gọi điện hoặc qua kênh nhắn tin Zalo hỗ trợ bạn trong vòng 5-10 phút kế tiếp.
                  </p>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl w-full text-[10px] space-y-1.5 text-left text-slate-500 font-medium">
                    <div>● Danh mục sự cố: <strong className="text-slate-800">{
                      bugCategory === 'payment' ? 'Cổng thanh toán bảo chứng Hết Sầu Pay' :
                      bugCategory === 'map' ? 'Định vị Bản đồ nguồn cung' :
                      bugCategory === 'contract' ? 'Lỗi chữ ký số hợp đồng 3 bên' :
                      bugCategory === 'ai' ? 'Trợ lý thông minh AI Agronomist' :
                      bugCategory === 'dispute' ? 'Tranh chấp đặt cọc / kỳ kèo bực bội' : 'Ý kiến phản ánh kỹ thuật khác'
                    }</strong></div>
                    <div>● Tên bà con nông gia: <strong className="text-slate-800">{bugName}</strong></div>
                    <div>● Hotline Zalo: <strong className="text-slate-850 font-mono">{bugPhone}</strong></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setBugSubmitted(false);
                      setBugPhone('');
                      setBugName('');
                      setBugDesc('');
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Báo thêm sự cố khác
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!bugPhone.trim() || !bugDesc.trim() || !bugName.trim()) {
                      alert('Bà con vui lòng nhập đủ số điện thoại và mô tả lỗi để kỹ sư gọi lại cứu viện nhé!');
                      return;
                    }
                    setBugSubmitting(true);
                    setTimeout(() => {
                      setBugSubmitting(false);
                      setBugTicketId(`#ERR-SAU-${Math.floor(1000 + Math.random() * 9000)}`);
                      setBugSubmitted(true);
                    }, 1200);
                  }}
                  className="p-4 space-y-3 font-sans text-slate-800 text-left flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] text-slate-400 font-bold block uppercase">1. Chọn loại sự cố gặp phải:</label>
                      <select
                        value={bugCategory}
                        onChange={(e) => setBugCategory(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-rose-500 outline-none text-left"
                      >
                        <option value="payment">💳 Lỗi cổng thanh toán bảo chứng Hết Sầu Pay</option>
                        <option value="map">🗺️ Lỗi liên quan đến Bản đồ & định vị nhà vườn</option>
                        <option value="contract">✍️ Trục trặc ký số hợp đồng / giao ước thương lái</option>
                        <option value="ai">🤖 Trợ lý chẩn đoán sâu bệnh AI Agronomist trả lời sai</option>
                        <option value="dispute">⚓ Kháng nghị bùng cọc / Lái buôn ép giá mùa dột</option>
                        <option value="other">🛠️ Lỗi kỹ thuật truyền thông khác trên ứng dụng</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block uppercase">2. Tên bà con:</label>
                        <input
                          type="text"
                          value={bugName}
                          onChange={(e) => setBugName(e.target.value)}
                          placeholder="Út Đẹt Cai Lậy..."
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-rose-500 outline-none animate-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold block uppercase">3. Số ĐT (Zalo):</label>
                        <input
                          type="tel"
                          value={bugPhone}
                          onChange={(e) => setBugPhone(e.target.value)}
                          placeholder="SĐT liên hệ..."
                          className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold font-mono focus:ring-1 focus:ring-rose-500 outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-400 font-bold block uppercase">4. Chi tiết sự cố gặp phải:</label>
                      <textarea
                        value={bugDesc}
                        onChange={(e) => setBugDesc(e.target.value)}
                        placeholder="Mô tả lỗi hoặc sự việc tranh chấp ép bớt giá trị sầu riêng..."
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium h-20 resize-none focus:ring-1 focus:ring-rose-500 outline-none text-left"
                        required
                      />
                    </div>

                    {/* Attachment trigger inside bug sub-form */}
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">5. Ảnh đính kèm (nếu có):</span>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-slate-300 rounded-xl p-2.5 bg-white flex items-center justify-center gap-1.5 cursor-pointer text-slate-500 hover:bg-slate-100"
                      >
                        <Paperclip className="w-3.5 h-3.5 text-rose-550" />
                        <span className="text-[10.5px] font-sans font-semibold truncate max-w-[200px]">
                          {attachedFile ? attachedFile.name : 'Đính kèm tệp / ảnh lỗi...'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={bugSubmitting}
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl text-[11px] flex items-center justify-center space-x-1.5 shadow-sm transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    {bugSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang gửi hồ sơ cứu nạn...</span>
                      </>
                    ) : (
                      <span>GỬI BÁO LỖI KHẨN CẤP (PHẢN HỒI 5')</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* Message Stream lists */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="flex-1 bg-slate-50/70 p-4 overflow-y-auto space-y-3 relative"
              >
                {isDragging && (
                  <div className="absolute inset-0 bg-green-905/10 bg-green-950/20 backdrop-blur-xs flex items-center justify-center z-20 pointer-events-none p-4">
                    <div className="bg-white/95 border-2 border-dashed border-green-700 p-6 rounded-2xl shadow-xl text-center space-y-2 max-w-xs ring-4 ring-green-150 animate-in zoom-in duration-100">
                      <div className="w-12 h-12 bg-green-100 text-green-800 rounded-xl flex items-center justify-center mx-auto">
                        <Paperclip className="w-6 h-6 animate-bounce" />
                      </div>
                      <strong className="text-slate-800 text-xs block">Thả hình ảnh hoặc tệp vào đây</strong>
                      <p className="text-[10px] text-slate-400">Hỗ trợ JPG, PNG, PDF, Excel, CSV, VietGAP DOCS</p>
                    </div>
                  </div>
                )}

                {messages
                  .filter(m => m.channel === activeTab)
                  .map((m) => {
                    const isUser = m.sender === 'user';
                    return (
                      <div key={m.id} className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
                        {!isUser && (
                          <div className="w-7 h-7 rounded-lg bg-green-900 text-yellow-350 flex items-center justify-center font-bold text-[10px] shadow-xs uppercase">
                            HTX
                          </div>
                        )}
                        
                        <div className="space-y-0.5 max-w-[78%]">
                          <div className={`p-2.5 rounded-xl text-xs font-sans ring-1 ${isUser ? 'bg-green-700 text-white font-medium rounded-tr-none ring-green-600 shadow-xs' : 'bg-white text-slate-800 rounded-tl-none ring-slate-200'} text-left`}>
                            <div>{m.text}</div>
                            
                            {/* Rendering attached file inside bubble */}
                            {m.fileAttachment && (
                              <div className={`mt-2 p-2 rounded-lg text-left ${isUser ? 'bg-green-800/80 border border-green-650' : 'bg-slate-50 border border-slate-200'} text-[11px] space-y-1.5`}>
                                {m.fileAttachment.type.startsWith('image/') ? (
                                  <div className="relative group">
                                    <img
                                      src={m.fileAttachment.blobUrl}
                                      alt={m.fileAttachment.name}
                                      className="max-h-36 rounded-md object-contain w-full bg-slate-50 border border-slate-200"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className={`text-[9px] mt-1 truncate ${isUser ? 'text-green-200' : 'text-slate-400'}`}>
                                      📸 {m.fileAttachment.name} ({m.fileAttachment.size})
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span className="truncate max-w-[130px]" title={m.fileAttachment.name}>
                                      📄 {m.fileAttachment.name}
                                    </span>
                                    <span className={`text-[9px] ${isUser ? 'text-green-300' : 'text-slate-400'}`}>
                                      ({m.fileAttachment.size})
                                    </span>
                                    <a
                                      href={m.fileAttachment.blobUrl}
                                      download={m.fileAttachment.name}
                                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-all whitespace-nowrap ${isUser ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-green-100 text-green-850 hover:bg-green-200'}`}
                                    >
                                      Tải Về
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <span className={`block text-[9px] text-slate-400 font-mono ${isUser ? 'text-right' : 'text-left'}`}>
                            {m.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                {isTyping && (
                  <div className="flex items-start gap-2 justify-start">
                    <div className="w-7 h-7 rounded-lg bg-green-900 text-yellow-350 flex items-center justify-center font-bold text-[10px]">
                      HTX
                    </div>
                    <div className="bg-white p-2 text-slate-500 text-xs rounded-xl rounded-tl-none ring-1 ring-slate-200 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef}></div>
              </div>

              {/* Quick-reply chips */}
              <div className="bg-slate-50 px-3 py-1.5 border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[9.5px] font-sans scrollbar-none whitespace-nowrap">
                {activeTab === 'expert' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleQuickSelectBubble('Đang bị hạn mặn xâm nhập sầu riêng sông Tiền, xử lý nước mặn ra sao?')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-green-600 hover:text-green-800 cursor-pointer font-bold text-[10px]"
                    >
                      🌊 Hạn mặn sông Tiền?
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSelectBubble('Sầu riêng bị nấm Phytophthora gây thối rễ xì mủ chảy nhựa vết loét vỏ thân?')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-green-600 hover:text-green-800 cursor-pointer font-bold text-[10px]"
                    >
                      🪵 Gốc xì mủ loét rễ?
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSelectBubble('Cách phun dịch thuốc sinh học diệt rầy phấn xanh hại cơi đọt non chuẩn VietGAP?')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-green-600 hover:text-green-800 cursor-pointer font-bold text-[10px]"
                    >
                      🦟 Đọt non dính rầy?
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSelectBubble('Mưa dầm sốc nước đột ngột bị rụng bông nụ rụng trái tháo cuống ráo hoảnh?')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-green-600 hover:text-green-800 cursor-pointer font-bold text-[10px]"
                    >
                      🍒 Mưa sốc rụng bông quả?
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSelectBubble('Cơm sầu bị sượng cơm dính chín nhão sần sùi cơm bị nước dột?')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-green-600 hover:text-green-800 cursor-pointer font-bold text-[10px]"
                    >
                      🍈 Cơm sượng nhão?
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleQuickSelectBubble('Rủi ro bùng cọc bẻ kèo tranh chấp ép giá, cơ chế Hết Sầu Pay bảo chứng ra sao?')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-green-600 hover:text-green-800 cursor-pointer font-bold text-[10px]"
                    >
                      🤝 Tranh chấp bẻ kèo?
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSelectBubble('Điều phối đặt container xe tải tủ lạnh sấy lạnh hạ cảng xuất chính ngạch?')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-green-600 hover:text-green-800 cursor-pointer font-bold text-[10px]"
                    >
                      🚛 Vận xe container lạnh?
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSelectBubble('Báo giá chỉ số thị trường sầu riêng Cai Lậy Monthong Ri6 hôm nay thương vựa?')}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-green-600 hover:text-green-800 cursor-pointer font-bold text-[10px]"
                    >
                      📈 Chỉ số giá thị trường?
                    </button>
                  </>
                )}
              </div>

              {/* File Attachment preview bar */}
              {attachedFile && (
                <div className="bg-slate-100 border-t border-slate-200 px-3 py-2 flex items-center justify-between text-xs text-slate-700 gap-2 font-medium">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-emerald-700 flex-shrink-0 font-bold">📎 Sắp gửi:</span>
                    <span className="truncate max-w-[180px] font-semibold text-slate-800">{attachedFile.name}</span>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">({attachedFile.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="p-1 hover:bg-slate-200 rounded-full text-slate-500 hover:text-red-650 transition-colors cursor-pointer"
                    title="Bỏ tệp"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Form input messaging */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept="image/*,.pdf,.xlsx,.xls,.csv,.doc,.docx,.txt"
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-400 hover:text-green-800 hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex-shrink-0"
                  title="Đính kèm tệp / ảnh vườn sầu riêng"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={attachedFile ? "Bấm nút Gửi để tải tài liệu lên..." : "Nhập câu hỏi hoặc thả tệp..."}
                  className="flex-1 p-2 bg-slate-100 rounded-xl outline-none font-sans text-xs focus:ring-1 focus:ring-green-600 bg-slate-50 border border-slate-200"
                />
                <button
                  id="btn-livechat-send-message"
                  type="submit"
                  className="p-2 bg-green-800 hover:bg-green-900 text-white rounded-xl transition-all cursor-pointer flex-shrink-0 flex items-center justify-center shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
