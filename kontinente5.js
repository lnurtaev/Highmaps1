var data1 = [
    {'hc-key': 'eu', value: 0, color: '#909090'}, 
    {'hc-key': 'oc', value: 1, color: '#F5F5F5'}, 
    {'hc-key': 'af', value: 2, color: "#F5F5F5"}, 
    {'hc-key': 'as', value: 3, color: "#BEBEBE"}, 
    {'hc-key': 'na', value: 4, color: "#F5F5F5"}, 
    {'hc-key': 'sa', value: 5, color: "#DCDCDC"}, 
];

var data =         // Use id instead of name to allow for referencing points later using
          [{
            id: 'Europe',
            name: "Europa",
            value: 0,
            desc: "Europa <br> <b>CO2-Import: 130,6 <br> CO2-Export: 128,5 </b>",
            lat: 54.9,
            lon: 25.316667
        }, {
            id: "urn:ogc:def:crs:EPSG:54003",
            name: "Deutschland",
            value: 1,
            lat: 51.1069790, 
            lon: 10.385777
        }, {
            id: 'North America',
            name: "Nordamerika",
            value: 2,
            desc: "Nordamerika <br> <b>CO2-Import: 14,9 <br> CO2-Export: 22,7 </b>",
            lat: 48.354433,
            lon: -99.998094
        }, {
            id: 'Africa',
            name: "Afrika",
            value: 3,
            desc: "Afrika <br> <b>CO2-Import: 14,9 <br> CO2-Export: 22,7 </b>",
            lat: 2.07035,
            lon: 17.05291
        }, {
            id: 'Oceania',
            name: "Ozeanien",
            value: 4,
            desc: "Ozeanien <br> <b>CO2-Import: 3,8 <br> CO2-Export: 3,9 </b>",
            lat: -25.7328874,
            lon: 134.490999
        }, {
            id: 'South America',
            name: "Südamerika",
            value: 5,
            desc: "Südamerika <br> <b>CO2-Import: 4,3 <br> CO2-Export: 4,0 </b>",
            lat: -15.6006,
            lon: -56.1004
        }, {
            id: 'Asia',
            name: "Asien",
            value: 6,
            desc: "Asien <br> <b>CO2-Import: 88,2 <br> CO2-Export: 48,4 </b>",
            lat: 51.725,
            lon: 94.443611
        }
        ]

var chart = Highcharts.mapChart('container', {

    title: {
        text: 'CO2-Exporte und -Importe '
    },

    subtitle: {
        text: 'rot: Mio. t CO2-Importe aus Deutschland, blau: Mio. t CO2-Exporte nach Deutschland'
    },

    legend: {
        align: 'left',
        layout: 'vertical',
        floating: true
    },

    mapNavigation: {
        enabled: true
    },

    tooltip: {
        formatter: function () {
            return this.point.name;
        }
    },

    plotOptions: {
        series: {
            marker: {
                fillColor: '#FFFFFF',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[1]
            }
        }
    },

    series: [{
        // Use the gb-all map with no data as a basemap
        mapData: Highcharts.maps['custom/world-continents'],
        name: 'Basemap',
        data: data1,
        borderColor: '#707070',
        nullColor: 'rgba(200, 200, 200, 0.3)',
        showInLegend: false
    }, {
        name: 'Separators',
        type: 'mapline',
        data: Highcharts.geojson(Highcharts.maps['custom/world-continents'], 'mapline'),
        color: '#707070',
        showInLegend: false,
        enableMouseTracking: false
    }, {
        // Specify cities using lat/lon
        type: 'mappoint',
        name: 'Kontinente',
        dataLabels: {
            format: '{point.name}'
        },
        showInLegend: false,

        // Use id instead of name to allow for referencing points later using
        // chart.get
     data: data
    }]

});

// Function to return an SVG path between two points, with an arc
function pointsToPath(from, to, invertArc) {
    var arcPointX = (from.x + to.x) / (invertArc ? 2.4 : 1.6),
        arcPointY = (from.y + to.y) / (invertArc ? 2.4 : 1.6);
    return 'M' + from.x + ',' + from.y + 'Q' + arcPointX + ' ' + arcPointY +
            ',' + to.x + ' ' + to.y;
}


function pointsToPath2(from, to, invertArc) {
    var arcPointX = (from.x + to.x) / (invertArc ? 2.7 : 1.7),
        arcPointY = (from.y + to.y) / (invertArc ? 2.7 : 1.7);
    return 'M' + from.x + ',' + from.y + 'Q' + arcPointX + ' ' + arcPointY +
            ',' + to.x + ' ' + to.y;
}

var germanyPoint = chart.get('urn:ogc:def:crs:EPSG:54003');
var europePoint = chart.get('Europe');
var northamericaPoint = chart.get('North America');
var africaPoint = chart.get('Africa');
var oceaniaPoint = chart.get('Oceania');
var southamericaPoint = chart.get('South America');
var asiaPoint = chart.get('Asia');

// Add a series of lines for London
chart.addSeries({
    name: 'Mio. t CO2-Importe aus Deutschland',
    type: 'mapline',
    lineWidth: 6,
    color: "#E3A192",
    data: [{
        name: 'Deutschland - Europa<br><b>Import: 130,1</b>',
        path: pointsToPath(germanyPoint, chart.get('Europe'))
    }, 
    	{
        name: 'Deutschland - Nordamerika<br><b>Import: 22,7</b>',
        path: pointsToPath(germanyPoint, chart.get('North America'))
    }, {
        name: 'Deutschland - Afrika<br><b>Import: 1,9</b>',
        path: pointsToPath(germanyPoint, chart.get('Africa'), true)
    }, {
        name: 'Deutschland - Ozeanien<br><b>Import: 1,7</b>',
        path: pointsToPath(germanyPoint, chart.get('Oceania'))
    }, {
        name: 'Deutschland - Südamerika<br><b>Import: 4,0</b>',
        path: pointsToPath(germanyPoint, chart.get('South America'), true)
    }, {
        name: 'Deutschland - Asien<br><b>Import: 51,1</b>',
        path: pointsToPath(germanyPoint, chart.get('Asia'), true)
    }]
});



chart.addSeries({
    name: 'Mio. t CO2-Exporte nach Deutschland',
    type: 'mapline',
    lineWidth: 6,
    color: "#8CCCFF",
    data: [{
        name: 'Deutschland - Europa<br><b>Export: 126,8</b>',
        path: pointsToPath2(europePoint, chart.get('urn:ogc:def:crs:EPSG:54003'))
    }, 
    {
        name: 'Deutschland - Nordamerika<br><b>Export: 14,9</b>',
        path: pointsToPath2(northamericaPoint, chart.get('urn:ogc:def:crs:EPSG:54003'))
    }, {
        name: 'Deutschland - Afrika<br><b>Export: 5,7</b>',
        path: pointsToPath2(africaPoint, chart.get('urn:ogc:def:crs:EPSG:54003'), true)
    }, {
        name: 'Deutschland - Ozeanian<br><b>Export: 0,7</b>',
        path: pointsToPath2(oceaniaPoint, chart.get('urn:ogc:def:crs:EPSG:54003'))
    }, {
        name: 'Deutschland - Südamerika<br><b>Export: 4,3</b>',
        path: pointsToPath2(southamericaPoint, chart.get('urn:ogc:def:crs:EPSG:54003'), true)
    }, {
        name: 'Deutschland - Asien<br><b>Export: 93,0</b>',
        path: pointsToPath2(asiaPoint, chart.get('urn:ogc:def:crs:EPSG:54003'), true)
    }]
});
