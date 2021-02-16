import { NoEmbedData } from 'common/types/OEmbed';

export async function getOEmbedData(url: string): Promise<NoEmbedData> {
  const response = await fetch(`https://noembed.com/embed?${new URLSearchParams({ url })}`);

  if (!response.ok) throw new Error(`Unable to fetch oembed: ${url}`);

  const data = await response.json();

  return data as NoEmbedData;
}
