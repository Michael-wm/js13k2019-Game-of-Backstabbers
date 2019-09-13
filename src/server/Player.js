/**
 * Player Class
 */

const Fields = require('./Fields')
const { sTR } = require('./util/socket')

class PlayerEvents {
  constructor (player) {
    this.player = player
    this.socket = player.socket

    this.i()
  }

  i () {
    this.socket.on('fb', fieldId => this.player.bf(fieldId))

    this.socket.on('fl', fieldId => {
      if (this.player.sub) {
        this.player.sub.lf(fieldId, false)
      } else {
        this.player.lf(fieldId)
      }
    })

    this.socket.on('tp', () => this.player.pt())

    this.socket.on('ps', id => this.player.sTP(id))

    this.socket.on('pu', () => this.player.us())

    this.socket.on('fd', id => this.player.df(id))

    this.socket.on('fa', (id, level) => this.player.af(id, level))

    this.socket.on('rs', id => {
      if (this.player.id === id) {
        this.player.rs()
      }
    })
  }

  fire (event, payload) {
    if (event === 'FU') {
      if (!this.player.sub) {
        this.socket.emit('fu', payload)
      }
      sTR(this.player.id.substr(0, 8), 'fu', payload)
    } else {
      this.socket.emit('su', payload)
    }
  }
}

class Player {
  constructor ({ id, name, socket, ti, coil = false }) {
    this.id = id
    this.name = name
    this.socket = socket
    this.level = 1
    this.active = true
    this.ti = ti
    this.fields = new Fields({ id })
    this.e = new PlayerEvents(this)

    this.p = 0

    this.gF()

    /**
     * Game Stats
     */
    this.gold = coil ? parseInt(500 * 1.2) : 500
    this.food = coil ? parseInt(120 * 1.2) : 120
    this.iron = 0
    this.villagers = 5
    this.soldiers = 0
    this.fpr = 300
    this.vl = 8

    this.pdt = 0

    this.gp = 0
    this.fc = 0
    this.fp = 0
    this.ip = 0

    this.e.fire('SU', this.gs())
  }

  re (socket) {
    this.socket = socket
    this.active = true
    this.e = new PlayerEvents(this)
    this.sub = false
  }

  gps (obfuscate = true) {
    const { id, name, level, active, ti, pdt } = this
    return { id: obfuscate ? id.substr(0, 8) : id, name, level, active, ti, pdt }
  }

  gs () {
    const { gold, food, iron, villagers, soldiers, fpr, vl, fp, fc, ip, gp } = this
    return { gold, food, iron, villagers, soldiers, fpr, vl, fp, fc, ip, gp }
  }

  gF () {
    const fieldCfg = this.fields.cif()
    this.socket.emit('if', { team: this.ti, ...fieldCfg })
  }

  sfc () {
    E.fire('U', this.ti)
    this.socket.emit('if', { team: this.ti, ...this.fields.gfc() })
  }

  bf (fieldId) {
    if (this.gold >= this.fpr) {
      this.gold -= this.fpr
      this.fpr += Math.floor(this.fpr * 0.25)
      this.uv()
      this.e.fire('SU', this.gs())
      this.e.fire('FU', this.fields.bf(fieldId))
      E.fire('U', this.ti)
    }
  }

  lf (fieldId, up = true) {
    const fieldCfg = this.fields.lf(fieldId, up ? 1 : -1)
    this.uv()
    this.e.fire('SU', this.gs())
    this.e.fire('FU', fieldCfg)
    E.fire('U', this.ti)
  }

  pt () {
    if (this.gold >= 100) {
      this.gold -= 100
      this.pdt += 100
      E.fire('TP', this.ti)
      this.e.fire('SU', this.gs())
    }
  }

  rs () {
    if (this.gold >= 100 && this.iron >= 100) {
      this.soldiers++
      this.gold -= 100
      this.iron -= 100
      this.e.fire('SU', this.gs())
    }
  }

  cy () {
    const l = this.level
    this.uv()

    if (this.p > 5) {
      this.p = 0
      this.cR()
    } else {
      this.p++
    }

    this.e.fire('SU', this.gs())
    if (l !== this.level) {
      E.fire('U', this.ti)
    }
  }

  uv () {
    this.level = this.fields.dpl()
    this.vl = this.fields.dvl()
    this.gp = this.villagers * 3
    this.fc = this.villagers * 2
    this.fp = Math.floor(this.fields.dh())
    this.ip = Math.floor(this.fields.di())
  }

  cR () {
    const villageCount = this.fields.gft('village').length
    this.food += this.fp - this.fc
    if (this.food < 0) {
      this.food = 0
      if (this.villagers >= villageCount) {
        this.villagers -= villageCount
      }
    } else {
      if (this.villagers <= this.vl - villageCount) {
        this.villagers += villageCount
      } else if (this.villagers < this.vl) {
        this.villagers++
      }
    }
    this.gold += this.gp
    this.iron += this.ip
  }

  sTP (id) {
    this.sub = false
    this.socket.join(id)
    E.fire('PS', { id, subscriberId: this.id })
  }

  us () {
    if (this.sub) {
      this.socket.leave(this.sub.id.substr(0, 8))
      this.sub = false
      this.sfc()
    }
  }

  iS () {
    sTR(this.id.substr(0, 8), 'if', { team: this.ti, ...this.fields.gfc(), self: false })
  }

  df (id) {
    const field = this.fields.gf(id)
    if (field && field.att > 0 && this.soldiers > 0) {
      field.att--
      this.soldiers--
      this.e.fire('FU', field.gs())
      this.e.fire('SU', this.gs())
    }
  }

  af (id, level) {
    if (this.soldiers > level && this.soldiers > 0 && this.sub && this.sub.ti !== this.ti) {
      this.soldiers -= level > 0 ? level : 1
      this.sub.ra(id)
      this.e.fire('SU', this.gs())
    }
  }

  ra (id) {
    const field = this.fields.gf(id)
    field.att++
    this.e.fire('FU', field.gs())
    this.e.fire('SU', this.gs())
  }
}

module.exports = Player
