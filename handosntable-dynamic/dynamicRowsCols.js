/**
 * @plugin External plugin dynamicRowsCols.
  @author Martin Gjoshevski @gjoshevski
 * Note: keep in mind, that Handsontable instance creates one instance of the plugin class.
 *
 * @param hotInstance
 * @constructor
 */
function DynamicRowsCols(hotInstance) {

  // Call the BasePlugin constructor.
  Handsontable.plugins.BasePlugin.call(this, hotInstance);

  this._superClass = Handsontable.plugins.BasePlugin;

  // Initialize all your public properties in the class' constructor.

  /**
   * formJson
   * @type {Array}
   */
  this.formJson = [];

}

// Inherit the BasePlugin prototype.
DynamicRowsCols.prototype = Object.create(Handsontable.plugins.BasePlugin.prototype, {
  constructor: {
    writable: true,
    configurable: true,
    value: DynamicRowsCols
  },
});

/**
 * Checks if the plugin is enabled in the settings.
 */
DynamicRowsCols.prototype.isEnabled = function() {
  return !!this.hot.getSettings().dynamicRowsCols;
};

/**
 * The enablePlugin method is triggered on the beforeInit hook. It should contain your initial plugin setup, along with
 * the hook connections.
 * Note, that this method is run only if the statement in the isEnabled method is true.
 */
DynamicRowsCols.prototype.enablePlugin = function() {

  this.formJson = this.hot.getSettings().dynamicRowsCols;

  // Add all your plugin hooks here. It's a good idea to make use of the arrow functions to keep the context consistent.
  this.addHook('afterChange', this.onAfterChange.bind(this));

  // The super class' method assigns the this.enabled property to true, which can be later used to check if plugin is already enabled.
  this._superClass.prototype.enablePlugin.call(this);


  //Hide All empty dynamic rows and colums except the first
//  this.hideAlldynamicRowsAncCols();

};

/**
 * The disablePlugin method is used to disable the plugin. Reset all of your classes properties to their default values here.
 */
DynamicRowsCols.prototype.disablePlugin = function() {

  this.formJson = [];
  // The super class' method takes care of clearing the hook connections and assigning the 'false' value to the 'this.enabled' property.
  this._superClass.prototype.disablePlugin.call(this);


};

/**
 * The updatePlugin method is called on the afterUpdateSettings hook (unless the updateSettings method turned the plugin off).
 * It should contain all the stuff your plugin needs to do to work properly after the Handsontable instance settings were modified.
 */
DynamicRowsCols.prototype.updatePlugin = function() {

  // The updatePlugin method needs to contain all the code needed to properly re-enable the plugin. In most cases simply disabling and enabling the plugin should do the trick.
  this.disablePlugin();
  this.enablePlugin();

  this._superClass.prototype.updatePlugin.call(this);

    console.log("updatePlugin");
};

/**
 * The afterChange hook callback.
 *
 * @param {Array} changes Array of changes.
 * @param {String} source Describes the source of the change.
 */
DynamicRowsCols.prototype.onAfterChange = function(changes, source) {
  // afterChange callback goes here.


  //Hide All empty dynamic rows and colums except the first
  this.hideAlldynamicRowsAncCols();
};

/**
 * The destroy method should de-assign all of your properties.
 */
DynamicRowsCols.prototype.destroy = function() {
  // The super method takes care of de-assigning the event callbacks, plugin hooks and clearing all the plugin properties.
  this._superClass.prototype.destroy.call(this);

};

// You need to register your plugin in order to use it within Handsontable.
Handsontable.plugins.registerPlugin('dynamicRowsCols', DynamicRowsCols);



DynamicRowsCols.prototype.hideAlldynamicRowsAncCols = function(){
 var self = this;
  dynamicRows.forEach(function(r) {

    var td = self.hot.getCell(r,0);
    var tdBefore = self.hot.getCell(r-1,0);

    if(td.innerHTML=="" && tdBefore.innerHTML==""){
      $("table.htCore tr:nth-child("+(r+1)+")").hide();
    }else{
      $("table.htCore tr:nth-child("+(r+1)+")").show();
    }
  });




}
