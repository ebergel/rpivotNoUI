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
       if ( x.params.nui_aggregator == "count" ||  x.params.nui_aggregator == "undefined") { 
          var nui_aggregator = undefined
          
       } else if ( x.params.nui_aggregator == "sum") {
          var fx = $.pivotUtilities.aggregatorTemplates.sum;
          var numberFormat = $.pivotUtilities.numberFormat;
          var intFormat = numberFormat({digitsAfterDecimal: 0});  
          var nui_aggregator = fx(intFormat)([x.params.vals]);
          
       } else if ( x.params.nui_aggregator == "average") {
          var fx = $.pivotUtilities.aggregatorTemplates.average;
          var numberFormat = $.pivotUtilities.numberFormat;
          var intFormat = numberFormat({digitsAfterDecimal: 1});  
          var nui_aggregator = fx(intFormat)([x.params.vals]);
       }
 
 
      //renderer   
       if (  x.params.nui_renderer == "undefined") { 
          var nui_renderer = undefined
          
       } else if ( x.params.nui_renderer == "heatmap") { 
           var nui_renderer =  $.pivotUtilities.renderers["Heatmap"];  
       }  
 
 
       $('#'+el.id).pivot( 
               x.data ,
              {
                  rows: [ x.params.rows ],
                  cols: [ x.params.cols ],
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
       
       
       
       
    /*   
       
         
      
       if ( x.params.type == "count") {
         
                      $('#'+el.id).pivot(
                  	                    	x.data, x.params, true, x.locale
                      ); //pivot
      }
      
        if ( x.params.type == "sum") {
          
                      var sum = $.pivotUtilities.aggregatorTemplates.sum;
                      var numberFormat = $.pivotUtilities.numberFormat;
                      var intFormat = numberFormat({digitsAfterDecimal: 0});  
              
                   $('#'+el.id).pivot( 
                             x.data ,
                            {
                                rows: ["color"],
                                cols: ["clarity"],
                                aggregator: sum(intFormat)(["Freq"])
                            } 
                   ); //pivot   
      }     
      
         if ( x.params.type == "heatmap") {
          
                    var sum = $.pivotUtilities.aggregatorTemplates.sum;
                    var numberFormat = $.pivotUtilities.numberFormat;
                    var intFormat = numberFormat({digitsAfterDecimal: 0});   
                    
                    var utils = $.pivotUtilities;
                    var heatmap =  utils.renderers["Heatmap"];  
            
                 $('#'+el.id).pivot( 
                         x.data ,
                        {
                            rows: [ x.params.rows ],
                            cols: [ x.params.cols ],
                            aggregator: sum(intFormat)([x.params.vals]),
                            renderer: heatmap
                        } 
                    ); //pivot   
        
      }         
    */
          
          
      




/*


            "Cuenta":                             tpl.count(frFmtInt)
            "Cuenta de valores únicos":          tpl.countUnique(frFmtInt)
            "Lista de valores únicos":           tpl.listUnique(", ")
            "Suma":                              tpl.sum(frFmt)
            "Suma de enteros":                   tpl.sum(frFmtInt)
            "Promedio":                            tpl.average(frFmt)
            "Mínimo":                                       tpl.min(frFmt)
            "Máximo":                                       tpl.max(frFmt)
            "Suma de sumas":                    tpl.sumOverSum(frFmt)
            "Cota 80% superior":        tpl.sumOverSumBound80(true, frFmt)
            "Cota 80% inferior":        tpl.sumOverSumBound80(false, frFmt)
            "Proporción del total (suma)":      tpl.fractionOf(tpl.sum(),   "total", frFmtPct)
            "Proporción de la fila (suma)":    tpl.fractionOf(tpl.sum(),   "row",   frFmtPct)
            "Proporción de la columna (suma)":  tpl.fractionOf(tpl.sum(),   "col",   frFmtPct)
            "Proporción del total (cuenta)":     tpl.fractionOf(tpl.count(), "total", frFmtPct)
            "Proporción de la fila (cuenta)":   tpl.fractionOf(tpl.count(), "row",   frFmtPct)
            "Proporción de la columna (cuenta)": tpl.fractionOf(tpl.count(), "col",   frFmtPct)

        renderers:
            "Tabla":                           $.pivotUtilities.renderers["Table"]
            "Tabla con barras":               $.pivotUtilities.renderers["Table Barchart"]
            "Heatmap":                $.pivotUtilities.renderers["Heatmap"]
            "Heatmap por filas":      $.pivotUtilities.renderers["Row Heatmap"]
            "Heatmap por columnas":    $.pivotUtilities.renderers["Col Heatmap"]



*/

















