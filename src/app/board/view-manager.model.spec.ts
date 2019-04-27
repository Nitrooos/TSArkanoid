import { expect } from 'chai';
import 'mocha';

import { ViewManager } from './view-manager.model';

describe('ViewManager class', () => {
  const viewManager = new ViewManager();

  it('should properly calculate block size and first block offset', () => {
    const simpleCase = viewManager.calculateRenderSettings(110, 10);
    expect(simpleCase).to.deep.equal({
      blockSize: {
        height: 5,
        width: 10,
      },
      firstBlockOffset: 0,
    });

    const moreChallengingCase = viewManager.calculateRenderSettings(500, 13);
    expect(moreChallengingCase).to.deep.equal({
      blockSize: {
        height: 19,
        width: 37,
      },
      firstBlockOffset: 3,
    });
  });
});
