function render () {
  Highcharts.chart('columnPieChart', {
    chart: { type: 'column' },
    title: { text: '' },
    xAxis: { categories: [] },
    yAxis: { min: 0, title: { text: 'Number of cars' } },
    legend: {
      align: 'left',
      x: 80,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: { // Hover effect Information
      formatter: function () {
        var s
        if (this.point.name) return false
        else s = '<b>' + this.key + '</b><br/>' + this.series.name + ':' + this.point.y + '<br/>Total:' + this.point.stackTotal
        return s
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
      }
    },
    series: [{
      name: 'Gas',
      data: [],
      color: '#ff0000'
    }, {
      name: 'Diesel',
      data: [],
      color: '#FFFF00'
    }, {
      type: 'pie',
      name: '',
      data: [{
        name: 'Gas',
        y: 0,
        color: '#ff0000'
      }, {
        name: 'Diesel',
        y: 0,
        color: '#FFFF00'
      }],
      center: [75, 89],
      size: 100,
      showInLegend: false,
      dataLabels: { enabled: false },
      enableMouseTracking: false
    }],
    credits: { enabled: false },
    exporting: { enabled: false }
  })
}

function populateColumnPieChart () {
  var columnPieChartWrapper = document.getElementById('columnPieChart')
  columnPieChartWrapper.style.display = 'block'

  render()

  var catgr = []
  var entry = 0
  while (entry < parsedData.length) {
    if (catgr.indexOf(parsedData[entry][2]) === -1) {
      catgr.push(parsedData[entry][2])
    }
    entry++
  }
  carBrands = catgr
  
  var chart1 = $('#columnPieChart').highcharts()
  chart1.xAxis[0].setCategories(carBrands)
  chart1.redraw()

  var carBrandByFuelAggregation = aggregateBrandsByFuel(parsedData, carBrands)
  var gasSerie = []
  var dieselSerie = []
  carBrandByFuelAggregation.forEach(function (couple) {
    gasSerie.push(couple[0])
    dieselSerie.push(couple[1])
  })

  var chart1 = $('#columnPieChart').highcharts()
  chart1.series[0].setData(gasSerie)
  chart1.series[1].setData(dieselSerie)

  var chart1 = $('#columnPieChart').highcharts()
  var tempS1 = chart1.series[2].data[0]
  var tempS2 = chart1.series[2].data[1]
  tempS1.y = totalGasCars(gasSerie)
  tempS2.y = SumOfDieselCars(dieselSerie)
  chart1.series[2].setData([tempS1, tempS2])
  chart1.redraw()
}


