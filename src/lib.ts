import { Action } from "./types/action"
import { Message } from "./types/message"

export function renderBlock (elementId: string, html:string) {
  const element: HTMLDivElement = document.getElementById(elementId) as HTMLDivElement
  element.innerHTML = html
}

export function renderToast (message:Message|null, action?: Action): void {
  let messageText = ''
  
  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }
  
  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function() {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null)
    }
  }
}