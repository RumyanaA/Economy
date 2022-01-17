import neededResource from "./NeededResource";
import Resource from "./Resource";

export class Market{
    private static resources:Map<string, Resource>=new Map<string, Resource>();
    private static stockpile:Map<string, number>=new Map<string,number>();
    public static setup(){
        let grain = new Resource();
        grain.name='GRAIN';
        grain.independent=true;
        grain.neededResources=null;
        grain.price=1;

        let bread = new Resource();
        bread.name='BREAD';
        bread.independent=false;
        let neededResGrain=new neededResource();
        neededResGrain.resource=grain;
        neededResGrain.ratio=2;
        bread.neededResources.push(neededResGrain);
        bread.price=2;

        let leather = new Resource();
        leather.name='LEATHER';
        leather.independent=true;
        leather.neededResources=null;
        leather.price=2;

        let clothes=new Resource();
        clothes.name='CLOTHES';
        clothes.independent=false;
        let neededResLeather= new neededResource();
        neededResLeather.resource=leather;
        neededResLeather.ratio=3;
        clothes.neededResources.push(neededResLeather);
        clothes.price=5;

        Market.resources.set('GRAIN', grain);
        Market.resources.set('BREAD', bread);
        Market.resources.set('LEATHER', leather);
        Market.resources.set('CLOTHES', clothes);
    }
    public increasePrice(productName:string){
        Market.resources.get(productName).price+=0.5;
    }
}