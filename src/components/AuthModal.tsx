import React, { useState } from 'react';
import { Sprout, Building, Users, ShieldCheck, Mail, Lock, Phone, User, Eye, EyeOff, Sparkles, HelpCircle } from 'lucide-react';
import { Role } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (name: string, role: Role) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'nha_vuon' | 'doanh_nghiep'>('nha_vuon');

  // Input states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Suggested quick logins for testing the simulator easily
  const quickLogins = [
    { name: 'Chú Sáu Đức', role: 'nha_vuon' as const, desc: 'Bà con nông dân Tiền Giang' },
    { name: 'Tập đoàn VinaFruit', role: 'doanh_nghiep' as const, desc: 'Tập đoàn xuất khẩu nông sản lớn' }
  ];

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!name || !phone || !password) {
        alert('Vui lòng điền đầy đủ các thông tin đăng ký!');
        return;
      }
      onLoginSuccess(name, selectedRole);
    } else {
      if (!phone || !password) {
        alert('Vui lòng nhập số điện thoại và mật khẩu đăng nhập!');
        return;
      }
      // Simple lookup simulation
      const detectedName = selectedRole === 'nha_vuon' ? 'Chú Sáu Đức' : 'Tập đoàn VinaFruit';
      onLoginSuccess(detectedName, selectedRole);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 flex-row md:flex-row relative animate-scale-up">
        {/* Close Button absolute */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full cursor-pointer z-50"
        >
          ✕
        </button>

        {/* LEFT COLUMN: Giao diện Split-Screen với ảnh Poster sinh động của dự án */}
        <div className="md:col-span-5 bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 text-white p-8 space-y-6 flex flex-col justify-between align-middle text-left relative overflow-hidden">
          {/* Subtle background graphic */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white animate-spin-slow"></div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-500 rounded-xl text-white">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight uppercase">
                Nhà nông Hết Sầu
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-medium text-2xl tracking-normal leading-tight text-green-300">
                Ủng hộ chuyển đổi số nông sản sạch miền Tây
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Chúng tôi áp dụng mô hình công nghệ chuỗi cung ứng minh bạch để kết nối nông dân với doanh nghiệp xuất khẩu trực tiếp 1-1, tối ưu hóa lợi ích xã hội.
              </p>
            </div>
          </div>

          {/* Quick core values bullet points inside poster */}
          <div className="relative z-10 space-y-3.5 pt-4 border-t border-green-800 text-[11px] font-sans">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Giao dịch an toàn mã khóa số</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span>Hệ thống chấm điểm Credit Scoring</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Users className="w-4 h-4 text-green-400" />
              <span>Được bảo trợ bởi Chi cục khuyến nông</span>
            </div>
          </div>

          <div className="relative z-10 text-[10px] text-slate-400 font-sans mt-6">
            <span>© 2026 nhanonghetsau.vn. Bảo lưu mọi quyền hành.</span>
          </div>
        </div>

        {/* RIGHT COLUMN: CHỨA FORM ĐĂNG NHẬP / ĐĂNG KÝ SẠCH SẼ, HIỆU QUẢ */}
        <div className="md:col-span-7 p-8 space-y-6 text-left flex flex-col justify-center">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl text-slate-900">
              {isRegister ? 'Đăng Ký Thành Viên' : 'Chào Mừng Bạn Quay Lại'}
            </h2>
            <p className="text-slate-500 text-xs font-sans">
              Chọn vai trò đúng và tiếp tục tiến hành các tính năng chuyên biệt của dự án.
            </p>
          </div>

          {/* Role selection tab buttons */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold font-sans">
            <button
              onClick={() => setSelectedRole('nha_vuon')}
              className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                selectedRole === 'nha_vuon'
                  ? 'bg-white text-green-800 shadow-xs border border-green-100'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>Tôi là Nhà Vườn</span>
            </button>
            <button
              onClick={() => setSelectedRole('doanh_nghiep')}
              className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                selectedRole === 'doanh_nghiep'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Tôi là Doanh Nghiệp</span>
            </button>
          </div>

          {/* Normal Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            {isRegister && (
              <div>
                <label className="text-slate-500 font-semibold block mb-1">Tên của bạn / Tên Công ty</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={selectedRole === 'nha_vuon' ? 'Vườn Sầu Riêng Chú Ba...' : 'Công ty Cổ phần VinaFruit...'}
                    className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-slate-500 font-semibold block mb-1">Số điện thoại liên lạc</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0982 907 018..."
                  className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-500 font-semibold block mb-1">Mật khẩu khóa số</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-green-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="submit-auth-btn"
              type="submit"
              className={`w-full py-3 text-white text-sm font-semibold rounded-xl cursor-pointer shadow-md ${
                selectedRole === 'nha_vuon' ? 'bg-green-700 hover:bg-green-800' : 'bg-blue-600 hover:bg-blue-700/90'
              }`}
            >
              {isRegister ? 'Đăng Ký Tài Khoản Mới' : 'Đăng Nhập Ngay'}
            </button>
          </form>

          {/* Quick Simulator Account logs to allow convenient toggling */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans text-xs space-y-2">
            <span className="font-bold text-slate-700 block text-[11px] flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Chốt nhanh tài khoản thử nghiệm:</span>
            </span>

            <div className="grid grid-cols-2 gap-2">
              {quickLogins.map((ql, idx) => (
                <button
                  id={`quick-login-${idx}`}
                  key={idx}
                  onClick={() => {
                    onLoginSuccess(ql.name, ql.role);
                  }}
                  className="p-2 border border-slate-300 rounded-lg bg-white text-left hover:border-green-500 hover:bg-green-50/20"
                >
                  <strong className="block text-slate-800 text-[11px] font-sans truncate">{ql.name}</strong>
                  <span className="text-[9px] text-slate-400 block truncate">{ql.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 font-sans">
            {isRegister ? 'Bạn đã có tài khoản?' : 'Bạn là thành viên mới?'}{' '}
            <button
              id="switch-auth-mode-btn"
              onClick={() => setIsRegister(!isRegister)}
              className="text-green-700 font-bold hover:underline"
            >
              {isRegister ? 'Đăng nhập tại đây' : 'Thành viên mới đăng ký ngay'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
