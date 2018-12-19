/* @flow */

import * as BLOCKCHAIN from '../constants/blockchain';
import type { CoreMessage } from './index';
import type { CoinInfo } from './coinInfo';

export type BlockchainConnect = {
    type: typeof BLOCKCHAIN.CONNECT,
    payload: {
        coin: CoinInfo,
        info: {
            fee: string,
            block: number,
        },
    },
}

export type BlockchainError = {
    type: typeof BLOCKCHAIN.ERROR,
    payload: {
        coin: CoinInfo,
        error: string,
    },
}

export type BlockchainBlock = {
    type: typeof BLOCKCHAIN.BLOCK,
    payload: {
        coin: CoinInfo,
        block: number,
        hash: string,
    },
}

// copy-paste from blockchain-link
type BlockchainLinkInput = {
    addresses: Array<string>,
    // amount: string,
    // fee: string,
    // total: string,
}

type BlockchainLinkOutput = {
    addresses: Array<string>,
    // amount: string,
}

export type BlockchainLinkTransaction = {
    type: 'send' | 'recv',
    status: 'pending' | 'confirmed',
    timestamp?: string,
    confirmations: number,
    address: string,
    inputs: Array<BlockchainLinkInput>,
    outputs: Array<BlockchainLinkOutput>,

    hash: string,
    amount: string,
    fee: string,
    total: string,

    sequence?: number, // eth: nonce || ripple: sequence
    signature?: string, // ripple: tx signature
    currency?: string, // eth: tokens
}
// copy-paste from blockchain-link end

export type BlockchainNotification = {
    type: typeof BLOCKCHAIN.NOTIFICATION,
    payload: {
        coin: CoinInfo,
        notification: BlockchainLinkTransaction,
    },
}

export type BlockchainEvent = BlockchainConnect | BlockchainError | BlockchainBlock | BlockchainNotification;

/* eslint-disable no-redeclare */
declare function MessageFactory(type: $PropertyType<BlockchainBlock, 'type'>, payload: $PropertyType<BlockchainBlock, 'payload'>): CoreMessage;
declare function MessageFactory(type: $PropertyType<BlockchainNotification, 'type'>, payload: $PropertyType<BlockchainNotification, 'payload'>): CoreMessage;
declare function MessageFactory(type: $PropertyType<BlockchainConnect, 'type'>, payload: $PropertyType<BlockchainConnect, 'payload'>): CoreMessage;
declare function MessageFactory(type: $PropertyType<BlockchainError, 'type'>, payload: $PropertyType<BlockchainError, 'payload'>): CoreMessage;
/* eslint-enable no-redeclare */

export type BlockchainMessageFactory = typeof MessageFactory;
