import { hackPrograms } from '/common/settings.js'
import {serverInNetwork, setTextColor} from '/common/common.js'

export async function main(ns) {

    if(!serverInNetwork("darkweb")){
        while(!await ns.singularity.purchaseTor()){
            await ns.print(`${setTextColor(255,0,0)}Failed to purchase TOR`);
            await ns.sleep(1000);
        }
    }else{
        await ns.print("You already has TOR");
    }

    for(var i = 0; i < hackPrograms.length; i++){
        while(!await ns.singularity.purchaseProgram(hackPrograms[i])){
            await ns.print("Failed to purchase "+hackPrograms[i]);
            await ns.sleep(1000);
        }
    }

    ns.spawn("/helpers/rootAll.js");

}