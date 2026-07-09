import { DatabaseResolver } from "./DatabaseResolver.js";
import { RecommendationEngine } from "../engines/RecommendationEngine.js";
import { SEOEngine } from "../engines/SEOEngine.js";

export const VehicleService = (() => {

    function getVehicleData(slug) {

        const rawVehicle = DatabaseResolver.getVehicleBySlug(slug);

        if (!rawVehicle) return null;

        const decisions = RecommendationEngine.categorizeDecisions(
            rawVehicle.mappedProducts,
            rawVehicle.brand
        );

        const summary =
            SEOEngine.generateExecutiveSummary(rawVehicle);

        const costEstimate =
            RecommendationEngine.estimateMaintenanceCost(
                rawVehicle.oilCapacity,
                decisions.bestBudget.price,
                decisions.bestPremium.price
            );

        const faqs =
            SEOEngine.generateFAQ(rawVehicle);

        const relatedVehicles =
            DatabaseResolver.getRelatedVehicles(
                rawVehicle.bodyType,
                rawVehicle.slug
            );

        return {

            core: rawVehicle,

            decisionEngine: {

                summary,

                bestOem: {
                    product: decisions.bestOem,
                    reason: SEOEngine.generateReasoning(
                        "OEM",
                        decisions.bestOem,
                        rawVehicle
                    )
                },

                bestPremium: {
                    product: decisions.bestPremium,
                    reason: SEOEngine.generateReasoning(
                        "Premium",
                        decisions.bestPremium,
                        rawVehicle
                    )
                },

                bestBudget: {
                    product: decisions.bestBudget,
                    reason: SEOEngine.generateReasoning(
                        "Budget",
                        decisions.bestBudget,
                        rawVehicle
                    )
                },

                costEstimate,

                faqs

            },

            relatedVehicles

        };

    }

    return {

        getVehicleData

    };

})();