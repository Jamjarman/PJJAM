function pieChart(d3, file, divid, width, height, clickable){
    'use strict';
    
    
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var legendRectSize = 18;
    var legendSpacing = 4;
    
    var color = d3.scale.category20b();
    
    var svg = d3.select(divid)
	    .append('svg')
	    .attr('width', width)
	    .attr('height', height)
	    .append('g')
	    .attr('transform', 'translate(' + (width / 2) + 
		  ',' + (height / 2) + ')');

    var arc = d3.svg.arc()
	    .innerRadius(radius - donutWidth)
	    .outerRadius(radius);
    
    var pie = d3.layout.pie()
		 .value(function(d) { return d.count; })
	    .sort(null);
    var tooltip=d3.select(divid)
	    .append('div')
		   .attr('class', 'tooltip');
    tooltip.append('div')
	.attr('class', 'player');
    tooltip.append('div')
	.attr('class', 'count');
    tooltip.append('div')
	.attr('class', 'percent');
    
    
    
    d3.csv(file, function(error, dataset) {           
        dataset.forEach(function(d) {
            d.count = +d.count;
	});                                                       
	
        var path = svg.selectAll('path')
		.data(pie(dataset))
		.enter()
		.append('path')
		       .attr('d', arc)
		.attr('fill', function(d, i) { 
		    return color(d.data.player);
		});
	
	path.on('mouseover', function(d){
	    var total=d3.sum(dataset.map(function(d){
		return d.count;
	    }));
	    var percent=Math.round(1000*d.data.count/total)/10;
	    tooltip.select('.player').html(d.data.player);
	     tooltip.select('.count').html(d.data.count);
	    tooltip.select('.percent').html(percent+'%');
	    tooltip.style('display', 'block');
	});
	
	path.on('mouseout', function(d){
	    tooltip.style('display', 'none');
	});

	if(clickable){
	    path.on('click', function(d){
		console.log(d);
		d3.select("#chartgamegen").html("<h2>"+d.data.player+"</h2>");
		pieChart(d3, 'data/'+d.data.player+'.csv', '#chartgamegen', 540, 540, false);
	    });
	}
	
        var legend = svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i) {
		    var height = legendRectSize + legendSpacing;
		    var offset =  height * color.domain().length / 2;
		    var horz = -2 * legendRectSize;
		    var vert = i * height - offset;
		    return 'translate(' + horz + ',' + vert + ')';
		});
	
        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);
        
        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });                       
	
    });                                                         // NEW
    
};
