/**
 * Fields Class
 */

const typeArray = ['village', 'farm', 'mine', 'village', 'farm', 'mine', 'village', 'farm', 'plain', 'plain', 'plain', 'plain']

class Field {
  constructor ({ id, type }) {
    this.id = id
    this.type = type
    this.level = fV(type) > 2 ? 1 : 0
    this.ths = 10 + 2
    this.att = 0
  }

  gs () {
    const { id, type, level, ths, att } = this
    return { id, type, level, ths, att }
  }

  gt () {
    const i = Math.floor(Math.random() * typeArray.length)
    this.type = typeArray[i] || 'plain'
    typeArray[i] = 'plain'
    this.level = this.type === 'plain' ? 0 : 1
  }
}

class Fields {
  constructor ({ id }) {
    this.id = id // playerId
    this.fO = {}
    this.fAr = []
  }

  cif () {
    const fieldsTpl = [
      ['blocked', 'blocked', 'blocked', 'village', 'empty', 'empty'],
      ['blocked', 'blocked', 'plain', 'plain', 'farm', 'empty'],
      ['empty', 'empty', 'mine', 'empty', 'empty', 'empty'],
      ['blocked', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['blocked', 'empty', 'empty', 'empty', 'empty', 'blocked']
    ]
    this.fAr = fieldsTpl

    for (let y = 0; y < fieldsTpl.length; y++) {
      for (let x = 0; x < fieldsTpl[y].length; x++) {
        const type = this.fAr[y][x]
        if (fV(type) > 0) {
          const id = gId()
          this.fO[id] = new Field({ id, type })
          this.fAr[y][x] = id
        }
      }
    }

    return this.gfc()
  }

  gfc () {
    return {
      fAr: this.fAr,
      fO: Object.entries(this.fO).reduce((acc, [id, field]) => ({ ...acc, [id]: field.gs() }), {})
    }
  }

  gf (fieldId) {
    return this.fO[fieldId]
  }

  bf (fieldId) {
    const field = this.gf(fieldId)
    field.gt()
    return field.gs()
  }

  lf (fieldId, level) {
    const field = this.gf(fieldId)
    if (field) {
      field.level += level
      if (field.level === 0) {
        field.level = 1
      }
      field.ths = 10 + (field.level * field.level)
      return field.gs()
    } else {
      console.log('No Field! ' + fieldId)
    }
  }

  gft (type) {
    return Object.values(this.fO).filter(f => f.type === type && !f.att)
  }

  dpl () {
    return Object.values(this.fO).reduce((acc, { level }) => acc + level, -2)
  }

  dh () {
    return this.gft('farm').reduce((acc, { level }) => acc + 15 + (15 * 0.2 * level), 0)
  }

  dvl () {
    return this.gft('village').reduce((acc, { level }) => acc + 8 + (level * 2), 0)
  }

  di () {
    return this.gft('mine').reduce((acc, { level }) => acc + 5 + (5 * 0.2 * level), 0)
  }
}

module.exports = Fields
