
const gsBang = () => {

  const template = '<div>bang baaang cheese: {{ctrl.cheese}}</div>';


  const link = () => {};


  const controller = class {};


  return () =>
    ({
      restrict: 'E',
      scope: {},
      bindToController: {
        cheese: '@'
      },
      controller,
      controllerAs: 'ctrl',
      template,
      link
    });
};


const gsBoom = () => {


  const link =
    (scope, element) => scope.__rootElement = element;


  const controller = class Controller {

    __$scope
    __$compile

    __rootElement
    __innerElement
    __cheese


    constructor($scope, $compile) {
      this.__$scope = $scope;
      this.__$compile = $compile;

      this._initListener();
    }


    get cheese() {
      return this.__cheese || 'cheddar';
    }


    set cheese(cheese) {
      this.__cheese = cheese;
    }


    get isCheese() {
      return this.__isCheese;
    }

    set isCheese(isCheese) {
      this.__isCheese = isCheese;
      this._updateInnerDirective();
    }


    _updateInnerDirective() {
      if (this.__rootElement) {
        if (this.isCheese) {
          this._appendInnerDirectiveToElement();
        } else {
          this._removeInnerDirectiveFromElement();
        }
      }
    }


    _buildLinkFn() {
      return this.__$compile(angular.element('<gs-bang cheese="{{ctrl.cheese}}"></gs-bang>'));
    }


    _buildInnerDirective() {
      const linkFn = this._buildLinkFn();
      return linkFn(this.__$scope.$new());
    }


    _appendInnerDirectiveToElement() {
      if (!this.__innerElement) {
        this.__innerElement = this._buildInnerDirective();
        this.__rootElement.append(this.__innerElement);
      }
    }


    _removeInnerDirectiveFromElement() {
      if (this.__innerElement) {
        this.__innerElement.remove();
        this.__innerElement = undefined;
      }
    }


    _initListener() {
      const unwatch = this.__$scope.$watch('__rootElement', (element) => {
        unwatch();
        this.__rootElement = element;
        if (this.__cheese) this._appendInnerDirectiveToElement();
      });
    }
  };


  return () =>
    ({
      restrict: 'E',
      replace: true,
      scope: {},
      bindToController: {
        cheese: '@',
        isCheese: '='
      },
      controller,
      controllerAs: 'ctrl',
      link
    });
};


const gsSimple = () => {

  const template =
    `<div>--> <span ng-if="ctrl.isCheese">{{ctrl.cheese}}</span></div>`;

  const controller = class {

    isCheese
    cheese

    constructor() {
      this.isCheese = false;
      this.cheese = 'emmental';
    }
  }

  return () =>
    ({
      restrict: 'E',
      replace: true,
      scope: {},
      bindToController: {
        isCheese: '='
      },
      controller,
      controllerAs: 'ctrl',
      template
    });
};



const gsToggle = () => {

  const link =
    (scope, element) => scope.__rootElement = element;


  const controller = class Controller {

    __$scope
    __$compile

    __rootElement
    __innerElement

    __isCheese


    constructor($scope, $compile) {
      this.__$scope = $scope;
      this.__$compile = $compile;

      this._initListener();
    }


    get isCheese() {
      return this.__isCheese;
    }


    set isCheese(isCheese) {
      this.__isCheese = isCheese;
      this._updateInnerDirective(this.isCheese);
    }


    _updateInnerDirective(condition) {
      if (this.__rootElement) {
        if (condition) {
          this._appendInnerDirectiveToElement();
        } else {
          this._removeInnerDirectiveFromElement();
        }
      }
    }


    _buildLinkFn() {
      return this.__$compile(angular.element('<gs-simple is-cheese="ctrl.__isCheese"></gs-simple>'));
    }


    _buildInnerDirective() {
      const linkFn = this._buildLinkFn();
      return linkFn(this.__$scope.$new());
    }


    _appendInnerDirectiveToElement() {
      if (!this.__innerElement) {
        this.__innerElement = this._buildInnerDirective();
        this.__rootElement.append(this.__innerElement);
      }
    }


    _removeInnerDirectiveFromElement() {
      if (this.__innerElement) {
        this.__innerElement.remove();
        this.__innerElement = undefined;
      }
    }


    _initListener() {
      const unwatch = this.__$scope.$watch('__rootElement', (element) => {
        unwatch();
        this.__rootElement = element;
        this._appendInnerDirectiveToElement();
      });
    }
  };


  return () =>
    ({
      restrict: 'E',
      replace: true,
      scope: {},
      bindToController: {
        isCheese: '='
      },
      controller,
      controllerAs: 'ctrl',
      link
    });
};

export default (ngModule) => {
  ngModule.directive('gsBang', gsBang());
  ngModule.directive('gsBoom', gsBoom());
  ngModule.directive('gsSimple', gsSimple());
  ngModule.directive('gsToggle', gsToggle())
}
