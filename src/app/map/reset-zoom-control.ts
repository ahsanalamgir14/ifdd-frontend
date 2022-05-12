import { Control } from 'ol/control';


export class ResetZoomControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options: any) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = '';

    const element = document.createElement('div');
    element.className = 'ol-reset-zoom-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.resetZoom.bind(this), false);
  }

  resetZoom() {
    this.getMap()?.getView().setZoom(1);
  }
}
