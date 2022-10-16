import { getUserData } from "./shared/data/user.js";
import { Place } from "./shared/types/place";
import { renderUserBlock } from "./user.js";

export const getFavourites:() => Pick<Place, 'id'|'name'|'image'>[]= () => {
    return JSON.parse(localStorage.getItem('favoritesItems')||'[]');
}

export const removeFavourite = (id: number): void => {
    let favouriteItems:Pick<Place, 'id'|'name'|'image'>[] = getFavourites();
    favouriteItems = favouriteItems.filter(place => place.id !== +id);
    setFavourites(favouriteItems)
}

export const addFavourite = (id: number, name: string, image: string): void => {
    const favouriteItems:Pick<Place, 'id'|'name'|'image'>[] = getFavourites();
    favouriteItems.push({id,name,image})
    setFavourites(favouriteItems)
}

export const setFavourites = (favouriteItems: Pick<Place, 'id'|'name'|'image'>[]): void => {
    localStorage.setItem('favoritesItems', JSON.stringify(favouriteItems))
}

export const toggleFavourite = (data: Pick<Place,'id' | 'image' | 'name'> ): boolean=> {
    const {id,name,image} = data;
    const favouriteItems:Pick<Place, 'id'|'name'|'image'>[] = getFavourites();
    if(favouriteItems.some((place) => place.id === +id)) {
        removeFavourite(+data.id)
        return false
    } else {
        addFavourite(+id, name, image)
        return true;
    }
}

export const prepareFavourite = (): void => {
    const searchEl = document.getElementById('search-results-block') as HTMLDivElement;
    searchEl.addEventListener('click', (e) => {
        const el = e.target as HTMLDivElement
        if(el.classList.contains('favorites')) {
            const data:Pick<Place,'id' | 'image' | 'name'> = 
            (el.offsetParent as HTMLDivElement).dataset as unknown as Pick<Place,'id' | 'image' | 'name'> 
            if (toggleFavourite(data)){
                el.classList.add('active')
            } else {
                el.classList.remove('active')
            }
            const user = getUserData();
            renderUserBlock(user.userName as string, user.avatarUrl as string, getFavourites().length)
        }
    })
}


