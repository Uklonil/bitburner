import { keys, crimes } from '/common/settings.js'
import { getItem, setItem, localeHHMMSS} from '/common/common.js'

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting getCrimesData.js`)

  const scriptToRunAfter = ns.args[0] || 'getCrimesData2.js'

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const crimesCache = getItem(keys.crimes) || {}
  const crimesArray = {}

  crimes.map((crime) => {
    const chance = ns.singularity.getCrimeChance(crime)

    crimesArray[crime] = { ...crimesCache[crime], chance }
  })

  setItem(keys.crimes, crimesArray)

  if (scriptToRunAfter) {
    ns.tprint(`[${localeHHMMSS()}] Spawning ${scriptToRunAfter}`)
    ns.spawn(scriptToRunAfter, 1)
  }
}
