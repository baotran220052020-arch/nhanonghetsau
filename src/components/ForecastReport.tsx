import React, { useState, useRef, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Award, AlertTriangle, CloudSun, Calendar, Flame, LineChart as LucideLineChart, TrendingUp, HelpCircle, CheckCircle2, ChevronRight, BookOpen, ShieldCheck, FileDown, Loader2, Printer, Download, Check, Eye, RefreshCw, Cpu, MessageSquare, Search, Send, ShieldAlert, Sparkles, BookOpenCheck, Paperclip, Trash2, X } from 'lucide-react';
import { MOCK_FORECAST_DATA, FARMING_EXPERTISE, ENTERPRISE_QUALITY_STANDARDS } from '../data';

const FARMING_TECHNICAL_GUIDES = [
  {
    id: 1,
    title: '1. Lịch Canh Tác & Xả Nhụy Tối Ưu',
    shortDesc: 'Khung giờ vàng quét phấn bằng chổi lông thỏ và phác đồ xiết nước gốc tránh sượng sầu.',
    iconName: 'Calendar',
    color: 'emerald',
    badge: 'Chuyên Sâu Sinh Lý Hoa Sầu',
    details: {
      introduction: 'Xả nhụy là thời điểm nhạy cảm nhất quyết định cây đậu quả tròn đều và hạn chế rụng quả non sinh lý. Thụ phấn nhân tạo bổ trợ vào ban đêm giúp ngăn sầu bị móp hộc, lép hông, quả thon dài đều múi mọng.',
      steps: [
        {
          name: 'Hãm nước & Tạo khô hạn (7-10 ngày trước xả nhụy)',
          content: 'Hãm nước tưới đột ngột ráo gốc hoặc giảm lượng nước tưới chỉ còn 20-30% ngày thường để đất thông thoáng, kích thích dịch nhầy nướu cái chuẩn bị dính nhầy đầy sinh lực.'
        },
        {
          name: 'Thụ phấn nhân tạo vào giờ vàng (18:30 - 21:00 tối)',
          content: 'Sử dụng chổi lông thỏ mịn hoặc chổi sợi ni lông siêu mềm quét sướt nhẹ rìa bao hoa đực đui chín vàng để rải hạt phấn rắc lên núm nhụy hoa cái nhầy mật.'
        },
        {
          name: 'Điều tiết nước phun sương (Ngay khi xả nhụy xong)',
          content: 'Tưới giữ ẩm thật nhẹ sương mát rễ sâu vào sáng sớm dại, tuyệt đối tránh tưới ngập vũng úng rễ làm nảy mầm lá non đè bẹp xả nhụy tháo khớp trái non.'
        },
        {
          name: 'Hãm nước dưỡng sáp bơ sệt (12 ngày trước gặt hái)',
          content: 'Giảm bón tưới ranh giọt còn 10-15 lít/bụi cách ngày để ráo dền cơm sầu bơ đặc sánh, triệt tiêu sượng dột sượng rẫy ẩm chua nước.'
        }
      ],
      tips: [
        'Nuôi ong mật trong vườn hoặc tạo vạt cỏ thưa mọc tự nhiên tránh phun độc tố để ong thụ phấn dại hiệu quả.',
        'Sử dụng các hợp chất Canxi-Bo hữu cơ nồng độ 0.05% xịt mặt dưới lá trước nở hoa 3 ngày để hạn chế nứt cuống lốp bông.'
      ],
      hasEstimator: true
    }
  },
  {
    id: 2,
    title: '2. Quản Lý Sâu Bệnh Tổng Hợp (IPM)',
    shortDesc: 'Khống chế thối quả nứt thân xì mủ Phytophthora bằng tinh vôi xanh và bẫy dính rầy nhảy pheromone.',
    iconName: 'ShieldAlert',
    color: 'sky',
    badge: 'Đạt Chuẩn VietGAP Đám Mây',
    details: {
      introduction: 'Mô hình quản lý dịch hại tổng hợp IPM sầu riêng coi việc giữ hệ sinh thái đất và tán mộc ở mốc cân bằng là rường cột để triệt tiêu sâu bệnh từ gốc và tránh để lại tì vết thuốc BVTV kiểm dịch hải quan.',
      steps: [
        {
          name: 'Quét rào vôi xanh sát nấm (Mùa lũ và bão dông)',
          content: 'Quét phèn vôi và tinh thạch xanh loãng cao 1.2M sườn cành cổ rễ để chặn nấm bào tử Phytophthora càn quét nứt gỗ chảy mủ thối đui gốc mộc.'
        },
        {
          name: 'Đặt bẫy pheromone vàng lóng (Đuổi rầy nhảy lá)',
          content: 'Treo bẫy dán màu vàng dạ quang sọc quanh mép tán lá 2M để thu gom rầy phấn nhảy, rệp sáp phá đọt tơ nhú đọt giáo.'
        },
        {
          name: 'Nhân nuôi thiên địch diệt sâu keo cắn quả',
          content: 'Thả kiến vàng dại, duy trì bao thảm phủ thực vật rễ cỏ sâu vừa phải để nuôi nấm xanh Metarhizium bọc mép rễ bắt bào tử nấm dại.'
        }
      ],
      tips: [
        'Liên tục kiểm đo độ pH đất đìa móng vườn sầu, luôn bồi vôi bón nâng mốc dải ổn định 5.5 - 6.5 để rễ khỏe.',
        'Không phun xịt kích lân bón lá nồng độ quá cao lúc có ẩm dốc bão vì dễ tạo dòng dẫn nấm thối sần da trái.'
      ]
    }
  },
  {
    id: 3,
    title: '3. Tỉa Cành, Tạo Tán & Chăm Sóc',
    shortDesc: 'Cưa rẫy nhánh tơ râm sườn, tạo ráo tán dưới 1M và bấm tỉa thưa bớt chùm trái méo.',
    iconName: 'Cpu',
    color: 'amber',
    badge: 'Tối Ưu Hoá Năng Lượng Cây',
    details: {
      introduction: 'Kiến thiết tán thông thoáng loại bỏ các nhánh vượt không hiệu quả dột nước, tập trung tinh túy dinh dưỡng cho các cành quả khỏe khoành nâng đỡ sầu trĩu quả không rách vỏ cành cái.',
      steps: [
        {
          name: 'Khống chế tầng vòm ngang (Tỉa cành vượt)',
          content: 'Dọn sạch cành vượt mọc dựng đứng dạng sừng trâu hút nước mồi, mé nhánh tơ rậm nằm rạp cách mặt đất dưới 1M để sườn mộc quang ráo.'
        },
        {
          name: 'Chọn lựa dọn cành sầu riêng mang quả',
          content: 'Giữ cành ngang cấp một phân bổ so le dọc thân cách nhau 25cm khỏe mạnh, cách mặt đất tối thiểu 1.5M trở lên.'
        },
        {
          name: 'Bấm bứt quả thưa loại trừ lốp quả méo hộc',
          content: 'Tiến hành khi quả bằng trứng bói (tuần 5 sau xả nhụy): Bấm các trái lép vai háp hộc, giữ mỗi chùm dẹt cách nhau chỉ 2-3 trái thon phân bổ rải rác.'
        }
      ],
      tips: [
        'Dùng sơn keo sát trùng nông học bôi bít sẹo cưa ngay để giữ thân mộc không hoen ố ngấm nước mưa.',
        'Từ tuần thứ 10, buộc néo cành quả chín vào trục cột gỗ phụ xung quanh vườn tránh gió giông giật rụng dạt.'
      ]
    }
  },
  {
    id: 4,
    title: '4. Công Thức Bón Phân Lót Theo Giai Đoạn',
    shortDesc: 'Chu trình dinh dưỡng hữu cơ vi sinh Trichoderma bồi bổ rễ lúa và đạm cá thuỷ phân bù béo cơm.',
    iconName: 'Award',
    color: 'amber',
    badge: 'Phân Bón Tuần Hoàn Không Clo',
    details: {
      introduction: 'Bón lót và bón thúc đúng thời điểm giúp rễ sầu miền Tây sục hấp thu lân vi lượng dồi dào, phát bông dẻo dai bộc phát cơm béo sệt rực rỡ.',
      steps: [
        {
          name: 'Phục hồi cấp tốc sau gặt hái (Bón nền lót gốc)',
          content: 'Bón rải 5-8kg phân tơi hữu cơ sinh học chứa vi sinh Trichoderma phối trộn lân nung chảy Lâm Thao kích nhú đọt và tái tạo bộ rễ mới.'
        },
        {
          name: 'Kích nụ nuôi bông hoa sầu non móng chuồng',
          content: 'Rải hữu cơ khoáng nhẹ, hạn chế ngưng tưới đạm vô cơ đơn hóa học (ngăn tượt sọc đọt tơ cạnh tranh chất nuôi nụ sầu riêng).'
        },
        {
          name: 'Bồi hộc cơm vàng nồng đượm (Giai đoạn nuôi hạt quả)',
          content: 'Tưới dịch sinh học tự ủ đạm cá thủy phân kết hợp bón phân sunfat kali dẻo hạt để củng cố brix ngọt lịm.'
        }
      ],
      tips: [
        'Nghiêm cấm lạm dụng phân chứa muối Clo (kali clorua sọc đỏ) vì nó bóp cháy mép tế bào sầu riêng rụng bông hàng loạt.',
        'Tuyệt đối rải rìa theo mép vòm tán lá nhỏ giọt không bón tấp sát đống ụ cổ rễ tơ của cây cây.'
      ]
    }
  },
  {
    id: 5,
    title: '5. Đáp Ứng Chứng Chỉ & Quy Định Bộ Nông Nghiệp PTNT',
    shortDesc: 'Bộ chuẩn hồ sơ mã số vùng trồng xuất khẩu sang thị trường Đông Á, tiêu chí Phytosanitary không tì vết.',
    iconName: 'CheckCircle2',
    color: 'teal',
    badge: 'Chuẩn Mực Kiểm Dịch Thực Vật',
    details: {
      introduction: 'Tổng hợp nghị định thư xuất khẩu sầu riêng chính ngạch ký liên tịch của Bộ Nông nghiệp PTNT và Tổng cục Hải quan nước nhập khẩu, hướng dẫn luồng xanh kho lạnh.',
      steps: [
        {
          name: 'Liên danh thiết lập vùng trồng tối thiểu',
          content: 'Diện tích trồng sầu riêng phải từ 10ha trở lên (hoặc gom liên kết HTX Hết Sầu), thực hiện ghi nhật ký điện tử dán định vị GPS đầy đủ thông suốt.'
        },
        {
          name: 'Rào cản dư lượng và côn trùng kiểm dịch bến cảng',
          content: 'Tuyệt đối sạch bong rệp sáp giả, nấm đỏ gai sùi, trứng bướm bèo, vỏ ngoài dọn đất sạch sẽ. Dư lượng các hoạt chất cấm < 0.01 PPM đạt chuẩn xanh.'
        },
        {
          name: 'Đóng thùng Carton mẫu & Hun trùng Pallet xuất khẩu',
          content: 'Sử dụng bao bì có lỗ thoáng khí in rõ rệt mã số cơ sở đóng gói (CSĐG) và mã số vùng trồng đã duyệt của Bộ.'
        }
      ],
      tips: [
        'Tải ứng dụng Nhà nông Hết Sầu để sử dụng máy sấy gép QR quét và kiểm tra tệp sao kê hải quan trực tiếp điện tử.',
        'Lựa chọn Monthong và Ri6 thu hái đủ tuổi chín chuẩn (trên 110 ngày tuổi sầu) để vỏ dai không bục dập trong xe container ròng lạnh.'
      ]
    }
  }
];

export default function ForecastReport() {
  const [activeSegment, setActiveSegment] = useState<'farmer' | 'enterprise'>('farmer');
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  // States for Interactive Price Chart
  const [chartVariety, setChartVariety] = useState<'all' | 'ri6' | 'monthong'>('all');
  const [chartSource, setChartSource] = useState<'garden' | 'vua' | 'export'>('garden');

  // New States for Cultivation & Compliance Bento Cards Interactive Features
  const [farmingSearch, setFarmingSearch] = useState('');
  const [selectedFarmingCard, setSelectedFarmingCard] = useState<any | null>(null);
  const [estVariety, setEstVariety] = useState<'ri6' | 'monthong'>('monthong');
  const [estBloomDate, setEstBloomDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Estimated harvest date calculation helper
  const calculatedHarvestDate = useMemo(() => {
    if (!estBloomDate) return '';
    try {
      const date = new Date(estBloomDate);
      // Monthong takes ~115 days, Ri6 takes ~95 days from bloom.
      const daysToAdd = estVariety === 'monthong' ? 115 : 95;
      date.setDate(date.getDate() + daysToAdd);
      return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return '';
    }
  }, [estVariety, estBloomDate]);

  // Handle filtering of the 5 key farming & compliance guidelines
  const filteredFarmingGuides = useMemo(() => {
    if (!farmingSearch.trim()) return FARMING_TECHNICAL_GUIDES;
    const query = farmingSearch.toLowerCase().trim();
    return FARMING_TECHNICAL_GUIDES.filter(guide => {
      const matchTitle = guide.title.toLowerCase().includes(query);
      const matchShortDesc = guide.shortDesc.toLowerCase().includes(query);
      const matchIntroduction = guide.details.introduction.toLowerCase().includes(query);
      const matchSteps = guide.details.steps.some(step => 
        step.name.toLowerCase().includes(query) || step.content.toLowerCase().includes(query)
      );
      const matchTips = guide.details.tips.some(tip => tip.toLowerCase().includes(query));
      return matchTitle || matchShortDesc || matchIntroduction || matchSteps || matchTips;
    });
  }, [farmingSearch]);

  // States for PDF Report Generation modal
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfStep, setPdfStep] = useState(0);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  // --- NEW STATES FOR DISEASE WARNINGS & AI AGRONOMIST ENGINEER ---
  const [farmerSubSection, setFarmerSubSection] = useState<'handbook' | 'ai_disease'>('handbook');
  const [diseaseSearchTerm, setDiseaseSearchTerm] = useState('');

  interface AgronomistMessage {
    sender: 'farmer' | 'ai';
    text: string;
    time: string;
    fileAttachment?: {
      name: string;
      size: string;
      blobUrl: string;
      type: string;
      base64?: string;
    };
  }

  const [aiAgronomistMessages, setAiAgronomistMessages] = useState<AgronomistMessage[]>([
    {
      sender: 'ai',
      text: 'Kính chào Bà Con nông gia! Tôi là Kỹ Sư Nông Nghiệp AI hỗ trợ sức khỏe rễ và quả sầu riêng của hệ sinh thái "Nhà nông Hết Sầu". Bà Con sầu riêng gặp nốt bệnh gì (nứt vỏ xì mủ, nhện đỏ phá đọt, cháy thán thư lá, hay cần kỹ nghệ hãm ráo cơm ngọt sắc dính béo) hãy nhắn tin trao hỏi tôi bên dưới hoặc bấm các mẫu câu hỏi nhanh bên dưới để tôi gợi ý giải thích chi tiết trong 2 giây nhé!',
      time: 'Bây giờ'
    }
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // --- NEW FILE STATES IN AI REPORT PANEL ---
  const [reportAttachedFile, setReportAttachedFile] = useState<null | { name: string, size: string, blobUrl: string, type: string, base64?: string }>(null);
  const [reportIsDragging, setReportIsDragging] = useState(false);
  const reportFileInputRef = useRef<HTMLInputElement>(null);

  const handleReportFileAttach = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setReportAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        blobUrl: URL.createObjectURL(file),
        type: file.type,
        base64: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleReportFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleReportFileAttach(e.target.files[0]);
    }
  };

  const handleReportDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setReportIsDragging(true);
  };

  const handleReportDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setReportIsDragging(false);
  };

  const handleReportDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setReportIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleReportFileAttach(e.dataTransfer.files[0]);
    }
  };

  const DISEASES = [
    {
      id: 'dis_1',
      name: 'Thối trái - Nứt vỏ xì mủ (Phytophthora palmivora)',
      severity: 'high',
      symptoms: 'Đốm nâu sẫm sũng nước loang cực lẹ ở đui hoặc hông quả sầu chín bói non quả tơ, thối nát múi sệt sệt, rụng lốp cuống quả dồn dập. Trên thân mộc cổ rễ rì rỉ chảy nhựa mủ đen dơ bẩn chọc héo.',
      remedy: 'Cạo sạch tinh tắp quả cành chết tiêu huỷ lập tức; xịt phun sương sũng Ridomil Gold hoặc thuốc rải đặc Metaloxyl quét dính đặc sệt vào khoang rỉ mủ nứt da mộc.',
      prevention: 'Rải vôi bột thạch cao sát nấm 1.5kg/thân bụi gốc trước mùa mưa; cưa cành tơ rập rạp dưới tầng vòm 1M sát rãnh mương.'
    },
    {
      id: 'dis_2',
      name: 'Thán thư sém bìa cháy lá dột (Colletotrichum gloeosporioides)',
      severity: 'medium',
      symptoms: 'Mép rìa lá có các vân tròn nâu vàng sọc đồng tâm mốc ráp làm khô rộc lá rụng lốm đốm, trơ cành chồi tơ khiến quả sầu còi lép lép vai móp.',
      remedy: 'Tạm cắt tưới phân đạm kích thích ngọn rễ; phun rải mù sương Amistar Top 325SC ướt ráo lõi cây sém.',
      prevention: 'Tưới bồi vi sinh Trichoderma phối cá thuỷ phân Humic béo đất bệ rễ vùi mát.'
    },
    {
      id: 'dis_3',
      name: 'Nấm hồng thâm cành dại bông (Erythricium salmonicolor)',
      severity: 'medium',
      symptoms: 'Thấy mảng tơ bám hồng phấn bao vệt nứt nhánh cành bánh tẻ nghẽn dòng nhựa mộc dẫn dinh dưỡng béo hộc quả, làm héo khô vàng rực cành trái.',
      remedy: 'Phun quét bọc Validamycin hoặc dung dịch Copper gốc đồng sũng ráo bề mặt vỏ xù.',
      prevention: 'Cưa tỉa nhánh tơ dại, cành vượt tranh quang sườn cây ráo gió rập.'
    },
    {
      id: 'dis_4',
      name: 'Nhện đỏ châm hút diệp lục (Tetranychus urticae)',
      severity: 'high',
      symptoms: 'Tàn sát bằng hàng triệu đốm xám mờ rọi xước lá tơ, làm bạc xơ lá quắt rụng rạt lúc trời oi nóng cực đoan sụt quang hợp hoa.',
      remedy: 'Phun thốc vùi sương SK99 dầu khoáng hữu cơ hoặc hợp chất Abamectin sinh học dập tắp lưới bụi nhện dột mát.',
      prevention: 'Chạy béc phun sương xoáy nước áp kịch cao tẹt ào ào lên ngọn cây rửa bọc lá sầu mát đọt chống giăng giăng ổ.'
    }
  ];

  const handleSendAiMessage = (customText?: string) => {
    const textToSend = customText || aiInputText;
    if (!textToSend.trim() && !reportAttachedFile) return;

    const userMsg: AgronomistMessage = {
      sender: 'farmer' as const,
      text: textToSend || `[Gửi nông tệp đính kèm: ${reportAttachedFile?.name}]`,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      fileAttachment: reportAttachedFile || undefined
    };

    const newMessages = [...aiAgronomistMessages, userMsg];
    setAiAgronomistMessages(newMessages);
    
    const textLower = textToSend.toLowerCase();
    const hasImage = reportAttachedFile?.type.startsWith('image/');
    const fileName = reportAttachedFile?.name || '';

    if (!customText) setAiInputText('');
    setReportAttachedFile(null); // clear after output
    setIsAiTyping(true);

    setTimeout(() => {
      let aiResponseText = '';

      if (hasImage) {
        aiResponseText = `**KIỂM MẪU HÌNH ẢNH THỰC TẾ "${fileName}" TỪ TRỰC QUAN AI:**\n\n- **Nhận diện cảm quan**: Phát hiện các ổ mốc trắng xám xung quanh lớp kẽ múi sầu non hoặc vệt ngả màu vàng sém lấm tấm râm dọc gân lá.\n- **Kế hoạch dập nấm**: Ngay sáng mai, bà con lấy bình xịt phun đắp sương mù vi sinh đối kháng sinh học (Bt hoặc Trichoderma), ngắt loại bọc kỹ quả.\n- **Chăm dưỡng bệ lót**: Hoà loãng đẫm canxi bo mùn để tăng liên kết màng, giữ ráo gốc sầu riêng.`;
      } else if (fileName) {
        aiResponseText = `**PHÂN TÍCH FILE NÔNG HỌC "${fileName}" TỰ ĐỘNG BẰNG AI:**\n\n- **Đọc kết quả**: Nền tảng ghi nhận tệp tài liệu kỹ thuật nông nghiệp hữu dụng. Chỉ số liên thông dinh dưỡng móng gốc đạt đúng tiêu chí VietGAP 91% xuất khẩu loại A.\n- **Kiến nghị hành động**: Sạt dốc rãnh thông mương trong mùa mưa để rễ móng không bị yếm khí dột úng. Tránh bón thúc quá liều phân bón hoá học N-P-K vội vã.`;
      } else if (textLower.includes('mủ') || textLower.includes('nứt') || textLower.includes('xì') || textLower.includes('cổ rễ')) {
        aiResponseText = `**HƯỚNG DẪN XỬ LÝ NỨT VỎ XÌ MỦ & THỐI CỔ RỄ (BỆNH PHYTOPHTHORA) TỪ KỸ SƯ AI:**\n\n1. **Khử trùng tiếp xúc**: Bà con dùng dao bén vát sạch lớp vỏ ngoài thâm đen sủi mủ cho đến khi thớ mộc trắng khỏe sờ khô ráo.\n2. **Bôi quét đậm độ**: Pha tinh bột **Metalaxyl-M** sệt sệt bôi trét đắp trực tiếp lên miệng sẹo mủ cây sầu, ngày bôi quét 2 bận lúc bình minh ráo mù sương.\n3. **Củng cố rễ bằng Phosphonate**: Tưới loãng bệ kháng gốc bằng tinh lân kích kháng sinh học, ngưng tưới Urê thốc lớn làm dào nước mủ.\n4. **Thoát úng triệt tiêu**: Tăng xẻ mương rãnh cho thoát nước dốc bè đọng ở sát rễ cây sầu, sạc rãnh thông bờ mương.`;
      } else if (textLower.includes('thán thư') || textLower.includes('cháy lá') || textLower.includes('lá')) {
        aiResponseText = `**HƯỚNG DẪN DẬP TẮT THÁN THƯ CHÁY SÉM LÁ SẦU RIÊNG TỪ KỸ SƯ AI:**\n\n1. **Nguyên lý cốt lỗi**: Ngưng ngay lập tức phun rải phân bón đạm cao N-P-K (N>20%) thúc tơ mọc chồi tơ mới dại dột trong trời dông ẩm.\n2. **Phác đồ sát trùng bào tử**: Phun mù rợp tán lá dung dịch phối hợp chất **Hexaconazole** hoặc dòng tinh nấm **Amistar Top 325SC** đều đặn hai bận cách tuần.\n3. **Dưỡng ẩm hữu cơ bọc rễ**: Bón vôi Humic đen phối lợ vi Trichoderma kích đất bọc rễ hồi sầu tơi đất mát.\n4. **Đốt rác lá hư**: Gom nhặt sạch thảy lá úa rụng mang đi tiêu hủy xa tuyệt gốc sầu để chặn mầm bay theo dông dập lá.`;
      } else if (textLower.includes('nhện đỏ') || textLower.includes('nhện') || textLower.includes('rầy') || textLower.includes('rệp')) {
        aiResponseText = `**BÍ PHÁP TRIỆT LƯỚI NHỆN ĐỎ & RẦY SÁP CHÍCH HỘC SẦU TÀN QUẢ TỪ KỸ SƯ AI:**\n\n1. **Rửa lá áp suất cao**: Kích béc tưới xòe đỉnh nhọn tạt nước ào ào xoáy lật mặt dưới lá mỗi nắng nhiệt đới El Nino lên cao. Nhện đỏ dị ứng cực độ với vũng nước phun liên tục.\n2. **Thuốc diệt tủy sinh học**: Phun sương mù phối **Abamectin sinh học** tạt đều bọc tán sau chập hoàng hôn lộng mát.\n3. **Cạo rửa rệp rấp hại múi**: Lấy khăn rửa sạch rải nhôm bột rệp trắng bám gai bói sầu riêng bằng tạt sương dội ẩm vôi loãng, treo bọc màng organic cách ly ruồi rầy cắn nứt da hộc.`;
      } else if (textLower.includes('thôi trái') || textLower.includes('thối trái') || textLower.includes('thối quả')) {
        aiResponseText = `**CHƯƠNG TRÌNH PHÒNG THỦ THỐI LỚP QUẢ NON CHÍN BÓI SẦU MÙA MƯA TỪ KỸ SƯ AI:**\n\n1. **Mào bọc túi sinh vật**: Tiến hành tròng màng lưới hữu cơ bảo vệ quả Monthong và Ri6 khi quả to xơ bằng bàn tay, chống muỗi sáp chui hộc nướng sương nấm.\n2. **Kháng sinh phòng úng sầu**: Phun tạt mù **Aliette 800WG** ướt sũng chùm cuống non chống rụng rộc lốp đống nước.\n3. **Rút đanh móng rễ**: Cào thoáng cỏ sậy tủ ẩm mục quá ngập thối chân rễ, bồi sạt vôi lót móng 1.2kg dưỡng đai rễ khô ráo ráo cơm.`;
      } else if (textLower.includes('béo') || textLower.includes('ngọt') || textLower.includes('sượng') || textLower.includes('áo cơm')) {
        aiResponseText = `**CÔNG NGHỆ THÚC BÉO, VÀNG RÁO RỰC CƠM KHÔNG SƯỢNG MÚI SẦU RIÊNG TỪ KỸ SƯ AI:**\n\n1. **Xiết mạch nước mương**: Trước ngày thợ gõ sầu xuống vườn hái 12-15 ngày, lấp bạt phủ sườn móng, lót đáy cống rãnh, sạt nước mương cạn sệt gốc chỉ tưới nhấp mát chớm lá 10L nước, kích trái đơm khô tinh bột béo quánh ráo, chống sượng rộp nhão khi hái xuống bọc khay.\n2. **Nạp phân bồi dốc mật**: Phun bọt dưỡng hoạt chất **Kali Sunfat trắng** sương mù mép tán lá kìm hãm ra chồi đọt tơ mới thọc thốc rỉ hút mất vị đọng của cam quánh múi sầu.\n3. **Tuyệt đối ngưng bón hóa chất**: Dứt điểm rải đạm khoáng vô cơ thúc nọng da gai gai 30 ngày trước ngày thu mua.`;
      } else {
        aiResponseText = `**KỸ THUẬT CANH TÁC TOÀN DIỆN & KHẢO SÁT CHỈ SỐ ĐẤT TỪ KỸ SƯ AI:**\n\nBà con lưu ý duy trì 3 chỉ số vàng đất sầu riêng:\n- **pH của bệ đất bón**: Độ ẩm đầm xốp pH phao ở **5.5 - 6.5**. Tránh dập Urê phèn chua làm sụt pH rể nghèo nấm rễ.\n- **Bọc gai cuống sầu**: Tránh căng bọc lá lúc đọt xém vàng sượng. Phun bo vi lượng tăng cuống.\n- **Không xới nát đất**: Quét xới sắt làm rách móng rễ tơ của sầu riêng lót gốc mỏng, mở lách cửa cho bào tử nấm Phytophthora luồn nấm đen.\n\nBà con cứ hỏi bất kì thắc mắc sầu riêng nào để tôi trả lời nhanh nhé!`;
      }

      setAiAgronomistMessages(prev => [
        ...prev,
        { sender: 'ai', text: aiResponseText, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsAiTyping(false);
    }, 1500);
  };


  // Weekly market price trend over last 8 weeks (VND/kg)
  const priceTrendData = [
    { name: 'Tuần 1', ri6Garden: 68000, ri6Vua: 74000, ri6Export: 81000, monGarden: 84000, monVua: 92000, monExport: 102000 },
    { name: 'Tuần 2', ri6Garden: 70000, ri6Vua: 75000, ri6Export: 83000, monGarden: 86000, monVua: 94000, monExport: 104500 },
    { name: 'Tuần 3', ri6Garden: 74500, ri6Vua: 79000, ri6Export: 86000, monGarden: 91000, monVua: 98000, monExport: 108000 },
    { name: 'Tuần 4', ri6Garden: 73000, ri6Vua: 78000, ri6Export: 84000, monGarden: 89000, monVua: 97000, monExport: 106000 },
    { name: 'Tuần 5', ri6Garden: 71000, ri6Vua: 76000, ri6Export: 82500, monGarden: 88000, monVua: 95000, monExport: 104000 },
    { name: 'Tuần 6', ri6Garden: 75000, ri6Vua: 81000, ri6Export: 88000, monGarden: 93000, monVua: 100000, monExport: 111000 },
    { name: 'Tuần 7', ri6Garden: 77050, ri6Vua: 83000, ri6Export: 91000, monGarden: 95000, monVua: 102500, monExport: 113500 },
    { name: 'Tuần 8', ri6Garden: 78500, ri6Vua: 84000, ri6Export: 92000, monGarden: 96000, monVua: 104000, monExport: 115000 },
  ];

  // Helper trigger action for PDF Generation Process
  const triggerPdfGeneration = () => {
    setIsGeneratingPdf(true);
    setPdfStep(1);
    setPdfDownloaded(false);
    
    setTimeout(() => {
      setPdfStep(2);
      setTimeout(() => {
        setPdfStep(3);
        setTimeout(() => {
          setPdfStep(4);
          setTimeout(() => {
            setIsGeneratingPdf(false);
            setPdfModalOpen(true);
          }, 600);
        }, 800);
      }, 700);
    }, 800);
  };

  // Recharts Pie Chart Data representing regional percentage
  const pieData = [
    { name: 'Tiền Giang', value: 52, color: '#15803d' },
    { name: 'Bến Tre', value: 28, color: '#22c55e' },
    { name: 'Vĩnh Long', value: 15, color: '#eab308' },
    { name: 'Cần Thơ', value: 5, color: '#ca8a04' }
  ];

  const COLORS = ['#15803d', '#22c55e', '#eab308', '#ca8a04'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-left space-y-2 border-b border-slate-200 pb-5">
        <h1 className="font-display font-bold text-3xl text-slate-900 tracking-tight flex items-center space-x-2">
          <span>Dự Báo Sản Lượng Sầu & Báo Cáo Chất Lượng Chuyên Sâu</span>
        </h1>
        <p className="text-slate-500 font-sans text-sm">
          Phân tích sâu định hướng chất lượng sầu riêng miền Tây, kỹ năng canh tác chuẩn VietGAP cho nhà vườn và báo cáo biến động cung cầu cho khách buôn xuất khẩu.
        </p>
      </div>

      {/* Dynamic Charts Grid using Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Monthly crop forecast bar chart - 8 cols */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 text-left space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-lg text-slate-800">Dự báo tổng sản lượng thu hoạch theo tháng (Tấn)</h3>
            <span className="text-xs px-2.5 py-1 bg-green-50 text-green-700 font-bold rounded-lg border border-green-200">Tổng niên vụ: 12.850 Tấn</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={MOCK_FORECAST_DATA}
                margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight="bold" />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                <Bar dataKey="Tiền Giang" stackId="a" fill="#15803d" />
                <Bar dataKey="Bến Tre" stackId="a" fill="#22c55e" />
                <Bar dataKey="Vĩnh Long" stackId="a" fill="#eab308" />
                <Bar dataKey="Cần Thơ" stackId="a" fill="#ca8a04" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-400 font-sans italic">
            Số liệu thu thập dựa trên ngày bói bông xả nhụy do bà con nông dân cập nhật thời gian thực vào ứng dụng.
          </p>
        </div>

        {/* Right Side: Region percentage pie chart - 4 cols */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 text-left flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-base text-slate-850 mb-2">Tỷ lệ phân bố nguồn cung</h3>
            <p className="text-xs text-slate-400">Tiền Giang nắm giữ vị thế trọng điểm sầu riêng xuất khẩu miền Tây.</p>
          </div>

          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pb-2">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-slate-600 font-sans">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.color }}></span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <strong className="text-slate-800">{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEGMENT TRIGGER TABS: FARMER OR ENTERPRISE DEEP FOCUS */}
      <div className="border border-slate-200 flex justify-center p-1 bg-white rounded-xl max-w-lg mx-auto shadow-xs my-6">
        <button
          id="tab-segment-farmer"
          type="button"
          onClick={() => setActiveSegment('farmer')}
          className={`flex-1 py-2.5 px-3 font-display font-bold text-xs tracking-tight rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeSegment === 'farmer'
              ? 'bg-green-700 text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>GÓC NHÀ VƯỜN (Chăm Sóc & Mùa Vụ)</span>
        </button>
        <button
          id="tab-segment-enterprise"
          type="button"
          onClick={() => setActiveSegment('enterprise')}
          className={`flex-1 py-2.5 px-3 font-display font-bold text-xs tracking-tight rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeSegment === 'enterprise'
              ? 'bg-amber-500 text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>GÓC DOANH NGHIỆP (Định Giá & Uy Tín)</span>
        </button>
      </div>

      {/* CORE SEGMENT CONTENT */}
      <div className="min-h-[400px]">
        {activeSegment === 'farmer' ? (
          <div className="space-y-6">
            {/* NEW NESTED SWITCHER */}
            <div className="flex border-b border-slate-100 pb-3 flex-wrap items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center space-x-1 border border-slate-200 p-1 bg-slate-50 rounded-xl">
                <button
                  id="tab-farmer-handbook"
                  type="button"
                  onClick={() => setFarmerSubSection('handbook')}
                  className={`py-2 px-4 rounded-lg font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    farmerSubSection === 'handbook'
                      ? 'bg-white text-green-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <BookOpenCheck className="w-4 h-4 text-green-600" />
                  <span>Cẩm Nang & Trạm Khí Tượng</span>
                </button>
                <button
                  id="tab-farmer-ai-disease"
                  type="button"
                  onClick={() => setFarmerSubSection('ai_disease')}
                  className={`py-2 px-4 rounded-lg font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    farmerSubSection === 'ai_disease'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>Báo Cáo Bệnh Hại & Kỹ Sư AI Nông Nghiệp</span>
                </button>
              </div>

              <span className="text-[11px] font-medium text-slate-500 italic bg-green-50 px-2.5 py-1 rounded-lg border border-green-150">
                Khởi chạy Kỹ sư nông học AI hỗ trợ chẩn đoán sầu riêng
              </span>
            </div>

            {farmerSubSection === 'handbook' ? (
              /* GARDENERS EXPERTISE, SYSTEM CHECKS & WEATHER ALERTS */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
                {/* 1. Interactive 3-stage farming handbook (8 cols) */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-250/60 space-y-5">
                  <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
                    📖 Cẩm Nang Canh Tác Sầu Riêng Đậu Múi Vàng Chuẩn VietGAP
                  </h3>

                  <div className="flex space-x-2 pb-2 overflow-x-auto font-sans">
                    {FARMING_EXPERTISE.stages.map((stage, idx) => (
                      <button
                        id={`stage-tab-${idx}`}
                        key={idx}
                        onClick={() => setSelectedStageIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          selectedStageIdx === idx
                            ? 'bg-green-100 text-green-800 border border-green-300 shadow-2xs'
                            : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        {stage.title.split('.')[1]}
                      </button>
                    ))}
                  </div>

                  {/* Selected Stage Detail */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4 font-sans text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans font-bold text-base text-slate-800">
                        {FARMING_EXPERTISE.stages[selectedStageIdx].title}
                      </h4>
                      <span className="px-2.5 py-1 bg-green-500/10 text-green-700 font-bold rounded">
                        Thời lượng duy trì: {FARMING_EXPERTISE.stages[selectedStageIdx].duration}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left">Kỹ thuật chủ chốt cần xử lý:</span>
                      <ul className="space-y-2">
                        {FARMING_EXPERTISE.stages[selectedStageIdx].actions.map((act, i) => (
                          <li key={i} className="flex items-start space-x-2 text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-sans text-left">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                      <div className="p-3 bg-rose-50 rounded-lg text-rose-800 text-left">
                        <span className="font-bold block mb-1">⚠️ Cảnh báo hỏng trái:</span>
                        <p className="leading-relaxed text-[11px] font-sans">{FARMING_EXPERTISE.stages[selectedStageIdx].warnings}</p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg text-amber-800 text-left">
                        <span className="font-bold block mb-1">🔍 Triệu chứng bệnh & Khắc phục:</span>
                        <p className="leading-relaxed text-[11px] font-sans">{FARMING_EXPERTISE.stages[selectedStageIdx].symptom}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Weather & saline alarms sidebar (4 cols) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
                  <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-1.5">
                    <CloudSun className="w-5 h-5 text-amber-500 animate-spin-slow" />
                    <span>Trạm Cảnh Báo Khí Tượng</span>
                  </h3>

                  <div className="space-y-4">
                    {FARMING_EXPERTISE.weatherAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-xl border-t-4 text-xs font-sans space-y-2 text-left ${
                          alert.severity === 'high'
                            ? 'border-t-rose-500 border border-rose-100 bg-rose-50/25'
                            : 'border-t-yellow-500 border border-yellow-100 bg-yellow-50/25'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-red-950 uppercase">{alert.type}</span>
                          <span className="text-[9px] font-mono font-bold text-slate-400">{alert.date}</span>
                        </div>
                        <p className="text-slate-600 leading-normal font-sans text-[11px]">{alert.detail}</p>
                        <span className={`inline-block py-0.5 px-2 rounded text-[9px] font-bold uppercase ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-105 text-yellow-705'
                        }`}>
                          Mức nguy hại: {alert.severity === 'high' ? 'Nguy cấp' : 'Chú ý'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tips */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs text-left">
                    <span className="font-bold text-slate-700 block mb-1.5">💡 Tips Mùa Vụ Nhanh:</span>
                    <p className="text-slate-500 leading-relaxed font-sans text-[11px]">
                      Xới đất xơ sơ gốc sầu sương, ủ cỏ ẩm trong đợt khô hanh giúp nâng đỡ hộc rễ non mỏng rùng. Đo nước ngập kênh mương trước khi bật béc tưới tự động.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* DỊCH BỆNH & KỸ SƯ AI NÔNG NGHIỆP DỰ ÁN */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
                
                {/* LEFT COLUMN: LIÊN MINI BẢO VỆ THỰC VẬT - 5 COLS */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/95 space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <h3 className="font-display font-bold text-sm text-slate-900 flex items-center space-x-2">
                      <ShieldAlert className="w-5 h-5 text-red-600 animate-bounce" />
                      <span>Trạm Theo Dõi & Dự Phòng Bệnh Hại</span>
                    </h3>
                    <span className="text-[9px] font-mono bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded uppercase font-sans">Bản đồ dịch tễ</span>
                  </div>

                  {/* Search box for disease query */}
                  <div className="relative font-sans text-xs">
                    <input
                      id="disease-search-input"
                      type="text"
                      placeholder="Tìm kiếm nhanh loại nấm bệnh, rầy tơ..."
                      value={diseaseSearchTerm}
                      onChange={(e) => setDiseaseSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-green-600 focus:ring-1 focus:ring-green-600"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  </div>

                  {/* Search outcome list */}
                  <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                    {DISEASES.filter(dis =>
                      dis.name.toLowerCase().includes(diseaseSearchTerm.toLowerCase()) ||
                      dis.symptoms.toLowerCase().includes(diseaseSearchTerm.toLowerCase())
                    ).map((dis) => (
                      <div
                        id={`disease-card-${dis.id}`}
                        key={dis.id}
                        className={`p-4 rounded-xl border-l-4 text-xs font-sans space-y-2.5 transition-shadow hover:shadow-2xs border ${
                          dis.severity === 'high'
                            ? 'border-l-rose-600 border-slate-150 bg-slate-50/40'
                            : 'border-l-yellow-500 border-slate-150 bg-slate-50/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-850 text-xs font-bold leading-tight block">{dis.name}</strong>
                          <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                            dis.severity === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-yellow-800 text-yellow-101'
                          }`}>
                            {dis.severity === 'high' ? 'Cực hiểm' : 'Hạn chế'}
                          </span>
                        </div>

                        <p className="text-slate-600 text-[11px] leading-relaxed font-sans">
                          <span className="text-slate-400 font-bold block mb-0.5">Triệu chứng lâm bọc:</span>
                          {dis.symptoms}
                        </p>

                        <div className="bg-white p-2.5 rounded-lg border border-slate-100 space-y-1.5 text-[11px]">
                          <p className="text-rose-900 font-sans leading-relaxed">
                            <strong className="text-red-700 block font-bold">🛠️ Biện pháp xử lý khẩn cấp:</strong> 
                            {dis.remedy}
                          </p>
                          <p className="text-green-950 border-t border-slate-100 pt-1.5 font-sans leading-relaxed">
                            <strong className="text-green-700 block font-bold">🌱 Phòng hại trọn vòng đời:</strong> 
                            {dis.prevention}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN: KỸ SƯ AI NÔNG NGHIỆP TRỰC TUYẾN - 7 COLS */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/98 shadow-2xs flex flex-col justify-between min-h-[500px]">
                  
                  {/* Chat Panel Header */}
                  <div className="border-b border-slate-150 pb-3 flex items-center justify-between bg-slate-50/50 p-3 rounded-xl">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center border border-green-500">
                        <Cpu className="w-5 h-5 animate-pulse text-yellow-300" />
                      </div>
                      <div className="text-left font-sans">
                        <strong className="text-sm font-bold text-slate-800 block">Kỹ Sư AI Nông Nghiệp Hết Sầu</strong>
                        <span className="text-[10px] text-green-600 font-semibold block flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block mr-1 animate-ping"></span>
                          Hỗ trợ kỹ nghệ sầu riêng 24/7 trực tuyến
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-yellow-300 px-2 py-1 rounded-full text-slate-900 font-extrabold select-none uppercase font-mono">
                      Bản v2.4 AI
                    </span>
                  </div>
                  
                  {/* Chat Logs Window inside overflow div with drag-drop */}
                  <div
                    onDragOver={handleReportDragOver}
                    onDragLeave={handleReportDragLeave}
                    onDrop={handleReportDrop}
                    className="flex-1 overflow-y-auto max-h-[350px] min-h-[280px] p-4 bg-slate-50 border border-slate-100 rounded-2xl my-4 space-y-4 font-sans text-xs relative"
                  >
                    {reportIsDragging && (
                      <div className="absolute inset-0 bg-green-950/20 backdrop-blur-xs flex items-center justify-center z-15 p-4 rounded-2xl transition-all">
                        <div className="bg-white/95 border-2 border-dashed border-green-700 p-6 rounded-2xl shadow-xl text-center space-y-2 max-w-xs ring-4 ring-green-150 animate-in zoom-in duration-100">
                          <div className="w-10 h-10 bg-green-100 text-green-800 rounded-xl flex items-center justify-center mx-auto">
                            <Paperclip className="w-5 h-5 animate-bounce" />
                          </div>
                          <strong className="text-slate-800 text-xs block">Thả nông học tài liệu vào đây</strong>
                          <p className="text-[10px] text-slate-400">Kiểm tra lá lốp, phân bồi dột đọt sầu</p>
                        </div>
                      </div>
                    )}

                    {aiAgronomistMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col max-w-[85%] ${
                          msg.sender === 'farmer' ? 'ml-auto items-end' : 'mr-auto items-start'
                        }`}
                      >
                        <span className="text-[9px] text-slate-400 font-bold mb-1 uppercase font-sans">
                          {msg.sender === 'farmer' ? 'NÔNG DÂN (TÔI)' : 'KỸ SƯ HẾT SẦU AI'} • {msg.time}
                        </span>
                        <div
                          className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line text-[11px] ml-0 ${
                            msg.sender === 'farmer'
                              ? 'bg-green-700 text-white rounded-br-none font-bold'
                              : 'bg-white text-slate-850 border border-slate-200 rounded-bl-none font-normal shadow-2xs'
                          }`}
                        >
                          <div>{msg.text}</div>

                          {msg.fileAttachment && (
                            <div className={`mt-2 p-2 rounded-lg text-left ${msg.sender === 'farmer' ? 'bg-green-800/80 border border-green-600' : 'bg-slate-100 border border-slate-250'} text-[10.5px] space-y-1.5`}>
                              {msg.fileAttachment.type.startsWith('image/') ? (
                                <div className="space-y-1">
                                  <img
                                    src={msg.fileAttachment.blobUrl}
                                    alt={msg.fileAttachment.name}
                                    className="max-h-40 rounded-md object-contain mx-auto bg-black/10 border border-slate-100"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="text-[9.5px] opacity-80 truncate">
                                    📸 {msg.fileAttachment.name} ({msg.fileAttachment.size})
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between gap-2">
                                  <span className="truncate max-w-[130px] font-medium" title={msg.fileAttachment.name}>
                                    📄 {msg.fileAttachment.name}
                                  </span>
                                  <span className="opacity-80 text-[9px] flex-shrink-0">
                                    ({msg.fileAttachment.size})
                                  </span>
                                  <a
                                    href={msg.fileAttachment.blobUrl}
                                    download={msg.fileAttachment.name}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase whitespace-nowrap ${msg.sender === 'farmer' ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                                  >
                                    Tải về
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Typing effect simulator */}
                    {isAiTyping && (
                      <div className="flex flex-col max-w-[85%] mr-auto items-start">
                        <span className="text-[9px] text-slate-400 font-bold mb-1 font-sans">KỸ SƯ HẾT SẦU AI ĐANG SOẠN...</span>
                        <div className="p-3 bg-white border border-slate-150 rounded-2xl rounded-bl-none flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-600 animate-bounce"></span>
                          <span className="w-2 h-2 rounded-full bg-green-600 animate-bounce delay-100"></span>
                          <span className="w-2 h-2 rounded-full bg-green-600 animate-bounce delay-200"></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fast Selector Suggestion Chips */}
                  <div className="space-y-1.5 text-left font-sans text-xs border-t border-slate-100 pt-3 col-span-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Gợi ý câu hỏi nhanh sầu riêng chuẩn:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Sầu riêng Ri6 bị nứt mủ gốc trị thế nào?',
                        'Lá Monthong thán thư sém rìa dùng chất gì?',
                        'Cách rửa sạch Nhện đỏ bọc lá lúc hạn mặn?',
                        'Kỹ nghệ muối hãm nước gõ cơm sầu dẻo vàng béo?'
                      ].map((qst, idx) => (
                        <button
                          id={`quick-ai-qst-${idx}`}
                          key={idx}
                          type="button"
                          onClick={() => handleSendAiMessage(qst)}
                          disabled={isAiTyping}
                          className="px-2.5 py-1.5 text-[10px] bg-slate-100 border border-slate-250 hover:border-green-400 text-slate-705 hover:text-green-800 rounded-xl transition-all font-semibold select-none cursor-pointer disabled:opacity-50"
                        >
                          {qst}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Draft Attach File preview bar */}
                  {reportAttachedFile && (
                    <div className="bg-slate-100 border-t border-slate-200 px-3 py-2 mt-2 rounded-lg flex items-center justify-between text-xs text-slate-705 gap-2 font-medium">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-emerald-700 font-bold flex-shrink-0">📎 Sắp đính kèm lên AI:</span>
                        <span className="truncate max-w-[180px] font-semibold text-slate-800">{reportAttachedFile.name}</span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">({reportAttachedFile.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setReportAttachedFile(null)}
                        className="p-1 hover:bg-slate-250 rounded-full text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                        title="Bỏ tệp"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Manual input window bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendAiMessage();
                    }}
                    className="flex items-center space-x-2 pt-4 border-t border-slate-100 mt-3"
                  >
                    <input
                      type="file"
                      ref={reportFileInputRef}
                      onChange={handleReportFileInputChange}
                      className="hidden"
                      accept="image/*,.pdf,.xlsx,.xls,.csv,.doc,.docx,.txt"
                    />

                    <button
                      type="button"
                      onClick={() => reportFileInputRef.current?.click()}
                      className="p-2.5 text-slate-400 hover:text-green-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer flex-shrink-0"
                      title="Đính kèm nông bạ / ảnh sầu riêng"
                    >
                      <Paperclip className="w-4.5 h-4.5" />
                    </button>

                    <input
                      id="ai-manual-chat-input"
                      type="text"
                      value={aiInputText}
                      onChange={(e) => setAiInputText(e.target.value)}
                      placeholder={reportAttachedFile ? "Bấm nút Gửi câu hỏi để đăng tài liệu lên..." : "Hỏi kỹ sảo AI hoặc thả ảnh lá sầu bệnh vào đây..."}
                      className="flex-grow p-3 bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl focus:outline-hidden text-xs font-sans font-medium"
                      disabled={isAiTyping}
                    />
                    <button
                      id="ai-send-chat-btn"
                      type="submit"
                      disabled={(!aiInputText.trim() && !reportAttachedFile) || isAiTyping}
                      className="p-3 bg-green-700 hover:bg-green-800 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ENTERPRISES QUALITY BENCHMARKS, CREDIT RATING SYSTEM & PRICE TRENDS */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
            {/* 1. Quality Standards (8 cols) */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-205 space-y-5">
              <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Tiêu Chuẩn Giám Định Trái Sầu Đạt Chuẩn Xuất Khẩu</span>
              </h3>
              <p className="text-slate-500 text-xs font-sans">
                Hướng dẫn phân loại, loại bỏ dạt lỗi quả sầu cho phòng mua hàng của doanh nghiệp và thương lượng mức bao tiêu ráo dẻo cơm sầu riêng.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
                {ENTERPRISE_QUALITY_STANDARDS.gradingRules.map((rule, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between hover:border-green-400 transition-colors">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center justify-between">
                        <span>{rule.grade}</span>
                      </h4>
                      <ul className="space-y-1 text-slate-505 list-disc list-inside text-[11px] leading-relaxed font-sans">
                        {rule.standards.slice(0, 3).map((st, i) => (
                          <li key={i}>{st}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                      <span className="text-[10px] text-slate-400 block font-semibold">Tỷ số thu mua:</span>
                      <strong className="text-green-700 text-xs font-display">{rule.valuePercentage}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* Automated Credit Rating System explanation */}
              <div className="bg-gradient-to-r from-green-900 to-emerald-950 text-white p-5 rounded-2xl space-y-3 shadow-md">
                <h4 className="text-sm font-bold font-display flex items-center space-x-1.5 text-yellow-400">
                  <Award className="w-4.5 h-4.5" />
                  <span>{ENTERPRISE_QUALITY_STANDARDS.creditRatingSystem.title}</span>
                </h4>
                <p className="text-slate-200 text-xs font-sans leading-relaxed">
                  {ENTERPRISE_QUALITY_STANDARDS.creditRatingSystem.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-3 border-t border-white/10">
                  <div className="space-y-2">
                    <span className="font-bold text-yellow-300 tracking-wider">TIÊU CHÍ CHO NHÀ VƯỜN:</span>
                    {ENTERPRISE_QUALITY_STANDARDS.creditRatingSystem.farmerCriteria.map((cri, i) => (
                      <p key={i} className="text-[11px] text-slate-200">
                        <strong className="text-white">{cri.score}</strong> {cri.details}
                      </p>
                    ))}
                  </div>
                  <div className="space-y-2 border-l border-white/10 pl-4">
                    <span className="font-bold text-yellow-300 tracking-wider">TIÊU CHÍ CHO DOANH NGHIỆP:</span>
                    {ENTERPRISE_QUALITY_STANDARDS.creditRatingSystem.enterpriseCriteria.map((cri, i) => (
                      <p key={i} className="text-[11px] text-slate-200">
                        <strong className="text-white">{cri.score}</strong> {cri.details}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Enterprise Market sidebar (4 cols) */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-1.5">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Báo Cáo Biến Động Giá & Xu Hướng</span>
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
                  <span className="font-bold text-blue-950 block">Xu hướng xuất khẩu Trung Quốc:</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed font-sans">
                    Hải quan Trung Quốc thông qua thêm 12 cửa dải biên mậu chính ngạch sầu riêng đông lạnh. Nhu cầu Monthong loại 1 dự kiến bứt phá mạnh vào giữa tháng 8.
                  </p>
                  <span className="text-[10px] text-blue-700 font-bold block mt-1">Dự báo: Cung đường biển thuận lợii</span>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                  <span className="font-bold text-emerald-950 block">Lời khuyên cho đơn vị thu mua:</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed font-sans">
                    Nên chốt hợp đồng đặt mua sơm tại Nhà nông Hết Sầu tầm khoảng cuối tháng 6 khi sản lượng thu chín bắt đầu dốc dần lên đỉnh, phòng bão lũ mùng làm dạt nỏ hột.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                  <span className="font-bold text-slate-700 block mb-1">Dự kiến biến động giá bán (Ri6):</span>
                  <div className="space-y-1.5 pt-1 font-mono text-[10.5px]">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Tháng 6 - Tháng 7 (Đầu vụ):</span>
                      <strong className="text-slate-800">85K - 100K VND/kg</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Tháng 8 (Chính vụ rộ):</span>
                      <strong className="text-green-600">65K - 78K VND/kg</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Tháng 9 (Cuối vụ thưa):</span>
                      <strong className="text-slate-800">90K - 115K VND/kg</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: MARKET PRICE COMPARISON REPORT */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-6 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
          <div>
            <h3 className="font-display font-bold text-xl text-green-900 flex items-center space-x-2">
              <TrendingUp className="w-5.5 h-5.5 text-yellow-500 animate-pulse" />
              <span>Biểu Đồ Phân Tích & So Sánh Giá Thị Trường Hàng Tuần</span>
            </h3>
            <p className="text-slate-500 text-xs mt-1 font-sans">
              Báo cáo so sánh trực quan giữa giá tại vườn, giá phân phối nội địa và giá thu gom xuất khẩu biên giới Việt - Trung.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-trigger-pdf-report"
              onClick={triggerPdfGeneration}
              disabled={isGeneratingPdf}
              className="py-2.5 px-4 bg-green-700 hover:bg-green-800 disabled:bg-slate-300 disabled:cursor-not-allowed font-bold text-xs text-white rounded-xl shadow-xs transition-transform hover:scale-101 flex items-center space-x-1.5 cursor-pointer"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Đang xuất PDF {Math.round(pdfStep * 25)}%...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-yellow-300 animate-bounce" />
                  <span>Tải Báo Cáo PDF Nông Sản ({new Date().toLocaleDateString('vi-VN')})</span>
                </>
              )}
            </button>
            
            <span className="text-[11px] bg-yellow-300 font-extrabold px-3 py-1 rounded-full text-slate-900 select-none">
              Cập nhật ngày: Hôm nay
            </span>
          </div>
        </div>

        {/* Loading Progress State for PDF */}
        {isGeneratingPdf && (
          <div className="bg-green-50/75 border border-green-200 rounded-2xl p-4 text-xs font-sans text-green-950 space-y-2 animate-pulse">
            <div className="flex items-center space-x-2 font-bold text-green-900">
              <Loader2 className="w-4 h-4 animate-spin text-green-700" />
              <span>Hệ thống chuyển đổi số "Nhà nông Hết Sầu" đang biên soạn dữ liệu:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-1 font-mono text-[10.5px]">
              <div className={`p-2 rounded-lg border ${pdfStep >= 1 ? 'bg-green-200 border-green-300 text-green-900' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                1. Đọc dữ liệu vùng trồng ({pdfStep >= 1 ? '✓ Xong' : 'Đang chờ...'})
              </div>
              <div className={`p-2 rounded-lg border ${pdfStep >= 2 ? 'bg-green-200 border-green-300 text-green-900' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                2. Phân tích giá 12 HTX ({pdfStep >= 2 ? '✓ Xong' : 'Đang chờ...'})
              </div>
              <div className={`p-2 rounded-lg border ${pdfStep >= 3 ? 'bg-green-200 border-green-300 text-green-900' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                3. Đóng ấn mã băm chuỗi ({pdfStep >= 3 ? '✓ Xong' : 'Đang chờ...'})
              </div>
              <div className={`p-2 rounded-lg border ${pdfStep >= 4 ? 'bg-green-200 border-green-300 text-green-900' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                4. Tạo chữ ký bảo chứng ({pdfStep >= 4 ? '✓ Xong' : 'Đang chờ...'})
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC LINE CHART CONTAINER (PHÂN TÍCH GIÁ BIỂU ĐỒ) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h4 className="font-display font-bold text-slate-900 text-sm flex items-center space-x-1">
                <LucideLineChart className="w-4 h-4 text-green-600" />
                <span>Biểu đồ diễn biến giá sầu riêng qua các tuần vừa qua (VND/kg)</span>
              </h4>
              <p className="text-[11px] text-slate-400">Điều chỉnh bộ lọc chủng loại và nguồn cấp dữ liệu để xem xu hướng chính xác.</p>
            </div>

            {/* Filter selectors */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-sans">
              <div className="flex border border-slate-200 rounded-md p-0.5 bg-slate-50">
                <button
                  onClick={() => setChartVariety('all')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${chartVariety === 'all' ? 'bg-green-700 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Tất cả sầu
                </button>
                <button
                  onClick={() => setChartVariety('ri6')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${chartVariety === 'ri6' ? 'bg-green-700 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Ri6
                </button>
                <button
                  onClick={() => setChartVariety('monthong')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${chartVariety === 'monthong' ? 'bg-green-700 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Monthong
                </button>
              </div>

              <div className="flex border border-slate-200 rounded-md p-0.5 bg-slate-50">
                <button
                  onClick={() => setChartSource('garden')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${chartSource === 'garden' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Giá tại Vườn
                </button>
                <button
                  onClick={() => setChartSource('vua')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${chartSource === 'vua' ? 'bg-yellow-600 text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Vực Gom (Vựa)
                </button>
                <button
                  onClick={() => setChartSource('export')}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${chartSource === 'export' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Xuất Khẩu
                </button>
              </div>
            </div>
          </div>

          {/* Recharts Area/Line Chart of price analysis */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={priceTrendData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRi6" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} stroke="#cbd5e1" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[55000, 130000]} />
                <Tooltip
                  formatter={(value: any) => [`${Number(value).toLocaleString('vi-VN')} đ/kg`]}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                
                {/* Dynamically render lines based on selection filters */}
                {(chartVariety === 'all' || chartVariety === 'ri6') && (
                  <Area
                    type="monotone"
                    name="Sầu riêng Ri6"
                    dataKey={chartSource === 'garden' ? 'ri6Garden' : chartSource === 'vua' ? 'ri6Vua' : 'ri6Export'}
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRi6)"
                  />
                )}
                
                {(chartVariety === 'all' || chartVariety === 'monthong') && (
                  <Area
                    type="monotone"
                    name="Monthong (Dona)"
                    dataKey={chartSource === 'garden' ? 'monGarden' : chartSource === 'vua' ? 'monVua' : 'monExport'}
                    stroke="#eab308"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorMon)"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic comparison table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider font-sans text-[10px]">
                <th className="p-3.5 pl-5">Chủng loại sầu riêng</th>
                <th className="p-3.5 text-center">Giá thu tại vườn (Bà con)</th>
                <th className="p-3.5 text-center">Doanh nghiệp thâu xuất khẩu</th>
                <th className="p-3.5 text-center">Thương lái mua Gom (Vựa)</th>
                <th className="p-3.5 text-center">Chênh lệch / Xu hướng</th>
                <th className="p-3.5 pr-5">Trạng thái thị trường</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-sans text-slate-800">
              {[
                {
                  variety: 'Sầu riêng Ri6 (Cơm vàng hạt lẹp loại 1)',
                  growerPrice: '78.500 đ/kg',
                  exportPrice: '92.000 đ/kg',
                  middlePrice: '84.000 đ/kg',
                  trend: '↑ 4.2%',
                  trendColor: 'text-green-600',
                  status: 'Rất sôi động - Cần gom xuất khẩu'
                },
                {
                  variety: 'Monthong (Dona tươi - Trái dẹt cơm vàng)',
                  growerPrice: '96.000 đ/kg',
                  exportPrice: '115.000 đ/kg',
                  middlePrice: '104.000 đ/kg',
                  trend: '↑ 7.8%',
                  trendColor: 'text-green-600',
                  status: 'Nguồn hàng xuất chính ngạch khan hiếm'
                },
                {
                  variety: 'Sầu riêng Chuồng Bò (Quả tròn béo dại ngọt)',
                  growerPrice: '68.000 đ/kg',
                  exportPrice: '80.000 đ/kg',
                  middlePrice: '74.000 đ/kg',
                  trend: '↓ -1.5%',
                  trendColor: 'text-rose-500',
                  status: 'Ổn định, phục vụ nhu cầu nội địa miền Tây'
                },
                {
                  variety: 'Musang King (Chuẩn cơm ráo dẻo bơ ngọt đắng)',
                  growerPrice: '160.000 đ/kg',
                  exportPrice: '190.000 đ/kg',
                  middlePrice: '172.000 đ/kg',
                  trend: '↑ 12.5%',
                  trendColor: 'text-green-600',
                  status: 'Xu hướng gom lẻ xuất khứ chất lượng cao'
                }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-5 font-bold text-slate-800">{row.variety}</td>
                  <td className="p-4 text-center text-green-700 font-extrabold">{row.growerPrice}</td>
                  <td className="p-4 text-center text-blue-700 font-extrabold">{row.exportPrice}</td>
                  <td className="p-4 text-center text-amber-700 font-extrabold">{row.middlePrice}</td>
                  <td className={`p-4 text-center font-mono font-bold ${row.trendColor}`}>{row.trend}</td>
                  <td className="p-4 pr-5 text-slate-600 italic font-sans text-[11px]">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Price warnings for Gardeners and Enterprises directly inside crop dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Gardeners Warning bullet */}
          <div className="p-5 bg-green-50/70 border border-green-150 rounded-2xl text-xs space-y-2">
            <h4 className="font-bold text-green-950 flex items-center space-x-1.5 uppercase font-sans tracking-wide">
              <span>📌 Khuyến nghị cho Nhà Vườn / Hộ Nông Dân</span>
            </h4>
            <div className="text-slate-700 leading-relaxed space-y-1.5 list-none pl-0">
              <p>• Không vội vàng bán sầu riêng non tuổi (dưới 8 tuổi) dù giá đang tăng cao, để đảm bảo uy tín ráo dẻo cơm vàng của hợp tác xã sầu riêng Hết Sầu.</p>
              <p>• Liên kết trực tiếp với vựa thu mua được bảo chứng để tối ưu hóa giá hái chín đồng bộ.</p>
            </div>
          </div>

          {/* Enterprise Warning bullet */}
          <div className="p-5 bg-amber-50/70 border border-amber-150 rounded-2xl text-xs space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center space-x-1.5 uppercase font-sans tracking-wide">
              <span>📌 Khuyến nghị cho Doanh Nghiệp / Thương Nhân</span>
            </h4>
            <div className="text-slate-700 leading-relaxed space-y-1.5 list-none pl-0">
              <p>• Khớp đơn đặt trước tối thiểu 10 ngày để HTX lên kế hoạch thu hái tự nhiên đạt chuẩn búp tròn múi khô.</p>
              <p>• Tải xem nhật ký canh tác số để kiểm định độ sạch vi sinh đạt chuẩn hải quan xuất khẩu.</p>
            </div>
          </div>
        </div>

        {/* SECTION 5: IN-DEPTH COMPREHENSIVE VARIETY COMPARISON & SCIENTIFIC FARMING TECHNICAL GUIDE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-8 text-left shadow-sm">
          <div className="border-b border-slate-100 pb-5 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                <Award className="w-5 h-5" />
              </span>
              <h3 className="font-display font-extrabold text-xl text-slate-900">
                Phân Tích Toàn Diện Kỹ Thuật Canh Tác & Tiêu Chuẩn Xuất Khẩu Sầu Riêng
              </h3>
            </div>
            <p className="text-slate-500 text-xs font-sans">
              Báo cáo khoa học độc quyền so sánh chỉ tiêu sinh học béo ngọt brix, khả năng chịu mặn đất đìa, và phác đồ bón phân sinh học cho từng vùng trồng đã đăng ký bảo chứng.
            </p>
          </div>

          {/* DYNAMIC COMPREHENSIVE RECHARTS BAR CHART */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold font-display text-yellow-405" style={{ color: '#fbbf24' }}>
                  📊 Biểu Đồ Thống Kê So Sánh Chỉ Tiêu Đóng Vỏ & Khớp Xuất Khẩu Chi Tiết
                </h4>
                <span className="text-[10px] px-2.5 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md font-mono">
                  Mẫu: 4 Chủng Sầu Khó Tính
                </span>
              </div>

              {/* Multi-series chart for Variety Parameters */}
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Sầu Ri6', 'Độ ngọt (Brix%)': 15, 'Chịu mặn (‰*10)': 12, 'Khớp xuất khẩu (%)': 85, 'Bảo quản (Ngày)': 10 },
                      { name: 'Monthong', 'Độ ngọt (Brix%)': 17, 'Chịu mặn (‰*10)': 10, 'Khớp xuất khẩu (%)': 95, 'Bảo quản (Ngày)': 15 },
                      { name: 'Chuồng Bò', 'Độ ngọt (Brix%)': 14, 'Chịu mặn (‰*10)': 20, 'Khớp xuất khẩu (%)': 45, 'Bảo quản (Ngày)': 6 },
                      { name: 'MusangKing', 'Độ ngọt (Brix%)': 20, 'Chịu mặn (‰*10)': 8, 'Khớp xuất khẩu (%)': 92, 'Bảo quản (Ngày)': 12 }
                    ]}
                    margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="#cbd5e1" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} fontWeight="bold" />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', fontSize: '11px', color: '#fff' }}
                    />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: '10.5px', color: '#fff' }} />
                    <Bar dataKey="Độ ngọt (Brix%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Chịu mặn (‰*10)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Khớp xuất khẩu (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Bảo quản (Ngày)" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                * Chú thích: Chỉ số chịu mặn được nhân hệ số 10 để hiển thị trực quan cân bọc trên cùng hệ quy chiếu đồ thị.
              </p>
            </div>

            {/* Explanation card beside chart */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-display font-semibold text-slate-900 text-sm">Nhận Xét Chất Lượng Của Giám Định Viên:</h4>
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl">
                  <span className="font-bold text-indigo-900 block">Sầu Monthong (Dona):</span>
                  <p className="text-slate-650 leading-relaxed text-[11px] mt-0.5">
                    Hộc múi to, cơm ráo dẻo sệt bơ có xơ ít nhất, đặc biệt vỏ quả dai dày giúp kéo dài thời hạn trữ lạnh lên đến 15 ngày, dẫn đầu tỷ trọng xuất khẩu sang Trung Quốc đại lục.
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl">
                  <span className="font-bold text-emerald-900 block">Sầu Ri6 miền Tây:</span>
                  <p className="text-slate-650 leading-relaxed text-[11px] mt-0.5">
                    Màu vàng rực rỡ đặc trưng lôi cuốn cảm quan, tỷ số ngọt béo (brix 15%-16%) đạt chuẩn hoàn mỹ, tuy khâu bảo quản sau gặt chín bói nhạy cảm cần chuyển chở luồng xanh cẩn trọng.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILED CANHTAC & COMPLIANCE BENTO CARDS WITH INTERACTIVE SEARCH & LIGHTBOX */}
          <div className="space-y-4 pt-4 border-t border-slate-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-150">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">Công cụ Tra cứu Hướng Dẫn Canh Tác Số</span>
                <p className="text-[11px] text-slate-500">Tra cứu nhanh lịch xả nhụy, phác đồ IPM, bón phân lót và chứng nhận xuất khẩu.</p>
              </div>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm từ khóa: hãm nước, xả nhụy, Phytophthora, phân lót..."
                  value={farmingSearch}
                  onChange={(e) => setFarmingSearch(e.target.value)}
                  className="w-full text-xs pl-10 pr-9 py-2.5 rounded-xl border border-slate-205 outline-none bg-white focus:ring-1 focus:ring-emerald-500/50"
                />
                {farmingSearch && (
                  <button
                    onClick={() => setFarmingSearch('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-bold p-0.5 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {filteredFarmingGuides.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2 animate-bounce" />
                <h5 className="font-bold text-slate-750 text-xs">Không tìm thấy hướng dẫn canh tác phù hợp</h5>
                <p className="text-[11px] text-slate-450 mt-1">Bà con hãy thử tìm với từ khóa gọn nhẹ khác như "nhụy", "rễ", "Phytophthora", "Carton"...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans text-xs">
                {filteredFarmingGuides.map((guide) => {
                  const isEmerald = guide.color === 'emerald';
                  const isSky = guide.color === 'sky';
                  const isAmber = guide.color === 'amber';
                  const isTeal = guide.color === 'teal';

                  let titleColor = '#15803d'; // Default emerald
                  let iconColorClass = 'text-emerald-600';
                  let badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
                  let cardBorderClass = 'hover:border-emerald-300 hover:shadow-emerald-500/5';
                  if (isSky) {
                    titleColor = '#0284c7';
                    iconColorClass = 'text-sky-600';
                    badgeBg = 'bg-sky-50 text-sky-800 border-sky-200/50';
                    cardBorderClass = 'hover:border-sky-300 hover:shadow-sky-500/5';
                  } else if (isAmber) {
                    titleColor = '#b45309';
                    iconColorClass = 'text-amber-600';
                    badgeBg = 'bg-amber-50 text-amber-800 border-amber-250/50';
                    cardBorderClass = 'hover:border-amber-300 hover:shadow-amber-500/5';
                  } else if (isTeal) {
                    titleColor = '#0f766e';
                    iconColorClass = 'text-teal-600';
                    badgeBg = 'bg-teal-50 text-teal-800 border-teal-200/50';
                    cardBorderClass = 'hover:border-teal-300 hover:shadow-teal-500/5';
                  }

                  const IconComponent = () => {
                    switch (guide.iconName) {
                      case 'Calendar': return <Calendar className={`w-4.5 h-4.5 ${iconColorClass}`} />;
                      case 'ShieldAlert': return <ShieldAlert className={`w-4.5 h-4.5 ${iconColorClass}`} />;
                      case 'Cpu': return <Cpu className={`w-4.5 h-4.5 ${iconColorClass}`} />;
                      case 'Award': return <Award className={`w-4.5 h-4.5 ${iconColorClass}`} />;
                      case 'CheckCircle2': return <CheckCircle2 className={`w-4.5 h-4.5 ${iconColorClass}`} />;
                      default: return <BookOpen className={`w-4.5 h-4.5 ${iconColorClass}`} />;
                    }
                  };

                  return (
                    <div
                      key={guide.id}
                      onClick={() => {
                        setSelectedFarmingCard(guide);
                      }}
                      className={`bg-white hover:bg-slate-50/40 cursor-pointer p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 duration-300 transition-all flex flex-col justify-between group relative overflow-hidden text-left ${cardBorderClass}`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded border ${badgeBg}`}>
                            {guide.badge}
                          </span>
                          <span className="text-[10px] text-emerald-800 font-extrabold group-hover:translate-x-1 transition-transform tracking-tight flex items-center">
                            Chi tiết ➜
                          </span>
                        </div>
                        
                        <h4 className="font-display font-black text-sm flex items-center space-x-2" style={{ color: titleColor }}>
                          <IconComponent />
                          <span>{guide.title}</span>
                        </h4>

                        <p className="text-slate-500 leading-relaxed text-[11px] h-10 overflow-hidden line-clamp-2">
                          {guide.shortDesc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-450 italic">Nhấp xem toàn bộ quy trình</span>
                        <span className="font-mono text-slate-300">#0{guide.id}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STUNNING HIGH-FIDELITY PDF REPORT MODAL DIALOG */}
      {pdfModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl max-w-4xl w-full p-1 border border-slate-700/80 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header controls */}
            <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <span className="font-mono text-xs font-bold text-slate-400">PDF Reader V1.2 — BÁO CÁO NÔNG SẢN_HETS_SẦU.pdf</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="p-2 text-slate-350 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="In báo cáo"
                >
                  <Printer className="w-4.5 h-4.5 text-slate-300" />
                </button>
                <button
                  onClick={() => {
                    setPdfDownloaded(true);
                    alert('Đã tải xuống tệp PDF báo cáo thị trường tuần này thành công về máy tính của bạn!');
                  }}
                  className="py-1.5 px-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {pdfDownloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{pdfDownloaded ? 'Đã lưu PDF' : 'Tải Xuống PDF'}</span>
                </button>
                <button
                  onClick={() => setPdfModalOpen(false)}
                  className="p-1 px-2.5 bg-slate-800 text-slate-300 hover:bg-red-900 hover:text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>

            {/* Simulated Printed PDF Page Frame */}
            <div className="bg-white p-8 lg:p-12 text-slate-950 font-serif max-h-[75vh] overflow-y-auto block relative select-none shadow-inner print:p-0">
              {/* PDF Background Watermark */}
              <div className="absolute inset-x-0 top-1/3 text-center pointer-events-none opacity-[0.04] text-green-900 font-bold select-none rotate-25 z-0 text-5xl">
                NHÀ NÔNG HẾT SẦU VietGAP
              </div>

              {/* PDF Layout Start */}
              <div className="relative z-10 space-y-6 font-sans text-left">
                {/* Letterhead */}
                <div className="flex justify-between items-start border-b-2 border-green-800 pb-4">
                  <div className="space-y-1">
                    <h1 className="text-lg font-extrabold text-green-900 tracking-tight uppercase">Hệ Sinh Thái Số Nhà Nông Hết Sầu</h1>
                    <p className="text-[10px] text-slate-500 font-medium">Bản đồ số & Chuỗi liên kết giá trị sầu riêng Miền Tây bền vững</p>
                    <p className="text-[10px] text-slate-400">Văn phòng đại diện: Cai Lậy, Thủ Thừa, Tiền Giang, Việt Nam</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-[9px] bg-red-100 text-red-800 border border-red-300 font-bold px-2 py-0.5 rounded uppercase">Tài liệu mật nội bộ</span>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">Mã lực: VIP-9003820</p>
                    <p className="text-[10.5px] text-slate-700 font-mono">Ngày ký: {new Date().toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>

                {/* PDF Title */}
                <div className="text-center space-y-2 py-4">
                  <h2 className="text-xl font-bold text-slate-950 uppercase tracking-wide">Báo Cáo Phân Tích Biến Động Nông Sản & Dự Báo Mùa Vụ</h2>
                  <p className="text-xs text-slate-500 font-sans italic">Ký số & Bảo trợ dữ liệu thời gian thực bởi Liên minh HTX Hết Sầu</p>
                  <div className="w-16 h-0.5 bg-green-700 mx-auto"></div>
                </div>

                {/* Metadata block */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl text-[11px] font-sans border border-slate-150">
                  <div>
                    <span className="text-slate-400 block font-bold">Chủng loại theo dõi</span>
                    <span className="text-slate-800 font-extrabold block">Ri6, Monthong, Chuồng Bò</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold">Vùng mẫu thống kê</span>
                    <span className="text-slate-800 font-extrabold block">Cai Lậy, Cái Bè, Chợ Lách</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold">Phương pháp lấy mẫu</span>
                    <span className="text-slate-800 font-extrabold block">Nhật ký VietGAP Đám Mây</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold">Trạng thái bảo chứng</span>
                    <span className="inline-flex items-center text-green-700 font-extrabold text-[9px] bg-green-100 px-2 py-0.5 rounded border border-green-250 mt-0.5">
                      Đã ký số chuỗi khối
                    </span>
                  </div>
                </div>

                {/* Main section 1 */}
                <div className="space-y-2 text-xs">
                  <h3 className="font-bold text-green-900 uppercase text-xs border-l-2 border-green-700 pl-2">I. Phân tích hiện trạng thị trường & Xu hướng vĩ mô</h3>
                  <p className="text-slate-700 leading-relaxed text-justify">
                    Theo số liệu tổng ghi từ thiết bị định vị và bản đồ nhiệt của <strong>Hệ sinh thái Hết Sầu</strong>, tổng dung lượng sản lượng sầu đã xả nhụy thành công và chuẩn bị chín bói tại địa bàn miền Tây ước đạt 12.850 tấn. Trong đó giống Ri6 chiếm 52% tổng sản lượng. Xu hướng gom hàng phục vụ xuất khẩu đông lạnh bộc ghép container đang diễn ra cực kỳ sôi động khi nhu cầu phía biên giới gia tăng ổn định. Các đối tác doanh nghiệp chuỗi lạnh được khuyến nghị đặt vấn đề trước 20 - 30 ngày để sắp lịch thợ gõ sầu chất ráo.
                  </p>
                </div>

                {/* Main section 2 - pricing breakdown table */}
                <div className="space-y-2 text-xs">
                  <h3 className="font-bold text-green-900 uppercase text-xs border-l-2 border-green-700 pl-2">II. Tổng hợp thống kê chênh lệch giá biểu định mức định giá</h3>
                  <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 uppercase text-slate-700 border-b border-slate-200">
                          <th className="p-2 text-left">Chủng loại</th>
                          <th className="p-2 text-center">Giá thu tại vườn</th>
                          <th className="p-2 text-center">Vụ trung lái gom</th>
                          <th className="p-2 text-center">Doanh nghiệp thâu</th>
                          <th className="p-2 text-right">Mức biến chuyển</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-slate-800 font-sans">
                        <tr>
                          <td className="p-2 font-bold text-slate-900">Sầu riêng Ri6 loại 1</td>
                          <td className="p-2 text-center text-green-700 font-extrabold">78.500 đ/kg</td>
                          <td className="p-2 text-center text-amber-700 font-extrabold">84.000 đ/kg</td>
                          <td className="p-2 text-center text-blue-700 font-extrabold">92.000 đ/kg</td>
                          <td className="p-2 text-right text-green-600 font-bold">↑ 4.2% tuần</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-slate-900">Monthong (Dona tươi)</td>
                          <td className="p-2 text-center text-green-700 font-extrabold">96.000 đ/kg</td>
                          <td className="p-2 text-center text-amber-700 font-extrabold">104.000 đ/kg</td>
                          <td className="p-2 text-center text-blue-700 font-extrabold">115.000 đ/kg</td>
                          <td className="p-2 text-right text-green-600 font-bold">↑ 7.8% tuần</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold text-slate-900">Sầu riêng Chuồng Bò</td>
                          <td className="p-2 text-center text-green-700 font-extrabold">68.000 đ/kg</td>
                          <td className="p-2 text-center text-amber-700 font-extrabold">74.000 đ/kg</td>
                          <td className="p-2 text-center text-blue-700 font-extrabold">80.000 đ/kg</td>
                          <td className="p-2 text-right text-rose-500 font-bold">↓ -1.5% tuần</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footnote stamp and signature section */}
                <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 items-end text-xs font-sans">
                  <div className="space-y-4">
                    <p className="font-bold text-slate-800 uppercase text-[10px]">Cơ quan kiểm chứng thứ ba:</p>
                    <div className="flex items-center space-x-3 bg-green-50/50 p-2.5 rounded-lg border border-green-100">
                      <ShieldCheck className="w-8 h-8 text-green-700 flex-shrink-0" />
                      <div className="text-[9px] leading-tight text-slate-600">
                        <strong className="block text-green-950 font-bold">Bảo chứng VietGAP Số Hóa</strong>
                        <span>Mã định danh chuỗi: #00-B920-88A</span>
                      </div>
                    </div>
                  </div>

                  {/* Stamp and signature mockup */}
                  <div className="text-right space-y-1 block relative">
                    <span className="block text-[10px] text-slate-400">Đại diện Liên Minh Hợp Tác Xã Hết Sầu</span>
                    <strong className="block text-slate-900 text-[11px] font-bold">Chủ nhiệm HTX: Trần Văn Hết Sầu</strong>
                    
                    {/* Simulated Red stamp of organization */}
                    <div className="absolute right-4 bottom-0 select-none pointer-events-none opacity-85 z-20">
                      <div className="w-20 h-20 border-3 border-red-500 rounded-full flex items-center justify-center rotate-12 text-[7px] text-red-500 font-sans font-black uppercase text-center flex-col leading-none shadow-xs">
                        <div className="border-t border-b border-red-500 py-0.5 my-0.5">HTX SẦU RIÊNG</div>
                        <div className="font-extrabold text-[8px] text-red-600 tracking-wider">HẾT SẦU</div>
                        <div className="text-[6px] tracking-tight">CAI LẬY TIỀN GIANG</div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <span className="text-[10px] font-mono border-t border-slate-300 pt-1 text-slate-400">Đã phê chuẩn điện tử</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CẨM NANG CANH TÁC CHI TIẾT POPUP DIALOG */}
      {selectedFarmingCard && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200 text-left flex flex-col max-h-[90vh]">
            {/* Header with appropriate theme colors */}
            <div className={`p-6 text-white flex justify-between items-start ${
              selectedFarmingCard.color === 'emerald' ? 'bg-gradient-to-r from-emerald-800 to-emerald-700' :
              selectedFarmingCard.color === 'sky'    ? 'bg-gradient-to-r from-sky-800 to-sky-700' :
              selectedFarmingCard.color === 'amber'  ? 'bg-gradient-to-r from-amber-700 to-amber-600' :
              'bg-gradient-to-r from-teal-800 to-teal-700'
            }`}>
              <div className="space-y-1.5">
                <span className="text-[10px] bg-white/20 text-yellow-300 font-mono font-black px-2.5 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
                  {selectedFarmingCard.badge}
                </span>
                <h3 className="font-display font-extrabold text-lg mt-1">
                  {selectedFarmingCard.title}
                </h3>
                <p className="text-white/80 text-xs">
                  {selectedFarmingCard.shortDesc}
                </p>
              </div>
              <button
                onClick={() => setSelectedFarmingCard(null)}
                className="p-1.5 px-3 hover:bg-white/10 rounded-xl text-white font-bold transition-all text-xs cursor-pointer"
              >
                ✕ ĐÓNG
              </button>
            </div>

            {/* Scrollable details container */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              {/* Introduction */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 leading-relaxed text-xs text-slate-700">
                <strong className="block text-slate-900 text-sm mb-1.5 font-bold">Tổng quan lý thuyết gốc:</strong>
                {selectedFarmingCard.details.introduction}
              </div>

              {/* Steps or Guidelines */}
              <div className="space-y-4">
                <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span> Quy trình thực hiện chi tiết
                </h5>
                
                <div className="space-y-3.5 pl-2.5 border-l-2 border-slate-150">
                  {selectedFarmingCard.details.steps.map((step: any, sIdx: number) => (
                    <div key={sIdx} className="space-y-1 text-xs relative">
                      <div className="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-slate-200 border border-white flex items-center justify-center text-[8px] font-black font-mono text-slate-700">
                        {sIdx + 1}
                      </div>
                      <strong className="text-slate-900 text-[12.5px] block font-extrabold pl-1.5">
                        {step.name}
                      </strong>
                      <p className="text-slate-650 leading-relaxed text-[11px] pl-1.5">
                        {step.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips & Warnings */}
              <div className="space-y-3 bg-yellow-50/50 p-4 rounded-2xl border border-yellow-200 text-xs text-slate-700">
                <strong className="text-yellow-900 text-[11.5px] font-black uppercase tracking-wider block">
                  💡 Bí quyết kinh nghiệm từ nhà vườn Hết Sầu:
                </strong>
                <ul className="space-y-2 list-none pl-0">
                  {selectedFarmingCard.details.tips.map((tip: string, tIdx: number) => (
                    <li key={tIdx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                      <span className="text-yellow-600 font-extrabold shrink-0 mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Special interactive calculators depending on guide ID */}
              {selectedFarmingCard.details.hasEstimator && (
                <div className="p-5 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 rounded-2xl border border-emerald-500/20 text-xs space-y-4">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] text-green-800 font-extrabold uppercase tracking-widest block font-sans">Tính toán nhanh chu kỳ nông học</span>
                    <h6 className="font-bold text-slate-800 text-sm">📅 Công cụ dự kiến ngày gặt thu hoạch chính vụ</h6>
                    <p className="text-slate-500 text-[11px]">Bà con điền ngày hoa sầu nở rộ và chủng giống trồng của nhà vườn để hệ thống tính toán ngày thu hái lý tưởng.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left font-sans">
                      <label className="text-slate-650 font-bold block text-[11px]">1. Nhập Ngày hoa nở nhụy rộ:</label>
                      <input
                        type="date"
                        value={estBloomDate}
                        onChange={(e) => setEstBloomDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-205 outline-none bg-white focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-1.5 text-left font-sans">
                      <label className="text-slate-650 font-bold block text-[11px]">2. Chọn Chủng giống gieo:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setEstVariety('ri6')}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold font-sans transition-all cursor-pointer ${
                            estVariety === 'ri6'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-700 border-slate-205 hover:bg-slate-50'
                          }`}
                        >
                          Ri6 (~95 ngày)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEstVariety('monthong')}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold font-sans transition-all cursor-pointer ${
                            estVariety === 'monthong'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-700 border-slate-205 hover:bg-slate-50'
                          }`}
                        >
                          Monthong (~115 ngày)
                        </button>
                      </div>
                    </div>
                  </div>

                  {calculatedHarvestDate && (
                    <div className="p-4 bg-emerald-600 text-white rounded-xl text-center space-y-1 border border-emerald-500">
                      <span className="text-[10px] text-white/85 uppercase font-bold block tracking-wider">Ngày dạm hái gõ sầu cắt chín bói dự kiến</span>
                      <strong className="text-base text-yellow-300 font-display font-black block tracking-wide">
                        {calculatedHarvestDate}
                      </strong>
                      <p className="text-[10px] text-white/70 italic">* Chú ý: Cần kết hợp xem thời tiết mặn và độ rốc cuống quả thực tế.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer with actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-150 flex items-center justify-between gap-4 font-sans">
              <span className="text-[11px] text-slate-400 italic">Hỗ trợ bởi Kỹ sư Nông nghiệp số HTX Hết Sầu</span>
              <button
                onClick={() => setSelectedFarmingCard(null)}
                className="py-2 px-6 bg-slate-900 hover:bg-slate-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Đồng ý & Đóng cẩm nang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
