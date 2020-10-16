import React, { useEffect, useState } from 'react';
import {arc, pie} from 'd3-shape';
import * as d3 from 'd3';
import axios from 'axios';
import Pie from "react-chartjs-2";



function HomePage(){

    var [chardata, dataSource]= useState({});
    var data123 = {};
    var title = [];
    var budgetData = [];
    var colorList=['#ffcd56',  '#ff6384',  '#36a2eb',  '#fd6b19',  "#46b535",  "#05e2f1",  "#552bec"];
  
    function budget(){
    axios.get('http://localhost:3001/budget')
    .then(function(res){
        for(var i=0; i<res.data.myBudget.length; i++){
  
            budgetData[i]=res.data.myBudget[i].budget;
            title[i]= res.data.myBudget[i].title;
            data123[res.data.myBudget[i].title]=res.data.myBudget[i].budget;
            
        }
        dataSource({
          datasets: [
              {
                  data: budgetData,
                  backgroundColor: colorList,
              },
          ],
          labels: title
      });
      create3JSChart(data123);
    
    });
    }
  
    function create3JSChart(data123){
  
      const width = 600;
      const height = 500;
      const margin = 80;
      const radius = Math.min(width, height) / 2 - margin;
  
      const svg = d3.select("#d3chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
      const color = d3.scale.ordinal()
        .domain([title])
        .range(colorList);
  
      const Pie123 = pie()
        .sort(null)
        .value((d) => d.value);
  
      const dataD3JS = Pie123(d3.entries(data123));
  
      const Arc123 = arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.8)
  
      const outerArc = arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.8)
  
      svg
        .selectAll('allSlices')
        .data(dataD3JS)
        .enter()
        .append('path')
        .attr('d', Arc123)
        .attr('fill',(d) => (color(d.data.key)))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
  
      svg
        .selectAll('allPolyLines')
        .data(dataD3JS)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', (d)=> {
        var posA = Arc123.centroid(d)
        var posB = outerArc.centroid(d)
        var posC = outerArc.centroid(d);
        var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        posC[0] = radius * 0.97 * (midAngle < Math.PI ? 1 : -1);
        return [posA, posB, posC]
        });
  
      svg
        .selectAll('allLabels')
        .data(dataD3JS)
        .enter()
        .append('text')
        .text( (d) => { return (d.data.key + " ( $" + d.data.value + " )" ) } )
        .attr('transform', (d) => {
            var pos = outerArc.centroid(d);
            var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 1.1 * (midAngle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', (d) => {
            var midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midAngle < Math.PI ? 'start' : 'end')
        })
    }
    
    useEffect(budget, []);

  return (
    <main className="container center">

    {/* <!-- This is a Semantic HTML Change(article) --> */}
        <article className="page-area">

            <div className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div className="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>
    
            <div className="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </div>
    
            <div className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </div>
    
            <div className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </div>
    
            <div className="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </div>

            <div className ="center" >            
              <Pie style={{height:"400px", width: "400px"}} data={chardata}/>
            </div>
            <div>
              <h1>Chart Using D3JS</h1>
              <p id="d3chart"></p>
            </div>

        </article>
    </main>

  );
}

export default HomePage;
