import { getSourceURI } from '../AutoScaleImage';

describe('getSourceURI', () => {
  it('should return undefined from local source ', () => {
    const source = require('../../example/assets/favicon.png');
    expect(getSourceURI(source)).toBe(undefined);
  });

  it('should return an URI from remote source', () => {
    const source = {
      uri: 'https://example.com/image.png',
    };
    expect(getSourceURI(source)).toBe('https://example.com/image.png');

    const sources = [
      { uri: 'https://example.com/image.png' },
      { uri: 'https://example.com/image2.png' },
    ];
    expect(getSourceURI(sources)).toBe('https://example.com/image.png');
  });
});
