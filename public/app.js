function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

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
  clock: `<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>`
};
function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: style,
    dangerouslySetInnerHTML: {
      __html: ICONS[name] || ""
    }
  });
}
const mk = n => p => /*#__PURE__*/React.createElement(Icon, _extends({
  name: n
}, p));
const Wallet = mk("wallet"),
  Receipt = mk("receipt"),
  Sliders = mk("sliders"),
  Grid = mk("grid"),
  Plus = mk("plus"),
  X = mk("x"),
  Fuel = mk("fuel"),
  Target = mk("target"),
  PiggyBank = mk("piggy"),
  Shield = mk("shield"),
  TrendingUp = mk("trending"),
  DollarSign = mk("dollar"),
  Check = mk("check"),
  RotateCcw = mk("rotate"),
  Banknote = mk("banknote"),
  ChevronDown = mk("chevron"),
  Trash2 = mk("trash"),
  CalendarDays = mk("calendar"),
  AlertTriangle = mk("alert"),
  Pencil = mk("edit"),
  Cog = mk("cog"),
  Sun = mk("sun"),
  Moon = mk("moon"),
  Contrast = mk("contrast"),
  Download = mk("download"),
  Reimburse = mk("reimburse"),
  Plane = mk("plane"),
  LogOut = mk("logout"),
  Cloud = mk("cloud"),
  CloudOff = mk("cloudoff"),
  Repeat = mk("repeat"),
  ArrowLeftRight = mk("swap"),
  Archive = mk("archive"),
  Search = mk("search"),
  Clock = mk("clock");
function GoogleG({
  size = 18
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 48 48"
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#FFC107",
    d: "M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF3D00",
    d: "M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#4CAF50",
    d: "M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#1976D2",
    d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41.4 35.5 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z"
  }));
}

/* ================= Themes ================= */
const THEMES = {
  dark: {
    appBg: "#06070a",
    chrome: "rgba(12,14,19,0.9)",
    bg: "#0c0e13",
    bg2: "#0f1219",
    card: "#15181f",
    cardHi: "#1c202a",
    border: "#262b36",
    borderHi: "#333a47",
    text: "#eef1f6",
    sub: "#98a2b3",
    muted: "#646e7e",
    green: "#34d399",
    greenDim: "#10b981",
    red: "#f87171",
    amber: "#fbbf24",
    accent: "#818cf8",
    accent2: "#22d3ee"
  },
  oled: {
    appBg: "#000000",
    chrome: "rgba(0,0,0,0.92)",
    bg: "#000000",
    bg2: "#050608",
    card: "#0b0d12",
    cardHi: "#14171f",
    border: "#1d222e",
    borderHi: "#2b3240",
    text: "#eef1f6",
    sub: "#9aa4b2",
    muted: "#69727f",
    green: "#34d399",
    greenDim: "#10b981",
    red: "#f87171",
    amber: "#fbbf24",
    accent: "#818cf8",
    accent2: "#22d3ee"
  },
  light: {
    appBg: "#e7e9ee",
    chrome: "rgba(255,255,255,0.85)",
    bg: "#f4f5f8",
    bg2: "#ffffff",
    card: "#ffffff",
    cardHi: "#f1f3f6",
    border: "#e2e6ec",
    borderHi: "#d2d8e0",
    text: "#1a1d23",
    sub: "#5b6573",
    muted: "#98a1b0",
    green: "#059669",
    greenDim: "#10b981",
    red: "#dc2626",
    amber: "#d97706",
    accent: "#6366f1",
    accent2: "#0891b2"
  }
};
let C = THEMES.dark;
const mkCard = () => ({
  background: C.card,
  border: `1px solid ${C.border}`,
  borderRadius: 16,
  padding: 20
});
let cardStyle = mkCard();

// Accent (brand) colors — override the default emerald. "green" keeps each theme's tuned default.
const ACCENTS = [{
  key: "green",
  label: "Emerald",
  main: "#34d399",
  dim: "#10b981"
}, {
  key: "blue",
  label: "Blue",
  main: "#3b82f6",
  dim: "#2563eb"
}, {
  key: "violet",
  label: "Violet",
  main: "#8b5cf6",
  dim: "#7c3aed"
}, {
  key: "rose",
  label: "Rose",
  main: "#fb7185",
  dim: "#f43f5e"
}, {
  key: "amber",
  label: "Amber",
  main: "#fbbf24",
  dim: "#f59e0b"
}, {
  key: "cyan",
  label: "Cyan",
  main: "#22d3ee",
  dim: "#06b6d4"
}, {
  key: "orange",
  label: "Orange",
  main: "#fb923c",
  dim: "#f97316"
}];
const darken = (hex, amt) => {
  const n = parseInt((hex || "#000000").slice(1), 16);
  let r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  r = Math.round(r * (1 - amt));
  g = Math.round(g * (1 - amt));
  b = Math.round(b * (1 - amt));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
function resolveAccent(key, customHex) {
  if (key === "custom" && customHex) return {
    main: customHex,
    dim: darken(customHex, 0.14)
  };
  if (!key || key === "green") return null;
  const a = ACCENTS.find(x => x.key === key);
  return a ? {
    main: a.main,
    dim: a.dim
  } : null;
}
function applyTheme(mode, accent) {
  C = {
    ...(THEMES[mode] || THEMES.dark)
  };
  if (accent && accent.main) {
    C.green = accent.main;
    C.greenDim = accent.dim || accent.main;
  }
  cardStyle = mkCard();
  const root = document.documentElement.style;
  Object.keys(C).forEach(k => root.setProperty("--" + k, C[k]));
  root.colorScheme = mode === "light" ? "light" : "dark"; // native date pickers follow the theme
  document.body.style.background = C.appBg;
}
const STORAGE_KEY = "weekly-budget-v1";
const THEME_KEY = "weekly-budget-theme";
const TRAVEL_KEY = "weekly-budget-travel";
const UPDATED_KEY = "weekly-budget-updatedAt";
const ACCENT_KEY = "weekly-budget-accent";
const SYNC_KEY = "weekly-budget-sync-v1";
const CARRY_KEY = "weekly-budget-carry";
const ONBOARD_KEY = "weekly-budget-onboarded-v1";
const CURRENCIES = [{
  code: "JPY",
  symbol: "¥",
  label: "JPY · Japan"
}, {
  code: "EUR",
  symbol: "€",
  label: "EUR · Europe"
}, {
  code: "GBP",
  symbol: "£",
  label: "GBP · UK"
}, {
  code: "KRW",
  symbol: "₩",
  label: "KRW · Korea"
}, {
  code: "CAD",
  symbol: "C$",
  label: "CAD · Canada"
}, {
  code: "AUD",
  symbol: "A$",
  label: "AUD · Australia"
}, {
  code: "MXN",
  symbol: "MX$",
  label: "MXN · Mexico"
}, {
  code: "THB",
  symbol: "฿",
  label: "THB · Thailand"
}, {
  code: "HKD",
  symbol: "HK$",
  label: "HKD · Hong Kong"
}, {
  code: "SGD",
  symbol: "S$",
  label: "SGD · Singapore"
}, {
  code: "INR",
  symbol: "₹",
  label: "INR · India"
}, {
  code: "PHP",
  symbol: "₱",
  label: "PHP · Philippines"
}];

// Spending-allocation (category) colors — each new category gets the first unused one.
const SPEND_COLORS = ["#60a5fa", "#f472b6", "#a78bfa", "#fbbf24", "#34d399", "#fb923c", "#22d3ee", "#f87171", "#a3e635", "#e879f9", "#94a3b8", "#2dd4bf"];
const nextSpendColor = list => {
  const used = new Set((list || []).map(a => (a.color || "").toLowerCase()));
  return SPEND_COLORS.find(c => !used.has(c)) || SPEND_COLORS[(list || []).length % SPEND_COLORS.length];
};

// Collision-safe id — Date.now() alone can collide across devices (sync) or fast taps.
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ================= Date helpers ================= */
const DAY = 86400000;
const pad2 = n => String(n).padStart(2, "0");
const startOfDay = ts => {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};
// Calendar days, not 24-hour blocks — a period crossing a DST change must still end at midnight.
const addDays = (ts, n) => {
  const d = new Date(startOfDay(ts));
  d.setDate(d.getDate() + n);
  return d.getTime();
};
const startOfMonth = ts => {
  const d = new Date(ts);
  return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
};
const dayKey = ts => {
  const d = new Date(ts);
  return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
};
const toDateInput = ts => {
  const d = new Date(ts);
  return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
};
const fromDateInput = v => {
  const a = (v || "").split("-").map(Number);
  return new Date(a[0], (a[1] || 1) - 1, a[2] || 1, 0, 0, 0, 0).getTime();
};
const fmtMonthDay = ts => new Date(ts).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric"
});
const periodEnd = p => addDays(p.startDate, p.lengthDays || 14); // exclusive
const periodRangeLabel = p => fmtMonthDay(p.startDate) + " – " + fmtMonthDay(periodEnd(p) - 1); // last ms of the last day
const LENGTH_PRESETS = [{
  label: "3 days",
  d: 3
}, {
  label: "Weekly",
  d: 7
}, {
  label: "Biweekly",
  d: 14
}, {
  label: "Monthly",
  monthly: true
}];
// A calendar month from `start` (Oct 15 → Nov 15), clamped for short months (Jan 31 → Feb 28).
const monthLength = start => {
  const d = new Date(start),
    y = d.getFullYear(),
    m = d.getMonth();
  const end = new Date(y, m + 1, Math.min(d.getDate(), new Date(y, m + 2, 0).getDate())).getTime();
  return Math.round((end - startOfDay(start)) / DAY);
};
const NOON = 12 * 3600000; // backdated purchases sit mid-day so DST shifts can't move their day
const isToday = ts => startOfDay(ts) === startOfDay(Date.now());
const dayLabel = ts => {
  const k = startOfDay(ts),
    today = startOfDay(Date.now());
  if (k === today) return "Today";
  if (k === startOfDay(today - 1)) return "Yesterday";
  return new Date(ts).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
};
const ordinal = n => n + (n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th");
// Newest first; purchases with the same timestamp keep reverse insertion order.
const newestFirst = txs => txs.map((t, i) => [t, i]).sort((a, b) => (b[0].date || 0) - (a[0].date || 0) || b[1] - a[1]).map(x => x[0]);
const reinsert = (arr, idx, item) => {
  const a = (arr || []).slice();
  a.splice(Math.min(idx, a.length), 0, item);
  return a;
};
function makePeriod(o = {}) {
  return {
    id: "p" + Date.now() + Math.random().toString(36).slice(2, 6),
    type: "single",
    createdAt: Date.now(),
    period: "New Pay Period",
    startDate: startOfDay(Date.now()),
    lengthDays: 14,
    startingBalance: 0,
    totalIncome: 0,
    savings: 0,
    gasBudget: 0,
    insurance: 0,
    endGoal: 0,
    allocations: [],
    spendingAllocations: [],
    transactions: [],
    ...o
  };
}

// The purchases a recurring expense adds to a pay period: one on its first day ("every period"),
// or for "monthly on the Nth", one per Nth that falls inside the period — none if none does, so
// a monthly bill isn't counted twice by biweekly periods.
function recurringTxFor(p, r) {
  const category = r.category === "gas" ? "gas" : "spending";
  const tx = {
    recurringId: r.id,
    amount: r.amount,
    merchant: (r.merchant || "").trim() || "Recurring",
    category
  };
  const want = category === "spending" && (r.allocName || "").trim().toLowerCase();
  const alloc = want && (p.spendingAllocations || []).find(a => (a.name || "").trim().toLowerCase() === want);
  if (alloc) tx.allocId = alloc.id;
  if (r.freq !== "monthly") return [{
    ...tx,
    id: uid(),
    recurringKey: r.id,
    date: p.startDate
  }];
  const out = [],
    start = startOfDay(p.startDate),
    end = periodEnd(p);
  const d0 = new Date(start);
  for (let y = d0.getFullYear(), m = d0.getMonth(); new Date(y, m, 1).getTime() < end; m++) {
    const day = new Date(y, m, Math.min(r.day || 1, new Date(y, m + 1, 0).getDate())).getTime();
    if (day >= start && day < end) out.push({
      ...tx,
      id: uid(),
      recurringKey: r.id + ":" + dayKey(day),
      date: day + NOON
    });
  }
  return out;
}
// Compress a full single period into a lightweight, read-only archived form.
// We keep a small stats summary (for the archived dropdown) plus a slimmed
// transaction list — only the fields the Calendar needs — dropping the budget
// config, allocations, foreign-currency fields, notes, etc. to save storage.
function makeArchivedPeriod(p) {
  const st = computeStats(p);
  return {
    id: p.id,
    type: "archived",
    createdAt: p.createdAt || Date.now(),
    archivedAt: Date.now(),
    period: p.period,
    startDate: p.startDate,
    lengthDays: p.lengthDays || 14,
    summary: {
      spent: st.spent,
      remaining: st.remainingSpending,
      income: p.totalIncome || 0,
      reimbursed: st.reimbursed,
      gasSpent: st.gasSpent,
      txCount: (p.transactions || []).length
    },
    transactions: (p.transactions || []).map(t => ({
      id: t.id,
      date: t.date,
      amount: t.amount,
      category: t.category,
      merchant: t.merchant
    }))
  };
}
// Brand-new users start with a single empty period (no sample spending).
// Existing users are unaffected: loadStore() returns their saved data and only
// falls back to this when there is nothing in localStorage.
function defaultData() {
  return {
    activePeriodId: "p1",
    recurring: [],
    periods: [{
      id: "p1",
      type: "single",
      createdAt: Date.now(),
      period: "My Pay Period",
      startDate: startOfDay(Date.now()),
      lengthDays: 14,
      startingBalance: 0,
      totalIncome: 0,
      savings: 0,
      gasBudget: 0,
      insurance: 0,
      endGoal: 0,
      allocations: [],
      spendingAllocations: [],
      transactions: []
    }]
  };
}
const DEFAULT_DATA = defaultData();
function normalizePeriod(p) {
  if (!p) return p;
  if (p.type === "combined") return {
    period: "Monthly View",
    sourceIds: [],
    ...p,
    type: "combined"
  };
  // Archived periods are a pre-computed, read-only summary + slimmed transactions
  // (kept only so their purchases still appear in the Calendar). Pass them through.
  if (p.type === "archived") return {
    period: "Archived period",
    summary: {},
    transactions: [],
    ...p,
    type: "archived"
  };
  const startDate = p.startDate || p.createdAt || Date.now();
  return {
    type: "single",
    createdAt: 0,
    period: "Pay Period",
    lengthDays: 14,
    startingBalance: 0,
    totalIncome: 0,
    savings: 0,
    gasBudget: 0,
    insurance: 0,
    endGoal: 0,
    ...p,
    startDate,
    allocations: Array.isArray(p.allocations) ? p.allocations : [],
    spendingAllocations: Array.isArray(p.spendingAllocations) ? p.spendingAllocations : [],
    transactions: (p.transactions || []).map(t => ({
      ...t,
      date: t.date || startDate
    })),
    cashLimit: {
      enabled: false,
      standalone: false,
      code: "JPY",
      symbol: "¥",
      amount: 0,
      rate: 150,
      ...(p.cashLimit || {})
    }
  };
}
function normalize(raw) {
  if (raw && Array.isArray(raw.periods) && raw.periods.length) return {
    ...raw,
    recurring: Array.isArray(raw.recurring) ? raw.recurring : [],
    periods: raw.periods.map(normalizePeriod)
  };
  if (raw && Array.isArray(raw.transactions)) {
    const id = "p_migrated";
    return {
      activePeriodId: id,
      recurring: [],
      periods: [normalizePeriod({
        id,
        createdAt: Date.now(),
        ...raw
      })]
    };
  }
  return null;
}
// A "combined" period is a read-only monthly rollup of 2–4 single periods.
function resolvePeriod(store, p) {
  if (!p || p.type !== "combined") return p;
  const sources = (p.sourceIds || []).map(id => store.periods.find(x => x.id === id)).filter(x => x && x.type === "single");
  const base = {
    ...p,
    combined: true,
    readOnly: true,
    allocations: [],
    spendingAllocations: [],
    transactions: [],
    startingBalance: 0,
    totalIncome: 0,
    savings: 0,
    gasBudget: 0,
    insurance: 0,
    endGoal: 0,
    startDate: p.startDate || startOfMonth(Date.now()),
    lengthDays: 30,
    sourceNames: []
  };
  if (!sources.length) return base;
  const sorted = sources.slice().sort((a, b) => a.startDate - b.startDate);
  const sum = f => sorted.reduce((s, x) => s + (x[f] || 0), 0);
  const allocMap = {};
  sorted.forEach(x => (x.allocations || []).forEach(a => {
    allocMap[a.name] = (allocMap[a.name] || 0) + (a.amount || 0);
  }));
  const allocations = Object.keys(allocMap).map((name, i) => ({
    id: "ca" + i,
    name,
    amount: allocMap[name]
  }));
  const spendMap = {},
    spendColor = {};
  sorted.forEach(x => (x.spendingAllocations || []).forEach(a => {
    spendMap[a.name] = (spendMap[a.name] || 0) + (a.amount || 0);
    if (!spendColor[a.name]) spendColor[a.name] = a.color;
  }));
  const spendingAllocations = Object.keys(spendMap).map((name, i) => ({
    id: "cs" + i,
    name,
    amount: spendMap[name],
    color: spendColor[name] || SPEND_COLORS[i % SPEND_COLORS.length]
  }));
  // Re-point each purchase's category at the merged (by-name) category.
  const nameToCombined = {};
  spendingAllocations.forEach(a => {
    nameToCombined[a.name] = a.id;
  });
  const transactions = [];
  sorted.forEach(x => {
    const srcName = {};
    (x.spendingAllocations || []).forEach(a => {
      srcName[a.id] = a.name;
    });
    (x.transactions || []).forEach(t => transactions.push({
      ...t,
      _src: x.id,
      allocId: t.allocId && srcName[t.allocId] != null ? nameToCombined[srcName[t.allocId]] : undefined
    }));
  });
  const startDate = sorted[0].startDate;
  const lastEnd = Math.max.apply(null, sorted.map(x => periodEnd(x)));
  return {
    ...base,
    startingBalance: sorted[0].startingBalance,
    totalIncome: sum("totalIncome"),
    savings: sum("savings"),
    gasBudget: sum("gasBudget"),
    insurance: sum("insurance"),
    endGoal: sum("endGoal"),
    allocations,
    spendingAllocations,
    transactions,
    startDate,
    lengthDays: Math.max(1, Math.round((lastEnd - startDate) / DAY)),
    sourceNames: sorted.map(x => x.period)
  };
}

/* ================= Sync merge ================= */
// The period + purchase ids present in the last version both sides agreed on. Against it, a
// purchase missing from one side was either deleted there (it's in the base) or added on the
// other side since (it isn't).
const syncBase = s => ({
  p: s.periods.map(p => p.id),
  t: [].concat(...s.periods.map(p => (p.transactions || []).map(t => t.id)))
});

// Both devices edited since they last synced. Settings, budgets and names come from `win`
// (the newer side); periods and purchases added or deleted on either side are all kept.
function mergeStores(win, lose, base) {
  const bp = new Set(base && base.p || []),
    bt = new Set(base && base.t || []);
  const loseById = {};
  lose.periods.forEach(p => {
    loseById[p.id] = p;
  });
  const winIds = new Set(win.periods.map(p => p.id));
  const mergeTx = (wp, lp) => {
    if (!Array.isArray(wp.transactions) || !Array.isArray(lp.transactions)) return wp;
    const wIds = new Set(wp.transactions.map(t => t.id)),
      lIds = new Set(lp.transactions.map(t => t.id));
    const kept = wp.transactions.filter(t => lIds.has(t.id) || !bt.has(t.id)); // drop ones `lose` deleted
    const added = lp.transactions.filter(t => !wIds.has(t.id) && !bt.has(t.id)); // ones `lose` added
    if (!added.length && kept.length === wp.transactions.length) return wp;
    return {
      ...wp,
      transactions: [...kept, ...added]
    };
  };
  const periods = [];
  win.periods.forEach(p => {
    const lp = loseById[p.id];
    if (lp) periods.push(mergeTx(p, lp));else if (!bp.has(p.id)) periods.push(p); // new on `win`; otherwise `lose` deleted it
  });
  const loseNew = lose.periods.filter(p => !winIds.has(p.id) && !bp.has(p.id));
  const merged = {
    ...win,
    periods: [...loseNew, ...periods]
  };
  if (!merged.periods.length) return win;
  if (!merged.periods.some(p => p.id === merged.activePeriodId)) {
    merged.activePeriodId = (merged.periods.find(p => p.type === "single") || merged.periods[0]).id;
  }
  return merged;
}
function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const n = normalize(JSON.parse(raw));
      if (n) return n;
    }
  } catch (e) {}
  return DEFAULT_DATA;
}
const fmt = n => {
  const v = isNaN(n) ? 0 : n;
  return (v < 0 ? "-$" : "$") + Math.abs(v).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
const fmtSigned = n => (n >= 0 ? "+$" : "-$") + Math.abs(n).toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
// Format a foreign-currency amount (no decimals for yen/won, 2 otherwise).
const fmtForeign = (n, symbol, code) => (symbol || "") + (isNaN(n) ? 0 : n).toLocaleString("en-US", {
  maximumFractionDigits: code === "JPY" || code === "KRW" ? 0 : 2
});

// Refunds credit money back: "reimbursement" to spending, "gasReimbursement" to the gas budget.
const isRefundCat = c => c === "reimbursement" || c === "gasReimbursement";
const isGasCat = c => c === "gas" || c === "gasReimbursement";
const defaultMerchant = c => c === "gas" ? "Gas" : c === "reimbursement" ? "Refund" : c === "gasReimbursement" ? "Gas Refund" : "Purchase";
const catLabel = c => c === "gas" ? "Gas" : c === "reimbursement" ? "Refund" : c === "gasReimbursement" ? "Gas Refund" : "Spending";
function computeStats(p) {
  // Travel "cash allowance": a purchase logged in the cash currency belongs to the cash pool —
  // tracked ONLY in that currency; it does NOT touch the USD limit. Instead the allowance's USD
  // value (amount / rate) is set aside from the limit up front, like an allocation. Fully independent.
  const cl = p.cashLimit || {};
  const cashOn = !!cl.enabled;
  const isCash = t => cashOn && t.foreignCode === cl.code && !!t.foreignAmount;
  const spent = p.transactions.filter(t => t.category === "spending" && !isCash(t)).reduce((s, t) => s + t.amount, 0);
  const gasSpent = p.transactions.filter(t => t.category === "gas").reduce((s, t) => s + t.amount, 0);
  const reimbursed = p.transactions.filter(t => t.category === "reimbursement" && !isCash(t)).reduce((s, t) => s + t.amount, 0);
  const gasReimbursed = p.transactions.filter(t => t.category === "gasReimbursement").reduce((s, t) => s + t.amount, 0);
  let cashSpent = 0,
    cashReimbursed = 0;
  if (cashOn) {
    p.transactions.forEach(t => {
      if (!isCash(t)) return;
      if (t.category === "spending") cashSpent += t.foreignAmount;else if (t.category === "reimbursement") cashReimbursed += t.foreignAmount;
    });
  }
  const cashLimitAmt = cl.amount || 0;
  const cashRemaining = cashLimitAmt - cashSpent + cashReimbursed;
  const cashSetAside = cashOn && cl.rate > 0 ? Math.round(cashLimitAmt / cl.rate * 100) / 100 : 0;
  const allocTotal = (p.allocations || []).reduce((s, a) => s + (a.amount || 0), 0);
  const available = p.startingBalance + p.totalIncome;
  const afterSavings = available - p.savings;
  const afterGas = afterSavings - p.gasBudget;
  const afterInsurance = afterGas - p.insurance;
  const afterAlloc = afterInsurance - allocTotal;
  const afterCash = afterAlloc - cashSetAside;
  const rawLimit = afterCash - p.endGoal;
  const spendingLimit = Math.max(0, rawLimit);
  // Spending allocations split the spending limit into categories — they don't lower it.
  const spendAllocTotal = (p.spendingAllocations || []).reduce((s, a) => s + (a.amount || 0), 0);
  // Net USD spent per spending category (purchases − refunds tagged with that category). Untagged
  // purchases, or ones whose category was deleted, count as "Other".
  const catSpent = {};
  (p.spendingAllocations || []).forEach(a => {
    catSpent[a.id] = 0;
  });
  let otherSpent = 0;
  p.transactions.forEach(t => {
    if (isCash(t) || t.category !== "spending" && t.category !== "reimbursement") return;
    const v = t.category === "reimbursement" ? -t.amount : t.amount;
    if (t.allocId && catSpent[t.allocId] != null) catSpent[t.allocId] += v;else otherSpent += v;
  });
  // Going over a category spills the extra into "Other": it all comes out of the same limit,
  // so Other's room shrinks by however much the categories are over.
  const catOver = {};
  let spillover = 0;
  (p.spendingAllocations || []).forEach(a => {
    const over = Math.round((catSpent[a.id] - (a.amount || 0)) * 100) / 100;
    if (over > 0) {
      catOver[a.id] = over;
      spillover += over;
    }
  });
  spillover = Math.round(spillover * 100) / 100;
  return {
    spendAllocTotal,
    unallocatedSpending: spendingLimit - spendAllocTotal,
    catSpent,
    otherSpent,
    catOver,
    spillover,
    spent,
    gasSpent,
    gasReimbursed,
    reimbursed,
    allocTotal,
    available,
    afterSavings,
    afterGas,
    afterInsurance,
    afterAlloc,
    afterCash,
    rawLimit,
    spendingLimit,
    remainingSpending: spendingLimit - spent + reimbursed,
    remainingGas: p.gasBudget - gasSpent + gasReimbursed,
    projectedLeftover: afterCash - spent + reimbursed + (p.gasBudget - gasSpent + gasReimbursed),
    cashOn,
    cashSpent,
    cashReimbursed,
    cashLimitAmt,
    cashRemaining,
    cashSetAside,
    cashStandalone: cashOn && !!cl.standalone
  };
}

/* ================= Shared bits ================= */
function Ring({
  fraction,
  over,
  size = 200,
  stroke = 16,
  tint,
  children
}) {
  const r = (size - stroke) / 2,
    c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, fraction || 0));
  const color = over ? C.red : tint || C.green;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: C.border,
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeDasharray: `${frac * c} ${c}`,
    strokeLinecap: "round",
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
    style: {
      transition: "stroke-dasharray 0.6s ease, stroke 0.3s ease"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, children));
}
function Bar({
  fraction,
  over
}) {
  const frac = Math.max(0, Math.min(1, fraction || 0));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 9,
      background: C.border,
      borderRadius: 99,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${frac * 100}%`,
      background: over ? C.red : `linear-gradient(90deg, ${C.greenDim}, ${C.green})`,
      borderRadius: 99,
      transition: "width 0.5s ease, background 0.3s ease"
    }
  }));
}
// Donut where each section is one spending category, sized by its budget. Each section is its own
// progress track: faded = budgeted, solid = spent so far (red once that category is over).
function CategoryRing({
  sections,
  size = 200,
  stroke = 16,
  onTap,
  children
}) {
  const r = (size - stroke) / 2,
    c = 2 * Math.PI * r;
  const secs = sections.filter(s => s.value > 0);
  const total = secs.reduce((s, x) => s + x.value, 0) || 1;
  const gap = secs.length > 1 ? 3 : 0;
  const ring = (key, color, dash, start, opacity, tap) => /*#__PURE__*/React.createElement("circle", {
    key: key,
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeOpacity: opacity,
    strokeDasharray: `${Math.max(0, dash)} ${c}`,
    strokeDashoffset: -start,
    transform: `rotate(-90 ${size / 2} ${size / 2})`,
    onClick: tap,
    style: {
      cursor: tap ? "pointer" : "default",
      transition: "stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease, stroke 0.3s ease"
    }
  });
  let off = 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: C.border,
    strokeWidth: stroke
  }), secs.map(s => {
    const len = s.value / total * c - gap,
      start = off;
    off += len + gap;
    const spill = s.spill || 0; // overage from other categories, drawn in red after this one's own spending
    const fill = Math.max(0, Math.min(1, s.spent / s.value)) * len;
    const spillLen = Math.min(len - fill, spill / s.value * len);
    const tap = onTap && s.id !== "other" ? () => onTap(s.id) : undefined;
    return /*#__PURE__*/React.createElement("g", {
      key: s.id
    }, ring("t", s.color, len, start, 0.28, tap), fill > 0 && ring("f", s.spent > s.value + 0.004 ? C.red : s.color, fill, start, 1, tap), spillLen > 0 && ring("s", C.red, spillLen, start + fill, 1, tap));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, children));
}

// One category's progress bar: spent vs. its budget, in the category's color. For "Other",
// `spillFrom` lists the categories that went over — their overage is drawn in red and comes out of Other.
function CatProgress({
  color,
  name,
  spent,
  budget,
  last,
  spillTo,
  spillFrom = []
}) {
  const spill = spillFrom.reduce((s, x) => s + x.amount, 0);
  const over = spent + spill > budget + 0.004;
  const left = Math.round((budget - spent - spill) * 100) / 100;
  const ownW = budget > 0 ? Math.max(0, Math.min(1, spent / budget)) : spent > 0 ? 1 : 0;
  const spillW = budget > 0 ? Math.min(1 - ownW, spill / budget) : spill > 0 ? 1 - ownW : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "11px 0",
      borderBottom: last ? "none" : `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 99,
      background: color,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 14,
      color: C.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.sub,
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: C.text
    }
  }, fmt(spent)), " of ", fmt(budget))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      background: C.border,
      borderRadius: 99,
      overflow: "hidden",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${ownW * 100}%`,
      background: spent > budget + 0.004 ? C.red : color,
      borderRadius: spillW > 0 ? "99px 0 0 99px" : 99,
      transition: "width 0.5s ease, background 0.3s ease"
    }
  }), spillW > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${spillW * 100}%`,
      background: `repeating-linear-gradient(-45deg, ${C.red} 0 5px, rgba(248,113,113,0.6) 5px 10px)`,
      borderRadius: ownW > 0 ? "0 99px 99px 0" : 99,
      transition: "width 0.5s ease"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 10,
      marginTop: 5,
      fontSize: 11.5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      color: C.red,
      lineHeight: 1.35
    }
  }, spill > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, "\u2212", fmt(spill), " went to cover ", spillFrom.map((x, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: x.name + i
  }, i > 0 && (i === spillFrom.length - 1 ? " & " : ", "), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 7,
      height: 7,
      borderRadius: 99,
      background: x.color,
      margin: "0 3px 0 1px",
      verticalAlign: "middle"
    }
  }), x.name)), " going over")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: over ? C.red : C.muted,
      whiteSpace: "nowrap",
      textAlign: "right"
    }
  }, over ? `${fmt(-left)} over` : `${fmt(left)} left`, over && spillTo && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, "taken from ", spillTo))));
}
function SpendColorModal({
  alloc,
  others,
  onPick,
  onClose
}) {
  const used = new Set(others.map(a => (a.color || "").toLowerCase()));
  const cur = (alloc.color || "").toLowerCase();
  const isCustom = cur && !SPEND_COLORS.includes(cur);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      animation: "fadeIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 380,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: 22,
      animation: "popIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 99,
      background: alloc.color,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 16,
      fontWeight: 800,
      color: C.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, alloc.name || "Category", " color"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      border: "none",
      background: "transparent",
      color: C.muted,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 12,
      justifyItems: "center"
    }
  }, SPEND_COLORS.map(col => {
    const sel = col === cur,
      taken = !sel && used.has(col);
    return /*#__PURE__*/React.createElement("button", {
      key: col,
      onClick: () => {
        onPick(col);
        onClose();
      },
      "aria-label": "Color " + col,
      title: taken ? "Used by another category" : undefined,
      style: {
        width: 38,
        height: 38,
        borderRadius: 99,
        cursor: "pointer",
        background: col,
        border: `2px solid ${sel ? C.text : "transparent"}`,
        boxShadow: sel ? `inset 0 0 0 2px ${C.bg2}` : "none",
        opacity: taken ? 0.35 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0
      }
    }, sel && /*#__PURE__*/React.createElement(Check, {
      size: 16,
      color: "#0b0d12",
      strokeWidth: 3
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 18,
      paddingTop: 16,
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 99,
      cursor: "pointer",
      border: `2px solid ${isCustom ? C.text : "transparent"}`,
      background: isCustom ? alloc.color : "conic-gradient(#f43f5e, #fbbf24, #34d399, #22d3ee, #3b82f6, #8b5cf6, #f43f5e)",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: alloc.color || "#60a5fa",
    onChange: e => onPick(e.target.value),
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0,
      cursor: "pointer",
      border: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.sub,
      lineHeight: 1.4
    }
  }, "Custom color", /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted
    }
  }, "Faded swatches are used by other categories")))));
}
function SpendAllocRow({
  a,
  spent = 0,
  onUpdate,
  onRemove,
  onColor,
  readOnly
}) {
  const [amt, setAmt] = useState(a.amount ? String(a.amount) : "");
  const dot = /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 99,
      background: a.color || C.muted,
      display: "block"
    }
  });
  const budget = a.amount || 0,
    over = spent > budget + 0.004;
  const progress = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      paddingBottom: 10,
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 6,
      background: C.border,
      borderRadius: 99,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${budget > 0 ? Math.max(0, Math.min(1, spent / budget)) * 100 : spent > 0 ? 100 : 0}%`,
      background: over ? C.red : a.color || C.muted,
      borderRadius: 99,
      transition: "width 0.5s ease"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: over ? C.red : C.muted,
      whiteSpace: "nowrap"
    }
  }, fmt(spent), " spent"));
  if (readOnly) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 0 8px"
      }
    }, dot, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 14,
        color: C.text
      }
    }, a.name || "Category"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700
      }
    }, fmt(a.amount || 0))), progress);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 0 8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onColor(a.id),
    "aria-label": "Change color",
    title: "Change color",
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      border: `1px solid ${C.border}`,
      background: C.bg2,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      padding: 0
    }
  }, dot), /*#__PURE__*/React.createElement("input", {
    value: a.name,
    onChange: e => onUpdate(a.id, {
      name: e.target.value
    }),
    placeholder: "Name (e.g. Food)",
    style: {
      flex: 1,
      minWidth: 0,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      outline: "none",
      color: C.text,
      fontSize: 14,
      padding: "9px 10px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "0 8px",
      width: 110,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontSize: 13
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: amt,
    onChange: e => {
      const v = e.target.value;
      if (!/^\d*\.?\d*$/.test(v)) return;
      setAmt(v);
      const n = v === "" || v === "." ? 0 : parseFloat(v);
      onUpdate(a.id, {
        amount: isNaN(n) ? 0 : n
      });
    },
    placeholder: "0.00",
    style: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 14,
      fontWeight: 600,
      width: "100%",
      textAlign: "right",
      padding: "9px 2px"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(a.id),
    "aria-label": "Remove category",
    title: "Remove category",
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      border: "none",
      background: "transparent",
      color: C.muted,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 15
  }))), progress);
}
const SPEND_SUGGESTIONS = ["Food", "Eating out", "Fun", "Shopping", "Subscriptions", "Personal care"];

// Spending-category chips: "Other" + one per category (with how much is left in it).
function CatPicker({
  allocs,
  value,
  onChange,
  catSpent,
  otherLeft,
  compact
}) {
  const chip = (id, label, color, sub) => {
    const on = value === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id || "other",
      onClick: () => onChange(id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: compact ? "6px 10px" : "7px 11px",
        borderRadius: 999,
        border: `1px solid ${on ? color : C.border}`,
        background: on ? C.cardHi : "transparent",
        color: on ? C.text : C.sub,
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 99,
        background: color,
        flexShrink: 0
      }
    }), label, sub != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: sub < 0 ? C.red : C.muted
      }
    }, fmt(sub)));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, chip("", "Other", C.green, compact || otherLeft == null ? null : otherLeft), allocs.map(a => chip(a.id, a.name || "Category", a.color || C.muted, compact || !catSpent ? null : (a.amount || 0) - (catSpent[a.id] || 0))));
}
function KpiCard({
  icon,
  label,
  value,
  color,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hoverable lift",
    style: {
      ...cardStyle,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: C.sub,
      fontSize: 12.5,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 9,
      background: C.cardHi,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: color || C.sub
    }
  }, icon), label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: color || C.text,
      letterSpacing: -0.5
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 3
    }
  }, sub));
}
function NumberField({
  label,
  sublabel,
  icon,
  value,
  onChange
}) {
  const [text, setText] = useState(value ? String(value) : "");
  const handle = v => {
    if (!/^\d*\.?\d*$/.test(v)) return;
    setText(v);
    const p = v === "" || v === "." ? 0 : parseFloat(v);
    onChange(isNaN(p) ? 0 : p);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "11px 0",
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: C.text,
      fontSize: 14.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      display: "flex"
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, label, sublabel && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      marginTop: 1
    }
  }, sublabel))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "0 10px",
      width: 140
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: text,
    onChange: e => handle(e.target.value),
    placeholder: "0.00",
    style: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 15,
      fontWeight: 600,
      width: "100%",
      textAlign: "right",
      padding: "10px 2px"
    }
  })));
}
function ConfirmModal({
  title,
  message,
  confirmLabel = "Clear",
  onCancel,
  onConfirm
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onCancel,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      animation: "fadeIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 380,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: 26,
      textAlign: "center",
      animation: "popIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 54,
      height: 54,
      borderRadius: 15,
      background: "rgba(248,113,113,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px"
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 26,
    color: C.red
  })), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: C.text,
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: C.sub,
      lineHeight: 1.5,
      marginBottom: 22
    }
  }, message), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      flex: 1,
      padding: "12px 0",
      borderRadius: 11,
      border: `1px solid ${C.border}`,
      background: "transparent",
      color: C.sub,
      fontSize: 14.5,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm,
    style: {
      flex: 1,
      padding: "12px 0",
      borderRadius: 11,
      border: "none",
      background: C.red,
      color: "#2a0a0a",
      fontSize: 14.5,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, confirmLabel))));
}
function Toast({
  message,
  note,
  undo,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "toast",
    style: {
      position: "fixed",
      left: "50%",
      bottom: 28,
      transform: "translateX(-50%)",
      zIndex: 90,
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: C.cardHi,
      border: `1px solid ${C.borderHi}`,
      borderRadius: 12,
      padding: "12px 16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
      animation: "toastIn 0.25s cubic-bezier(0.22,1,0.36,1)",
      maxWidth: "calc(100% - 32px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: C.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, message), note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.red,
      marginTop: 2,
      lineHeight: 1.35
    }
  }, note)), undo && /*#__PURE__*/React.createElement("button", {
    onClick: undo,
    style: {
      background: "transparent",
      border: "none",
      color: C.green,
      fontSize: 13.5,
      fontWeight: 700,
      cursor: "pointer",
      padding: 0
    }
  }, "Undo"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "transparent",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      display: "flex",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  })));
}

/* ================= Transaction row ================= */
function TxRow({
  t,
  onRemove,
  onUpdate,
  readOnly,
  allocs = [],
  hideDate,
  periodTag
}) {
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState(String(t.amount));
  const [merchant, setMerchant] = useState(t.merchant);
  const [category, setCategory] = useState(t.category);
  const [allocId, setAllocId] = useState(t.allocId || "");
  const [day, setDay] = useState(toDateInput(t.date || Date.now()));
  const cat = t.allocId && (t.category === "spending" || t.category === "reimbursement") ? allocs.find(a => a.id === t.allocId) : null;
  const canCat = allocs.length > 0 && (category === "spending" || category === "reimbursement");
  const startEdit = () => {
    setAmount(String(t.amount));
    setMerchant(t.merchant);
    setCategory(t.category);
    setAllocId(t.allocId || "");
    setDay(toDateInput(t.date || Date.now()));
    setEditing(true);
  };
  const save = () => {
    const a = parseFloat(amount);
    if (isNaN(a) || a <= 0) return;
    const patch = {
      amount: Math.round(a * 100) / 100,
      merchant: merchant.trim() || defaultMerchant(category),
      category,
      allocId: canCat && allocId ? allocId : undefined
    };
    if (day && day !== toDateInput(t.date || Date.now())) patch.date = fromDateInput(day) + NOON; // only re-date when the day changed
    onUpdate(t.id, patch);
    setEditing(false);
  };
  if (editing) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 0",
        borderBottom: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        background: C.bg2,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "0 10px",
        width: 120,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.muted
      }
    }, "$"), /*#__PURE__*/React.createElement("input", {
      inputMode: "decimal",
      value: amount,
      onChange: e => {
        const v = e.target.value;
        if (/^\d*\.?\d*$/.test(v)) setAmount(v);
      },
      style: {
        background: "transparent",
        border: "none",
        outline: "none",
        color: C.text,
        fontSize: 15,
        fontWeight: 600,
        width: "100%",
        padding: "10px 2px"
      }
    })), /*#__PURE__*/React.createElement("input", {
      value: merchant,
      onChange: e => setMerchant(e.target.value),
      placeholder: "Where?",
      style: {
        flex: 1,
        minWidth: 0,
        background: C.bg2,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        outline: "none",
        color: C.text,
        fontSize: 14.5,
        padding: "10px 12px"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 8
      }
    }, ["spending", "gas", "reimbursement", "gasReimbursement"].map(v => /*#__PURE__*/React.createElement("button", {
      key: v,
      onClick: () => setCategory(v),
      style: {
        flex: 1,
        padding: "8px 0",
        borderRadius: 9,
        border: `1px solid ${category === v ? C.accent : C.border}`,
        background: category === v ? "rgba(129,140,248,0.15)" : "transparent",
        color: category === v ? C.text : C.sub,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
        cursor: "pointer"
      }
    }, catLabel(v)))), canCat && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement(CatPicker, {
      allocs: allocs,
      value: allocId,
      onChange: setAllocId,
      compact: true
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        flex: 1,
        minWidth: 0,
        background: C.bg2,
        border: `1px solid ${C.border}`,
        borderRadius: 9,
        padding: "0 10px",
        height: 34
      }
    }, /*#__PURE__*/React.createElement(CalendarDays, {
      size: 14,
      color: C.muted
    }), /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: day,
      onChange: e => setDay(e.target.value),
      "aria-label": "Purchase date",
      style: {
        flex: 1,
        minWidth: 0,
        background: "transparent",
        border: "none",
        outline: "none",
        color: C.text,
        fontSize: 13
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => setEditing(false),
      "aria-label": "Cancel",
      title: "Cancel",
      style: {
        width: 42,
        height: 34,
        borderRadius: 9,
        border: `1px solid ${C.border}`,
        background: "transparent",
        color: C.sub,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(X, {
      size: 16
    })), /*#__PURE__*/React.createElement("button", {
      onClick: save,
      "aria-label": "Save",
      title: "Save",
      style: {
        width: 42,
        height: 34,
        borderRadius: 9,
        border: "none",
        background: C.green,
        color: "#06281d",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Check, {
      size: 16
    }))));
  }
  const isReimb = isRefundCat(t.category);
  const meta = [];
  if (!hideDate && t.date) meta.push(fmtMonthDay(t.date));
  if (periodTag) meta.push(periodTag);
  if (cat) meta.push(/*#__PURE__*/React.createElement("span", {
    style: {
      color: C.sub
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 7,
      height: 7,
      borderRadius: 99,
      background: cat.color || C.muted,
      marginRight: 4,
      verticalAlign: "middle"
    }
  }), cat.name || "Category"));
  if (t.recurringId) meta.push(/*#__PURE__*/React.createElement("span", {
    style: {
      color: C.accent
    }
  }, "recurring"));
  if (t.foreignAmount) meta.push(/*#__PURE__*/React.createElement("span", {
    style: {
      color: C.accent
    }
  }, t.foreignSymbol, Math.round(t.foreignAmount).toLocaleString(), " ", t.foreignCode));
  return /*#__PURE__*/React.createElement("div", {
    className: "navitem",
    style: {
      display: "flex",
      alignItems: "center",
      padding: "12px 10px",
      margin: "0 -10px",
      borderRadius: 10,
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: isReimb ? "rgba(52,211,153,0.15)" : t.category === "gas" ? "rgba(34,211,238,0.12)" : "rgba(129,140,248,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
      flexShrink: 0
    }
  }, isReimb ? t.category === "gasReimbursement" ? /*#__PURE__*/React.createElement(Fuel, {
    size: 16,
    color: C.green
  }) : /*#__PURE__*/React.createElement(Reimburse, {
    size: 16,
    color: C.green
  }) : t.category === "gas" ? /*#__PURE__*/React.createElement(Fuel, {
    size: 16,
    color: C.accent2
  }) : /*#__PURE__*/React.createElement(Receipt, {
    size: 16,
    color: C.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      color: C.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, t.merchant), meta.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      marginTop: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, meta.map((m, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i ? " · " : "", m)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      marginRight: readOnly ? 2 : 6,
      color: isReimb ? C.green : C.text
    }
  }, isReimb ? "+" : "", fmt(t.amount)), !readOnly && /*#__PURE__*/React.createElement("button", {
    onClick: startEdit,
    "aria-label": "Edit",
    title: "Edit",
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      border: "none",
      background: "transparent",
      color: C.muted,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Pencil, {
    size: 15
  })), !readOnly && /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(t.id),
    "aria-label": "Delete",
    title: "Delete",
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      border: "none",
      background: "transparent",
      color: C.muted,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  })));
}

// Purchases under day headers ("Today", "Yesterday", "Mon, Oct 13"), each with that day's net total.
function DayGroups({
  txs,
  renderRow
}) {
  const groups = [];
  txs.forEach(t => {
    const k = dayKey(t.date || 0);
    let g = groups[groups.length - 1];
    if (!g || g.k !== k) {
      g = {
        k,
        ts: t.date || 0,
        items: [],
        total: 0
      };
      groups.push(g);
    }
    g.items.push(t);
    g.total += isRefundCat(t.category) ? -t.amount : t.amount;
  });
  return groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "12px 0 2px",
      fontSize: 11.5,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: 0.3
    }
  }, /*#__PURE__*/React.createElement("span", null, dayLabel(g.ts).toUpperCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      color: g.total < 0 ? C.green : C.muted
    }
  }, g.total < 0 ? "+" + fmt(-g.total) : fmt(g.total))), g.items.map(renderRow)));
}

/* ================= Dashboard ================= */
function Dashboard({
  data,
  computed,
  readOnly,
  updateSpendAlloc,
  onEditCategories
}) {
  const {
    available,
    afterInsurance,
    spent,
    spendingLimit,
    remainingSpending,
    gasSpent,
    gasReimbursed,
    remainingGas,
    projectedLeftover,
    reimbursed,
    cashOn,
    cashSpent,
    cashReimbursed,
    cashLimitAmt,
    cashRemaining,
    cashSetAside,
    cashStandalone,
    unallocatedSpending,
    catSpent,
    otherSpent,
    catOver,
    spillover
  } = computed;
  const cl = data.cashLimit || {};
  const [colorFor, setColorFor] = useState(null);
  const spendAllocs = data.spendingAllocations || [];
  const nCats = spendAllocs.length;
  // Category sections for the ring; "Other" = the unallocated part of the limit + untagged purchases.
  const catSections = spendAllocs.map(a => ({
    id: a.id,
    name: a.name || "Category",
    value: a.amount || 0,
    spent: catSpent && catSpent[a.id] || 0,
    color: a.color || C.muted
  }));
  const otherBudget = Math.max(0, unallocatedSpending);
  // Categories that went over spill the extra into Other (see computeStats).
  const spillFrom = catSections.filter(s => catOver && catOver[s.id]).map(s => ({
    name: s.name,
    color: s.color,
    amount: catOver[s.id]
  }));
  const otherSection = {
    id: "other",
    name: "Other",
    value: otherBudget,
    spent: otherSpent || 0,
    spill: spillover || 0,
    color: C.green
  };
  const colorAlloc = colorFor && spendAllocs.find(a => a.id === colorFor);
  const overSpend = remainingSpending < 0;
  const cashOver = cashRemaining < 0;
  const aboveGoal = projectedLeftover - data.endGoal;
  // Spending pace — how many days remain and the per-day amount that stays inside the limit.
  const pace = (() => {
    const len = data.lengthDays || 14;
    const start = startOfDay(data.startDate),
      end = addDays(data.startDate, len),
      today = startOfDay(Date.now());
    if (today < start) return {
      label: "Starts " + fmtMonthDay(start)
    };
    if (today >= end) return {
      label: "Period ended " + fmtMonthDay(end - DAY)
    };
    const daysLeft = Math.round((end - today) / DAY);
    const dayNum = Math.round((today - start) / DAY) + 1;
    const perDay = Math.max(0, remainingSpending) / daysLeft;
    const diff = spendingLimit * (dayNum / len) - (spent - reimbursed); // vs an even burn through today
    const behind = overSpend || diff < 0;
    const badge = overSpend ? "over budget" : Math.abs(diff) < Math.max(5, spendingLimit * 0.02) ? "on pace" : diff > 0 ? fmt(diff) + " ahead" : fmt(-diff) + " behind";
    return {
      label: `${daysLeft} day${daysLeft > 1 ? "s" : ""} left · ${fmt(perDay)}/day is safe`,
      badge,
      color: behind ? C.red : C.green,
      bg: behind ? "rgba(248,113,113,0.12)" : "rgba(52,211,153,0.12)"
    };
  })();
  const usdRingCard = /*#__PURE__*/React.createElement("div", {
    className: "ring-card",
    style: {
      ...cardStyle,
      display: "flex",
      alignItems: "center",
      gap: 28,
      padding: 28,
      flex: "1 1 300px",
      minWidth: 280
    }
  }, (() => {
    const center = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.green,
        letterSpacing: 0.5
      }
    }, "OVERALL \xB7 USD"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: fmt(remainingSpending).length > 9 ? 25 : 30,
        fontWeight: 800,
        color: overSpend ? C.red : C.green,
        letterSpacing: -0.5,
        marginTop: 2
      }
    }, fmt(remainingSpending)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, "of ", fmt(spendingLimit)));
    return nCats > 0 ? /*#__PURE__*/React.createElement(CategoryRing, {
      sections: [...catSections, otherSection],
      size: 190,
      onTap: readOnly ? null : setColorFor
    }, center) : /*#__PURE__*/React.createElement(Ring, {
      fraction: (spent - reimbursed) / (spendingLimit || 1),
      over: overSpend,
      size: 190
    }, center);
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      letterSpacing: 0.3,
      marginBottom: 12
    }
  }, "THIS PERIOD"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 4
    }
  }, "Spent ", reimbursed > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.green
    }
  }, "\xB7 +", fmt(reimbursed), " back")), /*#__PURE__*/React.createElement(Bar, {
    fraction: (spent - reimbursed) / (spendingLimit || 1),
    over: overSpend
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "Spent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, fmt(spent))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "Limit"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: C.green
    }
  }, fmt(spendingLimit))), reimbursed > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "Refunded"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: C.green
    }
  }, "+", fmt(reimbursed)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      paddingTop: 12,
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement(Clock, {
    size: 14,
    color: C.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: C.sub
    }
  }, pace.label), pace.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 11,
      fontWeight: 700,
      color: pace.color,
      background: pace.bg,
      padding: "3px 8px",
      borderRadius: 6,
      whiteSpace: "nowrap"
    }
  }, pace.badge)))));
  const cashRingCard = /*#__PURE__*/React.createElement("div", {
    className: "ring-card",
    style: {
      ...cardStyle,
      display: "flex",
      alignItems: "center",
      gap: 28,
      padding: 28,
      flex: "1 1 300px",
      minWidth: 280
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    fraction: (cashSpent - cashReimbursed) / (cashLimitAmt || 1),
    over: cashOver,
    tint: C.amber,
    size: 190
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.amber,
      letterSpacing: 0.5
    }
  }, "CASH \xB7 ", cl.code), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: cashOver ? C.red : C.amber,
      letterSpacing: -0.5,
      marginTop: 2
    }
  }, fmtForeign(cashRemaining, cl.symbol, cl.code)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, "of ", fmtForeign(cashLimitAmt, cl.symbol, cl.code))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.amber,
      letterSpacing: 0.3,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Plane, {
    size: 15,
    color: C.amber
  }), " TRAVEL CASH"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 4
    }
  }, "Spent ", cashReimbursed > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.green
    }
  }, "\xB7 +", fmtForeign(cashReimbursed, cl.symbol, cl.code), " back")), /*#__PURE__*/React.createElement(Bar, {
    fraction: (cashSpent - cashReimbursed) / (cashLimitAmt || 1),
    over: cashOver
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "Spent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, fmtForeign(cashSpent, cl.symbol, cl.code))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "Allowance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: C.amber
    }
  }, fmtForeign(cashLimitAmt, cl.symbol, cl.code))), cl.rate > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "\u2248 USD left"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: C.green
    }
  }, fmt(cashRemaining / cl.rate)))))));
  const rows = [{
    label: "Starting Balance",
    icon: /*#__PURE__*/React.createElement(Banknote, {
      size: 15
    }),
    delta: null,
    running: data.startingBalance
  }, {
    label: "Income",
    icon: /*#__PURE__*/React.createElement(TrendingUp, {
      size: 15
    }),
    delta: data.totalIncome,
    running: available,
    pos: true
  }, {
    label: "Savings",
    icon: /*#__PURE__*/React.createElement(PiggyBank, {
      size: 15
    }),
    delta: -data.savings,
    running: available - data.savings
  }, {
    label: "Gas Budget",
    icon: /*#__PURE__*/React.createElement(Fuel, {
      size: 15
    }),
    delta: -data.gasBudget,
    running: available - data.savings - data.gasBudget
  }, {
    label: "Insurance",
    icon: /*#__PURE__*/React.createElement(Shield, {
      size: 15
    }),
    delta: -data.insurance,
    running: afterInsurance
  }];
  let _run = afterInsurance;
  (data.allocations || []).forEach(a => {
    _run -= a.amount || 0;
    rows.push({
      label: a.name || "Allocation",
      icon: /*#__PURE__*/React.createElement(DollarSign, {
        size: 15
      }),
      delta: -(a.amount || 0),
      running: _run
    });
  });
  if (cashOn && cashSetAside > 0) {
    _run -= cashSetAside;
    rows.push({
      label: `Travel cash (${fmtForeign(cashLimitAmt, cl.symbol, cl.code)})`,
      icon: /*#__PURE__*/React.createElement(Plane, {
        size: 15
      }),
      delta: -cashSetAside,
      running: _run
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kpi-grid"
  }, cashStandalone ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(Plane, {
      size: 16,
      color: C.amber
    }),
    label: cl.code + " cash left",
    value: fmtForeign(cashRemaining, cl.symbol, cl.code),
    color: cashOver ? C.red : C.amber,
    sub: `${fmtForeign(cashSpent, cl.symbol, cl.code)} of ${fmtForeign(cashLimitAmt, cl.symbol, cl.code)} used`
  }), /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(Banknote, {
      size: 16
    }),
    label: "Allowance",
    value: fmtForeign(cashLimitAmt, cl.symbol, cl.code),
    sub: "this period"
  }), /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(DollarSign, {
      size: 16
    }),
    label: "\u2248 USD left",
    value: fmt(cl.rate > 0 ? cashRemaining / cl.rate : 0),
    color: C.green,
    sub: `1 USD = ${fmtForeign(cl.rate, cl.symbol, cl.code)}`
  }), /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(Receipt, {
      size: 16
    }),
    label: "Purchases",
    value: String(data.transactions.filter(t => t.category === "spending").length),
    sub: `${fmtForeign(cashSpent, cl.symbol, cl.code)} spent`
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(Wallet, {
      size: 16
    }),
    label: "Remaining to spend",
    value: fmt(remainingSpending),
    color: overSpend ? C.red : C.green,
    sub: `${fmt(spent)} of ${fmt(spendingLimit)} used`
  }), /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(DollarSign, {
      size: 16
    }),
    label: "Spending limit",
    value: fmt(spendingLimit),
    sub: "this period"
  }), cashOn ? /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(Plane, {
      size: 16,
      color: C.amber
    }),
    label: cl.code + " cash left",
    value: fmtForeign(cashRemaining, cl.symbol, cl.code),
    color: cashOver ? C.red : C.amber,
    sub: `${fmtForeign(cashSpent, cl.symbol, cl.code)} of ${fmtForeign(cashLimitAmt, cl.symbol, cl.code)} used`
  }) : /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(Target, {
      size: 16
    }),
    label: "Projected leftover",
    value: fmt(projectedLeftover),
    color: C.amber,
    sub: aboveGoal >= 0 ? `${fmt(aboveGoal)} over goal` : `${fmt(Math.abs(aboveGoal))} below goal`
  }), /*#__PURE__*/React.createElement(KpiCard, {
    icon: /*#__PURE__*/React.createElement(Fuel, {
      size: 16
    }),
    label: "Gas remaining",
    value: fmt(remainingGas),
    color: C.accent2,
    sub: `${fmt(gasSpent - gasReimbursed)} of ${fmt(data.gasBudget)} used`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dash-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      flexWrap: "wrap"
    }
  }, !cashStandalone && usdRingCard, cashOn && cashRingCard), !cashStandalone && (nCats > 0 ? /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      letterSpacing: 0.3
    }
  }, "CATEGORIES"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "spent of budget"), !readOnly && /*#__PURE__*/React.createElement("button", {
    onClick: onEditCategories,
    style: {
      background: "transparent",
      border: "none",
      color: C.green,
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer",
      padding: 0
    }
  }, "Edit"))), (() => {
    const list = [...catSections, ...(otherBudget > 0 || Math.abs(otherSection.spent) > 0.004 || otherSection.spill > 0 ? [otherSection] : [])];
    return list.map((s, i) => /*#__PURE__*/React.createElement(CatProgress, {
      key: s.id,
      color: s.color,
      name: s.name,
      spent: s.spent,
      budget: s.value,
      last: i === list.length - 1,
      spillTo: s.id !== "other" ? "Other" : null,
      spillFrom: s.id === "other" ? spillFrom : []
    }));
  })(), !readOnly && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      marginTop: 8
    }
  }, "Click a section of the ring to change its color.")) : !readOnly && /*#__PURE__*/React.createElement("button", {
    onClick: onEditCategories,
    className: "hoverable",
    style: {
      ...cardStyle,
      display: "flex",
      alignItems: "center",
      gap: 12,
      cursor: "pointer",
      textAlign: "left",
      borderStyle: "dashed"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: C.cardHi,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    size: 17,
    color: C.accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: C.text
    }
  }, "Split your spending into categories"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 2
    }
  }, "Food, fun, shopping\u2026 tag each purchase and track each one with its own ring and bar.")), /*#__PURE__*/React.createElement(Plus, {
    size: 17,
    color: C.sub
  }))), !cashStandalone && /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      marginBottom: 8,
      letterSpacing: 0.3
    }
  }, "MONEY FLOW"), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      padding: "10px 0",
      borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      marginRight: 10,
      display: "flex"
    }
  }, r.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 14,
      color: C.text
    }
  }, r.label), r.delta != null && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: r.pos ? C.green : C.red,
      marginRight: 18,
      minWidth: 90,
      textAlign: "right"
    }
  }, fmtSigned(r.delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      minWidth: 96,
      textAlign: "right"
    }
  }, fmt(r.running)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, cashStandalone ? /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 600,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Plane, {
    size: 17,
    color: C.amber
  }), " ", cl.code, " cash"), [{
    label: "Withdrawn / allowance",
    val: fmtForeign(cashLimitAmt, cl.symbol, cl.code)
  }, {
    label: "Spent",
    val: "−" + fmtForeign(cashSpent, cl.symbol, cl.code)
  }, cashReimbursed > 0 ? {
    label: "Refunded",
    val: "+" + fmtForeign(cashReimbursed, cl.symbol, cl.code),
    pos: true
  } : null].filter(Boolean).map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: C.text
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: r.pos ? C.green : C.text
    }
  }, r.val))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: C.text
    }
  }, "Left to spend"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: cashOver ? C.red : C.amber
    }
  }, fmtForeign(cashRemaining, cl.symbol, cl.code))), cl.rate > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 12,
      textAlign: "center"
    }
  }, "\u2248 ", fmt(cashRemaining / cl.rate), " left \xB7 1 USD = ", fmtForeign(cl.rate, cl.symbol, cl.code))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Target, {
    size: 17,
    color: C.amber
  }), " End Goal"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.sub
    }
  }, "Goal ", fmt(data.endGoal))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 800,
      color: C.text,
      marginBottom: 4
    }
  }, fmt(projectedLeftover)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 14
    }
  }, "projected left after everything \u2014 unspent gas (", fmt(remainingGas), ") stays in"), /*#__PURE__*/React.createElement(Bar, {
    fraction: data.endGoal ? projectedLeftover / data.endGoal : 0,
    over: projectedLeftover < data.endGoal
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 13,
      fontWeight: 600,
      color: aboveGoal >= 0 ? C.green : C.red,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, aboveGoal >= 0 ? /*#__PURE__*/React.createElement(Check, {
    size: 15
  }) : /*#__PURE__*/React.createElement(X, {
    size: 15
  }), aboveGoal >= 0 ? `${fmt(aboveGoal)} of room left` : `${fmt(Math.abs(aboveGoal))} below goal`)), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Fuel, {
    size: 17,
    color: C.accent2
  }), " Gas"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.sub
    }
  }, "Budget ", fmt(data.gasBudget))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800
    }
  }, fmt(gasSpent), gasReimbursed > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.green
    }
  }, " \xB7 +", fmt(gasReimbursed), " back")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: remainingGas < 0 ? C.red : C.sub
    }
  }, fmt(remainingGas), " left")), /*#__PURE__*/React.createElement(Bar, {
    fraction: data.gasBudget ? (gasSpent - gasReimbursed) / data.gasBudget : 0,
    over: remainingGas < 0
  }))))), colorAlloc && /*#__PURE__*/React.createElement(SpendColorModal, {
    alloc: colorAlloc,
    others: spendAllocs.filter(a => a.id !== colorAlloc.id),
    onPick: col => updateSpendAlloc(colorAlloc.id, {
      color: col
    }),
    onClose: () => setColorFor(null)
  }));
}

/* ================= Exchange rates ================= */
// Today's USD → `code` rate (European Central Bank reference rates via Frankfurter — free, no
// key; only the currency code is sent). Resolves null when offline or on any error.
async function fetchUsdRate(code) {
  try {
    const r = await fetch("https://api.frankfurter.dev/v1/latest?base=USD&symbols=" + encodeURIComponent(code));
    if (!r.ok) return null;
    const j = await r.json();
    const v = j && j.rates && j.rates[code];
    return v > 0 ? {
      rate: Math.round(v * 10000) / 10000,
      date: j.date
    } : null;
  } catch (e) {
    return null;
  }
}
// Travel rate status line: live (ECB date) vs. typed in, and how old it is.
function rateStatus(travel) {
  const daysSince = travel && travel.rateUpdated ? Math.floor((startOfDay(Date.now()) - startOfDay(travel.rateUpdated)) / DAY) : null;
  const when = daysSince == null ? "" : daysSince <= 0 ? "today" : daysSince === 1 ? "yesterday" : `${daysSince} days ago`;
  if (travel && travel.rateSource === "live" && travel.rateCode === travel.code) return {
    label: `Live rate · updated ${when}`,
    stale: daysSince >= 1
  };
  if (daysSince == null) return {
    label: "Set today's rate",
    stale: false
  };
  return {
    label: `Set by you · ${when}`,
    stale: daysSince >= 1
  };
}

/* ================= Spending ================= */
// Quick currency converter — uses the manual Travel-mode rate (edit it here or in Settings),
// and previews how a purchase would hit the spending limit WITHOUT logging anything.
function ConvertView({
  computed,
  travel,
  setTravel,
  onRefreshRate
}) {
  const [amount, setAmount] = useState("");
  const [toUSD, setToUSD] = useState(true); // true: foreign -> USD; false: USD -> foreign
  const code = travel && travel.code || "JPY";
  const symbol = travel && travel.symbol || "¥";
  const [rateText, setRateText] = useState(String(travel && travel.rate || 150));
  // Keep the rate field in sync when the currency (or an external rate change) shifts.
  useEffect(() => {
    setRateText(String(travel && travel.rate || 150));
  }, [code, travel && travel.rate]);
  const parsedRate = parseFloat(rateText);
  const effRate = !isNaN(parsedRate) && parsedRate > 0 ? parsedRate : travel && travel.rate || 150; // units of `code` per 1 USD
  const onRateChange = e => {
    const v = e.target.value;
    if (!/^\d*\.?\d*$/.test(v)) return;
    setRateText(v);
    const n = parseFloat(v);
    if (!isNaN(n) && n > 0 && setTravel) setTravel(t => ({
      ...t,
      rate: n,
      rateUpdated: Date.now(),
      rateSource: "manual",
      rateCode: t.code
    }));
  };
  const a = parseFloat(amount);
  const hasAmount = !isNaN(a) && a > 0;
  // USD value of the entered purchase (what actually hits the budget).
  const usdValue = !hasAmount ? 0 : toUSD ? a / effRate : a;
  const foreignValue = !hasAmount ? 0 : toUSD ? a : a * effRate;
  const fmtForeign = n => symbol + n.toLocaleString(undefined, {
    maximumFractionDigits: code === "JPY" || code === "KRW" ? 0 : 2
  });
  const remaining = computed.remainingSpending;
  const afterRemaining = remaining - usdValue;
  const limit = computed.spendingLimit || 0;
  const usedAfter = limit > 0 ? Math.min(1.15, Math.max(0, (limit - afterRemaining) / limit)) : 0;
  const wouldOver = afterRemaining < 0;
  const inSym = toUSD ? symbol : "$";
  const outValue = toUSD ? fmt(usdValue) : fmtForeign(foreignValue);
  const {
    label: updatedLabel,
    stale
  } = rateStatus(travel);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, CURRENCIES.map(c => {
    const on = c.code === code;
    return /*#__PURE__*/React.createElement("button", {
      key: c.code,
      onClick: () => {
        setAmount("");
        if (setTravel) setTravel(t => ({
          ...t,
          code: c.code,
          symbol: c.symbol
        }));
      },
      style: {
        padding: "8px 13px",
        borderRadius: 999,
        border: `1px solid ${on ? C.amber : C.border}`,
        background: on ? "rgba(251,191,36,0.12)" : C.card,
        color: on ? C.text : C.sub,
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        whiteSpace: "nowrap"
      }
    }, c.symbol, " ", c.code);
  })), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Repeat, {
    size: 16,
    color: C.green
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 700,
      color: C.sub,
      letterSpacing: 0.3
    }
  }, "QUICK CONVERT")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: "16px 18px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 700,
      color: C.sub,
      flexShrink: 0
    }
  }, inSym), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: amount,
    placeholder: "0",
    onChange: e => {
      const v = e.target.value;
      if (/^\d*\.?\d*$/.test(v)) setAmount(v);
    },
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 34,
      fontWeight: 800,
      textAlign: "right"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.muted,
      flexShrink: 0
    }
  }, toUSD ? code : "USD")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "12px 0"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setToUSD(v => !v);
      setAmount(hasAmount ? String(Math.round((toUSD ? usdValue : foreignValue) * 100) / 100) : "");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 16px",
      borderRadius: 999,
      border: `1px solid ${C.border}`,
      background: C.bg2,
      color: C.sub,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(ArrowLeftRight, {
    size: 15
  }), " Swap")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(52,211,153,0.08)",
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: "18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 4
    }
  }, toUSD ? "US Dollars" : code), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      fontWeight: 800,
      color: hasAmount ? C.green : C.muted,
      lineHeight: 1.1,
      letterSpacing: -0.5
    }
  }, hasAmount ? outValue : toUSD ? "$0.00" : symbol + "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 14,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "13px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: C.sub,
      flexShrink: 0
    }
  }, "1 USD ="), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: rateText,
    onChange: onRateChange,
    placeholder: "0",
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 18,
      fontWeight: 800,
      textAlign: "right"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.amber,
      flexShrink: 0
    }
  }, symbol)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 12,
      marginTop: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: stale ? C.amber : C.muted
    }
  }, updatedLabel), onRefreshRate && /*#__PURE__*/React.createElement("button", {
    onClick: onRefreshRate,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "transparent",
      border: "none",
      color: C.green,
      fontSize: 12.5,
      fontWeight: 700,
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    size: 12
  }), " Get today's rate"))), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Receipt, {
    size: 16,
    color: C.accent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.sub,
      letterSpacing: 0.3
    }
  }, "IF YOU BUY THIS"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      fontSize: 11,
      color: C.muted,
      fontWeight: 600,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 999,
      padding: "3px 10px"
    }
  }, "Preview only")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 2
    }
  }, "Purchase"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: C.text
    }
  }, fmt(usdValue)), hasAmount && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 1
    }
  }, fmtForeign(foreignValue))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 2
    }
  }, "Spending left after"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: wouldOver ? C.red : C.green
    }
  }, fmt(afterRemaining)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 1
    }
  }, "now ", fmt(remaining)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 999,
      background: C.bg2,
      overflow: "hidden",
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: (usedAfter * 100).toFixed(1) + "%",
      background: wouldOver ? C.red : C.green,
      borderRadius: 999,
      transition: "width 0.25s ease"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: wouldOver ? C.red : C.muted,
      marginTop: 10
    }
  }, !hasAmount ? "Enter an amount to preview the impact." : wouldOver ? `This would put you ${fmt(Math.abs(afterRemaining))} over your spending limit.` : `You'd have ${fmt(afterRemaining)} of your ${fmt(limit)} limit left.`)));
}
const DEFAULT_MERCHANTS = new Set(["Purchase", "Gas", "Refund", "Gas Refund", "Recurring"]);

// Every merchant you've used, most-used first, with the type and category you last logged it as.
// Categories are remembered by NAME — each pay period has its own category ids.
function useMerchantMemory(store) {
  return useMemo(() => {
    const m = {};
    (store && store.periods || []).forEach(p => {
      if (p.type === "combined") return;
      const names = {};
      (p.spendingAllocations || []).forEach(a => {
        names[a.id] = a.name;
      });
      (p.transactions || []).forEach(t => {
        const name = (t.merchant || "").trim();
        if (!name || DEFAULT_MERCHANTS.has(name)) return;
        const k = name.toLowerCase();
        const e = m[k] || (m[k] = {
          name,
          n: 0,
          last: -1
        });
        e.n++;
        if ((t.date || 0) >= e.last) {
          e.last = t.date || 0;
          e.name = name;
          e.category = t.category;
          e.allocName = t.allocId ? names[t.allocId] : undefined;
        }
      });
    });
    return Object.values(m).sort((a, b) => b.n - a.n || b.last - a.last);
  }, [store]);
}

// The add-purchase card — used on the Spending tab and in the quick-add dialog.
function AddPurchaseForm({
  data,
  computed,
  store,
  travel,
  addTransaction,
  presetDay,
  autoFocus,
  onAdded,
  title = "ADD PURCHASE",
  bare
}) {
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("spending");
  const [inputUSD, setInputUSD] = useState(false); // in travel mode, log this one purchase in USD instead
  const [allocId, setAllocId] = useState(""); // spending category ("" = Other)
  // The purchase day (start-of-day ms); null = right now. Logging into a past or future period
  // defaults to its nearest day so the purchase lands inside it.
  const [day, setDay] = useState(() => {
    if (presetDay != null) return isToday(presetDay) ? null : startOfDay(presetDay);
    const today = startOfDay(Date.now()),
      start = startOfDay(data.startDate),
      end = periodEnd(data);
    if (today >= end) return startOfDay(end - 1);
    if (today < start) return start;
    return null;
  });
  const {
    remainingSpending,
    cashRemaining,
    catSpent,
    otherSpent,
    spillover,
    unallocatedSpending
  } = computed;
  const otherLeft = Math.round((Math.max(0, unallocatedSpending) - (otherSpent || 0) - (spillover || 0)) * 100) / 100; // after other categories' overage
  const spendAllocs = data.spendingAllocations || [];
  const merchants = useMerchantMemory(store);
  // A period's foreign cash allowance takes priority over the global travel toggle, so purchases
  // here are logged in that currency and count against the cash allowance.
  const cl = data.cashLimit || {};
  const cashOn = !!cl.enabled;
  const fx = cashOn && cl.rate > 0 ? {
    code: cl.code,
    symbol: cl.symbol,
    rate: cl.rate
  } : travel && travel.enabled && travel.rate > 0 ? {
    code: travel.code,
    symbol: travel.symbol,
    rate: travel.rate
  } : null;
  const travelOn = !!fx;
  const foreignInput = travelOn && !inputUSD; // whether THIS purchase is entered in the foreign currency
  const currSymbol = foreignInput ? fx.symbol : "$";
  const effRate = travelOn ? fx.rate : travel && travel.rate || 1; // foreign units per 1 USD
  // Spending categories apply to USD spending/refunds (cash-allowance purchases have their own pool).
  const showCatPicker = spendAllocs.length > 0 && (category === "spending" || category === "reimbursement") && !(cashOn && foreignInput);
  const q = merchant.trim().toLowerCase();
  const merchantChips = (q ? merchants.filter(x => x.name.toLowerCase().includes(q) && x.name.toLowerCase() !== q) : merchants).slice(0, 6);
  const pickMerchant = x => {
    setMerchant(x.name);
    // Reuse how it was logged last time — unless a refund is selected on purpose.
    if (!isRefundCat(category) && (x.category === "spending" || x.category === "gas")) setCategory(x.category);
    const want = (x.allocName || "").trim().toLowerCase();
    const match = want && spendAllocs.find(a => (a.name || "").trim().toLowerCase() === want);
    setAllocId(match ? match.id : "");
  };
  const today = startOfDay(Date.now()),
    yesterday = startOfDay(today - 1);
  const dayTs = day == null ? today : day;
  const outside = dayTs < startOfDay(data.startDate) || dayTs >= periodEnd(data);
  const handleAdd = () => {
    const a = parseFloat(amount);
    if (isNaN(a) || a <= 0) return;
    const usdAmount = foreignInput ? Math.round(a / effRate * 100) / 100 : Math.round(a * 100) / 100;
    const tx = {
      id: uid(),
      amount: usdAmount,
      merchant: merchant.trim() || defaultMerchant(category),
      category,
      date: day == null || day === today ? Date.now() : day + NOON,
      createdAt: Date.now()
    };
    if (foreignInput) {
      tx.foreignAmount = a;
      tx.foreignCode = fx.code;
      tx.foreignSymbol = fx.symbol;
      tx.rate = effRate;
    }
    if (showCatPicker && allocId && spendAllocs.some(x => x.id === allocId)) tx.allocId = allocId;
    addTransaction(tx);
    setAmount("");
    setMerchant("");
    setAllocId(""); // the day stays put — handy when catching up on several
    if (onAdded) onAdded(tx);
  };
  const curBtn = (usd, label) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setInputUSD(usd),
    style: {
      padding: "5px 11px",
      borderRadius: 8,
      border: `1px solid ${inputUSD === usd ? C.amber : C.border}`,
      background: inputUSD === usd ? "rgba(251,191,36,0.14)" : "transparent",
      color: inputUSD === usd ? C.text : C.sub,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, label);
  const pill = (val, label) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setCategory(val),
    style: {
      flex: 1,
      padding: "10px 0",
      borderRadius: 10,
      border: `1px solid ${category === val ? C.accent : C.border}`,
      background: category === val ? "rgba(129,140,248,0.15)" : "transparent",
      color: category === val ? C.text : C.sub,
      fontSize: 12.5,
      fontWeight: 600,
      whiteSpace: "nowrap",
      cursor: "pointer"
    }
  }, label);
  const dayChip = (on, label, onClick) => /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      padding: "6px 12px",
      borderRadius: 999,
      border: `1px solid ${on ? C.green : C.border}`,
      background: on ? "rgba(52,211,153,0.12)" : "transparent",
      color: on ? C.text : C.sub,
      fontSize: 12.5,
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, label);
  const custom = dayTs !== today && dayTs !== yesterday;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, travelOn && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "rgba(251,191,36,0.07)",
      border: "1px solid rgba(251,191,36,0.28)",
      borderRadius: 12,
      padding: "11px 14px"
    }
  }, /*#__PURE__*/React.createElement(Plane, {
    size: 16,
    color: C.amber
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 13,
      fontWeight: 600,
      color: C.amber
    }
  }, fx.code, " ", cashOn ? "cash allowance" : "travel mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, cashOn && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: cashRemaining < 0 ? C.red : C.text
    }
  }, fmtForeign(cashRemaining, fx.symbol, fx.code), " left"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "1 USD = ", fx.symbol, (+effRate).toLocaleString(undefined, {
    maximumFractionDigits: 2
  })))), /*#__PURE__*/React.createElement("div", {
    style: bare ? null : cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      letterSpacing: 0.3
    }
  }, title), travelOn ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexShrink: 0
    }
  }, curBtn(false, `${fx.symbol} ${fx.code}`), curBtn(true, "$ USD")) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: remainingSpending < 0 ? C.red : C.muted
    }
  }, fmt(remainingSpending), " left")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      padding: "0 14px",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontSize: 18
    }
  }, currSymbol), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    autoFocus: autoFocus,
    value: amount,
    onChange: e => {
      const v = e.target.value;
      if (/^\d*\.?\d*$/.test(v)) setAmount(v);
    },
    onKeyDown: e => {
      if (e.key === "Enter") handleAdd();
    },
    placeholder: "0.00",
    style: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 22,
      fontWeight: 700,
      width: "100%",
      padding: "14px 6px"
    }
  })), /*#__PURE__*/React.createElement("input", {
    value: merchant,
    onChange: e => setMerchant(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") handleAdd();
    },
    placeholder: "Where? (optional)",
    style: {
      width: "100%",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      outline: "none",
      color: C.text,
      fontSize: 15,
      padding: "13px 14px",
      marginBottom: 10
    }
  }), merchantChips.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      marginBottom: 12
    }
  }, merchantChips.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.name,
    onClick: () => pickMerchant(x),
    style: {
      padding: "5px 11px",
      borderRadius: 999,
      border: `1px solid ${C.border}`,
      background: C.bg2,
      color: C.sub,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, x.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, pill("spending", "Spending"), pill("gas", "Gas"), pill("reimbursement", "Refund"), pill("gasReimbursement", "Gas Refund")), showCatPicker && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      fontWeight: 600,
      color: C.muted,
      letterSpacing: 0.3,
      marginBottom: 7
    }
  }, "CATEGORY"), /*#__PURE__*/React.createElement(CatPicker, {
    allocs: spendAllocs,
    value: allocId,
    onChange: setAllocId,
    catSpent: catSpent,
    otherLeft: otherLeft
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: outside ? 6 : 12,
      flexWrap: "wrap"
    }
  }, dayChip(dayTs === today, "Today", () => setDay(null)), dayChip(dayTs === yesterday, "Yesterday", () => setDay(yesterday)), /*#__PURE__*/React.createElement("label", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 12px",
      borderRadius: 999,
      border: `1px solid ${custom ? C.green : C.border}`,
      background: custom ? "rgba(52,211,153,0.12)" : "transparent",
      color: custom ? C.text : C.sub,
      fontSize: 12.5,
      fontWeight: 600,
      cursor: "pointer",
      whiteSpace: "nowrap",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 14
  }), " ", custom ? fmtMonthDay(dayTs) : "Pick date", /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: toDateInput(dayTs),
    "aria-label": "Purchase date",
    onClick: e => {
      try {
        e.target.showPicker();
      } catch (err) {}
    },
    onChange: e => {
      if (!e.target.value) return;
      const v = fromDateInput(e.target.value);
      setDay(v === today ? null : v);
    },
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0,
      cursor: "pointer",
      border: "none"
    }
  }))), outside && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.amber,
      marginBottom: 12
    }
  }, "Outside this pay period (", periodRangeLabel(data), ")"), /*#__PURE__*/React.createElement("button", {
    onClick: handleAdd,
    style: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 12,
      border: "none",
      background: `linear-gradient(90deg, ${C.greenDim}, ${C.green})`,
      color: "#06281d",
      fontSize: 15,
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 18
  }), " ", category === "reimbursement" ? "Add refund" : category === "gasReimbursement" ? "Add gas refund" : "Add purchase", dayTs !== today ? " · " + dayLabel(dayTs) : "")));
}

// Dialog with the add-purchase form, opened from the header's "Add purchase" button, the
// Calendar's "Add purchase on this day" and the N keyboard shortcut.
function QuickAddModal({
  period,
  store,
  travel,
  addTransaction,
  presetDay,
  isActive,
  onClose
}) {
  const computed = useMemo(() => computeStats(period), [period]);
  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      zIndex: 58,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      animation: "fadeIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 460,
      background: C.bg,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: 20,
      maxHeight: "90vh",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      animation: "popIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: C.text
    }
  }, "Add purchase"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.sub,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, isActive ? periodRangeLabel(period) : "To " + period.period + " · " + periodRangeLabel(period))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      border: "none",
      background: C.card,
      color: C.sub,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 18
  }))), /*#__PURE__*/React.createElement(AddPurchaseForm, {
    data: period,
    computed: computed,
    store: store,
    travel: travel,
    addTransaction: addTransaction,
    presetDay: presetDay,
    autoFocus: true,
    onAdded: onClose,
    title: "NEW PURCHASE"
  })));
}

// Matches merchant, amount, type and category name.
const txMatcher = (q, allocs) => {
  const names = {};
  (allocs || []).forEach(a => {
    names[a.id] = (a.name || "").toLowerCase();
  });
  return t => !q || (t.merchant || "").toLowerCase().includes(q) || String(t.amount).includes(q) || catLabel(t.category).toLowerCase().includes(q) || t.allocId && (names[t.allocId] || "").includes(q);
};
function SpendingView({
  data,
  computed,
  addTransaction,
  removeTransaction,
  updateTransaction,
  readOnly,
  travel,
  store
}) {
  const [query, setQuery] = useState("");
  const [allPeriods, setAllPeriods] = useState(false);
  const {
    spent,
    spendingLimit,
    remainingSpending,
    gasSpent,
    gasReimbursed,
    remainingGas,
    reimbursed,
    cashRemaining,
    cashLimitAmt
  } = computed;
  const spendAllocs = data.spendingAllocations || [];
  const overSpend = remainingSpending < 0;
  const cl = data.cashLimit || {};
  const cashOn = !!cl.enabled;
  const q = query.trim().toLowerCase();
  const match = txMatcher(q, spendAllocs);
  const sorted = newestFirst(data.transactions);
  const spendingTx = sorted.filter(t => t.category === "spending" && match(t));
  const gasTx = sorted.filter(t => isGasCat(t.category) && match(t));
  const reimbTx = sorted.filter(t => t.category === "reimbursement" && match(t));
  const hasAnyTx = store.periods.some(p => (p.transactions || []).length > 0);
  // Search everywhere: one list, newest first, each row tagged with its pay period.
  const everywhere = useMemo(() => {
    if (!q || !allPeriods) return [];
    const out = [];
    store.periods.forEach(p => {
      if (p.type === "combined") return;
      const m = txMatcher(q, p.spendingAllocations);
      (p.transactions || []).forEach(t => {
        if (m(t)) out.push({
          ...t,
          _pid: p.id,
          _pName: p.period,
          _archived: p.type === "archived",
          _allocs: p.spendingAllocations || []
        });
      });
    });
    return newestFirst(out);
  }, [q, allPeriods, store]);
  const row = t => /*#__PURE__*/React.createElement(TxRow, {
    key: t.id,
    t: t,
    onRemove: removeTransaction,
    onUpdate: updateTransaction,
    readOnly: readOnly,
    allocs: spendAllocs
  });
  const scopeChip = (on, label, val) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setAllPeriods(val),
    style: {
      padding: "5px 11px",
      borderRadius: 999,
      border: `1px solid ${on ? C.green : C.border}`,
      background: on ? "rgba(52,211,153,0.12)" : "transparent",
      color: on ? C.text : C.sub,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, label);
  return /*#__PURE__*/React.createElement("div", {
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sticky-col",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...cardStyle,
      background: overSpend ? "rgba(248,113,113,0.1)" : "rgba(52,211,153,0.08)",
      border: `1px solid ${overSpend ? "rgba(248,113,113,0.3)" : "rgba(52,211,153,0.25)"}`,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.sub,
      marginBottom: 4
    }
  }, "Remaining Spending"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      fontWeight: 800,
      color: overSpend ? C.red : C.green,
      letterSpacing: -0.5
    }
  }, fmt(remainingSpending)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.muted,
      marginTop: 2
    }
  }, fmt(spent), " spent", reimbursed > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.green
    }
  }, " \xB7 +", fmt(reimbursed), " back"), " of ", fmt(spendingLimit)), cashOn && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: cashRemaining < 0 ? C.red : C.amber,
      marginTop: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Plane, {
    size: 13,
    color: C.amber
  }), " ", fmtForeign(cashRemaining, cl.symbol, cl.code), " of ", fmtForeign(cashLimitAmt, cl.symbol, cl.code), " cash left")), readOnly ? /*#__PURE__*/React.createElement("div", {
    style: {
      ...cardStyle,
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      background: "rgba(34,211,238,0.06)",
      border: `1px solid rgba(34,211,238,0.25)`
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 17,
    color: C.accent2,
    style: {
      marginTop: 1,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.text,
      lineHeight: 1.45
    }
  }, "This is a ", /*#__PURE__*/React.createElement("strong", null, "combined monthly view"), ". Purchases here are read-only \u2014 add or edit them in the individual pay periods.")) : /*#__PURE__*/React.createElement(AddPurchaseForm, {
    key: data.id,
    data: data,
    computed: computed,
    store: store,
    travel: travel,
    addTransaction: addTransaction
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, hasAnyTx && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    size: 15,
    color: C.muted
  }), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search purchases, categories, amounts\u2026",
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 14
    }
  }), query && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQuery(""),
    "aria-label": "Clear search",
    style: {
      background: "transparent",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      display: "flex",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 14
  }))), q && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 8
    }
  }, scopeChip(!allPeriods, "This period", false), scopeChip(allPeriods, "All periods", true))), q && allPeriods ? /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      letterSpacing: 0.3
    }
  }, "ALL PERIODS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.sub
    }
  }, everywhere.length, " match", everywhere.length === 1 ? "" : "es")), everywhere.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 14,
      padding: "24px 0",
      textAlign: "center"
    }
  }, "No matches.") : everywhere.map(t => /*#__PURE__*/React.createElement(TxRow, {
    key: t._pid + t.id,
    t: t,
    periodTag: t._pName,
    readOnly: t._archived,
    allocs: t._allocs,
    onRemove: id => removeTransaction(id, t._pid),
    onUpdate: (id, patch) => updateTransaction(id, patch, t._pid)
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      letterSpacing: 0.3
    }
  }, "SPENDING"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.sub
    }
  }, fmt(spent))), spendingTx.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 14,
      padding: "24px 0",
      textAlign: "center"
    }
  }, q ? "No matches." : "No purchases yet.") : /*#__PURE__*/React.createElement(DayGroups, {
    txs: spendingTx,
    renderRow: t => /*#__PURE__*/React.createElement(TxRow, {
      key: t.id,
      t: t,
      hideDate: true,
      onRemove: removeTransaction,
      onUpdate: updateTransaction,
      readOnly: readOnly,
      allocs: spendAllocs
    })
  })), reimbTx.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      letterSpacing: 0.3,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Reimburse, {
    size: 14,
    color: C.green
  }), " REFUNDS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.green,
      fontWeight: 700
    }
  }, "+", fmt(reimbursed))), reimbTx.map(row)), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      letterSpacing: 0.3,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Fuel, {
    size: 14,
    color: C.accent2
  }), " GAS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: remainingGas < 0 ? C.red : C.sub
    }
  }, fmt(gasSpent), gasReimbursed > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.green
    }
  }, " \xB7 +", fmt(gasReimbursed), " back"), " \xB7 ", fmt(remainingGas), " left")), gasTx.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 14,
      padding: "24px 0",
      textAlign: "center"
    }
  }, q ? "No matches." : "No gas logged yet.") : gasTx.map(row)))));
}

/* ================= Calendar (global) ================= */
function CalendarView({
  data,
  store,
  onUpdateTx,
  onRemoveTx,
  onAddOnDay
}) {
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(Date.now()));
  const [selectedKey, setSelectedKey] = useState(null);
  const todayKey = dayKey(Date.now());
  const navBtn = {
    width: 38,
    height: 38,
    borderRadius: 10,
    border: `1px solid ${C.border}`,
    background: C.card,
    color: C.sub,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  const allTx = useMemo(() => {
    const txs = [];
    store.periods.forEach(p => {
      if (p.type !== "combined") (p.transactions || []).forEach(t => txs.push({
        ...t,
        _pName: p.period,
        _pid: p.id,
        _archived: p.type === "archived",
        _allocs: p.spendingAllocations || []
      }));
    });
    return txs;
  }, [store]);
  const byDay = useMemo(() => {
    const m = {};
    allTx.forEach(t => {
      const k = dayKey(t.date || data.startDate);
      if (!m[k]) m[k] = {
        total: 0,
        items: []
      };
      m[k].total += isRefundCat(t.category) ? -t.amount : t.amount;
      m[k].items.push(t);
    });
    return m;
  }, [allTx, data]);
  const d0 = new Date(viewMonth),
    year = d0.getFullYear(),
    month = d0.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = d0.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
  const periodStart = startOfDay(data.startDate),
    periodEndExcl = periodEnd(data);
  const maxDay = Math.max(1, ...Object.keys(byDay).map(k => byDay[k].total));
  const dayAmt = total => (total < 0 ? "+$" : "$") + Math.round(Math.abs(total)); // a refund-heavy day nets positive
  let monthTotal = 0;
  Object.keys(byDay).forEach(k => {
    const d = new Date(k.split("-")[0], k.split("-")[1] - 1, k.split("-")[2]);
    if (d.getFullYear() === year && d.getMonth() === month) monthTotal += byDay[k].total;
  });
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const selected = selectedKey ? byDay[selectedKey] : null;
  const dayPeriods = selected ? Array.from(new Set(selected.items.map(t => t._pName).filter(Boolean))) : [];
  const shiftMonth = n => {
    setViewMonth(startOfMonth(new Date(year, month + n, 1).getTime()));
    setSelectedKey(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "cal-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => shiftMonth(-1),
    "aria-label": "Previous month",
    style: navBtn
  }, /*#__PURE__*/React.createElement(ChevronDown, {
    size: 18,
    style: {
      transform: "rotate(90deg)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: C.text
    }
  }, monthLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.sub,
      marginTop: 1
    }
  }, fmt(monthTotal), " spent \xB7 all periods")), /*#__PURE__*/React.createElement("button", {
    onClick: () => shiftMonth(1),
    "aria-label": "Next month",
    style: navBtn
  }, /*#__PURE__*/React.createElement(ChevronDown, {
    size: 18,
    style: {
      transform: "rotate(-90deg)"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 8,
      marginBottom: 8
    }
  }, weekdays.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: "center",
      fontSize: 11.5,
      fontWeight: 600,
      color: C.muted
    }
  }, w))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 8
    }
  }, cells.map((day, i) => {
    if (!day) return /*#__PURE__*/React.createElement("div", {
      key: i
    });
    const k = year + "-" + pad2(month + 1) + "-" + pad2(day);
    const ms = new Date(year, month, day).getTime();
    const info = byDay[k];
    const inPeriod = ms >= periodStart && ms < periodEndExcl;
    const isTodayCell = k === todayKey,
      isSel = k === selectedKey;
    const intensity = info ? 0.12 + 0.33 * Math.min(1, Math.max(0, info.total) / maxDay) : 0;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setSelectedKey(isSel ? null : k),
      className: "hoverable",
      style: {
        aspectRatio: "1 / 1",
        borderRadius: 11,
        cursor: "pointer",
        padding: 4,
        border: isSel ? `2px solid ${C.green}` : isTodayCell ? `1px solid ${C.accent}` : `1px solid ${inPeriod ? C.border : "transparent"}`,
        background: info ? `rgba(52,211,153,${intensity})` : inPeriod ? C.cardHi : "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: isTodayCell ? 800 : 600,
        color: isTodayCell ? C.accent : C.text
      }
    }, day), info && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: C.green,
        lineHeight: 1
      }
    }, dayAmt(info.total)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginTop: 16,
      fontSize: 11.5,
      color: C.muted,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 3,
      background: "rgba(52,211,153,0.35)"
    }
  }), " spending"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 3,
      border: `1px solid ${C.accent}`
    }
  }), " today"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 3,
      background: C.cardHi,
      border: `1px solid ${C.border}`
    }
  }), " active period"))), /*#__PURE__*/React.createElement("div", {
    className: "sticky-col",
    style: cardStyle
  }, selectedKey ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: C.text
    }
  }, new Date(selectedKey.split("-")[0], selectedKey.split("-")[1] - 1, selectedKey.split("-")[2]).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: selected ? C.green : C.muted
    }
  }, selected && selected.total < 0 ? "+" + fmt(-selected.total) : fmt(selected ? selected.total : 0))), dayPeriods.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8,
      fontSize: 12,
      color: C.sub
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 13,
    color: C.muted
  }), /*#__PURE__*/React.createElement("span", null, "From ", dayPeriods.length === 1 ? dayPeriods[0] : dayPeriods.length + " pay periods")), selected && selected.items.length ? newestFirst(selected.items).map(t => /*#__PURE__*/React.createElement(TxRow, {
    key: t._pid + t.id,
    t: t,
    hideDate: true,
    periodTag: dayPeriods.length > 1 ? t._pName : null,
    readOnly: t._archived,
    allocs: t._allocs,
    onRemove: id => onRemoveTx(id, t._pid),
    onUpdate: (id, patch) => onUpdateTx(id, patch, t._pid)
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 14,
      padding: "24px 0",
      textAlign: "center"
    }
  }, "No purchases on this day."), onAddOnDay && /*#__PURE__*/React.createElement("button", {
    onClick: () => onAddOnDay(fromDateInput(selectedKey)),
    style: {
      width: "100%",
      padding: "11px 0",
      borderRadius: 11,
      border: `1px dashed ${C.borderHi}`,
      background: "transparent",
      color: C.sub,
      fontSize: 13.5,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Add purchase on this day")) : /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 14,
      padding: "40px 0",
      textAlign: "center"
    }
  }, "Select a day to see its purchases.", /*#__PURE__*/React.createElement("br", null), "The calendar shows spending across ", /*#__PURE__*/React.createElement("strong", null, "all"), " your pay periods.")));
}

/* ================= Budget / Setup ================= */
function AllocationRow({
  a,
  onUpdate,
  onRemove
}) {
  const [amt, setAmt] = useState(a.amount ? String(a.amount) : "");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 0",
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      display: "flex",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(DollarSign, {
    size: 15
  })), /*#__PURE__*/React.createElement("input", {
    value: a.name,
    onChange: e => onUpdate(a.id, {
      name: e.target.value
    }),
    placeholder: "Name (e.g. Rent)",
    style: {
      flex: 1,
      minWidth: 0,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      outline: "none",
      color: C.text,
      fontSize: 14,
      padding: "9px 10px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "0 8px",
      width: 110,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontSize: 13
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: amt,
    onChange: e => {
      const v = e.target.value;
      if (!/^\d*\.?\d*$/.test(v)) return;
      setAmt(v);
      const n = v === "" || v === "." ? 0 : parseFloat(v);
      onUpdate(a.id, {
        amount: isNaN(n) ? 0 : n
      });
    },
    placeholder: "0.00",
    style: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 14,
      fontWeight: 600,
      width: "100%",
      textAlign: "right",
      padding: "9px 2px"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(a.id),
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      border: "none",
      background: "transparent",
      color: C.muted,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 15
  })));
}
function RecurringRow({
  r,
  onUpdate,
  onRemove,
  categoryNames = []
}) {
  const [amt, setAmt] = useState(r.amount ? String(r.amount) : "");
  const sel = {
    background: C.bg2,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    color: C.sub,
    fontSize: 12,
    fontWeight: 600,
    padding: "6px 8px",
    outline: "none",
    maxWidth: "100%",
    cursor: "pointer"
  };
  const isGas = r.category === "gas";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "9px 0",
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      display: "flex",
      flexShrink: 0
    }
  }, isGas ? /*#__PURE__*/React.createElement(Fuel, {
    size: 15
  }) : /*#__PURE__*/React.createElement(Repeat, {
    size: 15
  })), /*#__PURE__*/React.createElement("input", {
    value: r.merchant,
    onChange: e => onUpdate(r.id, {
      merchant: e.target.value
    }),
    placeholder: "Name (e.g. Netflix)",
    style: {
      flex: 1,
      minWidth: 0,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      outline: "none",
      color: C.text,
      fontSize: 14,
      padding: "9px 10px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "0 8px",
      width: 110,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontSize: 13
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: amt,
    onChange: e => {
      const v = e.target.value;
      if (!/^\d*\.?\d*$/.test(v)) return;
      setAmt(v);
      const n = v === "" || v === "." ? 0 : parseFloat(v);
      onUpdate(r.id, {
        amount: isNaN(n) ? 0 : n
      });
    },
    placeholder: "0.00",
    style: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 14,
      fontWeight: 600,
      width: "100%",
      textAlign: "right",
      padding: "9px 2px"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(r.id),
    "aria-label": "Remove recurring expense",
    title: "Remove",
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      border: "none",
      background: "transparent",
      color: C.muted,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginTop: 7,
      paddingLeft: 23
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: isGas ? "gas" : "spending",
    onChange: e => onUpdate(r.id, {
      category: e.target.value
    }),
    "aria-label": "Type",
    style: sel
  }, /*#__PURE__*/React.createElement("option", {
    value: "spending"
  }, "Spending"), /*#__PURE__*/React.createElement("option", {
    value: "gas"
  }, "Gas")), /*#__PURE__*/React.createElement("select", {
    value: r.freq === "monthly" ? String(r.day || 1) : "period",
    "aria-label": "When",
    onChange: e => onUpdate(r.id, e.target.value === "period" ? {
      freq: "period"
    } : {
      freq: "monthly",
      day: parseInt(e.target.value, 10)
    }),
    style: sel
  }, /*#__PURE__*/React.createElement("option", {
    value: "period"
  }, "Every pay period"), Array.from({
    length: 31
  }, (_, i) => i + 1).map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: String(n)
  }, "Monthly on the ", ordinal(n)))), !isGas && (categoryNames.length > 0 || r.allocName) && /*#__PURE__*/React.createElement("select", {
    value: r.allocName || "",
    onChange: e => onUpdate(r.id, {
      allocName: e.target.value || undefined
    }),
    "aria-label": "Category",
    style: sel
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Other"), Array.from(new Set([...categoryNames, ...(r.allocName ? [r.allocName] : [])])).map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n)))));
}

// Spending categories editor — splits the spending limit into categories (Budget tab).
function SpendCategoriesCard({
  data,
  computed,
  readOnly,
  addSpendAlloc,
  updateSpendAlloc,
  removeSpendAlloc
}) {
  const [colorFor, setColorFor] = useState(null);
  const {
    spendingLimit,
    spendAllocTotal,
    unallocatedSpending,
    catSpent
  } = computed;
  const spendAllocs = data.spendingAllocations || [];
  const overAlloc = unallocatedSpending < -0.004;
  const usedNames = new Set(spendAllocs.map(a => (a.name || "").trim().toLowerCase()));
  const suggestions = SPEND_SUGGESTIONS.filter(n => !usedNames.has(n.toLowerCase())).slice(0, 4);
  const colorAlloc = colorFor && spendAllocs.find(a => a.id === colorFor);
  return /*#__PURE__*/React.createElement("div", {
    id: "spend-categories",
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.sub,
      letterSpacing: 0.3,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    size: 14,
    color: C.accent
  }), " SPENDING CATEGORIES"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.sub
    }
  }, "Limit ", fmt(spendingLimit))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      lineHeight: 1.45,
      marginBottom: 6
    }
  }, readOnly ? "Monthly view — categories from each pay period, combined. Edit them in a single pay period." : "Split your spending limit into categories, then tag purchases with them. Going over a category takes the extra from Other. Click a color to change it."), spendAllocs.map(a => /*#__PURE__*/React.createElement(SpendAllocRow, {
    key: a.id,
    a: a,
    spent: catSpent && catSpent[a.id] || 0,
    onUpdate: updateSpendAlloc,
    onRemove: removeSpendAlloc,
    onColor: setColorFor,
    readOnly: readOnly
  })), !readOnly && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => addSpendAlloc(""),
    style: {
      width: "100%",
      padding: "11px 0",
      borderRadius: 11,
      border: `1px dashed ${C.borderHi}`,
      background: "transparent",
      color: C.sub,
      fontSize: 13.5,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Add category"), suggestions.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7,
      justifyContent: "center",
      marginTop: 10
    }
  }, suggestions.map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => addSpendAlloc(n),
    style: {
      padding: "6px 11px",
      borderRadius: 99,
      border: `1px solid ${C.border}`,
      background: C.cardHi,
      color: C.sub,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "+ ", n)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      background: C.cardHi,
      borderRadius: 12,
      padding: "10px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13.5,
      padding: "3px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.sub
    }
  }, "Allocated"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, fmt(spendAllocTotal))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: 14.5,
      padding: "3px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.text,
      fontWeight: 700
    }
  }, overAlloc ? "Over by" : "Unallocated (Other)"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: overAlloc ? C.red : C.green
    }
  }, fmt(Math.abs(unallocatedSpending))))), overAlloc && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      gap: 9,
      alignItems: "flex-start",
      background: "rgba(248,113,113,0.1)",
      border: "1px solid rgba(248,113,113,0.3)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 15,
    color: C.red,
    style: {
      marginTop: 1,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.text,
      lineHeight: 1.45
    }
  }, "Your categories add up to more than your spending limit. Lower a category or free up money above.")), colorAlloc && /*#__PURE__*/React.createElement(SpendColorModal, {
    alloc: colorAlloc,
    others: spendAllocs.filter(a => a.id !== colorAlloc.id),
    onPick: col => updateSpendAlloc(colorAlloc.id, {
      color: col
    }),
    onClose: () => setColorFor(null)
  }));
}
function BudgetView({
  data,
  update,
  clearTransactions,
  computed,
  addAllocation,
  updateAllocation,
  removeAllocation,
  readOnly,
  travel,
  recurring,
  addRecurring,
  updateRecurring,
  removeRecurring,
  applyRecurring,
  addSpendAlloc,
  updateSpendAlloc,
  removeSpendAlloc
}) {
  const [confirming, setConfirming] = useState(false);
  const len = data.lengthDays || 14;
  const cl = data.cashLimit || {
    enabled: false,
    standalone: false,
    code: "JPY",
    symbol: "¥",
    amount: 0,
    rate: 150
  };
  const setCash = patch => update({
    cashLimit: {
      ...cl,
      ...patch
    }
  });
  const [cashAmt, setCashAmt] = useState(cl.amount ? String(cl.amount) : "");
  const [cashRate, setCashRate] = useState(cl.rate ? String(cl.rate) : "");
  const toggleStyle = (on, color) => ({
    width: 46,
    height: 26,
    borderRadius: 99,
    border: "none",
    background: on ? color : C.border,
    position: "relative",
    cursor: "pointer",
    flexShrink: 0,
    transition: "background 0.2s"
  });
  const knobStyle = on => ({
    position: "absolute",
    top: 3,
    left: on ? 22 : 3,
    width: 20,
    height: 20,
    borderRadius: 99,
    background: "#fff",
    transition: "left 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
  });
  const sectionTitle = {
    fontSize: 13,
    fontWeight: 600,
    color: C.sub,
    marginBottom: 4,
    letterSpacing: 0.3
  };
  const stepBtn = {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: `1px solid ${C.border}`,
    background: C.card,
    color: C.text,
    fontSize: 20,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  };
  const bRow = (label, value, opts = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: opts.bold ? 15 : 13.5,
      padding: "5px 0",
      borderTop: opts.top ? `1px solid ${C.borderHi}` : "none",
      marginTop: opts.top ? 6 : 0,
      paddingTop: opts.top ? 10 : 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: opts.bold ? C.text : C.sub,
      fontWeight: opts.bold ? 700 : 500
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: opts.bold ? 800 : 600,
      color: opts.valueColor || C.text
    }
  }, value));
  const limitCard = /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(180deg, rgba(52,211,153,0.13), rgba(52,211,153,0.04))",
      border: "1px solid rgba(52,211,153,0.35)",
      borderRadius: 16,
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      fontWeight: 700,
      color: C.green,
      letterSpacing: 0.5,
      textAlign: "center"
    }
  }, data.combined ? "MONTHLY SPENDING LIMIT" : "SPENDING LIMIT"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 42,
      fontWeight: 800,
      color: C.green,
      textAlign: "center",
      letterSpacing: -1,
      marginTop: 6
    }
  }, fmt(computed.spendingLimit)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.sub,
      textAlign: "center",
      marginTop: 4,
      marginBottom: 16
    }
  }, "auto-calculated \u2014 what you can spend this period"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(0,0,0,0.22)",
      borderRadius: 12,
      padding: "8px 14px 12px"
    }
  }, bRow("Starting + Income", fmt(computed.available)), bRow("− Savings", "−" + fmt(data.savings)), bRow("− Gas budget", "−" + fmt(data.gasBudget)), bRow("− Insurance", "−" + fmt(data.insurance)), (data.allocations || []).map(a => /*#__PURE__*/React.createElement(React.Fragment, {
    key: a.id
  }, bRow("− " + (a.name || "Allocation"), "−" + fmt(a.amount || 0)))), computed.cashOn && computed.cashSetAside > 0 && bRow(`− Travel cash (${fmtForeign(computed.cashLimitAmt, cl.symbol, cl.code)})`, "−" + fmt(computed.cashSetAside)), bRow("− End goal", "−" + fmt(data.endGoal)), bRow("Spending limit", fmt(computed.spendingLimit), {
    top: true,
    bold: true,
    valueColor: C.green
  })), computed.rawLimit < 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: "flex",
      gap: 9,
      alignItems: "flex-start",
      background: "rgba(248,113,113,0.1)",
      border: "1px solid rgba(248,113,113,0.3)",
      borderRadius: 12,
      padding: "11px 13px"
    }
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 16,
    color: C.red,
    style: {
      marginTop: 1,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.text,
      lineHeight: 1.45
    }
  }, "Your end goal is ", /*#__PURE__*/React.createElement("strong", null, fmt(-computed.rawLimit)), " more than you have after allocations. Lower the goal or allocations.")));
  if (readOnly) {
    return /*#__PURE__*/React.createElement("div", {
      className: "two-col"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...cardStyle,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        background: "rgba(34,211,238,0.06)",
        border: `1px solid rgba(34,211,238,0.25)`
      }
    }, /*#__PURE__*/React.createElement(CalendarDays, {
      size: 17,
      color: C.accent2,
      style: {
        marginTop: 1,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.text,
        lineHeight: 1.45
      }
    }, "Combined monthly view of ", /*#__PURE__*/React.createElement("strong", null, (data.sourceNames || []).join(" + ")), ". The budget is the total of those periods \u2014 edit each one in its own pay period.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, limitCard, (data.spendingAllocations || []).length > 0 && /*#__PURE__*/React.createElement(SpendCategoriesCard, {
      data: data,
      computed: computed,
      readOnly: true
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "two-col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sectionTitle,
      marginBottom: 10
    }
  }, "PERIOD"), /*#__PURE__*/React.createElement("input", {
    value: data.period,
    onChange: e => update({
      period: e.target.value
    }),
    placeholder: "Period name",
    style: {
      width: "100%",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      outline: "none",
      color: C.text,
      fontSize: 15,
      padding: "12px 14px",
      marginBottom: 12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 6
    }
  }, "Start date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: toDateInput(data.startDate),
    onChange: e => {
      if (!e.target.value) return;
      const v = fromDateInput(e.target.value);
      update({
        startDate: v,
        ...(data.monthly ? {
          lengthDays: monthLength(v)
        } : {})
      });
    },
    style: {
      width: "100%",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      outline: "none",
      color: C.text,
      fontSize: 15,
      padding: "11px 14px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      margin: "14px 0 6px"
    }
  }, "Length"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 10
    }
  }, LENGTH_PRESETS.map(pr => {
    const on = pr.monthly ? !!data.monthly : !data.monthly && len === pr.d;
    return /*#__PURE__*/React.createElement("button", {
      key: pr.label,
      onClick: () => update(pr.monthly ? {
        monthly: true,
        lengthDays: monthLength(data.startDate)
      } : {
        monthly: false,
        lengthDays: pr.d
      }),
      style: {
        flex: 1,
        minWidth: 0,
        padding: "9px 0",
        borderRadius: 10,
        border: `1px solid ${on ? C.green : C.border}`,
        background: on ? "rgba(52,211,153,0.12)" : C.bg2,
        color: on ? C.text : C.sub,
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer"
      }
    }, pr.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      padding: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => update({
      monthly: false,
      lengthDays: Math.max(3, len - 1)
    }),
    "aria-label": "Shorter",
    style: stepBtn
  }, "\u2212"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: C.text
    }
  }, len, " days"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted
    }
  }, periodRangeLabel(data))), /*#__PURE__*/React.createElement("button", {
    onClick: () => update({
      monthly: false,
      lengthDays: Math.min(31, len + 1)
    }),
    "aria-label": "Longer",
    style: stepBtn
  }, "\uFF0B")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      textAlign: "center",
      marginTop: 8
    }
  }, data.monthly ? "Monthly follows the calendar — the next period starts on the same date next month." : "Anywhere from 3 days to 1 month (31 days).")), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: sectionTitle
  }, "INCOME"), /*#__PURE__*/React.createElement(NumberField, {
    label: "Starting Balance",
    icon: /*#__PURE__*/React.createElement(Banknote, {
      size: 15
    }),
    value: data.startingBalance,
    onChange: v => update({
      startingBalance: v
    })
  }), /*#__PURE__*/React.createElement(NumberField, {
    label: "Total Income",
    icon: /*#__PURE__*/React.createElement(TrendingUp, {
      size: 15
    }),
    value: data.totalIncome,
    onChange: v => update({
      totalIncome: v
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: sectionTitle
  }, "ALLOCATIONS"), /*#__PURE__*/React.createElement(NumberField, {
    label: "Savings",
    icon: /*#__PURE__*/React.createElement(PiggyBank, {
      size: 15
    }),
    value: data.savings,
    onChange: v => update({
      savings: v
    })
  }), /*#__PURE__*/React.createElement(NumberField, {
    label: "Gas Budget",
    icon: /*#__PURE__*/React.createElement(Fuel, {
      size: 15
    }),
    value: data.gasBudget,
    onChange: v => update({
      gasBudget: v
    })
  }), /*#__PURE__*/React.createElement(NumberField, {
    label: "Insurance",
    icon: /*#__PURE__*/React.createElement(Shield, {
      size: 15
    }),
    value: data.insurance,
    onChange: v => update({
      insurance: v
    })
  }), (data.allocations || []).map(a => /*#__PURE__*/React.createElement(AllocationRow, {
    key: a.id,
    a: a,
    onUpdate: updateAllocation,
    onRemove: removeAllocation
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => addAllocation(""),
    style: {
      width: "100%",
      padding: "11px 0",
      borderRadius: 11,
      border: `1px dashed ${C.borderHi}`,
      background: "transparent",
      color: C.sub,
      fontSize: 13.5,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Add allocation"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      marginTop: 8,
      textAlign: "center"
    }
  }, "Add custom set-asides like rent, groceries, subscriptions\u2026")), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sectionTitle,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Repeat, {
    size: 14,
    color: C.accent
  }), " RECURRING EXPENSES"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 4,
      lineHeight: 1.45
    }
  }, "Bills and subscriptions logged automatically in each new pay period \u2014 every period, or monthly on a set day (only in the period that day falls in)."), (recurring || []).map(r => /*#__PURE__*/React.createElement(RecurringRow, {
    key: r.id,
    r: r,
    onUpdate: updateRecurring,
    onRemove: removeRecurring,
    categoryNames: (data.spendingAllocations || []).map(a => (a.name || "").trim()).filter(Boolean)
  })), /*#__PURE__*/React.createElement("button", {
    onClick: addRecurring,
    style: {
      width: "100%",
      padding: "11px 0",
      borderRadius: 11,
      border: `1px dashed ${C.borderHi}`,
      background: "transparent",
      color: C.sub,
      fontSize: 13.5,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Add recurring expense"), (recurring || []).some(r => r.amount > 0) && /*#__PURE__*/React.createElement("button", {
    onClick: applyRecurring,
    style: {
      width: "100%",
      padding: "10px 0",
      borderRadius: 11,
      border: `1px solid ${C.border}`,
      background: "transparent",
      color: C.sub,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 15
  }), " Add missing ones to this period now")), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: sectionTitle
  }, "END GOAL"), /*#__PURE__*/React.createElement(NumberField, {
    label: "Amount to keep",
    sublabel: "left over at the end of the period",
    icon: /*#__PURE__*/React.createElement(Target, {
      size: 15
    }),
    value: data.endGoal,
    onChange: v => update({
      endGoal: v
    })
  })), /*#__PURE__*/React.createElement(SpendCategoriesCard, {
    data: data,
    computed: computed,
    addSpendAlloc: addSpendAlloc,
    updateSpendAlloc: updateSpendAlloc,
    removeSpendAlloc: removeSpendAlloc
  }), /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sectionTitle,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Plane, {
    size: 14,
    color: C.amber
  }), " TRAVEL CASH"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: C.text
    }
  }, "Foreign cash allowance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 1
    }
  }, "A spending limit in a travel currency (e.g. \xA510,000 withdrawn)")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCash({
      enabled: !cl.enabled,
      ...(!cl.enabled && travel && travel.enabled ? {
        code: travel.code,
        symbol: travel.symbol,
        rate: travel.rate
      } : {})
    }),
    style: toggleStyle(cl.enabled, C.green)
  }, /*#__PURE__*/React.createElement("div", {
    style: knobStyle(cl.enabled)
  }))), cl.enabled && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 8
    }
  }, "Currency"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 6
    }
  }, CURRENCIES.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.code,
    onClick: () => setCash({
      code: c.code,
      symbol: c.symbol
    }),
    style: {
      padding: "9px 6px",
      borderRadius: 10,
      border: `1px solid ${cl.code === c.code ? C.amber : C.border}`,
      background: cl.code === c.code ? "rgba(251,191,36,0.12)" : C.bg2,
      color: cl.code === c.code ? C.text : C.sub,
      fontSize: 12.5,
      fontWeight: 600,
      cursor: "pointer",
      textAlign: "center"
    }
  }, c.symbol, " ", c.code))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      margin: "16px 0 8px"
    }
  }, "Cash on hand / withdrawn"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: C.amber,
      flexShrink: 0
    }
  }, cl.symbol), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: cashAmt,
    onChange: e => {
      const v = e.target.value;
      if (!/^\d*\.?\d*$/.test(v)) return;
      setCashAmt(v);
      const n = v === "" || v === "." ? 0 : parseFloat(v);
      setCash({
        amount: isNaN(n) ? 0 : n
      });
    },
    placeholder: "10000",
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 18,
      fontWeight: 700,
      textAlign: "right"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      margin: "14px 0 8px"
    }
  }, "Exchange rate"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: C.sub,
      flexShrink: 0
    }
  }, "1 USD ="), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: cashRate,
    onChange: e => {
      const v = e.target.value;
      if (!/^\d*\.?\d*$/.test(v)) return;
      setCashRate(v);
      const n = parseFloat(v);
      if (!isNaN(n) && n > 0) setCash({
        rate: n
      });
    },
    placeholder: "150",
    style: {
      flex: 1,
      minWidth: 0,
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 17,
      fontWeight: 700,
      textAlign: "right"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.amber,
      flexShrink: 0
    }
  }, cl.symbol)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: C.text
    }
  }, "Standalone period"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 1
    }
  }, "Track only ", cl.code, " \u2014 hide the USD spending limit here")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCash({
      standalone: !cl.standalone
    }),
    style: toggleStyle(cl.standalone, C.amber)
  }, /*#__PURE__*/React.createElement("div", {
    style: knobStyle(cl.standalone)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      marginTop: 14,
      lineHeight: 1.5
    }
  }, "Its USD value", computed.cashSetAside > 0 ? ` (${fmt(computed.cashSetAside)})` : "", " is set aside from your spending limit up front. ", cl.code, " purchases are then tracked only against this cash \u2014 they don't touch your USD limit. Both rings show on the Dashboard.")))), /*#__PURE__*/React.createElement("div", {
    className: "sticky-col",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, limitCard, /*#__PURE__*/React.createElement("div", {
    style: cardStyle
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirming(true),
    style: {
      width: "100%",
      padding: "12px 0",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: "transparent",
      color: C.sub,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    size: 16
  }), " Clear purchases in this period"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      textAlign: "center",
      marginTop: 12
    }
  }, "To start a fresh pay period, open the period picker in the sidebar \u2192 New pay period."))), confirming && /*#__PURE__*/React.createElement(ConfirmModal, {
    title: "Clear all purchases?",
    message: "Are you sure? This action cannot be undone.",
    confirmLabel: "Clear",
    onCancel: () => setConfirming(false),
    onConfirm: () => {
      clearTransactions();
      setConfirming(false);
    }
  }));
}
function CarryToggle({
  on,
  setOn,
  amount,
  style
}) {
  if (!(amount > 0)) return null;
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => setOn(!on),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 11,
      border: `1px solid ${C.border}`,
      background: "transparent",
      cursor: "pointer",
      textAlign: "left",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 6,
      border: `2px solid ${on ? C.green : C.borderHi}`,
      background: on ? C.green : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, on && /*#__PURE__*/React.createElement(Check, {
    size: 13,
    color: "#06281d",
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: C.text,
      lineHeight: 1.35
    }
  }, "Carry over ", /*#__PURE__*/React.createElement("strong", null, fmt(amount)), " left as the next starting balance"));
}
function PeriodEndedCard({
  period,
  carry,
  setCarry,
  carryAmount,
  onStart
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...cardStyle,
      marginBottom: 20,
      background: "rgba(251,191,36,0.07)",
      border: "1px solid rgba(251,191,36,0.3)",
      display: "flex",
      alignItems: "center",
      gap: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 280px",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 15,
      fontWeight: 700,
      color: C.text,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 17,
    color: C.amber
  }), " Pay period ended"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.sub,
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: C.text
    }
  }, period.period), " ended ", fmtMonthDay(periodEnd(period) - 1), ". Start the next one with the same budget?")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 300px",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(CarryToggle, {
    on: carry,
    setOn: setCarry,
    amount: carryAmount
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onStart,
    style: {
      width: "100%",
      padding: "12px 0",
      borderRadius: 12,
      border: "none",
      background: `linear-gradient(90deg, ${C.greenDim}, ${C.green})`,
      color: "#06281d",
      fontSize: 14.5,
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 17
  }), " Start next period \xB7 ", fmtMonthDay(periodEnd(period)))));
}

/* ================= Period modal ================= */
function PeriodModal({
  store,
  onClose,
  onSwitch,
  onCreate,
  onDelete,
  onCombine,
  onArchive,
  carry,
  setCarry,
  carryAmount
}) {
  const [confirmId, setConfirmId] = useState(null);
  const [archiveId, setArchiveId] = useState(null);
  const [archivedOpen, setArchivedOpen] = useState(false);
  const [combining, setCombining] = useState(false);
  const [selected, setSelected] = useState([]);
  const visiblePeriods = store.periods.filter(p => p.type !== "archived");
  const archivedPeriods = store.periods.filter(p => p.type === "archived");
  const singleCount = store.periods.filter(p => p.type === "single").length;
  const toggleSelect = id => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : s.length >= 4 ? s : [...s, id]);
  const canCreate = selected.length >= 2 && selected.length <= 4;
  const archiveTarget = archiveId ? store.periods.find(p => p.id === archiveId) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      animation: "fadeIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 520,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: 22,
      maxHeight: "86vh",
      display: "flex",
      flexDirection: "column",
      animation: "popIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      fontSize: 18,
      fontWeight: 700,
      color: C.text
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 19,
    color: C.green
  }), " ", combining ? "Pick 2–4 periods" : "Pay Periods", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: C.muted,
      fontWeight: 500
    }
  }, "(", visiblePeriods.length, ")")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      border: "none",
      background: C.card,
      color: C.sub,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 18
  }))), combining && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.sub,
      marginBottom: 12
    }
  }, "Select 2 to 4 pay periods to view together as one month \u2014 handy for months with 3 paychecks."), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      marginBottom: 14
    }
  }, visiblePeriods.map(p => {
    const isCombined = p.type === "combined";
    const rp = resolvePeriod(store, p);
    const active = p.id === store.activePeriodId;
    const {
      spent,
      remainingSpending
    } = computeStats(rp);
    if (confirmId === p.id) {
      return /*#__PURE__*/React.createElement("div", {
        key: p.id,
        style: {
          background: "rgba(248,113,113,0.1)",
          border: `1px solid rgba(248,113,113,0.3)`,
          borderRadius: 12,
          padding: 14,
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          color: C.text,
          marginBottom: 10
        }
      }, "Delete ", /*#__PURE__*/React.createElement("strong", null, p.period), "? This can't be undone."), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setConfirmId(null),
        style: {
          flex: 1,
          padding: "10px 0",
          borderRadius: 10,
          border: `1px solid ${C.border}`,
          background: "transparent",
          color: C.sub,
          fontSize: 13.5,
          fontWeight: 600,
          cursor: "pointer"
        }
      }, "Cancel"), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          onDelete(p.id);
          setConfirmId(null);
        },
        style: {
          flex: 1,
          padding: "10px 0",
          borderRadius: 10,
          border: "none",
          background: C.red,
          color: "#2a0a0a",
          fontSize: 13.5,
          fontWeight: 700,
          cursor: "pointer"
        }
      }, "Delete")));
    }
    const selectable = combining && !isCombined;
    const isSel = selected.includes(p.id);
    const dim = combining && isCombined;
    const rowCanDelete = store.periods.length > 1 && (p.type !== "single" || singleCount >= 2);
    const canArchive = p.type === "single" && singleCount >= 2;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "hoverable",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 14,
        borderRadius: 12,
        opacity: dim ? 0.4 : 1,
        background: isSel ? "rgba(52,211,153,0.12)" : active && !combining ? "rgba(52,211,153,0.1)" : C.card,
        border: `1px solid ${isSel ? C.green : active && !combining ? "rgba(52,211,153,0.3)" : C.border}`,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => dim ? null : selectable ? toggleSelect(p.id) : onSwitch(p.id),
      style: {
        flex: 1,
        textAlign: "left",
        background: "transparent",
        border: "none",
        cursor: dim ? "default" : "pointer",
        color: C.text,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        minWidth: 0
      }
    }, isCombined && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: C.accent2,
        background: "rgba(34,211,238,0.14)",
        padding: "2px 6px",
        borderRadius: 5,
        letterSpacing: 0.3,
        flexShrink: 0
      }
    }, "MONTHLY"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, p.period)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.sub,
        marginTop: 3
      }
    }, periodRangeLabel(rp), " \xB7 ", fmt(spent), " spent \xB7 ", fmt(remainingSpending), " left")), combining ? selectable && /*#__PURE__*/React.createElement("div", {
      style: {
        width: 24,
        height: 24,
        borderRadius: 99,
        border: `2px solid ${isSel ? C.green : C.borderHi}`,
        background: isSel ? C.green : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, isSel && /*#__PURE__*/React.createElement(Check, {
      size: 14,
      color: "#06281d"
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, active && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.green,
        background: "rgba(52,211,153,0.15)",
        padding: "4px 8px",
        borderRadius: 7
      }
    }, "Active"), canArchive && /*#__PURE__*/React.createElement("button", {
      onClick: () => setArchiveId(p.id),
      title: "Archive period",
      style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        border: "none",
        background: "transparent",
        color: C.muted,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Archive, {
      size: 16
    })), rowCanDelete && /*#__PURE__*/React.createElement("button", {
      onClick: () => setConfirmId(p.id),
      title: "Delete period",
      style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        border: "none",
        background: "transparent",
        color: C.muted,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Trash2, {
      size: 16
    }))));
  }), !combining && archivedPeriods.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setArchivedOpen(o => !o),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 14px",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.card,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Archive, {
    size: 16,
    color: C.muted
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "left",
      fontSize: 13.5,
      fontWeight: 600,
      color: C.text
    }
  }, "Archived periods ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontWeight: 500
    }
  }, "(", archivedPeriods.length, ")")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      display: "flex",
      transform: archivedOpen ? "rotate(180deg)" : "none",
      transition: "transform 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16
  }))), archivedOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, archivedPeriods.map(p => {
    const s = p.summary || {};
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        padding: "11px 13px",
        borderRadius: 12,
        background: C.bg,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9.5,
        fontWeight: 700,
        color: C.muted,
        background: C.cardHi,
        padding: "2px 6px",
        borderRadius: 5,
        letterSpacing: 0.4,
        flexShrink: 0
      }
    }, "ARCHIVED"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: C.text,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, p.period)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: C.sub,
        marginTop: 4
      }
    }, periodRangeLabel(p), " \xB7 ", fmt(s.spent || 0), " spent \xB7 ", s.txCount || 0, " purchase", s.txCount === 1 ? "" : "s"));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      textAlign: "center",
      marginTop: 2,
      lineHeight: 1.4
    }
  }, "View-only summaries \u2014 archived periods can't be reopened or edited, but their purchases still appear in the Calendar.")))), combining ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => canCreate && onCombine(selected),
    disabled: !canCreate,
    style: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 12,
      border: "none",
      background: canCreate ? `linear-gradient(90deg, ${C.greenDim}, ${C.green})` : C.card,
      color: canCreate ? "#06281d" : C.muted,
      fontSize: 15,
      fontWeight: 700,
      cursor: canCreate ? "pointer" : "default",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 18
  }), " Create monthly view (", selected.length, "/4)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setCombining(false);
      setSelected([]);
    },
    style: {
      width: "100%",
      padding: "11px 0",
      borderRadius: 11,
      border: "none",
      background: "transparent",
      color: C.sub,
      fontSize: 13.5,
      fontWeight: 600,
      cursor: "pointer",
      marginTop: 8
    }
  }, "Cancel")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CarryToggle, {
    on: carry,
    setOn: setCarry,
    amount: carryAmount,
    style: {
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onCreate,
    style: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 12,
      border: "none",
      background: `linear-gradient(90deg, ${C.greenDim}, ${C.green})`,
      color: "#06281d",
      fontSize: 15,
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 18
  }), " New pay period"), singleCount >= 2 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setCombining(true);
      setSelected([]);
      setConfirmId(null);
    },
    style: {
      width: "100%",
      padding: "12px 0",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: "transparent",
      color: C.sub,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 16
  }), " Combine periods into a month"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      textAlign: "center",
      marginTop: 10
    }
  }, "New periods copy your current budget and categories", carry && carryAmount > 0 ? " and start with what's left" : "", ". Combined months stay viewable, and so do the originals.")))), archiveTarget && /*#__PURE__*/React.createElement(ConfirmModal, {
    title: "Archive this period?",
    message: /*#__PURE__*/React.createElement("span", null, "Once you archive ", /*#__PURE__*/React.createElement("strong", null, archiveTarget.period), " you won't be able to edit it anymore. Its purchases will still show in the Calendar view, and a summary stays in the archived list."),
    confirmLabel: "Archive",
    onCancel: () => setArchiveId(null),
    onConfirm: () => {
      onArchive(archiveId);
      setArchiveId(null);
    }
  }));
}

/* ================= Files (backup / restore / CSV) ================= */
function saveTextFile(name, mime, text) {
  const url = URL.createObjectURL(new Blob([text], {
    type: mime
  }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function openTextFile(onText) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json,text/plain";
  input.onchange = () => {
    const f = input.files && input.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => onText(String(r.result));
    r.readAsText(f);
  };
  input.click();
}
// Every purchase in every period, oldest first. Refunds are negative so a column sum is net spending.
function purchasesCsv(store) {
  const q = v => {
    const x = v == null ? "" : String(v);
    return /[",\r\n]/.test(x) ? '"' + x.replace(/"/g, '""') + '"' : x;
  };
  const rows = [];
  store.periods.forEach(p => {
    if (p.type === "combined") return;
    const names = {};
    (p.spendingAllocations || []).forEach(a => {
      names[a.id] = a.name;
    });
    (p.transactions || []).forEach(t => rows.push({
      t,
      p,
      cat: t.allocId && names[t.allocId] || ""
    }));
  });
  rows.sort((a, b) => (a.t.date || 0) - (b.t.date || 0));
  const out = [["Date", "Pay period", "Merchant", "Type", "Category", "Amount (USD)", "Foreign amount", "Currency"]];
  rows.forEach(({
    t,
    p,
    cat
  }) => out.push([toDateInput(t.date || p.startDate), p.period, t.merchant, catLabel(t.category), cat, ((isRefundCat(t.category) ? -1 : 1) * t.amount).toFixed(2), t.foreignAmount || "", t.foreignCode || ""]));
  return out.map(r => r.map(q).join(",")).join("\r\n") + "\r\n";
}

/* ================= Backup modal ================= */
function BackupModal({
  store,
  onRestore,
  onClose
}) {
  const json = useMemo(() => JSON.stringify(store), [store]);
  const [paste, setPaste] = useState("");
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      try {
        const ta = document.createElement("textarea");
        ta.value = json;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch (e2) {}
    }
  };
  const doRestore = () => {
    if (!onRestore(paste.trim())) setErr(true);
  };
  const ta = extra => ({
    width: "100%",
    resize: "none",
    background: C.bg,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    color: C.sub,
    fontSize: 11.5,
    padding: 10,
    outline: "none",
    fontFamily: "monospace",
    ...extra
  });
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 70,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 18,
      animation: "fadeIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 440,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: 22,
      animation: "popIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: C.text
    }
  }, "Backup & restore"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      border: "none",
      background: C.card,
      color: C.sub,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.sub,
      marginBottom: 7
    }
  }, "Your data \u2014 copy it somewhere safe:"), /*#__PURE__*/React.createElement("textarea", {
    readOnly: true,
    value: json,
    onFocus: e => e.target.select(),
    style: ta({
      height: 80
    })
  }), /*#__PURE__*/React.createElement("button", {
    onClick: copy,
    style: {
      width: "100%",
      padding: "11px 0",
      borderRadius: 11,
      border: "none",
      background: `linear-gradient(90deg, ${C.greenDim}, ${C.green})`,
      color: "#06281d",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      marginTop: 8,
      marginBottom: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6
    }
  }, copied ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Check, {
    size: 16
  }), " Copied") : "Copy data"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.sub,
      marginBottom: 7
    }
  }, "Restore from a backup \u2014 paste it here:"), /*#__PURE__*/React.createElement("textarea", {
    value: paste,
    onChange: e => {
      setPaste(e.target.value);
      setErr(false);
    },
    placeholder: "Paste your backup text\u2026",
    style: ta({
      height: 64,
      color: C.text,
      border: `1px solid ${err ? C.red : C.border}`
    })
  }), err && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.red,
      marginTop: 6
    }
  }, "That doesn't look like a valid backup."), /*#__PURE__*/React.createElement("button", {
    onClick: doRestore,
    disabled: !paste.trim(),
    style: {
      width: "100%",
      padding: "11px 0",
      borderRadius: 11,
      border: `1px solid ${C.border}`,
      background: paste.trim() ? C.card : "transparent",
      color: paste.trim() ? C.text : C.muted,
      fontSize: 14,
      fontWeight: 700,
      cursor: paste.trim() ? "pointer" : "default",
      marginTop: 8
    }
  }, "Restore data")));
}

/* ================= Settings modal ================= */
function SettingsModal({
  themeMode,
  setThemeMode,
  accent,
  setAccent,
  store,
  onReset,
  onRestore,
  onClose,
  travel,
  setTravel,
  user,
  showToast
}) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [backupOpen, setBackupOpen] = useState(false);
  const [rateText, setRateText] = useState(String(travel.rate || 150));
  useEffect(() => {
    setRateText(String(travel.rate || 150));
  }, [travel.code, travel.rate]);
  const themeOpts = [{
    id: "light",
    label: "Light",
    Ico: Sun
  }, {
    id: "dark",
    label: "Dark",
    Ico: Moon
  }, {
    id: "oled",
    label: "OLED",
    Ico: Contrast
  }];
  const sectionLabel = {
    fontSize: 12,
    fontWeight: 700,
    color: C.muted,
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 4
  };
  const rowBtn = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    background: C.card,
    fontSize: 14.5,
    fontWeight: 600,
    cursor: "pointer"
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      zIndex: 55,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      animation: "fadeIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 520,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: 24,
      maxHeight: "88vh",
      overflowY: "auto",
      animation: "popIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      fontSize: 18,
      fontWeight: 700,
      color: C.text
    }
  }, /*#__PURE__*/React.createElement(Cog, {
    size: 19,
    color: C.green
  }), " Settings"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      border: "none",
      background: C.card,
      color: C.sub,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(X, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: sectionLabel
  }, "APPEARANCE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 22
    }
  }, themeOpts.map(({
    id,
    label,
    Ico
  }) => {
    const th = THEMES[id],
      active = themeMode === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setThemeMode(id),
      style: {
        flex: 1,
        padding: 10,
        borderRadius: 14,
        border: `1.5px solid ${active ? C.green : C.border}`,
        background: active ? "rgba(52,211,153,0.08)" : C.cardHi,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: 42,
        borderRadius: 9,
        background: th.bg,
        border: `1px solid ${th.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 20,
        height: 20,
        borderRadius: 6,
        background: `linear-gradient(135deg, ${th.greenDim}, ${th.green})`
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 4,
        borderRadius: 9,
        background: th.text,
        opacity: 0.85
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 15,
        height: 4,
        borderRadius: 9,
        background: th.sub,
        opacity: 0.7
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        color: active ? C.text : C.sub,
        fontSize: 13,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      size: 14
    }), label, active && /*#__PURE__*/React.createElement(Check, {
      size: 13,
      color: C.green
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: sectionLabel
  }, "ACCENT COLOR"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: 22
    }
  }, ACCENTS.map(a => {
    const active = accent.key === a.key;
    return /*#__PURE__*/React.createElement("button", {
      key: a.key,
      onClick: () => setAccent({
        ...accent,
        key: a.key
      }),
      title: a.label,
      style: {
        width: 38,
        height: 38,
        borderRadius: 99,
        cursor: "pointer",
        border: `2px solid ${active ? C.text : "transparent"}`,
        boxShadow: active ? "none" : `0 0 0 1px ${C.border}`,
        background: `linear-gradient(135deg, ${a.dim}, ${a.main})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0
      }
    }, active && /*#__PURE__*/React.createElement(Check, {
      size: 17,
      color: "#fff"
    }));
  }), /*#__PURE__*/React.createElement("label", {
    title: "Custom color",
    style: {
      width: 38,
      height: 38,
      borderRadius: 99,
      cursor: "pointer",
      border: `2px solid ${accent.key === "custom" ? C.text : "transparent"}`,
      boxShadow: accent.key === "custom" ? "none" : `0 0 0 1px ${C.border}`,
      background: accent.key === "custom" ? `linear-gradient(135deg, ${darken(accent.custom, 0.14)}, ${accent.custom})` : "conic-gradient(#f43f5e, #fbbf24, #34d399, #22d3ee, #3b82f6, #8b5cf6, #f43f5e)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    }
  }, accent.key === "custom" && /*#__PURE__*/React.createElement(Check, {
    size: 17,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: accent.custom || "#34d399",
    onChange: e => setAccent({
      key: "custom",
      custom: e.target.value
    }),
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0,
      cursor: "pointer",
      border: "none"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: sectionLabel
  }, "TRAVEL"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      marginBottom: 22,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement(Plane, {
    size: 18,
    color: C.amber
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: C.text
    }
  }, "Travel mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 1
    }
  }, "Log in a foreign currency, auto-convert to USD")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTravel(t => ({
      ...t,
      enabled: !t.enabled
    })),
    style: {
      width: 46,
      height: 26,
      borderRadius: 99,
      border: "none",
      background: travel.enabled ? C.green : C.border,
      position: "relative",
      cursor: "pointer",
      flexShrink: 0,
      transition: "background 0.2s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 3,
      left: travel.enabled ? 22 : 3,
      width: 20,
      height: 20,
      borderRadius: 99,
      background: "#fff",
      transition: "left 0.2s",
      boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
    }
  }))), travel.enabled && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px 16px",
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      margin: "14px 0 8px"
    }
  }, "Currency"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 6
    }
  }, CURRENCIES.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.code,
    onClick: () => setTravel(t => ({
      ...t,
      code: c.code,
      symbol: c.symbol
    })),
    style: {
      padding: "9px 6px",
      borderRadius: 10,
      border: `1px solid ${travel.code === c.code ? C.amber : C.border}`,
      background: travel.code === c.code ? "rgba(251,191,36,0.12)" : C.bg2,
      color: travel.code === c.code ? C.text : C.sub,
      fontSize: 12.5,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, c.symbol, " ", c.code))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      margin: "14px 0 8px"
    }
  }, "Exchange rate"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: C.sub,
      flexShrink: 0
    }
  }, "1 USD ="), /*#__PURE__*/React.createElement("input", {
    inputMode: "decimal",
    value: rateText,
    onChange: e => {
      const v = e.target.value;
      if (!/^\d*\.?\d*$/.test(v)) return;
      setRateText(v);
      const n = parseFloat(v);
      if (!isNaN(n) && n > 0) setTravel(t => ({
        ...t,
        rate: n,
        rateUpdated: Date.now(),
        rateSource: "manual",
        rateCode: t.code
      }));
    },
    style: {
      flex: 1,
      background: "transparent",
      border: "none",
      outline: "none",
      color: C.text,
      fontSize: 17,
      fontWeight: 700,
      textAlign: "right"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.amber,
      flexShrink: 0
    }
  }, travel.symbol)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      marginTop: 7,
      lineHeight: 1.45
    }
  }, rateStatus(travel).label, ". Today's rate is fetched automatically when you're online; a rate you type in is kept for the rest of the day. Also editable on the Convert tab."))), /*#__PURE__*/React.createElement("div", {
    style: sectionLabel
  }, "DATA"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      saveTextFile("weekly-budget-backup-" + toDateInput(Date.now()) + ".json", "application/json", JSON.stringify(store));
      showToast("Backup saved", null);
    },
    style: {
      ...rowBtn,
      color: C.text,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Download, {
    size: 18,
    color: C.accent2
  }), " Save backup file", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: C.muted,
      fontSize: 12.5,
      fontWeight: 500
    }
  }, ".json")), /*#__PURE__*/React.createElement("button", {
    onClick: () => openTextFile(text => {
      if (!onRestore(text.trim())) showToast("That file isn't a Weekly Budget backup", null);
    }),
    style: {
      ...rowBtn,
      color: C.text,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(RotateCcw, {
    size: 18,
    color: C.accent2
  }), " Restore from file"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      saveTextFile("weekly-budget-purchases-" + toDateInput(Date.now()) + ".csv", "text/csv", purchasesCsv(store));
      showToast("Purchases exported", null);
    },
    style: {
      ...rowBtn,
      color: C.text,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Receipt, {
    size: 18,
    color: C.accent2
  }), " Export purchases", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: C.muted,
      fontSize: 12.5,
      fontWeight: 500
    }
  }, "CSV for spreadsheets")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setBackupOpen(true),
    style: {
      ...rowBtn,
      color: C.text,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Pencil, {
    size: 18,
    color: C.accent2
  }), " Copy or paste backup text"), !confirmReset ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirmReset(true),
    style: {
      ...rowBtn,
      color: C.red
    }
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 18
  }), " Reset all data") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(248,113,113,0.08)",
      border: "1px solid rgba(248,113,113,0.3)",
      borderRadius: 12,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: C.text,
      marginBottom: 12,
      textAlign: "center",
      lineHeight: 1.45
    }
  }, user ? /*#__PURE__*/React.createElement(React.Fragment, null, "Delete ", /*#__PURE__*/React.createElement("strong", null, "all periods and purchases"), " here ", /*#__PURE__*/React.createElement("strong", null, "and in your synced account"), " \u2014 the Android app and your other devices too? You'll get a few seconds to undo.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Delete ", /*#__PURE__*/React.createElement("strong", null, "all periods and purchases"), "? You'll get a few seconds to undo.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirmReset(false),
    style: {
      flex: 1,
      padding: "11px 0",
      borderRadius: 11,
      border: `1px solid ${C.border}`,
      background: "transparent",
      color: C.sub,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onReset,
    style: {
      flex: 1,
      padding: "11px 0",
      borderRadius: 11,
      border: "none",
      background: C.red,
      color: "#2a0a0a",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, "Reset"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...sectionLabel,
      marginTop: 22
    }
  }, "ABOUT"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 16,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 700,
      color: C.text
    }
  }, "Weekly Budget \u2014 Web"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.sub,
      marginTop: 3
    }
  }, "Version 3.5 \xB7 Spending categories, quick add & live rates"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.muted,
      marginTop: 6
    }
  }, user ? "Your data is synced to your Google account." : "Your data is stored only in this browser.", " Press ", /*#__PURE__*/React.createElement("strong", null, "N"), " anywhere to add a purchase.")), backupOpen && /*#__PURE__*/React.createElement(BackupModal, {
    store: store,
    onRestore: onRestore,
    onClose: () => setBackupOpen(false)
  })));
}

/* ================= Sidebar ================= */
function Sidebar({
  tab,
  setTab,
  activePeriod,
  onOpenPeriods,
  onOpenSettings,
  account,
  travelOn
}) {
  const nav = [{
    id: "dashboard",
    label: "Dashboard",
    icon: Grid
  }, {
    id: "spending",
    label: "Spending",
    icon: Receipt
  }, travelOn && {
    id: "convert",
    label: "Convert",
    icon: Repeat
  }, {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays
  }, {
    id: "budget",
    label: "Budget",
    icon: Sliders
  }].filter(Boolean);
  return /*#__PURE__*/React.createElement("div", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sb-logo",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "4px 8px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: `linear-gradient(135deg, ${C.greenDim}, ${C.green})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Wallet, {
    size: 21,
    color: "#06281d"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: C.text,
      letterSpacing: -0.3
    }
  }, "Weekly Budget")), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenPeriods,
    className: "hoverable sb-period",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      textAlign: "left",
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "11px 12px",
      cursor: "pointer",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 16,
    color: C.green
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted,
      fontWeight: 600,
      letterSpacing: 0.4
    }
  }, "ACTIVE PERIOD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: C.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, activePeriod.period)), /*#__PURE__*/React.createElement(ChevronDown, {
    size: 16,
    color: C.sub
  })), /*#__PURE__*/React.createElement("div", {
    className: "sb-section-label",
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: 0.6,
      padding: "0 10px 8px"
    }
  }, "MENU"), /*#__PURE__*/React.createElement("div", {
    className: "sb-nav",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, nav.map(n => {
    const Ico = n.icon,
      active = tab === n.id;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => setTab(n.id),
      className: "navitem",
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 12px",
        borderRadius: 11,
        border: "none",
        cursor: "pointer",
        background: active ? "rgba(52,211,153,0.12)" : "transparent",
        color: active ? C.green : C.sub,
        fontSize: 14,
        fontWeight: active ? 700 : 500,
        textAlign: "left",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      size: 19,
      strokeWidth: active ? 2.4 : 2
    }), n.label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "sb-grow",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "sb-account"
  }, account), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenSettings,
    className: "navitem sb-settings",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 12px",
      borderRadius: 11,
      border: "none",
      cursor: "pointer",
      background: "transparent",
      color: C.sub,
      fontSize: 14,
      fontWeight: 500,
      textAlign: "left",
      width: "100%",
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Cog, {
    size: 19
  }), " Settings"));
}

/* ================= Account panel (sync placeholder until Firebase) ================= */
function AccountPanel({
  user,
  syncState,
  onSignIn,
  onSignOut
}) {
  if (user) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 12,
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 99,
        background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        flexShrink: 0
      }
    }, (user.name || "U").slice(0, 1)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: C.text,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, user.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.green,
        display: "flex",
        alignItems: "center",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(Cloud, {
      size: 12
    }), " ", syncState || "Synced")), /*#__PURE__*/React.createElement("button", {
      onClick: onSignOut,
      title: "Sign out",
      style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        border: "none",
        background: "transparent",
        color: C.muted,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(LogOut, {
      size: 16
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      display: "flex",
      alignItems: "center",
      gap: 5,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement(CloudOff, {
    size: 13
  }), " Local only \u2014 not synced"), /*#__PURE__*/React.createElement("button", {
    onClick: onSignIn,
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      padding: "10px 0",
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      background: C.bg2,
      color: C.text,
      fontSize: 13.5,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(GoogleG, {
    size: 17
  }), " Sign in with Google"));
}

/* ================= Onboarding ================= */
function Onboarding({
  onDone
}) {
  const [step, setStep] = useState(0);
  const slides = [{
    icon: /*#__PURE__*/React.createElement(Wallet, {
      size: 30,
      color: "#06281d"
    }),
    iconBg: `linear-gradient(135deg, ${C.greenDim}, ${C.green})`,
    title: "Welcome to Weekly Budget",
    body: "A simple way to plan each pay period and see exactly how much you have left to spend."
  }, {
    icon: /*#__PURE__*/React.createElement(Sliders, {
      size: 28,
      color: C.accent
    }),
    iconBg: "rgba(129,140,248,0.15)",
    title: "1 · Set up your budget",
    body: "On the Budget tab, enter your income, savings, gas, insurance, and the amount you want left over. Your spending limit is calculated automatically."
  }, {
    icon: /*#__PURE__*/React.createElement(Receipt, {
      size: 28,
      color: C.accent
    }),
    iconBg: "rgba(129,140,248,0.15)",
    title: "2 · Log your spending",
    body: "Click Add purchase (or press N) to log each purchase as you go. Split your limit into categories like Food or Fun to see each one fill up."
  }, {
    icon: /*#__PURE__*/React.createElement(Target, {
      size: 28,
      color: C.amber
    }),
    iconBg: "rgba(251,191,36,0.15)",
    title: "3 · Stay on track",
    body: "The Dashboard shows what's left and whether you'll hit your end goal. Open the period picker in the sidebar anytime to start a new pay period."
  }];
  const last = step === slides.length - 1;
  const s = slides[step];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(6,7,10,0.88)",
      backdropFilter: "blur(6px)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      animation: "fadeIn 0.25s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 420,
      background: C.bg2,
      border: `1px solid ${C.border}`,
      borderRadius: 20,
      padding: "32px 28px 24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      animation: "popIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 66,
      height: 66,
      borderRadius: 19,
      background: s.iconBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      transition: "background 0.3s ease"
    }
  }, s.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 800,
      color: C.text,
      marginBottom: 10,
      letterSpacing: -0.3
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      color: C.sub,
      lineHeight: 1.5,
      marginBottom: 22,
      minHeight: 66
    }
  }, s.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      marginBottom: 22
    }
  }, slides.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: i === step ? 22 : 7,
      height: 7,
      borderRadius: 99,
      background: i === step ? C.green : C.border,
      transition: "all 0.3s ease"
    }
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => last ? onDone() : setStep(step + 1),
    style: {
      width: "100%",
      padding: "14px 0",
      borderRadius: 12,
      border: "none",
      background: `linear-gradient(90deg, ${C.greenDim}, ${C.green})`,
      color: "#06281d",
      fontSize: 15.5,
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7
    }
  }, last ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Check, {
    size: 18
  }), " Get started") : "Next"), !last && /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      marginTop: 12,
      background: "transparent",
      border: "none",
      color: C.muted,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Skip")));
}

/* ================= Cloud sync (Firebase) =================
   Each user's whole budget lives at budgets/{uid} as { data, travel, updatedAt } — the same doc
   the Android app uses. Writes go through a transaction: if another device wrote since this one
   last synced, the two versions are merged (periods and purchases added or deleted on either side
   are kept; settings come from the newer side) instead of one overwriting the other. */
function useCloudSync({
  store,
  setStore,
  travel,
  setTravel,
  showToast
}) {
  const [user, setUser] = useState(null);
  const [syncState, setSyncState] = useState("Local only");
  const fbRef = useRef(null);
  const unsubDocRef = useRef(null);
  // Travel mode (a global setting) rides in the SAME doc as the budget data, sharing one
  // updatedAt clock so newest-wins covers both. The baseline signature therefore folds in
  // travel too — flipping travel on/off counts as an edit that pushes, and a remote change
  // to either data or travel applies to this device.
  const normTravel = t => {
    const b = {
      enabled: false,
      code: "JPY",
      symbol: "¥",
      rate: 150
    };
    return t ? {
      ...b,
      ...t
    } : b;
  };
  const sig = (s, t) => JSON.stringify({
    d: s,
    t: normTravel(t)
  });
  const lastSyncedRef = useRef(sig(store, travel)); // content last loaded/synced — baseline for edit detection
  const localUpdatedRef = useRef((() => {
    try {
      return parseInt(localStorage.getItem(UPDATED_KEY) || "0", 10);
    } catch (e) {
      return 0;
    }
  })());
  // The cloud version this browser last matched: { uid, at: its updatedAt, base: syncBase(it) }.
  // A local edit newer than `at` hasn't reached the cloud; a cloud updatedAt other than `at`
  // means another device wrote since. When both are true the two are merged, not replaced.
  const syncMetaRef = useRef((() => {
    try {
      return JSON.parse(localStorage.getItem(SYNC_KEY)) || null;
    } catch (e) {
      return null;
    }
  })());
  const writeTimer = useRef(null);
  const pushingRef = useRef(false);
  const pushAgainRef = useRef(false);
  const readyRef = useRef(false);
  const storeRef = useRef(store);
  storeRef.current = store;
  const travelRef = useRef(travel);
  travelRef.current = travel;
  const userRef = useRef(user);
  userRef.current = user;
  const setLocalUpdated = ts => {
    localUpdatedRef.current = ts;
    try {
      localStorage.setItem(UPDATED_KEY, String(ts));
    } catch (e) {}
  };
  const markSynced = (data, at) => {
    syncMetaRef.current = {
      uid: userRef.current && userRef.current.uid,
      at,
      base: syncBase(data)
    };
    try {
      localStorage.setItem(SYNC_KEY, JSON.stringify(syncMetaRef.current));
    } catch (e) {}
  };
  // The sync point for this account — null if we last synced with a different one (or never).
  const syncedFor = uid => {
    const m = syncMetaRef.current;
    return m && m.uid === uid ? m : null;
  };
  const hasUnsynced = () => {
    const m = syncedFor(userRef.current && userRef.current.uid);
    return localUpdatedRef.current > (m ? m.at : 0);
  };

  // Apply data coming FROM the cloud without it counting as a local edit: set the
  // baseline + edit-time to match the incoming data before storing it, so the
  // edit-detector below sees no divergence and the clock is never falsely advanced.
  const applyRemote = (data, travelField, updatedAt) => {
    const n = normalize(data);
    if (!n) return;
    const hasTravel = travelField != null; // legacy docs may omit travel — keep local then
    const t = hasTravel ? normTravel(travelField) : travelRef.current;
    lastSyncedRef.current = sig(n, t);
    setLocalUpdated(updatedAt || Date.now());
    setStore(n);
    if (hasTravel) setTravel(t);
  };
  const schedulePush = delay => {
    if (writeTimer.current) clearTimeout(writeTimer.current);
    writeTimer.current = setTimeout(push, delay);
  };

  // Write local data up inside a transaction, so a cloud version written since our last sync
  // (by another device, while this one was offline) is merged in rather than overwritten.
  const push = () => {
    const fb = fbRef.current,
      u = userRef.current;
    if (!fb || !u) return;
    if (pushingRef.current) {
      pushAgainRef.current = true;
      return;
    }
    pushingRef.current = true;
    setSyncState("Saving…");
    const ref = fb.doc(fb.db, "budgets", u.uid);
    const local = storeRef.current,
      localTravel = normTravel(travelRef.current);
    const startSig = sig(local, localTravel);
    const localAt = localUpdatedRef.current;
    const meta = syncedFor(u.uid);
    const legacy = !syncMetaRef.current; // last synced before merging existed — no base recorded
    fb.runTransaction(fb.db, async t => {
      const snap = await t.get(ref);
      const cloud = snap.exists() ? snap.data() : null;
      const cloudAt = cloud && cloud.updatedAt || 0;
      const cloudData = cloud && cloud.data ? normalize(cloud.data) : null;
      const ts = Math.max(Date.now(), cloudAt + 1);
      if (cloudData && (!meta || cloudAt !== meta.at)) {
        const cloudTravel = cloud.travel != null ? normTravel(cloud.travel) : localTravel;
        if (sig(cloudData, cloudTravel) === startSig) return {
          data: cloudData,
          travel: cloudTravel,
          at: cloudAt,
          merged: false
        };
        const cloudWins = cloudAt > localAt;
        // Data last synced with a different account: don't mix two people's budgets — newest wins.
        const data = meta || legacy ? mergeStores(cloudWins ? cloudData : local, cloudWins ? local : cloudData, meta ? meta.base : null) : cloudWins ? cloudData : local;
        const travelOut = cloudWins ? cloudTravel : localTravel;
        t.set(ref, {
          data,
          travel: travelOut,
          updatedAt: ts
        });
        return {
          data,
          travel: travelOut,
          at: ts,
          merged: true
        };
      }
      if (cloudData && localAt <= meta.at) return {
        data: local,
        travel: localTravel,
        at: cloudAt,
        merged: false
      }; // nothing new on either side
      t.set(ref, {
        data: local,
        travel: localTravel,
        updatedAt: ts
      });
      return {
        data: local,
        travel: localTravel,
        at: ts,
        merged: false
      };
    }).then(r => {
      // Edited while the write was in flight: keep the old sync point so the next push merges again.
      if (sig(storeRef.current, travelRef.current) !== startSig) {
        pushAgainRef.current = true;
        return;
      }
      if (r.merged) applyRemote(r.data, r.travel, r.at);
      markSynced(r.data, r.at);
      setSyncState("Synced");
    }).catch(() => setSyncState(navigator.onLine === false ? "Offline · will sync" : "Sync error")).finally(() => {
      pushingRef.current = false;
      if (pushAgainRef.current) {
        pushAgainRef.current = false;
        schedulePush(300);
      }
    });
  };

  // A cloud version arrived — on sign-in / reconnect, or another device wrote.
  const reconcile = cloud => {
    const u = userRef.current;
    if (!u) return;
    if (!cloud || !cloud.data) {
      schedulePush(0);
      return;
    } // nothing in the cloud yet → seed it
    const meta = syncedFor(u.uid);
    const cloudAt = cloud.updatedAt || 0;
    if (meta && cloudAt === meta.at) {
      // our own write, or unchanged
      if (hasUnsynced()) schedulePush(0);else setSyncState("Synced");
      return;
    }
    const n = normalize(cloud.data);
    const cloudTravel = cloud.travel != null ? normTravel(cloud.travel) : travelRef.current;
    if (n && sig(n, cloudTravel) === sig(storeRef.current, travelRef.current)) {
      markSynced(n, cloudAt);
      setSyncState("Synced");
      return;
    }
    if (meta && !hasUnsynced()) {
      applyRemote(cloud.data, cloud.travel, cloudAt);
      markSynced(n, cloudAt);
      setSyncState("Synced");
      return;
    }
    schedulePush(0); // changed on both sides → push() merges
  };

  // bridge to window.__fb (set by the module loader); watch auth
  useEffect(() => {
    let unsubAuth = null;
    const init = () => {
      const fb = window.__fb;
      if (!fb) return false;
      fbRef.current = fb;
      unsubAuth = fb.onAuthStateChanged(fb.auth, u => {
        if (u) setUser({
          uid: u.uid,
          name: u.displayName || u.email || "You",
          email: u.email,
          photo: u.photoURL
        });else {
          setUser(null);
          setSyncState("Local only");
        }
      });
      return true;
    };
    if (init()) return () => {
      if (unsubAuth) unsubAuth();
    };
    if (window.__fbError) setSyncState("Offline");
    const onReady = () => init();
    window.addEventListener("firebase-ready", onReady);
    return () => {
      window.removeEventListener("firebase-ready", onReady);
      if (unsubAuth) unsubAuth();
    };
  }, []);

  // On sign-in: follow the cloud doc live. Only server snapshots count — an offline cache
  // snapshot can look like "nothing in the cloud". The first one reconciles with local data.
  useEffect(() => {
    const fb = fbRef.current;
    readyRef.current = false;
    if (unsubDocRef.current) {
      unsubDocRef.current();
      unsubDocRef.current = null;
    }
    if (!fb || !user) return;
    setSyncState(navigator.onLine === false ? "Offline · will sync" : "Syncing…");
    const ref = fb.doc(fb.db, "budgets", user.uid);
    unsubDocRef.current = fb.onSnapshot(ref, s => {
      if (s.metadata.fromCache || s.metadata.hasPendingWrites) return;
      readyRef.current = true;
      reconcile(s.exists() ? s.data() : null);
    }, () => setSyncState("Sync error"));
    return () => {
      if (unsubDocRef.current) {
        unsubDocRef.current();
        unsubDocRef.current = null;
      }
    };
  }, [user]);

  // Retry a failed (offline) push when the connection or the tab comes back.
  useEffect(() => {
    const retry = () => {
      if (readyRef.current && userRef.current && hasUnsynced()) schedulePush(0);
    };
    const onVis = () => {
      if (document.visibilityState === "visible") retry();
    };
    window.addEventListener("online", retry);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("online", retry);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Detect a genuine local edit (store diverges from the synced baseline), stamp the
  // real edit time, and push up when signed in. Loads and applied remote updates match
  // the baseline, so they never count as edits and never restamp the clock.
  useEffect(() => {
    const json = sig(store, travel);
    if (json === lastSyncedRef.current) return; // load / remote echo — not a local edit
    lastSyncedRef.current = json;
    setLocalUpdated(Date.now());
    if (!fbRef.current || !user || !readyRef.current) return; // stamped locally; pushed once the cloud is reachable
    schedulePush(700);
  }, [store, travel, user]);
  const signIn = () => {
    const fb = fbRef.current || window.__fb;
    if (!fb) {
      showToast("Sync unavailable — Firebase didn't load.", null);
      return;
    }
    const provider = new fb.GoogleAuthProvider();
    fb.signInWithPopup(fb.auth, provider).catch(e => {
      const code = e && e.code;
      if (code === "auth/popup-blocked" || code === "auth/cancelled-popup-request") fb.signInWithRedirect(fb.auth, provider);else if (code !== "auth/popup-closed-by-user") showToast("Sign-in failed: " + (code || "unknown"), null);
    });
  };
  const signOut = () => {
    const fb = fbRef.current;
    if (fb) fb.signOut(fb.auth);
    setUser(null);
  };
  return {
    user,
    syncState,
    signIn,
    signOut
  };
}

/* ================= App ================= */
function App() {
  const [store, setStore] = useState(() => loadStore());
  const [tab, setTab] = useState("dashboard");
  const [periodsOpen, setPeriodsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Existing users (data already saved here) skip the intro.
    try {
      return !localStorage.getItem(ONBOARD_KEY) && !localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return false;
    }
  });
  const finishOnboarding = () => {
    try {
      localStorage.setItem(ONBOARD_KEY, "1");
    } catch (e) {}
    setShowOnboarding(false);
  };
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "dark";
    } catch (e) {
      return "dark";
    }
  });
  const [accent, setAccent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ACCENT_KEY)) || {
        key: "green",
        custom: "#34d399"
      };
    } catch (e) {
      return {
        key: "green",
        custom: "#34d399"
      };
    }
  });
  const [travel, setTravel] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(TRAVEL_KEY)) || {
        enabled: false,
        code: "JPY",
        symbol: "¥",
        rate: 150
      };
    } catch (e) {
      return {
        enabled: false,
        code: "JPY",
        symbol: "¥",
        rate: 150
      };
    }
  });
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  applyTheme(themeMode, resolveAccent(accent.key, accent.custom));
  const showToast = (message, undo, note) => {
    setToast({
      message,
      undo,
      note
    });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  };

  // Travel mode: fetch today's rate when it's missing, from an earlier day, or for another currency.
  // A rate typed in today wins until tomorrow.
  const refreshRate = async manual => {
    const code = travel.code;
    const r = await fetchUsdRate(code);
    if (!r) {
      if (manual) showToast("Couldn't get today's rate — check your connection", null);
      return;
    }
    setTravel(t => t.code === code ? {
      ...t,
      rate: r.rate,
      rateUpdated: Date.now(),
      rateSource: "live",
      rateCode: code,
      rateDate: r.date
    } : t);
    if (manual) showToast(`1 USD = ${travel.symbol}${r.rate.toLocaleString()} (${r.date})`, null);
  };
  const rateFresh = travel.rateCode === travel.code && travel.rateUpdated && isToday(travel.rateUpdated);
  const legacyRate = !travel.rateCode && travel.rateUpdated && isToday(travel.rateUpdated); // set today before rates were fetched
  useEffect(() => {
    if (!travel.enabled || rateFresh || legacyRate) return;
    refreshRate(false);
    const retry = () => refreshRate(false);
    window.addEventListener("online", retry);
    return () => window.removeEventListener("online", retry);
  }, [travel.enabled, travel.code, rateFresh]);

  // Convert tab only exists while travel mode is on — bounce off it if travel gets disabled.
  useEffect(() => {
    if (tab === "convert" && !(travel && travel.enabled)) setTab("dashboard");
  }, [tab, travel && travel.enabled]);
  const {
    user,
    syncState,
    signIn,
    signOut
  } = useCloudSync({
    store,
    setStore,
    travel,
    setTravel,
    showToast
  });

  // New periods start from what was left of the last one (on by default; remembered per browser).
  const [carryOver, setCarryOver] = useState(() => {
    try {
      return localStorage.getItem(CARRY_KEY) !== "0";
    } catch (e) {
      return true;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(CARRY_KEY, carryOver ? "1" : "0");
    } catch (e) {}
  }, [carryOver]);
  const [quickAdd, setQuickAdd] = useState(null); // { pid, day } while the quick-add dialog is open

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, themeMode);
    } catch (e) {}
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", C.bg);
  }, [themeMode]);
  useEffect(() => {
    try {
      localStorage.setItem(ACCENT_KEY, JSON.stringify(accent));
    } catch (e) {}
  }, [accent]);
  // Debounced persist — serializing the whole store on every keystroke gets costly as history grows.
  // A pagehide/hidden flush covers closing the tab inside the debounce window.
  const persistRef = useRef(store);
  const dirtyRef = useRef(false); // only flush when a debounced write is actually pending
  const firstPersist = useRef(true);
  persistRef.current = store;
  useEffect(() => {
    if (firstPersist.current) {
      firstPersist.current = false;
      return;
    } // mount = data just loaded, nothing to save
    dirtyRef.current = true;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        dirtyRef.current = false;
      } catch (e) {}
    }, 400);
    return () => clearTimeout(t);
  }, [store]);
  useEffect(() => {
    const flush = () => {
      if (!dirtyRef.current) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persistRef.current));
        dirtyRef.current = false;
      } catch (e) {}
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(TRAVEL_KEY, JSON.stringify(travel));
    } catch (e) {}
  }, [travel]);
  const activePeriod = store.periods.find(p => p.id === store.activePeriodId) || store.periods[0];
  const view = useMemo(() => resolvePeriod(store, activePeriod), [store, activePeriod]);
  const readOnly = !!view.readOnly;
  const computed = useMemo(() => computeStats(view), [view]);
  const updatePeriod = (pid, updater) => setStore(s => ({
    ...s,
    periods: s.periods.map(p => p.id === pid ? updater(p) : p)
  }));
  const updateActive = updater => setStore(s => ({
    ...s,
    periods: s.periods.map(p => p.id === s.activePeriodId ? updater(p) : p)
  }));
  const update = patch => updateActive(p => ({
    ...p,
    ...patch
  }));
  // Purchase edits take a period id so the Calendar and all-period search can edit any period.
  const addTransaction = (t, pid = store.activePeriodId) => {
    // If this purchase takes its category (further) over, say how much spilled into Other.
    const before = store.periods.find(p => p.id === pid);
    let spillNote = "";
    if (before && t.allocId && t.category === "spending") {
      const was = computeStats(before).catOver[t.allocId] || 0;
      const now = computeStats({
        ...before,
        transactions: [...before.transactions, t]
      }).catOver[t.allocId] || 0;
      const cat = (before.spendingAllocations || []).find(a => a.id === t.allocId);
      if (now > was) spillNote = `${fmt(now - was)} over ${cat && cat.name || "category"} — taken from Other`;
    }
    updatePeriod(pid, p => ({
      ...p,
      transactions: [...p.transactions, t]
    }));
    showToast((isRefundCat(t.category) ? "Refund " : "Added ") + fmt(t.amount) + " · " + t.merchant, () => {
      updatePeriod(pid, p => ({
        ...p,
        transactions: p.transactions.filter(x => x.id !== t.id)
      }));
      setToast(null);
    }, spillNote);
  };
  const removeTransaction = (id, pid = store.activePeriodId) => {
    const p = store.periods.find(x => x.id === pid);
    const idx = p ? (p.transactions || []).findIndex(x => x.id === id) : -1;
    if (idx < 0) return;
    const removed = p.transactions[idx];
    updatePeriod(pid, pp => ({
      ...pp,
      transactions: pp.transactions.filter(x => x.id !== id)
    }));
    showToast(isRefundCat(removed.category) ? "Refund deleted" : "Purchase deleted", () => {
      updatePeriod(pid, pp => ({
        ...pp,
        transactions: reinsert(pp.transactions, idx, removed)
      }));
      setToast(null);
    });
  };
  const updateTransaction = (id, patch, pid = store.activePeriodId) => updatePeriod(pid, p => ({
    ...p,
    transactions: p.transactions.map(x => x.id === id ? {
      ...x,
      ...patch
    } : x)
  }));
  const clearTransactions = () => updateActive(p => ({
    ...p,
    transactions: []
  }));
  // Removing a list item (allocation, category, recurring expense) offers Undo. Blank rows just go.
  const removeWithUndo = (list, id, apply, label, extra) => {
    const idx = (list || []).findIndex(x => x.id === id);
    if (idx < 0) return;
    const item = list[idx];
    apply(l => (l || []).filter(x => x.id !== id));
    const name = (item.name || item.merchant || "").trim();
    if (!name && !item.amount) return;
    showToast((name ? `"${name}"` : label) + " removed" + (extra || ""), () => {
      apply(l => reinsert(l, idx, item));
      setToast(null);
    });
  };
  // Recurring expenses — store-level templates auto-logged into each new pay period.
  const addRecurring = () => setStore(s => ({
    ...s,
    recurring: [...(s.recurring || []), {
      id: "r" + uid(),
      merchant: "",
      amount: 0,
      category: "spending",
      freq: "period",
      day: 1
    }]
  }));
  const updateRecurring = (id, patch) => setStore(s => ({
    ...s,
    recurring: (s.recurring || []).map(r => r.id === id ? {
      ...r,
      ...patch
    } : r)
  }));
  const removeRecurring = id => removeWithUndo(store.recurring, id, fn => setStore(s => ({
    ...s,
    recurring: fn(s.recurring)
  })), "Recurring expense");
  const applyRecurring = () => {
    // add any missing recurring expenses to the CURRENT period
    const rec = (store.recurring || []).filter(r => r.amount > 0);
    if (!rec.length || !activePeriod || activePeriod.type !== "single") return;
    const have = new Set((activePeriod.transactions || []).map(t => t.recurringKey || t.recurringId).filter(Boolean));
    const toAdd = [].concat(...rec.map(r => recurringTxFor(activePeriod, r))).filter(t => !have.has(t.recurringKey));
    if (!toAdd.length) {
      showToast("All recurring expenses are already in this period", null);
      return;
    }
    updateActive(p => ({
      ...p,
      transactions: [...p.transactions, ...toAdd]
    }));
    showToast(toAdd.length + " recurring expense" + (toAdd.length > 1 ? "s" : "") + " added", null);
  };
  const addAllocation = name => updateActive(p => ({
    ...p,
    allocations: [...(p.allocations || []), {
      id: "a" + Date.now() + Math.random().toString(36).slice(2, 5),
      name: name || "",
      amount: 0
    }]
  }));
  const updateAllocation = (id, patch) => updateActive(p => ({
    ...p,
    allocations: (p.allocations || []).map(a => a.id === id ? {
      ...a,
      ...patch
    } : a)
  }));
  const removeAllocation = id => {
    const pid = activePeriod.id;
    removeWithUndo(activePeriod.allocations, id, fn => updatePeriod(pid, p => ({
      ...p,
      allocations: fn(p.allocations)
    })), "Allocation");
  };
  const addSpendAlloc = name => updateActive(p => ({
    ...p,
    spendingAllocations: [...(p.spendingAllocations || []), {
      id: "s" + uid(),
      name: name || "",
      amount: 0,
      color: nextSpendColor(p.spendingAllocations)
    }]
  }));
  const updateSpendAlloc = (id, patch) => updateActive(p => ({
    ...p,
    spendingAllocations: (p.spendingAllocations || []).map(a => a.id === id ? {
      ...a,
      ...patch
    } : a)
  }));
  // Tagged purchases keep their category id, so Undo puts them straight back in the category.
  const removeSpendAlloc = id => {
    const pid = activePeriod.id;
    const n = (activePeriod.transactions || []).filter(t => t.allocId === id).length;
    removeWithUndo(activePeriod.spendingAllocations, id, fn => updatePeriod(pid, p => ({
      ...p,
      spendingAllocations: fn(p.spendingAllocations)
    })), "Category", n ? ` · ${n} purchase${n > 1 ? "s" : ""} moved to Other` : "");
  };
  // Both replace everything (and sync that everywhere when signed in), so keep the old data for Undo.
  const replaceAllData = (next, message) => {
    const prev = store;
    setStore(next);
    setSettingsOpen(false);
    setTab("dashboard");
    showToast(message, () => {
      setStore(prev);
      setToast(null);
    });
  };
  const resetAllData = () => replaceAllData(defaultData(), "All data reset");
  const restoreData = json => {
    try {
      const n = normalize(JSON.parse(json));
      if (!n) return false;
      replaceAllData(n, "Backup restored");
      return true;
    } catch (e) {
      return false;
    }
  };

  // The pay period a new one builds on: the active one, or a monthly view's latest period
  // (a monthly view's totals are the SUM of its periods — copying them would double everything).
  const nextSource = () => {
    if (activePeriod.type === "single") return activePeriod;
    const singles = store.periods.filter(p => p.type === "single");
    const sources = singles.filter(p => (activePeriod.sourceIds || []).includes(p.id));
    return (sources.length ? sources : singles).slice().sort((a, b) => b.startDate - a.startDate)[0] || view;
  };
  const carryAmount = Math.max(0, Math.round(computeStats(nextSource()).projectedLeftover * 100) / 100);
  // The active period is over and nothing comes after it yet → offer to start the next one.
  const periodEnded = activePeriod.type === "single" && startOfDay(Date.now()) >= periodEnd(activePeriod) && !store.periods.some(p => p.type === "single" && startOfDay(p.startDate) >= startOfDay(periodEnd(activePeriod)));
  const createPeriod = (carry = carryOver) => {
    const src = nextSource();
    const leftover = carryAmount;
    const startDate = periodEnd(src);
    const np = makePeriod({
      period: "New Pay Period",
      startDate,
      lengthDays: src.monthly ? monthLength(startDate) : src.lengthDays || 14,
      monthly: !!src.monthly,
      startingBalance: carry && leftover > 0 ? leftover : src.startingBalance,
      totalIncome: src.totalIncome,
      savings: src.savings,
      gasBudget: src.gasBudget,
      insurance: src.insurance,
      endGoal: src.endGoal,
      allocations: (src.allocations || []).map((a, i) => ({
        id: "a" + Date.now() + i + Math.random().toString(36).slice(2, 4),
        name: a.name,
        amount: a.amount
      })),
      spendingAllocations: (src.spendingAllocations || []).map(a => ({
        id: "s" + uid(),
        name: a.name,
        amount: a.amount,
        color: a.color
      }))
    });
    const rec = [].concat(...(store.recurring || []).filter(r => r.amount > 0).map(r => recurringTxFor(np, r)));
    if (rec.length) np.transactions = rec;
    setStore(s => ({
      ...s,
      periods: [np, ...s.periods],
      activePeriodId: np.id
    }));
    setPeriodsOpen(false);
    setTab("budget");
    if (rec.length) showToast(rec.length + " recurring expense" + (rec.length > 1 ? "s" : "") + " added to the new period", null);
  };
  const switchPeriod = id => {
    setStore(s => ({
      ...s,
      activePeriodId: id
    }));
    setPeriodsOpen(false);
    setTab("dashboard");
  };
  const combinePeriods = ids => {
    if (!ids || ids.length < 2 || ids.length > 4) return;
    const srcs = ids.map(id => store.periods.find(p => p.id === id)).filter(Boolean);
    const name = srcs.length > 2 ? "Monthly · " + srcs.length + " periods" : "Monthly · " + srcs.map(s => s.period).join(" + ");
    const np = {
      id: "c" + Date.now() + Math.random().toString(36).slice(2, 5),
      type: "combined",
      createdAt: Date.now(),
      period: name,
      sourceIds: ids
    };
    setStore(s => ({
      ...s,
      periods: [np, ...s.periods],
      activePeriodId: np.id
    }));
    setPeriodsOpen(false);
    setTab("dashboard");
  };
  const deletePeriod = id => setStore(s => {
    if (s.periods.length <= 1) return s;
    const periods = s.periods.filter(p => p.id !== id);
    let activePeriodId = s.activePeriodId;
    if (activePeriodId === id) {
      const single = periods.find(p => p.type === "single");
      activePeriodId = (single || periods[0]).id;
    }
    return {
      ...s,
      periods,
      activePeriodId
    };
  });
  const archivePeriod = id => setStore(s => {
    const p = s.periods.find(x => x.id === id);
    if (!p || p.type !== "single") return s;
    // Keep at least one editable (single) period around.
    const otherSingles = s.periods.filter(x => x.type === "single" && x.id !== id);
    if (!otherSingles.length) return s;
    const archived = makeArchivedPeriod(p);
    const periods = s.periods.map(x => x.id === id ? archived : x);
    let activePeriodId = s.activePeriodId;
    if (activePeriodId === id) activePeriodId = otherSingles[0].id;
    return {
      ...s,
      periods,
      activePeriodId
    };
  });

  // Quick add logs into the period on screen; from the Calendar (or when a monthly view is on
  // screen) it picks the pay period that contains the day.
  const singles = store.periods.filter(p => p.type === "single");
  const periodFor = day => singles.find(p => day >= startOfDay(p.startDate) && day < periodEnd(p));
  const openQuickAdd = day => {
    const target = day != null ? periodFor(startOfDay(day)) || (activePeriod.type === "single" ? activePeriod : null) : activePeriod.type === "single" ? activePeriod : periodFor(startOfDay(Date.now())) || singles[0];
    if (!target) return;
    setPeriodsOpen(false);
    setSettingsOpen(false);
    setQuickAdd({
      pid: target.id,
      day: day != null ? startOfDay(day) : null
    });
  };
  const quickPeriod = quickAdd && store.periods.find(p => p.id === quickAdd.pid);
  // "N" opens quick add from anywhere (not while typing or with a dialog open).
  const hotkeyRef = useRef(null);
  hotkeyRef.current = e => {
    if (e.key !== "n" && e.key !== "N") return;
    if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
    const el = document.activeElement,
      tag = el && el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el && el.isContentEditable) return;
    if (quickAdd || periodsOpen || settingsOpen || showOnboarding || !singles.length) return;
    e.preventDefault();
    openQuickAdd();
  };
  useEffect(() => {
    const onKey = e => hotkeyRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const editCategories = () => {
    setTab("budget");
    setTimeout(() => {
      const el = document.getElementById("spend-categories");
      if (!el) return;
      // On narrow screens the sidebar becomes a sticky top header — scroll below it.
      const sb = document.querySelector(".sidebar");
      const header = sb && getComputedStyle(sb).flexDirection === "row" ? sb.offsetHeight : 0;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - header - 16
      }); // instant — a smooth scroll gets cancelled by the tab's entry animation
    }, 80);
  };
  const titleMap = {
    dashboard: "Dashboard",
    spending: "Spending",
    convert: "Converter",
    calendar: "Calendar",
    budget: "Budget"
  };
  const travelOn = travel.enabled && travel.rate > 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "shell"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    tab: tab,
    setTab: setTab,
    activePeriod: activePeriod,
    onOpenPeriods: () => setPeriodsOpen(true),
    onOpenSettings: () => setSettingsOpen(true),
    travelOn: travel && travel.enabled,
    account: /*#__PURE__*/React.createElement(AccountPanel, {
      user: user,
      syncState: syncState,
      onSignIn: signIn,
      onSignOut: signOut
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: -0.5,
      color: C.text
    }
  }, titleMap[tab]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 5,
      fontSize: 13,
      color: C.sub
    }
  }, /*#__PURE__*/React.createElement(CalendarDays, {
    size: 14,
    color: C.muted
  }), /*#__PURE__*/React.createElement("span", null, activePeriod.period, " \xB7 ", periodRangeLabel(view), " \xB7 ", view.lengthDays, " days"), view.combined && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      color: C.accent2,
      background: "rgba(34,211,238,0.14)",
      padding: "2px 7px",
      borderRadius: 6,
      letterSpacing: 0.3
    }
  }, "MONTHLY"))), travelOn && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(251,191,36,0.08)",
      border: "1px solid rgba(251,191,36,0.28)",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 12.5,
      fontWeight: 600,
      color: C.amber
    }
  }, /*#__PURE__*/React.createElement(Plane, {
    size: 15
  }), " ", travel.code, " \xB7 1 USD = ", travel.symbol, travel.rate), tab !== "convert" && tab !== "spending" && singles.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => openQuickAdd(),
    title: "Add purchase (N)",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "10px 16px",
      borderRadius: 11,
      border: "none",
      background: `linear-gradient(90deg, ${C.greenDim}, ${C.green})`,
      color: "#06281d",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 17
  }), " Add purchase")), /*#__PURE__*/React.createElement("div", {
    key: tab + activePeriod.id,
    style: {
      animation: "fadeSlide 0.28s ease"
    }
  }, tab === "dashboard" && periodEnded && /*#__PURE__*/React.createElement(PeriodEndedCard, {
    period: activePeriod,
    carry: carryOver,
    setCarry: setCarryOver,
    carryAmount: carryAmount,
    onStart: () => createPeriod()
  }), tab === "dashboard" && /*#__PURE__*/React.createElement(Dashboard, {
    data: view,
    computed: computed,
    readOnly: readOnly,
    updateSpendAlloc: updateSpendAlloc,
    onEditCategories: editCategories
  }), tab === "spending" && /*#__PURE__*/React.createElement(SpendingView, {
    data: view,
    computed: computed,
    addTransaction: addTransaction,
    removeTransaction: removeTransaction,
    updateTransaction: updateTransaction,
    readOnly: readOnly,
    travel: travel,
    store: store
  }), tab === "convert" && /*#__PURE__*/React.createElement(ConvertView, {
    computed: computed,
    travel: travel,
    setTravel: setTravel,
    onRefreshRate: () => refreshRate(true)
  }), tab === "calendar" && /*#__PURE__*/React.createElement(CalendarView, {
    data: view,
    store: store,
    onUpdateTx: updateTransaction,
    onRemoveTx: removeTransaction,
    onAddOnDay: singles.length ? openQuickAdd : null
  }), tab === "budget" && /*#__PURE__*/React.createElement(BudgetView, {
    data: view,
    update: update,
    clearTransactions: clearTransactions,
    computed: computed,
    addAllocation: addAllocation,
    updateAllocation: updateAllocation,
    removeAllocation: removeAllocation,
    readOnly: readOnly,
    travel: travel,
    recurring: store.recurring,
    addRecurring: addRecurring,
    updateRecurring: updateRecurring,
    removeRecurring: removeRecurring,
    applyRecurring: applyRecurring,
    addSpendAlloc: addSpendAlloc,
    updateSpendAlloc: updateSpendAlloc,
    removeSpendAlloc: removeSpendAlloc
  })))), periodsOpen && /*#__PURE__*/React.createElement(PeriodModal, {
    store: store,
    onClose: () => setPeriodsOpen(false),
    onSwitch: switchPeriod,
    onCreate: () => createPeriod(),
    onDelete: deletePeriod,
    onCombine: combinePeriods,
    onArchive: archivePeriod,
    carry: carryOver,
    setCarry: setCarryOver,
    carryAmount: carryAmount
  }), quickPeriod && /*#__PURE__*/React.createElement(QuickAddModal, {
    key: quickAdd.pid + (quickAdd.day || ""),
    period: quickPeriod,
    store: store,
    travel: travel,
    addTransaction: t => addTransaction(t, quickAdd.pid),
    presetDay: quickAdd.day,
    isActive: quickAdd.pid === activePeriod.id,
    onClose: () => setQuickAdd(null)
  }), settingsOpen && /*#__PURE__*/React.createElement(SettingsModal, {
    themeMode: themeMode,
    setThemeMode: setThemeMode,
    accent: accent,
    setAccent: setAccent,
    store: store,
    onReset: resetAllData,
    onRestore: restoreData,
    onClose: () => setSettingsOpen(false),
    travel: travel,
    setTravel: setTravel,
    user: user,
    showToast: showToast
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    message: toast.message,
    note: toast.note,
    undo: toast.undo,
    onClose: () => setToast(null)
  }), showOnboarding && /*#__PURE__*/React.createElement(Onboarding, {
    onDone: finishOnboarding
  }));
}

// Last-resort crash screen — data stays untouched in localStorage/cloud.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 420,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: "rgba(248,113,113,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px"
      }
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      size: 26,
      color: "#f87171"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: "var(--text)",
        marginBottom: 8
      }
    }, "Something went wrong"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: "var(--sub)",
        lineHeight: 1.5,
        marginBottom: 20
      }
    }, "Your data is safe. Reload the app to keep going."), /*#__PURE__*/React.createElement("button", {
      onClick: () => window.location.reload(),
      style: {
        padding: "12px 24px",
        borderRadius: 11,
        border: "none",
        background: "var(--green)",
        color: "#06281d",
        fontSize: 14.5,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, "Reload app")));
  }
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(App, null)));