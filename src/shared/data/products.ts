import { FlatRentSdk } from "../flat-sdk/flat-rent-sdk.js";
import { Place, Provider } from "../types/place.js";
import { SearchFormData } from "../types/search.js";

export const search = async (searchData:SearchFormData, callback?:(results:Error|Place[]) => void): Promise<Error | Place[]> => {
    let places:Place[] = []
    if(searchData.providers.some(provider => provider === 'homy')) {
        const result: Place[] =  await fetch(`http://localhost:3030/places?coordinates=59.9386,30.3141&checkInDate=${searchData.checkIn.getTime()}&checkOutDate=${searchData.checkOut.getTime()}${searchData.price ? `&maxPrice=${searchData.price}` :''}`)
        .then(result => result.json());
        result.forEach(result => {
            result.provider = 'homy';
            places.push(result)
        })
    }
    if(searchData.providers.some(provider => provider === 'flat-rent')) {
        const result = await new FlatRentSdk().search({city: searchData.city, checkInDate: searchData.checkIn, 
        checkOutDate: searchData.checkOut, priceLimit: searchData.price});

        if(!(result instanceof Error)) {
            result.forEach(res => {
                res.provider = 'homy'
                places.push(res as Place)
            })
        }
    }
    if(callback) callback(places);
    return places;
}

export const book = async (flatId: string, checkInDate: Date, checkOutDate: Date, provider: Provider ) => {
    let result;
    if(provider === 'homy') {
        result = await fetch(`http://localhost:3030/places/${flatId}?checkInDate=${checkInDate.getTime()}&checkOutDate=${checkOutDate.getTime()}`, {
            method:'PATCH'
        }).then(result => result.json());
    }
    if(provider === 'flat-rent') {
        result =  await new FlatRentSdk().book(flatId, checkInDate, checkOutDate);
    }
    return result;
}