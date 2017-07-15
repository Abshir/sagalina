'use strict';

define('project-webshop/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('project-webshop/tests/controllers/item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/item.js should pass jshint.');
  });
});
define('project-webshop/tests/controllers/item/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/item/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/item/new.js should pass jshint.\ncontrollers/item/new.js: line 11, col 50, Missing semicolon.\ncontrollers/item/new.js: line 6, col 17, \'title\' is defined but never used.\ncontrollers/item/new.js: line 7, col 17, \'description\' is defined but never used.\ncontrollers/item/new.js: line 8, col 17, \'date\' is defined but never used.\ncontrollers/item/new.js: line 11, col 17, \'newItem\' is defined but never used.\n\n5 errors');
  });
});
define('project-webshop/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('project-webshop/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('project-webshop/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'project-webshop/tests/helpers/start-app', 'project-webshop/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _projectWebshopTestsHelpersStartApp, _projectWebshopTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _projectWebshopTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _projectWebshopTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('project-webshop/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('project-webshop/tests/helpers/resolver', ['exports', 'project-webshop/resolver', 'project-webshop/config/environment'], function (exports, _projectWebshopResolver, _projectWebshopConfigEnvironment) {

  var resolver = _projectWebshopResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _projectWebshopConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _projectWebshopConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('project-webshop/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('project-webshop/tests/helpers/start-app', ['exports', 'ember', 'project-webshop/app', 'project-webshop/config/environment'], function (exports, _ember, _projectWebshopApp, _projectWebshopConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _projectWebshopConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _projectWebshopApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('project-webshop/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('project-webshop/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('project-webshop/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('project-webshop/tests/routes/item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/item.js should pass jshint.');
  });
});
define('project-webshop/tests/routes/item/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/item/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/item/new.js should pass jshint.');
  });
});
define('project-webshop/tests/routes/scientists.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/scientists.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scientists.js should pass jshint.');
  });
});
define('project-webshop/tests/test-helper', ['exports', 'project-webshop/tests/helpers/resolver', 'ember-qunit'], function (exports, _projectWebshopTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_projectWebshopTestsHelpersResolver['default']);
});
define('project-webshop/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('project-webshop/tests/unit/controllers/item-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:item', 'Unit | Controller | item', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('project-webshop/tests/unit/controllers/item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/item-test.js should pass jshint.');
  });
});
define('project-webshop/tests/unit/controllers/item/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:item/new', 'Unit | Controller | item/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('project-webshop/tests/unit/controllers/item/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/item/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/item/new-test.js should pass jshint.');
  });
});
define('project-webshop/tests/unit/routes/item-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:item', 'Unit | Route | item', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('project-webshop/tests/unit/routes/item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/item-test.js should pass jshint.');
  });
});
define('project-webshop/tests/unit/routes/item/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:item/new', 'Unit | Route | item/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('project-webshop/tests/unit/routes/item/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/item/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/item/new-test.js should pass jshint.');
  });
});
define('project-webshop/tests/unit/routes/scientists-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:scientists', 'Unit | Route | scientists', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('project-webshop/tests/unit/routes/scientists-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/scientists-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/scientists-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('project-webshop/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
