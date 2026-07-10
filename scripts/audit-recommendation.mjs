import { VEHICLES } from "../public/src/database/vehicles.js";
import { PRODUCTS } from "../public/src/database/products.js";
import { CompatibilityEngine } from "../public/src/engines/CompatibilityEngine.js";
import { RecommendationService } from "../public/src/services/RecommendationService.js";

console.log("\n==============================");
console.log(" DRIVEINTEL RECOMMENDATION AUDIT");
console.log("==============================\n");

for (const vehicle of VEHICLES) {

    console.log("-------------------------------------");
    console.log(`${vehicle.brand} ${vehicle.model} ${vehicle.variant}`);
    console.log("-------------------------------------");

    console.log("\nDatabase:");

    vehicle.products.forEach((id, index) => {

        const p = PRODUCTS[id];

        console.log(
            `${index + 1}. ${p.productName}`
        );

    });

    console.log("\nEngine:");

    console.log("\nCompatibility:");

Object.values(PRODUCTS).forEach(product => {

    const c = CompatibilityEngine.evaluate(vehicle, product);

    if (product.productName.includes("CRDi") ||
        product.productName.includes("15W-40") ||
        product.productName.includes("Shell Helix Ultra")) {

        console.log(
            `${product.productName}
API=${c.api}
Viscosity=${c.viscosity}
Compatible=${c.compatible}`
        );

    }

});
    const recommendations =
        RecommendationService.recommend(vehicle);

    recommendations.ranked.forEach((r, index) => {

        console.log(
            `${index + 1}. ${r.product.productName} (${r.score.toFixed(1)})`
        );

        console.log(
            `Score : ${r.score.toFixed(1)}`
        );

        console.log(
            `Reason: ${r.reasons.join(", ")}`
        );

    });

    console.log("");

}