/**
 * Game Main Function
 */
const PlayerManager = require('./PlayerManager')

const { sTA } = require('./util/socket')

function Game () {
  let state = 'w'
  let gameInterval
  let playerManager = PlayerManager()
  let tributeToWin = 5000
  let pdt = {
    red: 100,
    green: 100,
    blue: 100
  }

  E.on('TP', ti => {
    pdt[ti] += 100
    if (pdt[ti] > tributeToWin) {
      state = 'f'
      clearInterval(gameInterval)
      sTA('ge', ti)
      playerManager = null
      E.fire('E')
    } else {
      updateTribute()
      E.fire('U', ti)
    }
  })

  const updateTribute = target => {
    const progress = Object.entries(pdt).reduce((acc, [team, tribute]) => ({ ...acc, [team]: 100 / tributeToWin * tribute }), {})
    if (target) {
      target.emit('tu', progress)
    } else {
      sTA('tu', progress)
    }
  }

  const start = () => {
    state = 'a'
    gameInterval = setInterval(GameLoop, 1000)
    sTA('gs')
  }

  const GameLoop = () => playerManager.cy()

  const join = ({ id, name, socket, coil }) => {
    if (playerManager.hP(id)) {
      playerManager.reP(id, socket)
    } else {
      playerManager.aP(id, name, socket, coil)
    }
    tributeToWin = 5000 * (Math.ceil(playerManager.gPL().length / 3))
    updateTribute(socket)

    if (state === 'w' && playerManager.gPL().length >= 3) {
      start()
    } else if (state === 'a') {
      socket.emit('gs')
    }
  }

  const getState = () => state

  return {
    hP: id => playerManager.hP(id),
    getState,
    gPL: () => playerManager.gPL(),
    start,
    join
  }
}

module.exports = Game
