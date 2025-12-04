"use strict";(()=>{function l(){let t=document.currentScript;return t?{style:t.getAttribute("data-style")||"minimal",color:t.getAttribute("data-color")||"#3b82f6",size:t.getAttribute("data-size")||"medium",ai:t.getAttribute("data-ai")||"chatgpt",action:t.getAttribute("data-action")||"Summarize",placement:t.getAttribute("data-placement")||"floating"}:c()}function c(){return{style:"minimal",color:"#3b82f6",size:"medium",ai:"chatgpt",action:"Summarize",placement:"floating"}}function u(){let t=document.querySelector("[data-ai-share-button]");if(t)return t;let e=document.querySelector("article");if(e)return e;let i=[".post-content",".blog-article",".prose",'[role="article"]',".entry-content",".article-content",".content"];for(let n of i){let o=document.querySelector(n);if(o)return o}return null}function d(t,e,i,n){let o=`Analyze the following content from this URL: ${e}`;i&&(o+=`. Text selection: ${i}`),n&&(o+=`. ${n}`);let a=encodeURIComponent(o);switch(t){case"chatgpt":return`https://chat.openai.com/?q=${a}`;case"claude":return`https://claude.ai/new?prompt=${a}`;case"perplexity":return`https://www.perplexity.ai/?q=${a}`;case"gemini":return`https://gemini.google.com/?prompt=${a}`;default:return`https://chat.openai.com/?q=${a}`}}function p(){let t=window.getSelection();return!t||t.rangeCount===0?"":t.toString().trim()}function m(t){let i={small:{padding:"6px 12px",fontSize:"12px"},medium:{padding:"8px 16px",fontSize:"14px"},large:{padding:"12px 24px",fontSize:"16px"}}[t.size];return`
    .ai-share-button {
      ${`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${i.padding};
    font-size: ${i.fontSize};
    font-weight: 500;
    color: white;
    background-color: ${t.color};
    border: none;
    border-radius: ${t.style==="pill"?"9999px":"6px"};
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  `}
    }
    .ai-share-button:hover {
      
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
    }
    .ai-share-button:active {
      transform: translateY(0);
    }
    .ai-share-button-floating {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 768px) {
      .ai-share-button-floating {
        bottom: 16px;
        right: 16px;
      }
    }
  `}function g(t){let e=document.createElement("button");e.className="ai-share-button",t.placement==="floating"&&e.classList.add("ai-share-button-floating");let i=t.action||"Share with AI";if(t.style==="icon"){let n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("width","16"),n.setAttribute("height","16"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.style.marginRight="6px",["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"].forEach(a=>{let r=document.createElementNS("http://www.w3.org/2000/svg","path");r.setAttribute("d",a),n.appendChild(r)}),e.appendChild(n),e.appendChild(document.createTextNode(i))}else e.textContent=i;return e.addEventListener("click",()=>{let n=window.location.href,o=p(),a=d(t.ai,n,o,t.action);window.open(a,"_blank","noopener,noreferrer")}),e}function f(t){let e="ai-share-button-styles";if(document.getElementById(e))return;let i=document.createElement("style");i.id=e,i.textContent=t,document.head.appendChild(i)}function s(){let t=l(),e=u();if(!e&&t.placement==="inline")return;let i=m(t);f(i);let n=g(t);t.placement==="floating"?document.body.appendChild(n):e&&(e.hasAttribute("data-ai-share-button")?e.replaceWith(n):e.appendChild(n))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s();})();
