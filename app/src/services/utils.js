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
    return (gold * 10000) + (silver * 100) + copper
  }
}
