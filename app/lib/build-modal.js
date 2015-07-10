

export default function buildModal($ionicModal, scope, template) {
  const modal =
    $ionicModal.fromTemplate(template, {scope});

  scope.__modal = modal;

  return {modal, modalScope: scope};
}
