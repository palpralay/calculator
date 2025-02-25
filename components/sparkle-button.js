// Create template element
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
        }
        
        :host([color="red"]) .button span {
            color: red;
        }
        
        :host([color="orange"]) .button span {
            color: orange;
        }
        
        :host([color="green"]) .button span {
            color: green;
        }
        
        :host([color="yellow"]) .button span {
            color: yellow;
        }
        
        :host([color="aqua"]) .button span {
            color: aqua;
        }
        
        .button {
            --black-700: hsla(0 0% 12% / 1);
            --border_radius: 9999px;
            --transtion: 0.3s ease-in-out;
            --offset: 2px;
            --active: 0;

            cursor: pointer;
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transform-origin: center;
            padding: 1rem 2rem;
            background-color: transparent;
            border: none;
            border-radius: var(--border_radius);
            transform: scale(calc(1 + (var(--active) * 0.1)));
            transition: transform var(--transtion);
        }

        .button::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background-color: var(--black-700);
            border-radius: var(--border_radius);
            box-shadow: inset 0 0.5px hsl(0, 0%, 100%), 
                    inset 0 -1px 2px 0 hsl(0, 0%, 0%),
                    0px 4px 10px -4px hsla(0 0% 0% / calc(1 - var(--active))),
                    0 0 0 calc(var(--active) * 0.375rem) hsl(260 97% 50% / 0.75);
            transition: all var(--transtion);
            z-index: 0;
        }

        .button::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background-color: hsla(260 97% 61% / 0.75);
            background-image: radial-gradient(
                    at 51% 89%,
                    hsla(266, 45%, 74%, 1) 0px,
                    transparent 50%
                ),
                radial-gradient(at 100% 100%, hsla(266, 36%, 60%, 1) 0px, transparent 50%),
                radial-gradient(at 22% 91%, hsla(266, 36%, 60%, 1) 0px, transparent 50%);
            background-position: top;
            opacity: var(--active);
            border-radius: var(--border_radius);
            transition: opacity var(--transtion);
            z-index: 2;
        }

        .button:is(:hover, :focus-visible) {
            --active: 1;
        }

        .button:active {
            transform: scale(1);
        }

        .dots_border {
            --size_border: calc(100% + 2px);
            overflow: hidden;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: var(--size_border);
            height: var(--size_border);
            background-color: transparent;
            border-radius: var(--border_radius);
            z-index: -10;
        }

        .dots_border::before {
            content: "";
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            transform-origin: left;
            transform: rotate(0deg);
            width: 100%;
            height: 2rem;
            background-color: white;
            mask: linear-gradient(transparent 0%, white 120%);
            animation: rotate 2s linear infinite;
        }

        @keyframes rotate {
            to {
                transform: rotate(360deg);
            }
        }

        .button span {
            position: relative;
            z-index: 10;
            color: white;
            font-size: 20px;
            background-image: linear-gradient(
                90deg,
                currentColor 0%,
                color-mix(in srgb, currentColor, transparent 80%) 120%
            );
            background-clip: text;
            -webkit-background-clip: text;
        }
    </style>
    <button class="button">
        <span>
            <slot></slot>
        </span>
        <div class="dots_border"></div>
    </button>
`;

class PralayButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('pralay-button', PralayButton);
