export const CompatibilityEngine = (() => {

    const API_GASOLINE = {
        SJ: 1,
        SL: 2,
        SM: 3,
        SN: 4,
        SP: 5
    };

    const API_DIESEL = {
        CF: 1,
        CF4: 2,
        CG4: 3,
        CH4: 4,
        CI4: 5,
        CJ4: 6,
        CK4: 7
    };

    function normalizeOilGrade(text) {

        if (!text) return [];

        return text
            .split("/")
            .map(v => v.trim().toUpperCase());

    }

    function normalizeAPI(api) {

        if (!api) return "";

        return api
            .replace("API", "")
            .replace(/-/g, "")
            .trim()
            .toUpperCase()
            .split("/")[0];

    }

    function apiLevel(api, fuel) {

        const key = normalizeAPI(api);

        if (fuel === "Diesel") {
            return API_DIESEL[key] ?? 0;
        }

        return API_GASOLINE[key] ?? 0;

    }

    // =====================================
    // BASIC CHECK
    // =====================================

    function checkViscosity(vehicle, product) {

        const allowed =
            normalizeOilGrade(vehicle.oilGrade);

        return allowed.includes(
            product.viscosity.toUpperCase()
        );

    }

    function checkAPI(vehicle, product) {

        return (

            apiLevel(
                product.api,
                vehicle.fuel
            )

            >=

            apiLevel(
                vehicle.apiSpec,
                vehicle.fuel
            )

        );

    }

    function checkFuel(vehicle, product) {

        if (!product.suitableFuel)
            return true;

        const fuel = vehicle.fuel === "Bensin"
            ? "Gasoline"
            : vehicle.fuel;

        return product.suitableFuel.includes(fuel);

    }

    function checkEngine(vehicle, product) {

        if (!product.suitableEngine)
            return true;

        return product.suitableEngine.includes(
            vehicle.aspiration
        );

    }

    function checkApproval(vehicle, product) {

        if (!product.approval)
            return true;

        const api =
            normalizeAPI(vehicle.apiSpec);

        return product.approval.some(a =>
            a.toUpperCase().includes(api)
        );

    }

    // =====================================
    // MAIN EVALUATION
    // =====================================

    function evaluate(vehicle, product) {

        const viscosity =
            checkViscosity(vehicle, product);

        const api =
            checkAPI(vehicle, product);

        const fuel =
            checkFuel(vehicle, product);

        const engine =
            checkEngine(vehicle, product);

        const approval =
            checkApproval(vehicle, product);

        const score =

            Number(viscosity)

            +

            Number(api)

            +

            Number(fuel)

            +

            Number(engine)

            +

            Number(approval);

        return {

            compatible:

                api &&
                fuel,

            viscosity,

            api,

            fuel,

            engine,

            approval,

            score

        };

    }

    // =====================================
    // PENALTY
    // =====================================

    function viscosityPenalty(vehicle, product) {

        const allowed =
            normalizeOilGrade(vehicle.oilGrade);

        if (
            allowed.includes(
                product.viscosity.toUpperCase()
            )
        ) {

            return 0;

        }

        return -15;

    }

    return {

        evaluate,

        viscosityPenalty

    };

})();