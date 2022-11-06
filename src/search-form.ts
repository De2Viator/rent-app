import { renderBlock } from './lib.js';
import {DateTime} from '../node_modules/luxon/build/es6/luxon.js';

export function renderSearchFormBlock (): void {
  const minDate: string = DateTime.now().minus({days:1}).toSQLDate();
  const maxDate: string = DateTime.now().plus({months:1, days: 30 - new Date().getDate()}).toSQLDate();
  const checkInDate: string = DateTime.now().plus({days:1}).toSQLDate();
  const checkOutDate : string= DateTime.now().plus({days:3}).toSQLDate();
  renderBlock(
    'search-form-block',
    `
    <form id='search-form-data'>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkInDate}" min="${minDate}" max="${maxDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkOutDate}" min="${minDate}" max="${maxDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select id='filter'>
                <option value='cheap' selected="">Сначала дешёвые</option>
                <option value='expensive' selected="">Сначала дорогие</option>
                <option value='close'>Сначала ближе</option>
            </select>
          </div>
          <div>  <div><button>Найти</button></div>
          </div>
          
        </div>
      </fieldset>
    </form>
    `
  )
}
