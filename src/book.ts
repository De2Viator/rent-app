import { book } from "./shared/data/products.js";
import { Provider } from "./shared/types/place";

export const prepareBooking = ():void => {
    const searchEl = document.getElementById('search-results-block') as HTMLDivElement;
    searchEl.addEventListener('click',(e: Event) => {
        const buttonEl = e.target as HTMLButtonElement
        const checkOutEl = document.getElementById('check-out-date') as HTMLInputElement;
        const checkInEl = document.getElementById('check-in-date') as HTMLInputElement;
        if(buttonEl.classList.contains('book')) {
            const infoEl = ((buttonEl.offsetParent as HTMLDivElement).offsetParent as HTMLDivElement).dataset;
            book(infoEl['id'] as string, new Date(checkInEl.value), new Date(checkOutEl.value), infoEl['provider'] as Provider)
        }
    })
}
