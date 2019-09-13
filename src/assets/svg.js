const village = color => {
  const house = `<path d="M8.4 21l-.4.4V40h15V30h4v10h15V21.4l-.4-.3-16-11.9-.6-.4-.6.4-16 11.9z" fill="${color[1]}" stroke="#fff" stroke-width="2"/><path d="M2.4 18.2l-.8.6.6.8 3 4 .6.8.8-.6L25 10.2l18.4 13.6.8.6.6-.8 3-4 .6-.8-.8-.6-22-16-.6-.4-.6.4-22 16z" fill="${color[0]}" stroke="#fff" stroke-width="2"/>`
  return `<svg class="house" width="99" height="64" viewBox="0 0 99 64" fill="none"><svg x="19" y="0">${house}</svg><svg x="2" y="23">${house}</svg><svg x="51" y="16">${house}</svg></svg>`
}

const mine = color => {
  const stone = `<path d="M22 1l17 4 8 17H2l8-12 12-9z" fill="${color[0]}" stroke="#fff" stroke-width="2"/>`
  return `<svg class="mine" width="121" height="88" fill="none"><svg x="49" y="42">${stone}</svg><svg x="72" y="48">${stone}</svg><svg x="47" y="57">${stone}</svg><path fill="${color[1]}" stroke="#fff" stroke-width="2" d="M64.3 17.7l5.7 5.6L23.3 70l-5.7-5.7z"/><path d="M35 9.2v1-1l-.3 2a10.5 10.5 0 0 1 .5.1 42 42 0 0 1 6.3 3.1c4 2.3 9.2 5.8 14 10.6l7.1 7.1a70 70 0 0 1 14 20.9l1.9-.4h-1 1a12.4 12.4 0 0 0 0-.7 36.5 36.5 0 0 0-1.7-8c-1.5-5-4.2-11.3-9.2-16.7l-7-7.1a38 38 0 0 0-23-10.7 34.2 34.2 0 0 0-2.5-.2z" fill="${color[0]}" stroke="#fff" stroke-width="2"/></svg>`
}

const farm = color => {
  const wheat = `<path d="M19 67.8l1-.2-.3-1A115 115 0 0 1 14.5 26a43.5 43.5 0 0 1 2.7-11.7v-.1l-1.7-1 .9.5-.9-.5a3.4 3.4 0 0 0-.1.3l-.3.6-1 2.4c-.7 2.1-1.6 5.4-2.2 9.8-1 8.8-1 22.3 4 41.3l.2 1 1-.3 2-.5z" fill="${color[1]}" stroke="#fff" stroke-width="2"/><path d="M13.2 14.9l-.8 1 1.3.5 4.6 1.8 1.3.5v-1.4l.5-8.4.2-3.2-2 2.6-5 6.6z" fill="${color[0]}" stroke="#fff" stroke-width="2"/><path d="M9.8 19.4l-.4 1.3h1.3l5-.1h1.4l-.4-1.3-2.6-8-1-3-.9 3-2.4 8z" fill="${color[0]}" stroke="#fff" stroke-width="2"/><path d="M12.9 20.7l-1.2.7 1.1.9 4 3 1 1 .5-1.3 3-7.9 1.1-3-2.6 1.9-7 4.7z" fill="${color[0]}" stroke="#fff" stroke-width="2"/><path d="M8.8 26.2v1.4l1.3-.4 4.8-1.6 1.3-.4-.8-1-4.8-7-1.8-2.6V26.2z" fill="${color[0]}" stroke="#fff" stroke-width="2"/><path d="M12 26.6l-1 .7 1 .9 3.8 3.2 1 .8.6-1.2 3.1-7.8 1.2-3-2.6 1.8-7 4.6z" fill="${color[0]}" stroke="#fff" stroke-width="2"/><path d="M8.4 33l.1 1.4 1.3-.6 4.5-2 1.2-.6-.9-1L9 23.9 7 21.5l.4 3.2 1 8.3z" fill="${color[0]}" stroke="#fff" stroke-width="2"/><path d="M11.3 33.6l-1.1.7 1 .9 4 3 1 .8.6-1.2 2.8-8 1.1-3-2.6 2-6.8 4.8z" fill="${color[0]}" stroke="#fff" stroke-width="2"/><path d="M14.5 37.7l1-.2v-.3l-.3-.2-6.4-5.4-2.5-2 .9 3 2.2 8.1v.3l.3.2.6-.8-.6.8a6.8 6.8 0 0 0 .5.4l1.1.6 1.5.5c.5.1 1.2.1 1.8-.2.6-.4.8-1 1-1.6l.1-1.5a10.9 10.9 0 0 0-.2-1.8l-1 .1z" fill="${color[0]}" stroke="#fff" stroke-width="2"/>`
  return `<svg class="farm" width="87" height="72"><svg x="0" y="24"><g transform="rotate(-25)">${wheat}</g></svg><svg x="28" y="5"><g>${wheat}</g></svg><svg x="35" y="3" viewBox="0 0 40 65"><g transform="rotate(20)">${wheat}</g></svg></svg>`
}

export const villager = (soldier = false) => `<svg width="100%" height="100%" viewBox="0 0 48 49" fill="none"><path d="M0 49h48s0-23-23-23S0 49 0 49z" fill="#444"/><path d="M37 16c0 8-6 14-13 14s-13-6-13-14c0-9 6-15 13-15s13 6 13 15z" fill="#fff" stroke="#777" stroke-width="2"/>${soldier ? '<path d="M24 1c-6 0-14 6-14 15h11l1 7h3l1-7h12c0-9-8-15-14-15z" fill="#777"/>' : ''}</svg>`

export const swords = `<svg class="swords" width="70" height="69" fill="none"><path d="M14 19L8 7l12 6 36 36-6 6-36-36z" fill="#C4C4C4"/><path fill="#444" d="M46 57l12-11 3 3-12 11z"/><path fill="#444" d="M53 55l3-3 11 11-3 3z"/><path d="M52 13l12-6-7 12-36 36-5-6 36-36z" fill="#fff" stroke="#444" stroke-width="2"/><path fill="#444" d="M14 45l11 12-2 2-12-11zM15 52l3 3L6 66l-3-3z"/></svg>`

const fieldType = { village, mine, farm, plain: () => '' }

export const fieldSVG = ({ color, fpr, purchaseBlocked, level, type, id, att }) => {
  const empty = type === 'empty'
  const fieldStroke = empty ? '#777' : '#444'
  const fieldFill = empty ? 'rgba(0,0,0,0)' : '#fff'
  return `<div class="field ${empty && purchaseBlocked ? '-b' : ''}" data-field-id="${id}">${level > 0 ? `<span class="level">${att || level}</span>` : ''} ${empty ? `<span class="price">${fpr}$</span>` : ''} ${empty ? '' : att ? swords : fieldType[type](color)}<svg fill="none" width="124" height="76" viewbox="0 0 124 76"><defs><radialGradient id="myGradient_${id}"><stop offset="10%" stop-color="${color[1]}" /><stop offset="100%" stop-color="#fff" /></radialGradient></defs><path class ="tile" d="M1 20L62 1l61 19v36L62 75 1 56V20z" fill="${fieldFill}" stroke="${fieldStroke}" stroke-width="2" ${empty ? 'stroke-dasharray="4"' : ''}/>${empty ? '' : `<path d="M4 21v33l58 18 59-18" stroke="${color[1]}" stroke-width="4"/>`}</svg></div>`
}

export const crown = o => `<svg width="80" height="107"><path d="M22.8 53.7L40 8.4l17.2 45.3L60 61l2.8-7.4L77 16.3V104H3V16.3l14.2 37.4L20 61l2.8-7.4z" fill="#CCB129" fill-opacity="${o}" stroke="#CCB129" stroke-width="4"/></svg>`

export const bg = {
  red: '<path d="M49 99L2 141V2h96v139L51 99l-1-1-1 1z" fill="#CCC" stroke="#663014" stroke-width="4"/>',
  green: '<circle cx="50" cy="50" r="48" fill="#CCC" stroke="#14663D" stroke-width="4"/>',
  blue: '<path d="M51 142.6l-1 .3-1-.3a60.6 60.6 0 0 1-18.9-12C19 120.4 6.9 102.4 2 70.9V2h96v68.9c-4.9 31.5-17.2 49.5-28 59.7a60.6 60.6 0 0 1-19 12z" fill="#CCC" stroke="#143066" stroke-width="4"/>'
}

const w = s => `<svg viewBox="0 0 100 150">${s}</svg>`

const r = `${bg.red}<path d="M66 68l6-2-2-2-4 4zM60 69l-5 3-2-2 7-1z" fill="#663014"/><path d="M41 37L20 48v30l21-15 14 10s-3-8 0-10c8-5 18 4 18 4l13 1S75 50 58 38l-11-5s-9-3-15-3l9 7z" fill="#663014"/><path d="M53 40c8 7 6 10 6 10l-6-6 1-1-1-3z" fill="#CCC"/>`
const g = `${bg.green}<path d="M98.4 47.6c0-20-24.8-60-68.8-40 48.8-12.8 63.6 23.2 63.6 42S80.4 87.2 54 87.2c-26.4 0-40.8-28-34.4-39.6C26 36 39.2 53.2 48 53.2c8.8 0 3.6-12.1-4-15.6-9.6-4.4-24.4-13.6-33.6 1.6-9.2 15.2 4.4 54.4 39.2 58.4 34.8 4 48.8-30 48.8-50z" fill="#14663D"/><path d="M55.6 36.1c-8.9-.2-14.8-10-21.6-7.2 2 19.2 10.4 42 20 42.4 9.6.3 23.2-24.8 23.6-41.2-8-2.4-13.1 6.3-22 6z" fill="#14663D"/><path d="M46.8 50.1c-2.9-.3-6.3-3.9-7.6-5.6.8 3.6 5.2 23.6 14.8 24.8 7.7 1 15-14.7 17.6-22.8-1.5 2-6 4.8-8.4 4.8-2.8 0-5.2-2.8-8.8-2.8-3.6 0-4 2-7.6 1.6zM56 45.5l2.3-.8-.7-1-1.7 1.8z" fill="#CCC"/><path d="M54.5 45.5l-2.4-.8.7-1 1.7 1.8z" fill="#CCC"/><path d="M48 59.7s-2.4-6-2.4-10H48c-.4 4.4 0 10 0 10zM61.6 59.7s2.4-6 2.4-10h-2.4c.4 4.4 0 10 0 10zM51.2 62.5s-1.6 3.8-1.6 6.4h1.6c-.3-2.8 0-6.4 0-6.4zM58.4 62.5s1.6 3.8 1.6 6.4h-1.6c.3-2.8 0-6.4 0-6.4z" fill="#14663D"/><path d="M43.2 36.5a39 39 0 0 1 3.2 6l-4.8-4.4 1.6-1.6zM68 37.7c-1.3 1.6-3.2 5.6-3.2 5.6l4.8-4.4-1.6-1.2z" fill="#CCC"/>`
const b = `${bg.blue}<path d="M16 69.4l-1.5-4.7C18 51.7 38.5 30 50.2 30c10.7 0 29 21.7 34.5 35.7l-1.9 3.7c1.8 8.3 6.3 13.2 5 21.7-5 31.1-37.6 45.9-37.6 45.9s-29.5-10.8-37.6-45.9c-2-8.3 1.6-13.4 3.4-21.7z" fill="#143066"/><path d="M21 86s16.5-32.3 29-32.3C62.7 53.7 75.5 86 75.5 86S59.7 75.3 48.8 75.2C37.5 75 21 86 21 86z" fill="#CCC"/><path d="M30.6 77L28 71.7l5-6.7-2.4 12zM38 71l-4-6.4 6-6.6-2 13zM43.6 65L41 56.4l8-3.4-5.4 12zM67.4 77l2.6-5.3-5-6.7 2.4 12zM61 71l4-6.4-6-6.6 2 13zM55.4 65l2.6-9-8-3 5.4 12zM14.5 64.8l3.2 5.7L29.6 45l-15 19.7z" fill="#143066"/><path d="M22.8 67l-1.5-3.2c.6-5 6.2-4.5 6.2-4.5L35 50 22.8 67zM77.2 67l1.5-3.2c-.6-5-6.2-4.5-6.2-4.5L65 50l12.2 17z" fill="#CCC"/>`

export const sigil = { red: w(r), green: w(g), blue: w(b) }
