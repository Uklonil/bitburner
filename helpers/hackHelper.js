export function canHack(ns, serv) {
    ns.tprint(`${serv.host} - serv.requiredHackingSkill: ${serv.requiredHackingSkill} vs ${ns.getHackingLevel()}`);
    var p = serv.numOpenPortsRequired;
    if ((p >= 1) && !ns.fileExists("BruteSSH.exe", "home")) return false;
    if ((p >= 2) && !ns.fileExists("FTPCrack.exe", "home")) return false;
    if ((p >= 3) && !ns.fileExists("RelaySMTP.exe", "home")) return false;
    if ((p >= 4) && !ns.fileExists("HTTPWorm.exe", "home")) return false;
    if ((p >= 5) && !ns.fileExists("SQLInject.exe", "home")) return false;
    return true;
}

export function hackItOut(ns, serv) {
    if (!canHack(ns, serv) || serv.hasAdminRights) return false;
    var p = serv.numOpenPortsRequired;
    if (p >= 1) ns.brutessh(serv.host);
    if (p >= 2) ns.ftpcrack(serv.host);
    if (p >= 3) ns.relaysmtp(serv.host);
    if (p >= 4) ns.httpworm(serv.host);
    if (p == 5) ns.sqlinject(serv.host);
    ns.nuke(serv.host);
    return true;
}

export async function main(ns) {
    return {
        canHack,
        hackItOut
    }
}