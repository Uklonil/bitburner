import { keys } from "/common/settings.js"
import { getItem, localeHHMMSS, setTextColor } from '/common/common.js'
import { hackItOut } from "/helpers/hackHelper.js";

export async function main(ns) {
    getItem(keys.serverMap).forEach((server) => {
        ns.tprint(`${localeHHMMSS} - trying to root ${server.host}`);
        try{
            hackItOut(ns, server);
            ns.tprint(`${setTextColor(0,0,255)}[${localeHHMMSS()}] - Hacked ${server.host}`);
        }catch(e){
            ns.tprint(`${setTextColor(255,0,0)}[${localeHHMMSS()}] - Error hacking ${server.host}`);
        }
    })
}