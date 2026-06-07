import React from 'react';
import { Sprout, LogOut, User, Building, Settings, ShoppingBag } from 'lucide-react';
import { Role } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: Role;
  setUserRole: (role: Role) => void;
  userName: string | null;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  userName,
  onLogout,
  onOpenAuth
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-green-50/80 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('trang_chu')}>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md shadow-green-200">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-green-900 flex items-center">
                Nhà nông <span className="text-yellow-500 font-extrabold ml-1 drop-shadow-xs">Hết Sầu</span>
              </span>
              <span className="text-[10px] block text-green-700 tracking-wider font-medium uppercase">
                Số hóa nguồn sầu riêng Việt
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { id: 'trang_chu', label: 'Trang chủ' },
              { id: 'ban_do', label: 'Bản đồ nguồn cung' },
              { id: 'du_bao', label: 'Dự báo & Báo cáo' },
              { id: 'san_giao_dich', label: 'Sàn & Kết nối' },
              { id: 'tin_tuc', label: 'Tin tức & Kết nối' },
              { id: 'thanh_toan', label: 'Thanh toán bảo chứng' },
              { id: 'gioi_thieu', label: 'Giới thiệu & BMC' }
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-green-600 shadow-sm shadow-green-100'
                      : 'text-slate-600 hover:text-green-600 hover:bg-green-50/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {userRole !== 'giao_dien_ngoai' && (
              <button
                id="nav-link-dashboard"
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-sans text-sm font-semibold transition-all duration-300 flex items-center space-x-1 border ${
                  activeTab === 'dashboard'
                    ? 'text-green-700 bg-green-50 border-green-200 shadow-xs'
                    : 'text-emerald-700 border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50'
                }`}
              >
                <Settings className="w-4 h-4 animate-spin-slow" />
                <span>Bảng điều khiển</span>
              </button>
            )}
          </div>

          {/* User Auth Info & Role Switcher */}
          <div className="flex items-center space-x-3">
            {/* Quick Demo Simulator Toggler */}
            <div className="hidden lg:flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs">
              <span className="px-2 text-slate-500 font-medium">Vai trò demo:</span>
              <button
                id="role-switch-guest"
                onClick={() => {
                  setUserRole('giao_dien_ngoai');
                  onLogout();
                }}
                className={`px-2 py-1.5 rounded-lg font-medium transition-all ${
                  userRole === 'giao_dien_ngoai'
                    ? 'bg-white text-slate-800 shadow-xs ring-1 ring-black/5'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Khách
              </button>
              <button
                id="role-switch-farmer"
                onClick={() => {
                  setUserRole('nha_vuon');
                  // Auto log in as sáu đức if not logged in
                  if (!userName) onOpenAuth();
                }}
                className={`px-2 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1 ${
                  userRole === 'nha_vuon'
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'text-green-700 hover:bg-green-50/20'
                }`}
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>Nông Dân</span>
              </button>
              <button
                id="role-switch-enterprise"
                onClick={() => {
                  setUserRole('doanh_nghiep');
                  if (!userName) onOpenAuth();
                }}
                className={`px-2 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1 cursor-pointer ${
                  userRole === 'doanh_nghiep'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-amber-700 hover:bg-amber-50/20'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Doanh Nghiệp</span>
              </button>
            </div>

            {userName ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-right">
                  <span className="text-xs text-slate-400 block font-sans">Xin chào,</span>
                  <span className="text-sm font-semibold text-slate-700 block font-sans max-w-[120px] truncate">{userName}</span>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold border border-green-200">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <button
                  id="navbar-logout-btn"
                  onClick={onLogout}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                id="navbar-login-btn"
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-white bg-green-700 hover:bg-green-800 transition-all font-sans font-semibold text-sm shadow-sm hover:shadow-green-200 cursor-pointer"
              >
                Đăng nhập / Đăng ký
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
