import React, { useState, useMemo } from 'react';
import { ShoppingCart, Handshake, FileSymlink, Sparkles, AlertCircle, RefreshCw, Send, CheckCircle, Star, Scale, ShieldAlert, BadgeCheck, FileText, Lock, Check, Loader2 } from 'lucide-react';
import { MOCK_FARMERS, MOCK_ENTERPRISES, MOCK_TRANSACTIONS } from '../data';
import { FarmerProfile, EnterpriseProfile, DirectConnection } from '../types';

interface MarketplaceProps {
  userRole: 'giao_dien_ngoai' | 'nha_vuon' | 'doanh_nghiep';
  initiatedFarmerSelection: FarmerProfile | null;
  clearInitiatedFarmerSelection: () => void;
}

export default function Marketplace({ userRole, initiatedFarmerSelection, clearInitiatedFarmerSelection }: MarketplaceProps) {
  // Active Mode: 'board' (Sàn) | 'enterprises' (Doanh nghiệp đăng ký) | 'connections' (Luồng kết nối của tôi)
  const [activeSubMode, setActiveSubMode] = useState<'board' | 'enterprises' | 'connections'>('board');

  // Directory Search and filters
  const [entSearch, setEntSearch] = useState('');
  const [entCertFilter, setEntCertFilter] = useState('all');
  const [selectedDetailEnt, setSelectedDetailEnt] = useState<any | null>(null);
  const [proposedEnt, setProposedEnt] = useState<any | null>(null);

  // Proposal form inputs
  const [propVariety, setPropVariety] = useState('Ri6');
  const [propVolume, setPropVolume] = useState(10);
  const [propPrice, setPropPrice] = useState(72000);
  const [propDate, setPropDate] = useState('2026-07-20');

  // --- 1. SÀN PHÍA NÔNG DÂN & DOANH NGHIỆP ---
  // List of Sell Offerings by Farmers
  const [sellOfferings, setSellOfferings] = useState([
    { id: 'off1', farmerName: 'Vườn sầu riêng Chú Sáu Đức', variety: 'Ri6', volume: 20, price: 72000, date: '2026-06-25', cert: 'VietGAP', matchesCount: 2 },
    { id: 'off2', farmerName: 'Hợp tác xã sầu riêng Tam Bình', variety: 'Monthong', volume: 60, price: 92000, date: '2026-07-10', cert: 'GlobalGAP', matchesCount: 3 },
    { id: 'off3', farmerName: 'Nhà vườn Cô Tư Lê', variety: 'Ri6', volume: 15, price: 68000, date: '2026-06-30', cert: 'VietGAP', matchesCount: 1 }
  ]);

  // List of Buy Wants by Enterprises
  const [buyDemands, setBuyDemands] = useState([
    { id: 'dem1', enterpriseName: 'Tập đoàn VinaFruit', variety: 'Monthong', volume: 100, targetPrice: 95000, targetCert: 'VietGAP', sourceLoc: 'Tiền Giang' },
    { id: 'dem2', enterpriseName: 'Công ty Xuất Nhập Khẩu MekongX', variety: 'Ri6', volume: 150, targetPrice: 75000, targetCert: 'Mã số vùng trồng', sourceLoc: 'Vĩnh Long' },
    { id: 'dem3', enterpriseName: 'Logistics Toàn Cầu An Bình', variety: 'Chuồng Bò', volume: 40, targetPrice: 85000, targetCert: 'VietGAP', sourceLoc: 'Bến Tre' }
  ]);

  // Posting States
  const [newSell, setNewSell] = useState({ variety: 'Ri6', volume: 10, price: 70000, date: '2026-06-25', cert: 'VietGAP' });
  const [newBuy, setNewBuy] = useState({ variety: 'Monthong', volume: 50, targetPrice: 90000, targetCert: 'GlobalGAP', sourceLoc: 'Tiền Giang' });
  const [showPostingForm, setShowPostingForm] = useState(false);

  // --- 2. LUỒNG KẾT NỐI & THƯƠNG LƯỢNG KÝ HỢP ĐỒNG ---
  // Connections Database
  const [connections, setConnections] = useState<DirectConnection[]>([
    {
      id: 'conn1',
      farmerId: 'f1',
      farmerName: 'Vườn sầu riêng Chú Sáu Đức',
      enterpriseId: 'e2',
      enterpriseName: 'Công ty Xuất Nhập Khẩu MekongX',
      productName: 'Sầu riêng Ri6',
      volume: 12,
      priceOffer: 74000,
      stage: 'Đang vận chuyển',
      proposedDeliveryDate: '2026-06-15',
      notes: 'Bọc tơi xơ, thu hái chín bói.',
      contractSignedByFarmer: true,
      contractSignedByEnterprise: true,
      contractHash: 'SHA256-4b82d49c8f93e3e007d9f7e8b820a3ff',
    },
    {
      id: 'conn2',
      farmerId: 'f3',
      farmerName: 'Vườn sầu riêng Bảy Thạnh',
      enterpriseId: 'e1',
      enterpriseName: 'Tập đoàn VinaFruit',
      productName: 'Sầu riêng Chuồng Bò',
      volume: 4,
      priceOffer: 82000,
      stage: 'Đang thương lượng',
      proposedDeliveryDate: '2026-06-22',
      notes: 'Giao tại vựa nẹp Chợ Lách.',
      contractSignedByFarmer: false,
      contractSignedByEnterprise: false,
    }
  ]);

  // Selected Connection for negotiation window
  const [selectedConnId, setSelectedConnId] = useState<string>('conn1');
  const activeConn = useMemo(() => {
    return connections.find(c => c.id === selectedConnId) || connections[0];
  }, [connections, selectedConnId]);

  // Negotiation temporary offers
  const [negoVolume, setNegoVolume] = useState<number>(10);
  const [negoPrice, setNegoPrice] = useState<number>(75000);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatLogs, setChatLogs] = useState<Array<{ sender: string, text: string, time: string }>>([
    { sender: 'Doanh nghiệp', text: 'Chào Chú Sáu Đức, vườn sầu riêng nhà chú búp vỏ tròn đầy cơm dẻo tốt quá. Bên con muốn đặt cọc 12 tấn.', time: '09:12' },
    { sender: 'Nông dân', text: 'Chào con gái, sầu nhà Chú làm theo chuẩn hữu cơ vi sinh không sượng dạt, giá 74,000 là Chú gật liền.', time: '09:14' }
  ]);

  // Rating input state
  const [submitRating, setSubmitRating] = useState<number>(5);
  const [submitFeedback, setSubmitFeedback] = useState<string>('Thực hiện đúng hạn, cơm sầu béo ráo tuyệt vời.');

  // States for Checkout/Payment Gateway simulation
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'methods' | 'qr_scanning' | 'processing' | 'success'>('methods');
  const [paymentMethod, setPaymentMethod] = useState<'vietqr' | 'momo' | 'card'>('vietqr');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  const [transactionsPaid, setTransactionsPaid] = useState<Record<string, { type: 'deposit' | 'full', paidAt: string, totalAmount: number }>>({
    'conn1': { type: 'full', paidAt: '2026-06-05 10:15', totalAmount: 888000000 }
  });

  const handleVerifySimulatorPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setTransactionsPaid(prev => ({
        ...prev,
        [activeConn.id]: {
          type: paymentType,
          paidAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          totalAmount: paymentType === 'deposit' 
            ? (activeConn.volume * 1000 * activeConn.priceOffer * 0.3)
            : (activeConn.volume * 1000 * activeConn.priceOffer)
        }
      }));
      setPaymentStep('success');
      
      // Update the connection stage automatically
      setConnections(prev => prev.map(c => {
        if (c.id === activeConn.id) {
          // If signed and paid deposit/full, advance the workflow
          return {
            ...c,
            stage: paymentType === 'deposit' ? 'Đã ký hợp đồng' : 'Đang vận chuyển'
          };
        }
        return c;
      }));
    }, 1500);
  };

  // If a user clicked "Gửi kết nối" on the Map Page, handle immediate connection creation
  React.useEffect(() => {
    if (initiatedFarmerSelection) {
      // Create active new contact connection
      const newConnId = `conn_init_${Date.now()}`;
      const newConn: DirectConnection = {
        id: newConnId,
        farmerId: initiatedFarmerSelection.id,
        farmerName: initiatedFarmerSelection.name,
        enterpriseId: 'e1', // Default simulation role context: VinaFruit
        enterpriseName: 'Tập đoàn VinaFruit',
        productName: `Sầu riêng ${initiatedFarmerSelection.variety}`,
        volume: initiatedFarmerSelection.expectedYield / 2, // suggest half
        priceOffer: 85000, // suggest middle
        stage: 'Yêu cầu mới',
        proposedDeliveryDate: '2026-07-20',
        notes: 'Khởi tạo trực tiếp từ bản đồ số nguồn sầu.',
        contractSignedByFarmer: false,
        contractSignedByEnterprise: false,
      };

      setConnections(prev => [newConn, ...prev]);
      setSelectedConnId(newConnId);
      setActiveSubMode('connections');
      clearInitiatedFarmerSelection();
    }
  }, [initiatedFarmerSelection]);

  // Post Submission For Farmer
  const handleFarmerPost = (e: React.FormEvent) => {
    e.preventDefault();
    const newOffer = {
      id: `off_${Date.now()}`,
      farmerName: userRole === 'nha_vuon' ? 'Vườn của tôi' : 'Hộ Nông Dân Số Mới',
      variety: newSell.variety,
      volume: Number(newSell.volume),
      price: Number(newSell.price),
      date: newSell.date,
      cert: newSell.cert,
      matchesCount: 1
    };
    setSellOfferings([newOffer, ...sellOfferings]);
    setShowPostingForm(false);
    alert('Đăng tin chào bán sầu riêng thành công! Hệ thống đang tự động lọc khách buôn khớp lệnh.');
  };

  // Post Submission For Enterprise
  const handleEnterprisePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newDemand = {
      id: `dem_${Date.now()}`,
      enterpriseName: userRole === 'doanh_nghiep' ? 'Doanh nghiệp của tôi' : 'Tập Đoàn Xuất Khẩu Mới',
      variety: newBuy.variety,
      volume: Number(newBuy.volume),
      targetPrice: Number(newBuy.targetPrice),
      targetCert: newBuy.targetCert,
      sourceLoc: newBuy.sourceLoc
    };
    setBuyDemands([newDemand, ...buyDemands]);
    setShowPostingForm(false);
    alert('Đăng nhu cầu thu mua thành công! Hệ thống đang so ghép các nhà vườn thích ứng.');
  };

  // Automated Smart Matchmaking Score calculation for sầu riêng
  const calculateMatchScore = (farmerVariety: string, farmerCert: string, buyerVariety: string, buyerCert: string) => {
    let score = 50; // base score
    if (farmerVariety === buyerVariety) score += 30;
    if (farmerCert === buyerCert || farmerCert === 'GlobalGAP') score += 20;
    return score;
  };

  // Submit negotiation offer
  const updateNegoTerms = () => {
    setConnections(prev => prev.map(c => {
      if (c.id === activeConn.id) {
        return {
          ...c,
          volume: negoVolume,
          priceOffer: negoPrice,
          stage: 'Đang thương lượng'
        };
      }
      return c;
    }));
    setChatLogs(prev => [...prev, {
      sender: userRole === 'nha_vuon' ? 'Nông dân (Chú)' : 'Doanh nghiệp (Cửa)',
      text: `Đề xuất lại: số lượng ${negoVolume} tấn, đơn giá ${negoPrice.toLocaleString('vi-VN')} VND/kg.`,
      time: 'Vừa xong'
    }]);
  };

  // Submit chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatLogs(prev => [...prev, {
      sender: userRole === 'nha_vuon' ? 'Nông dân (Tôi)' : 'Doanh nghiệp (Tôi)',
      text: chatMessage,
      time: 'Bây giờ'
    }]);
    setChatMessage('');
  };

  // Sign Digital Contract with Fake cryptographic SHA256 simulation
  const handleSignContract = () => {
    setConnections(prev => prev.map(c => {
      if (c.id === activeConn.id) {
        const signFarmer = userRole === 'nha_vuon' ? true : c.contractSignedByFarmer;
        const signEnterprise = userRole === 'doanh_nghiep' ? true : c.contractSignedByEnterprise;
        const hash = `SHA256-hash_${Math.random().toString(36).substring(2, 10)}${Date.now()}`;
        const isBothSigned = signFarmer && signEnterprise;

        return {
          ...c,
          contractSignedByFarmer: signFarmer,
          contractSignedByEnterprise: signEnterprise,
          contractHash: isBothSigned ? hash : c.contractHash,
          stage: isBothSigned ? 'Đang vận chuyển' : 'Đang soạn hợp đồng'
        };
      }
      return c;
    }));
    alert('Hợp đồng điện tử đã được ký tay thành công! Hồ sơ giao kết mầm mống lưu trữ vẹn mật.');
  };

  // Advance transit to completed
  const handleConfirmFreight = () => {
    setConnections(prev => prev.map(c => {
      if (c.id === activeConn.id) {
        return {
          ...c,
          stage: 'Hoàn thành'
        };
      }
      return c;
    }));
  };

  // Submit evaluation metrics
  const handlePostReview = () => {
    setConnections(prev => prev.map(c => {
      if (c.id === activeConn.id) {
        return {
          ...c,
          stage: 'Đã đánh giá',
          ratingToFarmer: submitRating,
          reviewToFarmer: submitFeedback
        };
      }
      return c;
    }));
    alert('Gửi đánh giá dịch vụ và cho điểm Credit Scoring cho đối tác thành công!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-800">
      {/* Platform Title */}
      <div className="text-left space-y-2 border-b border-slate-200 pb-5 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="font-display font-bold text-3xl text-green-900 tracking-tight">
            Sàn Giao Dịch Thông Tin & Mua Bán Số
          </h1>
          <p className="text-slate-600 font-sans text-sm">
            Hệ thống mua bán chi tiết ròng rã, liên kết chặt chẽ ba bên: Chủ nông hộ vườn sầu riêng, Doanh nghiệp xuất khẩu lớn và Vựa thương lái thu mua gom địa phương.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex border border-slate-200 p-1 bg-slate-50 rounded-xl mt-3 md:mt-0 font-sans overflow-x-auto">
          <button
            id="sub-mode-board"
            onClick={() => setActiveSubMode('board')}
            className={`py-2 px-4 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeSubMode === 'board' ? 'bg-white text-green-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-green-600" />
            <span>Sàn Mua Bán Sầu Riêng Chi Tiết</span>
          </button>
          <button
            id="sub-mode-enterprises"
            onClick={() => setActiveSubMode('enterprises')}
            className={`py-2 px-4 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeSubMode === 'enterprises' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BadgeCheck className="w-4.5 h-4.5 text-blue-505" style={{ color: '#2563eb' }} />
            <span>Danh Sách Doanh Nghiệp Đăng Ký</span>
          </button>
          <button
            id="sub-mode-connections"
            onClick={() => setActiveSubMode('connections')}
            className={`py-2 px-4 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
              activeSubMode === 'connections' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Handshake className="w-4 h-4 text-emerald-600" />
            <span>Tiến Trình Thương Lượng & Hợp Đồng ({connections.length})</span>
          </button>
        </div>
      </div>

      {activeSubMode === 'board' ? (
        /* --- BLOCK 1: CHỢ GIAO DỊCH SẦU RIÊNG --- */
        <div className="space-y-6">
          {/* Slogan Banner */}
          <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 p-6 rounded-2xl text-white text-left flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] bg-green-500/20 text-green-300 font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-green-500/30">Hỗ trợ giao kết số</span>
              <h3 className="font-display font-bold text-lg">Mở Cánh Cổng Thông Thương Không Trung Gian</h3>
              <p className="text-xs text-green-100 max-w-2xl leading-relaxed">
                Nông dân đăng tin bán sầu chín với giá mong đợi kèm nhật ký chăm sóc. Doanh nghiệp đăng nhu cầu thâu mua, chuẩn loại VietGap, hệ thống tự động so khớp độ tương thích lên đến 98%.
              </p>
            </div>
            <button
              id="open-post-form-btn"
              onClick={() => setShowPostingForm(!showPostingForm)}
              className="px-5 py-3 rounded-xl bg-white text-green-800 hover:bg-green-50 text-xs font-bold transition-all shadow-sm flex items-center space-x-1 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 animate-bounce" />
              <span>{showPostingForm ? 'Đóng form đăng' : 'Đăng tin mới của bạn'}</span>
            </button>
          </div>

          {/* Posting Forms Overlay-In-Place */}
          {showPostingForm && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-4 max-w-2xl mx-auto">
              <h3 className="font-display font-semibold text-slate-800 text-base">
                📝 Đăng Tin Mới Lên Chợ Giao Lệnh
              </h3>

              {userRole === 'nha_vuon' || userRole === 'giao_dien_ngoai' ? (
                /* Farmer post form */
                <form onSubmit={handleFarmerPost} className="space-y-3 text-xs font-sans">
                  <span className="font-bold text-green-700 block pb-1">DÀNH CHO NÔNG DÂN: RAO BÁN SẦU</span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-500 font-semibold block mb-1">Giống sầu riêng rao bán</label>
                      <select
                        value={newSell.variety}
                        onChange={(e) => setNewSell({ ...newSell, variety: e.target.value })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200"
                      >
                        <option value="Ri6">Ri6</option>
                        <option value="Monthong">Monthong (Dona)</option>
                        <option value="Chuồng Bò">Chuồng Bò</option>
                        <option value="Musang King">Musang King</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-500 font-semibold block mb-1">Chứng nhận hiện tại</label>
                      <select
                        value={newSell.cert}
                        onChange={(e) => setNewSell({ ...newSell, cert: e.target.value })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200"
                      >
                        <option value="VietGAP">VietGAP chuẩn</option>
                        <option value="GlobalGAP">GlobalGAP xuất khẩu</option>
                        <option value="Mã số vùng trồng">Mã số vùng trồng đơn lẻ</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-500 font-semibold block mb-1">Tổng sản lượng sẵn có (Tấn)</label>
                      <input
                        type="number"
                        value={newSell.volume}
                        onChange={(e) => setNewSell({ ...newSell, volume: Number(e.target.value) })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 font-semibold block mb-1">Giá kỳ vọng (VND/kg)</label>
                      <input
                        type="number"
                        value={newSell.price}
                        onChange={(e) => setNewSell({ ...newSell, price: Number(e.target.value) })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200"
                        min="10000"
                        step="1000"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      id="submit-farmer-sell-btn"
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-green-700 text-white font-bold"
                    >
                      Xác nhận đăng tin bán
                    </button>
                  </div>
                </form>
              ) : (
                /* Enterprise post form */
                <form onSubmit={handleEnterprisePost} className="space-y-3 text-xs font-sans">
                  <span className="font-bold text-blue-700 block pb-1">DÀNH CHO DOANH NGHIỆP: NHU CẦU THU MUA</span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-500 font-semibold block mb-1">Giống sầu đặt mua</label>
                      <select
                        value={newBuy.variety}
                        onChange={(e) => setNewBuy({ ...newBuy, variety: e.target.value })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200"
                      >
                        <option value="Monthong">Monthong (Dona)</option>
                        <option value="Ri6">Ri6</option>
                        <option value="Chuồng Bò">Chuồng Bò</option>
                        <option value="Musang King">Musang King</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-500 font-semibold block mb-1">Chứng nhận bắt buộc</label>
                      <select
                        value={newBuy.targetCert}
                        onChange={(e) => setNewBuy({ ...newBuy, targetCert: e.target.value })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200"
                      >
                        <option value="GlobalGAP">GlobalGAP nghiêm phẩm</option>
                        <option value="VietGAP">VietGAP tơi dẻo</option>
                        <option value="Mã số vùng trồng">Có mã số vùng trồng</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-500 font-semibold block mb-1">Khối lượng mua mong muốn (Tấn)</label>
                      <input
                        type="number"
                        value={newBuy.volume}
                        onChange={(e) => setNewBuy({ ...newBuy, volume: Number(e.target.value) })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 font-semibold block mb-1">Giá thu mua dự kiến (VND/kg)</label>
                      <input
                        type="number"
                        value={newBuy.targetPrice}
                        onChange={(e) => setNewBuy({ ...newBuy, targetPrice: Number(e.target.value) })}
                        className="w-full p-2 bg-white rounded-lg border border-slate-200"
                        min="10000"
                        step="1000"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      id="submit-enterprise-buy-btn"
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-700 text-white font-bold"
                    >
                      Đăng nhu cầu mua hàng
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Sàn Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            {/* Left side column: Listings proposed by Farmers (Bà con chào bán) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-display font-medium text-lg text-slate-800 flex items-center space-x-1.5 border-b border-slate-100 pb-3">
                <span className="p-1 px-2.5 bg-green-100 text-green-700 font-bold rounded-lg text-xs mr-2">CUNG</span>
                <span>Hộ Nông Dân Chào Bán Sầu Riêng Chín Vườn</span>
              </h3>

              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {sellOfferings.map((offer) => (
                  <div key={offer.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 border-l-4 border-l-green-600 hover:shadow-xs transition-shadow space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-slate-800 font-sans">{offer.farmerName}</h4>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 font-sans">
                          <span>Sản lượng: <strong className="text-slate-800">{offer.volume} tấn</strong></span>
                          <span>- Giống: <strong className="text-green-700">{offer.variety}</strong></span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 border border-green-200 rounded font-bold uppercase font-mono">
                        {offer.cert}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-150 font-sans">
                      <span className="text-slate-500">Giá đề nghị: <strong className="text-green-700 text-sm font-display">{offer.price.toLocaleString('vi-VN')} VND/kg</strong></span>
                      <span className="text-slate-400 font-medium">Cắt thu: {offer.date}</span>
                    </div>

                    {/* Simulation Connect Button */}
                    <div className="flex justify-end pt-1">
                      <button
                        id={`request-connect-listing-${offer.id}`}
                        onClick={() => {
                          // Find mock farmer profile matching
                          const targetPro = MOCK_FARMERS.find(f => f.name.includes(offer.farmerName.split(' ')[0])) || MOCK_FARMERS[0];
                          const newConn: DirectConnection = {
                            id: `conn_board_${Date.now()}`,
                            farmerId: targetPro.id,
                            farmerName: targetPro.name,
                            enterpriseId: 'e1',
                            enterpriseName: 'Tập đoàn VinaFruit',
                            productName: `Sầu riêng ${offer.variety}`,
                            volume: offer.volume,
                            priceOffer: offer.price,
                            stage: 'Yêu cầu mới',
                            proposedDeliveryDate: offer.date,
                            notes: 'Khởi tạo từ sạp Chợ Chào Bán.',
                            contractSignedByFarmer: false,
                            contractSignedByEnterprise: false,
                          };
                          setConnections(prev => [newConn, ...prev]);
                          setSelectedConnId(newConn.id);
                          setActiveSubMode('connections');
                          alert('Đã gửi yêu cầu kết nối đến nhà vườn! Vui lòng chuyển sang tab Tiến trình để thương thảo tiếp.');
                        }}
                        className="py-1.5 px-3.5 bg-green-700 hover:bg-green-800 text-white font-bold text-[10px] rounded-lg transition-transform hover:scale-102 flex items-center space-x-1 cursor-pointer"
                      >
                        <Handshake className="w-3.5 h-3.5" />
                        <span>Gói Kết Nối Thu Mua Ngay</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side column: Wants requested by Enterprises (Doanh nghiệp mua) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-205 space-y-4 shadow-sm">
              <h3 className="font-display font-medium text-lg text-slate-900 flex items-center space-x-1.5 border-b border-slate-100 pb-3">
                <span className="p-1 px-2.5 bg-amber-100 text-amber-800 font-bold rounded-lg text-xs mr-2">CẦU</span>
                <span>Nhu Cầu Đặt Mua Của Các Tập Đoàn Xuất Khẩu</span>
              </h3>

              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {buyDemands.map((demand) => (
                  <div key={demand.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 border-l-4 border-l-amber-500 hover:shadow-xs transition-shadow space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-slate-800 font-sans">{demand.enterpriseName}</h4>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 font-sans">
                           <span>Nhu cầu mua: <strong className="text-slate-900">{demand.volume} tấn</strong></span>
                           <span>- Đặt mộc giống: <strong className="text-amber-800 font-bold">{demand.variety}</strong></span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded font-bold font-sans">
                        Cần {demand.targetCert}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-150 font-sans">
                      <span className="text-slate-500 font-medium">Giá thu mua tiêu chuẩn: <strong className="text-amber-700 text-sm font-display font-bold">{demand.targetPrice.toLocaleString('vi-VN')} VND/kg</strong></span>
                      <span className="text-slate-400 font-medium">Vùng gom: {demand.sourceLoc}</span>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        id={`offer-sari-to-buyer-${demand.id}`}
                        onClick={() => {
                          const mockFarmer = MOCK_FARMERS[0]; // Sáu Đức
                          const newConn: DirectConnection = {
                            id: `conn_demand_${Date.now()}`,
                            farmerId: mockFarmer.id,
                            farmerName: mockFarmer.name,
                            enterpriseId: 'e2',
                            enterpriseName: demand.enterpriseName,
                            productName: `Sầu riêng ${demand.variety}`,
                            volume: demand.volume,
                            priceOffer: demand.targetPrice,
                            stage: 'Yêu cầu mới',
                            proposedDeliveryDate: '2026-07-15',
                            notes: 'Khởi tạo từ Chào Cầu thu mua doanh nghiệp.',
                            contractSignedByFarmer: false,
                            contractSignedByEnterprise: false,
                          };
                          setConnections(prev => [newConn, ...prev]);
                          setSelectedConnId(newConn.id);
                          setActiveSubMode('connections');
                          alert('Bạn đã gửi chào lô hàng sầu riêng của mình cho Doanh nghiệp! Vui lòng thương lượng giá & ký hợp đồng tại tab Tiến trình.');
                        }}
                        className="py-1.5 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] rounded-lg transition-transform hover:scale-102 flex items-center space-x-1 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Tôi Muốn Chào Hàng Ngay</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 1.3: HỢP TÁC VỚI THƯƠNG LÁI & VỰA THU MUA ĐIỆN TỬ ĐỊA PHƯƠNG */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl border border-yellow-250 p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-yellow-200 pb-4">
              <div className="text-left">
                <h3 className="font-display font-semibold text-lg text-amber-900 flex items-center space-x-2">
                  <span className="p-1.5 bg-yellow-300 text-slate-900 rounded-lg text-[10px] font-bold mr-2">ĐỐI TÁC TRUNG GIAN</span>
                  <span>Mở Rộng Hợp Tác Thương Lái & Vựa Gần Bạn</span>
                </h3>
                <p className="text-amber-800 text-xs mt-1">
                  Nếu bạn là nông hộ nhỏ không đủ số lượng container gom, hãy liên kết gom chung với các vựa và thương lái địa phương uy tín được bảo chứng bởi Hết Sầu.
                </p>
              </div>

              {/* Driver Partner Registration Form button */}
              <button
                id="register-as-trader-btn"
                onClick={() => {
                  const inputName = prompt('Nhập tên Thương lái / Vựa thu mua của bạn:');
                  if (!inputName) return;
                  const inputArea = prompt('Khu vực thu mua chính (ví dụ: Cai Lậy, Cái Bè, Vũng Liêm...):');
                  alert(`Đăng ký đối tác thu mua thành công! Đội ngũ hỗ trợ khảo sát "Nhà nông Hết Sầu" sẽ liên hệ xác minh vựa của anh/chị ${inputName} ở ${inputArea || 'Miền Tây'} trong 24h.`);
                }}
                className="py-2.5 px-4 bg-yellow-500 hover:bg-yellow-650 font-bold text-xs text-slate-950 rounded-xl shadow-xs transition-transform hover:scale-101 flex items-center cursor-pointer whitespace-nowrap"
              >
                <span>Đăng ký làm Thương lái đồng hành</span>
              </button>
            </div>

            {/* List of Verified Local Traders with expandable detail cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 'ld1',
                  name: 'Vựa sầu Anh Bảy Đò (Cai Lậy)',
                  region: 'Cai Lậy, Tiền Giang (Bán kính thu mua 20km)',
                  capacity: 'Sức chứa vựa 18 tấn/ngày. Sẵn sàng xe tải lạnh gom tận vườn.',
                  rating: '4.9 ★',
                  badge: 'Đại sứ Vàng',
                  phone: '0903 456 123',
                  specialOffer: 'Đặc thù: Chốt tiền mặt ngay tại bàn cân, thâu từ 1.5 tấn trở lên ngon trái.'
                },
                {
                  id: 'ld2',
                  name: 'Vựa Sầu Riêng Chị Tư Thảo (Cái Bè)',
                  region: 'Huyện Cái Bè, Tiền Giang & Chợ Lách, Bến Tre',
                  capacity: 'Hái tận nhà, hỗ trợ phân loại Ri6 & Monthong ráo dẻo cơm vàng tại gốc.',
                  rating: '4.8 ★',
                  badge: 'Đã xác minh',
                  phone: '0912 345 678',
                  specialOffer: 'Hỗ trợ: Ký cấy ứng trước 20% tiền đặt cọc cho vườn già bông đạt chuẩn vi sinh.'
                },
                {
                  id: 'ld3',
                  name: 'Hợp tác xã Vận Tải Đông Nam Bộ',
                  region: 'Phục vụ gom toàn bộ tỉnh Vĩnh Long & Bến Tre',
                  capacity: 'Hỗ trợ kéo container lạnh lên bến cảng xuất khẩu chất hành lành.',
                  rating: '5.0 ★',
                  badge: 'Bảo trợ xã',
                  phone: '0988 567 890',
                  specialOffer: 'Có sẵn đội gõ sầu chuyên nghiệp, thợ lành nghề gõ ráo không dập lỗi.'
                }
              ].map((ld) => (
                <div key={ld.id} className="bg-white p-5 rounded-xl border border-yellow-200 flex flex-col justify-between text-xs space-y-3 shadow-xs">
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded border border-yellow-250">
                        {ld.badge}
                      </span>
                      <span className="text-orange-600 font-bold font-mono">{ld.rating}</span>
                    </div>
                    <h4 className="font-sans font-bold text-slate-900 text-sm">{ld.name}</h4>
                    <p className="text-slate-500 font-medium">Địa bàn: {ld.region}</p>
                    <p className="text-slate-600 font-sans leading-relaxed text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-normal">
                      {ld.capacity}
                    </p>
                    <p className="text-amber-850 font-semibold italic text-[11px]">
                      {ld.specialOffer}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Liên hệ: <strong>{ld.phone}</strong></span>
                    <button
                      id={`connect-loc-trader-${ld.id}`}
                      onClick={() => {
                        const confirmMsg = confirm(`Bạn muốn gửi đề xuất liên kết gom sầu riêng cho ${ld.name}? Đối tác sẽ nhận được định vị vườn sầu trên bản đồ của bạn.`);
                        if (confirmMsg) {
                          alert(`Đã truyền gửi mã vườn sầu riêng của bạn cho ${ld.name}. Trạm điều phối của họ sẽ nhanh chóng liên hệ lại sớm nhất!`);
                        }
                      }}
                      className="py-1.5 px-3 bg-yellow-500 hover:bg-yellow-600 font-bold rounded-lg cursor-pointer text-slate-950 transition-colors"
                    >
                      Kết nối gom sầu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeSubMode === 'enterprises' ? (
        /* --- BLOCK 3: DANH SÁCH DOANH NGHIỆP THÂU MUA ĐĂNG KÝ BẢO CHỨNG MINH BẠCH --- */
        <div className="space-y-6">
          {/* Slogan & Support Header */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-650 to-blue-850 p-6 rounded-2xl text-white text-left flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] bg-blue-500/20 text-blue-200 font-mono tracking-widest uppercase px-2 py-0.5 rounded border border-blue-500/30 font-bold">Quản lý vùng nguyên liệu số</span>
              <h3 className="font-display font-bold text-lg">Danh Bạ Doanh Nghiệp Đăng Ký Minh Bạch Quốc Tế</h3>
              <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
                Nơi thông tin doanh nghiệp được số hóa minh bạch 100% kèm Mã số ĐKKD, Chứng chỉ thực phẩm tươi, năng lực kho lạnh và lịch trình nhật ký thu mua thực tế. Nhà nông hoàn toàn chủ động đón đầu, liên lạc thương thảo.
              </p>
            </div>
            <div className="text-right flex items-center space-x-2 bg-white/10 p-3 rounded-xl border border-white/10">
              <BadgeCheck className="w-8 h-8 text-yellow-300 flex-shrink-0" />
              <div className="text-left font-sans text-[11px] leading-tight">
                <span className="block font-bold text-yellow-300">BAO TIÊU CHẮC CHẮN</span>
                <span className="text-slate-200">Đã kiểm chứng pháp lý</span>
              </div>
            </div>
          </div>

          {/* Directory Search & Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-sans">
            <div className="flex-1 w-full relative">
              <input
                id="enterprise-dir-search-input"
                type="text"
                value={entSearch}
                onChange={(e) => setEntSearch(e.target.value)}
                placeholder="Tìm doanh nghiệp theo tên, tỉnh địa chỉ hoặc thị trường xuất khẩu (vd: Trung Quốc, Hoa Kỳ...)"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 block pl-8 text-xs font-medium"
              />
              <span className="absolute left-2.5 top-3.5 text-slate-400">🔍</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto flex-shrink-0">
              <label className="text-slate-500 font-semibold">Tiêu chuẩn yêu cầu:</label>
              <select
                value={entCertFilter}
                onChange={(e) => setEntCertFilter(e.target.value)}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-hidden font-semibold text-slate-705"
              >
                <option value="all">Tất cả tiêu chuẩn</option>
                <option value="VietGAP">Đòi hỏi VietGAP</option>
                <option value="GlobalGAP">Đòi hỏi GlobalGAP</option>
                <option value="Mã số vùng trồng">Yêu cầu Mã số vùng trồng</option>
              </select>

              <button
                onClick={() => { setEntSearch(''); setEntCertFilter('all'); }}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-600 transition-colors cursor-pointer"
              >
                Đặt lại lọc
              </button>
            </div>
          </div>

          {/* Enterprises Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {MOCK_ENTERPRISES.filter(ent => {
              const matchesQuery = ent.name.toLowerCase().includes(entSearch.toLowerCase()) || 
                                   ent.address.toLowerCase().includes(entSearch.toLowerCase()) ||
                                   (ent.targetMarkets && ent.targetMarkets.some(m => m.toLowerCase().includes(entSearch.toLowerCase())));
              const matchesCert = entCertFilter === 'all' || 
                                  (ent.demandedCertifications && ent.demandedCertifications.includes(entCertFilter));
              return matchesQuery && matchesCert;
            }).length === 0 ? (
              <div className="col-span-full py-12 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                <span className="text-3xl">📭</span>
                <p className="text-slate-400 text-xs font-semibold mt-2">Không tìm thấy doanh nghiệp nào khớp bộ lọc hành trình này.</p>
              </div>
            ) : (
              MOCK_ENTERPRISES.filter(ent => {
                const matchesQuery = ent.name.toLowerCase().includes(entSearch.toLowerCase()) || 
                                     ent.address.toLowerCase().includes(entSearch.toLowerCase()) ||
                                     (ent.targetMarkets && ent.targetMarkets.some(m => m.toLowerCase().includes(entSearch.toLowerCase())));
                const matchesCert = entCertFilter === 'all' || 
                                    (ent.demandedCertifications && ent.demandedCertifications.includes(entCertFilter));
                return matchesQuery && matchesCert;
              }).map((ent) => (
                <div key={ent.id} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-2xs">
                  <div className="space-y-3">
                    {/* Upper Header badges */}
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-mono text-[9.5px] font-bold">
                        Hạng Tín Nhiệm: {ent.creditScore} ★
                      </span>
                      <span className="text-green-600 font-extrabold text-[11px] font-sans flex items-center">
                        <Star className="w-3.5 h-3.5 mr-0.5 text-yellow-500 fill-yellow-500" />
                        <span>{ent.creditScore === 'A+' ? '98' : '93'} điểm uy tín</span>
                      </span>
                    </div>

                    {/* Logo Representative Block */}
                    <div className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <img
                        src={ent.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a'}
                        alt={ent.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left">
                        <h4 className="font-sans font-bold text-slate-900 text-[13.5px] leading-tight line-clamp-1">{ent.name}</h4>
                        <span className="text-[10px] text-slate-400 block font-sans">Đại diện: {ent.representative}</span>
                      </div>
                    </div>

                    {/* Quick spec checklist */}
                    <div className="text-[11px] font-sans space-y-1.5 text-slate-600">
                      <p>
                        📍 <strong>Trụ sở:</strong> <span className="text-slate-800 line-clamp-1">{ent.address}</span>
                      </p>
                      <p>
                        📦 <strong>Sức mua mong muốn:</strong> <strong className="text-indigo-600">{ent.demandVolume} Tấn/vụ</strong>
                      </p>
                      <p>
                        🌍 <strong>Thị trường đích:</strong> <span className="text-slate-800 line-clamp-1 font-medium">{ent.targetMarkets?.join(', ')}</span>
                      </p>
                      <div className="pt-1 flex flex-wrap gap-1">
                        {ent.demandedCertifications?.map((c, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[9px] text-slate-500 font-bold">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Purchasing Live Status */}
                    <div className="p-2.5 bg-green-50 rounded-xl border border-green-150 text-[10.5px]">
                      <span className="font-bold text-green-950 block">📢 Trạng thái thu mua:</span>
                      <p className="text-green-800 font-sans leading-snug font-medium mt-0.5">{ent.status}</p>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] font-sans">
                    <button
                      id={`explore-ent-detail-btn-${ent.id}`}
                      onClick={() => setSelectedDetailEnt(ent)}
                      className="py-2.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-center cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Sổ Minh Bạch</span>
                    </button>

                    <button
                      id={`proactive-connect-ent-btn-${ent.id}`}
                      onClick={() => {
                        setProposedEnt(ent);
                        setPropVariety('Ri6');
                        setPropVolume(12);
                        setPropPrice(74000);
                      }}
                      className="py-2.5 px-2 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-xl transition-all text-center cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <Handshake className="w-3.5 h-3.5 text-yellow-300" />
                      <span>Gửi Chào Bán</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* --- BLOCK 2: LUỒNG KẾT NỐI, THƯƠNG LƯỢNG & KÝ HỢP ĐỒNG ĐIỆN TỬ CHUYÊN SÂU --- */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          {/* Left panel: Active Connections list - 4 cols */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-base text-slate-800 flex items-center space-x-2">
                <Handshake className="w-5 h-5 text-emerald-600 animate-pulse" />
                <span>Thỏa Thuận Cung Ứng</span>
              </h3>
              <button
                id="refresh-connections"
                onClick={() => alert('Dữ liệu kết nối đã đồng bộ lên Sổ cái đám mây!')}
                className="p-1 rounded bg-slate-100 text-slate-500 hover:text-green-600"
                title="Đồng bộ"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto">
              {connections.map((conn) => {
                const isSelected = conn.id === selectedConnId;
                return (
                  <div
                    id={`active-connection-${conn.id}`}
                    key={conn.id}
                    onClick={() => setSelectedConnId(conn.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all space-y-2 text-left ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/25 ring-1 ring-emerald-400'
                        : 'border-slate-150 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex justify-between items-start font-sans">
                      <div>
                        <strong className="text-slate-850 block font-normal">Nông dân: {conn.farmerName}</strong>
                        <strong className="text-slate-650 block text-[11px] font-normal mt-0.5">Khách buôn: {conn.enterpriseName}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-2 font-sans text-[11px] text-slate-500">
                      <span>Đề xuất sầu: <strong>{conn.volume} tấn</strong></span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded-md uppercase">
                        {conn.stage}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Active Connection detailed stage progress & negotiation - 8 cols */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between min-h-[500px]">
            {/* Header / Basic details of connection */}
            <div className="border-b border-slate-150 pb-4 space-y-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">MÃ LIÊN KẾT GIAO ƯỚC # {activeConn.id}</span>
                <span className="inline-flex items-center text-xs text-green-700 font-bold px-3 py-1 bg-green-50 rounded-full border border-green-200">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-green-500 animate-spin-slow" />
                  <span>Định vị sầu riêng: {activeConn.productName}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl text-xs font-sans">
                <div>
                  <span className="text-slate-400 block font-semibold">Lô lượng sầu đề nghị</span>
                  <strong className="text-slate-800 text-sm font-display">{activeConn.volume} Tấn</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Đơn giá thu mua</span>
                  <strong className="text-green-700 text-sm font-display">{activeConn.priceOffer.toLocaleString('vi-VN')} đ/kg</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Thời điểm giao hàng dự kiến</span>
                  <strong className="text-slate-800 text-sm font-display">{activeConn.proposedDeliveryDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Thành tiền hợp ước</span>
                  <strong className="text-slate-800 text-sm font-display">{(activeConn.volume * 1000 * activeConn.priceOffer).toLocaleString('vi-VN')} đ</strong>
                </div>
              </div>

              {/* INTERACTIVE PAYMENT STATUS BANNER */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 border border-slate-200 p-4 rounded-xl gap-3 font-sans text-xs shadow-inner">
                <div className="flex items-center space-x-2.5">
                  <span className="py-0.5 px-2 rounded bg-yellow-101 text-yellow-800 font-extrabold text-[10px] uppercase tracking-wider border border-yellow-250 bg-yellow-100">
                    Bảo chứng
                  </span>
                  {transactionsPaid[activeConn.id] ? (
                    <div className="text-left">
                      <span className="text-green-700 font-extrabold flex items-center text-xs">
                        <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                        Đã nạp bảo chứng {transactionsPaid[activeConn.id].type === 'deposit' ? 'ĐẶT CỌC 30%' : 'TẤT TOÁN 100%'}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-sans font-normal">
                        Thanh toán: <strong>{transactionsPaid[activeConn.id].totalAmount.toLocaleString('vi-VN')} đ</strong> • Ký số lúc: {transactionsPaid[activeConn.id].paidAt}
                      </span>
                    </div>
                  ) : (
                    <div className="text-left">
                      <span className="text-slate-500 font-semibold flex items-center text-xs">
                        <AlertCircle className="w-4 h-4 mr-1 text-yellow-600 animate-bounce" />
                        Chưa thanh toán bảo chứng
                      </span>
                      <span className="text-[10px] text-slate-450 block mt-0.5 font-sans font-normal">
                        *Doanh nghiệp nên nạp cọc 30% để kích hoạt giai đoạn hái gôm vận chuyển.
                      </span>
                    </div>
                  )}
                </div>
                
                {(!transactionsPaid[activeConn.id] || transactionsPaid[activeConn.id].type === 'deposit') && (
                  <button
                    id="btn-trigger-payment-flow"
                    onClick={() => {
                      setPaymentType(transactionsPaid[activeConn.id] ? 'full' : 'deposit');
                      setPaymentStep('methods');
                      setOpenPaymentModal(true);
                    }}
                    className="py-2 px-3.5 bg-yellow-500 hover:bg-yellow-600 transition-colors font-bold text-[11px] text-slate-950 rounded-lg shadow-xs cursor-pointer flex items-center space-x-1"
                  >
                    <span>💳 {transactionsPaid[activeConn.id] ? 'Thanh lý 70% còn lại' : 'Nạp bảo cọc 30% (Hết Sầu Pay)'}</span>
                  </button>
                )}
              </div>

              {/* STAGES BAR SCHEME ON TOP */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-sans">Quy trình bước giao giao kết điện tử</span>
                <div className="grid grid-cols-5 gap-1 text-[9px] font-bold text-center font-sans tracking-tight">
                  {[
                    { title: 'Yêu cầu mới', key: ['Yêu cầu mới'] },
                    { title: 'Thương lượng', key: ['Đang thương lượng', 'Đang soạn hợp đồng'] },
                    { title: 'Hợp ước ký', key: ['Đã ký hợp đồng'] },
                    { title: 'Vận tải', key: ['Đang vận chuyển'] },
                    { title: 'Đánh giá xong', key: ['Hoàn thành', 'Đã đánh giá'] }
                  ].map((stg, i) => {
                    const isPassed = ['Hoàn thành', 'Đã đánh giá', 'Đang vận chuyển', 'Đã ký hợp đồng', 'Đang soạn hợp đồng'].includes(activeConn.stage) || i === 0;
                    const isCurrent = stg.key.includes(activeConn.stage);
                    return (
                      <div
                        key={i}
                        className={`p-1.5 rounded-md border ${
                          isCurrent
                            ? 'bg-green-600 text-white border-green-500 animate-pulse'
                            : isPassed
                            ? 'bg-slate-100 text-green-700 border-slate-200'
                            : 'bg-slate-50 text-slate-350 border-slate-100'
                        }`}
                      >
                        {stg.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Middle part dynamic body depending on stage */}
            <div className="flex-1 py-2">
              {activeConn.stage === 'Yêu cầu mới' || activeConn.stage === 'Đang thương lượng' ? (
                /* Negotiation Interface with chat & forms side-by-side */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                  {/* Form to submit price Counter offer */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-4 text-xs font-sans">
                    <h4 className="font-bold text-slate-800 flex items-center">
                      <Scale className="w-4 h-4 text-green-600 mr-1.5" />
                      <span>Sửa Đổi Điều Khoản Hợp Ước</span>
                    </h4>

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="text-slate-500 block mb-1">Khối lượng sầu riêng thảo thuận (Tấn)</label>
                        <input
                          type="number"
                          value={negoVolume}
                          onChange={(e) => setNegoVolume(Number(e.target.value))}
                          className="w-full p-2 bg-white rounded-lg border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="text-slate-500 block mb-1">Đơn giá đề nghị (VND/kg)</label>
                        <input
                          type="number"
                          value={negoPrice}
                          onChange={(e) => setNegoPrice(Number(e.target.value))}
                          className="w-full p-2 bg-white rounded-lg border border-slate-300"
                          step="1000"
                        />
                      </div>

                      <button
                        id="update-nego-terms-btn"
                        onClick={updateNegoTerms}
                        className="w-full py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition-all cursor-pointer"
                      >
                        Gửi Đề Xuất Điều Khoản Mới
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400">
                      *Cả 2 bên bóp gõ chấp nhận số lượng giá trị trước khi kí duyệt trực tuyến.
                    </div>
                  </div>

                  {/* Chat Messenger simulation log */}
                  <div className="border border-slate-200 rounded-xl flex flex-col justify-between bg-slate-50/50 overflow-hidden text-xs font-sans h-[280px]">
                    {/* Chat headers */}
                    <div className="bg-slate-200/60 p-2.5 font-bold text-slate-700 text-left">
                      Hộp đối thoại bàn giá
                    </div>

                    {/* Message streams */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2 text-left">
                      {chatLogs.map((log, i) => (
                        <div key={i} className={`space-y-0.5 ${log.sender.includes('Nông dân') ? 'text-left' : 'text-right'}`}>
                          <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">{log.sender} • {log.time}</span>
                          <span className={`inline-block p-2 rounded-lg max-w-[85%] leading-normal font-sans ${
                            log.sender.includes('Tôi') || log.sender.includes('Doanh nghiệp')
                              ? 'bg-blue-600 text-white font-medium rounded-br-none'
                              : 'bg-green-100 text-green-950 font-medium rounded-bl-none'
                          }`}>
                            {log.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Message input */}
                    <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-200 bg-white flex space-x-1.5">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 p-2 bg-slate-100 rounded-lg outline-none"
                      />
                      <button
                        id="chat-send-msg-btn"
                        type="submit"
                        className="p-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                      >
                        <Send className="w-4.5 h-4.5" />
                      </button>
                    </form>
                  </div>
                </div>
              ) : activeConn.stage === 'Đang soạn hợp đồng' || activeConn.stage === 'Đang vận chuyển' || activeConn.stage === 'Đã ký hợp đồng' ? (
                /* Interactive Cryptographic E-Contract Signing */
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs font-sans space-y-4 text-left max-w-xl mx-auto">
                  <div className="flex items-center space-x-2 text-green-700">
                    <FileText className="w-5 h-5 text-green-600" />
                    <h4 className="font-display font-semibold text-sm">GIAO GIAO ƯỚC HỢP ĐỒNG ĐIỆN TỬ SẦU RIÊNG</h4>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-250 font-sans space-y-3 leading-relaxed">
                    <p className="font-bold text-slate-800 text-center uppercase tracking-wide">PHÊ DUYỆT ĐIỀU KHOẢN MUA BÁN KÝ SỐ</p>
                    <p className="text-[11px] text-slate-500 font-sans text-justify">
                      Nông hộ bàn giao lô sầu riêng {activeConn.productName} số lượng mập đạt {activeConn.volume} tấn chín chuẩn tại vườn bên B. Phía doanh nghiệp thương cảng Bên A bao tiêu thanh tế bồi hoàn tiền hái đúng đơn giá thương mại thỏa thuận dẻo quả.
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-[11px] pt-3 border-t border-slate-200 font-sans">
                      <div>
                        <span className="block font-bold">Bên B (Nông hộ):</span>
                        <span className="text-slate-500">{activeConn.contractSignedByFarmer ? '✅ ĐÃ KÝ KHÓA SỐ' : '❌ CHƯA DỰ DUYỆT'}</span>
                      </div>
                      <div>
                        <span className="block font-bold">Bên A (Khách buôn):</span>
                        <span className="text-slate-500">{activeConn.contractSignedByEnterprise ? '✅ ĐÃ KÝ KHÓA SỐ' : '❌ CHƯA DỰ DUYỆT'}</span>
                      </div>
                    </div>

                    {activeConn.contractHash && (
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-500 text-[10px] font-mono select-all break-all border flex items-center space-x-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mã bảo chứng Blockchain: {activeConn.contractHash}</span>
                      </div>
                    )}
                  </div>

                  {/* Sign Buttons if not fully signed */}
                  <div className="flex justify-end gap-3 pt-2">
                    {((userRole === 'nha_vuon' && !activeConn.contractSignedByFarmer) ||
                      (userRole === 'doanh_nghiep' && !activeConn.contractSignedByEnterprise) ||
                      (userRole === 'giao_dien_ngoai')) && (
                      <button
                        id="sign-contract-electronic-btn"
                        onClick={handleSignContract}
                        className="py-2.5 px-6 bg-gradient-to-r from-green-700 to-emerald-600 rounded-xl text-white font-bold hover:scale-[1.01] transition-transform cursor-pointer"
                      >
                        Kí Duyệt Điện Tử Thỏa Thuận
                      </button>
                    )}

                    {activeConn.contractSignedByFarmer && activeConn.contractSignedByEnterprise && activeConn.stage !== 'Đang vận chuyển' && (
                      <button
                        id="advance-freight-btn"
                        onClick={handleConfirmFreight}
                        className="py-2.5 px-6 bg-blue-700 text-white font-bold rounded-xl"
                      >
                        Khởi Hành Vận Chuyển Giao Trái
                      </button>
                    )}
                  </div>
                </div>
              ) : activeConn.stage === 'Hoàn thành' ? (
                /* Star ratings & Feedback for completed deal */
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs font-sans space-y-4 max-w-md mx-auto text-center">
                  <div className="w-12 h-12 bg-green-150 text-green-700 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                    ✓
                  </div>
                  <h4 className="font-display font-semibold text-sm text-slate-800">Thương Vụ Đã Đạt Đúng Hẹn Hoàn Thành!</h4>
                  <p className="text-slate-500 font-sans text-xs">
                    Vui lòng đóng góp đánh giá uy tín chất lượng để hệ thống ghi nhận bổ sung điểm Credit Scoring cho đối tác của bạn ngay.
                  </p>

                  <div className="flex justify-center space-x-1.5 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setSubmitRating(star)}
                        className="p-1"
                      >
                        <Star className={`w-6 h-6 ${submitRating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-slate-500 font-semibold block">Góp ý bình luận thực tế:</label>
                    <textarea
                      value={submitFeedback}
                      onChange={(e) => setSubmitFeedback(e.target.value)}
                      className="w-full p-2 bg-white rounded-lg border border-slate-250 font-sans h-20"
                      placeholder="Góp ý sầu béo dẻo bọc ráo..."
                    />
                  </div>

                  <button
                    id="submit-review-btn"
                    onClick={handlePostReview}
                    className="w-full py-2.5 bg-green-700 text-white font-bold rounded-xl"
                  >
                    Gửi Đánh Giá Cả 2 Bên
                  </button>
                </div>
              ) : (
                /* Already rated successfully state */
                <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-xs font-sans space-y-2 max-w-md mx-auto text-center">
                  <BadgeCheck className="w-12 h-12 text-green-600 mx-auto" />
                  <h4 className="font-display font-semibold text-green-950 text-sm">GIAO DỊCH THÀNH CÔNG ĐÃ HOÀN TẤT ĐÁNH GIÁ</h4>
                  <p className="text-green-800/80 font-sans">
                    Hệ thống lưu giữ điểm tín nhiệm đối tác của bạn đạt chuẩn tuyệt vời trên thang sổ cái. Nhờ đó kích tăng tỉ lệ mai mối tự động cho mùa gặt sầu riêng kế tiếp.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom active state indicator of contract */}
            <div className="border-t border-slate-150 pt-4 flex items-center justify-between text-slate-400 text-xs font-sans font-medium">
              <span>Đang thương lượng: sầu riêng loại 1</span>
              <span>Ngày chốt cũ: 2026-06-06</span>
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN HIGH-FIDELITY SIMULATED PAYMENT GATEWAY (HẾT SẦU PAY) */}
      {openPaymentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-1 border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 text-left font-sans text-slate-800">
            {/* Header section */}
            <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
              <div className="flex items-center space-x-2 font-mono">
                <Lock className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-slate-350">HỆ THỐNG THANH TOÁN BẢO CHỨNG HẾT SẦU PAY</span>
              </div>
              <button
                onClick={() => setOpenPaymentModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 p-1.5 rounded-lg cursor-pointer font-bold"
              >
                Hủy giao dịch
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Payment Steps view */}
              {paymentStep === 'methods' && (
                <div className="space-y-5">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-sans">Thông tin hóa đơn bảo ước</span>
                    <h4 className="text-[14px] font-bold text-slate-900 mt-1">
                      Thương vụ thu mua sầu riêng • {activeConn.farmerName}
                    </h4>
                    
                    {/* Amount option selector */}
                    <div className="grid grid-cols-2 gap-3 mt-3 text-xs font-sans">
                      <button
                        onClick={() => setPaymentType('deposit')}
                        className={`p-3 rounded-lg border-2 text-left flex flex-col justify-between cursor-pointer transition-all ${paymentType === 'deposit' ? 'border-green-600 bg-green-50/20' : 'border-slate-250 bg-white'}`}
                      >
                        <span className="font-bold text-slate-600">Nạp đặt cọc bảo ứng (30%)</span>
                        <strong className="text-sm text-green-750 font-extrabold mt-1">
                          {((activeConn.volume * 1000 * activeConn.priceOffer) * 0.3).toLocaleString('vi-VN')} đ
                        </strong>
                      </button>
                      
                      <button
                        onClick={() => setPaymentType('full')}
                        className={`p-3 rounded-lg border-2 text-left flex flex-col justify-between cursor-pointer transition-all ${paymentType === 'full' ? 'border-green-600 bg-green-50/20' : 'border-slate-250 bg-white'}`}
                      >
                        <span className="font-bold text-slate-600">Thanh lý tất toán (100%)</span>
                        <strong className="text-sm text-green-700 font-extrabold mt-1">
                          {(activeConn.volume * 1000 * activeConn.priceOffer).toLocaleString('vi-VN')} đ
                        </strong>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block font-sans">Chọn phương thức nạp bảo cọc</span>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'vietqr', name: 'VietQR Chuyển Khoản', desc: 'Có xác nhận tự động' },
                        { id: 'momo', name: 'Ví điện tử MoMo', desc: 'Sử dụng ví MoMo' },
                        { id: 'card', name: 'Thẻ ATM / Visa', desc: 'Thẻ nội địa & quốc tế' }
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`p-2.5 rounded-xl border-2 text-left transition-colors cursor-pointer ${paymentMethod === m.id ? 'border-indigo-600 bg-indigo-50/10' : 'border-slate-250 hover:bg-slate-50'}`}
                        >
                          <strong className="text-xs block text-slate-800 font-bold">{m.name}</strong>
                          <span className="text-[9.5px] text-slate-400 mt-1 block leading-tight">{m.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic payment form depending on method */}
                  {paymentMethod === 'vietqr' ? (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-6">
                      <div className="w-32 h-32 bg-white border border-slate-250 rounded-xl p-2.5 flex flex-col justify-center items-center relative shadow-xs">
                        {/* High fidelity realistic simulated QR Code */}
                        <div className="grid grid-cols-5 gap-0.5 w-24 h-24 opacity-90">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className={`w-full h-full rounded-[1px] ${
                              (i % 3 === 0 && i % 2 === 0) || i < 5 || i % 5 === 0 || i > 20
                                ? 'bg-slate-900' 
                                : 'bg-transparent'
                            }`}></div>
                          ))}
                        </div>
                        {/* Mini Durian overlay inside QR center */}
                        <div className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center font-bold text-[8px] text-[#064e3b]">
                          Sầu
                        </div>
                      </div>

                      <div className="flex-1 text-xs space-y-2 font-sans">
                        <p className="font-bold text-slate-850 text-sm">Chuyển khoản VietQR Bảo Chứng Miễn Phí</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-600">
                          <span>Ngân hàng thụ hưởng:</span>
                          <strong>MB_MOCKBANK (Miền Tây)</strong>
                          <span>Số tài khoản:</span>
                          <strong>11039820-AISTUDIO</strong>
                          <span>Tên người nhận:</span>
                          <strong>LIEN MINH HTX HET SAU SAU RIENG</strong>
                          <span>Số tiền nạp:</span>
                          <strong className="text-green-700 font-extrabold">
                            {(paymentType === 'deposit' 
                              ? (activeConn.volume * 1000 * activeConn.priceOffer * 0.3)
                              : (activeConn.volume * 1000 * activeConn.priceOffer)
                            ).toLocaleString('vi-VN')} đ
                          </strong>
                          <span>Nội dung chuyển khoản (Memo):</span>
                          <strong className="text-indigo-600 select-all font-mono font-bold">HETS_PAY_{activeConn.id}</strong>
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans italic mt-1">*Hệ thống tự động rà soát Sổ cái Ngân hàng liên thông mỗi 10 giây.</p>
                      </div>
                    </div>
                  ) : paymentMethod === 'momo' ? (
                    <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-150 space-y-3">
                      <p className="font-bold text-pink-900 text-xs">Ví điện tử MoMo sầu riêng đồng dịch</p>
                      <div className="space-y-1 text-xs text-slate-650 font-sans">
                        <label className="block mb-1">Nhập Số điện thoại đăng ký MoMo của bạn:</label>
                        <input
                          type="tel"
                          placeholder="091 xxxx xxx"
                          className="w-full p-2.5 bg-white border border-pink-200 rounded-lg outline-none font-bold"
                          defaultValue="0987654321"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                      <p className="font-bold text-slate-900 text-xs">Cổng ATM nội địa & Thẻ Quốc Tế mã bảo mật</p>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="col-span-2">
                          <label className="block text-slate-650 mb-1">Số thẻ ATM / Visa / Master</label>
                          <input type="text" placeholder="9704 xxxx xxxx xxxx" className="w-full p-2 border border-slate-300 rounded bg-white" defaultValue="9704 1234 5678 9012" />
                        </div>
                        <div>
                          <label className="block text-slate-650 mb-1">Ngày hết hạn / CVC</label>
                          <input type="text" placeholder="12/29" className="w-full p-2 border border-slate-300 rounded bg-white" defaultValue="12/28" />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    id="confirm-mock-payment-done-btn"
                    onClick={handleVerifySimulatorPayment}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-750 text-white font-extrabold text-xs tracking-wider rounded-xl transition-all cursor-pointer text-center"
                  >
                    Xác Nhận Tôi Đã Chuyển Khoản Bảo Chứng
                  </button>
                </div>
              )}

              {/* Processing loading state */}
              {paymentStep === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                  <div className="space-y-1">
                    <strong className="text-slate-900 font-bold text-sm block font-sans">ĐANG RÀ SOÁT ĐỒNG BỘ SỔ CÁI NGÂN HÀNG...</strong>
                    <p className="text-slate-400 text-xs font-sans">Kiểm tra chữ ký bảo mật và băm ngân quỹ Hết Sầu Pay trong 2 giây...</p>
                  </div>
                </div>
              )}

              {/* Success Transaction summary */}
              {paymentStep === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-12 h-12 bg-green-150 text-green-700 rounded-full flex items-center justify-center text-xl font-bold border-2 border-green-300">
                    ✓
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <strong className="text-green-950 font-bold text-[14px] block font-sans">THANH TOÁN BẢO CHỨNG THÀNH CÔNG!</strong>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans">
                      Cổng thanh toán <strong>Hết Sầu Pay</strong> đã tự động khóa bảo chứng giao dịch. Số tiền đã chuyển thẳng vào Ngăn quỹ đồng hồ ký ký thác thuộc Hợp tác xã, tự động kích hoạt tiến độ đơn sầu riêng sang trạng thái tiếp theo trên ứng dụng.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200 w-full flex justify-center">
                    <button
                      onClick={() => setOpenPaymentModal(false)}
                      className="py-2.5 px-8 bg-green-700 hover:bg-green-800 text-white font-extrabold text-xs rounded-xl cursor-pointer"
                    >
                      Quay lại trang giao dịch
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- DETAIL transparent LEDGER MODAL FOR REGISTERED ENTERPRISES ("Sổ điện tử minh bạch") --- */}
      {selectedDetailEnt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 text-left font-sans text-slate-850">
            {/* Header banner area */}
            <div className="bg-linear-to-r from-blue-900 to-indigo-950 p-6 text-white relative">
              <button
                type="button"
                onClick={() => setSelectedDetailEnt(null)}
                className="absolute right-4 top-4 text-slate-3d0 hover:text-white font-bold p-1 px-2.5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                style={{ color: '#cbd5e1' }}
                title="Đóng hồ sơ"
              >
                ✕
              </button>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                <img
                  src={selectedDetailEnt.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a'}
                  alt={selectedDetailEnt.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-white p-0.5 border border-white/20 flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-yellow-400 text-slate-950 font-black rounded-full font-mono text-[9px] uppercase tracking-wider">
                      Đại sứ thu mua vàng
                    </span>
                    <span className="text-[10.5px] bg-sky-500/10 text-sky-300 border border-sky-400/20 px-2 py-0.5 rounded-full font-bold">
                      ✓ Đã xác thực thực địa bến bãi
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-yellow-300">{selectedDetailEnt.name}</h3>
                  <p className="text-xs text-slate-300">Đại diện pháp lý: {selectedDetailEnt.representative} • Hot Zalo: {selectedDetailEnt.phone}</p>
                </div>
              </div>
            </div>

            {/* Profile body sheets */}
            <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
              {/* Essential legal credentials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
                {/* Panel left */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-blue-950 tracking-wide text-[13px] border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                    🏢 Thông Tin Pháp Lý Doanh Nghiệp
                  </h4>
                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span>Mã số thuế doanh nghiệp (Mã ĐKKD):</span>
                      <strong className="text-slate-900 font-mono">{selectedDetailEnt.businessLicense || 'MSDN-0314251670'}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span>Điểm tín nhiệm đối tác (Credit Ranking):</span>
                      <strong className="text-green-700 font-mono text-sm">{selectedDetailEnt.creditScore}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span>Văn phòng đại diện:</span>
                      <strong className="text-slate-900 text-right max-w-[200px] whitespace-normal leading-tight">{selectedDetailEnt.address}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                      <span>Nhu cầu thâu mua tiêu chuẩn:</span>
                      <strong className="text-slate-900">{selectedDetailEnt.demandVolume} Tấn sầu riêng/vụ</strong>
                    </div>
                  </div>
                </div>

                {/* Panel right */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-blue-950 tracking-wide text-[13px] border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                    📜 Giấy Phép & Chứng Chỉ Vệ Sinh Xuất Khẩu
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedDetailEnt.exportCertificates || ['FDA', 'HACCP', 'ISO 22000']).map((cert: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-250 font-bold rounded-lg flex items-center gap-1">
                        🔒 {cert}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2 text-slate-650 mt-1">
                    <p>
                      <strong>Thị trường mục tiêu được cấp mã:</strong><br />
                      <span className="text-indigo-700 font-semibold">{selectedDetailEnt.targetMarkets?.join('; ') || 'Trung Quốc, Singapore, Mỹ'}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Cold storage capabilities */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <h4 className="font-display font-bold text-slate-900">
                  ❄ Năng Lực Bảo Quản & Logistics Chuỗi Lạnh (Cold Chain Capacity):
                </h4>
                <p className="leading-relaxed font-sans">{selectedDetailEnt.coldChainCapacity || 'Kho lạnh khí quyển biến đổi (CA) rộng 2,500m2 sức chứa 800 tấn sầu tươi, đội 12 xe kéo container ThermoKing bọc chuyên sâu.'}</p>
                
                {/* Simulated factory inspection images */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {(selectedDetailEnt.packingPhotos || [
                    'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921',
                    'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc'
                  ]).slice(0, 2).map((imgUrl: string, idx: number) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden border border-slate-200">
                      <img
                        src={imgUrl}
                        alt="Factory/Warehousing"
                        className="h-28 w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 right-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">
                        Đã kiểm soát hộc {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buying diaries/ledgers (Nhật ký giao dịch thực tế) */}
              <div className="space-y-3 text-xs">
                <h4 className="font-display font-bold text-slate-900 tracking-wide text-[13px] flex items-center gap-1.5 font-sans">
                  📝 Nhật Ký Hoạt Động & Giao Dịch Thực Tế Tại Tây Nam Bộ:
                </h4>
                
                <div className="space-y-2 font-sans text-slate-600 text-left">
                  {(selectedDetailEnt.buyingDiary || [
                    '05/06/2026: Đã kiểm duyệt mỏ hộc chín bói và chốt cọc 20 tấn sầu riêng Ri6 ráo bơ của vườn Chú Sáu Đức.',
                    '28/05/2026: Hoàn tất đóng gói lô container sầu riêng Monthong dẻo ngọt thông quan luồng xanh xuất sang Thượng Hải.'
                  ]).map((log: string, i: number) => (
                    <div key={i} className="p-3 bg-white border border-slate-200/90 rounded-xl flex items-start space-x-2.5 font-sans justify-start text-left">
                      <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">●</span>
                      <p className="leading-normal">{log}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedDetailEnt(null)}
                className="py-2.5 px-5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Đóng lại
              </button>
              
              <button
                type="button"
                id="initiate-connection-profile-drawer"
                onClick={() => {
                  setProposedEnt(selectedDetailEnt);
                  setSelectedDetailEnt(null);
                  setPropVariety('Ri6');
                  setPropVolume(15);
                  setPropPrice(74000);
                }}
                className="py-2.5 px-6 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Handshake className="w-4 h-4 text-yellow-300" />
                <span>Tiến Hành Gửi Chào Lệnh Bán</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PROPOSAL SUBMISSION MODAL WIZARD FOR SẦU RIÊNG --- */}
      {proposedEnt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Build dynamic customized connection
              const connectionId = `conn_proactive_${Date.now()}`;
              const customConn: DirectConnection = {
                id: connectionId,
                farmerId: 'f1', // custom user context representation
                farmerName: 'Vườn sầu riêng Chú Sáu Đức',
                enterpriseId: proposedEnt.id,
                enterpriseName: proposedEnt.name,
                productName: `Sầu riêng ${propVariety}`,
                volume: Number(propVolume),
                priceOffer: Number(propPrice),
                stage: 'Yêu cầu mới',
                proposedDeliveryDate: propDate,
                notes: `Bà con gửi chào bán sầu riêng chín vườn đạt mã vùng trồng. Đánh giá uy tín đại diện: ${proposedEnt.creditScore}.`,
                contractSignedByFarmer: true, // farmer signs first proactive
                contractSignedByEnterprise: false,
              };

              setConnections(prev => [customConn, ...prev]);
              setSelectedConnId(connectionId);
              setProposedEnt(null);
              setActiveSubMode('connections');
              alert(`Giao kết điện tử thành công! Bạn chủ động đề xuất gửi bán sầu riêng đạt mã vùng trồng cho ${proposedEnt.name}. Đã tự động kích hoạt thương lượng và khởi thảo hợp đồng ở tab Tiến trình.`);
            }}
            className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 text-left font-sans text-slate-800 space-y-0"
          >
            {/* Modal header details */}
            <div className="bg-blue-700 p-5 text-white flex justify-between items-center">
              <div className="space-y-1 text-left">
                <span className="text-[10px] bg-sky-400/20 text-white font-black uppercase px-2 py-0.5 rounded tracking-wider">
                  Chủ động liên hệ kết nối
                </span>
                <h3 className="font-display font-extrabold text-base leading-tight">Gửi Chào Bán Trực Tiếp Doanh Nghiệp</h3>
              </div>
              <button
                type="button"
                onClick={() => setProposedEnt(null)}
                className="text-white hover:bg-white/10 p-1 px-2.5 rounded font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal body sheet elements */}
            <div className="p-6 space-y-4 text-xs font-sans text-left">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Gửi đề xuất thương lượng đến đối tác:</span>
                <strong className="text-slate-900 font-display text-[13.5px] block font-bold leading-snug">{proposedEnt.name}</strong>
                <span className="text-[11px] text-slate-600 block sm:inline">Hạng tín nhiệm bảo chứng: <strong>{proposedEnt.creditScore} ★</strong></span>
              </div>

              {/* Form Input elements matches precisely schema of sell offering */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 font-bold block mb-1">Chủng loại sầu riêng:</label>
                    <select
                      value={propVariety}
                      onChange={(e) => setPropVariety(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-bold"
                    >
                      <option value="Ri6">Sầu riêng Ri6 (vàng béo ráo)</option>
                      <option value="Monthong">Monthong (Dona tiêu chuẩn)</option>
                      <option value="Chuồng Bò">Sầu Chuồng Bò (béo rực rợ)</option>
                      <option value="Musang King">Musang King (bơ ngọt đậm)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold block mb-1">Tổng sản lượng sầu gửi bán (Tấn):</label>
                    <input
                      type="number"
                      value={propVolume}
                      onChange={(e) => setPropVolume(Number(e.target.value))}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-bold"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 font-bold block mb-1">Mức giá kỳ vọng (VND/kg):</label>
                    <input
                      type="number"
                      value={propPrice}
                      onChange={(e) => setPropPrice(Number(e.target.value))}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-bold"
                      step="1000"
                      min="30000"
                    />
                  </div>

                  <div>
                    <label className="text-slate-500 font-bold block mb-1">Thời điểm dự kiến quả ráo hái dọn:</label>
                    <input
                      type="date"
                      value={propDate}
                      onChange={(e) => setPropDate(e.target.value)}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Security warning */}
              <div className="p-3 bg-blue-50 border border-blue-150 rounded-xl text-[10.5px] leading-relaxed text-indigo-950 text-left">
                💡 <strong>An tâm bảo chứng:</strong> Đề xuất của bà con sẽ tự động khởi tạo Mã Giao Ước SHA256 mã hóa, bảo mật tối đa nội dung mua bán. Đối tác sẽ nhận thông báo rà soát ngay tại Tổng đài trung tâm.
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setProposedEnt(null)}
                className="py-2.5 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Hủy đề xuất
              </button>
              
              <button
                type="submit"
                className="py-2.5 px-6 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs shadow-xs cursor-pointer"
              >
                Ký số & Gửi Đề Xuất Bán
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
