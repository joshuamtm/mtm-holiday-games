import { memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';

// Use Natural Earth 110m world map (built into react-simple-maps)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Country centroids for arrow positioning (longitude, latitude)
const countryCentroids = {
  // North America
  us: [-98.5, 39.8], ca: [-106.3, 56.1], mx: [-102.5, 23.6], cu: [-79.5, 21.5],
  jm: [-77.3, 18.1], ht: [-72.3, 19.0], do: [-70.2, 18.9], tt: [-61.2, 10.5],
  gt: [-90.2, 15.8], hn: [-86.2, 14.6], sv: [-88.9, 13.8], ni: [-85.2, 12.9],
  cr: [-84.0, 9.9], pa: [-80.1, 8.5],
  // South America
  br: [-51.9, -14.2], ar: [-63.6, -38.4], cl: [-71.5, -35.7], co: [-74.3, 4.6],
  pe: [-75.0, -9.2], ve: [-66.6, 6.4], ec: [-78.2, -1.8], bo: [-64.0, -16.3],
  py: [-58.4, -23.4], uy: [-55.8, -32.5], gy: [-58.9, 4.9], sr: [-56.0, 4.0],
  // Europe
  gb: [-3.4, 55.4], ie: [-8.2, 53.4], fr: [2.2, 46.2], es: [-3.7, 40.5],
  pt: [-8.2, 39.4], de: [10.5, 51.2], it: [12.6, 42.5], nl: [5.3, 52.1],
  be: [4.5, 50.5], ch: [8.2, 46.8], at: [14.6, 47.5], pl: [19.1, 51.9],
  cz: [15.5, 49.8], sk: [19.7, 48.7], hu: [19.5, 47.2], ro: [25.0, 46.0],
  bg: [25.5, 42.7], gr: [21.8, 39.1], rs: [21.0, 44.0], hr: [15.2, 45.1],
  ba: [17.7, 43.9], si: [14.5, 46.2], al: [20.2, 41.2], mk: [21.7, 41.5],
  me: [19.4, 42.7], se: [18.6, 60.1], no: [8.5, 60.5], dk: [9.5, 56.3],
  fi: [26.0, 64.0], ee: [25.0, 58.6], lv: [24.6, 56.9], lt: [24.0, 55.2],
  by: [27.9, 53.7], ua: [31.2, 48.4], md: [28.5, 47.4], ru: [105.3, 61.5],
  is: [-19.0, 65.0], lu: [6.1, 49.8], mt: [14.4, 35.9], cy: [33.4, 35.1],
  // Africa
  eg: [30.8, 26.8], ly: [17.2, 26.3], tn: [9.5, 33.9], dz: [1.7, 28.0],
  ma: [-7.1, 31.8], sd: [30.2, 12.9], et: [40.5, 9.1], ke: [38.0, -0.0],
  tz: [34.9, -6.4], ug: [32.3, 1.4], rw: [29.9, -1.9], ng: [8.7, 9.1],
  gh: [-1.0, 7.9], ci: [-5.5, 7.5], sn: [-14.5, 14.5], cm: [12.4, 7.4],
  za: [22.9, -30.6], ao: [17.9, -11.2], mz: [35.5, -18.7], zw: [29.2, -19.0],
  zm: [27.8, -13.1], bw: [24.7, -22.3], na: [18.5, -22.0], mg: [46.9, -18.8],
  mu: [57.6, -20.3], ls: [28.2, -29.6], sz: [31.5, -26.5],
  ml: [-4.0, 17.6], bf: [-1.6, 12.2], ne: [8.1, 17.6], td: [18.7, 15.5],
  mr: [-10.9, 21.0], ss: [31.3, 6.9], er: [39.8, 15.2], dj: [42.6, 11.8],
  so: [46.2, 5.2], cg: [15.8, -0.2], cd: [21.8, -4.0], cf: [20.9, 6.6],
  ga: [11.6, -0.8], gq: [10.3, 1.7], gw: [-15.2, 12.0], gm: [-15.3, 13.4],
  sl: [-11.8, 8.5], lr: [-9.4, 6.4], tg: [1.2, 8.6], bj: [2.3, 9.3],
  mw: [34.3, -13.3], bi: [29.9, -3.4],
  // Asia
  cn: [104.2, 35.9], jp: [138.3, 36.2], kr: [128.0, 35.9], in: [78.9, 20.6],
  pk: [69.3, 30.4], bd: [90.4, 23.7], np: [84.1, 28.4], bt: [90.4, 27.5],
  lk: [80.8, 7.9], mm: [96.0, 19.8], th: [100.0, 15.9], vn: [108.3, 14.1],
  kh: [105.0, 12.6], la: [102.5, 19.9], my: [101.6, 4.2], sg: [103.8, 1.4],
  id: [113.9, -0.8], ph: [121.8, 12.9], bn: [114.7, 4.5], tl: [125.7, -8.9],
  mn: [103.8, 46.9], kz: [66.9, 48.0], uz: [64.6, 41.4], tm: [59.6, 38.9],
  kg: [74.8, 41.2], tj: [71.3, 38.9], af: [67.7, 33.9], ir: [53.7, 32.4],
  iq: [43.7, 33.2], sa: [45.1, 23.9], ye: [48.5, 15.6], om: [55.9, 21.5],
  ae: [53.8, 23.4], qa: [51.2, 25.4], bh: [50.6, 26.0], kw: [47.5, 29.3],
  jo: [36.2, 30.6], lb: [35.9, 33.9], sy: [38.0, 35.0], il: [35.0, 31.0],
  tr: [35.2, 38.9], ge: [43.4, 42.3], am: [45.0, 40.1], az: [47.6, 40.1],
  mv: [73.5, 3.2],
  // Oceania
  au: [133.8, -25.3], nz: [174.9, -40.9], pg: [143.9, -6.3], fj: [178.0, -17.7],
};

// Map ISO 3166-1 alpha-2 codes to ISO 3166-1 numeric codes (used by world-atlas)
const isoAlpha2ToNumeric = {
  // North America
  us: "840", ca: "124", mx: "484", cu: "192", jm: "388", ht: "332", do: "214",
  tt: "780", gt: "320", hn: "340", sv: "222", ni: "558", cr: "188", pa: "591",
  bs: "044", bz: "084", bb: "052", ag: "028", dm: "212", gd: "308", kn: "659",
  lc: "662", vc: "670",
  // South America
  br: "076", ar: "032", cl: "152", co: "170", pe: "604", ve: "862", ec: "218",
  bo: "068", py: "600", uy: "858", gy: "328", sr: "740", gf: "254",
  // Europe
  gb: "826", ie: "372", fr: "250", es: "724", pt: "620", de: "276", it: "380",
  nl: "528", be: "056", ch: "756", at: "040", pl: "616", cz: "203", sk: "703",
  hu: "348", ro: "642", bg: "100", gr: "300", rs: "688", hr: "191", ba: "070",
  si: "705", al: "008", mk: "807", me: "499", se: "752", no: "578", dk: "208",
  fi: "246", ee: "233", lv: "428", lt: "440", by: "112", ua: "804", md: "498",
  ru: "643", is: "352", lu: "442", mt: "470", cy: "196", xk: "383",
  // Africa - comprehensive list
  eg: "818", ly: "434", tn: "788", dz: "012", ma: "504", sd: "729", et: "231",
  ke: "404", tz: "834", ug: "800", rw: "646", ng: "566", gh: "288", ci: "384",
  sn: "686", cm: "120", za: "710", ao: "024", mz: "508", zw: "716", zm: "894",
  bw: "072", na: "516", mg: "450", mu: "480", ls: "426", sz: "748",
  // Additional African countries
  ml: "466", bf: "854", ne: "562", td: "148", mr: "478", ss: "728", er: "232",
  dj: "262", so: "706", cg: "178", cd: "180", cf: "140", ga: "266", gq: "226",
  gw: "624", gm: "270", sl: "694", lr: "430", tg: "768", bj: "204", mw: "454",
  bi: "108", cv: "132", st: "678", km: "174", sc: "690", eh: "732",
  // Asia
  cn: "156", jp: "392", kr: "410", in: "356", pk: "586", bd: "050", np: "524",
  bt: "064", lk: "144", mm: "104", th: "764", vn: "704", kh: "116", la: "418",
  my: "458", sg: "702", id: "360", ph: "608", bn: "096", tl: "626", mn: "496",
  kz: "398", uz: "860", tm: "795", kg: "417", tj: "762", af: "004", ir: "364",
  iq: "368", sa: "682", ye: "887", om: "512", ae: "784", qa: "634", bh: "048",
  kw: "414", jo: "400", lb: "422", sy: "760", il: "376", tr: "792", ge: "268",
  am: "051", az: "031", mv: "462", kp: "408", tw: "158", ps: "275",
  // Oceania
  au: "036", nz: "554", pg: "598", fj: "242", sb: "090", vu: "548", nc: "540",
};

// Map country ISO codes to continent names for coloring
const countryToContinent = {
  // North America & Caribbean
  us: "North America", ca: "North America", mx: "North America", cu: "North America",
  jm: "North America", ht: "North America", do: "North America", tt: "North America",
  gt: "North America", hn: "North America", sv: "North America", ni: "North America",
  cr: "North America", pa: "North America", bs: "North America", bz: "North America",
  bb: "North America", ag: "North America", dm: "North America", gd: "North America",
  kn: "North America", lc: "North America", vc: "North America",
  // South America
  br: "South America", ar: "South America", cl: "South America", co: "South America",
  pe: "South America", ve: "South America", ec: "South America", bo: "South America",
  py: "South America", uy: "South America", gy: "South America", sr: "South America",
  gf: "South America",
  // Europe
  gb: "Europe", ie: "Europe", fr: "Europe", es: "Europe", pt: "Europe", de: "Europe",
  it: "Europe", nl: "Europe", be: "Europe", ch: "Europe", at: "Europe", pl: "Europe",
  cz: "Europe", sk: "Europe", hu: "Europe", ro: "Europe", bg: "Europe", gr: "Europe",
  rs: "Europe", hr: "Europe", ba: "Europe", si: "Europe", al: "Europe", mk: "Europe",
  me: "Europe", se: "Europe", no: "Europe", dk: "Europe", fi: "Europe", ee: "Europe",
  lv: "Europe", lt: "Europe", by: "Europe", ua: "Europe", md: "Europe", ru: "Europe",
  is: "Europe", lu: "Europe", mt: "Europe", cy: "Europe", xk: "Europe",
  // Africa - comprehensive
  eg: "Africa", ly: "Africa", tn: "Africa", dz: "Africa", ma: "Africa", sd: "Africa",
  et: "Africa", ke: "Africa", tz: "Africa", ug: "Africa", rw: "Africa", ng: "Africa",
  gh: "Africa", ci: "Africa", sn: "Africa", cm: "Africa", za: "Africa", ao: "Africa",
  mz: "Africa", zw: "Africa", zm: "Africa", bw: "Africa", na: "Africa", mg: "Africa",
  mu: "Africa", ls: "Africa", sz: "Africa",
  // Additional African countries
  ml: "Africa", bf: "Africa", ne: "Africa", td: "Africa", mr: "Africa", ss: "Africa",
  er: "Africa", dj: "Africa", so: "Africa", cg: "Africa", cd: "Africa", cf: "Africa",
  ga: "Africa", gq: "Africa", gw: "Africa", gm: "Africa", sl: "Africa", lr: "Africa",
  tg: "Africa", bj: "Africa", mw: "Africa", bi: "Africa", cv: "Africa", st: "Africa",
  km: "Africa", sc: "Africa", eh: "Africa",
  // Asia
  cn: "Asia", jp: "Asia", kr: "Asia", in: "Asia", pk: "Asia", bd: "Asia", np: "Asia",
  bt: "Asia", lk: "Asia", mm: "Asia", th: "Asia", vn: "Asia", kh: "Asia", la: "Asia",
  my: "Asia", sg: "Asia", id: "Asia", ph: "Asia", bn: "Asia", tl: "Asia", mn: "Asia",
  kz: "Asia", uz: "Asia", tm: "Asia", kg: "Asia", tj: "Asia", af: "Asia", ir: "Asia",
  iq: "Asia", sa: "Asia", ye: "Asia", om: "Asia", ae: "Asia", qa: "Asia", bh: "Asia",
  kw: "Asia", jo: "Asia", lb: "Asia", sy: "Asia", il: "Asia", tr: "Asia", ge: "Asia",
  am: "Asia", az: "Asia", mv: "Asia", kp: "Asia", tw: "Asia", ps: "Asia",
  // Oceania
  au: "Oceania", nz: "Oceania", pg: "Oceania", fj: "Oceania", sb: "Oceania",
  vu: "Oceania", nc: "Oceania",
};

// Continent colors - softer, more map-like colors
const continentColors = {
  "North America": "#8FBC8F", // Dark sea green
  "South America": "#DEB887", // Burlywood
  "Europe": "#87CEEB", // Sky blue
  "Africa": "#F4A460", // Sandy brown
  "Asia": "#DDA0DD", // Plum
  "Oceania": "#98D8C8", // Aquamarine
  "default": "#E8E8E8", // Light gray for untracked countries
};

// Get numeric ID from geography properties
const getNumericId = (geo) => {
  // world-atlas uses ISO numeric codes
  return geo.id || geo.properties?.iso_n3;
};

// Find alpha-2 code from numeric ID
const numericToAlpha2 = Object.fromEntries(
  Object.entries(isoAlpha2ToNumeric).map(([alpha2, numeric]) => [numeric, alpha2])
);

function WorldMap({ highlightedCountry, showAllCountries = true }) {
  const highlightedNumeric = highlightedCountry ? isoAlpha2ToNumeric[highlightedCountry] : null;
  const highlightedCentroid = highlightedCountry ? countryCentroids[highlightedCountry] : null;

  const getCountryStyle = (geo) => {
    const numericId = getNumericId(geo);
    const isHighlighted = numericId === highlightedNumeric;
    const alpha2 = numericToAlpha2[numericId];
    const continent = alpha2 ? countryToContinent[alpha2] : null;

    if (isHighlighted) {
      return {
        default: {
          fill: "#EF4444",
          stroke: "#B91C1C",
          strokeWidth: 2,
          outline: "none",
          filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))",
        },
        hover: {
          fill: "#DC2626",
          stroke: "#991B1B",
          strokeWidth: 2,
          outline: "none",
        },
        pressed: {
          fill: "#DC2626",
          stroke: "#991B1B",
          strokeWidth: 2,
          outline: "none",
        },
      };
    }

    const baseColor = continent ? continentColors[continent] : continentColors.default;

    return {
      default: {
        fill: showAllCountries ? baseColor : "#E5E7EB",
        stroke: "#FFFFFF",
        strokeWidth: 0.5,
        outline: "none",
        opacity: showAllCountries ? 0.9 : 0.5,
      },
      hover: {
        fill: showAllCountries ? baseColor : "#D1D5DB",
        stroke: "#9CA3AF",
        strokeWidth: 0.75,
        outline: "none",
        opacity: 1,
      },
      pressed: {
        fill: showAllCountries ? baseColor : "#D1D5DB",
        stroke: "#9CA3AF",
        strokeWidth: 0.75,
        outline: "none",
      },
    };
  };

  return (
    <div className="relative w-full bg-blue-100 rounded-xl overflow-hidden shadow-lg">
      {/* Map container - larger size */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          center: [0, 25],
        }}
        style={{
          width: "100%",
          height: "auto",
          minHeight: "450px",
          backgroundColor: "#B3D9FF",
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const numericId = getNumericId(geo);
                const isHighlighted = numericId === highlightedNumeric;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={getCountryStyle(geo)}
                    className={isHighlighted ? 'animate-pulse' : ''}
                  />
                );
              })
            }
          </Geographies>

          {/* Arrow marker pointing to highlighted country */}
          {highlightedCentroid && (
            <Marker coordinates={highlightedCentroid}>
              {/* Positioned to upper-right, pointing down-left at country */}
              <g transform="translate(20, -45)">
                {/* Arrow line */}
                <line
                  x1="0"
                  y1="0"
                  x2="-18"
                  y2="40"
                  stroke="#DC2626"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Arrowhead pointing at country */}
                <polygon
                  points="-18,40 -10,28 -24,32"
                  fill="#DC2626"
                />
              </g>
            </Marker>
          )}
        </ZoomableGroup>
      </ComposableMap>

      {/* Legend - moved to bottom right */}
      <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 text-xs shadow-md">
        <div className="font-semibold mb-1 text-gray-700">Continents:</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {Object.entries(continentColors)
            .filter(([key]) => key !== 'default')
            .map(([continent, color]) => (
              <div key={continent} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-sm border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-600">{continent}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Zoom/Pan instructions */}
      <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 text-xs shadow-md text-gray-600">
        <span className="hidden sm:inline">🔍 Scroll to zoom • Drag to pan</span>
        <span className="sm:hidden">🔍 Pinch to zoom</span>
      </div>

      {/* Highlighted country indicator */}
      {highlightedCountry && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          Find this country!
        </div>
      )}
    </div>
  );
}

export default memo(WorldMap);

// Export for use in other components
export { countryToContinent, continentColors };
