import { getAppletsList } from '../../sdk';
const applets = await getAppletsList('/');

export type SelectEvent = CustomEvent<string>;

export class AppletSelect extends HTMLElement {
  selectElem = document.createElement('select');

  connectedCallback() {
    this.selectElem.addEventListener('change', this.handleSelect.bind(this));
    this.render();
  }

  disconnectedCallback() {
    this.selectElem.removeEventListener('change', this.handleSelect.bind(this));
  }

  handleSelect() {
    this.dispatchEvent(
      new CustomEvent('applet-select', { detail: this.selectElem.value })
    );
  }

  render() {
    this.selectElem.innerHTML = applets
      .map((applet) => {
        return `
          <option value=${applet.url}>
            ${applet.name}
          </option>
        `;
      })
      .join('');
    this.appendChild(this.selectElem);
  }
}

customElements.define('applet-select', AppletSelect);
