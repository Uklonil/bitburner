import { keys, crimes } from '/common/settings.js'
import { getItem, setItem, localeHHMMSS} from '/common/common.js'

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting getCrimesData2.js`)

  const scriptToRunAfter = ns.args[0] || 'commitCrime.js'

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const crimesCache = getItem(keys.crimes) || {}
  const crimesArray = {}

  crimes.map((crime) => {
    const stats = ns.singularity.getCrimeStats(crime)

    crimesArray[crime] = { ...crimesCache[crime], stats }
  })

  setItem(keys.crimes, crimesArray)

  if (scriptToRunAfter) {
    ns.tprint(`[${localeHHMMSS()}] Spawning ${scriptToRunAfter}`)
    ns.spawn(scriptToRunAfter, 1)
  }
}
