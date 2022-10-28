import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getUserData } from './shared/data/user.js'
import { getFavourites } from './favourite.js'
import { prepareSearching } from './search.js'
import { prepareFavourite } from "./favourite.js"
import { prepareBooking } from './book.js'

window.addEventListener('DOMContentLoaded', () => {
  const user = getUserData();
  const favouriteAmounts = getFavourites().length;
  renderUserBlock(user.userName as string,user.avatarUrl as string, favouriteAmounts as number)
  renderSearchFormBlock()
  renderSearchStubBlock()
  prepareSearching();
  prepareFavourite();
  prepareBooking();
  renderToast(
      {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
      {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})
