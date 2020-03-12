var test = [
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2]
]
var car1 = []
var car2 = []
var addedSerie = 0

function renderParallelCoordinates (test) {
  var INACTIVE_OPACITY = 0.80
  var isDiscrete = [false, false, false, false, false, false]
  var axis_texts = ['Engine size', 'Bore', 'Stroke', 'Horse power', 'Peak rpm', 'Compression ratio']
  var data = test.slice()

  var colData = []
  var j = 0
  while (j < data[0].length) {
    colData[j] = []
    var i = 0
    while (i < data.length) {
      colData[j][i] = data[i][j]
      ++i
    }
    ++j
  }

  function exists (el) { return el != null };

  var colLimits = []
  var j = 0; var col
  while (j < colData.length) {
   	col = colData[j]
   	var filtered = col.filter(exists)
   	colLimits.push([Math.min.apply(null, filtered), Math.max.apply(null, filtered)])
    var i = 0; var val
    while (i < col.length) {
      val = col[i]
      if (exists(val)) {
        data[i][j] = colData[j][i] = (val - colLimits[j][0]) / (colLimits[j][1] - colLimits[j][0])
      }
      ++i
    }
    ++j
  }

  var _in_redraw = false

  function reposition_yaxes () {
    if (_in_redraw) { return }
    _in_redraw = true
    var ax = this.xAxis[0]
    var ex = ax.getExtremes()
    var spacing = (ax.toPixels(ex.max) - ax.toPixels(ex.min)) / (ex.max - ex.min)
    for (var i = 1; i < this.yAxis.length; ++i) { this.yAxis[i].update({ offset: -(i - 1) * spacing }, false) }
    this.redraw(false)
    _in_redraw = false
  }

  $(function () {
   	function labels_formatter (col) {
       	return {
         	reserveSpace: false,
        x: -3,
         	formatter: function () {
          var value = this.value * (colLimits[col][1] - colLimits[col][0]) + colLimits[col][0]
          return isDiscrete[col][Math.round(value)] || Highcharts.numberFormat(value, 2)
        }
      }
    }

    Highcharts.setOptions({
       	chart: {
        zoomType: 'y',
        alignTicks: false,
        events: { redraw: reposition_yaxes }
      },
      tooltip: {
        shared: false,
        followPointer: true,
        formatter: function () {
          if (this.series.color == 'transparent') { return false }
         	var str = []
          var yAxis = this.series.chart.yAxis
          var data = this.series.data
          var i = 0; var value
          while (i < data.length) {
            value = '—'
            if (data[i] && !data[i].isNull) {
              value = data[i].y * (colLimits[i][1] - colLimits[i][0]) + colLimits[i][0]
              if (isDiscrete[i]) {
                value = isDiscrete[i][value]
              }
            }
            str.push('<b>' + yAxis[i + 1].userOptions.title.text + ':</b> ' + value)
            ++i
          }
          return str.join('<br>')
        }
      },
      legend: { enabled: false },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: { hover: { enabled: false } }
          },
          events: {
            mouseOver: function () {
              this.group.toFront()
              this.group.attr('opacity', 1)
              this.chart.tooltip.refresh(this.data[0])
            },
            mouseOut: function () { this.group.attr('opacity', INACTIVE_OPACITY) }
          },
          states: {
           	hover: { lineWidthPlus: 2 }
          }
        },
        line: { lineWidth: 4 }
      },
      xAxis: {
        visible: false,
        maxPadding: 0,
        minPadding: 0,
        max: colData.length - 1
      },
      yAxis: {
        lineWidth: 1,
        lineColor: 'black',
        max: 1,
        min: 0,
        gridLineWidth: 0,
   			title: {
          align: 'high',
          rotation: 0,
          y: -10,
          style: { fontWeight: 'bold' }
        }
      }
    })

    $('#parallelCoordinates').highcharts({
      chart: { type: 'line' },
      title: { text: 'Engines' },
      credits: { enabled: false },
      exporting: { enabled: false },
      yAxis: [{ visible: false }, {
        title: { text: axis_texts[0] },
        labels: labels_formatter(0)
      }, {
        title: { text: axis_texts[1] },
        labels: labels_formatter(1)
      }, {
        title: { text: axis_texts[2] },
        labels: labels_formatter(2)
      }, {
        title: { text: axis_texts[3] },
        labels: labels_formatter(3)
      }, {
      	title: { text: axis_texts[4] },
        labels: labels_formatter(4)
      }, {
        title: { text: axis_texts[5] },
        labels: labels_formatter(5)
      }],
      series: [
        {
          color: 'transparent',
          data: colData[0],
          yAxis: 1
        }, {
          color: 'transparent',
          data: colData[1],
          yAxis: 2
        }, {
          color: 'transparent',
          data: colData[2],
          yAxis: 3
        }, {
          color: 'transparent',
          data: colData[3],
          yAxis: 4
        }, {
          color: 'transparent',
          data: colData[4],
          yAxis: 5
        }, {
          color: 'transparent',
          data: colData[5],
          yAxis: 6
        },
        {
          data: data[0]
        }, {
          data: data[1]
        }]
    }, function (chart) {
      chart.redraw()
      chart.redraw()

      $('.highcharts-yaxis-title').each(function (i) {
        chart.yAxis[i + 1].update({ title: { offset: -this.getBBox().width / 2 } }, false)
      })

      $.each(chart.series, function (i, series) { series.graph.attr('opacity', INACTIVE_OPACITY) })
      chart.redraw()
    })
  })
}

function setParallelCoordinatesSerieData (serieData) {
  test = [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3, 3]
  ]

  test[2] = carEngineAvgValues()

  if (car1.length === 0) {
    globalObj.car1 = serieData.slice()
  } else if (car2.length === 0) {
    globalObj.car2 = serieData.slice()
    test[0] = globalObj.car1
    test[1] = globalObj.car2
    renderParallelCoordinates(test)
    var x = document.getElementById('parallelCoordinates')
    x.style.display = 'block'
  } else {
    test[0] = globalObj.car1
    test[1] = globalObj.car2
  }
}

function reset () {
  car1 = []
  car2 = []
  var x = document.getElementById('parallelCoordinates')
  x.style.display = 'none'
  document.getElementById('parallel-legend').innerHTML = '<b></b>'
}

function setParallelCoordinatesSerie (index) {
  var carEngineSerie = EngineSeries(index)
  if (car1.length === 0 || car2.length === 0) {
    if (car1.length === 0) {
      populateLegend(parsedData[index][2], parsedData[index][25], '#7EB5EC')
    } else if (car2.length === 0) {
      populateLegend(parsedData[index][2], parsedData[index][25], '#47474C')
    }
  }
  setParallelCoordinatesSerieData(carEngineSerie)
}

function populateLegend (carBrand, price, color) {
  var html = document.getElementById('parallel-legend').innerHTML
  var string = '<b>'
  string += '<font color=' + color + '>' + carBrand + ' - ' + price + ' $' + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>'
  string += '</b>'
  document.getElementById('parallel-legend').innerHTML = html + string
}
