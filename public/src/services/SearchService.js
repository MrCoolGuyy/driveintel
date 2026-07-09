import { DatabaseResolver } from "./DatabaseResolver.js";
import { SearchEngine } from "../engines/SearchEngine.js";

export const SearchService = (() => {

    function searchVehicles(query) {

        if (!query || query.trim().length < 2)
            return [];

        const vehicles = DatabaseResolver.getAllVehicles();

        return vehicles
            .map(vehicle => {

                const searchTarget = [
                    vehicle.brand,
                    vehicle.model,
                    vehicle.variant,
                    vehicle.engineCode,
                    vehicle.slug
                ].join(" ");

                return {
                    vehicle,
                    score: SearchEngine.evaluateSearchScore(query, searchTarget)
                };

            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map(item => item.vehicle);

    }

    return {

        searchVehicles

    };

})();