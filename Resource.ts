import neededResource from "./NeededResource";

export default class Resource{
    name:string;
    independent:boolean;//independant means it is not created from other resources (example: grain)
    neededResources:neededResource[];
    price:number;
    constructor(){};
}