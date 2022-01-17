import { Market } from "./Market";
export class PopManager {
    paySalaries(salaries, pop, quantityPop) {
        pop.recieveSalary(salaries);
        this.managePop(quantityPop, pop);
    }
    managePop(quantityPop, pop) {
        let moneyLeft = this.fulfillBasicNeeds(quantityPop, pop);
        pop.money = moneyLeft;
        let popHappiness = this.manageHappiness(moneyLeft, pop);
        this.manageProductivity(popHappiness, pop);
    }
    fulfillBasicNeeds(popQuantity, pop) {
        let popMoney = pop.money;
        let needs = new Map([
            ["BREAD", popQuantity], ["CLOTHES", popQuantity], ["LUMBER", popQuantity]
        ]);
        let moneyLeft = Market.buyResources(needs, popMoney);
        return moneyLeft;
    }
    manageHappiness(moneyLeft, pop) {
        if (moneyLeft < 0) {
            pop.modifyHappiness(-5);
        }
        else if (moneyLeft > 0) {
            pop.modifyHappiness(2);
        }
        let popHappiness = pop.happiness;
        return popHappiness;
    }
    manageProductivity(popHappiness, pop) {
        if (popHappiness < 30) {
            pop.productivity = 0.5;
        }
        else if (popHappiness > 60) {
            pop.productivity = 1.25;
        }
        else {
            pop.productivity = 1;
        }
    }
    manageLeaveWorkDesicion(popHappiness, pop) {
        if (popHappiness < 30) {
            let chanceToLeaveWork = 100 - (popHappiness + 20);
        }
    }
}
