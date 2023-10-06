import {settings} from '/common/settings.js'
import { getItem, setItem, localeHHMMSS} from '/common/common.js'

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting getCrimesData2.js`)

  const scriptToRunAfter = ns.args[0] || 'commitCrime.js'

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const crimesCache = getItem(settings.keys.crimes) || {}
  const crimes = {}

  settings.crimes.map((crime) => {
    const stats = ns.singularity.getCrimeStats(crime)

    crimes[crime] = { ...crimesCache[crime], stats }
  })

  setItem(settings.keys.crimes, crimes)

  if (scriptToRunAfter) {
    ns.tprint(`[${localeHHMMSS()}] Spawning ${scriptToRunAfter}`)
    ns.spawn(scriptToRunAfter, 1)
  }
}
