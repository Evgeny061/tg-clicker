{\rtf1\ansi\ansicpg1251\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const tg = window.Telegram?.WebApp;\
if (tg) \{\
  tg.ready();\
  tg.expand();\
\}\
\
const $ = (id) => document.getElementById(id);\
\
const state = \{\
  score: 0,\
  perClick: 1,\
  autoPerSec: 0,\
  multCost: 10,\
  autoCost: 25,\
\};\
\
const LS_KEY = "tg_clicker_v1";\
\
function load() \{\
  try \{\
    const raw = localStorage.getItem(LS_KEY);\
    if (!raw) return;\
    const data = JSON.parse(raw);\
    Object.assign(state, data);\
  \} catch \{\}\
\}\
\
function save() \{\
  localStorage.setItem(LS_KEY, JSON.stringify(state));\
\}\
\
function fmt(n) \{\
  // \uc0\u1087 \u1088 \u1086 \u1089 \u1090 \u1086 \u1081  \u1092 \u1086 \u1088 \u1084 \u1072 \u1090  \u1076 \u1083 \u1103  \u1073 \u1086 \u1083 \u1100 \u1096 \u1080 \u1093  \u1095 \u1080 \u1089 \u1077 \u1083 \
  if (n < 1000) return String(n);\
  if (n < 1_000_000) return (n/1000).toFixed(1).replace(/\\.0$/,'') + "k";\
  return (n/1_000_000).toFixed(1).replace(/\\.0$/,'') + "m";\
\}\
\
function render() \{\
  $("score").textContent = fmt(state.score);\
  $("perClick").textContent = fmt(state.perClick);\
  $("autoPerSec").textContent = fmt(state.autoPerSec);\
  $("multCost").textContent = fmt(state.multCost);\
  $("autoCost").textContent = fmt(state.autoCost);\
\
  // \uc0\u1077 \u1089 \u1083 \u1080  \u1086 \u1090 \u1082 \u1088 \u1099 \u1090  \u1074  Telegram \'97 \u1084 \u1086 \u1078 \u1085 \u1086  \u1087 \u1086 \u1082 \u1072 \u1079 \u1072 \u1090 \u1100  \u1075 \u1083 \u1072 \u1074 \u1085 \u1091 \u1102  \u1082 \u1085 \u1086 \u1087 \u1082 \u1091  "\u1057 \u1086 \u1093 \u1088 \u1072 \u1085 \u1077 \u1085 \u1086 "\
  if (tg?.MainButton) \{\
    tg.MainButton.setText("\uc0\u1055 \u1088 \u1086 \u1075 \u1088 \u1077 \u1089 \u1089  \u1089 \u1086 \u1093 \u1088 \u1072 \u1085 \u1105 \u1085 ");\
    tg.MainButton.show();\
    tg.MainButton.disable();\
  \}\
\}\
\
function haptic(kind="light") \{\
  tg?.HapticFeedback?.impactOccurred?.(kind);\
\}\
\
function addScore(amount) \{\
  state.score += amount;\
  save();\
  render();\
\}\
\
$("tap").addEventListener("click", () => \{\
  addScore(state.perClick);\
  haptic("light");\
\});\
\
$("buyMult").addEventListener("click", () => \{\
  if (state.score < state.multCost) \{\
    tg?.showToast?.("\uc0\u1053 \u1077  \u1093 \u1074 \u1072 \u1090 \u1072 \u1077 \u1090  \u1086 \u1095 \u1082 \u1086 \u1074 ");\
    haptic("rigid");\
    return;\
  \}\
  state.score -= state.multCost;\
  state.perClick += 1;\
  state.multCost = Math.floor(state.multCost * 1.6 + 1);\
  save();\
  render();\
  haptic("medium");\
\});\
\
$("buyAuto").addEventListener("click", () => \{\
  if (state.score < state.autoCost) \{\
    tg?.showToast?.("\uc0\u1053 \u1077  \u1093 \u1074 \u1072 \u1090 \u1072 \u1077 \u1090  \u1086 \u1095 \u1082 \u1086 \u1074 ");\
    haptic("rigid");\
    return;\
  \}\
  state.score -= state.autoCost;\
  state.autoPerSec += 1;\
  state.autoCost = Math.floor(state.autoCost * 1.8 + 2);\
  save();\
  render();\
  haptic("medium");\
\});\
\
$("reset").addEventListener("click", () => \{\
  const ok = confirm("\uc0\u1057 \u1073 \u1088 \u1086 \u1089 \u1080 \u1090 \u1100  \u1087 \u1088 \u1086 \u1075 \u1088 \u1077 \u1089 \u1089 ?");\
  if (!ok) return;\
  localStorage.removeItem(LS_KEY);\
  location.reload();\
\});\
\
// \uc0\u1072 \u1074 \u1090 \u1086 \u1082 \u1083 \u1080 \u1082 \u1077 \u1088 \
setInterval(() => \{\
  if (state.autoPerSec > 0) \{\
    state.score += state.autoPerSec;\
    save();\
    render();\
  \}\
\}, 1000);\
\
// \uc0\u1089 \u1090 \u1072 \u1088 \u1090 \
load();\
render();\
}