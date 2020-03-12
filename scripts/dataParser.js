var globalObj = (function () { return this }())

function aggregateBrandsByFuel (pData, brands) {
  var fuelBrands = []
  var counter = 0
  while (counter < brands.length) {
    fuelBrands.push([NumberOfGasCars(brands[counter]), NumberOfDieselCars(brands[counter])])
    counter++
  }
  return fuelBrands
}

function NumberOfGasCars (brand) {
  var g = 0
  var counter = 0
  while (counter < parsedData.length) {
    if (parsedData[counter][2] === brand && parsedData[counter][3] === 'gas') {
      g++
    }
    counter++
  }
  return g
}

function totalGasCars (gSeries) { return gSeries.reduce((a, b) => a + b, 0) }

function NumberOfDieselCars (brand) {
  var d = 0
  var i = 0
  while (i < parsedData.length) {
    if (parsedData[i][2] === brand && parsedData[i][3] === 'diesel') {
      d++
    }
    i++
  }
  return d
}

function SumOfDieselCars (dSeries) { return dSeries.reduce((a, b) => a + b, 0) }

function seriesCreation (pData) {
  var priceSeries = []
  pData.forEach(function (car, index) {
    if (car[0] != null && car[2] != null && car[25] != null) {
      var seriesElement = { x: 0, y: 0, brand: '', index: -1 }
      seriesElement.x = Number(car[25])
      seriesElement.y = Number(car[0])
      seriesElement.brand = car[2]
      seriesElement.index = index // 1st row on original dataset -> args !!
      priceSeries.push(seriesElement)
    }
  })
  return priceSeries
}

function EngineSeries (index) {
  var series = []
  series.push(Number(parsedData[index][16]))
  series.push(Number(parsedData[index][18]))
  series.push(Number(parsedData[index][19]))
  series.push(Number(parsedData[index][21]))
  series.push(Number(parsedData[index][22]))
  series.push(Number(parsedData[index][20]))
  return series
}

function carEngineAvgValues () {
  var engineAvg = []
  engineAvg.push(averageIndex(16))
  engineAvg.push(averageIndex(18))
  engineAvg.push(averageIndex(19))
  engineAvg.push(averageIndex(21))
  engineAvg.push(averageIndex(22))
  engineAvg.push(averageIndex(20))
  return engineAvg
}

function averageIndex (index) {
  var sum = 0
  var count = 0
  var i = 1
  while (i < parsedData.length) {
    if (!isNaN(parsedData[i][index])) {
      sum += Number(parsedData[i][index])
      count++
    }
    i++
  }
  return (sum / count)
}
