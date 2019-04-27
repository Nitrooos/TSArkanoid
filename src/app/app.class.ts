import { debounce } from 'app/shared/delay.utils';

export class App {
  private static readonly BLOCKS_IN_ROW = 13;
  private static readonly LEVEL_1_MAP: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  private canvasElement: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private blockSize = {
    height: 0,
    width: 0,
  };
  private firstBlockOffset = 0;

  constructor(canvasId: string) {
    this.canvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
    if (this.canvasElement === null) {
      throw new ReferenceError(`Canvas with id: ${canvasId} does not exist`);
    }
    this.context =
      this.canvasElement.getContext('2d') as CanvasRenderingContext2D;
  }

  public run() {
    this.updateBoardDimensions();
    window.addEventListener(
      'resize',
      debounce(this.updateBoardDimensions.bind(this), 100, false),
    );
    window.requestAnimationFrame(this.drawGameBoard.bind(this));
  }

  private updateBoardDimensions() {
    this.canvasElement.width = this.canvasElement.clientWidth;
    this.blockSize = {
      height: Math.floor(this.canvasElement.width / App.BLOCKS_IN_ROW / 2),
      width: Math.floor(this.canvasElement.width / App.BLOCKS_IN_ROW - 1),
    };

    this.canvasElement.height = App.BLOCKS_IN_ROW * 2 * this.blockSize.height;
    this.firstBlockOffset = this.calculateFirstBlockOffset();
    this.drawGameBoard();
  }

  private drawGameBoard() {
    App.LEVEL_1_MAP.forEach(this.drawGameRow.bind(this));
  }

  private drawGameRow(row: number[], rowIndex: number) {
    row
      .filter((block: number) => block !== 0)
      .forEach((block: number, colIndex: number) => {
        this.context.fillStyle = 'green';
        this.context.fillRect(
          colIndex * (this.blockSize.width + 1) + this.firstBlockOffset,
          rowIndex * (this.blockSize.height + 1),
          this.blockSize.width,
          this.blockSize.height,
        );
    });
  }

  private calculateFirstBlockOffset() {
    const pixelsNeededForAllBLocks =
      (this.blockSize.width + 1) * App.BLOCKS_IN_ROW;
    const spaceAroundCornerBlocks =
      (this.canvasElement.width - pixelsNeededForAllBLocks) / 2;
    return Math.floor(spaceAroundCornerBlocks);
  }
}
