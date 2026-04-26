import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Award, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2,
  ExternalLink,
  Instagram,
  FileText,
  Calendar,
  Shield,
  Coffee,
  Globe,
  Menu,
  X,
  ChevronRight,
  Settings,
  Plus,
  Trash2,
  Save,
  Upload,
  Lock,
  Eye,
  LogOut
} from 'lucide-react';

type Section = 'home' | 'about' | 'experience' | 'portfolio' | 'contact' | 'admin';
type AdminTab = 'general' | 'experience' | 'portfolio';

interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  desc: string;
  tags: string[];
  type: 'work' | 'award';
}

interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  images: string[]; // Base64 strings
}

interface SiteConfig {
  home: {
    badge: string;
    greeting: string;
    englishName: string;
    pitch: string;
    bgImage: string;
  };
  about: {
    profileImage: string;
    name: string;
    title: string;
  };
  contact: {
    email: string;
    phone: string;
    instagram: string;
    linkedin: string;
    blog: string;
  };
}

const DEFAULT_CONFIG: SiteConfig = {
  home: {
    badge: "Excellence in Event Strategy",
    greeting: "권영지",
    englishName: "GWON YEONGJI",
    pitch: "완벽한 현장 운영으로 한경미디어그룹의 파트너가 됩니다.",
    bgImage: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1920&q=80"
  },
  about: {
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    name: "권 영 지",
    title: "Hankyung Event Strategy & Operations"
  },
  contact: {
    email: "zz9005@naver.com",
    phone: "010-2844-3957",
    instagram: "@00ng_z1",
    linkedin: "Professional Network",
    blog: "Insights & Work"
  }
};

// Internal component for Portfolio images
const PortfolioImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      setCurrentIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-hankyung-navy/5">
        <FileText size={48} className="text-slate-200" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${currentIndex}-${images[currentIndex]}`}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1 z-10">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-4 bg-hankyung-yellow' : 'w-1 bg-white/40'}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [adminTab, setAdminTab] = useState<AdminTab>('general');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Site Data State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  // Initial Data (Updated to match latest user specifications)
  const initialExperience: ExperienceItem[] = [
    {
      id: '1',
      title: "비즈니스 총괄 운영 (구공카페)",
      role: "실무경력 / 매장 경영 및 마케팅",
      desc: "2년간 카페를 직접 운영하며 CS 대응, 마케팅, 재고 및 예산 관리를 경험했습니다. 책임감 있는 오너십으로 행사의 모든 디테일을 관리합니다.",
      tags: ["비즈니스", "CS 전문성", "운영 책임"],
      type: 'work'
    },
    {
      id: '2',
      title: "인천국제공항보안 (특수경비)",
      role: "실무경력 / 현장 대응 및 안전 관리",
      desc: "인천공항 보안 최전선에서 현장 긴급 대응 및 승객 안전 관리를 수행했습니다. 철저한 원칙 준수와 문제 해결 능력을 바탕으로 합니다.",
      tags: ["안전관리", "현장대응", "원칙준수"],
      type: 'work'
    },
    {
      id: '3',
      title: "리얼월드 '대구경북하다'",
      role: "주요 성과 / 장려상 수상",
      desc: "인터랙티브 관광 게임 콘텐츠 기획 설계 및 제작에 참여하여 장려상을 수상했습니다.",
      tags: ["콘텐츠기획", "디지털설계", "장려상"],
      type: 'award'
    },
    {
      id: '4',
      title: "대구스마트시민홍보단 2기",
      role: "주요 성과 / 최우수상 수상",
      desc: "재난안전에 대한 해결방안 제시 및 홍보 활동을 통해 최우수상을 수상했습니다.",
      tags: ["재난안전", "기획력", "최우수상"],
      type: 'award'
    },
    {
      id: '5',
      title: "캠버 캡스톤디자인",
      role: "주요 성과 / 최우수상 수상",
      desc: "청도 캠핑코스 여행 기획 및 참가자 동선 최적화 능력을 인정받아 최우수상을 수상했습니다.",
      tags: ["여행기획", "동선최적화", "최우수상"],
      type: 'award'
    }
  ];

  const initialPortfolio: PortfolioItem[] = [
    {
      id: 'p1',
      title: "제주 여행 예산 기획 프로젝트",
      subtitle: "EXPENDITURE STRATEGY",
      desc: "철저한 예산 관리와 자원 배분의 정석을 보여주는 기획안입니다.",
      images: []
    },
    {
      id: 'p2',
      title: "코타키나발루 테마 여행 스케줄링",
      subtitle: "OPERATIONS LOGISTICS",
      desc: "분 단위 현지 조율과 동선 설계를 담은 운영 가이드입니다.",
      images: []
    },
    {
      id: 'p3',
      title: "MZ세대 타겟 패키지 제안",
      subtitle: "MARKETING ANALYSIS",
      desc: "데이터 기반의 트렌드 분석과 상품성 도출 과정을 담은 전략 기획서입니다.",
      images: []
    }
  ];

  const [experienceData, setExperienceData] = useState<ExperienceItem[]>(initialExperience);
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>(initialPortfolio);

  // Persistence
  useEffect(() => {
    const savedConfig = localStorage.getItem('hankyung_site_config');
    const savedExp = localStorage.getItem('hankyung_experience');
    const savedPort = localStorage.getItem('hankyung_portfolio');
    const savedAdmin = sessionStorage.getItem('hankyung_admin_status');

    if (savedConfig) setSiteConfig(JSON.parse(savedConfig));
    if (savedExp) setExperienceData(JSON.parse(savedExp));
    if (savedPort) setPortfolioData(JSON.parse(savedPort));
    if (savedAdmin === 'true') setIsAdmin(true);
  }, []);

  const saveAllData = () => {
    localStorage.setItem('hankyung_site_config', JSON.stringify(siteConfig));
    localStorage.setItem('hankyung_experience', JSON.stringify(experienceData));
    localStorage.setItem('hankyung_portfolio', JSON.stringify(portfolioData));
    alert('모든 변경 사항이 저장되었습니다.');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      setIsAdmin(true);
      setShowLogin(false);
      sessionStorage.setItem('hankyung_admin_status', 'true');
      setLoginError(false);
      setPassword('');
      navigateTo('admin');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('hankyung_admin_status');
    navigateTo('home');
  };

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Experience' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'contact', name: 'Contact' },
    ...(isAdmin ? [{ id: 'admin', name: 'Admin Control' }] : [])
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  const navigateTo = (section: Section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, portfolioId: string) => {
    const files = e.target.files;
    if (!files) return;

    const readers = Array.from(files).map((file: File) => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setPortfolioData(prev => {
        const newData = prev.map(p => 
          p.id === portfolioId ? { ...p, images: [...(p.images || []), ...results] } : p
        );
        return [...newData]; // Force new reference
      });
    }).catch(err => {
      console.error("Image processing error:", err);
      alert("이미지 처리 중 오류가 발생했습니다.");
    });
  };

  const handleGeneralImageUpload = (e: React.ChangeEvent<HTMLInputElement>, section: keyof SiteConfig, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSiteConfig(prev => {
        const newConfig = {
          ...prev,
          [section]: {
            ...(prev[section] as any),
            [field]: reader.result as string
          }
        } as SiteConfig;
        return newConfig;
      });
    };
    reader.readAsDataURL(file);
  };

  // Removed redundant internal definition
  
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-hankyung-yellow selection:text-hankyung-navy">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-hankyung-navy py-4 shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div 
            className="cursor-pointer text-xl font-black tracking-tighter text-white"
            onClick={() => navigateTo('home')}
          >
            한경미디어 <span className="text-hankyung-yellow underline underline-offset-4">그룹</span>
          </div>
          
          <div className="hidden space-x-1 md:flex">
            {sections.map((item) => (
              <button 
                key={item.id} 
                onClick={() => navigateTo(item.id as Section)}
                className={`px-4 py-2 text-sm font-bold tracking-tight transition-all rounded-md ${
                  activeSection === item.id 
                  ? 'bg-hankyung-yellow text-hankyung-navy' 
                  : 'text-white hover:bg-white/10'
                }`}
              >
                {item.name.toUpperCase()}
              </button>
            ))}
          </div>

          <button 
            className="text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-hankyung-navy pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {sections.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => navigateTo(item.id as Section)}
                  className={`border-b border-white/10 py-4 text-left text-2xl font-black ${
                    activeSection === item.id ? 'text-hankyung-yellow' : 'text-white'
                  }`}
                >
                  {item.name.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div key="home" {...fadeInUp} className="relative flex min-h-[90vh] flex-col items-center justify-center bg-hankyung-navy px-6 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-15">
                <img 
                  src={siteConfig.home.bgImage} 
                  alt="Background" 
                  className="h-full w-full object-cover scale-110 motion-safe:animate-pulse"
                />
              </div>
              <div className="relative z-10 max-w-4xl">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 inline-flex items-center rounded-full bg-hankyung-yellow px-6 py-2 text-xs font-black text-hankyung-navy uppercase tracking-[0.2em] shadow-lg shadow-hankyung-yellow/20"
                >
                  {siteConfig.home.badge}
                </motion.div>
                <h1 className="mb-6 text-6xl font-black tracking-tighter text-white md:text-9xl leading-[0.9]">
                  {siteConfig.home.greeting} <br className="md:hidden" />
                  <span className="text-hankyung-yellow">{siteConfig.home.englishName}</span>
                </h1>
                <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-white/90 md:text-3xl leading-relaxed">
                  "{siteConfig.home.pitch}"
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <button onClick={() => navigateTo('portfolio')} className="group flex items-center gap-3 rounded-full bg-hankyung-yellow px-12 py-5 font-black text-hankyung-navy shadow-2xl transition-all hover:bg-white hover:scale-105 active:scale-95">
                    PORTFOLIO <ChevronRight size={20} className="group-hover:translate-x-1" />
                  </button>
                  <button onClick={() => navigateTo('about')} className="rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md px-12 py-5 font-black text-white transition-all hover:bg-white hover:text-hankyung-navy">
                    WHO I AM
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'about' && (
            <motion.div key="about" {...fadeInUp} className="mx-auto max-w-7xl py-24 px-6">
              <div className="mb-20 flex flex-col items-center text-center">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-hankyung-navy opacity-50">Profile Analysis</span>
                <h2 className="mt-4 text-5xl font-black text-slate-900 md:text-7xl">EXPER<span className="text-hankyung-yellow decoration-black underline decoration-[8px] underline-offset-8">TISE</span></h2>
              </div>

              <div className="grid gap-20 lg:grid-cols-12 items-start">
                <div className="lg:col-span-5 sticky top-32">
                  <div className="relative overflow-hidden rounded-[3rem] bg-slate-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-[12px] border-white ring-1 ring-slate-200">
                    <img 
                      src={siteConfig.about.profileImage} 
                      alt="권영지" 
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hankyung-navy via-hankyung-navy/90 to-transparent p-10 text-white backdrop-blur-sm">
                      <h3 className="text-4xl font-black tracking-tighter">{siteConfig.about.name}</h3>
                      <p className="mt-2 text-sm font-bold text-hankyung-yellow uppercase tracking-[0.2em] opacity-90">{siteConfig.about.title}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-12 lg:col-span-7">
                  <div className="space-y-8">
                    <div className="group rounded-[2.5rem] bg-slate-50 p-10 transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 border border-slate-100">
                      <div className="mb-12 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hankyung-navy text-hankyung-yellow shadow-lg shadow-hankyung-navy/20">
                          <Award size={28} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight">주요 성과 및 경력 사항</h4>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Key Success & Career History</p>
                        </div>
                      </div>
                      <div className="space-y-8 relative overflow-hidden">
                        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-200/50" />
                        {experienceData.map((exp, idx) => (
                          <div key={exp.id} className="relative pl-14 group/item">
                            <div className={`absolute left-4 top-1.5 h-4 w-4 rounded-full border-4 border-white shadow-md z-10 ${exp.type === 'award' ? 'bg-hankyung-yellow' : 'bg-hankyung-navy'}`} />
                            <div>
                              <div className="flex flex-wrap items-center gap-3 mb-1">
                                <p className="text-lg font-black text-slate-900 group-hover/item:text-blue-700 transition-colors uppercase tracking-tight">{exp.title}</p>
                                <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${exp.type === 'award' ? 'bg-hankyung-yellow/20 text-hankyung-navy' : 'bg-slate-200 text-slate-500'}`}>
                                  {exp.type === 'award' ? 'Success' : 'Career'}
                                </span>
                              </div>
                              <p className="text-sm font-bold text-hankyung-navy opacity-60 italic">{exp.role}</p>
                              <p className="text-sm text-slate-500 mt-2 leading-relaxed font-medium">{exp.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[2.5rem] bg-hankyung-navy p-10 shadow-2xl text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-hankyung-yellow/5 rounded-full -mr-32 -mt-32" />
                      <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hankyung-yellow text-hankyung-navy">
                          <CheckCircle2 size={28} />
                        </div>
                        <h4 className="text-2xl font-black tracking-tight">Core Competencies</h4>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        {[
                          { title: "현장 운영 실무", desc: "카페 경영 및 공항 보안 현장 동선 관리 경력" },
                          { title: "기획 및 수상 역량", desc: "공립 홍보단 최우수 및 다수의 기획 대회 수상" },
                          { title: "위기 대응력", desc: "공항 특수 보안 현장 돌발 상황 통제 능력" },
                          { title: "비즈니스 마인드", desc: "자사 직접 경영을 통한 수익 및 고객 관리 경험" }
                        ].map((item, i) => (
                          <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <p className="text-hankyung-yellow font-black text-base mb-1">{item.title}</p>
                            <p className="text-xs text-white/50 font-medium">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[2.5rem] bg-slate-50 p-10 border-2 border-slate-100 ring-4 ring-slate-50">
                      <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-hankyung-navy border border-slate-100">
                          <Shield size={28} />
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 tracking-tight">강점 및 자격</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {["TOEIC Speaking IH", "국내여행안내사", "TOPAS 항공발권 2급", "컴퓨터활용능력 2급", "현장 대응", "ESG 실무"].map(tag => (
                          <div key={tag} className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm border border-slate-100 hover:border-hankyung-yellow transition-colors cursor-default">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'experience' && (
            <motion.div key="experience" {...fadeInUp} className="mx-auto max-w-7xl py-24 px-6">
              <div className="mb-20 text-center">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-hankyung-navy opacity-50">Proven Timeline</span>
                <h2 className="mt-4 text-5xl font-black text-slate-900 md:text-7xl">EXPERI<span className="text-hankyung-yellow decoration-hankyung-navy underline decoration-[8px] underline-offset-8">ENCE</span></h2>
              </div>

              <div className="relative space-y-12 before:absolute before:left-[18px] before:top-2 before:h-[95%] before:w-[2px] before:bg-slate-100 md:before:left-1/2 md:before:-translate-x-1/2">
                {experienceData.map((exp, idx) => (
                  <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative md:flex md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="hidden md:block md:w-1/2" />
                    <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full bg-hankyung-navy text-hankyung-yellow shadow-xl shadow-hankyung-navy/20 z-10 md:left-1/2 md:-translate-x-1/2">
                      {exp.type === 'work' ? <Briefcase size={16} /> : <Award size={16} />}
                    </div>
                    <div className={`pl-12 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-0 md:pr-12 md:text-right' : 'md:pl-12'}`}>
                       <div className="overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-50 transition-all hover:border-hankyung-yellow group">
                          <span className={`inline-block rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest mb-4 ${exp.type === 'work' ? 'bg-slate-100 text-slate-600' : 'bg-hankyung-yellow/20 text-hankyung-navy'}`}>
                            {exp.type === 'work' ? 'Professional' : 'Excellence'}
                          </span>
                          <h3 className="text-2xl font-black text-slate-900 group-hover:text-hankyung-navy transition-colors">{exp.title}</h3>
                          <p className="mt-1 font-bold text-hankyung-navy/60">{exp.role}</p>
                          <p className="mt-4 text-slate-500 leading-relaxed text-sm md:text-base">
                            {exp.desc}
                          </p>
                          <div className={`mt-6 flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                            {exp.tags.map(tag => (
                              <span key={tag} className="rounded-lg bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-400 group-hover:text-hankyung-navy transition-colors">
                                #{tag}
                              </span>
                            ))}
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'portfolio' && (
            <motion.div key="portfolio" {...fadeInUp} className="mx-auto max-w-7xl py-24 px-6">
              <div className="mb-20 text-center">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-hankyung-navy opacity-50">Creative Assets</span>
                <h2 className="mt-4 text-5xl font-black text-slate-900 md:text-7xl">PORT<span className="text-hankyung-yellow decoration-hankyung-navy underline decoration-[8px] underline-offset-8">FOLIO</span></h2>
              </div>

              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {portfolioData.map((item) => (
                  <div key={item.id} className="group relative flex flex-col overflow-hidden rounded-[3rem] border border-slate-100 bg-white shadow-xl shadow-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden group-hover:cursor-pointer">
                      <PortfolioImageGallery images={item.images} />
                      {item.images.length > 1 && (
                        <div className="absolute top-4 right-4 rounded-full bg-hankyung-navy/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                          GALLERY
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-10">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-hankyung-navy opacity-40">{item.subtitle}</span>
                      <h4 className="mt-3 text-2xl font-black text-slate-900 leading-tight group-hover:text-hankyung-navy transition-colors">{item.title}</h4>
                      <p className="mt-4 text-sm leading-relaxed text-slate-500">
                        {item.desc}
                      </p>
                      <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-xs font-black text-slate-300">Strategy & Data</span>
                         <ChevronRight className="text-slate-200 group-hover:text-hankyung-yellow transition-all group-hover:translate-x-1" size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'contact' && (
             <motion.div key="contact" {...fadeInUp} className="mx-auto max-w-7xl py-24 px-6">
                <div className="grid gap-20 lg:grid-cols-2 items-center">
                   <div className="lg:py-12">
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-hankyung-navy opacity-50">Connection Point</span>
                      <h2 className="mt-6 text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                         한경미디어 <br />
                         <span className="text-hankyung-navy underline underline-offset-[16px] decoration-hankyung-yellow decoration-[10px]">최고의 기획</span>을 <br />
                         함께 그려냅니다.
                      </h2>
                      <p className="mt-12 text-xl text-slate-500 max-w-md leading-relaxed font-medium">
                         현장의 디테일과 한경의 비전이 만나는 그곳에, 실무 중심의 기획자 권영지가 있습니다.
                      </p>
                      
                      <div className="mt-16 space-y-8">
                         <div className="flex items-center gap-8 group cursor-pointer">
                            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-hankyung-navy text-hankyung-yellow shadow-[0_12px_24px_-8px_rgba(0,43,91,0.3)] transition-all group-hover:scale-110">
                               <Mail size={28} />
                            </div>
                            <div>
                               <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Business Email</span>
                               <a href={`mailto:${siteConfig.contact.email}`} className="block text-2xl font-black text-slate-900 transition-colors group-hover:text-hankyung-navy">{siteConfig.contact.email}</a>
                            </div>
                         </div>

                         <div className="flex items-center gap-8 group cursor-pointer">
                            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-hankyung-navy text-hankyung-yellow shadow-[0_12px_24px_-8px_rgba(0,43,91,0.3)] transition-all group-hover:scale-110">
                               <Phone size={28} />
                            </div>
                            <div>
                               <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Direct Line</span>
                               <a href={`tel:${siteConfig.contact.phone.replace(/-/g, '')}`} className="block text-2xl font-black text-slate-900 transition-colors group-hover:text-hankyung-navy">{siteConfig.contact.phone}</a>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="relative">
                      <div className="absolute -inset-10 bg-hankyung-yellow/5 rounded-[5rem] -rotate-3 blur-3xl opacity-50" />
                      <div className="relative rounded-[4rem] bg-hankyung-navy p-12 text-white shadow-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 shrink-0" />
                        <h3 className="text-3xl font-black mb-10 tracking-tight">Digital Access</h3>
                        <div className="grid gap-6">
                           {[
                             { name: 'Instagram', icon: Instagram, href: '#', val: siteConfig.contact.instagram },
                             { name: 'LinkedIn', icon: Globe, href: '#', val: siteConfig.contact.linkedin },
                             { name: 'Blog', icon: FileText, href: '#', val: siteConfig.contact.blog }
                           ].map(item => (
                             <a key={item.name} href={item.href} className="group flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/10 transition-all hover:bg-white hover:text-hankyung-navy">
                                <div className="flex items-center gap-5">
                                   <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-hankyung-navy/5 transition-colors">
                                      <item.icon size={22} />
                                   </div>
                                   <div>
                                      <span className="block text-xs font-black opacity-40 uppercase tracking-widest">{item.name}</span>
                                      <span className="font-bold">{item.val}</span>
                                   </div>
                                </div>
                                <ExternalLink size={20} className="opacity-20 group-hover:opacity-100" />
                             </a>
                           ))}
                           <button className="mt-8 w-full bg-hankyung-yellow text-hankyung-navy font-black py-6 rounded-[2rem] shadow-2xl shadow-hankyung-yellow/30 hover:scale-[1.02] active:scale-95 transition-all text-lg flex items-center justify-center gap-3">
                              DOWNLOAD RESUME <FileText size={22} />
                           </button>
                        </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}

          {activeSection === 'admin' && isAdmin && (
            <motion.div key="admin" {...fadeInUp} className="mx-auto max-w-7xl py-24 px-6">
                <div className="mb-16 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-10 gap-6">
                   <div>
                      <h2 className="text-5xl font-black text-slate-900 tracking-tighter">ADMIN <span className="text-hankyung-navy opacity-20">CONTROL</span></h2>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {[
                          { id: 'general', label: 'Identity & Brand' },
                          { id: 'experience', label: 'Experience Log' },
                          { id: 'portfolio', label: 'Portfolio Assets' }
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setAdminTab(tab.id as AdminTab)}
                            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                              adminTab === tab.id 
                              ? 'bg-hankyung-navy text-hankyung-yellow shadow-lg' 
                              : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                   </div>
                   <div className="flex gap-4 w-full md:w-auto">
                      <button 
                        onClick={saveAllData}
                        className="flex-1 md:flex-none flex items-center justify-center gap-3 rounded-2xl bg-hankyung-navy px-8 py-4 font-black text-hankyung-yellow shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm"
                      >
                         <Save size={20} /> PUBLISH CHANGES
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="rounded-2xl border-2 border-slate-200 px-6 py-4 font-black text-slate-400 hover:bg-slate-50 transition-all text-sm"
                      >
                         <LogOut size={20} />
                      </button>
                   </div>
                </div>

                {adminTab === 'general' && (
                  <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-8">
                      <div className="rounded-[2.5rem] bg-slate-50 p-10 border-2 border-slate-100">
                        <h3 className="text-xl font-black text-hankyung-navy mb-8 flex items-center gap-3">
                          <Coffee size={20} className="text-hankyung-yellow" /> Home Section
                        </h3>
                        <div className="space-y-6">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Badge Text</label>
                              <input 
                                className="w-full rounded-xl border border-slate-200 p-3 text-sm font-bold focus:outline-none focus:border-hankyung-navy"
                                value={siteConfig.home.badge}
                                onChange={(e) => setSiteConfig(prev => ({...prev, home: {...prev.home, badge: e.target.value}}))}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Main Greeting</label>
                              <input 
                                className="w-full rounded-xl border border-slate-200 p-3 text-sm font-black focus:outline-none focus:border-hankyung-navy"
                                value={siteConfig.home.greeting}
                                onChange={(e) => setSiteConfig(prev => ({...prev, home: {...prev.home, greeting: e.target.value}}))}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">English Name (Large Display)</label>
                            <input 
                              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-black focus:outline-none focus:border-hankyung-navy text-blue-700"
                              value={siteConfig.home.englishName}
                              onChange={(e) => setSiteConfig(prev => ({...prev, home: {...prev.home, englishName: e.target.value}}))}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Main Value Pitch</label>
                            <textarea 
                              className="w-full min-h-[100px] rounded-xl border border-slate-200 p-3 text-sm font-bold focus:outline-none focus:border-hankyung-navy"
                              value={siteConfig.home.pitch}
                              onChange={(e) => setSiteConfig(prev => ({...prev, home: {...prev.home, pitch: e.target.value}}))}
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Background Image</label>
                            <div className="flex items-center gap-4">
                              <div className="h-16 w-24 rounded-lg overflow-hidden border border-slate-200 bg-white">
                                <img src={siteConfig.home.bgImage} className="w-full h-full object-cover" />
                              </div>
                              <label className="cursor-pointer flex-1 rounded-xl bg-white border border-slate-200 px-4 py-3 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all text-center">
                                <Upload size={14} className="inline mr-2" /> UPLOAD NEW BG
                                <input type="file" className="hidden" onChange={(e) => handleGeneralImageUpload(e, 'home', 'bgImage')} accept="image/*" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[2.5rem] bg-slate-50 p-10 border-2 border-slate-100">
                        <h3 className="text-xl font-black text-hankyung-navy mb-8 flex items-center gap-3">
                          <Shield size={20} className="text-hankyung-yellow" /> About Profile
                        </h3>
                        <div className="space-y-6">
                           <div className="flex items-center gap-8">
                              <div className="h-32 w-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100 shrink-0">
                                <img src={siteConfig.about.profileImage} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 space-y-4">
                                <label className="cursor-pointer block rounded-xl bg-hankyung-navy px-6 py-4 text-xs font-black text-hankyung-yellow hover:scale-105 transition-all text-center">
                                  <Upload size={14} className="inline mr-2" /> CHANGE PHOTO
                                  <input type="file" className="hidden" onChange={(e) => handleGeneralImageUpload(e, 'about', 'profileImage')} accept="image/*" />
                                </label>
                                <p className="text-[10px] font-bold text-slate-400 px-2 italic">Recommended: Aspect ratio 4:5 for best display.</p>
                              </div>
                           </div>
                           <div className="grid gap-4 md:grid-cols-2">
                             <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Local Name</label>
                               <input 
                                 className="w-full rounded-xl border border-slate-200 p-3 text-sm font-black focus:outline-none focus:border-hankyung-navy"
                                 value={siteConfig.about.name}
                                 onChange={(e) => setSiteConfig(prev => ({...prev, about: {...prev.about, name: e.target.value}}))}
                               />
                             </div>
                             <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Professional Title</label>
                               <input 
                                 className="w-full rounded-xl border border-slate-200 p-3 text-sm font-bold focus:outline-none focus:border-hankyung-navy"
                                 value={siteConfig.about.title}
                                 onChange={(e) => setSiteConfig(prev => ({...prev, about: {...prev.about, title: e.target.value}}))}
                               />
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="rounded-[2.5rem] bg-hankyung-navy p-10 shadow-2xl text-white">
                        <h3 className="text-xl font-black text-hankyung-yellow mb-8 flex items-center gap-3 underline decoration-white/20 underline-offset-8">
                          <Globe size={20} /> Digital & Contact Info
                        </h3>
                        <div className="space-y-6">
                           <div className="grid gap-6">
                             {[
                               { label: 'Business Email', key: 'email', icon: Mail },
                               { label: 'Direct Phone', key: 'phone', icon: Phone },
                               { label: 'Instagram Handle', key: 'instagram', icon: Instagram },
                               { label: 'LinkedIn Title', key: 'linkedin', icon: Globe },
                               { label: 'Blog Description', key: 'blog', icon: FileText },
                             ].map(field => (
                               <div key={field.key} className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-white/40 ml-2 flex items-center gap-2">
                                   <field.icon size={10} /> {field.label}
                                 </label>
                                 <input 
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:bg-white/10 focus:border-hankyung-yellow transition-all"
                                   value={(siteConfig.contact as any)[field.key]}
                                   onChange={(e) => setSiteConfig(prev => ({...prev, contact: {...prev.contact, [field.key]: e.target.value}}))}
                                 />
                               </div>
                             ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {adminTab === 'experience' && (
                  <div className="space-y-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-black text-hankyung-navy tracking-tight">Timeline Management</h3>
                      <button 
                        onClick={() => setExperienceData([...experienceData, { id: Date.now().toString(), title: "New Career Item", role: "Position / Achievement", desc: "Detailed breakdown of responsibilities and outcomes.", tags: [], type: 'work' }])}
                        className="flex items-center gap-2 rounded-2xl bg-hankyung-navy px-6 py-3 font-black text-hankyung-yellow shadow-xl hover:scale-105 transition-all"
                      >
                         <Plus size={20} /> ADD NEW RECORD
                      </button>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                       {experienceData.map((exp) => (
                         <div key={exp.id} className="group relative rounded-[2.5rem] border-2 border-slate-100 bg-white p-10 shadow-sm transition-all hover:border-hankyung-navy/20 hover:shadow-xl">
                            <button 
                              onClick={() => setExperienceData(experienceData.filter(e => e.id !== exp.id))}
                              className="absolute right-6 top-6 h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            >
                               <Trash2 size={18} />
                            </button>
                            <div className="space-y-6">
                               <div className="flex flex-wrap gap-4">
                                  <select 
                                    value={exp.type} 
                                    onChange={(e) => setExperienceData(experienceData.map(item => item.id === exp.id ? {...item, type: e.target.value as any} : item))}
                                    className="rounded-xl bg-slate-100 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 focus:bg-hankyung-navy focus:text-white cursor-pointer transition-colors"
                                  >
                                     <option value="work">Business / Work</option>
                                     <option value="award">Awards / Honors</option>
                                  </select>
                                  <input 
                                    className="flex-1 border-b-2 border-slate-100 py-1 font-black text-xl focus:outline-none focus:border-hankyung-navy transition-colors bg-transparent" 
                                    value={exp.title}
                                    onChange={(e) => setExperienceData(experienceData.map(item => item.id === exp.id ? {...item, title: e.target.value} : item))}
                                    placeholder="Company or Event Name"
                                  />
                               </div>
                               <input 
                                  className="w-full border-b-2 border-slate-100 py-1 text-sm font-black text-hankyung-navy/40 focus:outline-none focus:text-hankyung-navy transition-colors bg-transparent" 
                                  value={exp.role}
                                  onChange={(e) => setExperienceData(experienceData.map(item => item.id === exp.id ? {...item, role: e.target.value} : item))}
                                  placeholder="Role or specific award title"
                               />
                               <textarea 
                                  className="w-full min-h-[120px] rounded-[1.5rem] border-2 border-slate-50 bg-slate-50/30 p-5 text-sm font-medium text-slate-500 focus:outline-none focus:ring-2 focus:ring-hankyung-navy/10 transition-all" 
                                  value={exp.desc}
                                  onChange={(e) => setExperienceData(experienceData.map(item => item.id === exp.id ? {...item, desc: e.target.value} : item))}
                                  placeholder="Provide context and results..."
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {adminTab === 'portfolio' && (
                  <div className="space-y-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-black text-hankyung-navy tracking-tight">Portfolio Curator</h3>
                      <button 
                        onClick={() => setPortfolioData([...portfolioData, { id: Date.now().toString(), title: "Strategic Project Title", subtitle: "Category / Strategy", desc: "Technical overview of execution.", images: [] }])}
                        className="flex items-center gap-2 rounded-2xl bg-hankyung-navy px-6 py-3 font-black text-hankyung-yellow shadow-xl hover:scale-105 transition-all"
                      >
                         <Plus size={20} /> ADD NEW SHOWCASE
                      </button>
                    </div>
                    <div className="grid gap-12 lg:grid-cols-2">
                       {portfolioData.map((port) => (
                         <div key={port.id} className="relative flex flex-col rounded-[3rem] bg-white border-2 border-slate-100 p-10 transition-all hover:shadow-2xl hover:border-hankyung-yellow/20 group">
                            <button 
                              onClick={() => setPortfolioData(portfolioData.filter(p => p.id !== port.id))}
                              className="absolute right-8 top-8 h-12 w-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-200 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 shadow-lg"
                            >
                               <Trash2 size={24} />
                            </button>
                            <div className="space-y-8">
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">Showcase Category</label>
                                 <input 
                                    className="block w-full bg-transparent text-lg font-black text-slate-900 focus:outline-none" 
                                    value={port.subtitle}
                                    onChange={(e) => setPortfolioData(portfolioData.map(p => p.id === port.id ? {...p, subtitle: e.target.value} : p))}
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Project Title</label>
                                 <input 
                                    className="block w-full bg-transparent text-3xl font-black text-slate-900 tracking-tighter focus:outline-none border-b-2 border-slate-100 pb-4 focus:border-hankyung-navy" 
                                    value={port.title}
                                    onChange={(e) => setPortfolioData(portfolioData.map(p => p.id === port.id ? {...p, title: e.target.value} : p))}
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Project Description</label>
                                 <textarea 
                                    className="w-full min-h-[120px] rounded-2xl border-2 border-slate-50 p-6 text-sm text-slate-500 font-medium focus:outline-none bg-slate-50/20 focus:bg-white focus:border-slate-100 transition-all" 
                                    value={port.desc}
                                    onChange={(e) => setPortfolioData(portfolioData.map(p => p.id === port.id ? {...p, desc: e.target.value} : p))}
                                 />
                               </div>
                               
                               <div className="space-y-6">
                                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                     <span className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                                       <Upload size={14} /> Gallery Assets ({port.images.length})
                                     </span>
                                     <label className="cursor-pointer flex items-center gap-2 rounded-xl bg-hankyung-navy px-4 py-2 text-[10px] font-black text-hankyung-yellow hover:scale-105 transition-all">
                                        UPLOAD FILES
                                        <input type="file" multiple className="hidden" onChange={(e) => handleImageUpload(e, port.id)} accept="image/*" />
                                     </label>
                                  </div>
                                  <div className="flex flex-wrap gap-4">
                                     {port.images.map((img, i) => (
                                        <div key={i} className="relative group/img h-24 w-24 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm">
                                           <img src={img} className="h-full w-full object-cover" />
                                           <button 
                                            onClick={() => setPortfolioData(portfolioData.map(p => p.id === port.id ? {...p, images: p.images.filter((_, idx) => idx !== i)} : p))}
                                            className="absolute inset-0 bg-red-600/90 text-white opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all backdrop-blur-[2px]"
                                           >
                                              <Trash2 size={20} />
                                           </button>
                                        </div>
                                     ))}
                                     {port.images.length === 0 && (
                                       <div className="flex h-24 w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-300 text-xs font-bold uppercase tracking-widest bg-slate-50/50">
                                          Ready for assets
                                       </div>
                                     )}
                                  </div>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Login Modal Overlay */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-hankyung-navy/95 p-6 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md rounded-[3rem] bg-white p-12 shadow-2xl"
            >
               <div className="mb-10 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-hankyung-navy text-hankyung-yellow shadow-xl">
                    <Lock size={28} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Admin Authentication</h3>
                  <p className="mt-2 text-sm font-bold text-slate-400">Please enter the security key to proceed</p>
               </div>
               
               <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Passkey</label>
                     <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full rounded-2xl border-2 px-6 py-4 font-black transition-all focus:outline-none ${loginError ? 'border-red-500 animate-shake' : 'border-slate-100 focus:border-hankyung-navy'}`}
                        placeholder="••••"
                        autoFocus
                     />
                     {loginError && <p className="text-center text-xs font-bold text-red-500">Access Denied: Incorrect Password</p>}
                  </div>
                  <div className="flex gap-4">
                     <button type="submit" className="flex-1 rounded-2xl bg-hankyung-navy py-4 font-black text-white hover:bg-hankyung-yellow hover:text-hankyung-navy transition-all">
                        LOGIN
                     </button>
                     <button type="button" onClick={() => setShowLogin(false)} className="px-6 rounded-2xl bg-slate-50 font-black text-slate-400">
                        CANCEL
                     </button>
                  </div>
               </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="border-t border-slate-100 bg-white py-16 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-2xl font-black text-hankyung-navy">
                 HANKYUNG <span className="text-hankyung-yellow underline underline-offset-4 decoration-4">MEDIA</span> GROUP
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">
                 © 2026 권영지 PORTFOLIO. <br />
                 Designed specifically for Hankyung Media Group Operations Support.
              </div>
           </div>
           
           <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
              <div className="flex gap-8">
                 {sections.filter(s => s.id !== 'admin').map(s => (
                   <button key={s.id} onClick={() => navigateTo(s.id as any)} className="text-[10px] font-black text-slate-400 hover:text-hankyung-navy transition-colors uppercase tracking-[0.2em]">{s.name}</button>
                 ))}
              </div>
              <div className="flex items-center gap-3">
                 {!isAdmin ? (
                   <button 
                    onClick={() => setShowLogin(true)}
                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-[10px] font-black text-slate-300 hover:bg-hankyung-navy hover:text-hankyung-yellow transition-all"
                   >
                      <Settings size={12} /> AUTH LOGIN
                   </button>
                 ) : (
                   <div className="flex gap-2">
                       <button 
                        onClick={() => navigateTo('admin')}
                        className="flex items-center gap-2 rounded-xl bg-hankyung-navy px-4 py-2 text-[10px] font-black text-hankyung-yellow shadow-lg"
                       >
                          <Eye size={12} /> GO CONTROL
                       </button>
                       <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-[10px] font-black text-slate-400"
                       >
                          <LogOut size={12} /> LEAVE
                       </button>
                   </div>
                 )}
                 <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-300 hover:bg-hankyung-navy hover:text-white transition-all shadow-sm"
                 >
                    <ChevronRight className="-rotate-90" size={18} />
                 </button>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
