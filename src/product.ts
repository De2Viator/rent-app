import { getFavourites } from "./favourite.js"
import { renderBlock } from "./lib.js";
import { searchTimeout } from "./search.js";
import { search } from "./shared/data/products.js";
import { Filters } from "./shared/types/filters.js";
import { Place } from "./shared/types/place"

export const getPlaces = async (city: string, checkIn: Date, checkOut: Date,price: number,filter: Filters,providers:string[]): Promise<void> => {
    if(searchTimeout) clearTimeout(searchTimeout);
    let result = '';
    let places = await search({ city, checkIn, checkOut, price, providers})
    if(!(places  instanceof Error)) {
        if(filter === 'cheap') places = places.sort((firstPlace,secondPlace) => firstPlace.price - secondPlace.price)
        if(filter === 'expensive') places = places.sort((firstPlace,secondPlace) => secondPlace.price - firstPlace.price)
        if(filter === 'close') places = places.sort((firstPlace, secondPlace) => firstPlace.remoteness - secondPlace.remoteness)
        for(const place of places ) {
            result+=renderPlace(place);
        } 
    }
    renderBlock('search-results-block', result);
}  
export const renderPlace= (place: Place): string => {
    return`
                <div class='result-container'>
                    <img class='result-img' src=${place.image} />
                    <div class='result-info' data-id=${place.id} data-provider=${place.provider} data-name=${place.name} data-image=${place.image}>
                        <div class='result-info--header'>
                            <p>${place.name}</p>
                        </div>
                        <div class='result-info--descr'>
                            <p>${place.description}</p>
                        </div>
                        <div class='result-info--map'>
                            <p>${place.remoteness}</p>
                        </div>
                        <div class='result-info--footer'>
                            <button class='book'>Бронировать</button>
                            <p>${place.price}$</p>
                        </div>
                        <div class='favorites ${getFavourites().some(placeElement => placeElement.id === place.id) ? 'active' :''}'>
                        </div> 
                    </div>
                </div>`
}