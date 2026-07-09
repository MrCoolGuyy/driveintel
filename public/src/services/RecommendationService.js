import { DatabaseResolver } from "./DatabaseResolver.js";
import { CompatibilityEngine } from "../engines/CompatibilityEngine.js";
import { RankingEngine } from "../engines/RankingEngine.js";

export const RecommendationService = (() => {

    function recommend(vehicle) {

        const compatibleProducts =
            DatabaseResolver
                .getAllProducts()
                .filter(product =>
                    CompatibilityEngine
                        .evaluate(vehicle, product)
                        .compatible
                );

        const ranked =
            RankingEngine.rank(
                vehicle,
                compatibleProducts
            );

        const bestOem =
            ranked.find(r =>
                r.product.brand === vehicle.brand
            )?.product ?? ranked[0]?.product;

        const bestPremium =
            ranked[0]?.product;

        const bestBudget =
            [...ranked]
                .sort((a, b) =>
                    b.product.valueScore -
                    a.product.valueScore
                )[0]?.product;

        const bestPerformance =
            [...ranked]
                .sort((a, b) =>
                    b.product.performanceScore -
                    a.product.performanceScore
                )[0]?.product;

        return {

            ranked,

            bestOem,

            bestPremium,

            bestBudget,

            bestPerformance

        };

    }

    return {

        recommend

    };

})();