
var modules = {
  register: function(name, module) {
    this._values[name] = module;
  },
  require:  function(name) {
    return this._values[name];
  },
  _values: {}
};

modules.register  = modules.register.bind(modules);
modules.require   = modules.require.bind(modules);
