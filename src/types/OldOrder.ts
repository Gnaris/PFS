export interface OldOrder {
    id: string,
    order_no: string,
    creation_date: Date,
    customer: string,
    country: string,
    order_vat: number,
    validated_vat: number,
    pfs_payment_date: null,
    status: string,
    transporter: string,
    has_invoice: boolean,
    has_credit: boolean,
}

export interface OrderDetail {
    id: string,
    order_no: string,
    created_at: Date,
    customer: {
        name: string,
        shop: string,
        phone: string,
        delivery_address: {
            country: string,
        },
        billing_address: {
            country: string
        },
    },
    validated_vat : number
}