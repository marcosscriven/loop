var loop = (function () {

    var series = [];
    var socket;

    var options = {
      server: 'https://www.your-loop.com',
      clientIp: '127.0.0.1',
      serial: '',
      secret: ''
    };

    function init(divTag) {
      setupControls();
      setupChart(divTag);
      tryConnect();
    }

    function setupControls() {
      var gui = new dat.GUI();
      gui.remember(options);
      gui.add(options, 'serial').onFinishChange(tryConnect);
      gui.add(options, 'secret').onFinishChange(tryConnect);
    }

    function tryConnect() {
      if(options.serial && options.secret) {
        if(!socket) {
          connect();
        }
        else {
          console.log("Already connected.");
        }
      }
      else {
        console.log("Connection options not set.");
      }
    }

    function setupChart(divTag) {
      divTag.highcharts({
        chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load: function() {
              series = this.series[0];
            }
          }
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 10000
        },
        yAxis: {
          title: {
            text: 'Watts'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.series.name + '</b><br/>' +
              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
              Highcharts.numberFormat(this.y, 2);
          }
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: 'Electricity'
        }]
      });
    }

    function connect() {
      socket = io.connect(options.server);
      console.log('Connected.');
      socket.on('connect', function() {
        socket.emit("subscribe_electric_realtime", {
          serial: options.serial,
          clientIp: options.clientIp,
          secret: options.secret
        });
      });
      socket.on('electric_realtime', addData);
    }

    function addData(data) {
      console.log(data);
      var elec_watts = data.inst;
      var x = (new Date()).getTime(),
        y = elec_watts;
      series.addPoint([x, y], true, false);
    }

    return {
        init: init
    };

})();
