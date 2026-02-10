import ExcelJS from "exceljs";
import { OldOrder, OrderDetail } from "../types/OldOrder.js";
import Order from "./Order/Order.js";
import Token from "./Token.js";

class ParisFashionShopOrder {

    constructor(public token: Token) { }

    public async getOrderSummary() {
        const oldOrders = await this.getAllOrders()
        const orders: Map<string, Order> = new Map()
        for (const oldOrder of oldOrders) {
            const orderDetail = await this.showOrderDetail(oldOrder.id)
            if (orders.has(orderDetail.customer.shop)) {
                const order = orders.get(orderDetail.customer.shop)
                order!.addTurnover(orderDetail.validated_vat)
                order!.addNbOrder()
                order!.setLastDate(orderDetail.created_at)
            } else {
                orders.set(orderDetail.customer.shop, new Order(orderDetail.customer.shop, orderDetail.customer.name, orderDetail.customer.phone, orderDetail.customer.delivery_address.country, orderDetail.customer.billing_address.country, orderDetail.validated_vat, orderDetail.created_at))
            }
        }
        await this.createExcelFile(Array.from(orders.values()))
    }

    public async getAllOrders() {
        const response = await fetch("https://wholesaler-api.parisfashionshops.com/api/v1/orders/listOrders?page=1&per_page=1", {
            headers: { Authorization: "Bearer " + this.token.access_token }
        })
        const result = await response.json() as { data: OldOrder[], meta: { last_page: number } }
        let oldOrder: OldOrder[] = result.data.filter(order => order.validated_vat != null)
        for (let page = 2; page <= result.meta.last_page; page++) {
            const response = await fetch(`https://wholesaler-api.parisfashionshops.com/api/v1/orders/listOrders?page=${page}&per_page=50`, {
                headers: { Authorization: "Bearer " + this.token.access_token }
            })
            const result = await response.json() as { data: OldOrder[], meta: { last_page: number } }
            oldOrder = [...oldOrder, ...result.data.filter(order => order.validated_vat != null)]
        }
        return oldOrder
    }

    public async showOrderDetail(orderID: string) {
        const response = await fetch("https://wholesaler-api.parisfashionshops.com/api/v1/orders/" + orderID, {
            headers: { Authorization: "Bearer " + this.token.access_token }
        })
        const result = await response.json()
        return result.data as OrderDetail
    }

    public async createExcelFile(orders: Order[]) {
        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet("Commande")
        sheet.columns = Object.keys(orders[0]).map(header => ({ header, key: header }))
        orders.forEach(order => {
            sheet.addRow({
                "Nom de l'entreprise": order["Nom de l'entreprise"],
                "Nom du client": order["Nom du client"],
                "Numéro de téléphone": order["Numéro de téléphone"],
                "pays_livraison": order["pays_livraison"],
                "pays_facturation": order["pays_facturation"],
                "chiffre_d'affaire": order["chiffre_d'affaire"],
                "Date dernière commande": new Date(order["Date dernière commande"]).toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"}),
                "Nombre de commande": order["Nombre de commande"],
                "Panier moyen": order["Panier moyen"],
                "Nombre de jour depuis la dernière commande": order["Nombre de jour depuis la dernière commande"]
            });
        });
        await workbook.xlsx.writeFile("commande.xlsx")
    }
}

export default ParisFashionShopOrder