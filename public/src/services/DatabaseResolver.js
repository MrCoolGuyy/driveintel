import { VEHICLES } from "../database/vehicles.js";
import { ENGINES } from "../database/engines.js";
import { PRODUCTS } from "../database/products.js";
import { DIRECTORY_MAP } from "../database/constants.js";

export const DatabaseResolver = ((Vehicles, Engines, Products, Constants) => {

    return {

        getAllVehicles: () => Vehicles,

        getAllProducts: () => Object.values(Products),

        getEngineDetails: (code) => Engines[code] || null,

        getProductDetails: (id) => Products[id] || null,

        getVehicleBySlug: (slug) => {
            const v = Vehicles.find(v => v.slug === slug);

            if (!v) return null;

            return {
                ...v,
                engine: Engines[v.engineCode] || {},
                mappedProducts: v.products.map(pId => Products[pId]).filter(Boolean)
            };
        },

        getDirectoryMap: () => Constants.DIRECTORY_MAP,

        getUniqueValues: (field) =>
            [...new Set(Vehicles.map(v => v[field]).filter(Boolean))].sort(),

        getVehiclesByField: (field, value) => {

            const normalized = decodeURIComponent(value).toLowerCase();

            return Vehicles.filter(v =>
                v[field] &&
                v[field].toString().toLowerCase() === normalized
            );

        },

        getRelatedVehicles: (type, excludeSlug) =>
            Vehicles
                .filter(v => v.bodyType === type && v.slug !== excludeSlug)
                .slice(0,4)

    };

})(

    VEHICLES,

    ENGINES,

    PRODUCTS,

    { DIRECTORY_MAP }

);