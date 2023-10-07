import * as settings from "/common/settings.js";
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

  settings.hackPrograms.forEach((hackProgram) => {
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

export function setTextColor(RED,GRN,BLU){
  return `\u001b[38;2;${RED};${GRN};${BLU}m`
}

export function serverInNetwork(hostname){
  return Object.keys(getItem(settings.keys.serverMap)).includes(hostname);
}

export async function main(ns) {
  return {
    getItem,
    setItem,
    localeHHMMSS,
    getPlayerDetails,
    convertMSToHHMMSS,
    createUUID,
    setTextColor,
    serverInNetwork
  }
}
