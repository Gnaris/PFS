class VariantFormat {
    public type: "ITEM" | "PACK" = "ITEM";
    public discounted_price_eur_ex_vat = 0;
    public custom_suffix = "";

    constructor(
        public color: string,
        public size: string,
        public price_eur_ex_vat: number,
        public weight: number,
        public stock_qty: number,
        public packs?: { color: string; size: string; qty: number }[]
    ) {
        if (packs && packs.length > 0) {
            this.type = "PACK";
        }
    }
}

export default VariantFormat;