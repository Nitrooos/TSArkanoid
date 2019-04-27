import { IRenderSettings } from './render-settings.interface';

export class ViewManager {
  public calculateRenderSettings(
    viewportWidth: number, blocksInRow: number,
  ): IRenderSettings {
    const blockSize = {
      height: Math.floor(viewportWidth / blocksInRow / 2),
      width: Math.floor(viewportWidth / blocksInRow - 1),
    };

    const pixelsNeededForAllBLocks = (blockSize.width + 1) * blocksInRow;
    const spaceAroundCornerBlocks =
      (viewportWidth - pixelsNeededForAllBLocks) / 2;
    const firstBlockOffset = Math.floor(spaceAroundCornerBlocks);

    return {
      blockSize,
      firstBlockOffset,
    };
  }
}
