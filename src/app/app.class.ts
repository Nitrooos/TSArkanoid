import { Board } from './board/board.model';
import { Renderer } from './board/renderer.model';
import { debounce } from './shared/delay.utils';

export class App {
  private firstLevel = new Board();
  private renderer = new Renderer('canvas', this.firstLevel.blocksInRow);

  public run() {
    this.renderer.adjustCanvasDimensions(this.firstLevel);
    window.addEventListener(
      'resize',
      debounce(
        this.renderer.adjustCanvasDimensions.bind(
          this.renderer, this.firstLevel,
        ),
        100,
        false,
      ),
    );
    window.requestAnimationFrame(() => this.renderer.run(this.firstLevel));
  }
}
