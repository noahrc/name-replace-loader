var utils = require('loader-utils');
var path = require('path');

module.exports = function (source) {
  var loaderContext = this;
  var config = utils.getLoaderConfig(loaderContext, 'name-replace');

  loaderContext.cacheable();

  try {
    var name = utils.interpolateName(loaderContext, '[name]', { context: loaderContext.options.context });
    var modulePath = utils.interpolateName(loaderContext, '[path]', { context: loaderContext.options.context });
    var ext = utils.interpolateName(loaderContext, '[ext]', { context: loaderContext.options.context });
    if (typeof config.flags === 'string') {
      config.find = new RegExp(config.find, config.flags);
    }
    var newName = name.replace(config.find, config.replace);

    // This approach seems hacky, but it has the desired effect of changing the modules name
    loaderContext.__proto__.resourcePath = path.resolve(modulePath) + '/' + newName + '.' + ext;
  }
  catch (err) {
    console.log(err);
  }

  return source;
}