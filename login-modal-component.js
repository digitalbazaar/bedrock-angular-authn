/*!
 * Login Modal.
 *
 * Copyright (c) 2012-2017 Digital Bazaar, Inc. All rights reserved.
 *
 */
import _ from 'lodash';

export default {
  bindings: {
    onLogin: '&brOnLogin',
    displayOrder: '=brDisplayOrder',
    methods: '=brMethods',
    options: '=?brOptions'
  },
  controller: Ctrl,
  require: {
    stackable: '^stackable'
  },
  templateUrl: 'bedrock-angular-authn/login-modal-component.html'
};

/* @ngInject */
function Ctrl($timeout, brAlertService) {
  var self = this;

  self.$onInit = function() {
    self.loading = false;
    self.display = {
      cancel: false
    };

    // apply options
    var options = self.options || {};
    _.assign(self.display, options.display || {});

    // FIXME: fix-up expired login
    self.newLogin = true;
    if('newLogin' in options) {
      self.newLogin = !!options.newLogin;
    }

    self.display.customWarning = options.customWarning || null;
  };

  // TODO: document why $timeout is used
  // clear existing feedback when showing this modal
  $timeout(function() {
    brAlertService.clearFeedback();
  });

  self.doneCallback = function(identity) {
    // success, close modal
    self.stackable.close(null);
    self.onLogin({identity: identity});
  };
}
