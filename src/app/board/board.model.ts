export class Board {
  private static readonly BLOCKS_IN_ROW = 13;

  public blocksMap: number[][];

  constructor() {
    this.blocksMap = this.getFirstLevel();
  }

  private getFirstLevel() {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  get blocksInRow() {
    return Board.BLOCKS_IN_ROW;
  }

  get valid(): boolean {
    return this.blocksMap.every((row: number[]) =>
      row.length === Board.BLOCKS_IN_ROW,
    );
  }
}
