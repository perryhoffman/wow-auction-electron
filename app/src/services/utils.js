const AUDIO_COIN = new window.Audio('electron://static/coin.ogg')
const AUDIO_ALERT = new window.Audio('electron://static/alert.ogg')

export default {
  extractMoney (amount) {
    var gold = Math.floor(amount / 10000)
    var silver = Math.floor((amount - (gold * 10000)) / 100)
    var copper = Math.floor((amount - (gold * 10000)) - (silver * 100))

    if (!silver) silver = 0
    if (!copper) copper = 0
    if (!gold) gold = 0

    return {
      gold: gold,
      silver: silver,
      copper: copper
    }
  },
  getFullAmount ({gold, silver, copper}) {
    return ((parseInt(gold) || 0) * 10000) + ((parseInt(silver) || 0) * 100) + (parseInt(copper) || 0)
  },
  playCoinSound () {
    AUDIO_COIN.play()
  },
  playAlertSound () {
    if (!AUDIO_ALERT.paused) return
    AUDIO_ALERT.play()
  }
}
