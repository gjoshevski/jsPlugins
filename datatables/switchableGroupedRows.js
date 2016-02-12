/**
 * @summary     Switchable  rows
 * @description Group rows based on duplicate values
 * @version     1.0.0
 * @file        switchableGroupedRows.js
 * @author      Martin Gjoshevski
 * @contact     martin.gjoshevsk@tend.si
 * @param {integer} indexSwitchable Index of the column that will have the switch option.
 * @param {string|array} indexGrouped Indexses of columns to be compared for.
 * @copyright   Org.Tend 2015
 *
 * License      MIT - http://datatables.net/license/mit
 *
    @use DataTable({}).switchableGroupedRows(0,[1, 3]);

 */

$.fn.dataTable.Api.register( 'switchableGroupedRows()', function (indexSwitchable, indexGrouped, table) {

  tabelId = table[0].id;
  var foundRecordsToBeMearged = false;

  // dataTable data
  var data = this.data();
  var newData = {};

//  console.log("OK");

  for(var i=0; i < data.length; i++){
    var key = sgrGenUniqKeyName(data[i],indexGrouped);

    if(newData[key]){
      //MERGE FUNCTION
      newData[key] = sgrAddSelectOption(newData[key],data[i], indexSwitchable, tabelId);

      foundRecordsToBeMearged =true;
    }else{
      newData[key] = data[i];
    }
  }
    var dataToAdd = [];
    $.each(newData, function(key, row) {
        dataToAdd.push(row);
    });

    this.clear();
    this.rows.add(dataToAdd).draw();

  return foundRecordsToBeMearged;

});

var sgrGenUniqKeyName = function(data, indexes){
  var key = '';

  indexes.forEach(function(name) {
    key+= data[name];
  });

  return key;
}

var sgrAddSelectOption = function(data, dataToAdd,indexSwitchable, tableId){
  var currentField = data[indexSwitchable];
  var valueToAdd = dataToAdd[indexSwitchable];

  if(currentField.indexOf("<select") == -1){
    currentField =  $('<select style="padding:0px; margin:0px;" onchange="sgrChangedSwitchableRow(this,'+tableId+','+indexSwitchable+')"> </select>');
    $(currentField).append($("<option></option>")
          .attr("value",data.join(" |; "))
          .text(data[indexSwitchable]));
  }else{
    currentField =  $(currentField);
  }

  $(currentField).append($("<option></option>")
        .attr("value",dataToAdd.join(" |; "))
        .text(valueToAdd));

  data[indexSwitchable] = $(currentField).prop('outerHTML');

  return data;
}

/*
* select -> the select field object
* selector table ID
* indexSwitchable -> index of the switchable collumn
*/
var sgrChangedSwitchableRow = function(select,selector,indexSwitchable){

  var selValue = select.value;

  var dataArrayFromSelectedOption = selValue.split(" |; ");
  var api = $(selector).DataTable();

  var tr = $(select).closest("tr");

  $(tr).find('td').each (function(column, td) {
    if(column!=indexSwitchable){
      td.innerHTML = dataArrayFromSelectedOption[column];
    }
  });

}
