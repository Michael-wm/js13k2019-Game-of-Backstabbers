/**
 * Client
 */

import { HOUSE_NAMES, HOUSE_WORDS } from './client/util/globals'
import FieldRenderer from './client/FieldRenderer'
import { crown, sigil, bg, villager, swords } from './assets/svg'

global.byId = id => document.getElementById(id)
global.byC = c => document.getElementsByClassName(c)

;(function () {
  let socket
  let teamList
  let teamSelection
  let playerId
  let playerName
  let house
  let ti
  let activeTeam
  let activePlayer
  let teamData

  let progressRef
  let statsRef
  let modalRef
  let teamRef
  let gameRef
  let prodDialogRef
  let tributeBtnRef
  let sigilRef
  let attackRef

  let nameInput
  let pn
  let joinBtn
  let recruitBtn

  let statNames = [
    ['fp', 'Food Production'],
    ['fc', 'Food Consumption'],
    ['gp', 'Tax Revenue'],
    ['ip', 'Iron Production']
  ]

  const logo = `<div style="font-size:48px;position:relative;width:500px;height:150px;transform:translateX(-42px)"><div><div style="display:inline-block;" class="word">GAME</div><div style="display:inline-block;font-size:32px;margin-left:8px;transform:translateY(-6px);">OF</div></div><svg style="position:absolute;top:50px;transform:translateX(-50%)" width="474" height="58"><path d="M74 19h370l30 10" fill="none" stroke="#000"/><path d="M474 29H74v10h370l30-10z" fill="#ebebeb"/><path d="M74 0l-4 4v50l4 4V0z"/><path d="M21 25l-4 4 4 4h50v-8H21zM8.5 20.5L0 29l8.5 8.5L17 29l-8.5-8.5z"/></svg><div style="bottom: 11px;left: calc(50% + 40px);position: absolute;transform:translateX(-50%)" class="word">BACKSTABBERS</div></div>`

  /**
   * Bind Socket.IO and button events
   */
  function bind () {
    nameInput = byId('NI')
    pn = byId('pN')
    joinBtn = byId('jb')
    teamList = byId('TL')
    teamSelection = byId('TS')
    statsRef = byId('S').getElementsByClassName('sw')
    progressRef = byId('TP')
    gameRef = byId('G')
    teamRef = byId('T')
    modalRef = byId('M')
    prodDialogRef = byId('BD')
    tributeBtnRef = byId('TB')
    sigilRef = byId('SI')
    recruitBtn = byId('rbt')
    attackRef = byId('A')

    tributeBtnRef.addEventListener('click', () => socket.emit('tp'))
    recruitBtn.addEventListener('click', () => socket.emit('rs', playerId))
    attackRef.addEventListener('click', () => FieldRenderer.am())
    nameInput.insertAdjacentHTML('afterbegin', logo)
    document.querySelector('.-v').innerHTML = villager()
    document.querySelector('.-so').innerHTML = villager(true)

    gameRef.insertAdjacentHTML('afterbegin', `<div id="SDS"><div style="width:32px;margin-right:20px">${villager(true)}</div><div class="value"></div></div>`)

    byId('B').addEventListener('click', e => {
      if (e.currentTarget.className === '-a') {
        uFP()
      } else {
        teamRef.classList.add('-wm')
        gameRef.classList.add('-wm')
        modalRef.classList.add('-vs')
      }
    })

    modalRef.addEventListener('click', e => {
      if (e.target.id === 'M' || e.target.className === 'close') {
        modalRef.classList.remove('-vs')
        gameRef.classList.remove('-wm')
        teamRef.classList.remove('-wm')
      }
    })

    /**
     * TEAM UPDATES
     */
    socket.on('ut', members => {
      teamData = members
      if (!house) {
        Object.entries(members).forEach(([id, team]) => {
          if (team.find(m => m.id === playerId.substr(0, 8))) {
            ti = id
          }
        })
        activeTeam = ti
        house = HOUSE_NAMES[ti]
        byId('TW').innerText = HOUSE_WORDS[ti]
      }
      byId('TN').innerText = 'House ' + HOUSE_NAMES[activeTeam]
      sigilRef.innerHTML = ''
      sigilRef.insertAdjacentHTML('afterbegin', sigil[activeTeam])
      // draw team members
      teamList.innerHTML = ''
      members[activeTeam].forEach(member => teamList.insertAdjacentHTML('beforeend', `<li id="${member.id}" class="tm${!member.active ? ' -i' : ''}${member.id === playerId.substr(0, 8) ? ' -se' : ''}${member.id === activePlayer || (!activePlayer && member.id === playerId.substr(0, 8)) ? ' -s' : ''}"><div class="level"><div>${member.level}</div><svg viewBox="0 0 100 140">${bg[activeTeam]}</svg></div><div class="name">${member.name}</div></li>`))
      // add click handler to members
      Array.from(byC('tm')).forEach(member => {
        member.addEventListener('click', e => {
          const { id } = e.currentTarget
          if (id === playerId.substr(0, 8)) {
            uFP()
          } else {
            sTP(id)
          }
        })
      })
      // draw other houses' sigils
      teamSelection.innerHTML = ''
      Object.keys(members).forEach(id => {
        if (id !== activeTeam) {
          teamSelection.insertAdjacentHTML('beforeend', `<div class="ts" data-ti="${id}">${sigil[id]}</div>`)
        }
      })
      Array.from(byC('ts')).forEach(teamEl => {
        teamEl.addEventListener('click', () => {
          activeTeam = teamEl.dataset.ti
          if (activeTeam === ti) {
            uFP()
          } else {
            sTP(teamData[activeTeam][0].id)
          }
        })
      })
    })

    socket.on('if', ({ team, fAr, fO, self = true }) => FieldRenderer.iF(team, self, { fO, fAr }))

    socket.on('su', stats => {
      // set stats
      Array.from(statsRef).forEach(stat => {
        const type = stat.dataset.fieldType
        stat.getElementsByClassName('value')[0].innerText = type !== 'villagers' ? stats[type] : stats[type] + '/' + stats.vl
        if (type === 'food') {
          stat.style.color = stats.fc > stats.fp ? 'red' : '#000'
        }
      })
      FieldRenderer.sFP(stats.fpr)
      FieldRenderer.bFP(stats.fpr > stats.gold)
      tributeBtnRef.className = stats.gold < 100 ? '-br' : ''
      recruitBtn.className = stats.gold < 100 || stats.iron < 100 ? '-i' : ''
      // set production dialog
      prodDialogRef.innerHTML = ''
      statNames.forEach(([key, name]) => prodDialogRef.insertAdjacentHTML('beforeend', `<div class="stat"><div>${name}</div><div>${stats[key]}</div></div>`))
      byId('SDS').querySelector('.value').innerHTML = stats.soldiers
    })

    /**
     * PROGRESS UPDATES
     */
    socket.on('tu', renderProgress)

    socket.on('connect', () => {
      playerId = window.localStorage.getItem('gob_pId')
      playerName = window.localStorage.getItem('gob_pN')
      // check if the saved playerId is registered in an active game
      fetch('/checkPlayerId', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ playerId })
      }).then(res => res.json())
        .then(isActiveUser => {
          if (isActiveUser) {
            // existing player - instantly join game
            joinGame({ playerName, playerId })
          } else {
            if (playerName) {
              pn.value = playerName
              joinBtn.className = ''
            }
            // new player - show name input
            nameInput.style.display = 'flex'
            const execute = () => {
              playerId = gId()
              joinGame({ playerName: pn.value, playerId, coil: document.monetization && document.monetization.state === 'started' })
              nameInput.style.display = 'none'
            }

            joinBtn.addEventListener('click', execute)
            pn.addEventListener('keydown', e => {
              if (e.key === 'Enter' && pn.value) execute()
            })
            pn.oninput = () => {
              pn.value = rsc(pn.value).substring(0, 15)
              if (pn.value) {
                joinBtn.className = ''
              } else {
                joinBtn.className = '-i'
              }
            }
          }
        })
    })

    socket.on('gs', () => {
      setTimeout(() => {
        gameRef.style.display = 'block'
        teamRef.classList.remove('-w')
      }, 2000)
    })

    socket.on('ge', ti => {
      gameRef.innerHTML = ''
      gameRef.insertAdjacentHTML('afterend', `<div id="R"><div class="title">The next King has been chosen!</div><div class="winner"><span class="sigil">${sigil[ti]}</span>${teamData[ti][0].name} of House ${HOUSE_NAMES[ti]}</div><div class="gs"><div>Play again?</div><button onclick="newGame()">Yes</button><button onClick="endGame()">No</button></div></div><div id="C"><div style="margin-bottom: 32px">Thank You for playing</div>${logo}<div style="margin-top: 128px">created by Michael Wolken-Möhlmann</div></div>`)
    })
  }

  function joinGame ({ playerName, playerId, coil = false }) {
    socket.emit('pj', playerName, playerId, coil)
    window.localStorage.setItem('gob_pId', playerId)
    window.localStorage.setItem('gob_pN', rsc(playerName))
  }

  function renderProgress (progress) {
    const order = Object.entries(progress).sort((a, b) => a[1] > b[1] ? -1 : 1).map(([team]) => team)
    let reorder = false

    Array.from(progressRef.getElementsByTagName('div')).forEach((bar, i) => {
      const team = bar.classList[1]
      bar.style.width = progress[team] + '%'
      if (order.indexOf(team) < i || order.indexOf(team) > i) {
        reorder = true
      }
    })
    if (reorder) {
      order.forEach(team => progressRef.insertAdjacentElement('beforeend', progressRef.getElementsByClassName(team)[0]))
    }
    byId('CN').innerHTML = crown(progress[order[0]] / 100)
  }

  function sTP (id) {
    activePlayer = id
    socket.emit('ps', id)
    byId('S').classList.add('-a')
    byId('B').classList.add('-a')
    attackRef.className = activeTeam !== ti && '-sh'
  }

  function uFP () {
    activeTeam = ti
    activePlayer = null
    socket.emit('pu')
    Array.from(byC('-a')).forEach(e => e.classList.remove('-a'))
    attackRef.className = ''
  }

  /**
   * Client module init
   */
  window.addEventListener('load', () => {
    socket = io({ upgrade: false, transports: ['websocket'] })
    bind()
    FieldRenderer.s(socket)
  }, false)
})()
