var parsedData = []
var carBrands = []

function browseClick(){
  var fileInput = document.getElementById('raw-data-input')
  fileInput.value = null
}

function browseChange(){
  var fileInput = document.getElementById('raw-data-input')
  parsedData = []
  readFile(fileInput.files[0])
}

function readFile(file){
  var fileReader = new FileReader()
  fileReader.onload = function(e){
    parsedData = parseData(e.target.result)
    firstView()
  }
  fileReader.readAsText(file)
  var filePicker = document.getElementById("filePicker")
  filePicker.style.display = 'none'
}

function parseData(rawData){
  var parsedData = []
  rawData.split("\n").forEach(function(line,index){
    if (line.length > 0) {
      var arguments = line.split(",")
      if(index != 0) parsedData.push(arguments)
    }
  })
  return parsedData
}

function firstView(){
  populateColumnPieChart()
  populateScatterPlot()
}
