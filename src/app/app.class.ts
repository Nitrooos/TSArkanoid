import { debounce } from 'app/shared/delay.utils';

export class App {
  public run() {
    this.updateCanvasHeight();
    window.addEventListener(
      'resize',
      debounce(this.updateCanvasHeight, 100, false),
    );
  }

  private updateCanvasHeight() {
    const canvasElement =
      document.getElementById('canvas') as HTMLCanvasElement;
    canvasElement.height = canvasElement.clientWidth;
  }
}
