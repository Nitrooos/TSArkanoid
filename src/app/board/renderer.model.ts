import { Board } from './board.model';
import { IRenderSettings } from './render-settings.interface';
import { ViewManager } from './view-manager.model';

export class Renderer {
  private viewManager = new ViewManager();
  private renderSettings: IRenderSettings;
  private canvasElement: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(canvasId: string, blocksInRow: number) {
    this.canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
    if (this.canvasElement === null) {
      throw new ReferenceError(`Canvas with id: ${canvasId} does not exist`);
    }
    this.context =
      this.canvasElement.getContext('2d') as CanvasRenderingContext2D;
    this.renderSettings = this.viewManager.calculateRenderSettings(
      this.canvasElement.clientWidth, blocksInRow,
    );
  }

  public run(board: Board) {
    board.blocksMap.forEach((row, index) => this.drawRow(row, index));
  }

  public adjustCanvasDimensions(board: Board) {
    this.renderSettings = this.viewManager.calculateRenderSettings(
      this.canvasElement.clientWidth, board.blocksInRow,
    );
    this.canvasElement.width = this.canvasElement.clientWidth;
    this.canvasElement.height =
      board.blocksInRow * 2 * this.renderSettings.blockSize.height;
    this.run(board);
  }

  private drawRow(row: number[], rowIndex: number) {
    row
      .filter((block: number) => block !== 0)
      .forEach((block: number, colIndex: number) => {
        this.context.fillStyle = 'green';
        this.context.fillRect(
          colIndex * (this.renderSettings.blockSize.width + 1)
            + this.renderSettings.firstBlockOffset,
          rowIndex * (this.renderSettings.blockSize.height + 1),
          this.renderSettings.blockSize.width,
          this.renderSettings.blockSize.height,
        );
    });
  }
}
