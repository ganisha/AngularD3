app = angular.module('d3ChartDirectives', []);

// VERTICAL BAR CHART
app.directive('verticalBarChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      scope.data.forEach(function(d){
        d.x = d[xName];
        d.y = d[yName];
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var chart = d3.select("#" + attrs.id).append('svg')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(scope.data.map(function(d) { return d.x; }));
      y.domain([0, d3.max(scope.data, function(d) { return +d.y; })]);

      var xLabel = chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = chart.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      chart.selectAll(".bar")
          .data(scope.data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.x); })
          .attr("y", function(d) { return y(+d.y); })
          .attr("height", function(d) { return height - y(+d.y); })
          .attr("width", x.rangeBand());

    } 
  };
  return directiveDefinitionObject;
});

// HORIZONTAL BAR CHART
app.directive('horizontalBarChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      scope.data.forEach(function(d){
        d.x = d[xName];
        d.y = d[yName];
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var y = d3.scale.ordinal()
          .rangeRoundBands([height, 0], .1);

      var x = d3.scale.linear()
          .range([0, width]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var chart = d3.select("#" + attrs.id).append('svg')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      y.domain(scope.data.map(function(d) { return d.x; }));
      x.domain([0, d3.max(scope.data, function(d) { return +d.y; })]);

      var xLabel = chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = chart.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      chart.selectAll(".bar")
          .data(scope.data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return 0; })
          .attr("y", function(d) { return y(d.x); })
          .attr("width", function(d) { return x(+d.y); })
          .attr("height", y.rangeBand());

    } 
  };
  return directiveDefinitionObject;
});

// PIE CHART
app.directive('pieChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      x: '@',
      y: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      scope.data.forEach(function(d){
        d.x = d[xName];
        d.y = d[yName];
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;
          radius = Math.min(width, height) / 2,
          color = d3.scale.category20c();
   
      var vis = d3.select("#" + attrs.id)
          .append("svg")
          .data([scope.data])
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + radius + "," + radius + ")");

      var arc = d3.svg.arc()
          .outerRadius(radius)
          .innerRadius(0);

      var pie = d3.layout.pie()
          .value(function(d) { return d.y; });

      var arcs = vis.selectAll(".arc")
          .data(pie)
          .enter()
          .append("g")
          .attr("class", "arc");

      arcs.append("path")
          .attr("fill", function(d, i) { return color(i); } )
          .attr("d", arc);

      arcs.append("text")
          .attr("transform", function(d){
            return "translate(" + arc.centroid(d) + ")";
          })  
          .attr("text-anchor", "middle")
          .text(function(d, i) { return scope.data[i].y; })

      if(attrs.showLegend == "true") {

        var legend = vis.selectAll(".legend")
            .data(scope.data).enter()
            .append("g").attr("class", "legend")
            .attr("transform", function(d, i) {
                return "translate(0," + (i * 20) + ")";
            })

        legend.append("rect")
            .attr("x", width / 2)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return color(i); });

        legend.append("text")
            .attr("x", width / 2 - 6)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d.x; });

      }

    } 
  };
  return directiveDefinitionObject;
});

// DONUT CHART
app.directive('donutChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      x: '@',
      y: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      scope.data.forEach(function(d){
        d.x = d[xName];
        d.y = d[yName];
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;
          radius = Math.min(width, height) / 2,
          color = d3.scale.category20c();
   
      var vis = d3.select("#" + attrs.id)
          .append("svg")
          .data([scope.data])
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + radius + "," + radius + ")")

      var arc = d3.svg.arc()
          .outerRadius(radius)
          .innerRadius(radius / 2);

      var pie = d3.layout.pie()
          .value(function(d) { return d.y; });

      var arcs = vis.selectAll(".arc")
          .data(pie)
          .enter()
          .append("g")
          .attr("class", "arc");

      arcs.append("path")
          .attr("fill", function(d, i) { return color(i); } )
          .attr("d", arc);

      arcs.append("text")
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function(d, i) { return scope.data[i].y; });

      if(attrs.showLegend == "true") {

        var legend = vis.selectAll(".legend")
            .data(scope.data).enter()
            .append("g").attr("class", "legend")
            .attr("transform", function(d, i) {
                return "translate(0," + (i * 20) + ")";
            })

        legend.append("rect")
            .attr("x", width / 2)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function(d, i) { return color(i); });

        legend.append("text")
            .attr("x", width / 2 - 6)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d.x; });

      }

    } 
  };
  return directiveDefinitionObject;
});

// AREA CHART
app.directive('areaChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      focus: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      scope.data.forEach(function(d){
        d.x = d[xName];
        d.y = d[yName];
      });

      var margin = {top: 20, right: 30, bottom: 100, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var x = d3.time.scale()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(d3.time.month, 12);

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var area = d3.svg.area()
          .interpolate("monotone")
          .x(function(d) { return x(d.x); })
          .y0(height)
          .y1(function(d) { return y(d.y); });

      var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

      svg.append("defs").append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width)
          .attr("height", height);

      var focus = svg.append("g")
          .attr("class", "focus")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      scope.data.forEach(function(d) {
        d.y = +d.y;
      });

      scope.data = scope.data.sort(function(a, b){ return d3.ascending(a.x, b.x)})

      x.domain(d3.extent(scope.data, function(d) { return d.x; }));
      y.domain(d3.extent(scope.data, function(d) { return d.y; }));

      focus.append("path")
          .datum(scope.data)
          .attr("class", "area")
          .attr("d", area);

      var xLabel = focus.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = focus.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      if(attrs.focus == "true") {

        var top = attrs.height - 70 || 430;

        var margin2 = {top: 430, right: 10, bottom: 20, left: 40},
            height2 = attrs.height - margin2.top - margin2.bottom || 500 - margin2.top - margin2.bottom;

        var x2 = d3.time.scale().range([0, width]);
        var y2 = d3.scale.linear().range([height2, 0]);

        var x2Axis = d3.svg.axis().scale(x2).orient("bottom");

        var brush = d3.svg.brush()
            .x(x2)
            .on("brush", brushed);

        var area2 = d3.svg.area()
            .interpolate("monotone")
            .x(function(d) { return x2(d.x); })
            .y0(height2)
            .y1(function(d) { return y2(d.y); });

        x2.domain(x.domain());
        y2.domain(y.domain());

        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        context.append("path")
            .datum(scope.data)
            .attr("class", "area")
            .attr("d", area2);

        context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(x2Axis);

        context.append("g")
            .attr("class", "x brush")
            .call(brush)
          .selectAll("rect")
            .attr("y", -6)
            .attr("height", height2 + 7);
      }

      function brushed() {
        x.domain(brush.empty() ? x2.domain() : brush.extent());
        focus.select(".area").attr("d", area);
        focus.select(".x.axis").call(xAxis);
      }

    } 
  };
  return directiveDefinitionObject;
});

// LINE CHART
app.directive('lineChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      focus: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      scope.data.forEach(function(d){
        d.x = d[xName];
        d.y = d[yName];
      });

      var margin = {top: 20, right: 30, bottom: 100, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var x = d3.time.scale()
          .range([0, width])

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(d3.time.month, 12);

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var line = d3.svg.line()
          .interpolate("monotone")
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)

      svg.append("defs").append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width)
          .attr("height", height);

      var focus = svg.append("g")
          .attr("class", "focus")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
      scope.data.forEach(function(d) {
        d.y = +d.y;
      });

      scope.data = scope.data.sort(function(a, b){ return d3.ascending(a.x, b.x)})

      x.domain(d3.extent(scope.data, function(d) { return d.x; }));
      y.domain(d3.extent(scope.data, function(d) { return d.y; }));

      focus.append("path")
          .datum(scope.data)
          .attr("class", "line")
          .attr("d", line);

      var xLabel = focus.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = focus.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      if(attrs.focus == "true") {

        var top = attrs.height - 70 || 430;

        var margin2 = {top: 430, right: 10, bottom: 20, left: 40},
            height2 = attrs.height - margin2.top - margin2.bottom || 500 - margin2.top - margin2.bottom;

        var x2 = d3.time.scale().range([0, width]);
        var y2 = d3.scale.linear().range([height2, 0]);

        var x2Axis = d3.svg.axis().scale(x2).orient("bottom");

        var brush = d3.svg.brush()
            .x(x2)
            .on("brush", brushed);

        var line2 = d3.svg.line()
            .interpolate("monotone")
            .x(function(d) { return x2(d.x); })
            .y(function(d) { return y2(d.y); });

        x2.domain(x.domain());
        y2.domain(y.domain());

        var context = svg.append("g")
            .attr("class", "context")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        context.append("path")
            .datum(scope.data)
            .attr("class", "line")
            .attr("d", line2);

        context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(x2Axis);

        context.append("g")
            .attr("class", "x brush")
            .call(brush)
          .selectAll("rect")
            .attr("y", -6)
            .attr("height", height2 + 7);
      }

      function brushed() {
        x.domain(brush.empty() ? x2.domain() : brush.extent());
        focus.select(".line").attr("d", line);
        focus.select(".x.axis").call(xAxis);
      }

    } 
  };
  return directiveDefinitionObject;
});

// GROUPED VERTICAL BAR CHART
app.directive('groupedVerticalBarChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      key: '@',
      values: '@',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      var keyName = attrs.key;
      var valuesNames = attrs.values;
      scope.data.forEach(function(d){
        d.key = d[keyName];
        d.values = []
        d[valuesNames].forEach(function(s) {
          s.x = s[xName]
          s.y = s[yName]
          d.values.push(s)
        });
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var x0 = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var x1 = d3.scale.ordinal();

      var y = d3.scale.linear()
          .range([height, 0]);

      var color = d3.scale.category20c();

      var xAxis = d3.svg.axis()
          .scale(x0)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".2s"));

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xNames = []

      scope.data[0].values.forEach(function(d) {
        xNames.push(d.x)
      });

      x0.domain(scope.data.map(function(d) { return d.key; }));
      x1.domain(xNames).rangeRoundBands([0, x0.rangeBand()]);
      y.domain([0, d3.max(scope.data, function(d) { return d3.max(d.values, function(s) { return s.y; }); })]);

      var xLabel = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      var group = svg.selectAll(".group")
          .data(scope.data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x0(d.key) + ",0)"; });

      group.selectAll("rect")
          .data(function(d) { return d.values; })
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.x); })
          .attr("y", function(d) { return y(d.y); })
          .attr("height", function(d) { return height - y(d.y); })
          .style("fill", function(d) { return color(d.x); });

      if(attrs.showLegend == "true") {

        var legend = svg.selectAll(".legend")
            .data(xNames.slice().reverse())
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });

      }

    } 
  };
  return directiveDefinitionObject;
});

// GROUPED HORIZONTAL BAR CHART
app.directive('groupedHorizontalBarChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      key: '@',
      values: '@',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      var keyName = attrs.key;
      var valuesNames = attrs.values;
      scope.data.forEach(function(d){
        d.key = d[keyName];
        d.values = []
        d[valuesNames].forEach(function(s) {
          s.x = s[xName]
          s.y = s[yName]
          d.values.push(s)
        });
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var y0 = d3.scale.ordinal()
          .rangeRoundBands([height, 0], .1);

      var y1 = d3.scale.ordinal();

      var x = d3.scale.linear()
          .range([0, width]);

      var color = d3.scale.category20c();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.format(".2s"));

      var yAxis = d3.svg.axis()
          .scale(y0)
          .orient("left");

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var xNames = []

      scope.data[0].values.forEach(function(d) {
        xNames.push(d.x)
      });

      y0.domain(scope.data.map(function(d) { return d.key; }));
      y1.domain(xNames).rangeRoundBands([0, y0.rangeBand()]);
      x.domain([0, d3.max(scope.data, function(d) { return d3.max(d.values, function(s) { return s.y; }); })]);

      var xLabel = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      var group = svg.selectAll(".group")
          .data(scope.data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(0," + y0(d.key) + ")"; });

      group.selectAll("rect")
          .data(function(d) { return d.values; })
        .enter().append("rect")
          .attr("height", y1.rangeBand())
          .attr("y", function(d) { return y1(d.x); })
          .attr("x", function(d) { return 0; })
          .attr("width", function(d) { return x(d.y); })
          .style("fill", function(d) { return color(d.x); });

      if(attrs.showLegend == "true") {

        var legend = svg.selectAll(".legend")
            .data(xNames.slice().reverse())
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });

      }

    } 
  };
  return directiveDefinitionObject;
});

// STACKED HORIZONTAL BAR CHART
app.directive('stackedHorizontalBarChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      key: '@',
      values: '@',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      var keyName = attrs.key;
      var valuesNames = attrs.values;
      scope.data.forEach(function(d){
        d.key = d[keyName];
        d.values = []
        d[valuesNames].forEach(function(s) {
          s.x = s[xName]
          s.y = s[yName]
          d.values.push(s)
        });
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var y = d3.scale.ordinal()
          .rangeRoundBands([height, 0], .1);

      var x = d3.scale.linear()
          .rangeRound([0, width]);

      var color = d3.scale.category20c();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.format(".2s"));

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      scope.data.forEach(function(d) {
        var y0 = 0;
        d.values.forEach(function(s){
          s.y0 = y0;
          s.y1 = s.y0 + s.y;
          y0 = s.y1;
        })
        d.total = d.values[d.values.length - 1].y1;
      });

      scope.data.sort(function(a, b) { return b.total - a.total; });

      y.domain(scope.data.map(function(d) { return d.key; }));
      x.domain([0, d3.max(scope.data, function(d) { return d.total; })]);

      var xLabel = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      var group = svg.selectAll(".group")
          .data(scope.data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(0," + y(d.key) + ")"; });

      group.selectAll("rect")
          .data(function(d) { return d.values; })
        .enter().append("rect")
          .attr("height", y.rangeBand())
          .attr("x", function(d) { return x(d.y0); })
          .attr("width", function(d) { return x(d.y1) - x(d.y0); })
          .style("fill", function(d) { return color(d.x); });

      if(attrs.showLegend == "true") {

        var legend = svg.selectAll(".legend")
            .data(color.domain().slice().reverse())
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });

      }

    } 
  };
  return directiveDefinitionObject;
});

// STACKED VERTICAL BAR CHART
app.directive('stackedVerticalBarChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      key: '@',
      values: '@',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      var keyName = attrs.key;
      var valuesNames = attrs.values;
      scope.data.forEach(function(d){
        d.key = d[keyName];
        d.values = []
        d[valuesNames].forEach(function(s) {
          s.x = s[xName]
          s.y = s[yName]
          d.values.push(s)
        });
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .rangeRound([height, 0]);

      var color = d3.scale.category20c();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".2s"));

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      scope.data.forEach(function(d) {
        var y0 = 0;
        d.values.forEach(function(s){
          s.y0 = y0;
          s.y1 = s.y0 + s.y;
          y0 = s.y1;
        })
        d.total = d.values[d.values.length - 1].y1;
      });

      scope.data.sort(function(a, b) { return b.total - a.total; });

      x.domain(scope.data.map(function(d) { return d.key; }));
      y.domain([0, d3.max(scope.data, function(d) { return d.total; })]);

      var xLabel = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      var group = svg.selectAll(".group")
          .data(scope.data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x(d.key) + ",0)"; });

      group.selectAll("rect")
          .data(function(d) { return d.values; })
        .enter().append("rect")
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.y1); })
          .attr("height", function(d) { return y(d.y0) - y(d.y1); })
          .style("fill", function(d) { return color(d.x); });

      if(attrs.showLegend == "true") {

        var legend = svg.selectAll(".legend")
            .data(color.domain().slice().reverse())
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });

      }

    } 
  };
  return directiveDefinitionObject;
});

// NORMALIZED HORIZONTAL BAR CHART
app.directive('normalizedHorizontalBarChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      key: '@',
      values: '@',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      var keyName = attrs.key;
      var valuesNames = attrs.values;
      scope.data.forEach(function(d){
        d.key = d[keyName];
        d.values = []
        d[valuesNames].forEach(function(s) {
          s.x = s[xName]
          s.y = s[yName]
          d.values.push(s)
        });
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var y = d3.scale.ordinal()
          .rangeRoundBands([height, 0], .1);

      var x = d3.scale.linear()
          .rangeRound([0, width]);

      var color = d3.scale.category20c();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.format(".0%"));

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      scope.data.forEach(function(d) {
        var y0 = 0;
        d.values.forEach(function(s){
          s.y0 = y0;
          s.y1 = y0 + s.y;
          y0 = s.y1;
        })
        d.values.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
      });

      scope.data.sort(function(a, b) { return b.values[0].y1 - a.values[0].y1; });

      y.domain(scope.data.map(function(d) { return d.key; }));

      var xLabel = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      var group = svg.selectAll(".group")
          .data(scope.data)
        .enter().append("g")
          .attr("class", "group")
          .attr("transform", function(d) { return "translate(0," + y(d.key) + ")"; });

      group.selectAll("rect")
          .data(function(d) { return d.values; })
        .enter().append("rect")
          .attr("height", function(d){ return y.rangeBand(); })
          .attr("x", function(d) { return x(d.y0); })
          .attr("width", function(d) { return x(d.y1) - x(d.y0); })
          .style("fill", function(d) { return color(d.x); });

      if(attrs.showLegend == "true") {

        var legend = svg.select(".group:last-child").selectAll(".legend")
            .data(function(d) { return d.values; })
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d) { return "translate(" + x((d.y0 + d.y1) / 2) + "," + y.rangeBand() / 2 + ")"; });

        legend.append("line")
            .attr("x2", 10);

        legend.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 13)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d.x; });

      }

    } 
  };
  return directiveDefinitionObject;
});

// NORMALIZED VERTICAL BAR CHART
app.directive('normalizedVerticalBarChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      key: '@',
      values: '@',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      var keyName = attrs.key;
      var valuesNames = attrs.values;
      scope.data.forEach(function(d){
        d.key = d[keyName];
        d.values = []
        d[valuesNames].forEach(function(s) {
          s.x = s[xName]
          s.y = s[yName]
          d.values.push(s)
        });
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .rangeRound([height, 0]);

      var color = d3.scale.category20c();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".0%"));

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      scope.data.forEach(function(d) {
        var y0 = 0;
        d.values.forEach(function(s){
          s.y0 = y0;
          s.y1 = y0 + s.y;
          y0 = s.y1;
        })
        d.values.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
      });

      scope.data.sort(function(a, b) { return b.values[0].y1 - a.values[0].y1; });

      x.domain(scope.data.map(function(d) { return d.key; }));

      var xLabel = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      var group = svg.selectAll(".group")
          .data(scope.data)
        .enter().append("g")
          .attr("class", "group")
          .attr("transform", function(d) { return "translate(" + x(d.key) + ",0)"; });

      group.selectAll("rect")
          .data(function(d) { return d.values; })
        .enter().append("rect")
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.y1); })
          .attr("height", function(d) { return y(d.y0) - y(d.y1); })
          .style("fill", function(d) { return color(d.x); });

      if(attrs.showLegend == "true") {

        var legend = svg.select(".group:last-child").selectAll(".legend")
            .data(function(d) { return d.values; })
          .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d) { return "translate(" + x.rangeBand() / 2 + "," + y((d.y0 + d.y1) / 2) + ")"; });

        legend.append("line")
            .attr("x2", 10);

        legend.append("text")
            .attr("x", 13)
            .attr("dy", ".35em")
            .text(function(d) { return d.x; });

      }

    } 
  };
  return directiveDefinitionObject;
});

// MULTI-LINE CHART
app.directive('multiLineChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      key: '@',
      values: '@',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      var keyName = attrs.key;
      var valuesNames = attrs.values;
      scope.data.forEach(function(d){
        d.key = d[keyName];
        d.values = []
        d[valuesNames].forEach(function(s) {
          s.x = s[xName]
          s.y = s[yName]
          d.values.push(s)
        });
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var x = d3.time.scale()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var color = d3.scale.category10();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var line = d3.svg.line()
          .interpolate("basis")
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      scope.data.forEach(function(d){
        d.values = d.values.sort(function(a, b){ return d3.ascending(a.x, b.x)});
      });

      x.domain([
        d3.min(scope.data, function(d) { return d3.min(d.values, function(s) { return s.x; }); }),
        d3.max(scope.data, function(d) { return d3.max(d.values, function(s) { return s.x; }); })
      ]);

      y.domain([
        d3.min(scope.data, function(d) { return d3.min(d.values, function(s) { return s.y; }); }),
        d3.max(scope.data, function(d) { return d3.max(d.values, function(s) { return s.y; }); })
      ]);

      var xLabel = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      var group = svg.selectAll(".group")
          .data(scope.data)
        .enter().append("g")
          .attr("class", "group");

      group.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.key); });

      if(attrs.showLegend == "true") {

        group.append("text")
            .datum(function(d) { return {name: d.key, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.x) + "," + y(d.value.y) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });
      }

    } 
  };
  return directiveDefinitionObject;
});

// STACKED AREA CHART
app.directive('stackedAreaChart', function ($parse) {
  var directiveDefinitionObject = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=chartData',
      key: '@',
      values: '@',
      x: '@',
      y: '@',
      xlabel: '@',
      ylabel: '@',
      showLegend: '@',
      height: '@',
      width: '@',
      id: '@'
    },
    link: function (scope, element, attrs) {

      var xName = attrs.x;
      var yName = attrs.y;
      var keyName = attrs.key;
      var valuesNames = attrs.values;
      scope.data.forEach(function(d){
        d.key = d[keyName];
        d.values = []
        d[valuesNames].forEach(function(s) {
          s.x = s[xName]
          s.y = s[yName]
          d.values.push(s)
        });
      });

      var margin = {top: 20, right: 30, bottom: 30, left: 40},
          width = attrs.width - margin.left - margin.right || 960 - margin.left - margin.right,
          height = attrs.height - margin.top - margin.bottom || 500 - margin.top - margin.bottom;

      var x = d3.time.scale()
          .range([0, width]);

      var y = d3.scale.linear()
          .range([height, 0]);

      var color = d3.scale.category20();

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

      var area = d3.svg.area()
          .x(function(d) { return x(d.x); })
          .y0(function(d) { return y(d.y0); })
          .y1(function(d) { return y(d.y0 + d.y); });

      var stack = d3.layout.stack()
          .values(function(d) { return d.values; });

      var svg = d3.select("#" + attrs.id).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      scope.data = stack(scope.data)

      scope.data.forEach(function(d){
        d.values = d.values.sort(function(a, b){ return d3.ascending(a.x, b.x)});
      });

      x.domain([
          d3.min(scope.data, function(d) { return d3.min(d.values, function(s) { return s.x; })}),
          d3.max(scope.data, function(d) { return d3.max(d.values, function(s) { return s.x; })})
      ]);
      y.domain([0, d3.max(scope.data, function(d) { return d3.max(d.values, function(s) { return s.y0 + s.y; })})])

      var group = svg.selectAll(".group")
          .data(scope.data)
        .enter().append("g")
          .attr("class", "group");

      group.append("path")
          .attr("class", "area")
          .attr("d", function(d) { return area(d.values); })
          .style("fill", function(d) { return color(d.key); });

      var xLabel = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var yLabel = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      xLabel.append("text")
          .attr("transform", "rotate(0)")
          .attr("x", width)
          .attr("dx", ".71em")
          .style("text-anchor", "start")
          .text(attrs.xlabel);

      yLabel.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(attrs.ylabel);

      if(attrs.showLegend == "true") {

        group.append("text")
            .datum(function(d) { return {name: d.key, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.x) + "," + y(d.value.y0 + d.value.y / 2) + ")"; })
            .attr("x", 6)
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

      }

    } 
  };
  return directiveDefinitionObject;
});
