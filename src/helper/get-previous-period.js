// Function to calculate the previous period
function getPreviousPeriod(period) {
  const [month, year] = period.split('.')
  let previousMonth = parseInt(month, 10) - 1
  let previousYear = parseInt(year, 10)

  if (previousMonth === 0) {
    // If the previous month is 0, set it to December and decrement the year
    previousMonth = 12
    previousYear--
  }

  // Format the month and year as 'MM.YY'
  const formattedMonth = String(previousMonth).padStart(2, '0')
  const formattedYear = String(previousYear).padStart(2, '0')

  return `${formattedMonth}.${formattedYear}`
}

module.exports = getPreviousPeriod
