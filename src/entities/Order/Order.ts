class Order {

    public "Nom de l'entreprise" : string
    public "Nom du client" : string
    public "Numéro de téléphone" : string
    public "pays_livraison" : string
    public "pays_facturation" : string
    public "chiffre_d'affaire" : number   
    public "Date dernière commande" : Date                                                                                                                                                                                                                                                                                     
    public "Nombre de commande" : number = 1
    public "Panier moyen" : number = 0
    public "Nombre de jour depuis la dernière commande" : number

    constructor(shop : string, name : string, phone : string, delivery_country : string, billing_country : string, amount : number, date : Date){
        this["Nom de l'entreprise"] = shop
        this["Nom du client"] = name
        this["Numéro de téléphone"] = phone
        this["pays_livraison"] = delivery_country
        this["pays_facturation"] = billing_country
        this["chiffre_d'affaire"] = amount
        this["Date dernière commande"] = date
        this["Panier moyen"] = amount / 1
        this.setNbDay(date)
    }

    public addTurnover(amount : number)
    {
        this["chiffre_d'affaire"] += amount
        this["Panier moyen"] = this["chiffre_d'affaire"] / this["Nombre de commande"]
    }

    public addNbOrder()
    {
        this["Nombre de commande"]++
        this["Panier moyen"] = this["chiffre_d'affaire"] / this["Nombre de commande"]
    }

    public setLastDate(date : Date)
    {
        if(new Date(this["Date dernière commande"]) < date)
        {
            this["Date dernière commande"] = date
            this.setNbDay(date)
        }
    }

    public setNbDay(date : Date)
    {
        const fromDate = new Date(date);
        const today = new Date();
        fromDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        const diffInMs = today.getTime() - fromDate.getTime();
        const diffInDays = Math.floor(diffInMs / MS_PER_DAY);
        this["Nombre de jour depuis la dernière commande"] = diffInDays
    }
}

export default Order