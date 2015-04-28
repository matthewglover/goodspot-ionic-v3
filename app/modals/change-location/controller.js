import {isNil} from 'ramda';
import addLocationTemplate from '../add-location/template.html'


export default class ChangeLocationController {

  __$scope
  __$ionicModal

  constructor($scope, $ionicModal) {
    this.__$scope = $scope;
    this.__$ionicModal = $ionicModal;
  }


  close() {
    if (isNil(this.__$scope.__modal)) return;
    this.__$scope.__modal.remove();
  }


  addLocation() {
    const modalScope = this.__$scope.$new();
    const modal =
      this.__$ionicModal.fromTemplate(addLocationTemplate, {
        scope: modalScope,
        animation: 'slide-in-up'
      });

    modalScope.__modal = modal;

    modal.show();
  }
}
