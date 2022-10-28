export declare interface Flat {
    provider: string
    bookedDates: [number, number]
    description:string
    id: number 
    image: string
    name: string
    price: number
    remoteness: number
}
export declare interface SearchParameters {
    city: string;
    checkInDate: Date;
    checkOutDate: Date;
    priceLimit?: number;
}
export declare const database:Flat[];
export declare function addDays(date:Date, days: number): Date;
export declare function cloneDate(date: Date): Date;
export declare class FlatRentSdk {
    get(id: string): Promise<null| Pick<Flat,'price'>>
    search(parameters:SearchParameters): Promise<Flat[]|Error>
    book(flatId: string, checkInDate: Date, checkOutDate: Date): Error | Promise<Function>
    _formatFlatObject(flat:Flat, nightNumber: number| null): Pick<Flat,'price'>
    _resetTime(date: Date): void
    _calculateDifferenceInDays(startDate: Date, endDate: Date): number
    _generateDateRange(from: Date, to:Date): number[]
    _generateTransactionId(): number;
    _areAllDateAvailables(flat: Flat, dateRange: number): boolean
    _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): Error | void
    _readDatabase(): null | Flat[]
    _writeDatabase(database: Flat[]): void
    _syncDatabase(database:Flat[]): void
}