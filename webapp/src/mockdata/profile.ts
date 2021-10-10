export interface IMockAccount {
  _id: string,
  type: string,
  nickname: string,
  rewards: number,
  balance: number,
  account_number: string,
  customer_id: string
}

export const getMockAccountList = (): IMockAccount[] => [
  {
    _id: "12345",
    type: "checking",
    nickname: "money",
    rewards: 0,
    balance: 1000,
    account_number: "0000",
    customer_id: "1323"
  },
  {
    _id: "12345",
    type: "savings",
    nickname: "save",
    rewards: 0,
    balance: 10000,
    account_number: "0001",
    customer_id: "1323"
  },
  {
    _id: "12345",
    type: "Credit Card",
    nickname: "card",
    rewards: 0,
    balance: 300,
    account_number: "0002",
    customer_id: "1323"
  },
]
