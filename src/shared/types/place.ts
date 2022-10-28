export interface Place {
    bookedDates: number[]
    description:string
    id: number 
    image: string
    name: string
    price: number
    remoteness: number
    provider?: Provider
} 

export type Provider = 'homy'|'flat-rent'
  