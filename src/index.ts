import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getUserData } from './shared/data/user'
import { getFavouritesAmount, prepareSearching } from './shared/data/products'

window.addEventListener('DOMContentLoaded', () => {
  const user = getUserData();
  const favouriteAmounts = getFavouritesAmount();
  renderUserBlock(user.userName as string,user.avatarUrl as string, favouriteAmounts as number)
  renderSearchFormBlock()
  renderSearchStubBlock()
  prepareSearching();
  renderToast(
      {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
      {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  )
})
