import { Market } from "./Market";
import { Pop } from "./Pop";
import { PopManager } from "./PopManager";
class Factory {
    constructor(name, initialWorkers, capacity, initialMoney, produce) {
        this._neededResources = new Map();
        this._name = name;
        this._capacity = capacity;
        this._currentWorkers = initialWorkers;
        this._popType = new Pop();
        this._money = initialMoney;
        this._profit = 0;
        this._balance = 0;
        this._producedResource = produce;
        this.updateNeededResources();
    }
    get currentWorkers() {
        return this.currentWorkers;
    }
    set currentWorkers(value) {
        this._currentWorkers = value;
    }
    updateNeededResources() {
        if (this._producedResource.independent == true) {
            this._neededResources = null;
        }
        else {
            this._producedResource.neededResources.forEach((resource) => {
                this._neededResources.set(resource.resource.name, resource.ratio * this._currentWorkers * this._popType.productivity);
            });
        }
    }
    work() {
        let oldMoney = this._money;
        let moneyGained = this.makeAndSellProducts();
        this._balance = this._money + moneyGained - oldMoney;
        this.recalculatePrices();
        this.payTaxes();
        PopManager.paySalaries(this._balance / 2, this._popType, this._currentWorkers, this);
        this._money += this._balance / 2;
        this._balance = 0;
    }
    payTaxes() {
        if (this._balance > 0) {
            let tax = this._balance / 10;
            this._balance = this._balance - tax;
            Government.money += tax;
        }
    }
    recalculatePrices() {
        if (this._balance <= 0) {
            Market.increasePrice(this._producedResource.name);
        }
    }
    makeAndSellProducts() {
        //update resource needs based on productivity
        this.updateNeededResources();
        //buy resources needed for production of goods
        this._money = Market.buyResources(this._neededResources, this._money);
        let producedQuantity = this._currentWorkers * this._popType.productivity;
        return Market.sellResources(this._producedResource.name, producedQuantity);
    }
}
