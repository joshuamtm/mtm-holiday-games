import { useEffect, useRef, useState } from 'react';

// Simplified world map SVG paths for major countries
// Uses ISO 3166-1 alpha-2 codes as IDs
const countryPaths = {
  // North America
  us: "M 168 120 L 168 95 L 175 90 L 190 85 L 210 90 L 230 95 L 250 100 L 265 110 L 270 125 L 265 140 L 250 145 L 235 150 L 220 145 L 200 140 L 180 135 L 168 120 Z",
  ca: "M 165 50 L 190 45 L 220 50 L 250 55 L 275 65 L 280 85 L 270 95 L 250 95 L 230 90 L 200 85 L 175 85 L 165 75 L 165 50 Z",
  mx: "M 175 145 L 195 145 L 210 155 L 215 170 L 205 185 L 190 190 L 175 180 L 165 165 L 170 150 L 175 145 Z",
  cu: "M 230 165 L 250 162 L 260 168 L 255 175 L 240 175 L 230 170 L 230 165 Z",
  jm: "M 248 178 L 258 176 L 260 182 L 252 184 L 248 178 Z",
  ht: "M 260 172 L 270 170 L 272 178 L 265 180 L 260 172 Z",
  do: "M 272 172 L 282 170 L 285 178 L 278 180 L 272 172 Z",
  tt: "M 295 195 L 302 193 L 305 198 L 298 200 L 295 195 Z",
  gt: "M 195 180 L 205 178 L 210 185 L 205 192 L 195 190 L 195 180 Z",
  hn: "M 210 182 L 222 180 L 225 188 L 218 192 L 210 188 L 210 182 Z",
  sv: "M 200 190 L 210 188 L 212 195 L 205 198 L 200 190 Z",
  ni: "M 212 192 L 225 190 L 228 200 L 220 205 L 212 198 L 212 192 Z",
  cr: "M 218 202 L 228 200 L 232 210 L 225 215 L 218 208 L 218 202 Z",
  pa: "M 232 210 L 248 208 L 252 218 L 242 222 L 232 218 L 232 210 Z",

  // South America
  br: "M 290 220 L 330 210 L 350 230 L 355 270 L 340 310 L 310 330 L 280 310 L 270 270 L 275 240 L 290 220 Z",
  ar: "M 275 310 L 295 305 L 310 330 L 305 380 L 285 400 L 270 390 L 265 350 L 270 320 L 275 310 Z",
  cl: "M 258 310 L 270 305 L 275 350 L 270 400 L 260 420 L 250 400 L 255 350 L 258 310 Z",
  co: "M 248 200 L 275 195 L 285 215 L 275 240 L 255 235 L 245 215 L 248 200 Z",
  pe: "M 245 235 L 270 230 L 275 265 L 260 290 L 240 280 L 240 250 L 245 235 Z",
  ve: "M 275 195 L 305 190 L 315 205 L 300 220 L 280 215 L 275 195 Z",
  ec: "M 235 230 L 250 228 L 255 250 L 245 260 L 232 250 L 235 230 Z",
  bo: "M 275 270 L 295 265 L 300 295 L 285 310 L 268 300 L 270 275 L 275 270 Z",
  py: "M 295 305 L 315 300 L 320 325 L 305 335 L 290 325 L 295 305 Z",
  uy: "M 310 335 L 325 330 L 330 350 L 318 360 L 308 350 L 310 335 Z",
  gy: "M 295 205 L 310 202 L 315 218 L 305 225 L 292 218 L 295 205 Z",
  sr: "M 310 202 L 322 200 L 328 215 L 318 222 L 308 215 L 310 202 Z",

  // Europe
  gb: "M 430 85 L 440 80 L 448 90 L 445 105 L 435 108 L 428 98 L 430 85 Z",
  ie: "M 418 88 L 428 85 L 430 98 L 422 102 L 415 95 L 418 88 Z",
  fr: "M 435 105 L 455 100 L 465 115 L 455 130 L 438 125 L 432 115 L 435 105 Z",
  es: "M 420 120 L 440 115 L 445 135 L 432 145 L 418 140 L 415 128 L 420 120 Z",
  pt: "M 410 125 L 420 122 L 422 140 L 415 148 L 408 140 L 410 125 Z",
  de: "M 455 95 L 475 90 L 482 105 L 475 120 L 458 118 L 452 105 L 455 95 Z",
  it: "M 465 115 L 480 112 L 485 140 L 475 155 L 462 145 L 460 125 L 465 115 Z",
  nl: "M 448 88 L 458 85 L 462 95 L 455 100 L 448 95 L 448 88 Z",
  be: "M 445 98 L 455 95 L 458 105 L 452 110 L 445 105 L 445 98 Z",
  ch: "M 455 112 L 468 110 L 472 120 L 465 125 L 455 122 L 455 112 Z",
  at: "M 472 108 L 490 105 L 495 118 L 485 125 L 470 120 L 472 108 Z",
  pl: "M 485 88 L 510 85 L 518 100 L 510 115 L 488 112 L 482 98 L 485 88 Z",
  cz: "M 475 100 L 492 98 L 495 110 L 485 115 L 472 110 L 475 100 Z",
  sk: "M 495 105 L 512 102 L 515 115 L 505 120 L 492 115 L 495 105 Z",
  hu: "M 490 115 L 510 112 L 515 128 L 502 135 L 488 128 L 490 115 Z",
  ro: "M 510 115 L 535 112 L 540 130 L 525 140 L 508 132 L 510 115 Z",
  bg: "M 520 132 L 540 128 L 545 145 L 530 152 L 518 145 L 520 132 Z",
  gr: "M 505 145 L 525 140 L 535 160 L 520 170 L 502 162 L 505 145 Z",
  rs: "M 502 128 L 520 125 L 525 142 L 512 150 L 500 142 L 502 128 Z",
  hr: "M 485 125 L 502 122 L 508 138 L 495 145 L 482 138 L 485 125 Z",
  ba: "M 492 135 L 505 132 L 510 145 L 500 152 L 490 145 L 492 135 Z",
  si: "M 478 122 L 490 120 L 495 132 L 485 138 L 475 132 L 478 122 Z",
  al: "M 505 150 L 518 147 L 522 162 L 512 168 L 502 162 L 505 150 Z",
  mk: "M 515 148 L 528 145 L 532 160 L 522 165 L 512 160 L 515 148 Z",
  me: "M 498 145 L 510 142 L 515 155 L 505 162 L 495 155 L 498 145 Z",
  se: "M 475 50 L 490 45 L 500 70 L 495 90 L 480 88 L 472 70 L 475 50 Z",
  no: "M 455 45 L 475 40 L 485 65 L 478 85 L 462 80 L 455 60 L 455 45 Z",
  dk: "M 462 82 L 478 78 L 482 92 L 472 98 L 460 92 L 462 82 Z",
  fi: "M 505 45 L 525 40 L 535 65 L 528 85 L 510 82 L 502 60 L 505 45 Z",
  ee: "M 520 78 L 535 75 L 540 88 L 530 92 L 518 88 L 520 78 Z",
  lv: "M 518 88 L 535 85 L 540 100 L 528 105 L 515 100 L 518 88 Z",
  lt: "M 515 100 L 532 97 L 538 112 L 525 118 L 512 112 L 515 100 Z",
  by: "M 530 92 L 555 88 L 562 108 L 550 118 L 528 112 L 530 92 Z",
  ua: "M 530 110 L 570 105 L 580 130 L 560 145 L 528 138 L 525 120 L 530 110 Z",
  md: "M 535 125 L 548 122 L 552 138 L 542 145 L 532 138 L 535 125 Z",
  ru: "M 550 40 L 650 30 L 700 50 L 720 100 L 700 140 L 650 130 L 600 120 L 560 100 L 545 70 L 550 40 Z",
  is: "M 395 50 L 420 45 L 428 60 L 420 72 L 400 70 L 392 58 L 395 50 Z",
  lu: "M 448 105 L 455 103 L 458 110 L 452 113 L 448 108 L 448 105 Z",
  mt: "M 478 155 L 485 153 L 488 160 L 482 163 L 478 158 L 478 155 Z",
  cy: "M 545 155 L 555 152 L 560 162 L 552 168 L 542 162 L 545 155 Z",

  // Africa
  eg: "M 520 165 L 550 160 L 560 185 L 545 200 L 518 195 L 515 175 L 520 165 Z",
  ly: "M 475 165 L 520 160 L 530 190 L 515 210 L 480 205 L 470 185 L 475 165 Z",
  tn: "M 465 155 L 480 152 L 485 172 L 475 180 L 462 175 L 465 155 Z",
  dz: "M 430 160 L 475 155 L 485 195 L 465 220 L 430 215 L 420 190 L 430 160 Z",
  ma: "M 405 160 L 435 155 L 440 185 L 425 200 L 400 195 L 398 175 L 405 160 Z",
  sd: "M 530 200 L 565 195 L 575 235 L 555 260 L 525 255 L 520 220 L 530 200 Z",
  et: "M 555 240 L 585 235 L 595 265 L 575 285 L 548 275 L 550 250 L 555 240 Z",
  ke: "M 565 270 L 590 265 L 600 300 L 580 320 L 558 310 L 560 285 L 565 270 Z",
  tz: "M 555 310 L 585 305 L 595 345 L 570 365 L 548 355 L 550 325 L 555 310 Z",
  ug: "M 548 280 L 568 275 L 575 305 L 560 320 L 545 312 L 545 290 L 548 280 Z",
  rw: "M 545 318 L 560 315 L 565 330 L 555 338 L 542 332 L 545 318 Z",
  ng: "M 455 230 L 490 225 L 502 260 L 485 285 L 455 280 L 448 255 L 455 230 Z",
  gh: "M 438 250 L 458 245 L 465 275 L 450 290 L 435 282 L 435 260 L 438 250 Z",
  ci: "M 418 255 L 442 250 L 450 285 L 432 300 L 415 292 L 415 270 L 418 255 Z",
  sn: "M 395 225 L 420 220 L 428 245 L 415 260 L 392 252 L 392 235 L 395 225 Z",
  cm: "M 480 265 L 510 260 L 520 300 L 500 325 L 475 315 L 475 285 L 480 265 Z",
  za: "M 520 380 L 560 375 L 575 420 L 555 450 L 520 445 L 510 420 L 520 380 Z",
  ao: "M 485 330 L 525 325 L 535 375 L 510 400 L 480 395 L 478 360 L 485 330 Z",
  mz: "M 560 365 L 590 360 L 600 410 L 575 435 L 555 425 L 555 385 L 560 365 Z",
  zw: "M 540 375 L 570 370 L 578 405 L 560 420 L 538 412 L 538 390 L 540 375 Z",
  zm: "M 525 345 L 565 340 L 575 380 L 550 400 L 520 395 L 520 365 L 525 345 Z",
  bw: "M 525 400 L 555 395 L 565 430 L 545 450 L 522 442 L 522 415 L 525 400 Z",
  na: "M 495 395 L 530 390 L 540 440 L 515 465 L 490 458 L 490 420 L 495 395 Z",
  mg: "M 595 375 L 620 370 L 630 420 L 610 450 L 590 440 L 590 400 L 595 375 Z",
  mu: "M 635 390 L 645 388 L 648 400 L 640 405 L 632 398 L 635 390 Z",
  ls: "M 545 435 L 560 432 L 565 448 L 555 455 L 542 448 L 545 435 Z",
  sz: "M 568 420 L 580 417 L 584 432 L 575 438 L 565 432 L 568 420 Z",

  // Asia
  cn: "M 680 130 L 750 120 L 780 160 L 770 210 L 720 220 L 680 200 L 665 165 L 680 130 Z",
  jp: "M 795 140 L 815 135 L 825 170 L 815 195 L 795 190 L 788 165 L 795 140 Z",
  kr: "M 775 160 L 792 155 L 798 180 L 788 195 L 772 188 L 772 170 L 775 160 Z",
  in: "M 620 180 L 670 170 L 690 220 L 670 280 L 630 275 L 610 230 L 620 180 Z",
  pk: "M 595 165 L 630 160 L 640 200 L 620 225 L 590 218 L 588 190 L 595 165 Z",
  bd: "M 665 210 L 685 205 L 692 235 L 678 250 L 662 242 L 662 220 L 665 210 Z",
  np: "M 645 195 L 670 190 L 678 215 L 665 228 L 645 222 L 642 208 L 645 195 Z",
  bt: "M 670 200 L 685 197 L 690 215 L 680 225 L 668 218 L 670 200 Z",
  lk: "M 652 275 L 668 270 L 675 300 L 662 315 L 648 305 L 650 285 L 652 275 Z",
  mm: "M 680 210 L 700 205 L 710 250 L 695 280 L 675 272 L 675 235 L 680 210 Z",
  th: "M 695 235 L 720 230 L 730 280 L 710 310 L 690 302 L 690 260 L 695 235 Z",
  vn: "M 720 225 L 740 220 L 752 275 L 738 305 L 718 298 L 715 255 L 720 225 Z",
  kh: "M 710 275 L 730 270 L 738 300 L 722 315 L 708 308 L 708 290 L 710 275 Z",
  la: "M 705 245 L 722 240 L 730 275 L 718 295 L 702 288 L 702 265 L 705 245 Z",
  my: "M 700 300 L 730 295 L 742 330 L 722 350 L 698 342 L 698 318 L 700 300 Z",
  sg: "M 715 335 L 728 332 L 732 345 L 722 352 L 712 345 L 715 335 Z",
  id: "M 720 340 L 800 330 L 820 380 L 780 410 L 720 400 L 710 370 L 720 340 Z",
  ph: "M 765 260 L 785 255 L 795 300 L 778 320 L 762 312 L 762 280 L 765 260 Z",
  bn: "M 745 310 L 758 307 L 762 325 L 752 335 L 742 328 L 745 310 Z",
  tl: "M 770 375 L 785 372 L 790 395 L 778 405 L 768 398 L 770 375 Z",
  mn: "M 680 100 L 740 95 L 755 125 L 740 145 L 690 140 L 678 120 L 680 100 Z",
  kz: "M 560 95 L 640 85 L 665 125 L 645 155 L 580 150 L 555 125 L 560 95 Z",
  uz: "M 580 135 L 620 130 L 632 160 L 615 180 L 578 175 L 575 155 L 580 135 Z",
  tm: "M 568 148 L 600 143 L 612 175 L 595 195 L 565 190 L 562 168 L 568 148 Z",
  kg: "M 620 145 L 648 140 L 658 165 L 642 182 L 618 178 L 618 160 L 620 145 Z",
  tj: "M 615 165 L 642 160 L 652 190 L 635 208 L 612 202 L 612 180 L 615 165 Z",
  af: "M 605 175 L 640 170 L 655 210 L 635 235 L 600 228 L 598 200 L 605 175 Z",
  ir: "M 555 165 L 605 158 L 620 210 L 595 245 L 548 238 L 545 200 L 555 165 Z",
  iq: "M 535 165 L 565 160 L 575 200 L 555 225 L 530 218 L 530 190 L 535 165 Z",
  sa: "M 540 210 L 590 200 L 610 260 L 580 295 L 535 285 L 530 245 L 540 210 Z",
  ye: "M 565 280 L 600 275 L 612 310 L 592 330 L 562 322 L 560 300 L 565 280 Z",
  om: "M 600 260 L 625 255 L 635 295 L 618 320 L 595 312 L 595 280 L 600 260 Z",
  ae: "M 595 255 L 618 250 L 625 280 L 610 295 L 590 288 L 592 268 L 595 255 Z",
  qa: "M 588 262 L 600 260 L 605 280 L 595 290 L 585 282 L 588 262 Z",
  bh: "M 585 255 L 595 253 L 598 268 L 590 275 L 582 268 L 585 255 Z",
  kw: "M 555 225 L 570 222 L 575 245 L 565 255 L 552 248 L 555 225 Z",
  jo: "M 528 195 L 548 190 L 555 220 L 540 235 L 522 228 L 525 208 L 528 195 Z",
  lb: "M 535 180 L 548 177 L 552 198 L 542 208 L 532 200 L 535 180 Z",
  sy: "M 535 165 L 560 160 L 568 190 L 552 208 L 530 202 L 530 180 L 535 165 Z",
  il: "M 530 192 L 542 190 L 548 215 L 538 228 L 528 220 L 528 205 L 530 192 Z",
  tr: "M 495 145 L 555 138 L 568 175 L 545 198 L 492 192 L 488 168 L 495 145 Z",
  ge: "M 555 145 L 578 140 L 585 162 L 572 175 L 552 170 L 552 155 L 555 145 Z",
  am: "M 565 162 L 582 158 L 588 180 L 575 192 L 562 185 L 562 172 L 565 162 Z",
  az: "M 575 155 L 598 150 L 608 178 L 592 195 L 572 188 L 572 168 L 575 155 Z",
  mv: "M 638 310 L 648 307 L 652 325 L 642 332 L 635 325 L 638 310 Z",

  // Oceania
  au: "M 740 380 L 820 365 L 850 420 L 830 480 L 760 490 L 720 450 L 730 410 L 740 380 Z",
  nz: "M 870 460 L 895 455 L 905 495 L 885 520 L 865 512 L 865 480 L 870 460 Z",
  pg: "M 820 335 L 855 328 L 868 365 L 848 390 L 818 382 L 815 355 L 820 335 Z",
  fj: "M 905 400 L 920 397 L 925 420 L 912 432 L 902 425 L 905 400 Z",
};

// Continent regions for coloring
const continentColors = {
  "North America": "#4ade80", // green
  "South America": "#facc15", // yellow
  "Europe": "#60a5fa", // blue
  "Africa": "#fb923c", // orange
  "Asia": "#f472b6", // pink
  "Oceania": "#a78bfa", // purple
};

// Map country IDs to continents
const countryToContinent = {
  // North America
  us: "North America", ca: "North America", mx: "North America", cu: "North America",
  jm: "North America", ht: "North America", do: "North America", tt: "North America",
  gt: "North America", hn: "North America", sv: "North America", ni: "North America",
  cr: "North America", pa: "North America",
  // South America
  br: "South America", ar: "South America", cl: "South America", co: "South America",
  pe: "South America", ve: "South America", ec: "South America", bo: "South America",
  py: "South America", uy: "South America", gy: "South America", sr: "South America",
  // Europe
  gb: "Europe", ie: "Europe", fr: "Europe", es: "Europe", pt: "Europe", de: "Europe",
  it: "Europe", nl: "Europe", be: "Europe", ch: "Europe", at: "Europe", pl: "Europe",
  cz: "Europe", sk: "Europe", hu: "Europe", ro: "Europe", bg: "Europe", gr: "Europe",
  rs: "Europe", hr: "Europe", ba: "Europe", si: "Europe", al: "Europe", mk: "Europe",
  me: "Europe", se: "Europe", no: "Europe", dk: "Europe", fi: "Europe", ee: "Europe",
  lv: "Europe", lt: "Europe", by: "Europe", ua: "Europe", md: "Europe", ru: "Europe",
  is: "Europe", lu: "Europe", mt: "Europe", cy: "Europe",
  // Africa
  eg: "Africa", ly: "Africa", tn: "Africa", dz: "Africa", ma: "Africa", sd: "Africa",
  et: "Africa", ke: "Africa", tz: "Africa", ug: "Africa", rw: "Africa", ng: "Africa",
  gh: "Africa", ci: "Africa", sn: "Africa", cm: "Africa", za: "Africa", ao: "Africa",
  mz: "Africa", zw: "Africa", zm: "Africa", bw: "Africa", na: "Africa", mg: "Africa",
  mu: "Africa", ls: "Africa", sz: "Africa",
  // Asia
  cn: "Asia", jp: "Asia", kr: "Asia", in: "Asia", pk: "Asia", bd: "Asia", np: "Asia",
  bt: "Asia", lk: "Asia", mm: "Asia", th: "Asia", vn: "Asia", kh: "Asia", la: "Asia",
  my: "Asia", sg: "Asia", id: "Asia", ph: "Asia", bn: "Asia", tl: "Asia", mn: "Asia",
  kz: "Asia", uz: "Asia", tm: "Asia", kg: "Asia", tj: "Asia", af: "Asia", ir: "Asia",
  iq: "Asia", sa: "Asia", ye: "Asia", om: "Asia", ae: "Asia", qa: "Asia", bh: "Asia",
  kw: "Asia", jo: "Asia", lb: "Asia", sy: "Asia", il: "Asia", tr: "Asia", ge: "Asia",
  am: "Asia", az: "Asia", mv: "Asia",
  // Oceania
  au: "Oceania", nz: "Oceania", pg: "Oceania", fj: "Oceania",
};

export default function WorldMap({ highlightedCountry, showAllCountries = true }) {
  const svgRef = useRef(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const getCountryColor = (countryId) => {
    if (highlightedCountry === countryId) {
      return "#ef4444"; // Highlighted country in red
    }
    if (!showAllCountries) {
      return "#e5e7eb"; // Gray when not showing all
    }
    const continent = countryToContinent[countryId];
    return continentColors[continent] || "#9ca3af";
  };

  const getCountryOpacity = (countryId) => {
    if (highlightedCountry === countryId) {
      return 1;
    }
    return showAllCountries ? 0.7 : 0.3;
  };

  const getStrokeWidth = (countryId) => {
    if (highlightedCountry === countryId) {
      return 3;
    }
    return 1;
  };

  return (
    <div className="relative w-full bg-blue-100 rounded-xl overflow-hidden shadow-lg">
      {/* Ocean background */}
      <svg
        ref={svgRef}
        viewBox="0 0 930 530"
        className="w-full h-auto"
        style={{ backgroundColor: "#bfdbfe" }}
      >
        {/* Graticule / grid lines for visual reference */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Equator line */}
        <line
          x1="0"
          y1="265"
          x2="930"
          y2="265"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="5,5"
          opacity="0.5"
        />

        {/* Country paths */}
        {Object.entries(countryPaths).map(([id, path]) => (
          <path
            key={id}
            d={path}
            fill={getCountryColor(id)}
            stroke={highlightedCountry === id ? "#b91c1c" : "#374151"}
            strokeWidth={getStrokeWidth(id)}
            opacity={getCountryOpacity(id)}
            className={`transition-all duration-300 ${
              highlightedCountry === id ? "animate-pulse" : ""
            }`}
            onMouseEnter={() => setHoveredCountry(id)}
            onMouseLeave={() => setHoveredCountry(null)}
          />
        ))}

        {/* Highlight effect for selected country */}
        {highlightedCountry && countryPaths[highlightedCountry] && (
          <>
            {/* Outer glow */}
            <path
              d={countryPaths[highlightedCountry]}
              fill="none"
              stroke="#fca5a5"
              strokeWidth="8"
              opacity="0.5"
              className="animate-pulse"
            />
            {/* Inner glow */}
            <path
              d={countryPaths[highlightedCountry]}
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              opacity="0.8"
            />
          </>
        )}

        {/* Question mark for unknown country */}
        {highlightedCountry && countryPaths[highlightedCountry] && (
          <g>
            {/* Calculate center of country (approximate) */}
            <text
              x="465"
              y="530"
              textAnchor="middle"
              fill="#1e3a5f"
              fontSize="14"
              fontWeight="bold"
            >
              ? Which country is highlighted in red?
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs shadow-md">
        <div className="font-semibold mb-1 text-gray-700">Continents:</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {Object.entries(continentColors).map(([continent, color]) => (
            <div key={continent} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-600">{continent}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Highlighted country indicator */}
      {highlightedCountry && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
          Find this country!
        </div>
      )}
    </div>
  );
}

// Export country paths for validation
export { countryPaths, countryToContinent, continentColors };
