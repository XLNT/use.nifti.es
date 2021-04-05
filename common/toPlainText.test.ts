import { toPlainText } from './toPlainText';

const JUST_SOME_TEXT = 'just some text';

const AMULET_DESCRIPTION =
  "```\n     ✦\n•  ° °\n•✯    \n. ·   \n✸ .   \n  ✶✸  \n```\n\n# About this amulet\nThis is an amulet, a short poem with a lucky SHA-256 hash, explained [here](https://text.bargains/).\n\nYou can find and mint your own amulets at [amulet.garden](https://at.amulet.garden/).\n\nThis poem's rarity is mythic.\n\n\n[Here](https://registry\\.verra\\.org/myModule/rpt/myrpt\\.asp?r\\=206\\&h\\=127560) is a record of the carbon offset purchased in this poem's name.\n";

const PLAINTEXT_AMULET_DESCRIPTION = `About this amulet This is an amulet, a short poem with a lucky SHA-256 hash, explained here. You can find and mint your own amulets at amulet.garden. This poem's rarity is mythic. Here is a record of the carbon offset purchased in this poem's name.`;

describe('toPlainText', () => {
  it('handles empty string', async () => {
    expect(await toPlainText('')).toEqual('');
  });

  it('handles plain text', async () => {
    expect(await toPlainText(JUST_SOME_TEXT)).toEqual(JUST_SOME_TEXT);
  });

  it('handles complex markdown', async () => {
    expect(await toPlainText(AMULET_DESCRIPTION)).toEqual(PLAINTEXT_AMULET_DESCRIPTION);
  });
});
