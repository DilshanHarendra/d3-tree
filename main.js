

fetch('./treedata.json')
.then(function(resp){
    return resp.json();
})
.then(function(data){
    console.log("Test")
   parentFunction(data);
});

function parentFunction(jsondata){


console.log("the data is")
console.log(jsondata)


let mouseX = 0;
let rootNode = d3.hierarchy(jsondata, d=>d.children);
var pathLinks = rootNode.links();



var textLinks = rootNode.descendants();
var updateTextLinks;


let dim = {
    'width': window.screen.width,
    'height':window.screen.height * 7   ,
    'margin':50
};

let svg = d3.select('#chart').append('svg')
     .style('background', 'black')
     .attrs(dim);


document.querySelector("#chart").classList.add("center");

//let rootNode = d3.hierarchy(data);

    const nodeWidth = 100, nodeHeight=30;


let g = svg.append('g')
            .attr('transform', 'translate(140,50)');

    let layout = d3.tree().size([dim.height-50, dim.width-320])
        .separation(function(a, b) { return (a.parent == b.parent ? nodeHeight*2 : nodeHeight*3); });

    layout(rootNode);

   //first lets create a path
   let lines = g.selectAll('path');



function update(data){

let group =  g.selectAll('path')
    .data(data, (d,i) => d.target.data.name)
    .join(
    function(enter){
        return enter.append('path')
                    .attrs({
                        'd': d3.linkHorizontal()
                        .x(d => d.y)
                         .y(d => d.x),
                     'fill':'none',
                     'stroke':'white'
                    })
      //      .attr('transform', `translate(${nodeWidth},0)`);

    },
    function(update){
        return update;
    },

)



}
update(pathLinks); //rootNode.links()



const drawNode =(data)=>{
  g.selectAll('rect')
    .data(data, (d) => d.data.name)
    .join((enter)=>{
            return enter.append('rect')
                        .attrs({
                            'x':(d)=> d.y,
                            'y':(d) => d.x-nodeHeight/2,
                            'width':nodeWidth,
                            'height':nodeHeight,
                            // 'r':12,
                            'fill':(d) => {
                                if(d.children == undefined){
                                    return 'red'
                                }
                                return 'green'
                            },
                            'id': (d,i) =>d.data.name,
                            'class':'node'

                        })

        },
        function(update){
            return update;
        },
        function(exit){

            // return exit.call(path => path.transition().duration(300).remove()
            // .attrs({
            // //    'cx':(d) =>mouseX,
            //     'r':(d) => 0
            // }));

        }
        )

 //   .call(circle => circle.transition().duration(1000).attr('cx', (d)=>d.y))

    // .on('mouseover', function(d){
    //     d3.select(this)
    //        .attrs({
    //            'fill':'orange',
    //        })
    //        .transition().duration(100).attr('r', 16);
    // })
    // .on('mouseout', function(d){
    //    d3.select(this)
    //        .attr('fill', (d)=>{
    //             if(d.children ==undefined){
    //                 return 'red'
    //             }
    //             return 'green'
    //        })
    //        .transition().duration(100).attr('r', 12)
    //
    // })
    // .on('click', async function(d){
    //
    //        let buttonId = d3.select(this)["_groups"][0][0]["attributes"].id.value;
    //        mouseX = d3.select(this)["_groups"][0][0]["attributes"].cx.value;
    //        //check to see if button already exists aka has been clicked
    //        //if it does, we need to send that data to update function
    //        //and remove that object
    //
    //        let checkButtonExists = buttonTracker.filter(button => button.buttonId == buttonId);
    //
    //        if(checkButtonExists[0]!=undefined){
    //             //also remove this item from button tracker
    //            buttonTracker = buttonTracker.filter(button => button.buttonId != buttonId);
    //
    //            //handle path update
    //            pathLinks = checkButtonExists[0].buttonPathData.concat(pathLinks);
    //
    //            update(pathLinks);
    //
    //
    //             //handle  circle update
    //            circleLinks = checkButtonExists[0].buttonCircleData.concat(circleLinks);
    //            drawNode(circleLinks);
    //
    //              //handle text update
    //
    //             textLinks =checkButtonExists[0].buttonTextData.concat(textLinks);
    //             updateText(textLinks);
    //
    //             return;
    //
    //        }
    //
    //        var valueArray = await processedlinks(d.links());
    //
    //        updatePathLinks = pathLinks.filter(function(item){
    //                return !valueArray.includes(item.target.data.name);
    //        });
    //
    //        //now run the filter to get unfiltered items
    //        var clickedPathData = pathLinks.filter(function(item){
    //         return valueArray.includes(item.target.data.name);
    //         });
    //
    //
    //        updateCircleLinks = circleLinks.filter(function(item){
    //                 return !valueArray.includes(item.data.name);
    //        });
    //
    //        var clickedCircleData = circleLinks.filter(function(item){
    //                 return valueArray.includes(item.data.name);
    //        });
    //
    //
    //        updateTextLinks = textLinks.filter(function(item){
    //                 return !valueArray.includes(item.data.name);
    //        });
    //
    //        var clickedTextData = textLinks.filter(function(item){
    //                 return valueArray.includes(item.data.name);
    //        });
    //
    //        //now we push the circleData to an array
    //        buttonTracker.push({
    //            buttonId:buttonId,
    //            buttonPathData: clickedPathData,
    //            buttonCircleData:clickedCircleData,
    //            buttonTextData:clickedTextData
    //        })
    //
    //
    //        update(updatePathLinks);
    //     drawNode(updateCircleLinks);
    //        updateText(updateTextLinks);
    //       async function processedlinks(dlinks) {
    //        var valueArray = [];
    //
    //            return new Promise((resolve, reject)=>{
    //                  dlinks.forEach(async(element) =>{
    //                       valueArray.push(element.target.data.name);
    //                  });
    //                  resolve(valueArray);
    //            });
    //        }
    //
    //        pathLinks = updatePathLinks;
    //        circleLinks = updateCircleLinks;
    //        textLinks = updateTextLinks;
    //
    // });


}
    updateText(textLinks);
    drawNode(rootNode.descendants());


function updateText(data){

    g.selectAll('text')
      .data(data, (d) =>d.data.name)
      .join(
        function(enter){
            return enter.append('text')
                        .attrs({
                            'x': (d) =>mouseX,
                            'y':(d) => d.x,
                            'font-size':0
                        })
                        .text((d) => d.data.name);
        },
        function(update){
            return update;
        },
        function(exit){
                return exit.call(text => text.transition().duration(300).remove().attrs({
                       'x':(d) => mouseX,
                       'font-size':0
                }));
        }

      )
}



}
