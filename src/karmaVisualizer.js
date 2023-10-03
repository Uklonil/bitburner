import { setTextColor } from 'common.js'
const doc = eval("document");

export async function main(ns) {

    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');
    ns.atExit(() => { hook0.innerText = ""; hook1.innerText = "" }); // Removes stat on script kill
    while (true) {
        try {
            const headers = []
            const values = [];
            // Add script income per second
            //headers.push("ScrInc");
            //values.push(ns.getScriptIncome()[0].toPrecision(5) + '/sec');
            // Add script exp gain rate per second
            //headers.push("ScrExp");
            //values.push(ns.getScriptExpGain().toPrecision(5) + '/sec');

            //headers.push(`${setTextColor(50,50,50)}Karma`);
            //values.push(ns.heart.break());

            // Now drop it into the placeholder elements
            hook0.innerText = headers.join(" \n");
            hook1.innerText = values.join("\n");
        } catch (err) { // This might come in handy later
            ns.tprintf("ERROR: Update Skipped: " + String(err));
        }
        await ns.sleep(1000);
    }

}