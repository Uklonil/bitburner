const doc = eval("document");

let headers = [];
let values = [];

export async function main(ns) {

    const hook0 = doc.getElementById('overview-extra-hook-0');
    const hook1 = doc.getElementById('overview-extra-hook-1');

    // Removes stat on script kill
    ns.atExit(() => {
        hook0.innerText = "";
        hook1.innerText = "";
    });

    while (true) {
        try {
            // Add script income per second
            //headers.push("ScrInc");
            //values.push(ns.getScriptIncome()[0].toPrecision(5) + '/sec');
            // Add script exp gain rate per second
            //headers.push("ScrExp");
            //values.push(ns.getScriptExpGain().toPrecision(5) + '/sec');
            headers = [];
            values = [];
            createRow("Karma", (ns.heart.break()+"").split(".")[0], "#0FF");

            // Now drop it into the placeholder elements
            hook0.innerHTML = headers.join("<br>");
            hook1.innerHTML = values.join("<br>");
        } catch (err) { // This might come in handy later
            ns.tprintf("ERROR: Update Skipped: " + String(err));
        }
        await ns.sleep(1000);
    }

}

function createRow(header, value, headerColor, valueColor){
    if(typeof headerColor === "undefined"){
        headerColor = "";
    }
    if(typeof valueColor === "undefined"){
        valueColor = headerColor;
    }

    let headerSpan = "";
    let valueSpan = "";

    if(headerColor === ""){
        headers.push(`<span>${header}</span>`);
    }else{
        headers.push(`<span style="color:${headerColor}">${header}</span>`);
    }

    if(valueColor === ""){
        values.push(`${header}`);
    }else{
        values.push(`<span style="color:${valueColor}">${value}</span>`);
    }
}