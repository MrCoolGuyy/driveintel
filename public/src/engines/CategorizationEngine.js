export const CategorizationEngine = (() => {

    function categorize(vehicle, ranked) {

        const products =
            ranked.map(r => r.product);

        const bestOverall =
            ranked[0]?.product ?? null;

        const bestOem =
            products.find(p =>
                p.brand === vehicle.brand
            ) ?? bestOverall;

        const bestBudget =
            products.find(p =>
                p.marketSegment === "budget"
            ) ?? bestOverall;

        const bestPremium =
            products.find(p =>
                p.marketSegment === "premium"
            ) ?? bestOverall;

        const bestMid =
            products.find(p =>
                p.marketSegment === "mid"
            ) ?? bestOverall;

        return {

            bestOverall,

            bestOem,

            bestBudget,

            bestPremium,

            bestMid

        };

    }

    return {

        categorize

    };

})();