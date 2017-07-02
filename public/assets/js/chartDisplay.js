const LCHART = document.getElementById("lineChart");
const MCHART = document.getElementById("mixedChart");
//let lineChart =new Chart(CHART, {
var lineChart = new Chart(LCHART, {
  type: 'bar',

  data: {
    datasets: [{
          label: 'BitCoin Price',  
          type: 'line',
          borderColor: 'blue',
          fill: false,
          data: [700, 800, 900, 1000, 800, 500, 600, 700, 800, 850, 900, 800]

        }, {


          label: 'Profit and Loss',
          borderColor: 'green',
          backgroundColor: 'green',
          borderWidth: 2,
          data: [0, 0, 330, 540]
        }, {

          label: 'My BitCoin',
          type: 'line',
          borderColor: 'green',
          backgroundColor: 'green',
          fill: false,
          borderWidth: 2,
          data: [500, , , 800, , , , , , , 800]


        }],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec']
  },

});

//-----------

var mixedChart = new Chart(MCHART, {
  type: 'line',

  data: {
    datasets: [{
          label: 'BitCoin Price',  
          type: 'line',
          borderColor: 'blue',
          fill: false,
          data: [1000, 900, 800, 750]

        }, {


          label: 'My BitCoin',
          borderColor: 'green',
          backgroundColor: 'green',
          fill: false,
          borderWidth: 2,
          data: [800, 800, 800, 540]
        

        }],
    labels: ['January', 'February', 'March', 'April']
  },

});
    