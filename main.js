const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/bharvey165/scatterplot/main/cities_and_population_area.csv").then( function(data) {

    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, 2000000])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(6));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 600])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
        .attr("cx", function (d) { return x(d.population); } )
        .attr("cy", function (d) { return y(d.area); } )
        .attr("r", 5)
        .style("fill", "#69b3a2")

    svg.append("text")
        .attr("transform", "translate(" + (width/2) + " ," + (height+30) + ")")
        .style("text-anchor", "middle")
        .text("Population");
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(height/2))
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Area");
})

