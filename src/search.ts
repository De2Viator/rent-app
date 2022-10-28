import { renderToast } from "./lib.js";
import { getPlaces } from "./product.js";
export let searchTimeout: any;
export const prepareSearching = (): void => {
    const searchForm: HTMLFormElement = document.querySelector('#search-form-data') as HTMLFormElement;
    const checkOutElement = searchForm.querySelector('#check-out-date') as HTMLInputElement;
    const checkInElement = searchForm.querySelector('#check-in-date') as HTMLInputElement;
    const cityEl: HTMLInputElement = searchForm.querySelector('#city') as HTMLInputElement;
    const maxPriceElement = searchForm.querySelector('#max-price') as HTMLInputElement;
    const providersEl = searchForm.querySelectorAll('input[name=\'provider\']') as unknown as HTMLInputElement[];

    const restartSearching = (): void => {
        if(searchTimeout) clearTimeout(searchTimeout)
        const providers:string[] = Array.from(providersEl).filter(provider => provider.checked).map(provider => provider.value);
        searchTimeout = setTimeout(() => 
        renderToast({text: 'Данные устарели, обновите поиск', type: 'success'},
        {name: 'Обновить', handler: () => getPlaces(cityEl.value, new Date(checkInElement.value), 
        new Date(checkOutElement.value), +maxPriceElement.value, providers)}),300000)
    }

    checkOutElement.addEventListener('change',() => restartSearching());
    checkInElement.addEventListener('change', () => restartSearching());

    searchForm.onsubmit = (e:Event) => {
        e.preventDefault();
        const providers:string[] = Array.from(providersEl).filter(provider => provider.checked).map(provider => provider.value);
        getPlaces(cityEl.value, new Date(checkInElement.value), new Date(checkOutElement.value), +maxPriceElement.value, providers)
    }
}
