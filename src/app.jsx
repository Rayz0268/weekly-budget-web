    const { useState, useEffect, useMemo, useRef } = React;

    /* ================= Icons ================= */
    const ICONS = {
      wallet: `<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1.4"/>`,
      receipt: `<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6"/><path d="M9 12h6"/>`,
      sliders: `<line x1="4" y1="6" x2="20" y2="6"/><circle cx="9" cy="6" r="2"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="15" cy="12" r="2"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="11" cy="18" r="2"/>`,
      grid: `<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>`,
      plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
      x: `<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>`,
      fuel: `<rect x="3" y="3" width="10" height="18" rx="1.5"/><path d="M3 9h10"/><line x1="2" y1="21" x2="14" y2="21"/><path d="M13 7l3 3v7a2 2 0 0 0 4 0v-8l-3-3"/>`,
      target: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>`,
      piggy: `<path d="M16 8a7 6 0 0 1 5 6c0 1.6-.8 3-2 4v2h-3v-1.5H9V20H6v-2a7 6 0 0 1 4.5-11Z"/><circle cx="9" cy="12.5" r="1"/><path d="M11 8.5h4"/><path d="M10 6l2 2"/>`,
      shield: `<path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/>`,
      trending: `<polyline points="3 17 9 11 13 15 21 7"/><polyline points="15 7 21 7 21 13"/>`,
      dollar: `<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
      check: `<polyline points="20 6 9 17 4 12"/>`,
      rotate: `<path d="M3 9a9 9 0 1 0 2.6-4.6L3 7"/><polyline points="3 3 3 7 7 7"/>`,
      banknote: `<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><circle cx="6" cy="9" r="0.6"/><circle cx="18" cy="15" r="0.6"/>`,
      chevron: `<polyline points="6 9 12 15 18 9"/>`,
      trash: `<polyline points="3 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`,
      calendar: `<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>`,
      alert: `<path d="M12 3 2 20h20L12 3Z"/><line x1="12" y1="9" x2="12" y2="14"/><line x1="12" y1="17" x2="12" y2="17"/>`,
      edit: `<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>`,
      cog: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
      sun: `<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"/><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"/><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"/>`,
      moon: `<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>`,
      contrast: `<circle cx="12" cy="12" r="9"/><path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor" stroke="none"/>`,
      download: `<path d="M12 3v12"/><polyline points="7 11 12 16 17 11"/><line x1="4" y1="21" x2="20" y2="21"/>`,
      reimburse: `<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>`,
      plane: `<path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>`,
      logout: `<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`,
      cloud: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>`,
      cloudoff: `<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"/><line x1="1" y1="1" x2="23" y2="23"/>`,
      repeat: `<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>`,
      swap: `<polyline points="16 3 21 8 16 13"/><line x1="21" y1="8" x2="8" y2="8"/><polyline points="8 21 3 16 8 11"/><line x1="3" y1="16" x2="16" y2="16"/>`,
      archive: `<rect x="3" y="3" width="18" height="4" rx="1"/><path d="M5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7"/><line x1="10" y1="12" x2="14" y2="12"/>`,
      search: `<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.2" y2="16.2"/>`,
      clock: `<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>`,
    };
    function Icon({ name, size = 20, color = "currentColor", strokeWidth = 2, style }) {
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style} dangerouslySetInnerHTML={{ __html: ICONS[name] || "" }} />;
    }
    const mk = (n) => (p) => <Icon name={n} {...p} />;
    const Wallet=mk("wallet"), Receipt=mk("receipt"), Sliders=mk("sliders"), Grid=mk("grid"),
      Plus=mk("plus"), X=mk("x"), Fuel=mk("fuel"), Target=mk("target"), PiggyBank=mk("piggy"),
      Shield=mk("shield"), TrendingUp=mk("trending"), DollarSign=mk("dollar"), Check=mk("check"),
      RotateCcw=mk("rotate"), Banknote=mk("banknote"), ChevronDown=mk("chevron"), Trash2=mk("trash"),
      CalendarDays=mk("calendar"), AlertTriangle=mk("alert"), Pencil=mk("edit"), Cog=mk("cog"),
      Sun=mk("sun"), Moon=mk("moon"), Contrast=mk("contrast"), Download=mk("download"),
      Reimburse=mk("reimburse"), Plane=mk("plane"), LogOut=mk("logout"), Cloud=mk("cloud"), CloudOff=mk("cloudoff"),
      Repeat=mk("repeat"), ArrowLeftRight=mk("swap"), Archive=mk("archive"), Search=mk("search"), Clock=mk("clock");
    function GoogleG({ size = 18 }) {
      return (
        <svg width={size} height={size} viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41.4 35.5 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"/>
        </svg>
      );
    }

    /* ================= Themes ================= */
    const THEMES = {
      dark: { appBg:"#06070a", chrome:"rgba(12,14,19,0.9)", bg:"#0c0e13", bg2:"#0f1219", card:"#15181f", cardHi:"#1c202a", border:"#262b36", borderHi:"#333a47", text:"#eef1f6", sub:"#98a2b3", muted:"#646e7e", green:"#34d399", greenDim:"#10b981", red:"#f87171", amber:"#fbbf24", accent:"#818cf8", accent2:"#22d3ee" },
      oled: { appBg:"#000000", chrome:"rgba(0,0,0,0.92)", bg:"#000000", bg2:"#050608", card:"#0b0d12", cardHi:"#14171f", border:"#1d222e", borderHi:"#2b3240", text:"#eef1f6", sub:"#9aa4b2", muted:"#69727f", green:"#34d399", greenDim:"#10b981", red:"#f87171", amber:"#fbbf24", accent:"#818cf8", accent2:"#22d3ee" },
      light: { appBg:"#e7e9ee", chrome:"rgba(255,255,255,0.85)", bg:"#f4f5f8", bg2:"#ffffff", card:"#ffffff", cardHi:"#f1f3f6", border:"#e2e6ec", borderHi:"#d2d8e0", text:"#1a1d23", sub:"#5b6573", muted:"#98a1b0", green:"#059669", greenDim:"#10b981", red:"#dc2626", amber:"#d97706", accent:"#6366f1", accent2:"#0891b2" },
    };
    let C = THEMES.dark;
    const mkCard = () => ({ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 });
    let cardStyle = mkCard();

    // Accent (brand) colors — override the default emerald. "green" keeps each theme's tuned default.
    const ACCENTS = [
      { key: "green", label: "Emerald", main: "#34d399", dim: "#10b981" },
      { key: "blue", label: "Blue", main: "#3b82f6", dim: "#2563eb" },
      { key: "violet", label: "Violet", main: "#8b5cf6", dim: "#7c3aed" },
      { key: "rose", label: "Rose", main: "#fb7185", dim: "#f43f5e" },
      { key: "amber", label: "Amber", main: "#fbbf24", dim: "#f59e0b" },
      { key: "cyan", label: "Cyan", main: "#22d3ee", dim: "#06b6d4" },
      { key: "orange", label: "Orange", main: "#fb923c", dim: "#f97316" },
    ];
    const darken = (hex, amt) => {
      const n = parseInt((hex || "#000000").slice(1), 16);
      let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      r = Math.round(r * (1 - amt)); g = Math.round(g * (1 - amt)); b = Math.round(b * (1 - amt));
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    function resolveAccent(key, customHex) {
      if (key === "custom" && customHex) return { main: customHex, dim: darken(customHex, 0.14) };
      if (!key || key === "green") return null;
      const a = ACCENTS.find((x) => x.key === key);
      return a ? { main: a.main, dim: a.dim } : null;
    }
    function applyTheme(mode, accent) {
      C = { ...(THEMES[mode] || THEMES.dark) };
      if (accent && accent.main) { C.green = accent.main; C.greenDim = accent.dim || accent.main; }
      cardStyle = mkCard();
      const root = document.documentElement.style;
      Object.keys(C).forEach((k) => root.setProperty("--" + k, C[k]));
      document.body.style.background = C.appBg;
    }

    const STORAGE_KEY = "weekly-budget-v1";
    const THEME_KEY = "weekly-budget-theme";
    const TRAVEL_KEY = "weekly-budget-travel";
    const UPDATED_KEY = "weekly-budget-updatedAt";
    const ACCENT_KEY = "weekly-budget-accent";

    const CURRENCIES = [
      { code:"JPY", symbol:"¥", label:"JPY · Japan" }, { code:"EUR", symbol:"€", label:"EUR · Europe" },
      { code:"GBP", symbol:"£", label:"GBP · UK" }, { code:"KRW", symbol:"₩", label:"KRW · Korea" },
      { code:"CAD", symbol:"C$", label:"CAD · Canada" }, { code:"AUD", symbol:"A$", label:"AUD · Australia" },
      { code:"MXN", symbol:"MX$", label:"MXN · Mexico" }, { code:"THB", symbol:"฿", label:"THB · Thailand" },
      { code:"HKD", symbol:"HK$", label:"HKD · Hong Kong" }, { code:"SGD", symbol:"S$", label:"SGD · Singapore" },
      { code:"INR", symbol:"₹", label:"INR · India" }, { code:"PHP", symbol:"₱", label:"PHP · Philippines" },
    ];

    // Collision-safe id — Date.now() alone can collide across devices (sync) or fast taps.
    const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

    /* ================= Date helpers ================= */
    const DAY = 86400000;
    const pad2 = (n) => String(n).padStart(2, "0");
    const startOfDay = (ts) => { const d = new Date(ts); d.setHours(0,0,0,0); return d.getTime(); };
    const addDays = (ts, n) => startOfDay(ts) + n * DAY;
    const startOfMonth = (ts) => { const d = new Date(ts); return new Date(d.getFullYear(), d.getMonth(), 1).getTime(); };
    const dayKey = (ts) => { const d = new Date(ts); return d.getFullYear()+"-"+pad2(d.getMonth()+1)+"-"+pad2(d.getDate()); };
    const toDateInput = (ts) => { const d = new Date(ts); return d.getFullYear()+"-"+pad2(d.getMonth()+1)+"-"+pad2(d.getDate()); };
    const fromDateInput = (v) => { const a = (v||"").split("-").map(Number); return new Date(a[0], (a[1]||1)-1, a[2]||1, 0,0,0,0).getTime(); };
    const fmtMonthDay = (ts) => new Date(ts).toLocaleDateString("en-US", { month:"short", day:"numeric" });
    const periodEnd = (p) => addDays(p.startDate, p.lengthDays || 14);
    const periodRangeLabel = (p) => fmtMonthDay(p.startDate) + " – " + fmtMonthDay(periodEnd(p) - DAY);
    const LENGTH_PRESETS = [{label:"3 days",d:3},{label:"Weekly",d:7},{label:"Biweekly",d:14},{label:"Monthly",d:30}];

    function makePeriod(o = {}) {
      return { id:"p"+Date.now()+Math.random().toString(36).slice(2,6), type:"single", createdAt:Date.now(),
        period:"New Pay Period", startDate:startOfDay(Date.now()), lengthDays:14, startingBalance:0,
        totalIncome:0, savings:0, gasBudget:0, insurance:0, endGoal:0, allocations:[], transactions:[], ...o };
    }
    // Compress a full single period into a lightweight, read-only archived form.
    // We keep a small stats summary (for the archived dropdown) plus a slimmed
    // transaction list — only the fields the Calendar needs — dropping the budget
    // config, allocations, foreign-currency fields, notes, etc. to save storage.
    function makeArchivedPeriod(p) {
      const st = computeStats(p);
      return {
        id: p.id, type: "archived", createdAt: p.createdAt || Date.now(), archivedAt: Date.now(),
        period: p.period, startDate: p.startDate, lengthDays: p.lengthDays || 14,
        summary: { spent: st.spent, remaining: st.remainingSpending, income: p.totalIncome || 0, reimbursed: st.reimbursed, gasSpent: st.gasSpent, txCount: (p.transactions || []).length },
        transactions: (p.transactions || []).map((t) => ({ id: t.id, date: t.date, amount: t.amount, category: t.category, merchant: t.merchant })),
      };
    }
    // Brand-new users start with a single empty period (no sample spending).
    // Existing users are unaffected: loadStore() returns their saved data and only
    // falls back to this when there is nothing in localStorage.
    function defaultData() {
      return { activePeriodId:"p1", recurring:[], periods:[{ id:"p1", type:"single", createdAt:Date.now(), period:"My Pay Period",
        startDate:startOfDay(Date.now()), lengthDays:14, startingBalance:0, totalIncome:0, savings:0, gasBudget:0,
        insurance:0, endGoal:0, allocations:[], transactions:[] }] };
    }
    const DEFAULT_DATA = defaultData();

    function normalizePeriod(p) {
      if (!p) return p;
      if (p.type === "combined") return { period:"Monthly View", sourceIds:[], ...p, type:"combined" };
      // Archived periods are a pre-computed, read-only summary + slimmed transactions
      // (kept only so their purchases still appear in the Calendar). Pass them through.
      if (p.type === "archived") return { period:"Archived period", summary:{}, transactions:[], ...p, type:"archived" };
      const startDate = p.startDate || p.createdAt || Date.now();
      return { type:"single", createdAt:0, period:"Pay Period", lengthDays:14, startingBalance:0, totalIncome:0,
        savings:0, gasBudget:0, insurance:0, endGoal:0, ...p, startDate,
        allocations: Array.isArray(p.allocations) ? p.allocations : [],
        transactions: (p.transactions||[]).map((t)=>({ ...t, date: t.date || startDate })),
        cashLimit: { enabled:false, standalone:false, code:"JPY", symbol:"¥", amount:0, rate:150, ...(p.cashLimit||{}) } };
    }
    function normalize(raw) {
      if (raw && Array.isArray(raw.periods) && raw.periods.length) return { ...raw, recurring: Array.isArray(raw.recurring) ? raw.recurring : [], periods: raw.periods.map(normalizePeriod) };
      if (raw && Array.isArray(raw.transactions)) { const id="p_migrated"; return { activePeriodId:id, recurring:[], periods:[normalizePeriod({ id, createdAt:Date.now(), ...raw })] }; }
      return null;
    }
    function resolvePeriod(store, p) {
      if (!p || p.type !== "combined") return p;
      const sources = (p.sourceIds||[]).map((id)=>store.periods.find((x)=>x.id===id)).filter((x)=>x && x.type==="single");
      const base = { ...p, combined:true, readOnly:true, allocations:[], transactions:[], startingBalance:0, totalIncome:0, savings:0, gasBudget:0, insurance:0, endGoal:0, startDate:p.startDate||startOfMonth(Date.now()), lengthDays:30, sourceNames:[] };
      if (!sources.length) return base;
      const sorted = sources.slice().sort((a,b)=>a.startDate-b.startDate);
      const sum = (f) => sorted.reduce((s,x)=>s+(x[f]||0),0);
      const allocMap = {};
      sorted.forEach((x)=>(x.allocations||[]).forEach((a)=>{ allocMap[a.name]=(allocMap[a.name]||0)+(a.amount||0); }));
      const allocations = Object.keys(allocMap).map((name,i)=>({ id:"ca"+i, name, amount:allocMap[name] }));
      const transactions = [];
      sorted.forEach((x)=>(x.transactions||[]).forEach((t)=>transactions.push({ ...t, _src:x.id })));
      const startDate = sorted[0].startDate;
      const lastEnd = Math.max.apply(null, sorted.map((x)=>periodEnd(x)));
      return { ...base, startingBalance:sorted[0].startingBalance, totalIncome:sum("totalIncome"), savings:sum("savings"),
        gasBudget:sum("gasBudget"), insurance:sum("insurance"), endGoal:sum("endGoal"), allocations, transactions, startDate,
        lengthDays:Math.max(1, Math.round((lastEnd-startDate)/DAY)), sourceNames:sorted.map((x)=>x.period) };
    }
    function loadStore() {
      try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) { const n = normalize(JSON.parse(raw)); if (n) return n; } } catch (e) {}
      return DEFAULT_DATA;
    }
    const fmt = (n) => { const v = isNaN(n) ? 0 : n; return (v<0?"-$":"$") + Math.abs(v).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}); };
    const fmtSigned = (n) => (n>=0?"+$":"-$") + Math.abs(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
    // Format a foreign-currency amount (no decimals for yen/won, 2 otherwise).
    const fmtForeign = (n, symbol, code) => (symbol||"") + (isNaN(n)?0:n).toLocaleString("en-US",{maximumFractionDigits: code==="JPY"||code==="KRW"?0:2});

    // Refunds credit money back: "reimbursement" to spending, "gasReimbursement" to the gas budget.
    const isRefundCat = (c) => c==="reimbursement" || c==="gasReimbursement";
    const isGasCat = (c) => c==="gas" || c==="gasReimbursement";
    const defaultMerchant = (c) => c==="gas"?"Gas":c==="reimbursement"?"Refund":c==="gasReimbursement"?"Gas Refund":"Purchase";
    const catLabel = (c) => c==="gas"?"Gas":c==="reimbursement"?"Refund":c==="gasReimbursement"?"Gas Refund":"Spending";

    function computeStats(p) {
      // Travel "cash allowance": a purchase logged in the cash currency belongs to the cash pool —
      // tracked ONLY in that currency; it does NOT touch the USD limit. Instead the allowance's USD
      // value (amount / rate) is set aside from the limit up front, like an allocation. Fully independent.
      const cl = p.cashLimit || {};
      const cashOn = !!cl.enabled;
      const isCash = (t) => cashOn && t.foreignCode === cl.code && !!t.foreignAmount;
      const spent = p.transactions.filter((t)=>t.category==="spending" && !isCash(t)).reduce((s,t)=>s+t.amount,0);
      const gasSpent = p.transactions.filter((t)=>t.category==="gas").reduce((s,t)=>s+t.amount,0);
      const reimbursed = p.transactions.filter((t)=>t.category==="reimbursement" && !isCash(t)).reduce((s,t)=>s+t.amount,0);
      const gasReimbursed = p.transactions.filter((t)=>t.category==="gasReimbursement").reduce((s,t)=>s+t.amount,0);
      let cashSpent = 0, cashReimbursed = 0;
      if (cashOn) {
        p.transactions.forEach((t)=>{
          if (!isCash(t)) return;
          if (t.category === "spending") cashSpent += t.foreignAmount;
          else if (t.category === "reimbursement") cashReimbursed += t.foreignAmount;
        });
      }
      const cashLimitAmt = cl.amount || 0;
      const cashRemaining = cashLimitAmt - cashSpent + cashReimbursed;
      const cashSetAside = cashOn && cl.rate > 0 ? Math.round((cashLimitAmt / cl.rate) * 100) / 100 : 0;
      const allocTotal = (p.allocations||[]).reduce((s,a)=>s+(a.amount||0),0);
      const available = p.startingBalance + p.totalIncome;
      const afterSavings = available - p.savings;
      const afterGas = afterSavings - p.gasBudget;
      const afterInsurance = afterGas - p.insurance;
      const afterAlloc = afterInsurance - allocTotal;
      const afterCash = afterAlloc - cashSetAside;
      const rawLimit = afterCash - p.endGoal;
      const spendingLimit = Math.max(0, rawLimit);
      return { spent, gasSpent, gasReimbursed, reimbursed, allocTotal, available, afterSavings, afterGas, afterInsurance, afterAlloc, afterCash, rawLimit, spendingLimit,
        remainingSpending: spendingLimit - spent + reimbursed, remainingGas: p.gasBudget - gasSpent + gasReimbursed,
        projectedLeftover: afterCash - spent + reimbursed + (p.gasBudget - gasSpent + gasReimbursed),
        cashOn, cashSpent, cashReimbursed, cashLimitAmt, cashRemaining, cashSetAside, cashStandalone: cashOn && !!cl.standalone };
    }

    /* ================= Shared bits ================= */
    function Ring({ fraction, over, size = 200, stroke = 16, tint, children }) {
      const r = (size-stroke)/2, c = 2*Math.PI*r;
      const frac = Math.max(0, Math.min(1, fraction||0));
      const color = over ? C.red : (tint || C.green);
      return (
        <div style={{ position:"relative", width:size, height:size }}>
          <svg width={size} height={size}>
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${frac*c} ${c}`} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition:"stroke-dasharray 0.6s ease, stroke 0.3s ease" }} />
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>{children}</div>
        </div>
      );
    }
    function Bar({ fraction, over }) {
      const frac = Math.max(0, Math.min(1, fraction||0));
      return <div style={{ height:9, background:C.border, borderRadius:99, overflow:"hidden" }}><div style={{ height:"100%", width:`${frac*100}%`, background: over?C.red:`linear-gradient(90deg, ${C.greenDim}, ${C.green})`, borderRadius:99, transition:"width 0.5s ease, background 0.3s ease" }} /></div>;
    }
    function KpiCard({ icon, label, value, color, sub }) {
      return (
        <div className="hoverable lift" style={{ ...cardStyle, padding:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, color:C.sub, fontSize:12.5, marginBottom:10 }}>
            <span style={{ width:30, height:30, borderRadius:9, background:C.cardHi, display:"flex", alignItems:"center", justifyContent:"center", color: color||C.sub }}>{icon}</span>
            {label}
          </div>
          <div style={{ fontSize:26, fontWeight:800, color: color||C.text, letterSpacing:-0.5 }}>{value}</div>
          {sub && <div style={{ fontSize:12, color:C.muted, marginTop:3 }}>{sub}</div>}
        </div>
      );
    }
    function NumberField({ label, sublabel, icon, value, onChange }) {
      const [text, setText] = useState(value ? String(value) : "");
      const handle = (v) => { if (!/^\d*\.?\d*$/.test(v)) return; setText(v); const p = v===""||v==="."?0:parseFloat(v); onChange(isNaN(p)?0:p); };
      return (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 0", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, color:C.text, fontSize:14.5 }}>
            <span style={{ color:C.muted, display:"flex" }}>{icon}</span>
            <div>{label}{sublabel && <div style={{ fontSize:11.5, color:C.muted, marginTop:1 }}>{sublabel}</div>}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:10, padding:"0 10px", width:140 }}>
            <span style={{ color:C.muted }}>$</span>
            <input inputMode="decimal" value={text} onChange={(e)=>handle(e.target.value)} placeholder="0.00" style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:15, fontWeight:600, width:"100%", textAlign:"right", padding:"10px 2px" }} />
          </div>
        </div>
      );
    }
    function ConfirmModal({ title, message, confirmLabel="Clear", onCancel, onConfirm }) {
      return (
        <div onClick={onCancel} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:60, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
          <div onClick={(e)=>e.stopPropagation()} style={{ width:"100%", maxWidth:380, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:18, padding:26, textAlign:"center", animation:"popIn 0.2s ease" }}>
            <div style={{ width:54, height:54, borderRadius:15, background:"rgba(248,113,113,0.12)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}><AlertTriangle size={26} color={C.red} /></div>
            {title && <div style={{ fontSize:19, fontWeight:800, color:C.text, marginBottom:8 }}>{title}</div>}
            <div style={{ fontSize:14, color:C.sub, lineHeight:1.5, marginBottom:22 }}>{message}</div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={onCancel} style={{ flex:1, padding:"12px 0", borderRadius:11, border:`1px solid ${C.border}`, background:"transparent", color:C.sub, fontSize:14.5, fontWeight:600, cursor:"pointer" }}>Cancel</button>
              <button onClick={onConfirm} style={{ flex:1, padding:"12px 0", borderRadius:11, border:"none", background:C.red, color:"#2a0a0a", fontSize:14.5, fontWeight:700, cursor:"pointer" }}>{confirmLabel}</button>
            </div>
          </div>
        </div>
      );
    }
    function Toast({ message, undo, onClose }) {
      return (
        <div style={{ position:"fixed", left:"50%", bottom:28, transform:"translateX(-50%)", zIndex:90, display:"flex", alignItems:"center", gap:14, background:C.cardHi, border:`1px solid ${C.borderHi}`, borderRadius:12, padding:"12px 16px", boxShadow:"0 10px 30px rgba(0,0,0,0.45)", animation:"toastIn 0.25s cubic-bezier(0.22,1,0.36,1)" }}>
          <span style={{ fontSize:13.5, color:C.text }}>{message}</span>
          {undo && <button onClick={undo} style={{ background:"transparent", border:"none", color:C.green, fontSize:13.5, fontWeight:700, cursor:"pointer", padding:0 }}>Undo</button>}
          <button onClick={onClose} style={{ background:"transparent", border:"none", color:C.muted, cursor:"pointer", display:"flex", padding:0 }}><X size={16} /></button>
        </div>
      );
    }

    /* ================= Transaction row ================= */
    function TxRow({ t, onRemove, onUpdate, readOnly }) {
      const [editing, setEditing] = useState(false);
      const [amount, setAmount] = useState(String(t.amount));
      const [merchant, setMerchant] = useState(t.merchant);
      const [category, setCategory] = useState(t.category);
      const startEdit = () => { setAmount(String(t.amount)); setMerchant(t.merchant); setCategory(t.category); setEditing(true); };
      const save = () => { const a = parseFloat(amount); if (isNaN(a)||a<=0) return; onUpdate(t.id, { amount:Math.round(a*100)/100, merchant:merchant.trim()||defaultMerchant(category), category }); setEditing(false); };
      if (editing) {
        return (
          <div style={{ padding:"12px 0", borderBottom:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", gap:8, marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:10, padding:"0 10px", width:120, flexShrink:0 }}>
                <span style={{ color:C.muted }}>$</span>
                <input inputMode="decimal" value={amount} onChange={(e)=>{ const v=e.target.value; if(/^\d*\.?\d*$/.test(v)) setAmount(v); }} style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:15, fontWeight:600, width:"100%", padding:"10px 2px" }} />
              </div>
              <input value={merchant} onChange={(e)=>setMerchant(e.target.value)} placeholder="Where?" style={{ flex:1, minWidth:0, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:10, outline:"none", color:C.text, fontSize:14.5, padding:"10px 12px" }} />
            </div>
            <div style={{ display:"flex", gap:6, marginBottom:8 }}>
              {["spending","gas","reimbursement","gasReimbursement"].map((v)=>(
                <button key={v} onClick={()=>setCategory(v)} style={{ flex:1, padding:"8px 0", borderRadius:9, border:`1px solid ${category===v?C.accent:C.border}`, background:category===v?"rgba(129,140,248,0.15)":"transparent", color:category===v?C.text:C.sub, fontSize:12, fontWeight:600, whiteSpace:"nowrap", cursor:"pointer" }}>{catLabel(v)}</button>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button onClick={()=>setEditing(false)} style={{ width:42, height:34, borderRadius:9, border:`1px solid ${C.border}`, background:"transparent", color:C.sub, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={16} /></button>
              <button onClick={save} style={{ width:42, height:34, borderRadius:9, border:"none", background:C.green, color:"#06281d", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={16} /></button>
            </div>
          </div>
        );
      }
      const isReimb = isRefundCat(t.category);
      return (
        <div className="navitem" style={{ display:"flex", alignItems:"center", padding:"12px 10px", margin:"0 -10px", borderRadius:10, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ width:34, height:34, borderRadius:10, background: isReimb?"rgba(52,211,153,0.15)":(t.category==="gas"?"rgba(34,211,238,0.12)":"rgba(129,140,248,0.12)"), display:"flex", alignItems:"center", justifyContent:"center", marginRight:12, flexShrink:0 }}>
            {isReimb ? (t.category==="gasReimbursement" ? <Fuel size={16} color={C.green} /> : <Reimburse size={16} color={C.green} />) : (t.category==="gas" ? <Fuel size={16} color={C.accent2} /> : <Receipt size={16} color={C.accent} />)}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14.5, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.merchant}</div>
            <div style={{ fontSize:11.5, color:C.muted, marginTop:1 }}>{t.date && fmtMonthDay(t.date)}{t.recurringId && <span style={{ color:C.accent }}> · recurring</span>}{t.foreignAmount && <span style={{ color:C.accent }}> · {t.foreignSymbol}{Math.round(t.foreignAmount).toLocaleString()} {t.foreignCode}</span>}</div>
          </div>
          <div style={{ fontSize:15, fontWeight:700, marginRight: readOnly?2:6, color: isReimb?C.green:C.text }}>{isReimb?"+":""}{fmt(t.amount)}</div>
          {!readOnly && <button onClick={startEdit} style={{ width:28, height:28, borderRadius:8, border:"none", background:"transparent", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Pencil size={15} /></button>}
          {!readOnly && <button onClick={()=>onRemove(t.id)} style={{ width:28, height:28, borderRadius:8, border:"none", background:"transparent", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={16} /></button>}
        </div>
      );
    }

    /* ================= Dashboard ================= */
    function Dashboard({ data, computed }) {
      const { available, afterInsurance, spent, spendingLimit, remainingSpending, gasSpent, gasReimbursed, remainingGas, projectedLeftover, reimbursed,
        cashOn, cashSpent, cashReimbursed, cashLimitAmt, cashRemaining, cashSetAside, cashStandalone } = computed;
      const cl = data.cashLimit || {};
      const overSpend = remainingSpending < 0;
      const cashOver = cashRemaining < 0;
      const aboveGoal = projectedLeftover - data.endGoal;
      // Spending pace — how many days remain and the per-day amount that stays inside the limit.
      const pace = (() => {
        const len = data.lengthDays || 14;
        const start = startOfDay(data.startDate), end = addDays(data.startDate, len), today = startOfDay(Date.now());
        if (today < start) return { label:"Starts "+fmtMonthDay(start) };
        if (today >= end) return { label:"Period ended "+fmtMonthDay(end-DAY) };
        const daysLeft = Math.round((end-today)/DAY);
        const dayNum = Math.round((today-start)/DAY)+1;
        const perDay = Math.max(0, remainingSpending)/daysLeft;
        const diff = spendingLimit*(dayNum/len) - (spent-reimbursed); // vs an even burn through today
        const behind = overSpend || diff < 0;
        const badge = overSpend ? "over budget" : Math.abs(diff) < Math.max(5, spendingLimit*0.02) ? "on pace" : diff > 0 ? fmt(diff)+" ahead" : fmt(-diff)+" behind";
        return { label:`${daysLeft} day${daysLeft>1?"s":""} left · ${fmt(perDay)}/day is safe`, badge,
          color: behind?C.red:C.green, bg: behind?"rgba(248,113,113,0.12)":"rgba(52,211,153,0.12)" };
      })();
      const usdRingCard = (
        <div className="ring-card" style={{ ...cardStyle, display:"flex", alignItems:"center", gap:28, padding:28, flex:"1 1 300px", minWidth:280 }}>
          <Ring fraction={(spent-reimbursed)/(spendingLimit||1)} over={overSpend} size={190}>
            <div style={{ fontSize:11, fontWeight:700, color:C.green, letterSpacing:0.5 }}>OVERALL · USD</div>
            <div style={{ fontSize:30, fontWeight:800, color:overSpend?C.red:C.green, letterSpacing:-0.5, marginTop:2 }}>{fmt(remainingSpending)}</div>
            <div style={{ fontSize:11, color:C.muted }}>of {fmt(spendingLimit)}</div>
          </Ring>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:600, color:C.sub, letterSpacing:0.3, marginBottom:12 }}>THIS PERIOD</div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div><div style={{ fontSize:12, color:C.muted, marginBottom:4 }}>Spent {reimbursed>0 && <span style={{ color:C.green }}>· +{fmt(reimbursed)} back</span>}</div><Bar fraction={(spent-reimbursed)/(spendingLimit||1)} over={overSpend} /></div>
              <div style={{ display:"flex", gap:20 }}>
                <div><div style={{ fontSize:12, color:C.muted }}>Spent</div><div style={{ fontSize:20, fontWeight:700 }}>{fmt(spent)}</div></div>
                <div><div style={{ fontSize:12, color:C.muted }}>Limit</div><div style={{ fontSize:20, fontWeight:700, color:C.green }}>{fmt(spendingLimit)}</div></div>
                {reimbursed>0 && <div><div style={{ fontSize:12, color:C.muted }}>Refunded</div><div style={{ fontSize:20, fontWeight:700, color:C.green }}>+{fmt(reimbursed)}</div></div>}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
                <Clock size={14} color={C.muted} />
                <span style={{ fontSize:12.5, color:C.sub }}>{pace.label}</span>
                {pace.badge && <span style={{ marginLeft:"auto", fontSize:11, fontWeight:700, color:pace.color, background:pace.bg, padding:"3px 8px", borderRadius:6, whiteSpace:"nowrap" }}>{pace.badge}</span>}
              </div>
            </div>
          </div>
        </div>
      );
      const cashRingCard = (
        <div className="ring-card" style={{ ...cardStyle, display:"flex", alignItems:"center", gap:28, padding:28, flex:"1 1 300px", minWidth:280 }}>
          <Ring fraction={(cashSpent-cashReimbursed)/(cashLimitAmt||1)} over={cashOver} tint={C.amber} size={190}>
            <div style={{ fontSize:11, fontWeight:700, color:C.amber, letterSpacing:0.5 }}>CASH · {cl.code}</div>
            <div style={{ fontSize:30, fontWeight:800, color:cashOver?C.red:C.amber, letterSpacing:-0.5, marginTop:2 }}>{fmtForeign(cashRemaining, cl.symbol, cl.code)}</div>
            <div style={{ fontSize:11, color:C.muted }}>of {fmtForeign(cashLimitAmt, cl.symbol, cl.code)}</div>
          </Ring>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:600, color:C.amber, letterSpacing:0.3, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}><Plane size={15} color={C.amber} /> TRAVEL CASH</div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div><div style={{ fontSize:12, color:C.muted, marginBottom:4 }}>Spent {cashReimbursed>0 && <span style={{ color:C.green }}>· +{fmtForeign(cashReimbursed, cl.symbol, cl.code)} back</span>}</div><Bar fraction={(cashSpent-cashReimbursed)/(cashLimitAmt||1)} over={cashOver} /></div>
              <div style={{ display:"flex", gap:20 }}>
                <div><div style={{ fontSize:12, color:C.muted }}>Spent</div><div style={{ fontSize:20, fontWeight:700 }}>{fmtForeign(cashSpent, cl.symbol, cl.code)}</div></div>
                <div><div style={{ fontSize:12, color:C.muted }}>Allowance</div><div style={{ fontSize:20, fontWeight:700, color:C.amber }}>{fmtForeign(cashLimitAmt, cl.symbol, cl.code)}</div></div>
                {cl.rate>0 && <div><div style={{ fontSize:12, color:C.muted }}>≈ USD left</div><div style={{ fontSize:20, fontWeight:700, color:C.green }}>{fmt(cashRemaining/cl.rate)}</div></div>}
              </div>
            </div>
          </div>
        </div>
      );
      const rows = [
        { label:"Starting Balance", icon:<Banknote size={15} />, delta:null, running:data.startingBalance },
        { label:"Income", icon:<TrendingUp size={15} />, delta:data.totalIncome, running:available, pos:true },
        { label:"Savings", icon:<PiggyBank size={15} />, delta:-data.savings, running:available-data.savings },
        { label:"Gas Budget", icon:<Fuel size={15} />, delta:-data.gasBudget, running:available-data.savings-data.gasBudget },
        { label:"Insurance", icon:<Shield size={15} />, delta:-data.insurance, running:afterInsurance },
      ];
      let _run = afterInsurance;
      (data.allocations||[]).forEach((a)=>{ _run -= (a.amount||0); rows.push({ label:a.name||"Allocation", icon:<DollarSign size={15} />, delta:-(a.amount||0), running:_run }); });
      if (cashOn && cashSetAside > 0) { _run -= cashSetAside; rows.push({ label:`Travel cash (${fmtForeign(cashLimitAmt, cl.symbol, cl.code)})`, icon:<Plane size={15} />, delta:-cashSetAside, running:_run }); }
      return (
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div className="kpi-grid">
            {cashStandalone ? (
              <React.Fragment>
                <KpiCard icon={<Plane size={16} color={C.amber} />} label={cl.code + " cash left"} value={fmtForeign(cashRemaining, cl.symbol, cl.code)} color={cashOver?C.red:C.amber} sub={`${fmtForeign(cashSpent, cl.symbol, cl.code)} of ${fmtForeign(cashLimitAmt, cl.symbol, cl.code)} used`} />
                <KpiCard icon={<Banknote size={16} />} label="Allowance" value={fmtForeign(cashLimitAmt, cl.symbol, cl.code)} sub="this period" />
                <KpiCard icon={<DollarSign size={16} />} label="≈ USD left" value={fmt(cl.rate>0?cashRemaining/cl.rate:0)} color={C.green} sub={`1 USD = ${fmtForeign(cl.rate, cl.symbol, cl.code)}`} />
                <KpiCard icon={<Receipt size={16} />} label="Purchases" value={String(data.transactions.filter((t)=>t.category==="spending").length)} sub={`${fmtForeign(cashSpent, cl.symbol, cl.code)} spent`} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <KpiCard icon={<Wallet size={16} />} label="Remaining to spend" value={fmt(remainingSpending)} color={overSpend?C.red:C.green} sub={`${fmt(spent)} of ${fmt(spendingLimit)} used`} />
                <KpiCard icon={<DollarSign size={16} />} label="Spending limit" value={fmt(spendingLimit)} sub="this period" />
                {cashOn
                  ? <KpiCard icon={<Plane size={16} color={C.amber} />} label={cl.code + " cash left"} value={fmtForeign(cashRemaining, cl.symbol, cl.code)} color={cashOver?C.red:C.amber} sub={`${fmtForeign(cashSpent, cl.symbol, cl.code)} of ${fmtForeign(cashLimitAmt, cl.symbol, cl.code)} used`} />
                  : <KpiCard icon={<Target size={16} />} label="Projected leftover" value={fmt(projectedLeftover)} color={C.amber} sub={aboveGoal>=0?`${fmt(aboveGoal)} over goal`:`${fmt(Math.abs(aboveGoal))} below goal`} />}
                <KpiCard icon={<Fuel size={16} />} label="Gas remaining" value={fmt(remainingGas)} color={C.accent2} sub={`${fmt(gasSpent-gasReimbursed)} of ${fmt(data.gasBudget)} used`} />
              </React.Fragment>
            )}
          </div>

          <div className="dash-grid">
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                {!cashStandalone && usdRingCard}
                {cashOn && cashRingCard}
              </div>

              {!cashStandalone && <div style={cardStyle}>
                <div style={{ fontSize:13, fontWeight:600, color:C.sub, marginBottom:8, letterSpacing:0.3 }}>MONEY FLOW</div>
                {rows.map((r,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", padding:"10px 0", borderBottom: i<rows.length-1?`1px solid ${C.border}`:"none" }}>
                    <div style={{ color:C.muted, marginRight:10, display:"flex" }}>{r.icon}</div>
                    <div style={{ flex:1, fontSize:14, color:C.text }}>{r.label}</div>
                    {r.delta!=null && <div style={{ fontSize:13, color:r.pos?C.green:C.red, marginRight:18, minWidth:90, textAlign:"right" }}>{fmtSigned(r.delta)}</div>}
                    <div style={{ fontSize:15, fontWeight:700, minWidth:96, textAlign:"right" }}>{fmt(r.running)}</div>
                  </div>
                ))}
              </div>}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {cashStandalone ? (
                <div style={cardStyle}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, fontWeight:600, marginBottom:14 }}><Plane size={17} color={C.amber} /> {cl.code} cash</div>
                  {[
                    { label:"Withdrawn / allowance", val:fmtForeign(cashLimitAmt, cl.symbol, cl.code) },
                    { label:"Spent", val:"−"+fmtForeign(cashSpent, cl.symbol, cl.code) },
                    cashReimbursed>0 ? { label:"Refunded", val:"+"+fmtForeign(cashReimbursed, cl.symbol, cl.code), pos:true } : null,
                  ].filter(Boolean).map((r,i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${C.border}` }}>
                      <span style={{ fontSize:14, color:C.text }}>{r.label}</span>
                      <span style={{ fontSize:14, fontWeight:700, color:r.pos?C.green:C.text }}>{r.val}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", paddingTop:14 }}>
                    <span style={{ fontSize:15, fontWeight:700, color:C.text }}>Left to spend</span>
                    <span style={{ fontSize:15, fontWeight:800, color:cashOver?C.red:C.amber }}>{fmtForeign(cashRemaining, cl.symbol, cl.code)}</span>
                  </div>
                  {cl.rate>0 && <div style={{ fontSize:12, color:C.muted, marginTop:12, textAlign:"center" }}>≈ {fmt(cashRemaining/cl.rate)} left · 1 USD = {fmtForeign(cl.rate, cl.symbol, cl.code)}</div>}
                </div>
              ) : (
              <React.Fragment>
              <div style={cardStyle}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, fontWeight:600 }}><Target size={17} color={C.amber} /> End Goal</div>
                  <div style={{ fontSize:12, color:C.sub }}>Goal {fmt(data.endGoal)}</div>
                </div>
                <div style={{ fontSize:30, fontWeight:800, color:C.text, marginBottom:4 }}>{fmt(projectedLeftover)}</div>
                <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>projected left after everything — unspent gas ({fmt(remainingGas)}) stays in</div>
                <Bar fraction={data.endGoal?projectedLeftover/data.endGoal:0} over={projectedLeftover<data.endGoal} />
                <div style={{ marginTop:10, fontSize:13, fontWeight:600, color:aboveGoal>=0?C.green:C.red, display:"flex", alignItems:"center", gap:6 }}>
                  {aboveGoal>=0 ? <Check size={15} /> : <X size={15} />}{aboveGoal>=0?`${fmt(aboveGoal)} of room left`:`${fmt(Math.abs(aboveGoal))} below goal`}
                </div>
              </div>
              <div style={cardStyle}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, fontWeight:600 }}><Fuel size={17} color={C.accent2} /> Gas</div>
                  <div style={{ fontSize:12, color:C.sub }}>Budget {fmt(data.gasBudget)}</div>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:12 }}>
                  <div style={{ fontSize:24, fontWeight:800 }}>{fmt(gasSpent)}{gasReimbursed>0 && <span style={{ fontSize:13, fontWeight:600, color:C.green }}> · +{fmt(gasReimbursed)} back</span>}</div>
                  <div style={{ fontSize:13, color:remainingGas<0?C.red:C.sub }}>{fmt(remainingGas)} left</div>
                </div>
                <Bar fraction={data.gasBudget?(gasSpent-gasReimbursed)/data.gasBudget:0} over={remainingGas<0} />
              </div>
              </React.Fragment>
              )}
            </div>
          </div>
        </div>
      );
    }

    /* ================= Spending ================= */
    // Quick currency converter — uses the manual Travel-mode rate (edit it here or in Settings),
    // and previews how a purchase would hit the spending limit WITHOUT logging anything.
    function ConvertView({ computed, travel, setTravel }) {
      const [amount, setAmount] = useState("");
      const [toUSD, setToUSD] = useState(true); // true: foreign -> USD; false: USD -> foreign
      const code = (travel && travel.code) || "JPY";
      const symbol = (travel && travel.symbol) || "¥";
      const [rateText, setRateText] = useState(String((travel && travel.rate) || 150));
      // Keep the rate field in sync when the currency (or an external rate change) shifts.
      useEffect(() => { setRateText(String((travel && travel.rate) || 150)); }, [code, travel && travel.rate]);

      const parsedRate = parseFloat(rateText);
      const effRate = !isNaN(parsedRate) && parsedRate > 0 ? parsedRate : ((travel && travel.rate) || 150); // units of `code` per 1 USD
      const onRateChange = (e) => {
        const v = e.target.value;
        if (!/^\d*\.?\d*$/.test(v)) return;
        setRateText(v);
        const n = parseFloat(v);
        if (!isNaN(n) && n > 0 && setTravel) setTravel((t) => ({ ...t, rate: n, rateUpdated: Date.now() }));
      };

      const a = parseFloat(amount);
      const hasAmount = !isNaN(a) && a > 0;
      // USD value of the entered purchase (what actually hits the budget).
      const usdValue = !hasAmount ? 0 : toUSD ? a / effRate : a;
      const foreignValue = !hasAmount ? 0 : toUSD ? a : a * effRate;
      const fmtForeign = (n) => symbol + n.toLocaleString(undefined, { maximumFractionDigits: code === "JPY" || code === "KRW" ? 0 : 2 });

      const remaining = computed.remainingSpending;
      const afterRemaining = remaining - usdValue;
      const limit = computed.spendingLimit || 0;
      const usedAfter = limit > 0 ? Math.min(1.15, Math.max(0, (limit - afterRemaining) / limit)) : 0;
      const wouldOver = afterRemaining < 0;

      const inSym = toUSD ? symbol : "$";
      const outValue = toUSD ? fmt(usdValue) : fmtForeign(foreignValue);

      // How long since the rate was last set — nudges a daily update.
      const daysSince = travel && travel.rateUpdated ? Math.floor((startOfDay(Date.now()) - startOfDay(travel.rateUpdated)) / DAY) : null;
      const updatedLabel = daysSince == null ? "Set today's rate" : daysSince <= 0 ? "Updated today" : daysSince === 1 ? "Updated yesterday" : `Updated ${daysSince} days ago`;
      const stale = daysSince != null && daysSince >= 1;

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
          {/* Currency picker — shared with Travel mode */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CURRENCIES.map((c) => {
              const on = c.code === code;
              return (
                <button key={c.code} onClick={() => { setAmount(""); if (setTravel) setTravel((t) => ({ ...t, code: c.code, symbol: c.symbol })); }}
                  style={{ padding: "8px 13px", borderRadius: 999, border: `1px solid ${on ? C.amber : C.border}`, background: on ? "rgba(251,191,36,0.12)" : C.card, color: on ? C.text : C.sub, fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {c.symbol} {c.code}
                </button>
              );
            })}
          </div>

          {/* Converter card */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Repeat size={16} color={C.green} />
              <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: C.sub, letterSpacing: 0.3 }}>QUICK CONVERT</div>
            </div>

            {/* Input row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: C.sub, flexShrink: 0 }}>{inSym}</span>
              <input inputMode="decimal" value={amount} placeholder="0"
                onChange={(e) => { const v = e.target.value; if (/^\d*\.?\d*$/.test(v)) setAmount(v); }}
                style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 34, fontWeight: 800, textAlign: "right" }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: C.muted, flexShrink: 0 }}>{toUSD ? code : "USD"}</span>
            </div>

            {/* Swap */}
            <div style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
              <button onClick={() => { setToUSD((v) => !v); setAmount(hasAmount ? String(Math.round((toUSD ? usdValue : foreignValue) * 100) / 100) : ""); }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.bg2, color: C.sub, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <ArrowLeftRight size={15} /> Swap
              </button>
            </div>

            {/* Output */}
            <div style={{ background: "rgba(52,211,153,0.08)", border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px" }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{toUSD ? "US Dollars" : code}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: hasAmount ? C.green : C.muted, lineHeight: 1.1, letterSpacing: -0.5 }}>{hasAmount ? outValue : (toUSD ? "$0.00" : symbol + "0")}</div>
            </div>

            {/* Manual rate — set it each day */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px" }}>
              <span style={{ fontSize: 13.5, color: C.sub, flexShrink: 0 }}>1 USD =</span>
              <input inputMode="decimal" value={rateText} onChange={onRateChange} placeholder="0"
                style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 18, fontWeight: 800, textAlign: "right" }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: C.amber, flexShrink: 0 }}>{symbol}</span>
            </div>
            <div style={{ fontSize: 12, color: stale ? C.amber : C.muted, marginTop: 7, textAlign: "right" }}>{updatedLabel} · edit above or in Settings</div>
          </div>

          {/* Spending-limit impact preview (does NOT log anything) */}
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Receipt size={16} color={C.accent} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, letterSpacing: 0.3 }}>IF YOU BUY THIS</div>
              <div style={{ marginLeft: "auto", fontSize: 11, color: C.muted, fontWeight: 600, background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 999, padding: "3px 10px" }}>Preview only</div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
              <div>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>Purchase</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{fmt(usdValue)}</div>
                {hasAmount && <div style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{fmtForeign(foreignValue)}</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>Spending left after</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: wouldOver ? C.red : C.green }}>{fmt(afterRemaining)}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>now {fmt(remaining)}</div>
              </div>
            </div>

            {/* Bar */}
            <div style={{ height: 8, borderRadius: 999, background: C.bg2, overflow: "hidden", marginTop: 14 }}>
              <div style={{ height: "100%", width: (usedAfter * 100).toFixed(1) + "%", background: wouldOver ? C.red : C.green, borderRadius: 999, transition: "width 0.25s ease" }} />
            </div>
            <div style={{ fontSize: 12.5, color: wouldOver ? C.red : C.muted, marginTop: 10 }}>
              {!hasAmount ? "Enter an amount to preview the impact."
                : wouldOver ? `This would put you ${fmt(Math.abs(afterRemaining))} over your spending limit.`
                : `You'd have ${fmt(afterRemaining)} of your ${fmt(limit)} limit left.`}
            </div>
          </div>
        </div>
      );
    }

    function SpendingView({ data, computed, addTransaction, removeTransaction, updateTransaction, readOnly, travel, setTravel, store }) {
      const [amount, setAmount] = useState("");
      const [merchant, setMerchant] = useState("");
      const [category, setCategory] = useState("spending");
      const [inputUSD, setInputUSD] = useState(false); // in travel mode, log this one purchase in USD instead
      const [query, setQuery] = useState("");
      const { spent, spendingLimit, remainingSpending, gasSpent, gasReimbursed, remainingGas, reimbursed, cashRemaining, cashLimitAmt } = computed;
      const overSpend = remainingSpending < 0;
      const q = query.trim().toLowerCase();
      const match = (t) => !q || (t.merchant||"").toLowerCase().includes(q) || String(t.amount).includes(q);
      const spendingTx = data.transactions.filter((t)=>t.category==="spending" && match(t));
      const gasTx = data.transactions.filter((t)=>isGasCat(t.category) && match(t));
      const reimbTx = data.transactions.filter((t)=>t.category==="reimbursement" && match(t));
      // Most-used merchants across every period — one-tap fill when logging a purchase.
      const recentMerchants = useMemo(()=>{
        const counts = {};
        ((store&&store.periods)||[]).forEach((p)=>{ if (p.type==="combined") return; (p.transactions||[]).forEach((t)=>{
          const m = (t.merchant||"").trim();
          if (!m || m==="Purchase" || m==="Gas" || m==="Refund" || m==="Gas Refund" || m==="Recurring") return;
          const k = m.toLowerCase();
          if (!counts[k]) counts[k] = { name:m, n:0, last:0 };
          counts[k].n++; counts[k].last = Math.max(counts[k].last, t.date||0);
        }); });
        return Object.values(counts).sort((a,b)=>(b.n-a.n)||(b.last-a.last)).slice(0,6).map((x)=>x.name);
      }, [store]);
      // A period's foreign cash allowance takes priority over the global travel toggle, so purchases
      // here are logged in that currency and hit both the USD limit and the cash allowance.
      const cl = data.cashLimit || {};
      const cashOn = !!cl.enabled;
      const fx = cashOn && cl.rate > 0 ? { code:cl.code, symbol:cl.symbol, rate:cl.rate }
              : (travel && travel.enabled && travel.rate > 0 ? { code:travel.code, symbol:travel.symbol, rate:travel.rate } : null);
      const travelOn = !!fx;
      const foreignInput = travelOn && !inputUSD; // whether THIS purchase is entered in the foreign currency
      const currSymbol = foreignInput ? fx.symbol : "$";
      const effRate = travelOn ? fx.rate : (travel.rate || 1);

      const handleAdd = () => {
        const a = parseFloat(amount); if (isNaN(a)||a<=0) return;
        const usd = foreignInput ? Math.round((a/effRate)*100)/100 : Math.round(a*100)/100;
        const tx = { id:uid(), amount:usd, merchant:merchant.trim()||defaultMerchant(category), category, date:Date.now() };
        if (foreignInput) { tx.foreignAmount=a; tx.foreignCode=fx.code; tx.foreignSymbol=fx.symbol; tx.rate=effRate; }
        addTransaction(tx); setAmount(""); setMerchant("");
      };
      const pill = (val,label) => <button onClick={()=>setCategory(val)} style={{ flex:1, padding:"10px 0", borderRadius:10, border:`1px solid ${category===val?C.accent:C.border}`, background:category===val?"rgba(129,140,248,0.15)":"transparent", color:category===val?C.text:C.sub, fontSize:12.5, fontWeight:600, whiteSpace:"nowrap", cursor:"pointer" }}>{label}</button>;
      const curBtn = (usd,label) => <button onClick={()=>setInputUSD(usd)} style={{ padding:"5px 11px", borderRadius:8, border:`1px solid ${inputUSD===usd?C.amber:C.border}`, background:inputUSD===usd?"rgba(251,191,36,0.14)":"transparent", color:inputUSD===usd?C.text:C.sub, fontSize:12, fontWeight:700, cursor:"pointer" }}>{label}</button>;
      return (
        <div className="two-col">
          <div className="sticky-col" style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ ...cardStyle, background: overSpend?"rgba(248,113,113,0.1)":"rgba(52,211,153,0.08)", border:`1px solid ${overSpend?"rgba(248,113,113,0.3)":"rgba(52,211,153,0.25)"}`, textAlign:"center" }}>
              <div style={{ fontSize:12, color:C.sub, marginBottom:4 }}>Remaining Spending</div>
              <div style={{ fontSize:36, fontWeight:800, color:overSpend?C.red:C.green, letterSpacing:-0.5 }}>{fmt(remainingSpending)}</div>
              <div style={{ fontSize:12.5, color:C.muted, marginTop:2 }}>{fmt(spent)} spent{reimbursed>0 && <span style={{ color:C.green }}> · +{fmt(reimbursed)} back</span>} of {fmt(spendingLimit)}</div>
              {cashOn && <div style={{ fontSize:13, fontWeight:700, color:cashRemaining<0?C.red:C.amber, marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><Plane size={13} color={C.amber} /> {fmtForeign(cashRemaining, cl.symbol, cl.code)} of {fmtForeign(cashLimitAmt, cl.symbol, cl.code)} cash left</div>}
            </div>
            {readOnly ? (
              <div style={{ ...cardStyle, display:"flex", alignItems:"flex-start", gap:10, background:"rgba(34,211,238,0.06)", border:`1px solid rgba(34,211,238,0.25)` }}>
                <CalendarDays size={17} color={C.accent2} style={{ marginTop:1, flexShrink:0 }} />
                <div style={{ fontSize:13, color:C.text, lineHeight:1.45 }}>This is a <strong>combined monthly view</strong>. Add or edit purchases in the individual pay periods.</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {travelOn && (
                  <div style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(251,191,36,0.07)", border:"1px solid rgba(251,191,36,0.28)", borderRadius:12, padding:"11px 14px" }}>
                    <Plane size={16} color={C.amber} /><div style={{ flex:1, fontSize:13, fontWeight:600, color:C.amber }}>{fx.code} {cashOn?"cash allowance":"travel mode"}</div>
                    <div style={{ textAlign:"right" }}>
                      {cashOn && <div style={{ fontSize:12.5, fontWeight:700, color:cashRemaining<0?C.red:C.text }}>{fmtForeign(cashRemaining, fx.symbol, fx.code)} left</div>}
                      <div style={{ fontSize:12, color:C.muted }}>1 USD = {fx.symbol}{(+effRate).toLocaleString(undefined,{maximumFractionDigits:2})}</div>
                    </div>
                  </div>
                )}
                <div style={cardStyle}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, gap:8 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.sub, letterSpacing:0.3 }}>ADD PURCHASE</div>
                    {travelOn && (
                      <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                        {curBtn(false, `${fx.symbol} ${fx.code}`)}
                        {curBtn(true, "$ USD")}
                      </div>
                    )}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:11, padding:"0 14px", marginBottom:10 }}>
                    <span style={{ color:C.muted, fontSize:18 }}>{currSymbol}</span>
                    <input inputMode="decimal" value={amount} onChange={(e)=>{ const v=e.target.value; if(/^\d*\.?\d*$/.test(v)) setAmount(v); }} onKeyDown={(e)=>{ if(e.key==="Enter") handleAdd(); }} placeholder="0.00" style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:22, fontWeight:700, width:"100%", padding:"14px 6px" }} />
                  </div>
                  <input value={merchant} onChange={(e)=>setMerchant(e.target.value)} onKeyDown={(e)=>{ if(e.key==="Enter") handleAdd(); }} placeholder="Where? (optional)" style={{ width:"100%", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:11, outline:"none", color:C.text, fontSize:15, padding:"13px 14px", marginBottom:recentMerchants.length&&!merchant?8:12 }} />
                  {recentMerchants.length>0 && !merchant && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
                      {recentMerchants.map((m)=><button key={m} onClick={()=>setMerchant(m)} style={{ padding:"5px 11px", borderRadius:999, border:`1px solid ${C.border}`, background:C.bg2, color:C.sub, fontSize:12, fontWeight:600, cursor:"pointer" }}>{m}</button>)}
                    </div>
                  )}
                  <div style={{ display:"flex", gap:8, marginBottom:12 }}>{pill("spending","Spending")}{pill("gas","Gas")}{pill("reimbursement","Refund")}{pill("gasReimbursement","Gas Refund")}</div>
                  <button onClick={handleAdd} style={{ width:"100%", padding:"14px 0", borderRadius:12, border:"none", background:`linear-gradient(90deg, ${C.greenDim}, ${C.green})`, color:"#06281d", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}><Plus size={18} /> {category==="reimbursement"?"Add reimbursement":category==="gasReimbursement"?"Add gas reimbursement":"Add purchase"}</button>
                </div>
              </div>
            )}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {data.transactions.length>5 && (
              <div style={{ display:"flex", alignItems:"center", gap:9, background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"10px 14px" }}>
                <Search size={15} color={C.muted} />
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search purchases…" style={{ flex:1, minWidth:0, background:"transparent", border:"none", outline:"none", color:C.text, fontSize:14 }} />
                {query && <button onClick={()=>setQuery("")} style={{ background:"transparent", border:"none", color:C.muted, cursor:"pointer", display:"flex", padding:0 }} aria-label="Clear search"><X size={14} /></button>}
              </div>
            )}
            <div style={cardStyle}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.sub, letterSpacing:0.3 }}>SPENDING</div>
                <div style={{ fontSize:13, color:C.sub }}>{fmt(spent)}</div>
              </div>
              {spendingTx.length===0 ? <div style={{ color:C.muted, fontSize:14, padding:"24px 0", textAlign:"center" }}>{q?"No matches.":"No purchases yet."}</div> : spendingTx.map((t)=><TxRow key={t.id} t={t} onRemove={removeTransaction} onUpdate={updateTransaction} readOnly={readOnly} />)}
            </div>
            {reimbTx.length>0 && (
              <div style={cardStyle}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.sub, letterSpacing:0.3, display:"flex", alignItems:"center", gap:6 }}><Reimburse size={14} color={C.green} /> REFUNDS</div>
                  <div style={{ fontSize:13, color:C.green, fontWeight:700 }}>+{fmt(reimbursed)}</div>
                </div>
                {reimbTx.map((t)=><TxRow key={t.id} t={t} onRemove={removeTransaction} onUpdate={updateTransaction} readOnly={readOnly} />)}
              </div>
            )}
            <div style={cardStyle}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.sub, letterSpacing:0.3, display:"flex", alignItems:"center", gap:6 }}><Fuel size={14} color={C.accent2} /> GAS</div>
                <div style={{ fontSize:13, color:remainingGas<0?C.red:C.sub }}>{fmt(gasSpent)}{gasReimbursed>0 && <span style={{ color:C.green }}> · +{fmt(gasReimbursed)} back</span>} · {fmt(remainingGas)} left</div>
              </div>
              {gasTx.length===0 ? <div style={{ color:C.muted, fontSize:14, padding:"24px 0", textAlign:"center" }}>{q?"No matches.":"No gas logged yet."}</div> : gasTx.map((t)=><TxRow key={t.id} t={t} onRemove={removeTransaction} onUpdate={updateTransaction} readOnly={readOnly} />)}
            </div>
          </div>
        </div>
      );
    }

    /* ================= Calendar (global) ================= */
    function CalendarView({ data, store }) {
      const [viewMonth, setViewMonth] = useState(()=>startOfMonth(Date.now()));
      const [selectedKey, setSelectedKey] = useState(null);
      const todayKey = dayKey(Date.now());
      const navBtn = { width:38, height:38, borderRadius:10, border:`1px solid ${C.border}`, background:C.card, color:C.sub, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" };
      const allTx = useMemo(()=>{ const txs=[]; store.periods.forEach((p)=>{ if(p.type!=="combined")(p.transactions||[]).forEach((t)=>txs.push({ ...t, _pName:p.period })); }); return txs; }, [store]);
      const byDay = useMemo(()=>{ const m={}; allTx.forEach((t)=>{ const k=dayKey(t.date||Date.now()); if(!m[k])m[k]={total:0,items:[]}; m[k].total += isRefundCat(t.category)?-t.amount:t.amount; m[k].items.push(t); }); return m; }, [allTx]);
      const d0 = new Date(viewMonth), year=d0.getFullYear(), month=d0.getMonth();
      const firstWeekday = new Date(year,month,1).getDay();
      const daysInMonth = new Date(year,month+1,0).getDate();
      const monthLabel = d0.toLocaleDateString("en-US",{month:"long",year:"numeric"});
      const periodStart = startOfDay(data.startDate), periodEndExcl = periodEnd(data);
      const maxDay = Math.max(1, ...Object.keys(byDay).map((k)=>byDay[k].total));
      let monthTotal = 0;
      Object.keys(byDay).forEach((k)=>{ const d=new Date(k.split("-")[0],k.split("-")[1]-1,k.split("-")[2]); if(d.getFullYear()===year&&d.getMonth()===month) monthTotal+=byDay[k].total; });
      const cells = [];
      for (let i=0;i<firstWeekday;i++) cells.push(null);
      for (let day=1;day<=daysInMonth;day++) cells.push(day);
      while (cells.length%7!==0) cells.push(null);
      const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const selected = selectedKey ? byDay[selectedKey] : null;
      const dayPeriods = selected ? Array.from(new Set(selected.items.map((t)=>t._pName).filter(Boolean))) : [];
      const shiftMonth = (n) => { setViewMonth(startOfMonth(new Date(year,month+n,1).getTime())); setSelectedKey(null); };
      return (
        <div className="cal-grid">
          <div style={cardStyle}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <button onClick={()=>shiftMonth(-1)} style={navBtn}><ChevronDown size={18} style={{ transform:"rotate(90deg)" }} /></button>
              <div style={{ textAlign:"center" }}><div style={{ fontSize:18, fontWeight:700, color:C.text }}>{monthLabel}</div><div style={{ fontSize:12.5, color:C.sub, marginTop:1 }}>{fmt(monthTotal)} spent · all periods</div></div>
              <button onClick={()=>shiftMonth(1)} style={navBtn}><ChevronDown size={18} style={{ transform:"rotate(-90deg)" }} /></button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:8, marginBottom:8 }}>
              {weekdays.map((w,i)=><div key={i} style={{ textAlign:"center", fontSize:11.5, fontWeight:600, color:C.muted }}>{w}</div>)}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:8 }}>
              {cells.map((day,i)=>{
                if (!day) return <div key={i} />;
                const k = year+"-"+pad2(month+1)+"-"+pad2(day);
                const ms = new Date(year,month,day).getTime();
                const info = byDay[k];
                const inPeriod = ms>=periodStart && ms<periodEndExcl;
                const isToday = k===todayKey, isSel = k===selectedKey;
                const intensity = info ? 0.12 + 0.33*Math.min(1, info.total/maxDay) : 0;
                return (
                  <button key={i} onClick={()=>setSelectedKey(isSel?null:k)} className="hoverable" style={{ aspectRatio:"1 / 1", borderRadius:11, cursor:"pointer", padding:4, border: isSel?`2px solid ${C.green}`:(isToday?`1px solid ${C.accent}`:`1px solid ${inPeriod?C.border:"transparent"}`), background: info?`rgba(52,211,153,${intensity})`:(inPeriod?C.cardHi:"transparent"), display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2 }}>
                    <span style={{ fontSize:14, fontWeight:isToday?800:600, color:isToday?C.accent:C.text }}>{day}</span>
                    {info && <span style={{ fontSize:10, fontWeight:700, color: info.total<0?C.green:C.green, lineHeight:1 }}>{info.total<0?"+":""}${Math.abs(Math.round(info.total))}</span>}
                  </button>
                );
              })}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:16, fontSize:11.5, color:C.muted, justifyContent:"center" }}>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:11, height:11, borderRadius:3, background:"rgba(52,211,153,0.35)" }} /> spending</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:11, height:11, borderRadius:3, border:`1px solid ${C.accent}` }} /> today</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:11, height:11, borderRadius:3, background:C.cardHi, border:`1px solid ${C.border}` }} /> active period</span>
            </div>
          </div>
          <div className="sticky-col" style={cardStyle}>
            {selectedKey ? (
              <React.Fragment>
                <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:12 }}>
                  <div style={{ fontSize:16, fontWeight:700, color:C.text }}>{new Date(selectedKey.split("-")[0],selectedKey.split("-")[1]-1,selectedKey.split("-")[2]).toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}</div>
                  <div style={{ fontSize:15, fontWeight:700, color:selected?C.green:C.muted }}>{fmt(selected?selected.total:0)}</div>
                </div>
                {dayPeriods.length > 0 && (
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:14, fontSize:12, color:C.sub }}>
                    <CalendarDays size={13} color={C.muted} />
                    <span>From {dayPeriods.length===1 ? dayPeriods[0] : dayPeriods.length+" pay periods"}</span>
                  </div>
                )}
                {selected && selected.items.length ? selected.items.map((t)=>{ const isReimb=isRefundCat(t.category); const showTag = dayPeriods.length>1 && t._pName; return (
                  <div key={t.id} style={{ display:"flex", alignItems:"center", padding:"11px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ width:32, height:32, borderRadius:9, background: isReimb?"rgba(52,211,153,0.15)":(t.category==="gas"?"rgba(34,211,238,0.12)":"rgba(129,140,248,0.12)"), display:"flex", alignItems:"center", justifyContent:"center", marginRight:11, flexShrink:0 }}>{isReimb?(t.category==="gasReimbursement"?<Fuel size={15} color={C.green} />:<Reimburse size={15} color={C.green} />):(t.category==="gas"?<Fuel size={15} color={C.accent2} />:<Receipt size={15} color={C.accent} />)}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:14, color:C.text }}>{t.merchant}</div>
                      {showTag && <div style={{ fontSize:11.5, color:C.muted, marginTop:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t._pName}</div>}
                    </div>
                    <div style={{ fontSize:14.5, fontWeight:700, color:isReimb?C.green:C.text, marginLeft:8 }}>{isReimb?"+":""}{fmt(t.amount)}</div>
                  </div>
                ); }) : <div style={{ color:C.muted, fontSize:14, padding:"24px 0", textAlign:"center" }}>No purchases on this day.</div>}
              </React.Fragment>
            ) : <div style={{ color:C.muted, fontSize:14, padding:"40px 0", textAlign:"center" }}>Select a day to see its purchases.<br/>The calendar shows spending across <strong>all</strong> your pay periods.</div>}
          </div>
        </div>
      );
    }

    /* ================= Budget / Setup ================= */
    function AllocationRow({ a, onUpdate, onRemove }) {
      const [amt, setAmt] = useState(a.amount ? String(a.amount) : "");
      return (
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ color:C.muted, display:"flex", flexShrink:0 }}><DollarSign size={15} /></span>
          <input value={a.name} onChange={(e)=>onUpdate(a.id,{ name:e.target.value })} placeholder="Name (e.g. Rent)" style={{ flex:1, minWidth:0, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:10, outline:"none", color:C.text, fontSize:14, padding:"9px 10px" }} />
          <div style={{ display:"flex", alignItems:"center", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:10, padding:"0 8px", width:110, flexShrink:0 }}>
            <span style={{ color:C.muted, fontSize:13 }}>$</span>
            <input inputMode="decimal" value={amt} onChange={(e)=>{ const v=e.target.value; if(!/^\d*\.?\d*$/.test(v))return; setAmt(v); const n=v===""||v==="."?0:parseFloat(v); onUpdate(a.id,{ amount:isNaN(n)?0:n }); }} placeholder="0.00" style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:14, fontWeight:600, width:"100%", textAlign:"right", padding:"9px 2px" }} />
          </div>
          <button onClick={()=>onRemove(a.id)} style={{ width:30, height:30, borderRadius:8, border:"none", background:"transparent", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><X size={15} /></button>
        </div>
      );
    }
    function RecurringRow({ r, onUpdate, onRemove }) {
      const [amt, setAmt] = useState(r.amount ? String(r.amount) : "");
      return (
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
          <span style={{ color:C.muted, display:"flex", flexShrink:0 }}><Repeat size={15} /></span>
          <input value={r.merchant} onChange={(e)=>onUpdate(r.id,{ merchant:e.target.value })} placeholder="Name (e.g. Netflix)" style={{ flex:1, minWidth:0, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:10, outline:"none", color:C.text, fontSize:14, padding:"9px 10px" }} />
          <div style={{ display:"flex", alignItems:"center", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:10, padding:"0 8px", width:110, flexShrink:0 }}>
            <span style={{ color:C.muted, fontSize:13 }}>$</span>
            <input inputMode="decimal" value={amt} onChange={(e)=>{ const v=e.target.value; if(!/^\d*\.?\d*$/.test(v))return; setAmt(v); const n=v===""||v==="."?0:parseFloat(v); onUpdate(r.id,{ amount:isNaN(n)?0:n }); }} placeholder="0.00" style={{ background:"transparent", border:"none", outline:"none", color:C.text, fontSize:14, fontWeight:600, width:"100%", textAlign:"right", padding:"9px 2px" }} />
          </div>
          <button onClick={()=>onRemove(r.id)} style={{ width:30, height:30, borderRadius:8, border:"none", background:"transparent", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><X size={15} /></button>
        </div>
      );
    }
    function BudgetView({ data, update, clearTransactions, computed, addAllocation, updateAllocation, removeAllocation, readOnly, travel, recurring, addRecurring, updateRecurring, removeRecurring, applyRecurring }) {
      const [confirming, setConfirming] = useState(false);
      const len = data.lengthDays || 14;
      const cl = data.cashLimit || { enabled:false, standalone:false, code:"JPY", symbol:"¥", amount:0, rate:150 };
      const setCash = (patch) => update({ cashLimit: { ...cl, ...patch } });
      const [cashAmt, setCashAmt] = useState(cl.amount ? String(cl.amount) : "");
      const [cashRate, setCashRate] = useState(cl.rate ? String(cl.rate) : "");
      const toggleStyle = (on,color) => ({ width:46, height:26, borderRadius:99, border:"none", background:on?color:C.border, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" });
      const knobStyle = (on) => ({ position:"absolute", top:3, left:on?22:3, width:20, height:20, borderRadius:99, background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.3)" });
      const sectionTitle = { fontSize:13, fontWeight:600, color:C.sub, marginBottom:4, letterSpacing:0.3 };
      const stepBtn = { width:40, height:40, borderRadius:10, border:`1px solid ${C.border}`, background:C.card, color:C.text, fontSize:20, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 };
      const bRow = (label,value,opts={}) => (
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:opts.bold?15:13.5, padding:"5px 0", borderTop:opts.top?`1px solid ${C.borderHi}`:"none", marginTop:opts.top?6:0, paddingTop:opts.top?10:5 }}>
          <span style={{ color:opts.bold?C.text:C.sub, fontWeight:opts.bold?700:500 }}>{label}</span>
          <span style={{ fontWeight:opts.bold?800:600, color:opts.valueColor||C.text }}>{value}</span>
        </div>
      );
      const limitCard = (
        <div style={{ background:"linear-gradient(180deg, rgba(52,211,153,0.13), rgba(52,211,153,0.04))", border:"1px solid rgba(52,211,153,0.35)", borderRadius:16, padding:22 }}>
          <div style={{ fontSize:12.5, fontWeight:700, color:C.green, letterSpacing:0.5, textAlign:"center" }}>{data.combined?"MONTHLY SPENDING LIMIT":"SPENDING LIMIT"}</div>
          <div style={{ fontSize:42, fontWeight:800, color:C.green, textAlign:"center", letterSpacing:-1, marginTop:6 }}>{fmt(computed.spendingLimit)}</div>
          <div style={{ fontSize:12.5, color:C.sub, textAlign:"center", marginTop:4, marginBottom:16 }}>auto-calculated — what you can spend this period</div>
          <div style={{ background:"rgba(0,0,0,0.22)", borderRadius:12, padding:"8px 14px 12px" }}>
            {bRow("Starting + Income", fmt(computed.available))}
            {bRow("− Savings", "−"+fmt(data.savings))}
            {bRow("− Gas budget", "−"+fmt(data.gasBudget))}
            {bRow("− Insurance", "−"+fmt(data.insurance))}
            {(data.allocations||[]).map((a)=><React.Fragment key={a.id}>{bRow("− "+(a.name||"Allocation"), "−"+fmt(a.amount||0))}</React.Fragment>)}
            {computed.cashOn && computed.cashSetAside > 0 && bRow(`− Travel cash (${fmtForeign(computed.cashLimitAmt, cl.symbol, cl.code)})`, "−"+fmt(computed.cashSetAside))}
            {bRow("− End goal", "−"+fmt(data.endGoal))}
            {bRow("Spending limit", fmt(computed.spendingLimit), { top:true, bold:true, valueColor:C.green })}
          </div>
          {computed.rawLimit<0 && (
            <div style={{ marginTop:14, display:"flex", gap:9, alignItems:"flex-start", background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:12, padding:"11px 13px" }}>
              <AlertTriangle size={16} color={C.red} style={{ marginTop:1, flexShrink:0 }} />
              <div style={{ fontSize:12.5, color:C.text, lineHeight:1.45 }}>Your end goal is <strong>{fmt(-computed.rawLimit)}</strong> more than you have after allocations. Lower the goal or allocations.</div>
            </div>
          )}
        </div>
      );
      if (readOnly) {
        return (
          <div className="two-col">
            <div style={{ ...cardStyle, display:"flex", alignItems:"flex-start", gap:10, background:"rgba(34,211,238,0.06)", border:`1px solid rgba(34,211,238,0.25)` }}>
              <CalendarDays size={17} color={C.accent2} style={{ marginTop:1, flexShrink:0 }} />
              <div style={{ fontSize:13, color:C.text, lineHeight:1.45 }}>Combined monthly view of <strong>{(data.sourceNames||[]).join(" + ")}</strong>. Edit each period individually.</div>
            </div>
            {limitCard}
          </div>
        );
      }
      return (
        <div className="two-col">
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={cardStyle}>
              <div style={{ ...sectionTitle, marginBottom:10 }}>PERIOD</div>
              <input value={data.period} onChange={(e)=>update({ period:e.target.value })} placeholder="Period name" style={{ width:"100%", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:11, outline:"none", color:C.text, fontSize:15, padding:"12px 14px", marginBottom:12 }} />
              <div style={{ fontSize:12, color:C.muted, marginBottom:6 }}>Start date</div>
              <input type="date" value={toDateInput(data.startDate)} onChange={(e)=>update({ startDate:fromDateInput(e.target.value) })} style={{ width:"100%", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:11, outline:"none", color:C.text, fontSize:15, padding:"11px 14px" }} />
              <div style={{ fontSize:12, color:C.muted, margin:"14px 0 6px" }}>Length</div>
              <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                {LENGTH_PRESETS.map((pr)=><button key={pr.d} onClick={()=>update({ lengthDays:pr.d })} style={{ flex:1, minWidth:0, padding:"9px 0", borderRadius:10, border:`1px solid ${len===pr.d?C.green:C.border}`, background:len===pr.d?"rgba(52,211,153,0.12)":C.bg2, color:len===pr.d?C.text:C.sub, fontSize:12.5, fontWeight:600, cursor:"pointer" }}>{pr.label}</button>)}
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:C.bg2, border:`1px solid ${C.border}`, borderRadius:11, padding:8 }}>
                <button onClick={()=>update({ lengthDays:Math.max(3,len-1) })} style={stepBtn}>−</button>
                <div style={{ textAlign:"center" }}><div style={{ fontSize:17, fontWeight:700, color:C.text }}>{len} days</div><div style={{ fontSize:11.5, color:C.muted }}>{periodRangeLabel(data)}</div></div>
                <button onClick={()=>update({ lengthDays:Math.min(31,len+1) })} style={stepBtn}>＋</button>
              </div>
            </div>
            <div style={cardStyle}>
              <div style={sectionTitle}>INCOME</div>
              <NumberField label="Starting Balance" icon={<Banknote size={15} />} value={data.startingBalance} onChange={(v)=>update({ startingBalance:v })} />
              <NumberField label="Total Income" icon={<TrendingUp size={15} />} value={data.totalIncome} onChange={(v)=>update({ totalIncome:v })} />
            </div>
            <div style={cardStyle}>
              <div style={sectionTitle}>ALLOCATIONS</div>
              <NumberField label="Savings" icon={<PiggyBank size={15} />} value={data.savings} onChange={(v)=>update({ savings:v })} />
              <NumberField label="Gas Budget" icon={<Fuel size={15} />} value={data.gasBudget} onChange={(v)=>update({ gasBudget:v })} />
              <NumberField label="Insurance" icon={<Shield size={15} />} value={data.insurance} onChange={(v)=>update({ insurance:v })} />
              {(data.allocations||[]).map((a)=><AllocationRow key={a.id} a={a} onUpdate={updateAllocation} onRemove={removeAllocation} />)}
              <button onClick={()=>addAllocation("")} style={{ width:"100%", padding:"11px 0", borderRadius:11, border:`1px dashed ${C.borderHi}`, background:"transparent", color:C.sub, fontSize:13.5, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:12 }}><Plus size={16} /> Add allocation</button>
            </div>
            <div style={cardStyle}>
              <div style={{ ...sectionTitle, display:"flex", alignItems:"center", gap:6 }}><Repeat size={14} color={C.accent} /> RECURRING EXPENSES</div>
              <div style={{ fontSize:12, color:C.muted, marginBottom:4, lineHeight:1.45 }}>Subscriptions and bills logged automatically as purchases in every new pay period.</div>
              {(recurring||[]).map((r)=><RecurringRow key={r.id} r={r} onUpdate={updateRecurring} onRemove={removeRecurring} />)}
              <button onClick={addRecurring} style={{ width:"100%", padding:"11px 0", borderRadius:11, border:`1px dashed ${C.borderHi}`, background:"transparent", color:C.sub, fontSize:13.5, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:12 }}><Plus size={16} /> Add recurring expense</button>
              {(recurring||[]).some((r)=>r.amount>0) && (
                <button onClick={applyRecurring} style={{ width:"100%", padding:"10px 0", borderRadius:11, border:`1px solid ${C.border}`, background:"transparent", color:C.sub, fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:8 }}><Plus size={15} /> Add missing ones to this period now</button>
              )}
            </div>
            <div style={cardStyle}>
              <div style={sectionTitle}>END GOAL</div>
              <NumberField label="Amount to keep" sublabel="left over at the end of the period" icon={<Target size={15} />} value={data.endGoal} onChange={(v)=>update({ endGoal:v })} />
            </div>
            <div style={cardStyle}>
              <div style={{ ...sectionTitle, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}><Plane size={14} color={C.amber} /> TRAVEL CASH</div>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14.5, fontWeight:600, color:C.text }}>Foreign cash allowance</div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>A spending limit in a travel currency (e.g. ¥10,000 withdrawn)</div>
                </div>
                <button onClick={()=>setCash({ enabled:!cl.enabled, ...(!cl.enabled && travel && travel.enabled ? { code:travel.code, symbol:travel.symbol, rate:travel.rate } : {}) })} style={toggleStyle(cl.enabled, C.green)}><div style={knobStyle(cl.enabled)} /></button>
              </div>
              {cl.enabled && (
                <div style={{ marginTop:16 }}>
                  <div style={{ fontSize:12, color:C.muted, marginBottom:8 }}>Currency</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:6 }}>
                    {CURRENCIES.map((c)=><button key={c.code} onClick={()=>setCash({ code:c.code, symbol:c.symbol })} style={{ padding:"9px 6px", borderRadius:10, border:`1px solid ${cl.code===c.code?C.amber:C.border}`, background:cl.code===c.code?"rgba(251,191,36,0.12)":C.bg2, color:cl.code===c.code?C.text:C.sub, fontSize:12.5, fontWeight:600, cursor:"pointer", textAlign:"center" }}>{c.symbol} {c.code}</button>)}
                  </div>
                  <div style={{ fontSize:12, color:C.muted, margin:"16px 0 8px" }}>Cash on hand / withdrawn</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:11, padding:"12px 14px" }}>
                    <span style={{ fontSize:16, fontWeight:700, color:C.amber, flexShrink:0 }}>{cl.symbol}</span>
                    <input inputMode="decimal" value={cashAmt} onChange={(e)=>{ const v=e.target.value; if(!/^\d*\.?\d*$/.test(v)) return; setCashAmt(v); const n=v===""||v==="."?0:parseFloat(v); setCash({ amount:isNaN(n)?0:n }); }} placeholder="10000" style={{ flex:1, minWidth:0, background:"transparent", border:"none", outline:"none", color:C.text, fontSize:18, fontWeight:700, textAlign:"right" }} />
                  </div>
                  <div style={{ fontSize:12, color:C.muted, margin:"14px 0 8px" }}>Exchange rate</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:11, padding:"12px 14px" }}>
                    <span style={{ fontSize:13.5, color:C.sub, flexShrink:0 }}>1 USD =</span>
                    <input inputMode="decimal" value={cashRate} onChange={(e)=>{ const v=e.target.value; if(!/^\d*\.?\d*$/.test(v)) return; setCashRate(v); const n=parseFloat(v); if(!isNaN(n)&&n>0) setCash({ rate:n }); }} placeholder="150" style={{ flex:1, minWidth:0, background:"transparent", border:"none", outline:"none", color:C.text, fontSize:17, fontWeight:700, textAlign:"right" }} />
                    <span style={{ fontSize:14, fontWeight:700, color:C.amber, flexShrink:0 }}>{cl.symbol}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:18 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:600, color:C.text }}>Standalone period</div>
                      <div style={{ fontSize:12, color:C.muted, marginTop:1 }}>Track only {cl.code} — hide the USD spending limit here</div>
                    </div>
                    <button onClick={()=>setCash({ standalone:!cl.standalone })} style={toggleStyle(cl.standalone, C.amber)}><div style={knobStyle(cl.standalone)} /></button>
                  </div>
                  <div style={{ fontSize:11.5, color:C.muted, marginTop:14, lineHeight:1.5 }}>Its USD value{computed.cashSetAside > 0 ? ` (${fmt(computed.cashSetAside)})` : ""} is set aside from your spending limit up front. {cl.code} purchases are then tracked only against this cash — they don't touch your USD limit. Both circles show on the Dashboard.</div>
                </div>
              )}
            </div>
          </div>
          <div className="sticky-col" style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {limitCard}
            <div style={cardStyle}>
              <button onClick={()=>setConfirming(true)} style={{ width:"100%", padding:"12px 0", borderRadius:12, border:`1px solid ${C.border}`, background:"transparent", color:C.sub, fontSize:14, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><RotateCcw size={16} /> Clear purchases in this period</button>
            </div>
          </div>
          {confirming && <ConfirmModal title="Clear all purchases?" message="Are you sure? This action cannot be undone." confirmLabel="Clear" onCancel={()=>setConfirming(false)} onConfirm={()=>{ clearTransactions(); setConfirming(false); }} />}
        </div>
      );
    }

    /* ================= Period modal ================= */
    function PeriodModal({ store, onClose, onSwitch, onCreate, onDelete, onCombine, onArchive }) {
      const [confirmId, setConfirmId] = useState(null);
      const [archiveId, setArchiveId] = useState(null);
      const [archivedOpen, setArchivedOpen] = useState(false);
      const [combining, setCombining] = useState(false);
      const [selected, setSelected] = useState([]);
      const visiblePeriods = store.periods.filter((p)=>p.type!=="archived");
      const archivedPeriods = store.periods.filter((p)=>p.type==="archived");
      const singleCount = store.periods.filter((p)=>p.type==="single").length;
      const toggleSelect = (id) => setSelected((s)=>s.includes(id)?s.filter((x)=>x!==id):(s.length>=4?s:[...s,id]));
      const canCreate = selected.length>=2 && selected.length<=4;
      const archiveTarget = archiveId ? store.periods.find((p)=>p.id===archiveId) : null;
      return (
        <React.Fragment>
        <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
          <div onClick={(e)=>e.stopPropagation()} style={{ width:"100%", maxWidth:520, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:18, padding:22, maxHeight:"86vh", display:"flex", flexDirection:"column", animation:"popIn 0.2s ease" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, fontSize:18, fontWeight:700, color:C.text }}><CalendarDays size={19} color={C.green} /> {combining?"Pick 2–4 periods":"Pay Periods"} <span style={{ fontSize:13, color:C.muted, fontWeight:500 }}>({visiblePeriods.length})</span></div>
              <button onClick={onClose} style={{ width:32, height:32, borderRadius:9, border:"none", background:C.card, color:C.sub, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={18} /></button>
            </div>
            {combining && <div style={{ fontSize:12.5, color:C.sub, marginBottom:12 }}>Select 2 to 4 pay periods to view together as one month — handy for months with 3 paychecks.</div>}
            <div style={{ flex:1, overflowY:"auto", marginBottom:14 }}>
              {visiblePeriods.map((p)=>{
                const isCombined = p.type==="combined";
                const rp = resolvePeriod(store, p);
                const active = p.id===store.activePeriodId;
                const { spent, remainingSpending } = computeStats(rp);
                if (confirmId===p.id) {
                  return (
                    <div key={p.id} style={{ background:"rgba(248,113,113,0.1)", border:`1px solid rgba(248,113,113,0.3)`, borderRadius:12, padding:14, marginBottom:10 }}>
                      <div style={{ fontSize:14, color:C.text, marginBottom:10 }}>Delete <strong>{p.period}</strong>? This can't be undone.</div>
                      <div style={{ display:"flex", gap:10 }}>
                        <button onClick={()=>setConfirmId(null)} style={{ flex:1, padding:"10px 0", borderRadius:10, border:`1px solid ${C.border}`, background:"transparent", color:C.sub, fontSize:13.5, fontWeight:600, cursor:"pointer" }}>Cancel</button>
                        <button onClick={()=>{ onDelete(p.id); setConfirmId(null); }} style={{ flex:1, padding:"10px 0", borderRadius:10, border:"none", background:C.red, color:"#2a0a0a", fontSize:13.5, fontWeight:700, cursor:"pointer" }}>Delete</button>
                      </div>
                    </div>
                  );
                }
                const selectable = combining && !isCombined;
                const isSel = selected.includes(p.id);
                const dim = combining && isCombined;
                const rowCanDelete = store.periods.length>1 && (p.type!=="single" || singleCount>=2);
                const canArchive = p.type==="single" && singleCount>=2;
                return (
                  <div key={p.id} className="hoverable" style={{ display:"flex", alignItems:"center", gap:10, padding:14, borderRadius:12, opacity:dim?0.4:1, background:isSel?"rgba(52,211,153,0.12)":(active&&!combining?"rgba(52,211,153,0.1)":C.card), border:`1px solid ${isSel?C.green:(active&&!combining?"rgba(52,211,153,0.3)":C.border)}`, marginBottom:10 }}>
                    <button onClick={()=>(dim?null:selectable?toggleSelect(p.id):onSwitch(p.id))} style={{ flex:1, textAlign:"left", background:"transparent", border:"none", cursor:dim?"default":"pointer", color:C.text, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, minWidth:0 }}>
                        {isCombined && <span style={{ fontSize:10, fontWeight:700, color:C.accent2, background:"rgba(34,211,238,0.14)", padding:"2px 6px", borderRadius:5, letterSpacing:0.3, flexShrink:0 }}>MONTHLY</span>}
                        <div style={{ fontSize:15, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.period}</div>
                      </div>
                      <div style={{ fontSize:12, color:C.sub, marginTop:3 }}>{periodRangeLabel(rp)} · {fmt(spent)} spent · {fmt(remainingSpending)} left</div>
                    </button>
                    {combining ? (selectable && <div style={{ width:24, height:24, borderRadius:99, border:`2px solid ${isSel?C.green:C.borderHi}`, background:isSel?C.green:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{isSel && <Check size={14} color="#06281d" />}</div>) : (
                      <React.Fragment>
                        {active && <span style={{ fontSize:11, fontWeight:700, color:C.green, background:"rgba(52,211,153,0.15)", padding:"4px 8px", borderRadius:7 }}>Active</span>}
                        {canArchive && <button onClick={()=>setArchiveId(p.id)} title="Archive period" style={{ width:30, height:30, borderRadius:8, border:"none", background:"transparent", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Archive size={16} /></button>}
                        {rowCanDelete && <button onClick={()=>setConfirmId(p.id)} title="Delete period" style={{ width:30, height:30, borderRadius:8, border:"none", background:"transparent", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Trash2 size={16} /></button>}
                      </React.Fragment>
                    )}
                  </div>
                );
              })}
              {!combining && archivedPeriods.length>0 && (
                <div style={{ marginTop:4 }}>
                  <button onClick={()=>setArchivedOpen((o)=>!o)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:12, border:`1px solid ${C.border}`, background:C.card, cursor:"pointer" }}>
                    <Archive size={16} color={C.muted} />
                    <span style={{ flex:1, textAlign:"left", fontSize:13.5, fontWeight:600, color:C.text }}>Archived periods <span style={{ color:C.muted, fontWeight:500 }}>({archivedPeriods.length})</span></span>
                    <span style={{ color:C.muted, display:"flex", transform:archivedOpen?"rotate(180deg)":"none", transition:"transform 0.2s ease" }}><ChevronDown size={16} /></span>
                  </button>
                  {archivedOpen && (
                    <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:8 }}>
                      {archivedPeriods.map((p)=>{ const s=p.summary||{}; return (
                        <div key={p.id} style={{ padding:"11px 13px", borderRadius:12, background:C.bg, border:`1px solid ${C.border}` }}>
                          <div style={{ display:"flex", alignItems:"center", gap:7, minWidth:0 }}>
                            <span style={{ fontSize:9.5, fontWeight:700, color:C.muted, background:C.cardHi, padding:"2px 6px", borderRadius:5, letterSpacing:0.4, flexShrink:0 }}>ARCHIVED</span>
                            <div style={{ fontSize:13.5, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.period}</div>
                          </div>
                          <div style={{ fontSize:11.5, color:C.sub, marginTop:4 }}>{periodRangeLabel(p)} · {fmt(s.spent||0)} spent · {s.txCount||0} purchase{s.txCount===1?"":"s"}</div>
                        </div>
                      ); })}
                      <div style={{ fontSize:11, color:C.muted, textAlign:"center", marginTop:2, lineHeight:1.4 }}>View-only summaries — archived periods can't be reopened or edited, but their purchases still appear in the Calendar.</div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {combining ? (
              <React.Fragment>
                <button onClick={()=>canCreate&&onCombine(selected)} disabled={!canCreate} style={{ width:"100%", padding:"14px 0", borderRadius:12, border:"none", background:canCreate?`linear-gradient(90deg, ${C.greenDim}, ${C.green})`:C.card, color:canCreate?"#06281d":C.muted, fontSize:15, fontWeight:700, cursor:canCreate?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><CalendarDays size={18} /> Create monthly view ({selected.length}/4)</button>
                <button onClick={()=>{ setCombining(false); setSelected([]); }} style={{ width:"100%", padding:"11px 0", borderRadius:11, border:"none", background:"transparent", color:C.sub, fontSize:13.5, fontWeight:600, cursor:"pointer", marginTop:8 }}>Cancel</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button onClick={onCreate} style={{ width:"100%", padding:"14px 0", borderRadius:12, border:"none", background:`linear-gradient(90deg, ${C.greenDim}, ${C.green})`, color:"#06281d", fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><Plus size={18} /> New pay period</button>
                {singleCount>=2 && <button onClick={()=>{ setCombining(true); setSelected([]); setConfirmId(null); }} style={{ width:"100%", padding:"12px 0", borderRadius:12, border:`1px solid ${C.border}`, background:"transparent", color:C.sub, fontSize:14, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:8 }}><CalendarDays size={16} /> Combine periods into a month</button>}
              </React.Fragment>
            )}
          </div>
        </div>
        {archiveTarget && (
          <ConfirmModal
            title="Archive this period?"
            message={<span>Once you archive <strong>{archiveTarget.period}</strong> you won't be able to edit it anymore. Its purchases will still show in the Calendar view, and a summary stays in the archived list.</span>}
            confirmLabel="Archive"
            onCancel={()=>setArchiveId(null)}
            onConfirm={()=>{ onArchive(archiveId); setArchiveId(null); }}
          />
        )}
        </React.Fragment>
      );
    }

    /* ================= Backup modal ================= */
    function BackupModal({ store, onRestore, onClose }) {
      const json = useMemo(()=>JSON.stringify(store), [store]);
      const [paste, setPaste] = useState("");
      const [copied, setCopied] = useState(false);
      const [err, setErr] = useState(false);
      const copy = async () => { try { await navigator.clipboard.writeText(json); setCopied(true); setTimeout(()=>setCopied(false),1800); } catch(e){ try { const ta=document.createElement("textarea"); ta.value=json; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); setCopied(true); setTimeout(()=>setCopied(false),1800); } catch(e2){} } };
      const doRestore = () => { if (!onRestore(paste.trim())) setErr(true); };
      const ta = (extra) => ({ width:"100%", resize:"none", background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, color:C.sub, fontSize:11.5, padding:10, outline:"none", fontFamily:"monospace", ...extra });
      return (
        <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:70, display:"flex", alignItems:"center", justifyContent:"center", padding:18, animation:"fadeIn 0.2s ease" }}>
          <div onClick={(e)=>e.stopPropagation()} style={{ width:"100%", maxWidth:440, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:18, padding:22, animation:"popIn 0.2s ease" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ fontSize:16, fontWeight:700, color:C.text }}>Backup &amp; restore</div>
              <button onClick={onClose} style={{ width:30, height:30, borderRadius:8, border:"none", background:C.card, color:C.sub, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={16} /></button>
            </div>
            <div style={{ fontSize:12.5, color:C.sub, marginBottom:7 }}>Your data — copy it somewhere safe:</div>
            <textarea readOnly value={json} onFocus={(e)=>e.target.select()} style={ta({ height:80 })} />
            <button onClick={copy} style={{ width:"100%", padding:"11px 0", borderRadius:11, border:"none", background:`linear-gradient(90deg, ${C.greenDim}, ${C.green})`, color:"#06281d", fontSize:14, fontWeight:700, cursor:"pointer", marginTop:8, marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>{copied?<React.Fragment><Check size={16} /> Copied</React.Fragment>:"Copy data"}</button>
            <div style={{ fontSize:12.5, color:C.sub, marginBottom:7 }}>Restore from a backup — paste it here:</div>
            <textarea value={paste} onChange={(e)=>{ setPaste(e.target.value); setErr(false); }} placeholder="Paste your backup text…" style={ta({ height:64, color:C.text, border:`1px solid ${err?C.red:C.border}` })} />
            {err && <div style={{ fontSize:12, color:C.red, marginTop:6 }}>That doesn't look like a valid backup.</div>}
            <button onClick={doRestore} disabled={!paste.trim()} style={{ width:"100%", padding:"11px 0", borderRadius:11, border:`1px solid ${C.border}`, background:paste.trim()?C.card:"transparent", color:paste.trim()?C.text:C.muted, fontSize:14, fontWeight:700, cursor:paste.trim()?"pointer":"default", marginTop:8 }}>Restore data</button>
          </div>
        </div>
      );
    }

    /* ================= Settings modal ================= */
    function SettingsModal({ themeMode, setThemeMode, accent, setAccent, store, onReset, onRestore, onClose, travel, setTravel }) {
      const [confirmReset, setConfirmReset] = useState(false);
      const [backupOpen, setBackupOpen] = useState(false);
      const [rateText, setRateText] = useState(String(travel.rate||150));
      const themeOpts = [{ id:"light", label:"Light", Ico:Sun },{ id:"dark", label:"Dark", Ico:Moon },{ id:"oled", label:"OLED", Ico:Contrast }];
      const sectionLabel = { fontSize:12, fontWeight:700, color:C.muted, letterSpacing:0.5, marginBottom:10, marginTop:4 };
      const rowBtn = { width:"100%", display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderRadius:12, border:`1px solid ${C.border}`, background:C.card, fontSize:14.5, fontWeight:600, cursor:"pointer" };
      return (
        <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:55, display:"flex", alignItems:"center", justifyContent:"center", padding:20, animation:"fadeIn 0.2s ease" }}>
          <div onClick={(e)=>e.stopPropagation()} style={{ width:"100%", maxWidth:520, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:18, padding:24, maxHeight:"88vh", overflowY:"auto", animation:"popIn 0.2s ease" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9, fontSize:18, fontWeight:700, color:C.text }}><Cog size={19} color={C.green} /> Settings</div>
              <button onClick={onClose} style={{ width:32, height:32, borderRadius:9, border:"none", background:C.card, color:C.sub, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><X size={18} /></button>
            </div>
            <div style={sectionLabel}>APPEARANCE</div>
            <div style={{ display:"flex", gap:10, marginBottom:22 }}>
              {themeOpts.map(({ id, label, Ico })=>{ const th=THEMES[id], active=themeMode===id; return (
                <button key={id} onClick={()=>setThemeMode(id)} style={{ flex:1, padding:10, borderRadius:14, border:`1.5px solid ${active?C.green:C.border}`, background:active?"rgba(52,211,153,0.08)":C.cardHi, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:9 }}>
                  <div style={{ width:"100%", height:42, borderRadius:9, background:th.bg, border:`1px solid ${th.border}`, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                    <div style={{ width:20, height:20, borderRadius:6, background:`linear-gradient(135deg, ${th.greenDim}, ${th.green})` }} />
                    <div style={{ display:"flex", flexDirection:"column", gap:3 }}><div style={{ width:22, height:4, borderRadius:9, background:th.text, opacity:0.85 }} /><div style={{ width:15, height:4, borderRadius:9, background:th.sub, opacity:0.7 }} /></div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:5, color:active?C.text:C.sub, fontSize:13, fontWeight:600 }}><Ico size={14} />{label}{active && <Check size={13} color={C.green} />}</div>
                </button>
              ); })}
            </div>

            <div style={sectionLabel}>ACCENT COLOR</div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center", marginBottom:22 }}>
              {ACCENTS.map((a)=>{ const active = accent.key === a.key; return (
                <button key={a.key} onClick={()=>setAccent({ ...accent, key:a.key })} title={a.label} style={{ width:38, height:38, borderRadius:99, cursor:"pointer", border:`2px solid ${active?C.text:"transparent"}`, boxShadow:active?"none":`0 0 0 1px ${C.border}`, background:`linear-gradient(135deg, ${a.dim}, ${a.main})`, display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>
                  {active && <Check size={17} color="#fff" />}
                </button>
              ); })}
              <label title="Custom color" style={{ width:38, height:38, borderRadius:99, cursor:"pointer", border:`2px solid ${accent.key==="custom"?C.text:"transparent"}`, boxShadow:accent.key==="custom"?"none":`0 0 0 1px ${C.border}`, background: accent.key==="custom" ? `linear-gradient(135deg, ${darken(accent.custom,0.14)}, ${accent.custom})` : "conic-gradient(#f43f5e, #fbbf24, #34d399, #22d3ee, #3b82f6, #8b5cf6, #f43f5e)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                {accent.key==="custom" && <Check size={17} color="#fff" />}
                <input type="color" value={accent.custom||"#34d399"} onChange={(e)=>setAccent({ key:"custom", custom:e.target.value })} style={{ position:"absolute", inset:0, opacity:0, cursor:"pointer", border:"none" }} />
              </label>
            </div>

            <div style={sectionLabel}>TRAVEL</div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, marginBottom:22, overflow:"hidden" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px" }}>
                <Plane size={18} color={C.amber} />
                <div style={{ flex:1 }}><div style={{ fontSize:14.5, fontWeight:600, color:C.text }}>Travel mode</div><div style={{ fontSize:12, color:C.muted, marginTop:1 }}>Log in a foreign currency, auto-convert to USD</div></div>
                <button onClick={()=>setTravel((t)=>({ ...t, enabled:!t.enabled }))} style={{ width:46, height:26, borderRadius:99, border:"none", background:travel.enabled?C.green:C.border, position:"relative", cursor:"pointer", flexShrink:0, transition:"background 0.2s" }}><div style={{ position:"absolute", top:3, left:travel.enabled?22:3, width:20, height:20, borderRadius:99, background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.3)" }} /></button>
              </div>
              {travel.enabled && (
                <div style={{ padding:"0 16px 16px", borderTop:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:12, color:C.muted, margin:"14px 0 8px" }}>Currency</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:6 }}>
                    {CURRENCIES.map((c)=><button key={c.code} onClick={()=>setTravel((t)=>({ ...t, code:c.code, symbol:c.symbol }))} style={{ padding:"9px 6px", borderRadius:10, border:`1px solid ${travel.code===c.code?C.amber:C.border}`, background:travel.code===c.code?"rgba(251,191,36,0.12)":C.bg2, color:travel.code===c.code?C.text:C.sub, fontSize:12.5, fontWeight:600, cursor:"pointer" }}>{c.symbol} {c.code}</button>)}
                  </div>
                  <div style={{ fontSize:12, color:C.muted, margin:"14px 0 8px" }}>Exchange rate</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, background:C.bg2, border:`1px solid ${C.border}`, borderRadius:11, padding:"12px 14px" }}>
                    <span style={{ fontSize:13.5, color:C.sub, flexShrink:0 }}>1 USD =</span>
                    <input inputMode="decimal" value={rateText} onChange={(e)=>{ const v=e.target.value; if(!/^\d*\.?\d*$/.test(v))return; setRateText(v); const n=parseFloat(v); if(!isNaN(n)&&n>0) setTravel((t)=>({ ...t, rate:n, rateUpdated:Date.now() })); }} style={{ flex:1, background:"transparent", border:"none", outline:"none", color:C.text, fontSize:17, fontWeight:700, textAlign:"right" }} />
                    <span style={{ fontSize:14, fontWeight:700, color:C.amber, flexShrink:0 }}>{travel.symbol}</span>
                  </div>
                  <div style={{ fontSize:11.5, color:C.muted, marginTop:7 }}>Set the rate manually — update it daily. Also editable on the Convert tab.</div>
                </div>
              )}
            </div>
            <div style={sectionLabel}>DATA</div>
            <button onClick={()=>setBackupOpen(true)} style={{ ...rowBtn, color:C.text, marginBottom:10 }}><Download size={18} color={C.accent2} /> Backup &amp; restore<span style={{ marginLeft:"auto", color:C.muted, fontSize:12.5, fontWeight:500 }}>Save or paste a copy</span></button>
            {!confirmReset ? (
              <button onClick={()=>setConfirmReset(true)} style={{ ...rowBtn, color:C.red }}><Trash2 size={18} /> Reset all data</button>
            ) : (
              <div style={{ background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:12, padding:14 }}>
                <div style={{ fontSize:13.5, color:C.text, marginBottom:12, textAlign:"center" }}>Delete <strong>all periods and purchases</strong>? This cannot be undone.</div>
                <div style={{ display:"flex", gap:10 }}>
                  <button onClick={()=>setConfirmReset(false)} style={{ flex:1, padding:"11px 0", borderRadius:11, border:`1px solid ${C.border}`, background:"transparent", color:C.sub, fontSize:14, fontWeight:600, cursor:"pointer" }}>Cancel</button>
                  <button onClick={onReset} style={{ flex:1, padding:"11px 0", borderRadius:11, border:"none", background:C.red, color:"#2a0a0a", fontSize:14, fontWeight:700, cursor:"pointer" }}>Reset</button>
                </div>
              </div>
            )}
            <div style={{ ...sectionLabel, marginTop:22 }}>ABOUT</div>
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:16, textAlign:"center" }}>
              <div style={{ fontSize:14.5, fontWeight:700, color:C.text }}>Weekly Budget — Web</div>
              <div style={{ fontSize:12.5, color:C.sub, marginTop:3 }}>Version 3.2 · Gas reimbursements</div>
            </div>
            {backupOpen && <BackupModal store={store} onRestore={onRestore} onClose={()=>setBackupOpen(false)} />}
          </div>
        </div>
      );
    }

    /* ================= Sidebar ================= */
    function Sidebar({ tab, setTab, activePeriod, onOpenPeriods, onOpenSettings, account, travelOn }) {
      const nav = [
        { id:"dashboard", label:"Dashboard", icon:Grid },
        { id:"spending", label:"Spending", icon:Receipt },
        travelOn && { id:"convert", label:"Convert", icon:Repeat },
        { id:"calendar", label:"Calendar", icon:CalendarDays },
        { id:"budget", label:"Budget", icon:Sliders },
      ].filter(Boolean);
      return (
        <div className="sidebar">
          <div className="sb-logo" style={{ display:"flex", alignItems:"center", gap:11, padding:"4px 8px 18px" }}>
            <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg, ${C.greenDim}, ${C.green})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Wallet size={21} color="#06281d" /></div>
            <div style={{ fontSize:16, fontWeight:800, color:C.text, letterSpacing:-0.3 }}>Weekly Budget</div>
          </div>
          <button onClick={onOpenPeriods} className="hoverable sb-period" style={{ display:"flex", alignItems:"center", gap:10, width:"100%", textAlign:"left", background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"11px 12px", cursor:"pointer", marginBottom:18 }}>
            <CalendarDays size={16} color={C.green} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:10, color:C.muted, fontWeight:600, letterSpacing:0.4 }}>ACTIVE PERIOD</div>
              <div style={{ fontSize:13.5, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{activePeriod.period}</div>
            </div>
            <ChevronDown size={16} color={C.sub} />
          </button>
          <div className="sb-section-label" style={{ fontSize:10.5, fontWeight:700, color:C.muted, letterSpacing:0.6, padding:"0 10px 8px" }}>MENU</div>
          <div className="sb-nav" style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {nav.map((n)=>{ const Ico=n.icon, active=tab===n.id; return (
              <button key={n.id} onClick={()=>setTab(n.id)} className="navitem" style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 12px", borderRadius:11, border:"none", cursor:"pointer", background:active?"rgba(52,211,153,0.12)":"transparent", color:active?C.green:C.sub, fontSize:14, fontWeight:active?700:500, textAlign:"left", width:"100%" }}>
                <Ico size={19} strokeWidth={active?2.4:2} />{n.label}
              </button>
            ); })}
          </div>
          <div className="sb-grow" style={{ flex:1 }} />
          <div className="sb-account">{account}</div>
          <button onClick={onOpenSettings} className="navitem sb-settings" style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 12px", borderRadius:11, border:"none", cursor:"pointer", background:"transparent", color:C.sub, fontSize:14, fontWeight:500, textAlign:"left", width:"100%", marginTop:6 }}><Cog size={19} /> Settings</button>
        </div>
      );
    }

    /* ================= Account panel (sync placeholder until Firebase) ================= */
    function AccountPanel({ user, syncState, onSignIn, onSignOut }) {
      if (user) {
        return (
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:12, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:99, background:`linear-gradient(135deg, ${C.accent}, ${C.accent2})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, flexShrink:0 }}>{(user.name||"U").slice(0,1)}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user.name}</div>
              <div style={{ fontSize:11, color:C.green, display:"flex", alignItems:"center", gap:4 }}><Cloud size={12} /> {syncState||"Synced"}</div>
            </div>
            <button onClick={onSignOut} title="Sign out" style={{ width:30, height:30, borderRadius:8, border:"none", background:"transparent", color:C.muted, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><LogOut size={16} /></button>
          </div>
        );
      }
      return (
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:12 }}>
          <div style={{ fontSize:11, color:C.muted, display:"flex", alignItems:"center", gap:5, marginBottom:9 }}><CloudOff size={13} /> Local only — not synced</div>
          <button onClick={onSignIn} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:9, padding:"10px 0", borderRadius:10, border:`1px solid ${C.border}`, background:C.bg2, color:C.text, fontSize:13.5, fontWeight:600, cursor:"pointer" }}><GoogleG size={17} /> Sign in with Google</button>
        </div>
      );
    }

    /* ================= Cloud sync (Firebase) =================
       Strategy: each user's whole budget lives at budgets/{uid} as { data, updatedAt }.
       On sign-in we merge by timestamp (newer wins), then keep a live onSnapshot
       subscription. Local edits debounce-write up. lastSyncedRef suppresses echoes
       so a remote update we just applied doesn't bounce straight back to the cloud. */
    function useCloudSync({ store, setStore, travel, setTravel, showToast }) {
      const [user, setUser] = useState(null);
      const [syncState, setSyncState] = useState("Local only");
      const fbRef = useRef(null);
      const unsubDocRef = useRef(null);
      // Travel mode (a global setting) rides in the SAME doc as the budget data, sharing one
      // updatedAt clock so newest-wins covers both. The baseline signature therefore folds in
      // travel too — flipping travel on/off counts as an edit that pushes, and a remote change
      // to either data or travel applies to this device.
      const normTravel = (t) => { const b = { enabled:false, code:"JPY", symbol:"¥", rate:150 }; return t ? { ...b, ...t } : b; };
      const sig = (s, t) => JSON.stringify({ d: s, t: normTravel(t) });
      const lastSyncedRef = useRef(sig(store, travel)); // content last loaded/synced — baseline for edit detection
      const localUpdatedRef = useRef((() => { try { return parseInt(localStorage.getItem(UPDATED_KEY) || "0", 10); } catch (e) { return 0; } })());
      const writeTimer = useRef(null);
      const readyRef = useRef(false);
      const storeRef = useRef(store);
      storeRef.current = store;
      const travelRef = useRef(travel);
      travelRef.current = travel;

      // Apply data coming FROM the cloud without it counting as a local edit: set the
      // baseline + edit-time to match the incoming data before storing it, so the
      // edit-detector below sees no divergence and the clock is never falsely advanced.
      const applyRemote = (data, travelField, updatedAt) => {
        const n = normalize(data); if (!n) return;
        const hasTravel = travelField != null;                 // legacy docs may omit travel — keep local then
        const t = hasTravel ? normTravel(travelField) : travelRef.current;
        lastSyncedRef.current = sig(n, t);
        localUpdatedRef.current = updatedAt || Date.now();
        try { localStorage.setItem(UPDATED_KEY, String(localUpdatedRef.current)); } catch (e) {}
        setStore(n);
        if (hasTravel) setTravel(t);
      };

      // bridge to window.__fb (set by the module loader); watch auth
      useEffect(() => {
        let unsubAuth = null;
        const init = () => {
          const fb = window.__fb;
          if (!fb) return false;
          fbRef.current = fb;
          unsubAuth = fb.onAuthStateChanged(fb.auth, (u) => {
            if (u) setUser({ uid: u.uid, name: u.displayName || u.email || "You", email: u.email, photo: u.photoURL });
            else { setUser(null); setSyncState("Local only"); }
          });
          return true;
        };
        if (init()) return () => { if (unsubAuth) unsubAuth(); };
        if (window.__fbError) setSyncState("Offline");
        const onReady = () => init();
        window.addEventListener("firebase-ready", onReady);
        return () => { window.removeEventListener("firebase-ready", onReady); if (unsubAuth) unsubAuth(); };
      }, []);

      // On sign-in: newest-wins merge (compare true edit-times), then live subscription.
      useEffect(() => {
        const fb = fbRef.current;
        readyRef.current = false;
        if (unsubDocRef.current) { unsubDocRef.current(); unsubDocRef.current = null; }
        if (!fb || !user) return;
        const ref = fb.doc(fb.db, "budgets", user.uid);
        setSyncState("Syncing…");
        let cancelled = false;
        fb.getDoc(ref).then((snap) => {
          if (cancelled) return;
          const local = storeRef.current;
          const localUpdated = localUpdatedRef.current;
          if (snap.exists() && snap.data() && snap.data().data) {
            const cloud = snap.data();
            if ((cloud.updatedAt || 0) > localUpdated) {
              applyRemote(cloud.data, cloud.travel, cloud.updatedAt);   // cloud edited more recently → take it
            } else {
              lastSyncedRef.current = sig(local, travelRef.current);    // local edited more recently → keep + push
              fb.setDoc(ref, { data: local, travel: normTravel(travelRef.current), updatedAt: localUpdated || Date.now() }, { merge: true });
            }
          } else {
            lastSyncedRef.current = sig(local, travelRef.current);      // nothing in cloud yet → seed it
            fb.setDoc(ref, { data: local, travel: normTravel(travelRef.current), updatedAt: localUpdated || Date.now() });
          }
          readyRef.current = true;
          setSyncState("Synced");
          unsubDocRef.current = fb.onSnapshot(ref, (s) => {
            if (s.metadata.hasPendingWrites) return;              // ignore our own in-flight write
            const d = s.data(); if (!d || !d.data) return;
            const remoteTravel = d.travel != null ? d.travel : travelRef.current;
            if (sig(normalize(d.data), remoteTravel) === lastSyncedRef.current) return; // nothing new
            applyRemote(d.data, d.travel, d.updatedAt);           // a change from another device
            setSyncState("Synced");
          }, () => setSyncState("Sync error"));
        }).catch(() => setSyncState("Sync error"));
        return () => { cancelled = true; if (unsubDocRef.current) { unsubDocRef.current(); unsubDocRef.current = null; } };
      }, [user]);

      // Detect a genuine local edit (store diverges from the synced baseline), stamp the
      // real edit time, and push up when signed in. Loads and applied remote updates match
      // the baseline, so they never count as edits and never restamp the clock.
      useEffect(() => {
        const json = sig(store, travel);
        if (json === lastSyncedRef.current) return;   // load / remote echo — not a local edit
        lastSyncedRef.current = json;
        localUpdatedRef.current = Date.now();
        try { localStorage.setItem(UPDATED_KEY, String(localUpdatedRef.current)); } catch (e) {}
        const fb = fbRef.current;
        if (!fb || !user || !readyRef.current) return; // edit while signed out — stamped locally, pushed on next sign-in
        if (writeTimer.current) clearTimeout(writeTimer.current);
        setSyncState("Saving…");
        const ts = localUpdatedRef.current;
        writeTimer.current = setTimeout(() => {
          fb.setDoc(fb.doc(fb.db, "budgets", user.uid), { data: store, travel: normTravel(travel), updatedAt: ts }, { merge: true })
            .then(() => setSyncState("Synced")).catch(() => setSyncState("Sync error"));
        }, 700);
        return () => { if (writeTimer.current) clearTimeout(writeTimer.current); };
      }, [store, travel, user]);

      const signIn = () => {
        const fb = fbRef.current || window.__fb;
        if (!fb) { showToast("Sync unavailable — Firebase didn't load.", null); return; }
        const provider = new fb.GoogleAuthProvider();
        fb.signInWithPopup(fb.auth, provider).catch((e) => {
          const code = e && e.code;
          if (code === "auth/popup-blocked" || code === "auth/cancelled-popup-request") fb.signInWithRedirect(fb.auth, provider);
          else if (code !== "auth/popup-closed-by-user") showToast("Sign-in failed: " + (code || "unknown"), null);
        });
      };
      const signOut = () => { const fb = fbRef.current; if (fb) fb.signOut(fb.auth); setUser(null); };

      return { user, syncState, signIn, signOut };
    }

    /* ================= App ================= */
    function App() {
      const [store, setStore] = useState(()=>loadStore());
      const [tab, setTab] = useState("dashboard");
      const [periodsOpen, setPeriodsOpen] = useState(false);
      const [settingsOpen, setSettingsOpen] = useState(false);
      const [themeMode, setThemeMode] = useState(()=>{ try { return localStorage.getItem(THEME_KEY)||"dark"; } catch(e){ return "dark"; } });
      const [accent, setAccent] = useState(()=>{ try { return JSON.parse(localStorage.getItem(ACCENT_KEY))||{ key:"green", custom:"#34d399" }; } catch(e){ return { key:"green", custom:"#34d399" }; } });
      const [travel, setTravel] = useState(()=>{ try { return JSON.parse(localStorage.getItem(TRAVEL_KEY))||{ enabled:false, code:"JPY", symbol:"¥", rate:150 }; } catch(e){ return { enabled:false, code:"JPY", symbol:"¥", rate:150 }; } });
      const [toast, setToast] = useState(null);
      const toastTimer = useRef(null);
      applyTheme(themeMode, resolveAccent(accent.key, accent.custom));

      // Convert tab only exists while travel mode is on — bounce off it if travel gets disabled.
      useEffect(()=>{ if (tab==="convert" && !(travel && travel.enabled)) setTab("dashboard"); }, [tab, travel && travel.enabled]);

      const showToast = (message, undo) => { setToast({ message, undo }); if (toastTimer.current) clearTimeout(toastTimer.current); toastTimer.current = setTimeout(()=>setToast(null), 4500); };

      const { user, syncState, signIn, signOut } = useCloudSync({ store, setStore, travel, setTravel, showToast });

      useEffect(()=>{ try { localStorage.setItem(THEME_KEY, themeMode); } catch(e){} const m=document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute("content", C.bg); }, [themeMode]);
      useEffect(()=>{ try { localStorage.setItem(ACCENT_KEY, JSON.stringify(accent)); } catch(e){} }, [accent]);
      // Debounced persist — serializing the whole store on every keystroke gets costly as history grows.
      // A pagehide/hidden flush covers closing the tab inside the debounce window.
      const persistRef = useRef(store);
      const dirtyRef = useRef(false); // only flush when a debounced write is actually pending
      const firstPersist = useRef(true);
      persistRef.current = store;
      useEffect(()=>{
        if (firstPersist.current) { firstPersist.current = false; return; } // mount = data just loaded, nothing to save
        dirtyRef.current = true;
        const t = setTimeout(()=>{ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); dirtyRef.current = false; } catch(e){} }, 400);
        return ()=>clearTimeout(t);
      }, [store]);
      useEffect(()=>{
        const flush = () => { if (!dirtyRef.current) return; try { localStorage.setItem(STORAGE_KEY, JSON.stringify(persistRef.current)); dirtyRef.current = false; } catch(e){} };
        const onVis = () => { if (document.visibilityState === "hidden") flush(); };
        window.addEventListener("pagehide", flush); document.addEventListener("visibilitychange", onVis);
        return () => { window.removeEventListener("pagehide", flush); document.removeEventListener("visibilitychange", onVis); };
      }, []);
      useEffect(()=>{ try { localStorage.setItem(TRAVEL_KEY, JSON.stringify(travel)); } catch(e){} }, [travel]);

      const activePeriod = store.periods.find((p)=>p.id===store.activePeriodId) || store.periods[0];
      const view = useMemo(()=>resolvePeriod(store, activePeriod), [store, activePeriod]);
      const readOnly = !!view.readOnly;
      const computed = useMemo(()=>computeStats(view), [view]);

      const updateActive = (updater) => setStore((s)=>({ ...s, periods:s.periods.map((p)=>(p.id===s.activePeriodId?updater(p):p)) }));
      const update = (patch) => updateActive((p)=>({ ...p, ...patch }));
      const addTransaction = (t) => updateActive((p)=>({ ...p, transactions:[...p.transactions, t] }));
      const removeTransaction = (id) => {
        const p = activePeriod; const idx = p.transactions.findIndex((x)=>x.id===id); if (idx<0) return;
        const removed = p.transactions[idx];
        updateActive((pp)=>({ ...pp, transactions:pp.transactions.filter((x)=>x.id!==id) }));
        showToast(isRefundCat(removed.category)?"Reimbursement deleted":"Purchase deleted", ()=>{ updateActive((pp)=>{ const arr=pp.transactions.slice(); arr.splice(Math.min(idx,arr.length),0,removed); return { ...pp, transactions:arr }; }); setToast(null); });
      };
      const updateTransaction = (id, patch) => updateActive((p)=>({ ...p, transactions:p.transactions.map((x)=>(x.id===id?{ ...x, ...patch }:x)) }));
      const clearTransactions = () => updateActive((p)=>({ ...p, transactions:[] }));
      // Recurring expenses — store-level templates auto-logged into each new pay period.
      const addRecurring = () => setStore((s)=>({ ...s, recurring:[...(s.recurring||[]), { id:"r"+uid(), merchant:"", amount:0 }] }));
      const updateRecurring = (id, patch) => setStore((s)=>({ ...s, recurring:(s.recurring||[]).map((r)=>(r.id===id?{ ...r, ...patch }:r)) }));
      const removeRecurring = (id) => setStore((s)=>({ ...s, recurring:(s.recurring||[]).filter((r)=>r.id!==id) }));
      const applyRecurring = () => { // add any missing recurring expenses to the CURRENT period
        const rec = (store.recurring||[]).filter((r)=>r.amount>0);
        if (!rec.length || !activePeriod || activePeriod.type!=="single") return;
        const have = new Set((activePeriod.transactions||[]).map((t)=>t.recurringId).filter(Boolean));
        const toAdd = rec.filter((r)=>!have.has(r.id));
        if (!toAdd.length) { showToast("All recurring expenses are already in this period", null); return; }
        updateActive((p)=>({ ...p, transactions:[...p.transactions, ...toAdd.map((r)=>({ id:uid(), recurringId:r.id, amount:r.amount, merchant:r.merchant.trim()||"Recurring", category:"spending", date:Date.now() }))] }));
        showToast(toAdd.length+" recurring expense"+(toAdd.length>1?"s":"")+" added", null);
      };
      const addAllocation = (name) => updateActive((p)=>({ ...p, allocations:[...(p.allocations||[]), { id:"a"+Date.now()+Math.random().toString(36).slice(2,5), name:name||"", amount:0 }] }));
      const updateAllocation = (id, patch) => updateActive((p)=>({ ...p, allocations:(p.allocations||[]).map((a)=>(a.id===id?{ ...a, ...patch }:a)) }));
      const removeAllocation = (id) => updateActive((p)=>({ ...p, allocations:(p.allocations||[]).filter((a)=>a.id!==id) }));
      const resetAllData = () => { setStore(DEFAULT_DATA); setSettingsOpen(false); setTab("dashboard"); showToast("All data reset", null); };
      const restoreData = (json) => { try { const n=normalize(JSON.parse(json)); if(!n) return false; setStore(n); setSettingsOpen(false); setTab("dashboard"); showToast("Backup restored", null); return true; } catch(e){ return false; } };
      const createPeriod = () => {
        const src = view;
        const np = makePeriod({ period:"New Pay Period", startDate:periodEnd(src), lengthDays:src.lengthDays||14, startingBalance:src.startingBalance, totalIncome:src.totalIncome, savings:src.savings, gasBudget:src.gasBudget, insurance:src.insurance, endGoal:src.endGoal, allocations:(src.allocations||[]).map((a,i)=>({ id:"a"+Date.now()+i+Math.random().toString(36).slice(2,4), name:a.name, amount:a.amount })) });
        const rec = (store.recurring||[]).filter((r)=>r.amount>0);
        if (rec.length) np.transactions = rec.map((r)=>({ id:uid(), recurringId:r.id, amount:r.amount, merchant:r.merchant.trim()||"Recurring", category:"spending", date:np.startDate }));
        setStore((s)=>({ ...s, periods:[np, ...s.periods], activePeriodId:np.id })); setPeriodsOpen(false); setTab("budget");
        if (rec.length) showToast(rec.length+" recurring expense"+(rec.length>1?"s":"")+" added to the new period", null);
      };
      const switchPeriod = (id) => { setStore((s)=>({ ...s, activePeriodId:id })); setPeriodsOpen(false); setTab("dashboard"); };
      const combinePeriods = (ids) => {
        if (!ids||ids.length<2||ids.length>4) return;
        const srcs = ids.map((id)=>store.periods.find((p)=>p.id===id)).filter(Boolean);
        const name = srcs.length>2 ? "Monthly · "+srcs.length+" periods" : "Monthly · "+srcs.map((s)=>s.period).join(" + ");
        const np = { id:"c"+Date.now()+Math.random().toString(36).slice(2,5), type:"combined", createdAt:Date.now(), period:name, sourceIds:ids };
        setStore((s)=>({ ...s, periods:[np, ...s.periods], activePeriodId:np.id })); setPeriodsOpen(false); setTab("dashboard");
      };
      const deletePeriod = (id) => setStore((s)=>{ if(s.periods.length<=1) return s; const periods=s.periods.filter((p)=>p.id!==id); let activePeriodId=s.activePeriodId; if(activePeriodId===id){ const single=periods.find((p)=>p.type==="single"); activePeriodId=(single||periods[0]).id; } return { ...s, periods, activePeriodId }; });
      const archivePeriod = (id) => setStore((s)=>{
        const p = s.periods.find((x)=>x.id===id);
        if (!p || p.type!=="single") return s;
        const otherSingles = s.periods.filter((x)=>x.type==="single" && x.id!==id);
        if (!otherSingles.length) return s;
        const archived = makeArchivedPeriod(p);
        const periods = s.periods.map((x)=>(x.id===id?archived:x));
        let activePeriodId = s.activePeriodId;
        if (activePeriodId===id) activePeriodId = otherSingles[0].id;
        return { ...s, periods, activePeriodId };
      });

      const titleMap = { dashboard:"Dashboard", spending:"Spending", convert:"Converter", calendar:"Calendar", budget:"Budget" };
      const travelOn = travel.enabled && travel.rate>0;

      return (
        <div className="shell">
          <Sidebar tab={tab} setTab={setTab} activePeriod={activePeriod} onOpenPeriods={()=>setPeriodsOpen(true)} onOpenSettings={()=>setSettingsOpen(true)} travelOn={travel && travel.enabled}
            account={<AccountPanel user={user} syncState={syncState} onSignIn={signIn} onSignOut={signOut} />} />
          <div className="main">
            <div className="content">
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24, flexWrap:"wrap" }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <h1 style={{ margin:0, fontSize:26, fontWeight:800, letterSpacing:-0.5, color:C.text }}>{titleMap[tab]}</h1>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:5, fontSize:13, color:C.sub }}>
                    <CalendarDays size={14} color={C.muted} /><span>{activePeriod.period} · {periodRangeLabel(view)} · {view.lengthDays} days</span>
                    {view.combined && <span style={{ fontSize:10.5, fontWeight:700, color:C.accent2, background:"rgba(34,211,238,0.14)", padding:"2px 7px", borderRadius:6, letterSpacing:0.3 }}>MONTHLY</span>}
                  </div>
                </div>
                {travelOn && <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(251,191,36,0.08)", border:"1px solid rgba(251,191,36,0.28)", borderRadius:10, padding:"8px 12px", fontSize:12.5, fontWeight:600, color:C.amber }}><Plane size={15} /> {travel.code} · 1 USD = {travel.symbol}{travel.rate}</div>}
                {tab!=="calendar" && tab!=="convert" && !readOnly && <button onClick={()=>setTab("spending")} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 16px", borderRadius:11, border:"none", background:`linear-gradient(90deg, ${C.greenDim}, ${C.green})`, color:"#06281d", fontSize:14, fontWeight:700, cursor:"pointer" }}><Plus size={17} /> Add purchase</button>}
              </div>
              <div key={tab+activePeriod.id} style={{ animation:"fadeSlide 0.28s ease" }}>
                {tab==="dashboard" && <Dashboard data={view} computed={computed} />}
                {tab==="spending" && <SpendingView data={view} computed={computed} addTransaction={addTransaction} removeTransaction={removeTransaction} updateTransaction={updateTransaction} readOnly={readOnly} travel={travel} setTravel={setTravel} store={store} />}
                {tab==="convert" && <ConvertView computed={computed} travel={travel} setTravel={setTravel} />}
                {tab==="calendar" && <CalendarView data={view} store={store} />}
                {tab==="budget" && <BudgetView data={view} update={update} clearTransactions={clearTransactions} computed={computed} addAllocation={addAllocation} updateAllocation={updateAllocation} removeAllocation={removeAllocation} readOnly={readOnly} travel={travel} recurring={store.recurring} addRecurring={addRecurring} updateRecurring={updateRecurring} removeRecurring={removeRecurring} applyRecurring={applyRecurring} />}
              </div>
            </div>
          </div>
          {periodsOpen && <PeriodModal store={store} onClose={()=>setPeriodsOpen(false)} onSwitch={switchPeriod} onCreate={createPeriod} onDelete={deletePeriod} onCombine={combinePeriods} onArchive={archivePeriod} />}
          {settingsOpen && <SettingsModal themeMode={themeMode} setThemeMode={setThemeMode} accent={accent} setAccent={setAccent} store={store} onReset={resetAllData} onRestore={restoreData} onClose={()=>setSettingsOpen(false)} travel={travel} setTravel={setTravel} />}
          {toast && <Toast message={toast.message} undo={toast.undo} onClose={()=>setToast(null)} />}
        </div>
      );
    }

    // Last-resort crash screen — data stays untouched in localStorage/cloud.
    class ErrorBoundary extends React.Component {
      constructor(props) { super(props); this.state = { error: null }; }
      static getDerivedStateFromError(error) { return { error }; }
      render() {
        if (!this.state.error) return this.props.children;
        return (
          <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
            <div style={{ maxWidth:420, textAlign:"center" }}>
              <div style={{ width:56, height:56, borderRadius:16, background:"rgba(248,113,113,0.12)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}><AlertTriangle size={26} color="#f87171" /></div>
              <div style={{ fontSize:20, fontWeight:800, color:"var(--text)", marginBottom:8 }}>Something went wrong</div>
              <div style={{ fontSize:13.5, color:"var(--sub)", lineHeight:1.5, marginBottom:20 }}>Your data is safe. Reload the app to keep going.</div>
              <button onClick={()=>window.location.reload()} style={{ padding:"12px 24px", borderRadius:11, border:"none", background:"var(--green)", color:"#06281d", fontSize:14.5, fontWeight:700, cursor:"pointer" }}>Reload app</button>
            </div>
          </div>
        );
      }
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<ErrorBoundary><App /></ErrorBoundary>);
