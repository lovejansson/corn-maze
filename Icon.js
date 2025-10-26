const svgs = {
    "x": `<svg xmlns="http://www.w3.org/2000/svg" id="icon-x" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true"> <path d="
        M2 2h2v2H2V2Z M4 4h2v2H4V4Z M6 6h2v2H6V6Z M8 8h2v2H8V8Z M10 10h2v2h-2v-2Z
        M12 12h2v2h-2v-2Z M14 14h2v2h-2v-2Z M16 16h2v2h-2v-2Z M18 18h2v2h-2v-2Z M20 20h2v2h-2v-2Z
        M2 4h2v2H2V4Z M4 6h2v2H4V6Z M6 8h2v2H6V8Z M8 10h2v2H8v-2Z M10 12h2v2h-2v-2Z
        M12 14h2v2h-2v-2Z M14 16h2v2h-2v-2Z M16 18h2v2h-2v-2Z M18 20h2v2h-2v-2Z

        M20 2h2v2h-2V2Z M18 4h2v2h-2V4Z M16 6h2v2h-2V6Z M14 8h2v2h-2V8Z M12 10h2v2h-2v-2Z
        M10 12h2v2h-2v-2Z M8 14h2v2H8v-2Z M6 16h2v2H6v-2Z M4 18h2v2H4v-2Z M2 20h2v2H2v-2Z
        M20 4h2v2h-2V4Z M18 6h2v2h-2V6Z M16 8h2v2h-2V8Z M14 10h2v2h-2v-2Z M12 12h2v2h-2v-2Z
        M10 14h2v2h-2v-2Z M8 16h2v2H8v-2Z M6 18h2v2H6v-2Z M4 20h2v2H4v-2Z
  "/></svg>`,
    "blue-sky": `<svg xmlns="http://www.w3.org/2000/svg" id="icon-bluesky" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
  <path d="
    <!-- left top wing -->
    M4 4h2v2H4V4Z M6 4h2v2H6V4Z
    M2 6h2v2H2V6Z M4 6h2v2H4V6Z M6 6h2v2H6V6Z M8 6h2v2H8V6Z
    M4 8h2v2H4V8Z M6 8h2v2H6V8Z M8 8h2v2H8V8Z

    <!-- left bottom wing -->
    M2 12h2v2H2v-2Z M4 12h2v2H4v-2Z
    M4 14h2v2H4v-2Z M6 14h2v2H6v-2Z
    M6 16h2v2H6v-2Z

    <!-- right top wing -->
    M18 4h2v2h-2V4Z M16 4h2v2h-2V4Z
    M20 6h2v2h-2V6Z M18 6h2v2h-2V6Z M16 6h2v2h-2V6Z M14 6h2v2h-2V6Z
    M18 8h2v2h-2V8Z M16 8h2v2h-2V8Z M14 8h2v2h-2V8Z

    <!-- right bottom wing -->
    M20 12h2v2h-2v-2Z M18 12h2v2h-2v-2Z
    M18 14h2v2h-2v-2Z M16 14h2v2h-2v-2Z
    M16 16h2v2h-2v-2Z

    <!-- body -->
    M10 8h2v2h-2V8Z
    M10 10h2v2h-2v-2Z
    M10 12h2v2h-2v-2Z
    M10 14h2v2h-2v-2Z
    M12 8h2v2h-2V8Z
    M12 10h2v2h-2v-2Z
    M12 12h2v2h-2v-2Z
    M12 14h2v2h-2v-2Z
  "/>
</svg>
`,
    "github": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="currentColor" d="M5 2h4v2H7v2H5V2Zm0 10H3V6h2v6Zm2 2H5v-2h2v2Zm2 2v-2H7v2H3v-2H1v2h2v2h4v4h2v-4h2v-2H9Zm0 0v2H7v-2h2Zm6-12v2H9V4h6Zm4 2h-2V4h-2V2h4v4Zm0 6V6h2v6h-2Zm-2 2v-2h2v2h-2Zm-2 2v-2h2v2h-2Zm0 2h-2v-2h2v2Zm0 0h2v4h-2v-4Z"/> </svg>',
    "sun": '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"> <path d="M13 0h-2v4h2V0ZM0 11v2h4v-2H0Zm24 0v2h-4v-2h4ZM13 24h-2v-4h2v4ZM8 6h8v2H8V6ZM6 8h2v8H6V8Zm2 10v-2h8v2H8Zm10-2h-2V8h2v8Zm2-14h2v2h-2V2Zm0 2v2h-2V4h2Zm2 18h-2v-2h2v2Zm-2-2h-2v-2h2v2ZM4 2H2v2h2v2h2V4H4V2ZM2 22h2v-2h2v-2H4v2H2v2Z"/> </svg>',
    "moon": '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"> <path d="M20 0h2v2h2v2h-2v2h-2V4h-2V2h2V0ZM8 4h8v2h-2v2h-2V6H8V4ZM6 8V6h2v2H6Zm0 8H4V8h2v8Zm2 2H6v-2h2v2Zm8 0v2H8v-2h8Zm2-2v2h-2v-2h2Zm-2-4v-2h2V8h2v8h-2v-4h-2Zm-4 0h4v2h-4v-2Zm0 0V8h-2v4h2Zm-8 6H2v2H0v2h2v2h2v-2h2v-2H4v-2Z"/> </svg>',
    "open" : '<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M5 3h6v2H5v14h14v-6h2v8H3V3h2zm8 0h8v8h-2V7h-2V5h-4V3zm0 8h-2v2H9v2h2v-2h2v-2zm4-4h-2v2h-2v2h2V9h2V7z" fill="currentColor"/> </svg>',
"download": `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M11 4h2v8h2v2h-2v2h-2v-2H9v-2h2V4zm-2 8H7v-2h2v2zm6 0v-2h2v2h-2zM4 18h16v2H4v-2z" fill="currentColor"/> </svg>`,
"x":  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="currentColor" d="
    M4 2h2v2H4V2Z
    M20 2h2v2h-2V2Z
    M2 4h2v2H2V4Z
    M6 4h2v2H6V4Z
    M18 4h2v2h-2V4Z
    M4 6h2v2H4V6Z
    M8 6h2v2H8V6Z
    M16 6h2v2h-2V6Z
    M6 8h2v2H6V8Z
    M10 8h2v2h-2V8Z
    M14 8h2v2h-2V8Z
    M8 10h2v2H8V10Z
    M12 10h2v2h-2V10Z
    M10 12h2v2h-2V12Z
    M14 12h2v2h-2V12Z
    M8 14h2v2H8V14Z
    M12 14h2v2h-2V14Z
    M16 14h2v2h-2V14Z
    M6 16h2v2H6V16Z
    M14 16h2v2h-2V16Z
    M18 16h2v2h-2V16Z
    M4 18h2v2H4V18Z
    M16 18h2v2h-2V18Z
    M20 18h2v2h-2V18Z
    M2 20h2v2H2V20Z
    M18 20h2v2h-2V20Z
  "/>
</svg>


`,
"bsky": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="currentColor" d="
    M2 2h4v2H2V2Z
    M18 2h4v2h-4V2Z
    M2 4h2v8H2V4Z
    M6 4h2v2H6V4Z
    M16 4h2v2h-2V4Z
    M20 4h2v8h-2V4Z
    M8 6h2v2H8V6Z
    M14 6h2v2h-2V6Z
    M10 8h4v2h-4V8Z
    M4 12h4v2H4v-2Z
    M16 12h4v2h-4v-2Z
    M8 14h2v2H8v-2Z
    M14 14h2v2h-2v-2Z
    M6 16h2v2H6v-2Z
    M16 16h2v2h-2v-2Z
    M4 18h2v2H4v-2Z
    M10 18h4v2h-4v-2Z
    M18 18h2v2h-2v-2Z
    M6 20h4v2H6v-2Z
    M14 20h4v2h-4v-2Z
  "/>
</svg>

`,
"menu": `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z" fill="currentColor"/> </svg>`,
"keyboard": `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M21 3H3v18h18V3zM5 19V5h14v14H5zM9 7H7v2h2V7zm8 8H7v2h10v-2zm-2-8h2v2h-2V7zm-2 0h-2v2h2V7zm-6 4h2v2H7v-2zm10 0h-2v2h2v-2zm-6 0h2v2h-2v-2z" fill="currentColor"/> </svg>`
  
, "warning": `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M3 3h16v2H5v14h14v2H3V3zm18 0h-2v18h2V3zM11 15h2v2h-2v-2zm2-8h-2v6h2V7z" fill="currentColor"/> </svg>`
, "hour-glass": `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M18 2H6v6h2v2h2v4H8v2H6v6h12v-6h-2v-2h-2v-4h2V8h2V2zm-2 6h-2v2h-4V8H8V4h8v4zm-2 6v2h2v4H8v-4h2v-2h4z" fill="currentColor"/> </svg>`}   

export default class Icon extends HTMLElement {
    static observedAttributes = ["name", "class", "id", "size"];

    constructor() {
        super();
    }

    async connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        const svg = svgs[this.getAttribute("name")];

        if(!svg) {
            throw new Error(`Icon ${this.getAttribute("name")} not found`);
        }

        const parser = new DOMParser();
        const svgElement = parser.parseFromString(svg, "image/svg+xml").documentElement;

        svgElement.setAttribute("class", this.getAttribute("class"));
        svgElement.setAttribute("id", this.getAttribute("id"));

        svgElement.style.width = this.getAttribute("size") || "24px";
        svgElement.style.height = this.getAttribute("size") || "24px";

        shadowRoot.appendChild(svgElement);

    }

    attributeChangedCallback(name, oldValue, newValue) {
      // console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}`);
    }
 
}

customElements.define("pim-icon", Icon);