queue()
      .defer(d3.json, "assets/data/suicideRates.json")
      .await(makeGraphs);

function makeGraphs(error, suicideData){
  var ndx = crossfilter(suicideData);
  year_selector(ndx);
  show_yearSuicides_no(ndx);
  show_pro_rata_suicides(ndx);

  dc.renderAll();
}

function year_selector(ndx){
  dim = ndx.dimension(dc.pluck("year"));
  group = dim.group()

  dc.selectMenu("#year_selector")
    .dimension(dim)
    .group(group);
}

function show_yearSuicides_no(ndx){
  var dim = ndx.dimension(dc.pluck("year"));
  var group = dim.group();

  dc.barChart("#yearSuicides_no")
        .width(400)
        .height(400)
        .margins({top: 20, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        //.elasticY(true) this lets the y axis value to alter for each different select menu selection 
        .xAxisLabel("Year")
        .yAxis().ticks(20);
}

function show_pro_rata_suicides(ndx){
  var dim = ndx.dimension(dc.pluck("year"));
  var average_pro_rata = dim.group();
  dc.barChart("#pro_rata")
        .width(400)
        .height(400)
        .margins({top: 20, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(average_pro_rata)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Year")
        .yAxis().ticks(20);

}















