/**
 * TeamManager Singleton
 */
const Team = require('./Team')

const TeamManager = () => {
  const teams = {}

  E.on('PL', player => teams[player.ti].update())
  E.on('PR', player => teams[player.ti].update())
  E.on('U', ti => teams[ti].update())

  const at = ti => (teams[ti] = new Team(ti))

  const gt = ti => teams[ti]

  const gwt = () => Object.values(teams).sort((a, b) => a.members.length - b.members.length)[0]

  const gts = () => Object.entries(teams).reduce((acc, [id, team]) => ({ ...acc, [id]: team.gts() }), {})

  return { at, gt, gwt, gts }
}

module.exports = TeamManager
