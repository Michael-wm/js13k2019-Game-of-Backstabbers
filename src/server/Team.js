/**
 * Team Class
 */

class Team {
  constructor (id) {
    this.members = []
    this.id = id
  }

  aM (player) {
    if (!this.im(player.id)) {
      this.members.push(player)
      this.update()
    }
  }

  im (playerId) {
    return this.members.some(({ id }) => playerId === id)
  }

  update () {
    /*this.members.sort((a, b) => {
      const pA = this.gm(a.id)
      const pB = this.gm(b.id)

      if (!pA || !pA.active) return 1
      else if (!pB || !pB.active) return -1
      const level = pB.level - pA.level
      return level !== 0 ? level : pB.pdt - pA.pdt
    })*/
    E.fire('TU')
  }

  gm (memberId) {
    return this.members.find(({ id }) => memberId === id)
  }

  gts () {
    return this.members.map(m => m.gps())
  }
}

module.exports = Team
