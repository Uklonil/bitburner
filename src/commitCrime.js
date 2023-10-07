import { settings, getItem, setItem, localeHHMMSS} from 'common.js'

function getCrimesData(ns) {
  ns.tprint(`[${localeHHMMSS()}] Spawning getCrimesData.js`)
  ns.spawn('getCrimesData.js', 1)
}

function selectCrime(crimes) {
  const crimesList = Object.keys(crimes)
  crimesList.sort((a, b) => getCrimeWeight(crimes[b]) - getCrimeWeight(crimes[a]))
  const solidChanceCrimes = crimesList.filter((crime) => crimes[crime].chance >= 0.8)
  const topCrimesList = solidChanceCrimes.length > 3 ? solidChanceCrimes : crimesList.slice(0, 2)

  let bestCrime = 'shoplift'
  let bestCrimeWeight = 0

  topCrimesList.forEach((crime) => {
    const crimeWeight = getCrimeWeight(crimes[crime])

    if (crimeWeight > bestCrimeWeight) {
      bestCrime = crime
      bestCrimeWeight = crimeWeight
    }
  })

  return bestCrime
}

function getCrimeWeight(crime){
  return crime.chance *
      (crime.stats.money / crime.stats.time) *
      ((crime.stats.intelligence_exp * 0.1 + 1) / (crime.stats.intelligence_exp * 0.1 + 2))
}

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting commitCrime.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  let continueCommitingCrime = true
  const crimes = getItem(settings.keys.crimes)

  if (!crimes) {
    getCrimesData(ns)
    return
  }

  const crimeToCommit = selectCrime(crimes)
  const endTime = new Date().getTime() + settings.intervalToRecheck

  while (continueCommitingCrime) {
    const crimesStop = getItem(settings.keys.crimesStop)

    if (crimesStop || new Date().getTime() > endTime) {
      continueCommitingCrime = false
    } else {
      while (ns.singularity.isBusy()) {
        await ns.sleep(100)
      }

      ns.tprint(`[${localeHHMMSS()}] Commiting crime: ${crimeToCommit}`)
      ns.singularity.commitCrime(crimeToCommit)
      await ns.sleep(crimes[crimeToCommit].stats.time + 5)
    }
  }

  const crimesStop = getItem(settings.keys.crimesStop)
  if (!crimesStop) {
    getCrimesData(ns)
  } else {
    setItem(settings.keys.crimesStop, false)
  }
}
