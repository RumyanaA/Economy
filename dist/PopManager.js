import { Market } from "./Market";
import { UnemployedPop } from "./UnemployedPop";
export class PopManager {
    paySalaries(salaries, pop, quantityPop, factory) {
        pop.recieveSalary(salaries);
        this.managePop(quantityPop, pop, factory);
    }
    managePop(quantityPop, pop, factory) {
        let moneyLeft = this.fulfillBasicNeeds(quantityPop, pop);
        pop.money = moneyLeft;
        let popHappiness = this.manageHappiness(moneyLeft, pop);
        this.manageProductivity(popHappiness, pop);
        let chanceToLeave = this.manageLeaveWorkDesicion(popHappiness, pop);
        if (chanceToLeave != 0) {
            let randomNum = Math.random() * 100;
            if (randomNum < chanceToLeave) {
                let unemployedPop = quantityPop / 2;
                let remainingWorkers = quantityPop - unemployedPop;
                factory.currentWorkers = remainingWorkers;
                UnemployedPop.changeNumOfUnemployed(unemployedPop);
            }
        }
    }
    fulfillBasicNeeds(popQuantity, pop) {
        let popMoney = pop.money;
        let needs = new Map([
            ["BREAD", popQuantity], ["CLOTHES", popQuantity]
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
        let chanceToLeaveWork = 0;
        if (popHappiness < 30) {
            chanceToLeaveWork = 100 - (popHappiness + 20);
            pop.chanceToLeaveWork = chanceToLeaveWork;
        }
        else if (popHappiness > 30 && popHappiness < 60) {
            chanceToLeaveWork = 10;
            pop.chanceToLeaveWork = chanceToLeaveWork;
        }
        else {
            pop.chanceToLeaveWork = chanceToLeaveWork;
        }
        return chanceToLeaveWork;
    }
    decreaseUnemployedHappiness(unemployed) {
        unemployed.pop.modifyHappiness(-5);
    }
}
