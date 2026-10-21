// Builds the dotted world map used by the homepage route planner.
//
// Runs at development time only. Country shapes stay out of every bundle:
// the output is a compact JSON of dot coordinates (encoded as one SVG path)
// plus the projected position of each trade hub.
//
// Usage: npm run route-map
import { writeFile } from 'node:fs/promises';
import DottedMap from 'dotted-map';

// Centred on the archipelago so every lane reads naturally on a flat map.
const map = new DottedMap({
  height: 64,
  grid: 'diagonal',
  projection: { name: 'equalEarth', center: { lat: 0, lng: 112 } },
});

const hubs = {
  origin: { lat: -2.5, lng: 117 },
  'east-asia': { lat: 31.2, lng: 121.5 },
  'south-asia': { lat: 19.1, lng: 72.9 },
  'middle-east': { lat: 25.2, lng: 55.3 },
  africa: { lat: -1.3, lng: 36.8 },
  europe: { lat: 51.9, lng: 4.5 },
  americas: { lat: 34, lng: -118.2 },
  oceania: { lat: -33.9, lng: 151.2 },
};

for (const [id, position] of Object.entries(hubs)) {
  map.addPin({ ...position, data: id });
}

// Helper pins: points carry no lat/lng, so project the archipelago's bounding
// corners and Antarctica's edge to find them on the grid.
const guides = {
  'nw-corner': { lat: 6.5, lng: 94 },
  'se-corner': { lat: -11.5, lng: 141.5 },
  'south-cut': { lat: -58, lng: 112 },
};
for (const [id, position] of Object.entries(guides)) {
  map.addPin({ ...position, data: `guide:${id}` });
}

const points = map.getPoints();
const round = (value) => Math.round(value * 100) / 100;
const guide = (id) => points.find((point) => point.data === `guide:${id}`);
const nw = guide('nw-corner');
const se = guide('se-corner');
const southCut = guide('south-cut').y;
const isArchipelago = ({ x, y }) => x >= nw.x - 0.5 && x <= se.x + 0.5 && y >= nw.y - 0.5 && y <= se.y + 0.5;

let land = '';
let archipelago = '';
const pins = {};
let maxX = 0;
let maxY = 0;

for (const point of points) {
  if (point.y <= southCut) {
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }
  if (typeof point.data === 'string') {
    if (!point.data.startsWith('guide:')) {
      pins[point.data] = { x: round(point.x), y: round(point.y) };
    }
    continue;
  }
  // Drop Antarctica — it adds weight and no destinations.
  if (point.y > southCut) continue;
  const segment = `M${round(point.x)} ${round(point.y)}h0`;
  if (isArchipelago(point)) archipelago += segment;
  else land += segment;
}

const output = {
  width: Math.ceil(maxX + 1),
  height: Math.ceil(maxY + 1),
  land,
  archipelago,
  pins,
};

await writeFile('lib/route-map.json', `${JSON.stringify(output)}\n`);
console.log(
  `route map: ${output.width}×${output.height}, ${(land.length + archipelago.length) / 1000}k path chars`,
);
