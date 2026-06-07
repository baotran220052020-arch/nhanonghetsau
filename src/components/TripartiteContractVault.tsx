import React, { useState } from 'react';
import { 
  FileText, 
  Handshake, 
  Coins, 
  Lock, 
  CheckCircle2, 
  UserCheck, 
  QrCode, 
  Users, 
  Info, 
  HelpCircle,
  FileCheck2,
  LockIcon,
  UnlockIcon
} from 'lucide-react';
import { DirectConnection } from '../types';

interface TripartiteContractVaultProps {
  userRole: 'giao_dien_ngoai' | 'nha_vuon' | 'doanh_nghiep';
}

export default function TripartiteContractVault({ userRole }: TripartiteContractVaultProps) {
  // Simulate active tripartite connection transaction
  const [tripartiteStep, setTripartiteStep] = useState<'soan_thao' | 'cho_ky' | 'da_ky_va_ky_quy' | 'hoan_thành'>('soan_thao');
  const [variety, setVariety] = useState<string>('Ri6');
  const [volume, setVolume] = useState<number>(15); // Tons
  const [price, setPrice] = useState<number>(75000); // 75,000 VND/kg
  const totalPrice = volume * 1050 * price; // includes 5% cooperative hauling premium buffer
  const depositRatio = 0.35; // 35% deposit required
  const depositAmount = totalPrice * depositRatio;

  // Signatures checklist
  const [signedFarmer, setSignedFarmer] = useState<boolean>(false);
  const [signedCoop, setSignedCoop] = useState<boolean>(false);
  const [signedExporter, setSignedExporter] = useState<boolean>(false);
  const [escrowStatus, setEscrowStatus] = useState<'trống' | 'đang_chờ' | 'đã_khóa_tiền_cọc_35%' | 'đã_giải_ngân'>('trống');
  const [qrcodeGenerated, setQrcodeGenerated] = useState<boolean>(false);
  
  // Hash simulation
  const [contractHash, setContractHash] = useState<string>('');

  const handleFarmerSign = () => {
    setSignedFarmer(true);
    if (signedCoop && signedExporter) {
      finalizeContract();
    }
  };

  const handleCoopSign = () => {
    setSignedCoop(true);
    if (signedFarmer && signedExporter) {
      finalizeContract();
    }
  };

  const handleExporterSign = () => {
    setSignedExporter(true);
    if (signedFarmer && signedCoop) {
      finalizeContract();
    }
  };

  const finalizeContract = () => {
    setTripartiteStep('da_ky_va_ky_quy');
    setEscrowStatus('đã_khóa_tiền_cọc_35%');
    setContractHash(`SHA256-TRIPARTITE-${Math.random().toString(36).substring(3, 11).toUpperCase()}-${Date.now()}`);
  };

  const handleGenerateQR = () => {
    setQrcodeGenerated(true);
    setEscrowStatus('đang_chờ');
  };

  const handleConfirmMockIPayment = () => {
    // Exporter pays the deposit to secure the escrow
    setSignedFarmer(true);
    setSignedCoop(true);
    setSignedExporter(true);
    finalizeContract();
  };

  const handleReleaseEscrow = () => {
    setEscrowStatus('đã_giải_ngân');
    setTripartiteStep('hoan_thành');
    alert('Giải ngân tiền ký quỹ cọc và thanh toán dứt điểm thành công về ví sầu nông hộ sòng phẳng!');
  };

  const handleResetContract = () => {
    setTripartiteStep('soan_thao');
    setSignedFarmer(false);
    setSignedCoop(false);
    setSignedExporter(false);
    setEscrowStatus('trống');
    setQrcodeGenerated(false);
    setContractHash('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left font-sans space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900 flex items-center space-x-2">
            <Handshake className="w-5.5 h-5.5 text-green-700" />
            <span>Cổng Giao Kết Hợp Đồng 3 Bên & Ví Ký Quỹ Escrow Bảo Chứng</span>
          </h3>
          <p className="text-slate-500 text-xs mt-1 leading-normal max-w-3xl">
            Cơ chế bảo vệ đặc quyền: Hợp đồng ký số ghi rõ điều khoản <strong>Giá sàn bảo hiểm</strong> giữa Chủ Vườn sầu riêng, Người đại diện Hợp tác xã (bên giám sát cân đo quả) và Doanh nghiệp xuất khẩu thu mua trực tiếp cọc.
          </p>
        </div>

        <button 
          onClick={handleResetContract}
          className="text-[10px] font-semibold text-slate-500 hover:text-green-700 bg-slate-50 hover:bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-205"
        >
          Khởi tạo lại Phôi
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contract Draft Spec (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="border border-slate-205 rounded-xl overflow-hidden shadow-xs">
            
            {/* Header of paper contract */}
            <div className="bg-slate-50 border-b border-slate-150 p-4 shrink-0 text-center space-y-1">
              <strong className="block text-slate-900 text-sm tracking-wide font-display uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
              <span className="block text-[10px] text-slate-500 font-medium">Độc lập - Tự do - Hạnh phúc</span>
              <div className="w-20 h-0.5 bg-slate-200 mx-auto my-1.5"></div>
              <strong className="block text-slate-800 text-xs uppercase tracking-wider font-display font-bold">
                HỢP ĐỒNG LIÊN KẾT ĐẶT CỌC BAO TIÊU MÙA VỤ SẦU RIÊNG BA BÊN
              </strong>
              <span className="text-[10px] font-mono text-slate-400 block pb-1">
                {contractHash ? `Mã Token Ký Số: ${contractHash}` : 'TRẠNG THÁI: PHÂN BỔ PHÔI NHÁP'}
              </span>
            </div>

            {/* Paper content of contract */}
            <div className="p-5 space-y-4 text-xs text-slate-700 leading-relaxed max-h-[380px] overflow-y-auto bg-amber-50/5">
              
              {/* Party definitions */}
              <div className="space-y-1 border-b border-slate-100 pb-2">
                <p><strong>BÊN A (CHỦ NÔNG HỘ):</strong> Vườn sầu riêng mẫu VietGAP Tam Bình.</p>
                <p><strong>BÊN B (HỢP TÁC XÃ / BAN QUẢN LÝ):</strong> Đại diện Ban quản trị Xã Hợp tác xã Cai Lậy Tiền Giang.</p>
                <p><strong>BÊN C (DOANH NGHIỆP TRỰC TIẾP ĐẶT CỌC):</strong> Doanh nghiệp Xuất khẩu Nông sản VinaFruit.</p>
              </div>

              {/* Adjustable Terms Form inside paper constraint if draft */}
              {tripartiteStep === 'soan_thao' ? (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-150 space-y-3">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-green-800 border-b border-green-200 pb-1">ĐỀ XUẤT ĐIỀU KHOẢN GIAO THƯƠNG (Chỉnh sửa được)</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-slate-500 font-semibold block mb-0.5">Giống sầu riêng:</label>
                      <select 
                        value={variety} 
                        onChange={(e) => setVariety(e.target.value)}
                        className="w-full text-slate-800 p-1.5 bg-white border border-slate-300 rounded text-xs select-none"
                      >
                        <option value="Ri6">Ri6 sầu bói</option>
                        <option value="Monthong">Monthong ráo</option>
                        <option value="Chuồng Bò">Chuồng Bò sữa</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-500 font-semibold block mb-0.5">Sản lượng gặt (Tấn):</label>
                      <input 
                        type="number" 
                        value={volume}
                        onChange={(e) => setVolume(Math.max(1, Number(e.target.value)))}
                        className="w-full text-slate-805 text-slate-800 p-1.5 bg-white border border-slate-300 rounded text-xs" 
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 font-semibold block mb-0.5">Giá cam ước (đ/kg):</label>
                      <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(Math.max(10000, Number(e.target.value)))}
                        className="w-full text-slate-800 p-1.5 bg-white border border-slate-300 rounded text-xs" 
                        step="1000"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setTripartiteStep('cho_ky')}
                    className="w-full py-2 bg-green-700 hover:bg-green-800 text-white font-bold rounded shadow-xs cursor-pointer text-xs uppercase"
                  >
                    Khóa Điều Khoản & Chuyển Sang Ký Số 3 Bên
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5 bg-green-50/25 border-green-200">
                  <span className="font-semibold text-green-900 block text-[11px]">ĐIỀU KHOẢN ĐÃ KHÓA KÝ:</span>
                  <p>• Sản phẩm uỷ thác: <strong>Sầu riêng đạt chuẩn {variety}</strong></p>
                  <p>• Trọng lượng ký thác thâu gom: <strong>{volume} Tấn (Bù hao mụt 5% vạt gai)</strong></p>
                  <p>• Đơn giá sòng phẳng: <strong className="text-green-700 font-mono text-xs">{price.toLocaleString('vi-VN')} VND/kg</strong></p>
                  <p>• Tổng giá trị hợp ước thanh toán: <strong className="text-slate-900 text-xs font-mono">{(totalPrice).toLocaleString('vi-VN')} VND</strong></p>
                  <p>• Tiền cọc giữ chỗ phong tỏa (35%): <strong className="text-amber-700 text-xs font-mono">{(depositAmount).toLocaleString('vi-VN')} VND</strong></p>
                </div>
              )}

              {/* Core Legal Rules */}
              <div className="space-y-2 text-left bg-slate-50 p-3 rounded border border-slate-200">
                <strong className="block text-slate-800 text-[11px] uppercase">ĐIỀU KHOẢN CAM KẾT THANH TOÁN QUÝ UÝ</strong>
                <p className="text-slate-500 text-[11px]">
                  BÊN C chuyển 100% Tiền đặt cọc giữ chỗ <strong>({(depositAmount).toLocaleString('vi-VN')} đ)</strong> niêm phong vào Tài Khoản Ký Quỹ Đảm Bảo (Escrow Account) của ngân hàng liên kết Hết Sầu.
                </p>
                <p className="text-slate-500 text-[11px]">
                  BÊN B có trách nhiệm cử thợ gõ sầu lành nghề hỗ trợ nẹp cân, kiểm soát chất thớ khô cơm béo ráo múi, chống gãy gai mủ nấm của BÊN A tại gốc vườn.
                </p>
                <p className="text-slate-500 text-[11px]">
                  Khi BÊN B xác nhận sầu riêng lên xe lạnh container đạt chuẩn Hạng A, ngân hàng tự động mở khóa 100% tiền đặt cọc giải ngân trực tiếp cho BÊN A, xoá bỏ hoàn toàn nguy cơ biến động giật cọc quỵt tiền.
                </p>
              </div>

              {/* Fake Interactive Digital Signatures Panel */}
              <div className="border-t border-slate-200 pt-3 grid grid-cols-3 gap-4 text-center">
                
                {/* Farmer signature */}
                <div className="space-y-1 bg-slate-50 p-2.5 rounded border border-slate-150">
                  <span className="text-slate-450 text-[10px] block font-bold transition-all">CHỦ VƯỜN (BÊN A)</span>
                  {signedFarmer ? (
                    <div className="text-[11px] text-green-700 font-bold flex flex-col items-center gap-0.5">
                      <FileCheck2 className="w-5 h-5 text-green-600" />
                      <span>ĐÃ KÝ SỐ</span>
                    </div>
                  ) : (
                    <button 
                      id="sign-contract-farmer-btn"
                      onClick={handleFarmerSign}
                      disabled={tripartiteStep === 'soan_thao'}
                      className="py-1 px-2 border border-green-500 text-green-600 rounded text-[10px] font-bold hover:bg-green-50 disabled:opacity-40 cursor-pointer"
                    >
                      Ký Chữ Số (Tôi)
                    </button>
                  )}
                </div>

                {/* Cooperative signature */}
                <div className="space-y-1 bg-slate-50 p-2.5 rounded border border-slate-150">
                  <span className="text-slate-450 text-[10px] block font-bold">HTX ĐẠI DIỆN (BÊN B)</span>
                  {signedCoop ? (
                    <div className="text-[11px] text-green-700 font-bold flex flex-col items-center gap-0.5">
                      <FileCheck2 className="w-5 h-5 text-green-600" />
                      <span>ĐÃ KÝ SỐ</span>
                    </div>
                  ) : (
                    <button 
                      id="sign-contract-coop-btn"
                      onClick={handleCoopSign}
                      disabled={tripartiteStep === 'soan_thao'}
                      className="py-1 px-2 border border-emerald-500 text-emerald-600 rounded text-[10px] font-bold hover:bg-emerald-50 disabled:opacity-40 cursor-pointer"
                    >
                      Ký số HTX
                    </button>
                  )}
                </div>

                {/* Exporter signature */}
                <div className="space-y-1 bg-slate-50 p-2.5 rounded border border-slate-150">
                  <span className="text-slate-450 text-[10px] block font-bold">EXPORTER (BÊN C)</span>
                  {signedExporter ? (
                    <div className="text-[11px] text-green-700 font-bold flex flex-col items-center gap-0.5">
                      <FileCheck2 className="w-5 h-5 text-green-600" />
                      <span>ĐÃ KÝ SỐ</span>
                    </div>
                  ) : (
                    <button 
                      id="sign-contract-exporter-btn"
                      onClick={handleExporterSign}
                      disabled={tripartiteStep === 'soan_thao'}
                      className="py-1 px-2 border border-blue-500 text-blue-600 rounded text-[10px] font-bold hover:bg-blue-50 disabled:opacity-40 cursor-pointer"
                    >
                      Ký Doanh nghiệp
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Escrow Vault & Secure banking simulator - (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 text-slate-100 p-5 rounded-2xl space-y-4">
            
            <div className="flex justify-between items-start">
              <div className="space-y-1 text-left">
                <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase block w-max">ESCROW INSURANCE SAFE VAULT</span>
                <h4 className="font-display font-bold text-sm text-slate-200">Két Sắt Ký Quỹ Ngân Hàng</h4>
              </div>
              <Lock className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>

            {/* Simulated locked/unlocked vault graphic */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-3">
              <div className="flex items-center justify-center space-x-3">
                {escrowStatus === 'đã_khóa_tiền_cọc_35%' ? (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full">
                    <Lock className="w-6 h-6 animate-bounce" />
                  </div>
                ) : escrowStatus === 'đã_giải_ngân' ? (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="p-3 bg-slate-800 text-slate-500 rounded-full">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                )}

                <div className="text-left space-y-0.5">
                  <span className="text-[10px] text-slate-500 block font-mono font-bold uppercase">Trạng thái Két đảm bảo:</span>
                  <strong className={`block text-xs uppercase ${
                    escrowStatus === 'đã_khóa_tiền_cọc_35%' ? 'text-red-400' : escrowStatus === 'đã_giải_ngân' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                  }`}>
                    {escrowStatus === 'đã_khóa_tiền_cọc_35%' ? '🔒 Đã khóa cứng cọc 35%' : escrowStatus === 'đã_giải_ngân' ? '✨ ĐÃ GIẢI NGÂN HỘ NÔNG' : 'Chờ lập lệnh nạp tiền'}
                  </strong>
                </div>
              </div>

              <div className="border-t border-slate-900 pt-3 text-[11px] text-slate-400 space-y-1.5 text-left">
                <div className="flex justify-between">
                  <span>Số tiền cọc cần uỷ thác:</span>
                  <strong className="text-yellow-400 font-mono">{(depositAmount).toLocaleString('vi-VN')} đ</strong>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>Ngân hàng trung gian:</span>
                  <span className="text-slate-350">Agribank Cai Lậy (Chi hội sầu riêng)</span>
                </div>
              </div>
            </div>

            {/* Actions for Escrow trigger */}
            {escrowStatus === 'trống' && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-400">
                  Lập tờ trình thanh toán số để Doanh nghiệp quét cọc trực tiếp bằng mã thanh toán thông minh VietQR.
                </p>
                <button
                  id="generate-payment-qr-btn"
                  onClick={handleGenerateQR}
                  disabled={tripartiteStep === 'soan_thao'}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer disabled:opacity-40"
                >
                  Yêu Cầu Xuất Mã Đặt Cọc VietQR
                </button>
              </div>
            )}

            {qrcodeGenerated && escrowStatus === 'đang_chờ' && (
              <div className="space-y-3.5 text-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">MÃ QR ĐẶT CỌC BAO TIÊU CO-OP CHÍNH THỨC</span>
                
                {/* Mock QR graphic */}
                <div className="w-32 h-32 bg-white p-2.5 mx-auto rounded-lg border border-slate-700 flex items-center justify-center">
                  <QrCode className="w-28 h-28 text-slate-900" />
                </div>

                <div className="text-[11px] text-slate-300">
                  <span>Bên C quét mã thanh toán chuyển bảo lãnh Agribank:</span>
                  <strong className="block text-yellow-400 font-mono text-xs mt-1">{(depositAmount).toLocaleString('vi-VN')} đ</strong>
                </div>

                {/* Simulation trigger buttons for the payment sandbox */}
                <div className="space-y-2 pt-1 border-t border-slate-900">
                  <button 
                    id="mock-confirm-payment-btn"
                    onClick={handleConfirmMockIPayment}
                    className="w-full py-1.5 bg-green-500 hover:bg-green-600 text-slate-950 font-extrabold text-[10px] uppercase rounded cursor-pointer"
                  >
                    Kiểm định cổng thanh toán (Giả lập Exporter cút cọc thành công)
                  </button>
                </div>
              </div>
            )}

            {escrowStatus === 'đã_khóa_tiền_cọc_35%' && (
              <div className="space-y-3">
                <div className="p-3 bg-red-950/40 border border-red-500/20 rounded-lg text-[11px] text-red-300 leading-normal text-left">
                  🔒 Tiền cọc đã được chốt giữ uy tín tuyệt đối tại két Agribank. Thương lái không thể bỏ cọc, nông hộ sòng phẳng dưỡng sầu cắt bói không mớp vai.
                </div>
                
                <button
                  id="release-deposit-escrow-btn"
                  onClick={handleReleaseEscrow}
                  className="w-full py-2 bg-yellow-505 bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold text-xs rounded transition-all cursor-pointer"
                >
                  Xác nhận hái bói hoàn tất & Giải ngân tiền cọc
                </button>
              </div>
            )}

            {escrowStatus === 'đã_giải_ngân' && (
              <div className="p-3.5 bg-green-950/50 border border-green-500/30 rounded-lg text-[11px] text-green-300 leading-normal text-left flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-slate-100">Ví gặt đã giải ngân: +{(depositAmount).toLocaleString('vi-VN')} đ</strong>
                  <p className="text-[10px] text-green-400 mt-1">
                    Giao kết vẹn mười. Ghi hồ sơ hoàn vách đã lưu vào nhật ký điểm uy tín, tăng thâm niên giao lưu của nông gia lên A+ vàng lộc.
                  </p>
                </div>
              </div>
            )}

          </div>

          <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs space-y-2 text-left">
            <strong className="text-slate-800 font-bold block flex items-center gap-1">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Chức năng Đại diện HTX (BÊN B)</span>
            </strong>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Các hộ nông dân nhỏ được sáp nhập trực tiếp ký với đại diện hợp tác xã địa phương. Điều này giúp xoá sổ rào cản thao tác công nghệ, đồng thời gom thành khối lượng sỉ lớn hấp thụ các container xuất khẩu lạnh chính ngạch.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
