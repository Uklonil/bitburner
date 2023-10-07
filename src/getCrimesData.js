import { settings, getItem, setItem, localeHHMMSS} from 'common.js'

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting getCrimesData.js`)

  const scriptToRunAfter = ns.args[0] || 'getCrimesData2.js'

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const crimesCache = getItem(settings.keys.crimes) || {}
  const crimes = {}

  settings.crimes.map((crime) => {
    const chance = ns.singularity.getCrimeChance(crime)

    crimes[crime] = { ...crimesCache[crime], chance }
  })

  setItem(settings.keys.crimes, crimes)

  if (scriptToRunAfter) {
    ns.tprint(`[${localeHHMMSS()}] Spawning ${scriptToRunAfter}`)
    ns.spawn(scriptToRunAfter, 1)
  }
}
