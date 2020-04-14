declare global {
  interface Window {
    liff: any
  }
}

export interface LineUser {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export interface User {
  id: string
  count: number
}

export interface BotUser {
  id: string
  displayName: string
  pictureUrl?: string
  active: boolean
}

export interface Item {
  id: string
  name: string
  unitPrice: number
  slot: number
  imageUrl: string
  thumbnailUrl: string
  active: boolean
}

export enum PayStatus {
  UNKNOWN = '',
  ORDERED = 'ORDERED',
  WAIT_FOR_PAYMENT_DONE = 'WAIT_FOR_PAYMENT_DONE',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PAYMENT_ERROR = 'PAYMENT_ERROR'
}

export enum PrizeStatus {
  NONE = '',
  WIN = 'WIN',
  LOSE = 'LOSE'
}

export enum CurrencyType {
  JPY = 'JPY',
  USD = 'USD',
  TWD = 'TWD',
  THB = 'THB'
}

export interface IOrder {
  id: string
  userId: string
  itemId: string
  quantity: number
  title: string
  payStatus: PayStatus
  amount: number
  currency: CurrencyType
  transactionId?: string
  orderedAt: Date
  paidAt?: Date
  prizeStatus: PrizeStatus
  prizedAt?: Date
}

export class Order implements IOrder {
  id: string
  userId: string
  itemId: string
  quantity: number
  title: string
  payStatus: PayStatus
  amount: number
  currency: CurrencyType
  transactionId?: string
  orderedAt: Date
  paidAt?: Date
  prizeStatus: PrizeStatus
  prizedAt?: Date

  constructor(id_: string, user_: BotUser, item_: Item, title_: string) {
    this.id = id_
    this.userId = user_.id
    this.itemId = item_.id
    this.quantity = 1
    this.title = title_
    this.payStatus = PayStatus.ORDERED
    this.amount = item_.unitPrice * this.quantity
    this.currency = CurrencyType.JPY
    this.orderedAt = new Date()
    this.prizeStatus = PrizeStatus.NONE
  }
}

class BaseError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = new.target.name
    // 下記の行はTypeScriptの出力ターゲットがES2015より古い場合(ES3, ES5)のみ必要
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class LiffError extends BaseError {
  constructor(public code: string, message: string) {
    super(message)
  }
}

export class DataNotFoundError extends BaseError {}
