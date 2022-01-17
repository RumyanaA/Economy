import { Pop } from "./Pop";
import {Market} from "./Market";

export class PopManager{

    public static paySalaries(salaries:number,pop:Pop,quantityPop:number){
        pop.recieveSalary(salaries);
        this.managePop(quantityPop,pop)
    }
    private static managePop(quantityPop:number,pop:Pop){
        let moneyLeft = this.fulfillBasicNeeds(quantityPop,pop)
        pop.money=moneyLeft;
        let popHappiness = this.manageHappiness(moneyLeft,pop);
        this.manageProductivity(popHappiness,pop)
    }

    private static fulfillBasicNeeds(popQuantity:number,pop:Pop){
        let popMoney=pop.money;
        let needs=new Map<string,number>([
            ["BREAD",popQuantity],["CLOTHES",popQuantity],["LUMBER",popQuantity]
        ])
        let moneyLeft = Market.buyResources(needs,popMoney);
        return moneyLeft;
    }
    private static manageHappiness(moneyLeft:number,pop:Pop){
        if(moneyLeft<0){
            pop.modifyHappiness(-5);
        }else if(moneyLeft>0){
            pop.modifyHappiness(2);
        }
        let popHappiness = pop.happiness;
        return popHappiness;
    }
    private static manageProductivity(popHappiness:number,pop:Pop){
        if(popHappiness<30){
            pop.productivity=0.5;
        }else if(popHappiness>60){
            pop.productivity=1.25;
        }else{
            pop.productivity=1;
        }
    }
    private static manageLeaveWorkDesicion(popHappiness,pop){
        if(popHappiness<30){
            let chanceToLeaveWork=100-(popHappiness+20);
        }
    }
}


