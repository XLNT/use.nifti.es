import { toPlainText } from './toPlainText';
import { AssetMetadata } from './types/AssetMetadata';

const ALT_MAX_LENGTH = 256;
const truncate = (text: string, length = ALT_MAX_LENGTH, postfix = '…') =>
  text.length > length ? `${text.substring(0, length - postfix.length)}${postfix}` : text;

export async function resolveAlt(metadata: AssetMetadata) {
  const description = await toPlainText(metadata.description ?? '');
  const name = metadata.name ?? '';

  const alt = [name, description].filter(Boolean).join(' — ');
  return truncate(alt);
}
