IO.include("plugins/smartdown/smartdown.js");

JSDOC.useSmartdown = false;           // enable with command line option --smartdown
JSDOC.useSyntaxHighlighting = false;  // enable embedded syntax highlighting with option --highlight (requires --smartdown)

JSDOC.PluginManager.registerPlugin(
  "JSDOC.smartdown",
  {
    onInit: function(opts){
      if (opts.smartdown) { JSDOC.useSmartdown = true; }
      if (opts.highlight) { JSDOC.useSyntaxHighlighting = true; }
    },
    onDocTag: function(docTag) {
      if (!JSDOC.useSmartdown) { return; }

      var exclude = "type param see inherits lends extends scope link base augments memberOf".split(' ');
      if (exclude.indexOf(docTag.title) < 0) {
        var desc = docTag.desc.trim();
        desc = Smartdown.render(desc, JSDOC.useSyntaxHighlighting);
        docTag.desc = desc;
      }
    },
    onSetTags: function(symbol){
      if (!JSDOC.useSmartdown) { return; }

      //run examples through smartdown
      if(symbol.example && symbol.example.length > 0){
        symbol.example.forEach(function(ex){ 
          if(ex.desc && ex.desc.length > 0) {
            ex.desc = Smartdown.renderExample(ex.desc.trim(), JSDOC.useSyntaxHighlighting); 
          }
        });
      }
    }
  }
);

