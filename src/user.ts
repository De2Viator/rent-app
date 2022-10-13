import { renderBlock } from './lib.js'

export function renderUserBlock (name: string, userAvatar: string, favoriteItemsAmount:number) {
  const favoritesCaption: string | number = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems: boolean = favoriteItemsAmount ? true : false
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${userAvatar}" alt="${name}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
