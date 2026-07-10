import { DatabaseResolver } from "./DatabaseResolver.js";
import { CompatibilityEngine } from "../engines/CompatibilityEngine.js";
import { RankingEngine } from "../engines/RankingEngine.js";
import { CategorizationEngine } from "../engines/CategorizationEngine.js";

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

        const categories =
    CategorizationEngine.categorize(
        vehicle,
        ranked
    );

        return {

            ranked,

        ...categories

};

    }

    return {

        recommend

    };

})();