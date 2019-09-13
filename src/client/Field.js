class Field {
  constructor ({ id, type, level, ths, _self = true, sU, att }) {
    this.id = id
    this.type = type
    this.level = level || 0
    this.ths = _self ? ths : Math.max(100 - ths, 10)
    this.self = _self

    this.clk = 0
    this.iv = null
    this.stp = 0
    this.att = att

    this.sU = sU
  }

  update ({ level, type, ths, att }) {
    this.level = level
    this.type = type
    this.ths = this.self ? ths : Math.max(100 - ths, 10)
    this.att = att
  }

  sF (fieldEl) {
    this.fieldEl = fieldEl
    this.tile = this.fieldEl.querySelector('.tile')
  }

  pL () {
    if (this.clk <= 0 || this.stp >= 5) {
      clearInterval(this.iv)
      this.iv = null
      this.clk = 0
      this.stp = 0
      this.tile.style.fill = ''
    } else if (this.clk > 0) {
      if (this.stp > 0) {
        this.clk -= parseInt(this.ths / 5)
        this.cG()
      }
      this.stp++
    }
  }

  click (attack) {
    if (attack || this.att) {
      if (this.self) {
        this.sU('fd')
      } else {
        this.sU('fa', this.att ? 0 : this.level)
      }
    } else {
      if (this.type === 'empty') {
        this.sU('fb')
      } else if (fV(this.type) > 2) {
        if (!this.self && this.level === 1) return
        this.clk++
        this.stp = 0
        this.cG()
        if (this.clk > this.ths) {
          clearInterval(this.iv)
          this.iv = null
          this.clk = 0
          this.sU('fl')
        } else if (!this.iv) {
          this.iv = setInterval(this.pL.bind(this), 1000)
        }
      }
    }
  }

  cG () {
    const mod = 100 / this.ths * this.clk
    this.tile.style.fill = 'url("#myGradient_' + this.id + '")'
    this.fieldEl.querySelector('stop').setAttribute('offset', (this.self ? mod : 100 - mod) + '%')
  }

  getCfg () {
    const { id, level, type, att } = this
    return { id, level, type, att }
  }
}

export default Field
