var exec = IO.require('child_process').exec;

JSDOC['copy-dirs'] = null;    // specify dirs to auto copy from the template, --copy-dirs=shared,media
JSDOC['copy-dirs-to'] = null;

JSDOC.PluginManager.registerPlugin(
  "JSDOC.copy-dirs",
  {
    onInit: function(opts){
      if (opts['copy-dirs'] && opts.t && opts.d) {
        JSDOC['copy-dirs'] = opts['copy-dirs'].split(',').map(function(short_dir){
          return opts.t + short_dir; //already contains trailing slash
        });
        JSDOC['copy-dirs-to'] = opts.d;
      }
    },
    onFinishedParsing: function(symbols) {
      if (!JSDOC['copy-dirs']) return;
      JSDOC['copy-dirs'].forEach(function(dir){
        var cmd = 'cp -r "' + dir + '" "' + JSDOC['copy-dirs-to'] + '"';
        LOG.inform(cmd);
        exec(cmd, function(err, stdout, stderr){
          if(err){
            console.log('Error copying directory: "' + dir + '" to "' + JSDOC['copy-dirs-to'] + '" error code: ' + err);
          }else{
            LOG.inform('Copy completed: '+dir);
          }
        });
      });
    }
  }
);

