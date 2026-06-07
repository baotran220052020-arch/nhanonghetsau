import React, { useState } from 'react';
import { 
  Sprout, 
  Building, 
  Edit2, 
  Plus, 
  Calendar, 
  Star, 
  ShieldAlert, 
  BadgeCheck, 
  FileText, 
  ShoppingBag, 
  FolderGit, 
  Save, 
  AlertCircle, 
  AlertTriangle, 
  Bug, 
  Droplets, 
  RefreshCw, 
  Sparkles, 
  ShieldCheck, 
  Info,
  TrendingUp,
  BarChart3,
  LineChart,
  User,
  Users,
  Coins,
  Lock,
  Building2
} from 'lucide-react';
import { MOCK_FARMERS, MOCK_ENTERPRISES, MOCK_TRANSACTIONS } from '../data';
import { FarmerProfile, EnterpriseProfile, CultivationDiary, TransactionHistory } from '../types';
import RiskMitigationConsole from './RiskMitigationConsole';
import TripartiteContractVault from './TripartiteContractVault';

interface DashboardProps {
  userRole: 'giao_dien_ngoai' | 'nha_vuon' | 'doanh_nghiep';
  userName: string | null;
}

export default function Dashboard({ userRole, userName }: DashboardProps) {
  // Navigation Tabs state inside Dashboard
  const [activeTab, setActiveTab] = useState<'thongke' | 'canhbao' | 'hopdong' | 'ruiro' | 'hoso'>('thongke');

  // Farmer model states
  const [farmerInfo, setFarmerInfo] = useState<FarmerProfile>(MOCK_FARMERS[0]); // Default: Sáu Đức
  const [isEditingFarmer, setIsEditingFarmer] = useState(false);

  // New diary simulation states
  const [showAddDiary, setShowAddDiary] = useState(false);
  const [newDiary, setNewDiary] = useState({
    stage: 'Nuôi trái non' as any,
    workDone: '',
    weather: 'Nắng ấm dào dạt sông Tiền',
    waterAmount: '35L/gốc',
    notes: 'Chưa phát hiện rệp mắt bông.',
    fertilizerUsed: 'Kali hữu cơ vi sinh tự ủ',
  });

  // Enterprise model states
  const [enterpriseInfo, setEnterpriseInfo] = useState<EnterpriseProfile>(MOCK_ENTERPRISES[0]); // Default: VinaFruit
  const [isEditingEnterprise, setIsEditingEnterprise] = useState(false);

  // Biological Warning simulated outbreaks
  const [customOutbreak, setCustomOutbreak] = useState<'none' | 'nut_than_xi_mu' | 'nhen_do' | 'rep_sap'>('none');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 1. Biological Warning diagnostics engine (From initial prompt requirement)
  const analyzeDiseaseAlerts = (farmer: FarmerProfile) => {
    const currentVariety = farmer.variety;
    const latestDiary = farmer.diary[0];
    const currentStage = latestDiary ? latestDiary.stage : 'Nuôi trái non';
    const weatherText = latestDiary ? latestDiary.weather.toLowerCase() : '';
    const notesText = latestDiary ? latestDiary.notes.toLowerCase() : '';
    const area = farmer.area || 3.5;

    let biosecurityScore = 95;
    const threatsAndSolutions = [];

    // Check with Variety specs
    if (currentVariety === 'Ri6') {
      const isRainy = weatherText.includes('mưa') || weatherText.includes('giông') || weatherText.includes('ẩm');
      threatsAndSolutions.push({
        id: '1',
        disease: 'Nứt thân xì mủ & Thối cổ rễ (Phytophthora palmivora)',
        riskLevel: isRainy ? 'Cực kỳ cao 🔴' : 'Trung bình 🟡',
        summary: 'Giống sầu riêng Ri6 sinh trưởng ở vùng đất mương phù sa ẩm thường nhạy cảm với bào tử nấm Phytophthora phát tác cổ rễ.',
        remedy: 'Tiến hành đào khơi thông thoát úng sông mương rọc; dùng dao cạo vết thối xì mủ sẫm thân rồi quét trét dung dịch đồng đỏ Ridomil Gold.',
        pesticide: 'Chế phẩm Aliette 800WG phối hợp Ridomil Gold 68WG đặc hữu.',
        quantity: `Pha ${(area * 1.5).toFixed(1)} kg bột Aliette với ${(area * 600).toFixed(0)} lít nước sạch tưới sũng vùng móng rễ tán sầu.`
      });
      if (isRainy) biosecurityScore -= 20;
    } else if (currentVariety === 'Monthong') {
      const hasBugKeywords = notesText.includes('rệp') || notesText.includes('sáp') || notesText.includes('bọ');
      threatsAndSolutions.push({
        id: '2',
        disease: 'Rệp sáp châm hộc tai múi non & hại cơm sầu sượng dạt (Pseudococcus)',
        riskLevel: hasBugKeywords ? 'Cực kỳ cao 🔴' : 'Báo động vàng 🟡',
        summary: 'Monthong quả chen chùm tạo kẽ khuất cho rệp trắng bâu màng, châm hút khô mật sột làm rụng lốp trái non.',
        remedy: 'Dùng vòi bơm sấy nẹp nước áp lực cao, phun bao tơ nấm ký sinh xanh trắng và bọc túi organic chống nhiễm sáp.',
        pesticide: 'Bào tử nấm ký sinh Boveril kết hợp dầu khoáng SK99 sinh học.',
        quantity: `Cần ${(area * 0.4).toFixed(1)} lít dầu khoáng pha cùng ${(area * 350).toFixed(0)} lít nước tưới chụp vòm quả lúc sương chiều dịu mát.`
      });
      if (hasBugKeywords) biosecurityScore -= 15;
    }

    // Check with Growth Stages
    if (currentStage === 'Xả nhụy') {
      const isDryHot = weatherText.includes('nóng') || weatherText.includes('khô') || weatherText.includes('hanh');
      threatsAndSolutions.push({
        id: '3',
        disease: 'Rầy bông bọ trĩ phá héo nướu nhị đui phấn hoa sầu (Thrips)',
        riskLevel: isDryHot ? 'Cực kỳ cao 🔴' : 'Nhẹ nhàng 🟢',
        summary: 'Giai đoạn nhạy cảm hoa nhả nhầy phấn mật, bọ trĩ sinh nở bão táp trong thời tiết hanh khô hút quắt rụng búp lộc.',
        remedy: 'Hạn chế thuốc hóa học gây rụng mỏng nhụy phấn; tăng cường phun ẩm sương sớm mát nhấp rìa tán.',
        pesticide: 'Amistar Top 325SC phối cùng hoạt chất sinh học Confidor.',
        quantity: `Hòa loãng ${(area * 150).toFixed(0)} ml Amistar Top với ${(area * 250).toFixed(0)} lít nước sạch phun đẫm sương mù tán bông.`
      });
    } else if (currentStage === 'Nuôi trái non') {
      const isRainy = weatherText.includes('mưa') || weatherText.includes('giông') || weatherText.includes('ẩm');
      threatsAndSolutions.push({
        id: '4',
        disease: 'Sâu đục trái chín bói & thối thâm đui gai sầu',
        riskLevel: isRainy ? 'Nguy hại cao 🔴' : 'Trung bình thường trực 🟡',
        summary: 'Sâu đục kẽ hộc gai len lách lọt vào hộc cơm hút mọc nấm bồ hóng dội rụng bóp hoa trái móp.',
        remedy: 'Tuyển trái chắt lọc đợt hai, tỉa bỏ trái méo vai lồi rốn, giăng bẫy pheromone trục bướm đêm.',
        pesticide: 'Chế phẩm nội hấp Bacillus thuringiensis (Bt) hữu cơ thân thiện môi trường.',
        quantity: `Sử dụng ${(area * 1.8).toFixed(1)} kg bào tử nấm vi sinh Bt phối cùng ${(area * 800).toFixed(0)} lít nước xịt tạt vạt chùm quả.`
      });
      if (isRainy) biosecurityScore -= 10;
    }

    // Environmental salinity check (Mặn phèn miền Tây Nam bộ)
    const isSaline = weatherText.includes('mặn') || notesText.includes('mặn') || weatherText.includes('phèn') || notesText.includes('phèn');
    if (isSaline) {
      threatsAndSolutions.push({
        id: 'env_salt',
        disease: 'Ngộ độc mặn phù sa & thối nghẹt rễ non sụt rụng lá',
        riskLevel: '🔴 NGUY CẤP CỰC HẠN',
        summary: 'Nước nguồn sông vạt muối mặn TDS > 0.5‰ bơm tưới cản rễ hút nước, vắt kiệt móng nước tế bào gây khô cháy đọt sầu héo hắt.',
        remedy: 'Khóa chặt phai cống sông mương rạch; huy động ngọt bạt trữ ngọt tưới vòi sen nhỏ giọt giữ bọc chân rễ.',
        pesticide: 'Hợp chất Silicate Canxi hữu dụng giúp rã mặn, tái tạo màng lông hút.',
        quantity: `Sử dụng ${(area * 10).toFixed(0)} kg vôi bột thạch cao rải quanh nền móng rễ phối ${(area * 1.5).toFixed(1)} kg Silicate Canxi kích mở vùng ngọt.`
      });
      biosecurityScore -= 25;
    }

    // Custom outbreak simulations override
    if (customOutbreak === 'nut_than_xi_mu') {
      threatsAndSolutions.unshift({
        id: 'sim_1',
        disease: '⚠️ DỊCH GIẢ LẬP: Phytophthora tấn công xì mủ bệ cành sẫm thối',
        riskLevel: '🚨 NGUY CẤP CỰC HẠN',
        summary: 'Người dùng kích hoạt cảnh báo dịch đặc hữu: Vết loét chảy nhựa nâu rỉ thối thân lồng lộng gỗ cành, héo khô rộc lá.',
        remedy: 'Mài vết thương sủi loét, quét trực tiếp bột Ridomil Gold lỏng dẻo ráo.',
        pesticide: 'Quét trét keo đồng Copper Oxychloride phối tưới Metalaxyl móng rễ.',
        quantity: `Dùng ${(area * 2).toFixed(0)} kg keo đồng quét quét thân gỗ bói sầu riêng quanh vườn.`
      });
      biosecurityScore -= 30;
    } else if (customOutbreak === 'nhen_do') {
      threatsAndSolutions.unshift({
        id: 'sim_2',
        disease: '⚠️ DỊCH GIẢ LẬP: Bão nhện đỏ lột bạc tế bào quang hợp đọt non',
        riskLevel: '🚨 NGUY CẤP CỰC HẠN',
        summary: 'Người dùng kích hoạt cảnh báo dịch đặc hữu: Hàng vạn nhện đỏ bám hai mặt lá ti lốp hút làm nhạt trắng lộc xanh mượt, rụng lá hói cây.',
        remedy: 'Phun tắm xối nước cao áp dập bụi nhện vào ban sáng tĩnh lặng.',
        pesticide: 'Dịch dầu khoáng organic kết hợp Ortus 5SC đặc trị.',
        quantity: `Pha loãng ${(area * 300).toFixed(0)} ml tinh dầu màng Ortus cùng ${(area * 500).toFixed(0)} lít nước phun trực tiếp mặt sau lá sầu.`
      });
      biosecurityScore -= 25;
    } else if (customOutbreak === 'rep_sap') {
      threatsAndSolutions.unshift({
        id: 'sim_3',
        disease: '⚠️ DỊCH GIẢ LẬP: Rệp sáp lấp sệt hộc gai Monthong kịch liệt',
        riskLevel: '🚨 NGUY CẤP CỰC HẠN',
        summary: 'Người dùng kích hoạt cảnh báo dịch đặc hữu: Bông phấn rệp phủ mù đui vảy gai sầu, gây mốc đen hộc múi rụng dạt loại 3 bẹp.',
        remedy: 'Xịt tạt sả xông dầu dọn sạch tổ kiến sáp tha rệp.',
        pesticide: 'Sát trùng sinh học bột nấm xanh Trichoderma Trichonex.',
        quantity: `Cần tưới tạt ${(area * 2).toFixed(1)} kg chế phẩm nấm ký sinh tơi xốp hòa tan ${(area * 1000).toFixed(0)} lít nước phun đẫm kẽ múi.`
      });
      biosecurityScore -= 28;
    }

    biosecurityScore = Math.max(15, Math.min(100, biosecurityScore));

    return {
      biosecurityScore,
      threats: threatsAndSolutions
    };
  };

  const handleRunDiagnosis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('Đồng bộ hệ thống dữ liệu IoT Sông Tiền hoàn tất! Chỉ số sinh trắc học vùng đạt chứng nhận an toàn!');
    }, 1200);
  };

  // Farmer profile save click
  const handleSaveFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingFarmer(false);
    alert('Hồ sơ số hóa nhà vườn và định vị vùng sầu của bạn đã được cập nhật thành công!');
  };

  // Enterprise profile save click
  const handleSaveEnterprise = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingEnterprise(false);
    alert('Thông tin thâu bao tiêu và hồ sơ tín dụng doanh nghiệp đã lưu trữ sòng phẳng!');
  };

  // Add diary log event
  const handleAddDiary = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: CultivationDiary = {
      id: `d_add_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      stage: newDiary.stage,
      workDone: newDiary.workDone,
      weather: newDiary.weather,
      waterAmount: newDiary.waterAmount,
      notes: newDiary.notes,
      fertilizerUsed: newDiary.fertilizerUsed || undefined,
    };

    setFarmerInfo({
      ...farmerInfo,
      diary: [newEntry, ...farmerInfo.diary],
    });
    setShowAddDiary(false);
    setNewDiary({
      stage: 'Nuôi trái non',
      workDone: '',
      weather: 'Nắng ấm dào dạt sông Tiền',
      waterAmount: '35L/gốc',
      notes: 'Chưa phát hiện rệp mắt bông.',
      fertilizerUsed: 'Kali hữu cơ vi sinh tự ủ',
    });
    alert('Ghi nhật ký canh tác thành công! Điểm uy tín tín dụng nông hộ của bạn đã tăng thêm 1.5đ bảo chứng lộc vàng.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-800">
      
      {/* Page Title & Breadcrumb Block */}
      <div className="text-left space-y-2 border-b border-slate-200 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-black text-2xl md:text-3xl text-emerald-950 tracking-tight flex items-center space-x-2">
            <span>Trung Tâm Điều Hành Thành Viên</span>
            <span className="text-[9px] px-2 py-0.5 bg-green-50 text-green-700 border border-green-200/50 rounded font-mono font-black uppercase">
              PLATFORM VERIFIED ✓
            </span>
          </h1>
          <p className="text-slate-500 font-sans text-xs">
            {userRole === 'nha_vuon' || userRole === 'giao_dien_ngoai' 
              ? `Hệ thống kiểm soát gặt hái, nhật ký bón thuốc và theo dõi dòng tiền bảo chứng của nhà vườn sầu riêng.` 
              : `Bảng quản trị khối lượng bao tiêu, thẩm định cảnh báo chất khô sầu múi và giải ngân dòng tiền ký quỹ mua.`}
          </p>
        </div>

        {/* Dynamic sub navigation controls inside dashboard to separate concern easily */}
        <div className="flex flex-wrap p-1 bg-slate-100 border border-slate-200/60 rounded-xl text-xs font-semibold gap-1">
          <button
            id="tab-overview"
            onClick={() => setActiveTab('thongke')}
            className={`py-1.5 px-3 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'thongke' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Tổng quan & Biểu đồ</span>
          </button>
          
          <button
            id="tab-canhbao"
            onClick={() => setActiveTab('canhbao')}
            className={`py-1.5 px-3 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'canhbao' ? 'bg-white text-rose-800 shadow-xs' : 'text-slate-500 hover:text-slate-805'
            }`}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Canh tác & Dịch bệnh</span>
          </button>

          <button
            id="tab-hopdong"
            onClick={() => setActiveTab('hopdong')}
            className={`py-1.5 px-3 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'hopdong' ? 'bg-white text-indigo-850 shadow-xs text-indigo-900' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Hợp đồng 3 Bên & Cọc Ký Quỹ</span>
          </button>

          <button
            id="tab-ruiro"
            onClick={() => setActiveTab('ruiro')}
            className={`py-1.5 px-3 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'ruiro' ? 'bg-white text-orange-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Kiểm soát Rủi Ro</span>
          </button>

          <button
            id="tab-hoso"
            onClick={() => setActiveTab('hoso')}
            className={`py-1.5 px-3 rounded-lg transition-all flex items-center space-x-1 ${
              activeTab === 'hoso' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Hồ Sơ Cá Nhân</span>
          </button>
        </div>
      </div>

      {/* RENDER VIEW TAB CONTENTS */}
      
      {/* ===================== TAB 1: OVERVIEW & DIAGRAMS ===================== */}
      {activeTab === 'thongke' && (
        <div className="space-y-6 text-left">
          
          {/* Quick Metrics KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider font-sans">Vùng sầu liên kết</span>
              <strong className="text-2xl md:text-3xl text-emerald-950 font-display font-medium block mt-1">
                {userRole === 'doanh_nghiep' ? '415.5 ha' : `${farmerInfo.area} ha`}
              </strong>
              <span className="text-slate-500 text-[10px] mt-1.5 block">
                {userRole === 'doanh_nghiep' ? 'Đã liên kết 18 hợp tác xã lớn' : `Giống sầu: ${farmerInfo.variety} sầu bói`}
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-205">
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider font-sans">Ước lượng chín gặt vụ này</span>
              <strong className="text-2xl md:text-3xl text-emerald-950 font-display font-medium block mt-1">
                {userRole === 'doanh_nghiep' ? '3,890 Tấn' : `${farmerInfo.expectedYield} Tấn`}
              </strong>
              <span className="text-emerald-700 text-[10px] mt-1.5 block font-sans font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Tiến trình đậu múi: 98% chuẩn ráo</span>
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider font-sans">Bảo chứng hạn tín dụng</span>
              <strong className="text-2xl md:text-3xl text-green-700 font-display font-medium block mt-1 flex items-baseline gap-1">
                <span>{userRole === 'doanh_nghiep' ? 'A+' : farmerInfo.creditScore}</span>
                <span className="text-xs text-slate-400">({userRole === 'doanh_nghiep' ? '99' : farmerInfo.creditScoreNumber}đ)</span>
              </strong>
              <span className="text-slate-500 text-[10px] mt-1.5 block">
                Mức uy tín vàng, được giảm 30% cước giao dịch sàn.
              </span>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider font-sans">Nạp bảo chứng Ký Quỹ</span>
              <strong className="text-2xl md:text-2xl text-indigo-900 font-display font-bold block mt-1">
                {userRole === 'doanh_nghiep' ? '12.4 tỷ đ' : '385 triệu đ'}
              </strong>
              <span className="text-slate-500 text-[10px] mt-1.5 block font-sans">
                Được lock đóng băng an toàn tại Escrow Agribank.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Visual SVG Diagram 1: Yield forecasting dải tháng (7 cols) */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-1.5 pb-2 border-b border-slate-108 border-b-slate-100">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <span>Dự báo tiến độ thu hoạch dội mùa Sầu Riêng chín (Tháng 5 - Tháng 11)</span>
                </h4>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed pt-2">
                  Dữ liệu lượng tấn chín rộ dầm dề qua hệ thuật toán tính toán từ ngày dầm xả nhụy bông của Nhà nông Hết Sầu. Thương lái dựa vào đây điều động Logistics xe lạnh, tránh dồn ứ giáp loại khiến sụt giá.
                </p>
              </div>

              {/* Responsive custom-built Bar Chart inside elegant SVG */}
              <div className="py-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3">
                <svg className="w-full max-w-[620px] h-48 text-slate-700" viewBox="0 0 600 200">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="580" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="60" x2="580" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="100" x2="580" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="140" x2="580" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="170" x2="580" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />

                  {/* Bars & Labels */}
                  {/* May */}
                  <rect x="70" y="145" width="28" height="25" rx="3" fill="#10b981" opacity="0.65" />
                  <text x="84" y="185" fontSize="10" textAnchor="middle" fill="#94a3b8" className="font-mono">Tháng 5</text>
                  <text x="84" y="135" fontSize="10" textAnchor="middle" fill="#64748b" className="font-mono">540 T</text>

                  {/* June */}
                  <rect x="140" y="130" width="28" height="40" rx="3" fill="#10b981" opacity="0.75" />
                  <text x="154" y="185" fontSize="10" textAnchor="middle" fill="#94a3b8" className="font-mono">Tháng 6</text>
                  <text x="154" y="120" fontSize="10" textAnchor="middle" fill="#64748b" className="font-mono">870 T</text>

                  {/* July */}
                  <rect x="210" y="90" width="28" height="80" rx="3" fill="#059669" />
                  <text x="224" y="185" fontSize="10" textAnchor="middle" fill="#64748b" className="font-medium">Tháng 7</text>
                  <text x="224" y="80" fontSize="10" textAnchor="middle" fill="#047857" className="font-mono font-bold">1,750 T</text>

                  {/* August */}
                  <rect x="280" y="40" width="28" height="130" rx="3" fill="#047857" />
                  <text x="294" y="185" fontSize="10" textAnchor="middle" fill="#047857" className="font-bold">Tháng 8 (Rộ)</text>
                  <text x="294" y="30" fontSize="10" textAnchor="middle" fill="#064e3b" className="font-mono font-black">2,970 T</text>

                  {/* September */}
                  <rect x="350" y="15" width="28" height="155" rx="3" fill="#b45309" />
                  <text x="364" y="185" fontSize="10" textAnchor="middle" fill="#b45309" className="font-bold">Tháng 9 (Đỉnh)</text>
                  <text x="364" y="10" fontSize="10" textAnchor="middle" fill="#78350f" className="font-mono font-black">3,890 T</text>

                  {/* October */}
                  <rect x="420" y="70" width="28" height="100" rx="3" fill="#059669" opacity="0.8" />
                  <text x="434" y="185" fontSize="10" textAnchor="middle" fill="#94a3b8" className="font-mono">Tháng 10</text>
                  <text x="434" y="60" fontSize="10" textAnchor="middle" fill="#64748b" className="font-mono">2,060 T</text>

                  {/* November */}
                  <rect x="490" y="120" width="28" height="50" rx="3" fill="#10b981" opacity="0.6" />
                  <text x="504" y="185" fontSize="10" textAnchor="middle" fill="#94a3b8" className="font-mono">Tháng 11</text>
                  <text x="504" y="110" fontSize="10" textAnchor="middle" fill="#64748b" className="font-mono">1,000 T</text>
                </svg>
              </div>

              <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-200/50 text-[11px] text-green-900 leading-normal">
                <span>⚠️ <strong>Dự báo sụt sùi dội quả:</strong> Từ ngày 15/08 đến 30/09, vùng Cai Lậy ghi nhận sản lượng Monthong chín chạm dốc kỷ lục. Khuyên nghị các nhà vườn liên kết xuất khẩu nẹp nắp thùng sớm để hưởng sườn giá cọc vàng bảo đảm.</span>
              </div>
            </div>

            {/* Price curves / Reports text summary (4 cols) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-205 flex flex-col justify-between space-y-4">
              <div className="space-y-4 text-left">
                <h4 className="font-display font-semibold text-slate-800 text-sm flex items-center gap-1.5 pb-2 border-b border-b-slate-100">
                  <TrendingUp className="w-5 h-5 text-indigo-650 text-indigo-700" />
                  <span>Chỉ Số Giá Sầu Riêng Chốt Hôm Nay</span>
                </h4>

                <div className="space-y-3 font-sans">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex justify-between items-center">
                    <div>
                      <strong className="text-xs text-indigo-950 block">Sầu riêng Monthong loại A</strong>
                      <span className="text-[10px] text-slate-500">Chuẩn da xanh cơm vàng ráo béo</span>
                    </div>
                    <strong className="text-indigo-900 text-sm font-mono block">95,000 đ/kg</strong>
                  </div>

                  <div className="p-3 bg-green-500/10 border border-emerald-500/20 rounded-xl flex justify-between items-center">
                    <div>
                      <strong className="text-xs text-green-950 block">Sầu riêng Ri6 loại A</strong>
                      <span className="text-[10px] text-slate-500">Gốc bón hữu cơ sông Tiền</span>
                    </div>
                    <strong className="text-green-700 text-sm font-mono block">80,000 đ/kg</strong>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-1.5 leading-relaxed">
                  <span className="font-bold text-slate-800 block text-[11px]">Báo cáo dữ liệu thị trường (VinaFruit):</span>
                  <p className="text-[11px]">
                    Nhu cầu xuất khẩu sang các tỉnh Quảng Tây, Thượng Hải chạm mốc cao điểm. Giá sầu nội địa duy trì biên từ 75,000đ - 110,000đ/kg ngon gai. Áp dụng mô hình <strong>giá sàn bảo hiểm</strong> giúp chặn tuyệt đối lạm phát bẻ cọc thương mại dạt.
                  </p>
                </div>
              </div>

              <div className="p-2.5 border border-indigo-200/60 bg-indigo-500/5 text-xs text-indigo-900 font-sans rounded-xl text-center leading-normal">
                Xem chi tiết <strong>Phòng ngừa Rủi ro</strong> để chơi và áp dụng bộ công thức chia sẻ biên độ giá sàn!
              </div>
            </div>

          </div>

          {/* Connected suppliers matched lists if Exporter views */}
          {userRole === 'doanh_nghiep' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="font-display font-semibold text-slate-900 text-base flex items-center space-x-1.5 pb-2 border-b border-b-slate-100">
                <Building className="w-5 h-5 text-blue-600" />
                <span>Gợi ý nhà vườn đạt chuẩn VietGAP khớp thâu gom</span>
              </h4>

              <div className="space-y-4">
                {MOCK_FARMERS.map((farmer) => (
                  <div key={farmer.id} className="p-4.5 bg-slate-50 rounded-xl border border-slate-150 hover:border-blue-400 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <strong className="text-sm text-slate-900">{farmer.name}</strong>
                        <span className="py-0.5 px-2 bg-green-100 text-green-800 font-bold rounded uppercase text-[9px]">
                          Vòng Sầu {farmer.variety}
                        </span>
                      </div>
                      <p className="text-slate-500">{farmer.address}</p>
                      <div className="pt-1 flex items-center space-x-4 text-slate-650">
                        <span>Diện tích: <strong>{farmer.area} ha</strong></span>
                        <span>Sản lượng dự tính: <strong>{farmer.expectedYield} Tấn sầu</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-5">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-mono">ĐỘ TƯƠNG THÍCH CONTAINER</span>
                        <strong className="text-emerald-700 text-sm font-display block">98% CHUẨN XUẤT KHẨU</strong>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs font-display">
                        {farmer.creditScore}
                      </div>

                      <button 
                        onClick={() => {
                          setActiveTab('hopdong');
                          alert(`Đã khởi tạo nẹp nháp thỏa thuận sấm cọc cho ${farmer.name}. Chào mừng anh/chị ký số!`);
                        }}
                        className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded cursor-pointer"
                      >
                        Soạn lốp cọc ngay
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ===================== TAB 2: CULTIVATION DIARY & REAL TIME BIOLOGICAL WARNINGS ===================== */}
      {activeTab === 'canhbao' && (
        <div className="space-y-8">
          
          {/* Real-time biological warning warnings widget (calculated block) */}
          {(() => {
            const audit = analyzeDiseaseAlerts(farmerInfo);
            const lowScore = audit.biosecurityScore < 70;
            const midScore = audit.biosecurityScore >= 70 && audit.biosecurityScore < 85;

            return (
              <div className="bg-white rounded-2xl border border-rose-100 shadow-xs overflow-hidden text-left font-sans space-y-6">
                
                {/* Header of Warning Block */}
                <div className="bg-gradient-to-r from-red-950 via-rose-900 to-amber-950 px-6 py-4.5 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg leading-tight flex items-center gap-2">
                      <ShieldAlert className="w-5.5 h-5.5 text-yellow-300 animate-pulse" />
                      <span>Trạm Phân Tích & Cảnh Báo Lâm Sàng Sinh Vật Thực Thể</span>
                      <span className="text-[10px] px-2 py-0.5 bg-red-600 text-white font-mono font-black uppercase rounded border border-red-500">
                        IoT LIVE
                      </span>
                    </h3>
                    <p className="text-rose-100/90 text-xs font-sans">
                      Duyệt mẫu tự động nhật kỳ và so chéo vi khuẩn Phytophthora, rệp mắt chùm, và sốc mặn sông mương cho vườn sầu riêng.
                    </p>
                  </div>

                  {/* Manual verify trigger button */}
                  <button 
                    onClick={handleRunDiagnosis}
                    disabled={isAnalyzing}
                    className="py-2 px-4 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 rounded-xl font-bold font-sans transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                    <span>{isAnalyzing ? 'Đang thẩm định tế bào móng...' : 'Quét & Thẩm Định Lại'}</span>
                  </button>
                </div>

                {/* Simulated outbreak buttons from initial panel design */}
                <div className="bg-slate-50 border-y border-slate-150 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
                    <span>Giả lập sự cố sinh học vườn để nhận ngay thuốc bảo vệ thực vật & liều lượng:</span>
                  </span>

                  <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-0">
                    <button
                      onClick={() => setCustomOutbreak('none')}
                      className={`py-1 px-2.5 rounded font-bold border transition-colors ${
                        customOutbreak === 'none' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-5"'
                      }`}
                    >
                      Bình thường
                    </button>
                    <button
                      onClick={() => setCustomOutbreak('nut_than_xi_mu')}
                      className={`py-1 px-2.5 rounded font-bold border text-red-600 border-red-200 hover:bg-red-50 transition-colors ${
                        customOutbreak === 'nut_than_xi_mu' ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' : ''
                      }`}
                    >
                      💥 Xì mủ thân sầu
                    </button>
                    <button
                      onClick={() => setCustomOutbreak('nhen_do')}
                      className={`py-1 px-2.5 rounded font-bold border text-amber-600 border-amber-200 hover:bg-amber-50 transition-colors ${
                        customOutbreak === 'nhen_do' ? 'bg-amber-600 text-white border-amber-600 hover:bg-amber-700' : ''
                      }`}
                    >
                      🕷️ Bão nhện đỏ
                    </button>
                    <button
                      onClick={() => setCustomOutbreak('rep_sap')}
                      className={`py-1 px-2.5 rounded font-bold border text-orange-600 border-orange-200 hover:bg-orange-50 transition-colors ${
                        customOutbreak === 'rep_sap' ? 'bg-orange-600 text-white border-orange-600 hover:bg-orange-700' : ''
                      }`}
                    >
                      🍇 Rệp sáp mắt trái
                    </button>
                  </div>
                </div>

                {/* Warning details and Pesticide Calculators */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                  
                  {/* Bio Security Score layout card -- (4 cols) */}
                  <div className="lg:col-span-4 pr-0 lg:pr-6 border-r border-slate-100 space-y-4">
                    <div className="space-y-1 text-left">
                      <span className="text-slate-450 text-[10px] block font-bold uppercase tracking-wider font-sans">Chỉ Số Sức Khỏe Sinh Ngọc Vườn</span>
                      <div className="flex items-baseline gap-2 pt-1">
                        <strong className={`text-4xl font-display font-black ${
                          lowScore ? 'text-red-600' : midScore ? 'text-yellow-600' : 'text-green-700'
                        }`}>
                          {audit.biosecurityScore}%
                        </strong>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          lowScore ? 'bg-red-100 text-red-700' : midScore ? 'bg-yellow-101 text-yellow-800 bg-yellow-100' : 'bg-green-100 text-green-700'
                        }`}>
                          {lowScore ? 'CẢNH BÁO ĐỎ 🚨' : midScore ? 'SỐC DỊCH TỄ NHẸ ⚠️' : 'AN TOÀN ĐẠT CHUẨN ✨'}
                        </span>
                      </div>
                      
                      {/* Dynamic Color Progress Bar */}
                      <div className="w-full h-2.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            lowScore ? 'bg-red-500' : midScore ? 'bg-yellow-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${audit.biosecurityScore}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200/65 rounded-xl space-y-2 text-[11px] text-slate-600 leading-relaxed text-left">
                      <strong className="text-slate-800 block text-xs">Cơ cấu diệp lục tán sầu:</strong>
                      <p>Vườn sầu riêng {farmerInfo.variety} của chú bồi bón phân hữu cơ đang ở giai đoạn hái chín bói: <strong>{farmerInfo.diary[0]?.stage || 'Nuôi trái non'}</strong>.</p>
                      <p>Khí hậu khu mương khảo sát nhận được: <strong>"{farmerInfo.diary[0]?.weather || 'Nắng ấm dầm dề'}"</strong>.</p>
                      <p>Ưu thế vi sinh Trichoderma đạt mật độ chuẩn, chống nghẹt rễ mặn.</p>
                    </div>

                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-1.5 text-xs text-emerald-900 text-left">
                      <strong className="text-emerald-800 font-bold block flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Mẹo bồi kháng sinh vườn:</span>
                      </strong>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                        <li>Ngưng bồi đạm đọt lá lúc xả bông nhụy.</li>
                        <li>Nhai sới cỏ mương thông rảnh tháo axít.</li>
                        <li>Căng nilon bạt rải móng gốc mùa dông giông.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Risks & Recipes calculation layout -- (8 cols) */}
                  <div className="lg:col-span-8 text-left space-y-4">
                    <div className="flex justify-between items-center border-b border-b-slate-100 pb-2">
                      <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider block">Các ổ nấm sinh vật hại phát hiện ({audit.threats.length})</span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded hover:bg-amber-150 cursor-pointer">
                        Platform Verified 🌿
                      </span>
                    </div>

                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                      {audit.threats.map((t) => (
                        <div key={t.id} className="p-4 bg-slate-50 border border-slate-200 hover:border-red-300 rounded-xl space-y-3 transition-colors text-xs font-sans text-slate-700">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-dashed border-slate-200 pb-2 gap-2">
                            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4 text-red-650 text-red-600" />
                              <span>{t.disease}</span>
                            </h4>
                            <span className="px-2 py-0.5 font-bold font-sans bg-rose-50 text-rose-700 rounded text-[9px]">
                              Mức độ nguy hại: {t.riskLevel}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-500 leading-normal">
                            <strong>Đặc tính phát tác:</strong> {t.summary}
                          </p>

                          <div className="bg-white p-3 rounded-lg border border-slate-150 text-[11px] space-y-2">
                            <p className="text-slate-750">
                              <strong className="text-red-700 block mb-0.5">🛠️ Phác đồ can thiệp bảo dưỡng khẩn:</strong>
                              {t.remedy}
                            </p>

                            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-emerald-500/5 p-2 rounded">
                              <div>
                                <span className="text-emerald-800 block text-[9px] font-bold">🌿 Loại thuốc khuyên dùng:</span>
                                <span className="font-bold text-slate-800">{t.pesticide}</span>
                              </div>
                              <div className="sm:text-right bg-emerald-500/10 border border-emerald-500/20 py-1 px-2 rounded-lg">
                                <span className="text-slate-500 block text-[9px]">Liều lượng bồi ({farmerInfo.area} ha):</span>
                                <strong className="text-emerald-700 text-xs font-mono font-bold leading-none">{t.quantity}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            );
          })()}

          {/* Cultivation diary input form & Historial rows of grower */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Garden spec sheet left -- (4 cols) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 text-left space-y-5">
              <h4 className="font-display font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center space-x-1.5">
                <Sprout className="w-5 h-5 text-green-600" />
                <span>Chi tiết nông hộ vườn sầu</span>
              </h4>

              <div className="space-y-4 text-xs font-sans text-slate-650">
                <div className="flex items-center space-x-3">
                  <img
                    src={farmerInfo.avatar}
                    alt={farmerInfo.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200" 
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">{farmerInfo.name}</h5>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Định vị số hóa chính ngạch</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                  <p>Hạt giống chính: <strong>Sầu riêng {farmerInfo.variety}</strong></p>
                  <p>Quy mô thâm canh: <strong>{farmerInfo.area} Héc-ta</strong></p>
                  <p>Sản lượng dự kiến chín gặt: <strong>{farmerInfo.expectedYield} Tấn chuẩn</strong></p>
                  <p>Địa hạt: <strong>{farmerInfo.address}</strong></p>
                </div>

                <div className="flex items-center space-x-2.5 bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-green-900 font-sans">
                  <BadgeCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[10px] block">MÃ SỐ VÙNG TRỒNG ĐÃ ĐỊNH DANH</span>
                    <p className="text-[9px] leading-snug text-green-700">Đã liên kết mã số ID nông tỉnh Cai Lậy xuất chính ngạch hải quan Trung Quốc.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Diary logs list matching right -- (8 cols) */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 text-left space-y-6">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h4 className="font-display font-semibold text-slate-900 text-base flex items-center space-x-1.5 font-sans">
                  <FolderGit className="w-5 h-5 text-emerald-600 font-bold" />
                  <span>Sổ điện tử nhật ký chăm sầu riêng sạch</span>
                </h4>
                
                <button
                  id="open-diary-input-btn"
                  onClick={() => setShowAddDiary(!showAddDiary)}
                  className="py-1.5 px-3 bg-green-700 hover:bg-green-850 text-white rounded-lg text-xs font-bold font-sans flex items-center cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1.5 font-bold" />
                  <span>{showAddDiary ? 'Hủy' : 'Ghi chép nhật ký'}</span>
                </button>
              </div>

              {/* Add diary entry form overlay */}
              {showAddDiary && (
                <form onSubmit={handleAddDiary} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-sans grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
                  <div className="sm:col-span-2 border-b border-slate-200 pb-1">
                    <span className="font-bold text-green-800 text-[10px] uppercase tracking-wider">Cập nhật nhật canh tác hôm nay</span>
                  </div>

                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Giai đoạn sầu hiện thời</label>
                    <select
                      value={newDiary.stage}
                      onChange={(e) => setNewDiary({ ...newDiary, stage: e.target.value as any })}
                      className="w-full p-2 bg-white border border-slate-300 rounded font-sans"
                    >
                      <option value="Xả nhụy">Giai đoạn Xả nhụy thụ phấn</option>
                      <option value="Nuôi trái non">Giai đoạn Nuôi trái non đắp mâm</option>
                      <option value="Chuẩn bị thu hoạch">Giai đoạn Chuẩn bị chín hái bói</option>
                      <option value="Phục hồi cây">Giai đoạn Phục hồi cành sau gặt</option>
                      <option value="Chăm sóc thường">Chăm sóc định kỳ dinh dưỡng</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Thời tiết thực trạng</label>
                    <input 
                      type="text" 
                      value={newDiary.weather}
                      onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Lượng nước cấp (lít/gốc)</label>
                    <input 
                      type="text" 
                      value={newDiary.waterAmount}
                      onChange={(e) => setNewDiary({ ...newDiary, waterAmount: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Phân bón bổ dưỡng vi lượng (nếu có)</label>
                    <input 
                      type="text" 
                      value={newDiary.fertilizerUsed}
                      onChange={(e) => setNewDiary({ ...newDiary, fertilizerUsed: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded"
                      placeholder="Bộ rải Kali hữu sinh học..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-500 block font-semibold mb-1">Nội dung công việc dầm vườn đã lập</label>
                    <textarea
                      value={newDiary.workDone}
                      onChange={(e) => setNewDiary({ ...newDiary, workDone: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded h-16"
                      placeholder="Rung nhụy thụ hoa, sạt đào mương mán..."
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-500 block font-semibold mb-1">Ghi mầm mống sâu mốc mương</label>
                    <input 
                      type="text" 
                      value={newDiary.notes}
                      onChange={(e) => setNewDiary({ ...newDiary, notes: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      id="save-diary-entry-form-btn"
                      type="submit"
                      className="py-1.5 px-4 bg-green-700 text-white font-bold rounded shadow cursor-pointer text-xs uppercase"
                    >
                      Duyệt Ghi Nhật Ký
                    </button>
                  </div>
                </form>
              )}

              {/* General list */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 text-slate-800">
                {farmerInfo.diary.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs font-sans text-left space-y-2 hover:shadow-xs transition-shadow">
                    <div className="flex items-center space-x-2 text-slate-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{log.date}</span>
                      <span className="py-0.5 px-2 bg-green-150 bg-green-100 text-emerald-800 rounded font-bold uppercase text-[9px]">
                        {log.stage}
                      </span>
                      <span>- Nước tưới: {log.waterAmount}</span>
                    </div>
                    <p className="text-slate-750 text-slate-800 font-medium leading-relaxed">{log.workDone}</p>
                    
                    {log.fertilizerUsed && (
                      <p className="text-[11px] text-emerald-700 font-semibold font-sans">
                        🌱 <strong>Bón rải:</strong> {log.fertilizerUsed}
                      </p>
                    )}
                    {log.notes && (
                      <p className="text-[11px] text-slate-400 italic">
                        Thăm khám dột: "{log.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ===================== TAB 3: THREE PARTY AGREEMENT & ESCROW VAULT ===================== */}
      {activeTab === 'hopdong' && (
        <div className="space-y-6">
          <TripartiteContractVault userRole={userRole} />
        </div>
      )}

      {/* ===================== TAB 4: OPERATIONAL RISK PREVENTION MANUAL ===================== */}
      {activeTab === 'ruiro' && (
        <div className="space-y-6">
          <RiskMitigationConsole 
            farmerInfo={farmerInfo} 
            expectedYield={farmerInfo.expectedYield} 
            area={farmerInfo.area} 
            variety={farmerInfo.variety} 
          />
        </div>
      )}

      {/* ===================== TAB 5: EDIT PROFILE SYSTEM ===================== */}
      {activeTab === 'hoso' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left items-start font-sans">
          
          {/* Farmer profile modify card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-b-slate-100 pb-3">
              <h4 className="font-display font-bold text-slate-900 text-base flex items-center space-x-2">
                <Sprout className="w-5 h-5 text-green-700" />
                <span>Thiết lập thuộc tính nhà vườn sầu riêng</span>
              </h4>
              
              {!isEditingFarmer && (
                <button
                  id="btn-edit-farmer-prof"
                  onClick={() => setIsEditingFarmer(true)}
                  className="py-1 px-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded text-xs font-bold border border-slate-200 transition-colors"
                >
                  Sửa hồ sơ
                </button>
              )}
            </div>

            {isEditingFarmer ? (
              <form onSubmit={handleSaveFarmer} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-500 block font-semibold mb-1">Tên nhà nông đại diện</label>
                  <input 
                    type="text" 
                    value={farmerInfo.name}
                    onChange={(e) => setFarmerInfo({ ...farmerInfo, name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-green-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Giống sầu trồng tốt</label>
                    <select
                      value={farmerInfo.variety}
                      onChange={(e) => setFarmerInfo({ ...farmerInfo, variety: e.target.value as any })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-805 text-slate-800"
                    >
                      <option value="Ri6">Ri6</option>
                      <option value="Monthong">Monthong</option>
                      <option value="Chuồng Bò">Chuồng Bò</option>
                      <option value="Musang King">Musang King</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Quy mô đo lường (ha)</label>
                    <input 
                      type="number" 
                      value={farmerInfo.area}
                      onChange={(e) => setFarmerInfo({ ...farmerInfo, area: Number(e.target.value) })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Tấn dự sinh vụ quả</label>
                    <input 
                      type="number" 
                      value={farmerInfo.expectedYield}
                      onChange={(e) => setFarmerInfo({ ...farmerInfo, expectedYield: Number(e.target.value) })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Khoảng tháng gặt vụ sầu</label>
                    <input 
                      type="text" 
                      value={farmerInfo.harvestTime}
                      onChange={(e) => setFarmerInfo({ ...farmerInfo, harvestTime: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 block font-semibold mb-1">Địa danh vùng mương</label>
                  <input 
                    type="text" 
                    value={farmerInfo.address}
                    onChange={(e) => setFarmerInfo({ ...farmerInfo, address: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setIsEditingFarmer(false)}
                    className="py-1 px-3 rounded bg-slate-100 text-slate-500 font-bold"
                  >
                    Bỏ qua
                  </button>
                  <button 
                    id="save-farmer-settings-btn"
                    type="submit" 
                    className="py-1 px-4.5 rounded bg-green-700 text-white font-bold flex items-center space-x-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu thiết lập</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 font-sans text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p>Nông gia đại diện: <strong>{farmerInfo.name}</strong></p>
                <p>Địa vực sầu mẫu: <strong>{farmerInfo.address}</strong></p>
                <p>Giống sầu canh tác: <strong>Sầu riêng giống {farmerInfo.variety}</strong></p>
                <p>Khai đo mật độ: <strong>{farmerInfo.area} ha / Sản sản lượng: {farmerInfo.expectedYield} Tấn chín</strong></p>
                <span className="text-[10px] text-slate-400 block italic pt-1 border-t border-slate-200">* Dữ liệu này trực tiếp mã hoá vào định danh bán kính hệ bản đồ số nguồn sầu.</span>
              </div>
            )}
          </div>

          {/* Enterprise profile modify card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 text-slate-800">
            <div className="flex justify-between items-center border-b border-b-slate-100 pb-3">
              <h4 className="font-display font-bold text-slate-900 text-base flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-700" />
                <span>Thiết lập tư cách doanh nghiệp xu mua lớn</span>
              </h4>

              {!isEditingEnterprise && (
                <button
                  id="btn-edit-enterprise-prof"
                  onClick={() => setIsEditingEnterprise(true)}
                  className="py-1 px-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded text-xs font-bold border border-slate-200 transition-colors"
                >
                  Sửa hồ sơ mua
                </button>
              )}
            </div>

            {isEditingEnterprise ? (
              <form onSubmit={handleSaveEnterprise} className="space-y-4 text-xs text-slate-700">
                <div>
                  <label className="text-slate-500 block font-semibold mb-1">Tên pháp thể doanh nghiệp xuất</label>
                  <input 
                    type="text" 
                    value={enterpriseInfo.name}
                    onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, name: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Người đại diện pháp lý</label>
                    <input 
                      type="text" 
                      value={enterpriseInfo.representative}
                      onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, representative: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 block font-semibold mb-1">Tổng tấn nhu cầu năm</label>
                    <input 
                      type="number" 
                      value={enterpriseInfo.demandVolume}
                      onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, demandVolume: Number(e.target.value) })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 block font-semibold mb-1">Trụ sở nẹp thu hái</label>
                  <input 
                    type="text" 
                    value={enterpriseInfo.address}
                    onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, address: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setIsEditingEnterprise(false)}
                    className="py-1 px-3 rounded bg-slate-100 text-slate-550 text-slate-500 font-bold"
                  >
                    Bỏ qua
                  </button>
                  <button 
                    id="save-enterprise-settings-btn"
                    type="submit" 
                    className="py-1 px-4.5 rounded bg-blue-700 text-white font-bold flex items-center space-x-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Lưu bao tiêu</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 font-sans text-xs text-slate-750 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p>Khách buôn: <strong>{enterpriseInfo.name}</strong></p>
                <p>Trụ sở chính: <strong>{enterpriseInfo.address}</strong></p>
                <p>Liên tục thu mua: <strong>{enterpriseInfo.demandVolume} Tấn sầu Monthong/Ri6 hàng chín bói</strong></p>
                <span className="text-[10px] text-slate-400 block italic pt-1 border-t border-slate-200">* Đối tác tín bảo Agribank, đã ký quỹ đảm bảo đặt đặt cọc.</span>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
