import { getFavourites } from "./favourite.js"
import { renderBlock } from "./lib.js";
import { searchTimeout } from "./search.js";
import { search } from "./shared/data/products.js";
import { Place } from "./shared/types/place"

export const getPlaces = async (city: string, checkIn: Date, checkOut: Date,price: number) => {
    if(searchTimeout) clearTimeout(searchTimeout)
    const places = await search({ city, checkIn, checkOut, price})
        if(!(places  instanceof Error)) {
            let result = '';
            for(const place of places ) {
                result+=renderPlace(place);
            }
            renderBlock('search-results-block', result); 
    }
}  
export const renderPlace= (place: Place): string => {
    return`
                <div class='result-container'>
                    <img class='result-img' src=${place.image} />
                    <div class='result-info' data-id=${place.id} data-name=${place.name} data-image=${place.image}>
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
                            <p>${place.price}$</p>
                        </div>
                        <div class='favorites ${getFavourites().some(placeElement => placeElement.id === place.id) ? 'active' :''}'>
                        </div> 
                    </div>
                </div>`
}