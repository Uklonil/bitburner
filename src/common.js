export const settings = {
  minSecurityLevelOffset: 1,
  maxMoneyMultiplayer: 0.9,
  minSecurityWeight: 100,
  mapRefreshInterval: 24 * 60 * 60 * 1000,
  keys: {
    serverMap: 'BB_SERVER_MAP',
    hackTarget: 'BB_HACK_TARGET',
    action: 'BB_ACTION',
  },
  homeRamReserved: 20,
  homeRamReservedBase: 20,
  homeRamExtraRamReserved: 12,
  homeRamBigMode: 64,
  maxWeakenTime: 30 * 60 * 1000,
  changes: {
    hack: 0.002,
    grow: 0.004,
    weaken: 0.05,
  },
}

export const hackPrograms = ['BruteSSH.exe', 'FTPCrack.exe', 'relaySMTP.exe', 'HTTPWorm.exe', 'SQLInject.exe']
export const hackScripts = ['hack.js', 'grow.js', 'weaken.js']

export function getItem(key) {
  let item = localStorage.getItem(key)

  return item ? JSON.parse(item) : undefined
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toLocaleTimeString()
}

export function getPlayerDetails(ns) {
  let portHacks = 0

  hackPrograms.forEach((hackProgram) => {
    if (ns.fileExists(hackProgram, 'home')) {
      portHacks += 1
    }
  })

  return {
    hackingLevel: ns.getHackingLevel(),
    portHacks,
  }
}

export function convertMSToHHMMSS(ms = 0) {
  if (ms <= 0) {
    return '00:00:00'
  }

  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toISOString().substr(11, 8)
}

export function createUUID() {
  var dt = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export async function main(ns) {
  return {
    settings,
    hackPrograms,
    hackScripts,
    getItem,
    setItem,
    localeHHMMSS,
    getPlayerDetails,
    convertMSToHHMMSS,
    createUUID
  }
}
