/* eslint-disable import/no-extraneous-dependencies */
import { el } from 'redom';

export async function nowTimeValuts() {
  const h1 = el('h1.nowTimeValuts__title', 'Изменение курсов в реальном времени');
  const ul = el('ul.nowTimeValuts__ul');

  const socket = new WebSocket('ws://localhost:3001/currency-feed');

  socket.addEventListener('open', () => {
    socket.send('Hello Server!');
  });

  socket.addEventListener('message', (event) => {
    const date = JSON.parse(event.data);
    const icon = el('svg');
    const line = el('p.yourValuts__line');
    const amount = el('p.nowTimeValuts__amount', String(date.rate));
    const name = el('p.nowTimevaluts__name', `${date.from}/${date.to}`);

    const li = el('li.nowTimeValuts__li', name, line, amount, icon);
    if (ul.children[14]) ul.children[14].remove();
    if (date.change === 1) {
      line.style.borderColor = '#76CA66';
      icon.innerHTML += `
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 10L10 0L0 10L20 10Z" fill="#76CA66"/>
  </svg>
      `;
    } else {
      line.style.borderColor = '#FD4E5D';
      icon.innerHTML += `
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0L10 10L20 0H0Z" fill="#FD4E5D"/>
  </svg>
          `;
    }

    ul.prepend(li);
  });

  socket.addEventListener('close', () => {
    console.log('Connection closed');
  });

  const container = el('div.nowTimeValuts__container', h1, ul);
  return container;
}
