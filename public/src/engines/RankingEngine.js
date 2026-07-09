import { ScoringEngine } from "./ScoringEngine.js";

export const RankingEngine = (() => {

    function rank(vehicle, products) {

        return products

            .map(product => {

                const result =
                    ScoringEngine.calculateScore(
                        vehicle,
                        product
                    );

                return {

                    product,

                    score: result.score,

                    reasons: result.reasons

                };

            })

            .filter(item => item.score >= 0)

            .sort((a, b) => b.score - a.score);

    }

    return {

        rank

    };

})();