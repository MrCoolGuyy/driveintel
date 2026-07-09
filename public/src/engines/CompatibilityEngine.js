export const CompatibilityEngine = (() => {

    function normalizeOilGrade(text) {

        if (!text) return [];

        return text
            .split("/")
            .map(v => v.trim().toUpperCase());

    }

    function apiLevel(api) {

        if (!api) return "";

        return api
            .replace("API","")
            .trim()
            .toUpperCase();

    }

    function checkViscosity(vehicle, product) {

        const allowed = normalizeOilGrade(vehicle.oilGrade);

        return allowed.includes(
            product.viscosity.toUpperCase()
        );

    }

    function checkAPI(vehicle, product) {

        return apiLevel(product.api) >= apiLevel(vehicle.apiSpec);

    }

    function evaluate(vehicle, product) {

        return {

            viscosity: checkViscosity(vehicle,product),

            api: checkAPI(vehicle,product)

        };

    }

    return {

        evaluate

    };

})();