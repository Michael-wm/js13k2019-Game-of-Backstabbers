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
    this.members.sort((a, b) => {
      const playerA = this.gm(a.id)
      const playerB = this.gm(b.id)

      if (!playerB || !playerA || !playerA.active) return 1
      else if (!playerB.active) return -1
      const level = playerB.level - playerA.level
      return level !== 0 ? level : playerB.pdt - playerA.pdt
    })
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
