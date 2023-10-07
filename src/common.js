export const settings = {
  minSecurityLevelOffset: 1,
  maxMoneyMultiplayer: 0.9,
  minSecurityWeight: 100,
  mapRefreshInterval: 24 * 60 * 60 * 1000,
  keys: {
    serverMap: 'BB_SERVER_MAP',
    hackTarget: 'BB_HACK_TARGET',
    action: 'BB_ACTION',
    crimesStop: 'BB_CRIMES_STOP',
    buyEquipment: 'BB_BUY_EQUIPMENT',
    doAscension: 'BB_DO_ASCENSION',
    strAscMultHardLimit: 'BB_STR_ASC_MULT_HARD_LIMIT',
    equipmentList: 'BB_EQUIPMENT_LIST',
    augumentationList: 'BB_AUGUMENTATION_LIST',

  },
  crimes: [
    'shoplift',
    'rob store',
    'mug',
    'larceny',
    'deal drugs',
    'bond forgery',
    'traffick arms',
    'homicide',
    'grand theft auto',
    'kidnap',
    'assassinate',
    'heist',
  ],
  gangMemberNamesList : [
    'Darth Vader',
    'Joker',
    'Two-Face',
    'Warden Norton',
    'Hannibal Lecter',
    'Sauron',
    'Bane',
    'Tyler Durden',
    'Agent Smith',
    'Gollum',
    'Vincent Vega',
    'Saruman',
    'Loki',
    'Vito Corleone',
    'Balrog',
    'Palpatine',
    'Michael Corleone',
    'Talia al Ghul',
    'John Doe',
    'Scarecrow',
    'Commodus',
    'Jabba the Hutt',
    'Scar',
    'Grand Moff Tarkin',
    'Boba Fett',
    'Thanos',
    'Terminator',
    'Frank Costello',
    'Hector Barbossa',
    'Xenomorph',
  ],
  equipmentTypes : [
    'Weapon',
    'Armor',
    'Vehicle',
    'Rootkit',
    'Augmentation'],
  hackPrograms : [
    'BruteSSH.exe',
    'FTPCrack.exe',
    'relaySMTP.exe',
    'HTTPWorm.exe',
    'SQLInject.exe'
  ],
  hackScripts : [
    'hack.js',
    'grow.js',
    'weaken.js'
  ],
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

export async function main(ns) {
  return {
    settings,
    getItem,
    setItem,
    localeHHMMSS,
    getPlayerDetails,
    convertMSToHHMMSS,
    createUUID,
    setTextColor
  }
}
