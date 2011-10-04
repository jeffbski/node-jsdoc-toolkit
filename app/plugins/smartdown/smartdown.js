/*global IO,Markdown,Koala,Smartdown*/
IO.include("plugins/smartdown/markdown.js");
IO.include("plugins/smartdown/koala.js");

var Smartdown = {
  syntaxHighlight: function(text, lang){ //embedded syntax highlighting
    text = text.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
    return Koala.render(lang, text);
  },
  render: function(text, highlight) {
    // first, attempt to determine indent level of content.
    /**
    this would be 0 spaces
      two
        4, and so on.
    */
    
    var initial = text.match(/\n([ \t]+)/);
    if (initial) {
      text = text.replace(new RegExp("^" + initial[1], 'mg'), "");
    }
    
    if (text.match(/\n/)) text = new Showdown.converter().makeHtml(text);

    //coming from code blocks
    text = text.replace(/<code>(#([^:\s]+)?)?:?\s*([^\0]+?)<\/code>/g, function(match, whitespace, lang, code) {
      lang = lang || "js";
      if (highlight) { code = Smartdown.syntaxHighlight(code, lang); }
      return "<code class='syntax " + lang + "'>" + code + "</code>";
    });
    return text;
  },
  renderExample: function(text, highlight) {
    text = text.replace(/<p>|<\/p>/g, ''); //remove all p tags

    var lang = "js";
    if (highlight) { text = Smartdown.syntaxHighlight(text, lang); }
    text = "<code class='syntax " + lang + "'>" + text + "</code>";
    return text;
  }

};
