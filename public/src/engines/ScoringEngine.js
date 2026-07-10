import { CompatibilityEngine } from "./CompatibilityEngine.js";
import { SCORE_WEIGHTS } from "./ScoreWeights.js";

export const ScoringEngine = (() => {

    function calculateScore(vehicle, product) {

        const compatibility =
            CompatibilityEngine.evaluate(
                vehicle,
                product
            );

        // HARD FILTER
        if (!compatibility.api) {

            return {

                score: -999,

                reasons: [
                    "API tidak memenuhi spesifikasi"
                ]

            };

        }

        const reasons = [];

        let score = 0;

        score += compatibility.score * 2;

        reasons.push(
            `Compatibility ${compatibility.score}/5`
        );

        // ==========================
        // VISCOSITY PENALTY
        // ==========================

        const viscosityPenalty =
            CompatibilityEngine.viscosityPenalty(
                vehicle,
                product
            );

        score += viscosityPenalty;

        if (viscosityPenalty < 0) {

            reasons.push(
                "Viskositas berbeda dari rekomendasi pabrikan"
            );

        }

        // ==========================
        // BASE SCORE
        // ==========================

        score +=
            product.performanceScore *
            SCORE_WEIGHTS.performance;

        score +=
            product.valueScore *
            SCORE_WEIGHTS.value;

        score +=
            product.availabilityScore *
            SCORE_WEIGHTS.availability;

        // ==========================
        // OEM BONUS
        // ==========================

        if (product.brand === vehicle.brand) {

            score +=
                SCORE_WEIGHTS.oemBonus;

            reasons.push(
                "OEM resmi pabrikan"
            );

        }

        // ==========================
        // COUNTERFEIT BONUS
        // ==========================

        if (product.counterfeitRisk === "Sangat Rendah") {

            score +=
                SCORE_WEIGHTS.counterfeitLowBonus;

            reasons.push(
                "Risiko pemalsuan sangat rendah"
            );

        }

        // ==========================
        // GROUP IV BONUS
        // ==========================

        if (product.group.includes("IV")) {

            score +=
                SCORE_WEIGHTS.groupIVBonus;

            reasons.push(
                "Base Oil Group IV"
            );

        }

        // ==========================
        // TURBO BONUS
        // ==========================

        if (

            vehicle.aspiration === "Turbo"

            &&

            product.group.includes("IV")

        ) {

            score +=
                SCORE_WEIGHTS.turboGroupIVBonus;

            reasons.push(
                "Ideal untuk mesin turbo"
            );

        }

        // ==========================
        // MINERAL PENALTY
        // ==========================

        if (product.baseOil.includes("Mineral")) {

            score -=
                SCORE_WEIGHTS.mineralPenalty;

            reasons.push(
                "Base oil mineral"
            );

        }

        // ==========================
        // GENERAL
        // ==========================

        reasons.push(
            "Memenuhi spesifikasi dasar mesin"
        );

        return {

            score,

            reasons

        };

    }

    return {

        calculateScore

    };

})();