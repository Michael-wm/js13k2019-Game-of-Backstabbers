import { fieldSVG } from '../assets/svg'
import { COLORS } from './util/globals'
import Field from './Field'

const FieldRenderer = (() => {
  let fa = []
  let fo = {}

  let fpr = 300
  let _self = true
  let color = COLORS['green']
  let purchaseBlocked = false
  let _socket
  let _attack = false

  const iF = (team, self, { fAr, fO }) => {
    color = COLORS[team]
    fa = fAr
    fo = {}
    _self = self
    _attack = false
    byId('G').className = team
    generateFieldsFromObj(fO)
    drawFields()
  }

  const sU = id => (event, additional) => _socket.emit(event, id, additional)

  const generateFieldsFromObj = fO => {
    Object.entries(fO).forEach(([id, field]) => {
      if (fo.hasOwnProperty(id)) {
        fo[id].update(field)
      } else {
        fo[id] = new Field({ ...field, _self, sU: sU(id) })
      }
    })
  }

  const hasAdjacentField = (y, x) => {
    const neighbors = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1], ...(y % 2 ? [[y - 1, x - 1], [y + 1, x - 1]] : [[y - 1, x + 1], [y + 1, x + 1]])]
    return neighbors.map(([y, x]) => {
      if (fa[y]) {
        const id = fa[y][x]
        return id && id !== 'blocked' ? fo[id].type !== 'empty' : false
      }
      return false
    }).some(n => n)
  }

  const drawFields = () => {
    const fieldsDom = byId('F')
    fieldsDom.innerHTML = ''
    for (let y = 0; y < fa.length; y++) {
      let fs = ''
      for (let x = 0; x < fa[y].length; x++) {
        const fId = fa[y][x]
        if (fId === 'blocked') {
          fs += drawEmptyField()
        } else {
          const f = fo[fId]
          if (f.type === 'empty' && (!_self || !hasAdjacentField(y, x))) {
            fs += drawEmptyField()
          } else {
            fs += drawField(f.getCfg())
          }
        }
      }
      // insert field string and add event listeners
      fieldsDom.insertAdjacentHTML('beforeend', `<div class="row">${fs}</div>`)
      Array.from(document.querySelectorAll('[data-field-id]')).forEach(field => {
        const f = fo[field.dataset.fieldId]
        f.sF(field)
        if (_attack && fV(f.type) <= 2) {
          field.style.opacity = '.25'
          field.style.pointerEvents = 'none'
        } else {
          field.style.opacity = ''
          field.style.pointerEvents = 'initial'
        }
        field.addEventListener('click', handleClick)
      })
    }
  }

  const handleClick = e => fo[e.currentTarget.dataset.fieldId].click(_attack)

  const drawField = fieldCfg => fieldSVG({ color, fpr, purchaseBlocked, ...fieldCfg })

  const drawEmptyField = () => `<div class="field empty"></div>`

  const bFP = block => {
    if (purchaseBlocked !== block) {
      purchaseBlocked = block
      drawFields()
    }
  }

  return {
    am: () => {
      if (_attack) {
        byId('G').classList.remove('-at')
      } else {
        byId('G').classList.add('-at')
      }
      _attack = !_attack
      drawFields()
    },
    iF,
    bFP,
    sFP: p => (fpr = p),
    s: s => {
      _socket = s
      s.on('fu', fieldObj => {
        if (fieldObj && fo.hasOwnProperty(fieldObj.id)) {
          fo[fieldObj.id].update(fieldObj)
          drawFields()
        }
      })
    }
  }
})()

export default FieldRenderer
