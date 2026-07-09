import { DatabaseResolver } from "./DatabaseResolver.js";
import { RankingEngine } from "../engines/RankingEngine.js";

export const RecommendationService = (() => {

    function recommend(vehicle, limit = 5) {

        const ranked = RankingEngine.rank(
            vehicle,
            DatabaseResolver.getAllProducts()
        );

        return ranked.slice(0, limit);

    }

    return {

        recommend

    };

})();