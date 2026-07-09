export const RecommendationEngine = (() => {

    function categorizeDecisions(mappedProducts, vehicleBrand) {

        const decisions = {
            bestOem: null,
            bestPremium: null,
            bestBudget: null,
            bestPerformance: null
        };

        const pool = [...mappedProducts];

        decisions.bestOem =
            pool.find(p =>
                p.brand.toLowerCase() === vehicleBrand.toLowerCase() ||
                p.productName.includes("Genuine") ||
                p.productName.includes("E-Pro")
            ) || pool[0];

        decisions.bestPremium = pool
            .slice()
            .sort((a, b) => b.performanceScore - a.performanceScore)
            .find(p =>
                p !== decisions.bestOem &&
                p.price >= 600000
            );

        decisions.bestBudget = pool
            .slice()
            .sort((a, b) => b.valueScore - a.valueScore)
            .find(p =>
                p !== decisions.bestOem &&
                p !== decisions.bestPremium &&
                p.price <= 450000
            );

        decisions.bestPerformance = pool
            .slice()
            .sort((a, b) => b.performanceScore - a.performanceScore)
            .find(p =>
                p !== decisions.bestOem &&
                p !== decisions.bestPremium &&
                p !== decisions.bestBudget
            );

        if (!decisions.bestPremium)
            decisions.bestPremium = pool[1] || pool[0];

        if (!decisions.bestBudget)
            decisions.bestBudget = pool[0];

        if (!decisions.bestPerformance)
            decisions.bestPerformance = decisions.bestPremium;

        return decisions;

    }

    function estimateMaintenanceCost(oilCapacity, bestBudgetPrice, bestPremiumPrice) {

        const minCost = bestBudgetPrice + 75000 + 50000;

        const maxCost = bestPremiumPrice + 120000 + 100000;

        return `Rp ${(minCost / 1000).toFixed(0)}.000 - Rp ${(maxCost / 1000).toFixed(0)}.000`;

    }

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

        categorizeDecisions,

        estimateMaintenanceCost,

        scoreProduct,

        rankProducts

    };

})();