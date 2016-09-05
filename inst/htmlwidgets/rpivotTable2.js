HTMLWidgets.widget({

    name: 'rpivotTable2',

    type: 'output',

    initialize: function(el, width, height) {

	    return {};

    },

    renderValue: function(el, x, instance) {
	    x.data = HTMLWidgets.dataframeToD3(x.data);

	    var derivers = $.pivotUtilities.derivers;
      var tpl = $.pivotUtilities.aggregatorTemplates;
      
      // set locale to "en" which is the default for pivottable
      //  this eases code later
      if(typeof(x.locale) === "undefined") x.locale = "en";

      x.params.renderers = $.extend(
        $.pivotUtilities.locales[x.locale].renderers,
        $.pivotUtilities.d3_renderers,
        $.pivotUtilities.c3_renderers
      );
      
      // temporary hack to make Portuguese d3 and c3 renderers
      if(x.locale === "pt"){
        x.params.renderers["Mapa de Árvore"] = x.params.renderers["Treemap"];
        x.params.renderers["Gráfico de Linha"] = x.params.renderers["Line Chart"];
        x.params.renderers["Gráfico de Barras"] = x.params.renderers["Bar Chart"];
        x.params.renderers["Gráfico de Barras Empilhadas"] = x.params.renderers["Stacked Bar Chart"];
        x.params.renderers["Gráfico de Área"] = x.params.renderers["Area Chart"];
        x.params.renderers["Gráfico de Dispersão"] = x.params.renderers["Scatter Chart"];
        
        // delete the English
        delete(x.params.renderers["Treemap"]);
        delete(x.params.renderers["Line Chart"]);
        delete(x.params.renderers["Bar Chart"]);
        delete(x.params.renderers["Stacked Bar Chart"]);
        delete(x.params.renderers["Area Chart"]);
        delete(x.params.renderers["Scatter Chart"]);

      }
      
      if (typeof x.params.sorters != "undefined") {
      if (typeof x.params.sorters[0] == "string") {
          x.params.sorters = eval("("+x.params.sorters[0]+")")
        }
      }
    
      if (typeof x.params.onRefresh != "undefined") {
        x.params.onRefresh = x.params.onRefresh[0];
      }
      
      
      //AGGREGATOR     
       var digits = 0
       if ( x.params.nui_aggregator == "Sum") {
          var fx = $.pivotUtilities.aggregatorTemplates.sum; 
       } else if ( x.params.nui_aggregator == "Average") {
          var fx = $.pivotUtilities.aggregatorTemplates.average;
          var digits = 1
          //var intFormat = numberFormat({digitsAfterDecimal: 1});  
          //var nui_aggregator = fx(intFormat)([x.params.vals]); 
       } 
       
       if (typeof fx != 'undefined'){
          var numberFormat = $.pivotUtilities.numberFormat;  
          var intFormat = numberFormat({digitsAfterDecimal: digits});  
          var nui_aggregator = fx(intFormat)([x.params.vals]); 
       } 
 
      //renderer   
       if ( x.params.nui_renderer == "Table Barchart") { 
           var nui_renderer =  $.pivotUtilities.renderers["Table Barchart"];  
       } else if ( x.params.nui_renderer == "Heatmap") { 
           var nui_renderer =  $.pivotUtilities.renderers["Heatmap"];  
       } else if ( x.params.nui_renderer == "Row Heatmap") { 
           var nui_renderer =  $.pivotUtilities.renderers["Row Heatmap"];            
       } else if ( x.params.nui_renderer == "Col Heatmap") { 
           var nui_renderer =  $.pivotUtilities.renderers["Col Heatmap"];             
       } else if ( x.params.nui_renderer == "Treemap") { 
           var nui_renderer =  $.pivotUtilities.renderers["Treemap"];             
       } else if ( x.params.nui_renderer == "Line Chart") { 
           var nui_renderer =  $.pivotUtilities.renderers["Line Chart"];             
       } else if ( x.params.nui_renderer == "Bar Chart") { 
           var nui_renderer =  $.pivotUtilities.renderers["Bar Chart"];             
       } else if ( x.params.nui_renderer == "Stacked Bar Chart") { 
           var nui_renderer =  $.pivotUtilities.renderers["Stacked Bar Chart"];  
       } else if ( x.params.nui_renderer == "Area chart") { 
           var nui_renderer =  $.pivotUtilities.renderers["Area chart"];             
       } else if ( x.params.nui_renderer == "Scatter Chart") { 
           var nui_renderer =  $.pivotUtilities.renderers["Scatter Chart"];              
       }  
           
 
       $('#'+el.id).pivot( 
               x.data ,
              {
                  rows:   x.params.rows  ,
                  cols:   x.params.cols  ,
                  aggregator: nui_aggregator,
                  renderer:   nui_renderer
              } 
      ); //pivot 
  
  
      
//----------------------------------------------------------       
    },

    resize: function(el, width, height, instance) {

    }

});
//------------------------------------------------------------       
       
// TEST GIT
  











