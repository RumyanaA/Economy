# Economy
Simulator for economy and population development.

## Defininition of entities:
* Pop
* Factory
* Market

## Entity description:
### Pop:
A Pop defines a single person in the nation.
Pop can perform the following operations:
* * Work (in factory)
* * Fulfill needs(basic, like food and clothes) - 
* * Leave Factory - chance to leave current Factory, based on Happiness
* * Start working in another Factory -  selection of new Factory based on workers happiness.
Population key properties:
* Happiness:
* * Happiness is in range between 0 and 100;
* * range 60-100 no chance to leave current factory. //in future: possibility to promote to higher class of society
* * range 30-60 means normal - no negative or positive effects -- 10% chance to leave work
* * range 1-30 decrease in productivity (defined in productivity section) -- 50+% chance to leave work
* * 0 happiness means the pop dies;
* Productivity(related to happiness):
* * If happiness is below 30, productivity is 0.5
* * If happiness is between 30-60, productivity is 1;
* * If happiness is above 60, productivity is 1.25;
* Money - pay received from workplace, used to purchase from Market
### Factory:
Factory defines a workplace for population to work and make money
A Factory can perform the following actions:
* Buy resources - based on number of workers and productivity value
* Produce resources - based on number of workers and productivity value and static multiplier
* Sell resources - based on market price
* Increase prices - if profits are <=0
* Pay taxes - 10% of balance
* Pay salaries - 50% of balance after taxes
Factory key properties:
* worker capacity
* current workers
* total money
* profit
* balance

### Market
Market defines the common place where resources are stored, bought and sold.
All factories and Pops buy and sell resources from the market
A Market can perform the following actions:
* Increase price
* Decrease price
* Store resources
* Track supply/demand changes for resources
Market key properties:
* Storage for each resource
* Price for each resource
* Money


### Starting resources:
* Grain
* Bread
* Leather
* Clothes

#### Production chains:
* Grain -> Bread, ration 2
* Leather -> Clothes, ratio 3



<!-- class Factory{
    capacity:100;
    currentWorkers:20;
    money:4289482;
    profit:daily; 10% taxes go to state, 50% goes for paychecks
    PopTraits: {
        happiness, productivity, money
    }
}

money:100
kupuva neshto - 20lv
money:80
proizvejda, prodava -120lv
money: 200

balance: 100 - 10= 90; 90-45=45; 
razhodi 10 + 45= 55;
money:200-55=145
true profit 45
---------------------
money:145
kupuva -40lv
money: 105
proizvejda -120lv
money:105+120=225
balance: 225-145=80; 80-8=72lv; 72/2=36;
razhodi: 8+36=44;
225-44=181
true profit 36
if balance <=0 raise price 0.5 -->