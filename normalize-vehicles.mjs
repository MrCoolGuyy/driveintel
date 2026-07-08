import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import vm from 'vm';

const filePath = path.resolve('src/database/vehicles.js');
const source = readFileSync(filePath, 'utf8');
const arraySource = source.replace(/^export const VEHICLES =\s*/, '').replace(/;\s*$/, '').trim();
const vehicles = vm.runInNewContext(`(${arraySource})`, {});

const COUNTRY_MAP = {
  Jepang: 'Japan',
  Jepun: 'Japan',
  Indonesia: 'Indonesia',
  Thailand: 'Thailand',
  Germany: 'Germany',
  China: 'China',
  'South Korea': 'South Korea'
};

const slugify = (value) => String(value ?? '')
  .normalize('NFKD')
  .replace(/[^a-z0-9\s-]/gi, '')
  .trim()
  .toLowerCase()
  .replace(/[\s-]+/g, '-')
  .replace(/^-+|-+$/g, '');

const normalizeCountry = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  return COUNTRY_MAP[trimmed] ?? trimmed;
};

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const normalizeProductionYears = (vehicle) => {
  const start = vehicle.yearStart ?? null;
  const endRaw = vehicle.yearEnd ?? null;
  if (start === null || start === undefined || start === '') {
    return null;
  }
  const end = endRaw === 'Sekarang' || endRaw === 'Sekarang' || endRaw === null || endRaw === undefined || endRaw === '' ? null : endRaw;
  return end === null ? String(start) : `${start}-${end}`;
};

const usedIds = new Set();
const usedSlugs = new Set();
const normalizedVehicles = vehicles.map((vehicle, index) => {
  const brand = vehicle.brand ? String(vehicle.brand).trim() : null;
  const model = vehicle.model ? String(vehicle.model).trim() : null;
  const variant = vehicle.variant ? String(vehicle.variant).trim() : null;

  const baseSlug = slugify([brand, model, variant].filter(Boolean).join(' '));
  let id = vehicle.id ? String(vehicle.id).trim() : '';
  let slug = vehicle.slug ? String(vehicle.slug).trim() : '';

  if (!id) id = baseSlug || `vehicle-${index + 1}`;
  if (!slug) slug = baseSlug || `vehicle-${index + 1}`;

  let idCounter = 2;
  let slugCounter = 2;
  while (usedIds.has(id)) {
    id = `${id}-${idCounter}`;
    idCounter += 1;
  }
  while (usedSlugs.has(slug)) {
    slug = `${slug}-${slugCounter}`;
    slugCounter += 1;
  }
  usedIds.add(id);
  usedSlugs.add(slug);

  return {
    id,
    slug,
    brand,
    model,
    variant,
    generation: vehicle.generation ?? null,
    productionYears: normalizeProductionYears(vehicle),
    engineCode: vehicle.engineCode ?? null,
    displacement: toNumberOrNull(vehicle.displacement),
    cylinders: toNumberOrNull(vehicle.cylinders),
    aspiration: vehicle.aspiration ?? null,
    fuel: vehicle.fuel ?? null,
    transmission: vehicle.transmission ?? null,
    drivetrain: vehicle.drivetrain ?? null,
    oilCapacity: toNumberOrNull(vehicle.oilCapacity),
    recommendedViscosity: vehicle.recommendedViscosity ?? vehicle.oilGrade ?? null,
    recommendedAPI: vehicle.recommendedAPI ?? vehicle.apiSpec ?? null,
    recommendedACEA: vehicle.recommendedACEA ?? null,
    recommendedILSAC: vehicle.recommendedILSAC ?? null,
    country: normalizeCountry(vehicle.country)
  };
});

writeFileSync(filePath, `export const VEHICLES = ${JSON.stringify(normalizedVehicles, null, 4)};\n`);

console.log(JSON.stringify({
  normalizedRecords: normalizedVehicles.length,
  fieldsConverted: {
    ids: normalizedVehicles.filter((vehicle) => vehicle.id).length,
    slugs: normalizedVehicles.filter((vehicle) => vehicle.slug).length,
    productionYears: normalizedVehicles.filter((vehicle) => vehicle.productionYears !== null).length,
    countries: normalizedVehicles.filter((vehicle) => vehicle.country !== null).length
  },
  fieldsSetToNull: {
    generation: normalizedVehicles.filter((vehicle) => vehicle.generation === null).length,
    engineCode: normalizedVehicles.filter((vehicle) => vehicle.engineCode === null).length,
    displacement: normalizedVehicles.filter((vehicle) => vehicle.displacement === null).length,
    cylinders: normalizedVehicles.filter((vehicle) => vehicle.cylinders === null).length,
    aspiration: normalizedVehicles.filter((vehicle) => vehicle.aspiration === null).length,
    fuel: normalizedVehicles.filter((vehicle) => vehicle.fuel === null).length,
    transmission: normalizedVehicles.filter((vehicle) => vehicle.transmission === null).length,
    drivetrain: normalizedVehicles.filter((vehicle) => vehicle.drivetrain === null).length,
    oilCapacity: normalizedVehicles.filter((vehicle) => vehicle.oilCapacity === null).length,
    recommendedViscosity: normalizedVehicles.filter((vehicle) => vehicle.recommendedViscosity === null).length,
    recommendedAPI: normalizedVehicles.filter((vehicle) => vehicle.recommendedAPI === null).length,
    recommendedACEA: normalizedVehicles.filter((vehicle) => vehicle.recommendedACEA === null).length,
    recommendedILSAC: normalizedVehicles.filter((vehicle) => vehicle.recommendedILSAC === null).length,
    country: normalizedVehicles.filter((vehicle) => vehicle.country === null).length
  }
}, null, 2));
