import { SearchFormData } from "../types/search";

export const getFavouritesAmount:() => unknown = () => {
    let amount: unknown = localStorage.getItem('favoritesAmount');
    if(amount === null || amount === undefined) amount = 0;
    else amount = +amount;
    return amount
}

export const prepareSearching = () => {
    const searchForm: HTMLFormElement = document.querySelector('#search-form-data') as HTMLFormElement;
    searchForm.onsubmit = (e:Event) => {
        e.preventDefault();
        const cityEl: HTMLInputElement = searchForm.querySelector('#city') as HTMLInputElement;
        const checkInElement = searchForm.querySelector('#check-in-date') as HTMLInputElement;
        const maxPriceElement = searchForm.querySelector('#max-price') as HTMLInputElement;
        const checkOutElement = searchForm.querySelector('#check-out-date') as HTMLInputElement;
        search({ city: cityEl.value, checkIn: checkInElement.value, checkOut: checkOutElement.value, price: +maxPriceElement.value}, (results) => {
            console.log(results)
        })
    }
}
interface Place {
    test: string;
}
export const search = (searchData:SearchFormData, callback?:(results:Error|Place[]) => void) => {
    if(callback) {
        setTimeout(() => {
            const chance = Math.random() * 100;
            if(chance > 50) callback([{test:'1'}])
            else callback(new Error('Error'));
        },500)
    }
}