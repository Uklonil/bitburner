import { settings, getItem, setItem, localeHHMMSS} from 'common.js'

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting karmaReducer.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  let continueCommitingCrime = true
  const crimeToCommit = 'homicide'

  while (continueCommitingCrime) {
    const crimesStop = getItem(settings.keys.crimesStop)

    if (crimesStop) {
      continueCommitingCrime = false
    } else {
      while (ns.singularity.isBusy()) {
        await ns.sleep(100)
      }

      ns.tprint(`[${localeHHMMSS()}] Commiting crime: ${crimeToCommit}`)
      ns.singularity.commitCrime(crimeToCommit)
      await ns.sleep(1000)
    }
  }

  setItem(settings.keys.crimesStop, false)
}
