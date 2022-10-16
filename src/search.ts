import { renderToast } from "./lib.js";
import { getPlaces } from "./product.js";
export let searchTimeout: any;
export const prepareSearching = (): void => {
    const searchForm: HTMLFormElement = document.querySelector('#search-form-data') as HTMLFormElement;
    const checkOutElement = searchForm.querySelector('#check-out-date') as HTMLInputElement;
    const checkInElement = searchForm.querySelector('#check-in-date') as HTMLInputElement;
    const cityEl: HTMLInputElement = searchForm.querySelector('#city') as HTMLInputElement;
    const maxPriceElement = searchForm.querySelector('#max-price') as HTMLInputElement;
    checkOutElement.addEventListener('change',() => {
        if(searchTimeout) clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => 
        renderToast({text: 'Данные устарели, обновите поиск', type: 'success'},
        {name: 'Обновить', handler: () => getPlaces(cityEl.value, new Date(checkInElement.value), 
        new Date(checkOutElement.value), +maxPriceElement.value)}),300000)
    })
    checkInElement.addEventListener('change', () => {
        if(searchTimeout) clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => 
        renderToast({text: 'Данные устарели, обновите поиск', type: 'success'},
        {name: 'Обновить', handler: () => getPlaces(cityEl.value, new Date(checkInElement.value), 
        new Date(checkOutElement.value), +maxPriceElement.value)}),300000)
    })
    searchForm.onsubmit = async  (e:Event) => {
        e.preventDefault();
        getPlaces(cityEl.value, new Date(checkInElement.value), new Date(checkOutElement.value), +maxPriceElement.value)
    }
}
