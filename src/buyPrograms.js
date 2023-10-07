import { settings } from 'common.js'
export async function main(ns) {

    if(!await ns.serverExists("darkweb")){
        while(!await ns.purchaseTor()){
            await ns.print("Failed to purchase TOR");
            await ns.sleep(1000);
        }
    }else{
        await ns.print("You already has TOR");
    }

    for(var i = 0; i < settings.hackPrograms.length; i++){
        while(!await ns.singularity.purchaseProgram(programs[i])){
            await ns.print("Failed to purchase "+programs[i]);
            await ns.sleep(1000);
        }
    }

}