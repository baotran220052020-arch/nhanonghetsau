import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowUpRight, ArrowDownLeft, FileText, Download, Wallet, CreditCard, RefreshCw, QrCode, ClipboardCheck, Sparkles, CheckCircle, HelpCircle, Bell, AlertTriangle } from 'lucide-react';

interface LedgerItem {
  id: string;
  type: 'deposit' | 'withdraw' | 'locked_escrow' | 'unlocked_disburse';
  title: string;
  description: string;
  amount: number;
  date: string;
  status: 'lien_ket' | 'da_duyet' | 'cho_khoa' | 'cho_duyet';
  referenceNo: string;
}

export default function HetSauPay() {
  const [balance, setBalance] = useState<number>(145000000); // 145,000,000 VND
  const [escrowBalance, setEscrowBalance] = useState<number>(90000000); // 90,000,000 VND (Tiền cọc bị khóa bảo chứng)
  const [activeTab, setActiveTab] = useState<'status' | 'deposit' | 'withdraw' | 'escrow'>('status');

  // Input fields state
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [depositContractId, setDepositContractId] = useState<string>('HD-900820-CaiLay');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawBank, setWithdrawBank] = useState<string>('MB');
  const [withdrawAccount, setWithdrawAccount] = useState<string>('0982907018');
  
  // Simulation states
  const [isGeneratingQr, setIsGeneratingQr] = useState<boolean>(false);
  const [generatedQrUrl, setGeneratedQrUrl] = useState<string>('');
  const [showInvoicePdf, setShowInvoicePdf] = useState<boolean>(false);
  const [activeInvoice, setActiveInvoice] = useState<LedgerItem | null>(null);
  const [isPdfDownloading, setIsPdfDownloading] = useState<boolean>(false);
  const [paymentToast, setPaymentToast] = useState<string>('');

  const [ledger, setLedger] = useState<LedgerItem[]>([
    {
      id: 'tx_1',
      type: 'locked_escrow',
      title: 'Khóa cọc bảo chứng 30% Hợp đồng #90082',
      description: 'Ví MekongX cọc 30% cho Vườn Chú Sáu Đức (Monthong 10 Tấn)',
      amount: 90000000,
      date: '06/06/2026 14:30',
      status: 'lien_ket',
      referenceNo: 'REF-SD90082-LC'
    },
    {
      id: 'tx_2',
      type: 'deposit',
      title: 'Nạp ký quỹ từ Ngân hàng MB-Bank',
      description: 'Giao dịch chuyển khoản thanh toán rà soát tự động MB',
      amount: 150000000,
      date: '06/06/2026 12:15',
      status: 'da_duyet',
      referenceNo: 'REF-BANK-MB38290'
    },
    {
      id: 'tx_3',
      type: 'unlocked_disburse',
      title: 'Giải ngân cọc sầu hoàn tất Hợp đồng #8820B',
      description: 'HTX Hết Sầu phê duyệt giải ngân tiền bán sầu riêng Ri6 (vụ Chợ Lách)',
      amount: 65000000,
      date: '05/06/2026 09:40',
      status: 'da_duyet',
      referenceNo: 'REF-CL8820B-GN'
    },
    {
      id: 'tx_4',
      type: 'withdraw',
      title: 'Rút tiền về Tài khoản cá nhân',
      description: 'Chuyển đổi số dư ví về Agribank Cai Lậy của Hộ Nguyễn Sáu Đức',
      amount: 80000000,
      date: '04/06/2026 17:10',
      status: 'da_duyet',
      referenceNo: 'REF-WITH-AGR883'
    }
  ]);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(depositAmount.replace(/,/g, ''));
    if (!amountNum || amountNum <= 0) {
      alert('Bà con vui lòng nhập số tiền nạp ký quỹ chuẩn nhé!');
      return;
    }

    setIsGeneratingQr(true);
    setGeneratedQrUrl('');

    // Simulate generation of MB-Bank QR
    setTimeout(() => {
      setIsGeneratingQr(false);
      setGeneratedQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=banking://vietqr/mb-bank?acc=0982907018%26amount=${amountNum}%26msg=KQT%252520HET%252520SAU%252520${depositContractId}`);
    }, 1200);
  };

  const confirmDepositPayment = () => {
    const amountNum = parseFloat(depositAmount.replace(/,/g, ''));
    if (!amountNum) return;

    setBalance(prev => prev + amountNum);
    
    const newTx: LedgerItem = {
      id: `tx_${Date.now()}`,
      type: 'deposit',
      title: 'Nạp ký quỹ VietQR (Đã Khớp Lệnh)',
      description: `Đặt cọc bảo chứng cho liên thông: ${depositContractId}`,
      amount: amountNum,
      date: new Date().toLocaleString('vi-VN'),
      status: 'da_duyet',
      referenceNo: `REF-VQR-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setLedger(prev => [newTx, ...prev]);
    setPaymentToast(`🎉 Tài khoản Hết Sầu Pay vừa ghi nhận khoản ký quỹ nạp +${amountNum.toLocaleString('vi-VN')}đ bảo đảm cọc hợp đồng thành công!`);
    setDepositAmount('');
    setGeneratedQrUrl('');
    setActiveTab('status');

    // Auto dismiss toast after 5s
    setTimeout(() => setPaymentToast(''), 6000);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount.replace(/,/g, ''));
    if (!amountNum || amountNum <= 0) {
      alert('Vui lòng nhập số tiền rút chuẩn dạt.');
      return;
    }
    if (amountNum > balance) {
      alert('Số dư khả dụng trong ví của bà con không đủ để rút khoản tiền này dồi dào!');
      return;
    }

    setBalance(prev => prev - amountNum);
    
    const newTx: LedgerItem = {
      id: `tx_${Date.now()}`,
      type: 'withdraw',
      title: 'Lệnh rút tiền về Ngân hàng',
      description: `Rút về ngân hàng ${withdrawBank} - TK: ${withdrawAccount}`,
      amount: amountNum,
      date: new Date().toLocaleString('vi-VN'),
      status: 'da_duyet',
      referenceNo: `REF-WITH-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setLedger(prev => [newTx, ...prev]);
    setWithdrawAmount('');
    setPaymentToast(`💸 Đã rút thành công -${amountNum.toLocaleString('vi-VN')}đ về ngân hàng ${withdrawBank}! Tiền về tài khoản của bà con sau 30 giây.`);
    setActiveTab('status');
    setTimeout(() => setPaymentToast(''), 6000);
  };

  const handleEscrowAction = (tx: LedgerItem, action: 'disburse' | 'refund') => {
    if (action === 'disburse') {
      // Release locked escrow to grower balance available
      setEscrowBalance(prev => Math.max(0, prev - tx.amount));
      setBalance(prev => prev + tx.amount);

      const updateLedger = ledger.map(item => {
        if (item.id === tx.id) {
          return {
            ...item,
            type: 'unlocked_disburse' as const,
            title: 'Giải ngân hoàn toàn',
            status: 'da_duyet' as const
          };
        }
        return item;
      });

      setLedger(updateLedger);
      setPaymentToast(`💵 HTX đã phê duyệt giải ngân khoản cọc bảo chứng ${tx.amount.toLocaleString('vi-VN')}đ sang số dư khả dụng thành công!`);
    } else {
      // Refund escrow to partner
      setEscrowBalance(prev => Math.max(0, prev - tx.amount));

      const updateLedger = ledger.map(item => {
        if (item.id === tx.id) {
          return {
            ...item,
            title: 'Đã hoàn cọc an toàn',
            status: 'da_duyet' as const
          };
        }
        return item;
      });

      setLedger(updateLedger);
      setPaymentToast(`🛡️ Đã phê duyệt hoàn cọc bảo chứng ${tx.amount.toLocaleString('vi-VN')}đ về cho đối tác doanh nghiệp do thỏa thuận kết dệt.`);
    }
    setTimeout(() => setPaymentToast(''), 6000);
  };

  const viewInvoiceReceipt = (tx: LedgerItem) => {
    setActiveInvoice(tx);
    setShowInvoicePdf(true);
  };

  const downloadReceiptPdf = () => {
    setIsPdfDownloading(true);
    setTimeout(() => {
      setIsPdfDownloading(false);
      alert('Đã kết xuất và tải xuống PDF Phiếu ủy nhiệm chi bảo chứng mốc đỏ thành công!');
      setShowInvoicePdf(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast Notification for transactions success */}
      {paymentToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-905 border border-green-550 text-slate-100 p-4 rounded-2xl shadow-2xl flex items-start space-x-3 bg-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
          <div className="text-left font-sans text-xs flex-1 space-y-1">
            <strong className="text-green-400 font-extrabold block uppercase">Cập nhật Hết Sầu Pay:</strong>
            <p className="text-slate-200 leading-relaxed font-sans">{paymentToast}</p>
          </div>
          <button onClick={() => setPaymentToast('')} className="text-slate-400 hover:text-white font-black">✕</button>
        </div>
      )}

      {/* Header section card */}
      <div className="relative overflow-hidden bg-white hover:shadow-xs p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
        <div className="space-y-2">
          <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold px-2.5 py-1 rounded-full uppercase font-sans flex items-center space-x-1.5 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>LIÊN KẾT MB-BANK VIETQR</span>
          </span>
          <h1 className="font-display font-medium text-3xl text-slate-900 tracking-tight">
            Cổng Thanh Toán / Ví Ký Quỹ Bảo Chứng
          </h1>
          <p className="text-slate-500 font-sans text-xs max-w-2xl leading-relaxed">
            Hạ tầng lưu ký tài chính nông sản đột phá giúp chống bùng cọc hủy kèo sầu riêng. Thương lái nạp 30% cọc MB-Bank được hệ thống dán mác mọc phong tỏa, ký bách kiểm định ráo cơm dẻo mới tự động giải ngân cho bà con.
          </p>
        </div>

        {/* Card logos */}
        <div className="flex bg-slate-50 p-2.5 rounded-2xl border border-slate-200 items-center space-x-4">
          <div className="text-right">
            <span className="text-[8px] font-bold text-slate-400 block uppercase font-mono">Bảo trợ thanh toán:</span>
            <strong className="text-xs text-blue-900 font-black font-serif">MB Bank Chi nhánh Tây Nam Bộ</strong>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm font-sans italic shadow-sm tracking-widest">
            MB
          </div>
        </div>
      </div>

      {/* Balance visual boxes - grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Box 1: Available balance */}
        <div className="bg-gradient-to-tr from-green-800 to-green-950 p-6 rounded-3xl text-white text-left space-y-4 shadow-md relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full select-none pointer-events-none"></div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-green-300 font-semibold uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <Wallet className="w-4 h-4" />
              <span>Số dư ví khả dụng</span>
            </span>
            <span className="bg-white/10 text-[9px] font-bold p-1 px-2.5 rounded-md border border-white/5 uppercase">Rút Rớt Lẹ</span>
          </div>
          <div className="space-y-1">
            <strong className="text-3xl font-black block font-sans tracking-wide">
              {balance.toLocaleString('vi-VN')} đ
            </strong>
            <p className="text-[11px] text-green-300/80 font-sans">Sẵn sàng để rút về ATM ngân hàng nội địa trong 30 giây.</p>
          </div>
        </div>

        {/* Box 2: Escrow Locked balance */}
        <div className="bg-gradient-to-tr from-amber-700 to-amber-900 p-6 rounded-3xl text-white text-left space-y-4 shadow-md relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full select-none pointer-events-none"></div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-amber-200 font-semibold uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <ShieldCheck className="w-4 h-4" />
              <span>Ký quỹ đặt cọc phong tỏa</span>
            </span>
            <span className="bg-white/10 text-[9px] font-bold p-1 px-2.5 rounded-md border border-white/5 uppercase">Cam kết bảo chứng</span>
          </div>
          <div className="space-y-1">
            <strong className="text-3xl font-black block font-sans tracking-wide">
              {escrowBalance.toLocaleString('vi-VN')} đ
            </strong>
            <p className="text-[11px] text-amber-200/80 font-sans">Tiền cọc liên kết hợp đồng 3 bên an toàn tuyệt đối chống bùng sòng.</p>
          </div>
        </div>

        {/* Box 3: Quick Action menu buttons */}
        <div className="bg-white p-5 rounded-3xl border border-slate-205 flex flex-col justify-between text-left space-y-3 shadow-2xs">
          <div>
            <h4 className="font-display font-bold text-slate-800 text-sm">Giao tác tài chính nhanh</h4>
            <p className="text-slate-400 font-sans text-[11px] mt-0.5">Chọn hành trình dạt tiền để dán mác giao dịch.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`py-2 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'deposit' ? 'bg-green-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Nạp Ký Quỹ</span>
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`py-2 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center space-x-1 cursor-pointer ${
                activeTab === 'withdraw' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Rút Về ATM</span>
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`col-span-2 py-2 px-3 rounded-xl font-bold transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'status' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-650 hover:bg-slate-150 border border-slate-200'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Xem Dòng Tiền & Giải Ngân</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main active action panel area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMN LEFT: ACTIVE ACTION WORKSPACE - 5 COLS */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 text-left space-y-5">
          
          {activeTab === 'status' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-base">Hướng dẫn Bảo Chứng</h3>
              <div className="text-slate-600 text-xs font-sans leading-relaxed space-y-3">
                <p>🤝 <strong>Quy trình bảo chứng sầu riêng:</strong></p>
                <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-150 text-[11px]">
                  <p>• <strong>Bước 1:</strong> Thương lái bộc đóng ký quỹ 30% tiền cọc hợp đồng bảo đảm vào ví.</p>
                  <p>• <strong>Bước 2:</strong> Hệ sinh thái Hết Sầu găm khóa tiền cọc ở hộc "Ký quỹ". Thỏa thuận 3 bên búp dấu có giá trị pháp lý.</p>
                  <p>• <strong>Bước 3:</strong> Sầu chín muồi hái xuống đạt chuẩn VietGAP ráo cơm béo dẻo. Khách thông sọt cậy hộc, HTX giải tỏa cọc chuyển thẳng tiền khả dụng cho bà con cắt gắt.</p>
                </div>
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-150 text-amber-900 text-[11px] flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
                  <p><strong>Cảnh báo bẻ kèo:</strong> Nếu thương lái vựa sầu lặn trốn bùng ngang, tiền cọc bảo chứng sẽ tự động đền bù 100% tài trợ cho nhà vườn tháo hạn b bão hại.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'deposit' && (
            <form onSubmit={handleDepositSubmit} className="space-y-4 font-sans text-xs">
              <h3 className="font-display font-bold text-slate-850 text-base">Nạp Ký Quỹ Đóng Cọc VietQR</h3>
              <p className="text-slate-450 text-[11px]">Bà con nạp tiền ký quỹ để khóa cọc hợp đồng giao dịch bốc container.</p>

              <div className="space-y-1.5 text-left">
                <label className="text-slate-500 font-bold block">Chọn mã định danh Hợp đồng liên kết:</label>
                <select
                  value={depositContractId}
                  onChange={(e) => setDepositContractId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white text-slate-800 font-semibold"
                >
                  <option value="HD-900820-CaiLay">Hơn 10 Tấn Monthong - Hộ Chú Sáu Đức (#HD-900820)</option>
                  <option value="HD-332902-ChoLach">15 Tấn Ri6 tiêu chuẩn - Hợp tác xã Tam Bình (#HD-332902)</option>
                  <option value="HD-LG-ESCROW-VUA">Nạp tự do tạo ví lưu ký bảo lãnh vựa đóng sọc</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-slate-500 font-bold block">Số tiền cần nạp ký quỹ (VNĐ):</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 90,000,000"
                  value={depositAmount}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    setDepositAmount(clean ? Number(clean).toLocaleString('en-US') : '');
                  }}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none text-slate-900 font-extrabold text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-green-700 hover:bg-green-800 text-white rounded-xl cursor-pointer font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-4.5 h-4.5" />
                <span>Tải Mã QR Ký Quỹ MB-Bank</span>
              </button>

              {isGeneratingQr && (
                <p className="text-slate-450 italic text-[10px] text-center">Đang định hình mã chuyển khoản bảo mật VietQR động...</p>
              )}

              {generatedQrUrl && (
                <div className="border border-dashed border-slate-220 p-5 rounded-2xl bg-slate-50 text-center space-y-4 font-sans">
                  <strong className="text-green-950 font-bold block text-xs uppercase text-slate-700">Mã Quét Ký Quỹ Hết Sầu MB-Bank</strong>
                  <div className="w-48 h-48 bg-white mx-auto p-2 rounded-xl flex items-center justify-center border border-slate-150 shadow-inner">
                    <img src={generatedQrUrl} alt="MBT QR" className="w-full h-full object-contain" />
                  </div>
                  <div className="bg-white p-2.5 border border-slate-150 rounded-xl text-[10.5px] leading-tight text-slate-600 text-left space-y-1">
                    <p>• <strong>Chủ tài khoản:</strong> HTX Sầu Riêng Hết Sầu MB</p>
                    <p>• <strong>Số tài khoản:</strong> 0982907018</p>
                    <p>• <strong>Cú pháp nộp:</strong> HETSAU KQT {depositContractId}</p>
                  </div>
                  <button
                    type="button"
                    onClick={confirmDepositPayment}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>Xác Nhận Đã Quét & Chuyển Khoản Thành Công</span>
                  </button>
                </div>
              )}
            </form>
          )}

          {activeTab === 'withdraw' && (
            <form onSubmit={handleWithdrawSubmit} className="space-y-4 font-sans text-xs">
              <h3 className="font-display font-bold text-slate-850 text-base">Rút Tiền Về Tài Khoản ATM</h3>
              <p className="text-slate-450 text-[11px]">Rút lẹ số dư khả dụng về thẻ ngân hàng nông thôn Việt Nam thông suốt.</p>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="space-y-1.5">
                  <label className="text-slate-500 font-bold block">Ngân hàng thụ hưởng:</label>
                  <select
                    value={withdrawBank}
                    onChange={(e) => setWithdrawBank(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white text-slate-800 font-bold"
                  >
                    <option value="Agribank">Agribank (Nông nghiệp)</option>
                    <option value="MB">MB-Bank (Quân đội)</option>
                    <option value="Vietcombank">Vietcombank</option>
                    <option value="BIDV">BIDV</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 font-bold block">Số tài khoản nhận:</label>
                  <input
                    type="text"
                    value={withdrawAccount}
                    onChange={(e) => setWithdrawAccount(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-slate-500 font-bold block">Số tiền cần rút (VNĐ):</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 10,000,000"
                  value={withdrawAmount}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    setWithdrawAmount(clean ? Number(clean).toLocaleString('en-US') : '');
                  }}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none text-slate-900 font-extrabold text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl cursor-pointer font-bold transition-all text-center"
              >
                Yêu Cầu Rút Tiền ATM Khẩn Cấp
              </button>
            </form>
          )}

        </div>

        {/* COLUMN RIGHT: LEDGER TRANSACTION LIST & ACTION DISBURSE - 7 COLS */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 text-left space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 flex-wrap gap-2">
            <div>
              <h3 className="font-display font-semibold text-slate-900 text-base">Nhật Ký Giao Dịch Lưu Ký</h3>
              <p className="text-[11px] text-slate-400 font-sans">Khai báo dòng tiền minh bạch được ký số chuỗi khối bởi HTX Hết Sầu.</p>
            </div>
            
            <span className="text-[10px] text-green-700 bg-green-50 font-extrabold px-2.5 py-1 rounded-full border border-green-200">
              Công nghệ bảo mật AES-256
            </span>
          </div>

          <div className="space-y-3.5">
            {ledger.map((tx) => (
              <div
                key={tx.id}
                className="p-4 rounded-2xl border border-slate-150 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 hover:bg-slate-50/50 transition-colors bg-gradient-to-r from-white to-slate-50/30 text-xs font-sans"
              >
                <div className="text-left space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {tx.type === 'deposit' && (
                      <span className="bg-green-100 text-green-850 p-1 rounded-lg text-[9.5px] font-black uppercase font-sans flex items-center space-x-1 border border-green-200">
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                        <span>NẠP KÝ QUỸ</span>
                      </span>
                    )}
                    {tx.type === 'withdraw' && (
                      <span className="bg-rose-100 text-rose-850 p-1 rounded-lg text-[9.5px] font-black uppercase font-sans flex items-center space-x-1 border border-rose-200">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>RÚT RA</span>
                      </span>
                    )}
                    {tx.type === 'locked_escrow' && (
                      <span className="bg-amber-100 text-amber-850 p-1 rounded-lg text-[9.5px] font-black uppercase font-sans flex items-center space-x-1 border border-amber-250">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                        <span>PHONG TỎA CỌC</span>
                      </span>
                    )}
                    {tx.type === 'unlocked_disburse' && (
                      <span className="bg-blue-100 text-blue-850 p-1 rounded-lg text-[9.5px] font-black uppercase font-sans flex items-center space-x-1 border border-blue-200">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-800" />
                        <span>ĐÃ GIẢI NGÂN</span>
                      </span>
                    )}

                    <span className="font-mono text-[10px] text-slate-400 font-bold">{tx.date}</span>
                  </div>

                  <strong className="block text-slate-850 font-bold text-[12.5px] truncate leading-tight mt-0.5">
                    {tx.title}
                  </strong>
                  
                  <p className="text-slate-500 text-[10.5px] italic font-sans leading-relaxed">
                    {tx.description}
                  </p>
                </div>

                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-end gap-2 shrink-0">
                  <strong className={`text-sm font-black font-sans ${
                    tx.type === 'deposit' || tx.type === 'unlocked_disburse' ? 'text-green-700' : 'text-slate-800'
                  }`}>
                    {tx.type === 'deposit' || tx.type === 'unlocked_disburse' ? '+' : '-'} {tx.amount.toLocaleString('vi-VN')} đ
                  </strong>

                  <div className="flex items-center gap-1.5 pt-1.5 sm:pt-0">
                    {/* Render specific action releases for locked escrows */}
                    {tx.type === 'locked_escrow' && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEscrowAction(tx, 'disburse')}
                          className="px-2 py-1 bg-green-700 hover:bg-green-800 text-white font-extrabold text-[9.5px] rounded-md uppercase transition-colors cursor-pointer"
                        >
                          Giải Ngân
                        </button>
                        <button
                          onClick={() => handleEscrowAction(tx, 'refund')}
                          className="px-2 py-1 bg-slate-100 hover:bg-red-50 text-red-700 hover:text-red-800 font-bold text-[9.5px] rounded-md transition-all cursor-pointer border border-slate-200 hover:border-red-200"
                        >
                          Bồi Hoàn cọc
                        </button>
                      </div>
                    )}

                    {/* PDF Receipt download triggers */}
                    <button
                      onClick={() => viewInvoiceReceipt(tx)}
                      className="p-1 px-1.5 bg-slate-50 hover:bg-slate-150 rounded-lg text-slate-500 hover:text-green-700 border border-slate-200 transition-colors flex items-center space-x-1 cursor-pointer"
                      title="Tải biên lai PDF"
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[9px] font-bold">Biên lai PDF</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* PDF RECIPIT INVOICE READER MODAL POPUP */}
      {showInvoicePdf && activeInvoice && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-850 rounded-3xl max-w-2xl w-full p-1 border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 font-sans">
            {/* Header pdf controls */}
            <div className="bg-slate-905 px-5 py-3 flex justify-between items-center text-slate-200 border-b border-slate-700/65 bg-slate-900">
              <span className="font-mono text-xs font-bold text-slate-400">PDF Reader V1.2 — BIEN_LAI_{activeInvoice.referenceNo}.pdf</span>
              <div className="flex gap-2">
                <button
                  onClick={downloadReceiptPdf}
                  className="py-1 px-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-[10px] uppercase flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  {isPdfDownloading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{isPdfDownloading ? 'Đang tải...' : 'Tải xuống File PDF'}</span>
                </button>
                <button
                  onClick={() => setShowInvoicePdf(false)}
                  className="p-1 px-2.5 hover:bg-slate-850 text-slate-300 rounded-lg text-[11px] font-bold"
                >
                  Đóng
                </button>
              </div>
            </div>

            {/* Generated Paper */}
            <div className="bg-white p-6 sm:p-10 text-slate-950 block relative shadow-inner overflow-y-auto max-h-[70vh]">
              {/* PDF Logo sign seal markup watermark background */}
              <div className="absolute inset-x-0 top-1/4 text-center pointer-events-none opacity-[0.04] text-green-900 font-bold select-none rotate-25 text-3xl">
                LƯU KÝ ĐẶT CỌC BAO TIÊU SẦU RIÊNG
              </div>

              <div className="relative z-10 space-y-5 text-left text-xs font-sans">
                {/* Header corporate */}
                <div className="flex justify-between items-start border-b border-green-800 pb-3">
                  <div className="space-y-0.5">
                    <h2 className="text-sm font-extrabold text-green-900 uppercase">HỆ SINH THÁI SỐ NHÀ NÔNG HẾT SẦU</h2>
                    <p className="text-[9px] text-slate-400 font-bold leading-none">Cố vấn bảo lưu dòng tiền: MB Bank Chi nhánh sông Tiền</p>
                    <p className="text-[9px] text-slate-400">Điện thoại đại diện: 0982 907 018</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="text-[8px] bg-red-100 text-red-800 border border-red-200 font-bold px-1.5 py-0.5 rounded uppercase">Phiếu chứng nhận ký quỹ</span>
                    <p className="text-[9.5px] text-slate-500 font-mono mt-1">Mã tham chiếu: {activeInvoice.referenceNo}</p>
                  </div>
                </div>

                {/* Invoice Title */}
                <div className="text-center space-y-1.5 py-3">
                  <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">PHIẾU BIÊN NHẬN GIAO DỊCH LƯU KÝ BẢO CHỨNG</h1>
                  <p className="text-[10px] text-slate-500 italic">Được đối chiếu và bảo vệ quyền lợi 3 bên bởi liên hiệp HTX Hết Sầu</p>
                </div>

                {/* Info block lines */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 grid grid-cols-2 gap-3 text-[10.5px]">
                  <div>
                    <span className="text-slate-400 block font-bold">Nội dung dòng tiền:</span>
                    <strong className="text-slate-800">{activeInvoice.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold">Mức giao dịch:</span>
                    <strong className="text-green-700 text-xs font-black">{activeInvoice.amount.toLocaleString('vi-VN')} VNĐ</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold">Ngày lập phiếu ký:</span>
                    <strong className="text-slate-800">{activeInvoice.date}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold">Trạng thái bảo chứng:</span>
                    <span className="inline-flex items-center text-[9px] bg-green-100 text-green-800 border border-green-250 font-bold px-1.5 py-0.5 rounded mt-0.5">
                      ✓ Đã bảo chứng chuỗi ký số
                    </span>
                  </div>
                </div>

                {/* Corporate narrative descriptions */}
                <div className="space-y-2 text-[10.5px] leading-relaxed text-justify text-slate-700">
                  <p>
                    Chứng thư bảo lưu ký gửi này được khởi tạo tự động dựa trên giao dịch liên thông ví nông sản sầu riêng. Số tiền ký quỹ được phong tỏa an toàn tuyệt đối tại tài khoản thanh toán đại diện hợp tác xã chi nhánh Tiền Giang, nhằm mục tiêu ký cọc 30% giá sầu chín bói chín cây tự nhiên cho xã viên, đảm bảo uy tín không phân bổi, hủy hợp đồng thu cắt khi rộ mùa bão hại.
                  </p>
                </div>

                {/* Footer sign sign stamps */}
                <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 items-end text-[11px] font-sans">
                  <div>
                    <span className="block text-slate-400 text-[9.5px]">Đại diện ngân bảo trợ</span>
                    <strong className="block text-slate-900">MB-Bank Chi nhánh Cái Bè</strong>
                  </div>

                  <div className="text-right space-y-1 block relative">
                    <span className="block text-slate-400 text-[9.5px]">Đại Diện Tổ hợp HTX Hết Sầu</span>
                    <strong className="block text-slate-900 border-b border-dashed border-slate-250 pb-9">Chủ nhiệm Trần Văn Hết Sầu</strong>
                    
                    {/* Simulated Red stamp seal of organisation */}
                    <div className="absolute right-4 bottom-2 opacity-80 scale-90 pointer-events-none select-none z-20">
                      <div className="w-16 h-16 border-3 border-red-500 rounded-full flex items-center justify-center rotate-12 text-[5.5px] text-red-500 font-sans font-black uppercase text-center flex-col leading-none">
                        <div className="border-t border-b border-red-500 py-0.5 my-0.5">HTX SẦU RIÊNG</div>
                        <div className="font-extrabold text-[7px] text-red-600">HẾT SẦU</div>
                        <div className="text-[5px]">TIỀN GIANG</div>
                      </div>
                    </div>

                    <span className="block text-[9.5px] font-mono text-slate-405 italic pt-1">Đã ký số an toàn</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
