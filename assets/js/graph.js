queue()
      .defer(d3.json, "assets/data/suicideRates.json")
      .await(makeGraphs);

function makeGraphs(error, suicideData){
  var ndx = crossfilter(suicideData);

  // suicideData.forEach(function(d){
  //   d.age = parseInt(d.age);
  //   d.gdp_for_year ($) = parseInt(d.gdp_for_year ($));

  // });
  year_selector(ndx);     // Dropdown menu
  listOf_countries(ndx);  // Dropdown menu
  show_ageSuicides_no(ndx); // Bar Chart
  show_pro_rata_suicides(ndx); // Bar Chart

  dc.renderAll();
}

// Dropdown menu

function year_selector(ndx){
  year_dim = ndx.dimension(dc.pluck("year"));
  year_group = year_dim.group()

  dc.selectMenu("#year_selector")
    .dimension(year_dim)
    .group(year_group);
}

// Dropdown menu

function listOf_countries(ndx){
  country_dim = ndx.dimension(dc.pluck("country"));
  country_group = country_dim.group()

  dc.selectMenu("#country_selector")
    .dimension(country_dim)
    .group(country_group);
  }

// Bar Chart

function show_ageSuicides_no(ndx){
  var age_dim = ndx.dimension(dc.pluck("age"));
  var suicide_no_group = age_dim.group();//.reduceSum(dc.pluck("suicides_no"));

  dc.barChart("#ageSuicides_no")
        .width(350)
        .height(400)
        .margins({top: 20, right: 50, bottom: 30, left: 60})
        .dimension(age_dim)
        .group(suicide_no_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        //.elasticY(true) this lets the y axis value to alter for each different select menu selection 
        .xAxisLabel("AGE")
        .yAxis().ticks(10);
}

function show_pro_rata_suicides(ndx){
  var sex_dim = ndx.dimension(dc.pluck("sex"));
  var suicides_pro_rata = sex_dim.group();
  dc.barChart("#pro_rata")
        .width(350)
        .height(400)
        .margins({top: 20, right: 50, bottom: 30, left: 50})
        .dimension(sex_dim)
        .group(suicides_pro_rata)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("GENDER")
        .yAxis().ticks(20);

}















