import { VEHICLES } from "../../public/src/database/vehicles.js";
import { PRODUCTS } from "../../public/src/database/products.js";

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function loadVehicles() {

    return VEHICLES.map(vehicle => ({

        type: "vehicle",

        slug: vehicle.slug,

        filename: `${vehicle.slug}.webp`,

        query:
            `${vehicle.brand} ${vehicle.model} ${vehicle.variant} ${vehicle.yearStart}`

    }));

}

export function loadProducts() {

    return Object.values(PRODUCTS).map(product => ({

        type: "product",

        slug: slugify(product.productName),

        filename: `${slugify(product.productName)}.webp`,

        query:
            `${product.brand} ${product.productName} bottle`

    }));

}

export function loadAssets() {

    return [

        ...loadVehicles(),

        ...loadProducts()

    ];

}