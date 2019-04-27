import 'amd-loader';

import { expect } from 'chai';
import 'mocha';

import { Board } from './board.model';

describe('Board class', () => {
  const board = new Board();

  it('should be valid with default map', () => {
    expect(board.valid).to.be.true;
  });
});
