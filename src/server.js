/**
 * Server Main
 */
const Game = require('./server/Game')

class EventGenerator {
  constructor () {
    this.q = {}
    this.f = []
  }

  fire (e, p) {
    const q = this.q[e]

    if (typeof q === 'undefined') {
      return
    }
    for (let i = 0, l = q.length; i < l; i++) {
      q[i](p)
    }
    this.f[e] = true
  }

  on (e, c) {
    if (this.f[e] === true) {
      return c()
    }
    if (typeof this.q[e] === 'undefined') {
      this.q[e] = []
    }
    this.q[e].push(c)
  }
}

global.E = new EventGenerator()

let currentGame

module.exports = {

  io: (socket) => {
    if (!currentGame) {
      E = new EventGenerator()
      E.on('E', () => {
        Object.values(io.of('/').connected).forEach(socket => {
          socket.disconnect(true)
          socket = null
        })
        currentGame = null
      })
      currentGame = Game()
    }

    socket.on('pj', (name, id, coil) => currentGame.join({ name: rsc(name), id, socket, coil }))
  },

  checkPlayerId: (req, res) => {
    const { playerId } = req.body
    res.send(currentGame.hP(playerId))
  }
}
