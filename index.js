var fs = require('fs'),
    readline = require('readline');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '192.168.100.3:9200',
  log: 'error'
});


var rd = readline.createInterface({
    input: fs.createReadStream('data.json'),
    console: false,
    terminal: false
});



var obj = [];
var c = 0;
rd.on('line', function(line) {

    var p =  JSON.parse(line);

    var logstashIndex = "";

    for (var key in p) {
        if (key === '@timestamp') {
            if (p.hasOwnProperty(key)) {
                logstashIndex = p[key];
            }
        }
    }//end for

    if (logstashIndex !== ""){
       var res = logstashIndex.substring(0, 10);
       var replacedStr = res.split('-').join('.')
       var index = "logstash-"+replacedStr;
       //console.log("Logstash Index:" + index);
    }

    obj.push({index:{ _index: index, _type: 'log'}});
    obj.push(p);

    if (obj.length > 1000){
        c++;
        console.log("Insert:" + obj.length + " - " + c);
        client.bulk({
          body: obj
        }, function (err, resp) {
           if(err) {console.log(err);}
        });
        obj = [];
    }
});

rd.on('close', function() {
    console.log("closing...");
    client.bulk({
          body: obj
    }, function (err, resp) {
        if (err){
            console.log(err);
        }
    });
});

                                          