import { CompatibilityEngine } from "./CompatibilityEngine.js";

export const ScoringEngine = (() => {

    function score(vehicle, product) {

        const compatibility = CompatibilityEngine.evaluate(vehicle, product);

        if (!compatibility.viscosity)
            return {
                score: -999,
                reasons: ["Viscosity tidak sesuai"]
            };

        if (!compatibility.api)
            return {
                score: -999,
                reasons: ["API tidak memenuhi spesifikasi"]
            };

        let score = 0;
        const reasons = [];

        score += product.performanceScore * 0.40;
        score += product.valueScore * 0.25;
        score += product.availabilityScore * 0.15;

        if (product.counterfeitRisk === "Sangat Rendah") {
            score += 10;
            reasons.push("Risiko pemalsuan sangat rendah");
        }

        if (product.group.includes("IV")) {
            score += 10;
            reasons.push("Base oil Group IV");
        }

        reasons.push("Lulus seluruh spesifikasi dasar");

        return {
            score,
            reasons
        };

    }

    return {
        score
    };

})();