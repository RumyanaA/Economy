import { Pop } from "./Pop";
import {Market} from "./Market";
import { UnemployedPop} from "./UnemployedPop";

export class PopManager{

    public paySalaries(salaries:number,pop:Pop,quantityPop:number,factory:Factory){
        pop.recieveSalary(salaries);
        this.managePop(quantityPop,pop,factory);
        
    }
    private managePop(quantityPop:number,pop:Pop,factory:Factory):void{
        let moneyLeft:number = this.fulfillBasicNeeds(quantityPop,pop)
        pop.money=moneyLeft;
        let popHappiness:number = this.manageHappiness(moneyLeft,pop);
        this.manageProductivity(popHappiness,pop);
        let chanceToLeave:number = this.manageLeaveWorkDesicion(popHappiness,pop);
            if(chanceToLeave!=0){
                let randomNum=Math.random()*100;
                if(randomNum<chanceToLeave){
                    let unemployedPop=quantityPop/2;
                    let remainingWorkers=quantityPop-unemployedPop;
                    factory.currentWorkers=remainingWorkers;
                    UnemployedPop.changeNumOfUnemployed(unemployedPop);
                   
                }
            }
        
    }

    private fulfillBasicNeeds(popQuantity:number,pop:Pop):number{
        let popMoney=pop.money;
        let needs=new Map<string,number>([
            ["BREAD",popQuantity],["CLOTHES",popQuantity]
        ])
        let moneyLeft = Market.buyResources(needs,popMoney);
        return moneyLeft;
    }
    private manageHappiness(moneyLeft:number,pop:Pop){
        if(moneyLeft<0){
            pop.modifyHappiness(-5);
        }else if(moneyLeft>0){
            pop.modifyHappiness(2);
        }
        let popHappiness = pop.happiness;
        return popHappiness;
    }
    private manageProductivity(popHappiness:number,pop:Pop):void{
        if(popHappiness<30){
            pop.productivity=0.5;
        }else if(popHappiness>60){
            pop.productivity=1.25;
        }else{
            pop.productivity=1;
        }
    }
    private manageLeaveWorkDesicion(popHappiness:number,pop:Pop):number{
        let chanceToLeaveWork:number=0;
        if(popHappiness<30){
            chanceToLeaveWork=100-(popHappiness+20);
            pop.chanceToLeaveWork=chanceToLeaveWork
        }else if(popHappiness>30 && popHappiness<60){
            chanceToLeaveWork=10;
            pop.chanceToLeaveWork=chanceToLeaveWork
        }else{
            pop.chanceToLeaveWork=chanceToLeaveWork
        }
        return chanceToLeaveWork;
    }
    public decreaseUnemployedHappiness(unemployed:UnemployedPop):void{
        unemployed.pop.modifyHappiness(-5);
    }
}
