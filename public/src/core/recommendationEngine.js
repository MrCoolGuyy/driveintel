export const RecommendationEngine = (() => {

    function scoreProduct(vehicle, product) {

        let score = 0;

        const reasons = [];

        return {
            score,
            reasons
        };

    }

    function rankProducts(vehicle, products) {

        return products
            .map(product => ({
                product,
                ...scoreProduct(vehicle, product)
            }))
            .sort((a, b) => b.score - a.score);

    }

    return {

        scoreProduct,

        rankProducts

    };

})();