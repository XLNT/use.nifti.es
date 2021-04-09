import { CAIP2ChainId } from './CAIP2';

type AccountAddress = string;

export interface AccountId {
  chainId: CAIP2ChainId;
  accountAddress: AccountAddress;
}

const SEPARATOR = '@';

// https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md
export function parseCAIP10AccountId(id: string): AccountId {
  if (!id) throw new Error(`${id} is not a valid CAIP-10 AccountId`);

  const [accountAddress, chainId] = id.split(SEPARATOR);
  if (!accountAddress || !chainId) throw new Error(`${id} is not a valid CAIP-10 AccountId`);

  return { chainId, accountAddress };
}

export function encodeCAIP10AccountId(id: AccountId): string {
  return [id.accountAddress, id.chainId].join(SEPARATOR);
}
