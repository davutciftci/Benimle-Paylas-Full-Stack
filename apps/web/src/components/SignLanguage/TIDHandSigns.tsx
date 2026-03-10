import React, { useState, useEffect } from 'react';

// TİD'de tek elle yapılan harfler
const SINGLE_HAND_LETTERS = new Set(['C', 'I', 'L', 'O', 'P', 'U', 'V']);

// ─── SVG El Şekilleri ────────────────────────────────────────────────────────

// Sağ el — başparmak yukarı (A)
const HandA = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <g>
      {/* Avuç */}
      <rect x="20" y="45" width="40" height="42" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
      {/* Başparmak yukarı */}
      <rect x="14" y="20" width="14" height="32" rx="7" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
      {/* Kapalı parmaklar */}
      <rect x="22" y="38" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
      <rect x="33" y="38" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
      <rect x="44" y="38" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
      {/* Bilek */}
      <rect x="26" y="83" width="28" height="14" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    </g>
  </svg>
);

// B — 4 parmak dik, başparmak içe
const HandB = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="50" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="22" y="15" width="9" height="40" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="33" y="12" width="9" height="42" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="44" y="14" width="9" height="40" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="55" y="18" width="8" height="36" rx="4" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Başparmak içe kıvrık */}
    <path d="M20 62 Q14 58 16 52 Q18 46 24 50" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// C — tek el, C şekli
const HandC = () => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 28 Q30 15 18 40 Q10 58 20 75 Q32 90 60 82"
      stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M58 28 Q28 18 17 42 Q9 60 21 76 Q33 91 58 83"
      stroke="#FDDCB5" strokeWidth="8" fill="none" strokeLinecap="round"/>
    <path d="M60 28 Q30 15 18 40 Q10 58 20 75 Q32 90 60 82"
      stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Başparmak */}
    <path d="M60 28 Q68 32 66 40" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M60 82 Q68 76 66 68" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M60 28 Q68 32 66 40" stroke="#FDDCB5" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <path d="M60 82 Q68 76 66 68" stroke="#FDDCB5" strokeWidth="5" strokeLinecap="round" fill="none"/>
  </svg>
);

// D
const HandD = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="50" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* İşaret parmağı dik */}
    <rect x="32" y="12" width="10" height="42" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Diğerleri kıvrık */}
    <rect x="44" y="38" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="55" y="40" width="8" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    {/* Başparmak O yapar işaret parmağıyla */}
    <path d="M20 60 Q12 54 16 46 Q22 36 32 42" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// E — yumruk, parmaklar kıvrık
const HandE = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="18" y="42" width="44" height="44" rx="10" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Kıvrık parmak sırtları */}
    <rect x="22" y="36" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="33" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="35" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="55" y="38" width="8" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    {/* Başparmak */}
    <rect x="10" y="48" width="14" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// F
const HandF = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="48" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Orta, yüzük, serçe dik */}
    <rect x="33" y="14" width="9" height="38" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="44" y="16" width="9" height="36" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="55" y="20" width="8" height="32" rx="4" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* İşaret + başparmak O */}
    <path d="M22 55 Q16 50 20 43 Q26 36 34 42" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// G
const HandG = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="22" y="45" width="40" height="40" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* İşaret parmağı yatay sola uzanıyor */}
    <rect x="5" y="40" width="40" height="12" rx="6" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Diğerleri kıvrık */}
    <rect x="34" y="38" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="45" y="40" width="9" height="10" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    {/* Başparmak yukarı */}
    <rect x="24" y="28" width="12" height="20" rx="6" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="28" y="81" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// H
const HandH = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="22" y="45" width="40" height="40" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* İki parmak yatay */}
    <rect x="5" y="36" width="40" height="11" rx="5.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="5" y="49" width="40" height="11" rx="5.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="45" y="40" width="9" height="10" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="56" y="42" width="8" height="9" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="28" y="81" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// I — tek el, serçe dik
const HandI = () => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="48" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Serçe dik */}
    <rect x="55" y="16" width="9" height="36" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Diğerleri kıvrık */}
    <rect x="22" y="40" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="37" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="39" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="10" y="52" width="14" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// J
const HandJ = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="48" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="54" y="16" width="9" height="36" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="22" y="40" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="37" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="39" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    {/* J hareketi oku */}
    <path d="M58 16 Q68 10 72 20 Q74 32 66 38" stroke="#1f2937" strokeWidth="2"
      fill="none" strokeLinecap="round" strokeDasharray="3 2"/>
    <polygon points="62,37 70,40 66,32" fill="#1f2937"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// K
const HandK = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="52" width="40" height="36" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* İşaret parmağı dik */}
    <rect x="32" y="14" width="10" height="42" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Orta parmak çapraz */}
    <rect x="44" y="22" width="9" height="34" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"
      transform="rotate(15 48 39)"/>
    {/* Başparmak aralarında */}
    <path d="M22 62 Q14 56 18 48 Q24 38 34 44" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// L — tek el, L şekli
const HandL = () => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="48" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* İşaret parmağı dik */}
    <rect x="32" y="10" width="10" height="42" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Başparmak yatay */}
    <rect x="10" y="46" width="28" height="12" rx="6" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Diğerleri kıvrık */}
    <rect x="44" y="40" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="55" y="42" width="8" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// M
const HandM = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="18" y="44" width="44" height="42" rx="9" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* 3 parmak başparmak üzerinde */}
    <rect x="22" y="36" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="33" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="35" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="55" y="40" width="8" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    {/* Başparmak alttan */}
    <rect x="8" y="54" width="18" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// N
const HandN = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="18" y="44" width="44" height="42" rx="9" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* 2 parmak başparmak üzerinde */}
    <rect x="26" y="34" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="37" y="32" width="9" height="17" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="48" y="38" width="9" height="13" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="57" y="42" width="7" height="10" rx="3" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="8" y="54" width="18" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// O — tek el, O şekli
const HandO = () => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="52" width="40" height="36" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* O şekli — parmaklar ve başparmak birleşiyor */}
    <ellipse cx="40" cy="38" rx="20" ry="22" fill="none" stroke="#1f2937" strokeWidth="3"/>
    <ellipse cx="40" cy="38" rx="20" ry="22" fill="none" stroke="#FDDCB5" strokeWidth="9"/>
    <ellipse cx="40" cy="38" rx="20" ry="22" fill="none" stroke="#1f2937" strokeWidth="2"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// P — tek el
const HandP = () => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="45" width="40" height="40" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* İşaret parmağı aşağı */}
    <rect x="30" y="55" width="10" height="30" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Orta parmak çapraz */}
    <rect x="43" y="58" width="9" height="26" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"
      transform="rotate(10 47 71)"/>
    {/* Başparmak */}
    <path d="M22 52 Q14 46 18 38 Q24 28 34 36" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="81" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// R
const HandR = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="50" width="40" height="37" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* İki parmak çapraz */}
    <rect x="30" y="12" width="10" height="42" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="40" y="14" width="10" height="40" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"
      transform="rotate(-8 45 34)"/>
    <rect x="52" y="40" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="10" y="56" width="14" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="83" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// S — yumruk başparmak üstte
const HandS = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="18" y="42" width="44" height="44" rx="10" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="22" y="36" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="33" width="9" height="13" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="35" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="55" y="38" width="8" height="11" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    {/* Başparmak üstte */}
    <rect x="14" y="42" width="22" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// T
const HandT = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="18" y="44" width="44" height="42" rx="9" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="22" y="36" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="33" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="35" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="55" y="38" width="8" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    {/* Başparmak işaret parmağı arasından */}
    <rect x="14" y="48" width="16" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// U — tek el, iki parmak birleşik dik
const HandU = () => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="52" width="40" height="36" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="29" y="12" width="10" height="44" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="41" y="12" width="10" height="44" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="53" y="40" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="10" y="56" width="14" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// V — tek el, makas
const HandV = () => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="52" width="40" height="36" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="25" y="12" width="10" height="44" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"
      transform="rotate(-8 30 34)"/>
    <rect x="43" y="12" width="10" height="44" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"
      transform="rotate(8 48 34)"/>
    <rect x="54" y="40" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="10" y="56" width="14" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// Y
const HandY = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="48" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Başparmak + serçe açık */}
    <rect x="8" y="44" width="18" height="12" rx="6" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="54" y="14" width="9" height="38" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Diğerleri kıvrık */}
    <rect x="24" y="40" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="35" y="37" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="46" y="39" width="7" height="14" rx="3.5" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// Z
const HandZ = ({ mirror = false }: { mirror?: boolean }) => (
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="50" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="30" y="12" width="10" height="42" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="42" y="38" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="53" y="40" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="10" y="56" width="14" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    {/* Z hareketi oku */}
    <path d="M34 12 L44 12 L34 24 L44 24" stroke="#1f2937" strokeWidth="2"
      fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// Türkçe özel harfler
const HandCedilla = ({ mirror = false }: { mirror?: boolean }) => ( // Ç
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <path d="M62 25 Q32 12 20 37 Q12 55 22 72 Q34 87 62 79"
      stroke="#FDDCB5" strokeWidth="10" fill="none" strokeLinecap="round"/>
    <path d="M62 25 Q32 12 20 37 Q12 55 22 72 Q34 87 62 79"
      stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M62 25 Q70 29 68 37" stroke="#FDDCB5" strokeWidth="9" strokeLinecap="round" fill="none"/>
    <path d="M62 79 Q70 73 68 65" stroke="#FDDCB5" strokeWidth="9" strokeLinecap="round" fill="none"/>
    <path d="M62 25 Q70 29 68 37" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M62 79 Q70 73 68 65" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Cedilla */}
    <path d="M40 87 Q38 94 42 96 Q46 98 44 92" stroke="#1f2937" strokeWidth="2" fill="none"/>
  </svg>
);

const HandGBreve = ({ mirror = false }: { mirror?: boolean }) => ( // Ğ — G + hareket
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="22" y="45" width="40" height="40" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="5" y="40" width="40" height="12" rx="6" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="34" y="38" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="45" y="40" width="9" height="10" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="24" y="28" width="12" height="20" rx="6" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Hareket oku */}
    <path d="M8 36 Q20 28 32 36" stroke="#1f2937" strokeWidth="1.5" fill="none"
      strokeLinecap="round" strokeDasharray="3 2"/>
    <rect x="28" y="81" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

const HandIDotless = ({ mirror = false }: { mirror?: boolean }) => ( // I (ı)
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="48" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="55" y="16" width="9" height="36" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="22" y="40" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="37" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="39" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    {/* Başparmak sıkıştırılmış */}
    <rect x="14" y="54" width="12" height="9" rx="4" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

const HandIDot = () => ( // İ
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="48" width="40" height="38" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="55" y="18" width="9" height="36" rx="4.5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* nokta */}
    <circle cx="59" cy="12" r="4" fill="#1f2937"/>
    <rect x="22" y="40" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="37" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="39" width="9" height="14" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="10" y="52" width="14" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

const HandOUmlaut = ({ mirror = false }: { mirror?: boolean }) => ( // Ö
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="52" width="40" height="36" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <ellipse cx="40" cy="36" rx="20" ry="20" fill="none" stroke="#FDDCB5" strokeWidth="10"/>
    <ellipse cx="40" cy="36" rx="20" ry="20" fill="none" stroke="#1f2937" strokeWidth="2.5"/>
    <circle cx="32" cy="18" r="3" fill="#1f2937"/>
    <circle cx="48" cy="18" r="3" fill="#1f2937"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

const HandSCedilla = ({ mirror = false }: { mirror?: boolean }) => ( // Ş
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="18" y="42" width="44" height="44" rx="10" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="22" y="36" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="33" y="33" width="9" height="13" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="44" y="35" width="9" height="12" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="55" y="38" width="8" height="11" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="14" y="42" width="22" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    {/* Cedilla */}
    <path d="M40 86 Q38 93 42 95 Q46 97 44 91" stroke="#1f2937" strokeWidth="2" fill="none"/>
    <rect x="26" y="82" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

const HandUUmlaut = ({ mirror = false }: { mirror?: boolean }) => ( // Ü
  <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
    <rect x="20" y="52" width="40" height="36" rx="8" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="29" y="12" width="10" height="44" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <rect x="41" y="12" width="10" height="44" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
    <circle cx="29" cy="8" r="3" fill="#1f2937"/>
    <circle cx="51" cy="8" r="3" fill="#1f2937"/>
    <rect x="53" y="40" width="9" height="16" rx="4" fill="#F5C896" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="10" y="56" width="14" height="10" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="1.5"/>
    <rect x="26" y="84" width="28" height="13" rx="5" fill="#FDDCB5" stroke="#1f2937" strokeWidth="2"/>
  </svg>
);

// ─── Harf → Component Map ────────────────────────────────────────────────────

const HAND_SIGNS: Record<string, React.FC<{ mirror?: boolean }>> = {
  'A': HandA, 'B': HandB, 'C': () => <HandC />, 'Ç': HandCedilla,
  'D': HandD, 'E': HandE, 'F': HandF, 'G': HandG, 'Ğ': HandGBreve,
  'H': HandH, 'I': () => <HandIDotless />, 'İ': () => <HandIDot />,
  'J': HandJ, 'K': HandK, 'L': () => <HandL />, 'M': HandM,
  'N': HandN, 'O': () => <HandO />, 'Ö': HandOUmlaut, 'P': () => <HandP />,
  'R': HandR, 'S': HandS, 'Ş': HandSCedilla, 'T': HandT,
  'U': () => <HandU />, 'Ü': HandUUmlaut, 'V': () => <HandV />,
  'Y': HandY, 'Z': HandZ,
};

// ─── Ana Component ───────────────────────────────────────────────────────────

interface FingerspellViewProps {
  word: string;
}

export const FingerspellView: React.FC<FingerspellViewProps> = ({ word }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const letters = word.toUpperCase().split('').filter(l => HAND_SIGNS[l] || l === ' ');

  useEffect(() => {
    setActiveIndex(0);
    setIsPlaying(true);
  }, [word]);

  useEffect(() => {
    if (!isPlaying) return;
    if (activeIndex >= letters.length - 1) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setActiveIndex(prev => prev + 1), 700);
    return () => clearTimeout(timer);
  }, [activeIndex, isPlaying, letters.length]);

  const currentLetter = letters[activeIndex];
  const isSingleHand = SINGLE_HAND_LETTERS.has(currentLetter);
  const HandSign = HAND_SIGNS[currentLetter];

  return (
    <div>
      <p className="text-xs text-gray-400 mb-3 text-center">
        {isSingleHand ? '☝️ Tek el' : '🙌 İki el'}
      </p>

      {/* Büyük el gösterimi */}
      <div
        className="rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center gap-4"
        style={{ backgroundColor: '#1f2937', minHeight: '140px', padding: '12px' }}
      >
        {HandSign ? (
          isSingleHand ? (
            // Tek el — ortada büyük
            <div style={{ width: 90, height: 110, animation: 'popIn 0.35s ease-out' }}>
              <HandSign />
            </div>
          ) : (
            // İki el — yan yana
            <>
              <div style={{ width: 75, height: 95, animation: 'popIn 0.35s ease-out' }}>
                <HandSign mirror={true} />
              </div>
              <div
                className="text-white font-black"
                style={{ fontSize: 40, minWidth: 32, textAlign: 'center', opacity: 0.9 }}
              >
                {currentLetter}
              </div>
              <div style={{ width: 75, height: 95, animation: 'popIn 0.35s ease-out' }}>
                <HandSign />
              </div>
            </>
          )
        ) : (
          <span className="text-white text-5xl font-black">{currentLetter}</span>
        )}
      </div>

      {/* Harf sırası */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-3">
        {letters.map((letter, i) => (
          <button
            key={i}
            onClick={() => { setActiveIndex(i); setIsPlaying(false); }}
            className="w-8 h-8 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center"
            style={{
              backgroundColor: i === activeIndex ? '#1f2937' : i < activeIndex ? '#e5e7eb' : '#f6f7f8',
              color: i === activeIndex ? '#f6f7f8' : '#1f2937',
              transform: i === activeIndex ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Oynat/Tekrar */}
      <button
        onClick={() => { setActiveIndex(0); setIsPlaying(true); }}
        className="w-full py-2 rounded-lg text-sm font-medium transition-all"
        style={{ backgroundColor: '#f6f7f8', color: '#1f2937' }}
      >
        {isPlaying ? '⏸ Duraklatmak için harf seç' : '▶ Tekrar Oynat'}
      </button>

      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0.6) translateY(10px); opacity: 0; }
          60%  { transform: scale(1.08) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FingerspellView;
