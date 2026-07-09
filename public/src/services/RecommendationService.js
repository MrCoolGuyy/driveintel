import { DatabaseResolver } from "./DatabaseResolver.js";
import { RankingEngine } from "../engines/RankingEngine.js";

export const RecommendationService = (() => {

    function recommend(vehicle) {

        return RankingEngine.rank(
            vehicle,
            DatabaseResolver.getAllProducts()
        );

    }

    return {
        recommend
    };

})();