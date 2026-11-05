import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  FileText,
  GraduationCap,
  Megaphone,
  ClipboardList,
  IndianRupee,
  Percent,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SmartImage } from '../components/SmartImage';
import { ASSET_MANIFEST, PLATFORM_FAQS } from '../data/seedData';

const FRANCHISE_FAQS = [
  {
    q: 'What is the franchise fee?',
    a: 'The franchise fee is ₹1,50,000 for the first year. This is the fee for the franchise partnership itself and is separate from your business setup costs.',
  },
  {
    q: 'Is there any royalty on sales?',
    a: 'No! There is 0% royalty on sales during the first year so you can reinvest your earnings into growing your local celebration operations.',
  },
  {
    q: 'Is the franchise fee refundable?',
    a: 'The franchise onboarding and territory allocation fee is non-refundable once training and brand onboarding begin.',
  },
  {
    q: 'What is included in the franchise fee?',
    a: 'It includes use of brand identity, decoration setup training, balloon handling & installation guidance, pricing & catalogue structure, launch campaign guidance, and operational checklists.',
  },
  {
    q: 'Are shop setup costs included?',
    a: 'Physical items such as printed signage, uniforms, balloon inventory, ring stands, and local on-ground marketing spends are part of your business setup costs.',
  },
  {
    q: 'How much total investment is required?',
    a: 'Apart from the ₹1,50,000 first-year franchise fee, initial inventory and prop kit investment typically ranges between ₹50,000 to ₹1,00,000 depending on your city scale.',
  },
  {
    q: 'Can I operate the franchise from home?',
    a: 'Yes, many partners start with a compact storage/dispatch room and scale into a dedicated retail storefront as monthly order volume grows.',
  },
  {
    q: 'Do I need decoration experience?',
    a: 'No prior decoration experience is required. We provide structured hands-on training on organic arches, ring setups, floral styling, and customer coordination.',
  },
  {
    q: 'Will you provide training & customer leads?',
    a: 'Yes! You receive complete setup & operations training along with city-specific booking inquiries generated through our platform.',
  },
];

export const InfoPage: React.FC<{
  page:
    | 'about'
    | 'contact'
    | 'our-work'
    | 'blogs'
    | 'faq'
    | 'terms'
    | 'privacy'
    | 'cancellation'
    | 'partner'
    | 'payment-info';
}> = ({ page }) => {
  const { websiteSettings, products, submitSupportTicket, showToast } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('₹1.5L - ₹3L');
  const [experience, setExperience] = useState('New Entrepreneur');
  const [message, setMessage] = useState('');
  const [openFranchiseFaq, setOpenFranchiseFaq] = useState<number | null>(0);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await submitSupportTicket({
      userName: name.trim(),
      userEmail: email.trim() || 'franchise@balloondekor.com',
      orderNumber: phone.trim(),
      requestType: page === 'partner' ? 'PARTNER' : 'GENERAL',
      subject: `${
        page === 'partner' ? 'Franchise Application' : 'Customer Contact Inquiry'
      } — ${city || 'India'} (${budget})`,
      message: `${message.trim()} | Phone: ${phone} | Experience: ${experience}`,
    });
    showToast('Thank you! Our franchise & concierge team will call you shortly.');
    setName('');
    setPhone('');
    setEmail('');
    setCity('');
    setMessage('');
  };

  // ================= 1. EXACT FRANCHISE PAGE (Matches Video 00:55 - 01:12) =================
  if (page === 'partner') {
    return (
      <div className="bg-[#FAF8F5] pb-20">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto px-4 pt-8 pb-10 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-xs font-bold">
            <span>✦</span>
            <span>India’s Fastest Growing Decoration Brand</span>
          </div>

          <p className="text-xs font-extrabold uppercase tracking-widest text-[#B45309]">
            {websiteSettings.brandName.toUpperCase()} FRANCHISE OPPORTUNITY
          </p>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] leading-[1.15]">
            Own a {websiteSettings.brandName} Franchise in Your City
          </h1>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Build a professionally supported decoration business with a growing national brand —
            structured training, operational guidance, marketing support and a wide range of
            celebration services.
          </p>

          {/* Franchise Fee & Royalty Card (Matches Video 00:55) */}
          <div className="bg-[#FFFBEB] rounded-2xl p-5 border border-[#F59E0B]/30 space-y-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B]">
                FRANCHISE FEE
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#B45309] tabular-nums mt-0.5">
                ₹1,50,000{' '}
                <span className="text-xs sm:text-sm font-normal text-[#475569]">
                  for the First Year
                </span>
              </p>
            </div>

            <div className="pt-3 border-t border-[#F59E0B]/20">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B]">
                ROYALTY
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tabular-nums mt-0.5">
                0%{' '}
                <span className="text-xs sm:text-sm font-normal text-[#475569]">
                  on Sales in Year One
                </span>
              </p>
            </div>
          </div>

          <a
            href="#franchise-form"
            className="w-full py-4 rounded-xl bg-[#0F172A] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1E293B] transition-colors shadow-md"
          >
            <span>Apply for Franchise</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Storefront Image Card (Matches Video 00:57) */}
          <div className="pt-4">
            <div className="rounded-3xl overflow-hidden border border-[#1C1618]/10 bg-white shadow-sm">
              <div className="bg-[#FFF0F3] py-3 px-4 text-center border-b border-[#D8315B]/15">
                <span className="text-2xl font-extrabold text-[#D8315B] lowercase">
                  {websiteSettings.brandName}
                </span>
                <p className="text-[10px] font-semibold text-[#6E5D5F]">
                  — For Every Celebration —
                </p>
              </div>
              <div className="aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={ASSET_MANIFEST.birthdayRoseGold}
                  alt="Franchise Storefront"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6-Question Franchise Application Form (Matches Video 00:57) */}
        <section id="franchise-form" className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/10 shadow-xs space-y-5">
            <div className="text-center space-y-1.5">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#B45309]">
                FRANCHISE APPLICATION
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Apply for a {websiteSettings.brandName} Franchise
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Six quick questions — takes under a minute. Our team calls you back to discuss
                territory and next steps.
              </p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">1. Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">
                    2. Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">
                    3. Preferred City / Territory *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bhopal, Indore, Pune, Lucknow"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">4. Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">
                    5. Investment Readiness
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] font-semibold"
                  >
                    <option value="₹1.5L - ₹2.5L">₹1,50,000 – ₹2,50,000 (Ready Immediately)</option>
                    <option value="₹2.5L - ₹5L">₹2,50,000 – ₹5,00,000 (Storefront + Crew)</option>
                    <option value="Planning in 1-3 Months">Planning within 1 – 3 Months</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">
                    6. Current Business / Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] font-semibold"
                  >
                    <option value="New Entrepreneur">First-Time Entrepreneur</option>
                    <option value="Event / Decorator Business">Existing Decorator / Event Planner</option>
                    <option value="Retail / Bakery / Florist">Bakery / Florist / Retail Owner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your city and goals..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#D97706] text-white font-extrabold hover:bg-[#B45309] transition-colors"
              >
                Submit Franchise Application →
              </button>
            </form>
          </div>
        </section>

        {/* 5 Feature Highlights (Matches Video 00:58 & 01:06) */}
        <section className="max-w-3xl mx-auto px-4 py-6 space-y-3">
          {[
            {
              icon: <IndianRupee className="w-5 h-5 text-[#0F172A]" />,
              title: '₹1.5 Lakh First-Year Franchise Fee',
              desc: 'One defined, transparent entry cost to become a franchise partner.',
            },
            {
              icon: <Percent className="w-5 h-5 text-[#0F172A]" />,
              title: '0% Royalty During the First Year',
              desc: 'No royalty is deducted from your sales in year one.',
            },
            {
              icon: <GraduationCap className="w-5 h-5 text-[#0F172A]" />,
              title: 'Brand and Business Training',
              desc: 'Structured onboarding on decoration setup, sales and operations.',
            },
            {
              icon: <Megaphone className="w-5 h-5 text-[#0F172A]" />,
              title: 'Marketing and Launch Support',
              desc: 'Launch guidance, creatives and templates to help you get started.',
            },
            {
              icon: <MapPin className="w-5 h-5 text-[#0F172A]" />,
              title: 'City and Territory Availability',
              desc: 'Apply for your preferred city — territories are reviewed and confirmed.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-5 border border-[#1C1618]/10 space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A]">{card.title}</h3>
              <p className="text-xs sm:text-sm text-[#475569]">{card.desc}</p>
            </div>
          ))}
        </section>

        {/* Dark Navy Section + Investment Card (Matches Video 00:59 & 01:06) */}
        <section className="bg-[#0F172A] text-white py-12 px-4 my-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#FBBF24]">
                WHY {websiteSettings.brandName.toUpperCase()}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Build Your Business with {websiteSettings.brandName}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {websiteSettings.brandName} is building a trusted decoration service network across
                India, focused on professionally managed birthday, anniversary, baby shower, newborn
                welcome, proposal, room and corporate event decorations.
              </p>
            </div>

            <div className="bg-[#1E293B] rounded-3xl p-6 border border-white/10 space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  FIRST-YEAR FRANCHISE FEE
                </p>
                <p className="text-3xl font-extrabold text-[#FBBF24] tabular-nums mt-1">
                  ₹1,50,000
                </p>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  FIRST-YEAR ROYALTY ON SALES
                </p>
                <p className="text-3xl font-extrabold text-white tabular-nums mt-1">0%</p>
              </div>
              <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-white/60 block">AGREEMENT PERIOD</span>
                  <strong className="text-white">To be discussed</strong>
                </div>
                <div>
                  <span className="text-white/60 block">RENEWAL TERMS</span>
                  <strong className="text-white">To be discussed</strong>
                </div>
                <div>
                  <span className="text-white/60 block">TERRITORY ALLOCATION</span>
                  <strong className="text-white">Subject to availability and approval</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Support Checklists: Brand, Training, Marketing, Operational (Matches Video 01:00 & 01:05) */}
        <section className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Brand Support',
                icon: <FileText className="w-5 h-5 text-[#0F172A]" />,
                items: [
                  `Use of ${websiteSettings.brandName} brand identity`,
                  'Brand guidelines',
                  'Store branding direction',
                  'Marketing templates',
                  'Uniform and identity guidelines',
                ],
              },
              {
                title: 'Training Support',
                icon: <GraduationCap className="w-5 h-5 text-[#0F172A]" />,
                items: [
                  'Decoration setup training',
                  'Balloon handling and installation guidance',
                  'Customer communication training',
                  'Sales and enquiry handling',
                  'Pricing and package guidance',
                  'Quality control standards',
                ],
              },
              {
                title: 'Marketing Support',
                icon: <Megaphone className="w-5 h-5 text-[#0F172A]" />,
                items: [
                  'Launch campaign guidance',
                  'Social media creatives',
                  'Local promotion templates',
                  'Basic local marketing guidance',
                ],
              },
              {
                title: 'Operational Support',
                icon: <ClipboardList className="w-5 h-5 text-[#0F172A]" />,
                items: [
                  'Service catalogue guidance',
                  'Package structure & booking workflow',
                  'Customer handling & order coordination',
                  'Setup & quality inspection checklist',
                  'Business review support',
                ],
              },
            ].map((box) => (
              <div
                key={box.title}
                className="bg-white rounded-2xl p-5 border border-[#1C1618]/10 space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center">
                    {box.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-[#0F172A]">{box.title}</h3>
                </div>
                <ul className="space-y-2 text-xs text-[#475569]">
                  {box.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="text-[#1B8E3E] font-bold">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Monthly Orders Illustration Table (Matches Video 01:04) */}
        <section className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-2xl border border-[#1C1618]/10 overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0F172A] text-white text-[11px] uppercase">
                <tr>
                  <th className="p-3.5">Monthly Orders</th>
                  <th className="p-3.5">Avg. Order Value</th>
                  <th className="p-3.5">Est. Gross Sales</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1618]/8 tabular-nums">
                <tr>
                  <td className="p-3.5 font-semibold">30 orders</td>
                  <td className="p-3.5">₹3,000</td>
                  <td className="p-3.5 font-extrabold text-[#0F172A]">₹90,000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold">60 orders</td>
                  <td className="p-3.5">₹3,500</td>
                  <td className="p-3.5 font-extrabold text-[#0F172A]">₹2,10,000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold">100 orders</td>
                  <td className="p-3.5">₹4,000</td>
                  <td className="p-3.5 font-extrabold text-[#0F172A]">₹4,00,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#FCA5A5]/40 text-xs text-[#7F1D1D]">
            ⚠️ These examples are for illustration only and are not income or profit guarantees.
            Actual results vary based on city, pricing, demand, marketing, competition, operating
            costs, team efficiency and business execution.
          </div>
        </section>

        {/* Franchise FAQs Accordion (Matches Video 01:01 & 01:03) */}
        <section className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          <div className="text-center space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#B45309]">FAQS</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#64748B]">
              Transparent answers about fees, support and the application process.
            </p>
          </div>

          <div className="space-y-2.5">
            {FRANCHISE_FAQS.map((faq, idx) => {
              const isOpen = openFranchiseFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-[#1C1618]/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFranchiseFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#0F172A]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#B45309]' : 'text-[#64748B]'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-2 border-t border-[#1C1618]/6 text-xs text-[#475569] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Sticky Bottom 3-Button Franchise Bar (Matches Video 00:55 - 01:12: Call | WhatsApp | Apply Now) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-white border-t border-[#1C1618]/15 grid grid-cols-3 items-center shadow-2xl">
          <a
            href={`tel:${(websiteSettings.supportPhone || '+919983562406').replace(/\s+/g, '')}`}
            className="h-full flex flex-col items-center justify-center gap-0.5 text-xs font-bold text-[#0F172A] border-r border-[#1C1618]/10"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call</span>
          </a>
          <a
            href={`https://wa.me/${websiteSettings.whatsappNumber || '919983562406'}?text=${encodeURIComponent(
              `Hi ${websiteSettings.brandName}! I am interested in applying for a Franchise in my city.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full flex flex-col items-center justify-center gap-0.5 text-xs font-bold text-[#1B8E3E]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href="#franchise-form"
            className="h-full bg-[#0F172A] text-white flex flex-col items-center justify-center gap-0.5 text-xs font-extrabold"
          >
            <FileText className="w-4 h-4 text-[#FBBF24]" />
            <span>Apply Now</span>
          </a>
        </div>
      </div>
    );
  }

  // ================= 2. OUR WORK GALLERY =================
  if (page === 'our-work') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#D8315B]">
            Real Home & Venue Setups Across India
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1618] mt-1">
            Our Recent Celebration Work Gallery
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] mt-2">
            Every design is photographed from an actual setup styled by our verified decorators
            across 72+ Indian cities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#1C1618]/10 group flex flex-col justify-between"
            >
              <div className="aspect-square overflow-hidden bg-[#F7F3EE]">
                <SmartImage
                  src={p.primaryImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <p className="text-[11px] text-[#1B8E3E] font-bold">
                  ★ {p.rating.toFixed(1)} · {p.reviewsCount} reviews
                </p>
                <h2 className="text-sm font-bold text-[#1C1618] line-clamp-1">{p.title}</h2>
                <Link
                  to={`/product/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#D8315B] pt-1"
                >
                  Book for ₹{p.discountedPrice.toLocaleString('en-IN')}{' '}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= 3. BLOGS =================
  if (page === 'blogs') {
    const articles = [
      {
        title: 'Top 10 Simple Balloon Decor Ideas for Home Birthdays Under ₹1,999',
        date: 'November 2026 · 4 min read',
        img: ASSET_MANIFEST.birthdayRoseGold,
        excerpt:
          'Discover how rose gold foil banners, ceiling ribbons, and warm fairy lights can transform any apartment living room in 45 minutes.',
      },
      {
        title: 'Planning a Surprise Anniversary or First Night Room Setup',
        date: 'October 2026 · 5 min read',
        img: ASSET_MANIFEST.romanticRedRoom,
        excerpt:
          'Why timing, removable wall hooks, and fresh red rose petals are the secret to a zero-stress midnight couple surprise.',
      },
      {
        title: 'How to Welcome Your Newborn Baby Home from the Hospital',
        date: 'October 2026 · 4 min read',
        img: ASSET_MANIFEST.welcomeBabyRing,
        excerpt:
          'A complete checklist for hospital and home Welcome Baby Boy & Princess setups using nursery-safe pastel balloons.',
      },
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1C1618]">Celebration Styling Blogs</h1>
          <p className="text-xs sm:text-sm text-[#6E5D5F] mt-1">
            Guides and inspiration from India’s party experts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <article
              key={art.title}
              className="bg-white rounded-3xl overflow-hidden border border-[#1C1618]/10 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] bg-[#F7F3EE]">
                  <SmartImage src={art.img} alt={art.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-[11px] text-[#6E5D5F]">{art.date}</p>
                  <h2 className="text-base font-extrabold text-[#1C1618]">{art.title}</h2>
                  <p className="text-xs text-[#555555] leading-relaxed">{art.excerpt}</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <Link
                  to="/collections"
                  className="text-xs font-bold text-[#D8315B] inline-flex items-center gap-1"
                >
                  Explore Matching Packages <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  // ================= 4. FAQ PAGE =================
  if (page === 'faq') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-extrabold text-[#1C1618]">Frequently Asked Questions</h1>
        <div className="space-y-3">
          {PLATFORM_FAQS.map((f) => (
            <div
              key={f.q}
              className="bg-white rounded-2xl p-5 border border-[#1C1618]/10 space-y-1.5"
            >
              <h2 className="text-sm font-extrabold text-[#1C1618]">{f.q}</h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= 5. CONTACT US PAGE =================
  if (page === 'contact') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#D8315B]">
            24×7 Customer Support
          </p>
          <h1 className="text-3xl font-extrabold text-[#1C1618]">Contact Our Celebration Desk</h1>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            Need help choosing a setup, customizing colors, or booking an urgent same-day slot?
            Reach out to us directly.
          </p>
          <div className="bg-white rounded-2xl p-5 border border-[#1C1618]/10 space-y-3 text-xs">
            <p className="flex items-center gap-2.5 font-bold text-[#1C1618]">
              <PhoneCall className="w-4 h-4 text-[#D8315B]" />
              <a href={`tel:${(websiteSettings.supportPhone || '+919983562406').replace(/\s+/g, '')}`}>
                {websiteSettings.supportPhone || '+91 99835 62406'}
              </a>
            </p>
            <p className="flex items-center gap-2.5 font-semibold text-[#1C1618]">
              <Mail className="w-4 h-4 text-[#D8315B]" />
              <span>{websiteSettings.supportEmail || 'support@balloondekor.com'}</span>
            </p>
            <p className="flex items-center gap-2.5 text-[#555555]">
              <MapPin className="w-4 h-4 text-[#D8315B]" />
              <span>Active Across 72+ Cities in India (10:00 AM – 8:00 PM IST)</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/10">
          <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1C1618] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-bold text-[#1C1618] mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1C1618] mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-bold text-[#1C1618] mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai, Delhi NCR, Bengaluru..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-[#1C1618] mb-1">Your Message *</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your celebration date and requirements..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#D8315B] text-white font-extrabold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= 6. ABOUT, PAYMENT-INFO, TERMS, PRIVACY, CANCELLATION =================
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1C1618]/10 space-y-5">
        <p className="text-xs font-extrabold uppercase tracking-wider text-[#D8315B]">
          Official Policy & Documentation
        </p>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C1618]">
          {page === 'about'
            ? `About ${websiteSettings.brandName} — Rajasthan ka event expert`
            : page === 'terms'
            ? 'Terms & Conditions of Service'
            : page === 'privacy'
            ? 'Privacy & Data Protection Policy'
            : page === 'payment-info'
            ? 'Disclaimer, Payment Gateway & Security Information'
            : 'Cancellation, Rescheduling & Refund Policy'}
        </h1>

        <div className="space-y-4 text-xs sm:text-sm text-[#444444] leading-relaxed">
          {page === 'payment-info' && (
            <div className="space-y-6">
              <p>
                All online payments on {websiteSettings.brandName} are processed through{' '}
                <strong className="text-[#1C1618]">Razorpay</strong> (PCI-DSS Level 1 compliant,
                256-bit SSL encrypted). Prices shown on the product and checkout pages are 100%
                fixed and inclusive of setup and doorstep delivery.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#1C1618]/10 space-y-2">
                  <h3 className="font-extrabold text-[#1C1618] text-sm">
                    1. Supported Payment Options
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#555555]">
                    <li>
                      • <strong>Instant UPI:</strong> Google Pay, PhonePe, Paytm, BHIM, Cred UPI
                    </li>
                    <li>
                      • <strong>Debit & Credit Cards:</strong> Visa, MasterCard, RuPay, Amex
                    </li>
                    <li>
                      • <strong>NetBanking:</strong> SBI, HDFC, ICICI, Axis, Kotak & 50+ Banks
                    </li>
                    <li>
                      • <strong>Wallets:</strong> Amazon Pay, Mobikwik, Freecharge
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#1C1618]/10 space-y-2">
                  <h3 className="font-extrabold text-[#1C1618] text-sm">
                    2. Full or 40% Advance Payment
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#555555]">
                    <li>
                      • <strong>100% Full Payment:</strong> Pay the complete package amount online.
                    </li>
                    <li>
                      • <strong>40% Booking Advance:</strong> Pay 40% online to confirm your slot
                      and pay the remaining 60% upon decorator arrival.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {page === 'about' && (
            <>
              <p>
                {websiteSettings.brandName} is India’s trusted platform to book party and event
                decoration services across 72+ cities. Trusted by 5 Lacs+ clients across India, we
                specialize in Birthdays, Kids Themes, Anniversaries, Baby Showers, Newborn Welcomes,
                Haldi/Wedding functions, and Bindu Flower artistry.
              </p>
              <p>
                Every design in our catalog is photographed from an actual setup, with fixed
                transparent pricing and verified local decorators.
              </p>
            </>
          )}

          {page === 'cancellation' && (
            <>
              <p>{websiteSettings.cancellationPolicySummary}</p>
              <ul className="space-y-2 text-[#1C1618] font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B8E3E]" />
                  <span>24+ Hours Prior to Slot: 100% Full Refund or Free Date Reschedule.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B8E3E]" />
                  <span>12 to 24 Hours Prior: Free Reschedule or 80% Refund.</span>
                </li>
              </ul>
            </>
          )}

          {(page === 'terms' || page === 'privacy') && (
            <>
              <p>
                Customer contact details, venue addresses, and booking records are protected by
                strict Firebase Firestore Security Rules. Payment credentials are encrypted and
                processed directly by Razorpay.
              </p>
              <p>
                Rental hardware (metal ring stands, sequin backdrops, neon signs, and cabana frames)
                remain the property of {websiteSettings.brandName} and are collected the day after
                your celebration.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
