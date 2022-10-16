import { Place } from "../types/place.js";
import { SearchFormData } from "../types/search.js";

export const search = async (searchData:SearchFormData, callback?:(results:Error|Place[]) => void): Promise<Error | Place[]> => {
    const places = await fetch(`http://localhost:3030/places?coordinates=59.9386,30.3141&checkInDate=${searchData.checkIn.getTime()}&checkOutDate=${searchData.checkOut.getTime()}${searchData.price ? `&price=${searchData.price}` : ''}`)
    .then(result => result.json());
    if(callback) {
        callback(places);
    }
    return places;
}