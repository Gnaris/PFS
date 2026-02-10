export interface OldProduct {
    id: string
    reference: string
    brand: { id: string, name: string }
    gender: string
    family: string
    category: { id: string, labels: { fr: string, en: string, de: string, es: string, it: string } }
    labels: { fr: string, en: string, de: string, es: string, it: string }
    colors: string
    sizes: string
    size_details_tu: string
    unit_price: number
    creation_date: string
    status: string
    is_star: number
    count_variants: number
    images: { DEFAULT: string } & { [key: string]: string[] }
    flash_sales_discount?: null
}

export interface OldProductDetail {
    material_composition: { id: string, percentage: number }[],
    collection: { reference: string },
    country_of_manufacture: string,
    size_details_tu: string,
    label: { fr: string, en: string, es: string, it: string, de: string },
    description: { fr: string, en: string, es: string, it: string, de: string }
}

export interface OldProductVariant {
    id: string,
    product_id: string,
    size_details_tu: string,
    reference: string,
    type: "PACK" | "ITEM",
    colors: { reference: string }[],
    stock_qty: number,
    price_sale: { unit: { value: number } },
    item: { size: string },
    packs: { sizes: { size: string, qty: number }[] }[],
    weight: number,
    is_active: boolean,
    images: { DEFAULT: string } & { [key: string]: string[] }
}