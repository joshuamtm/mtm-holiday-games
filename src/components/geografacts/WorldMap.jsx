import { useState, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

// Use Natural Earth 110m world map (built into react-simple-maps)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map ISO 3166-1 alpha-2 codes to ISO 3166-1 numeric codes (used by world-atlas)
const isoAlpha2ToNumeric = {
  // North America
  us: "840", ca: "124", mx: "484", cu: "192", jm: "388", ht: "332", do: "214",
  tt: "780", gt: "320", hn: "340", sv: "222", ni: "558", cr: "188", pa: "591",
  // South America
  br: "076", ar: "032", cl: "152", co: "170", pe: "604", ve: "862", ec: "218",
  bo: "068", py: "600", uy: "858", gy: "328", sr: "740",
  // Europe
  gb: "826", ie: "372", fr: "250", es: "724", pt: "620", de: "276", it: "380",
  nl: "528", be: "056", ch: "756", at: "040", pl: "616", cz: "203", sk: "703",
  hu: "348", ro: "642", bg: "100", gr: "300", rs: "688", hr: "191", ba: "070",
  si: "705", al: "008", mk: "807", me: "499", se: "752", no: "578", dk: "208",
  fi: "246", ee: "233", lv: "428", lt: "440", by: "112", ua: "804", md: "498",
  ru: "643", is: "352", lu: "442", mt: "470", cy: "196",
  // Africa
  eg: "818", ly: "434", tn: "788", dz: "012", ma: "504", sd: "729", et: "231",
  ke: "404", tz: "834", ug: "800", rw: "646", ng: "566", gh: "288", ci: "384",
  sn: "686", cm: "120", za: "710", ao: "024", mz: "508", zw: "716", zm: "894",
  bw: "072", na: "516", mg: "450", mu: "480", ls: "426", sz: "748",
  // Asia
  cn: "156", jp: "392", kr: "410", in: "356", pk: "586", bd: "050", np: "524",
  bt: "064", lk: "144", mm: "104", th: "764", vn: "704", kh: "116", la: "418",
  my: "458", sg: "702", id: "360", ph: "608", bn: "096", tl: "626", mn: "496",
  kz: "398", uz: "860", tm: "795", kg: "417", tj: "762", af: "004", ir: "364",
  iq: "368", sa: "682", ye: "887", om: "512", ae: "784", qa: "634", bh: "048",
  kw: "414", jo: "400", lb: "422", sy: "760", il: "376", tr: "792", ge: "268",
  am: "051", az: "031", mv: "462",
  // Oceania
  au: "036", nz: "554", pg: "598", fj: "242",
};

// Map country ISO codes to continent names for coloring
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
  const [tooltipContent, setTooltipContent] = useState('');

  const highlightedNumeric = highlightedCountry ? isoAlpha2ToNumeric[highlightedCountry] : null;

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
      {/* Map container */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 130,
          center: [0, 30],
        }}
        style={{
          width: "100%",
          height: "auto",
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
                    onMouseEnter={() => {
                      setTooltipContent(geo.properties.name || '');
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    className={isHighlighted ? 'animate-pulse' : ''}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 text-xs shadow-md">
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

      {/* Highlighted country indicator */}
      {highlightedCountry && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
          Find this country!
        </div>
      )}

      {/* Tooltip */}
      {tooltipContent && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm shadow-lg">
          {tooltipContent}
        </div>
      )}
    </div>
  );
}

export default memo(WorldMap);

// Export for use in other components
export { countryToContinent, continentColors };
