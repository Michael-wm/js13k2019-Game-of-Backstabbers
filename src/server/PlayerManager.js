/**
 * Player Manager Singleton
 */
const { sTA } = require('./util/socket')
const Player = require('./Player')
const TeamManager = require('./TeamManager')

const PlayerManager = () => {
  let playerList = {}
  let teamManager = TeamManager()

  // create the three Teams
  teamManager.at('red')
  teamManager.at('green')
  teamManager.at('blue')

  E.on('TU', () => sTA('ut', teamManager.gts()))

  E.on('PS', ({ id, subscriberId }) => {
    const player = gPO(id)
    player.iS(subscriberId)
    playerList[subscriberId].sub = player
    E.fire('TU')
  })

  const cy = () => Object.values(playerList).forEach(player => player.cy())

  const aP = (playerId, name, socket, coil) => {
    const team = teamManager.gwt()
    const player = new Player({ id: playerId, name, socket, ti: team.id, coil })
    playerList[playerId] = player
    socket.on('disconnect', () => dP(player))
    socket.join(player.ti)
    team.aM(player)
  }

  const dP = player => {
    player.active = false
    E.fire('PL', player)
  }

  const reP = (playerId, socket) => {
    const player = playerList[playerId]
    player.re(socket)
    socket.join(player.ti)
    player.sfc()
    E.fire('PR', player)
  }

  const gPO = (id) => {
    return Object.values(playerList).find(p => p.id.substr(0, 8) === id)
  }

  const hP = playerId => playerList.hasOwnProperty(playerId)

  const gPL = () => Object.values(playerList).map(m => m.gps())

  return { aP, gPL, hP, reP, cy }
}

module.exports = PlayerManager
