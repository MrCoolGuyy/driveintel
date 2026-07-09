import { VEHICLES } from "../public/src/database/vehicles.js";
import { PRODUCTS } from "../public/src/database/products.js";

let errors = 0;
let warnings = 0;

const API_ORDER = [
  "CF",
  "CF-4",
  "CG-4",
  "CH-4",
  "CI-4",
  "CJ-4",
  "CK-4",
  "SN",
  "SP"
];

function error(vehicle, message) {
  errors++;
  console.log(`❌ ${vehicle.brand} ${vehicle.model} ${vehicle.variant}`);
  console.log(`   ${message}`);
  console.log("");
}

function warning(vehicle, message) {
  warnings++;
  console.log(`⚠️ ${vehicle.brand} ${vehicle.model} ${vehicle.variant}`);
  console.log(`   ${message}`);
  console.log("");
}

function normalizeApi(api) {
  if (!api) return "";
  return api.replace("API", "").trim().toUpperCase();
}

function apiRank(api) {
  return API_ORDER.indexOf(normalizeApi(api));
}

console.log("======================================");
console.log("DriveIntel Database Validator");
console.log("======================================\n");

for (const vehicle of VEHICLES) {

  const seen = new Set();

  for (const productId of vehicle.products) {

    // RULE 1
    if (!PRODUCTS[productId]) {
      error(vehicle, `Product '${productId}' tidak ditemukan.`);
      continue;
    }

    // RULE 2
    if (seen.has(productId)) {
      error(vehicle, `Duplicate product '${productId}'.`);
    }

    seen.add(productId);

    const product = PRODUCTS[productId];

    // RULE 3
    const grades = vehicle.oilGrade
      .split("/")
      .map(v => v.trim());

    if (!grades.includes(product.viscosity)) {
      warning(
        vehicle,
        `${product.productName} memakai ${product.viscosity}, sedangkan kendaraan meminta ${vehicle.oilGrade}.`
      );
    }

    // RULE 4
    const vehicleApi = apiRank(vehicle.apiSpec);
    const productApi = apiRank(product.api);

    if (vehicleApi >= 0 && productApi >= 0) {

      if (productApi < vehicleApi) {

        error(
          vehicle,
          `${product.productName} memakai API ${product.api}, minimum kendaraan ${vehicle.apiSpec}.`
        );

      }

    }

    // RULE 5
    if (
      vehicle.fuel === "Diesel" &&
      normalizeApi(product.api).startsWith("S")
    ) {

      warning(
        vehicle,
        `${product.productName} adalah oli bensin (API ${product.api}) untuk mesin diesel.`
      );

    }

  }

}

console.log("--------------------------------------");
console.log(`Errors   : ${errors}`);
console.log(`Warnings : ${warnings}`);
console.log("--------------------------------------");