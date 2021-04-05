import remark from 'remark';
import strip from 'strip-markdown';

const processor = remark().use(strip);

export async function toPlainText(input: string) {
  return processor.process(input).then((file) =>
    file.contents
      .toString()
      .trim()
      .replace(/[\r\n]+/g, ' '),
  );
}
