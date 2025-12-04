"use strict";(()=>{function p(){let t=document.currentScript;if(!t)return d();let n=(t.getAttribute("data-ai")||"chatgpt").split(",").map(e=>e.trim()).filter(e=>["chatgpt","claude","perplexity","gemini"].includes(e)),a=n.length>0?n:["chatgpt"];return{style:t.getAttribute("data-style")||"minimal",color:t.getAttribute("data-color")||"#3b82f6",size:t.getAttribute("data-size")||"medium",ai:a,action:t.getAttribute("data-action")||"Summarize",placement:t.getAttribute("data-placement")||"floating"}}function d(){return{style:"minimal",color:"#3b82f6",size:"medium",ai:["chatgpt"],action:"Summarize",placement:"floating"}}function u(){let t=document.querySelector("[data-ai-share-button]");if(t)return t;let o=document.querySelector("article");if(o)return o;let n=[".post-content",".blog-article",".prose",'[role="article"]',".entry-content",".article-content",".content"];for(let a of n){let e=document.querySelector(a);if(e)return e}return null}function m(t,o,n,a){let e=`Analyze the following content from this URL: ${o}`;n&&(e+=`. Text selection: ${n}`),a&&(e+=`. ${a}`);let i=encodeURIComponent(e);switch(t){case"chatgpt":return`https://chat.openai.com/?q=${i}`;case"claude":return`https://claude.ai/new?prompt=${i}`;case"perplexity":return`https://www.perplexity.ai/?q=${i}`;case"gemini":return`https://gemini.google.com/?prompt=${i}`;default:return`https://chat.openai.com/?q=${i}`}}function g(){let t=window.getSelection();return!t||t.rangeCount===0?"":t.toString().trim()}function h(t){let n={small:{padding:"6px 12px",fontSize:"12px"},medium:{padding:"8px 16px",fontSize:"14px"},large:{padding:"12px 24px",fontSize:"16px"}}[t.size];return`
    .ai-share-button {
      ${`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${n.padding};
    font-size: ${n.fontSize};
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
  `}var f={chatgpt:"ChatGPT",claude:"Claude",perplexity:"Perplexity",gemini:"Gemini"};function x(t,o){let n=document.createElement("button");n.className="ai-share-button",t.placement==="floating"&&n.classList.add("ai-share-button-floating");let e=`${t.action||"Share"} with ${f[o]||o}`;if(t.style==="icon"){let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("width","16"),i.setAttribute("height","16"),i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","2"),i.style.marginRight="6px",["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"].forEach(r=>{let l=document.createElementNS("http://www.w3.org/2000/svg","path");l.setAttribute("d",r),i.appendChild(l)}),n.appendChild(i),n.appendChild(document.createTextNode(e))}else n.textContent=e;return n.addEventListener("click",()=>{let i=window.location.href,s=g(),r=m(o,i,s,t.action);window.open(r,"_blank","noopener,noreferrer")}),n}function b(t){let o="ai-share-button-styles";if(document.getElementById(o))return;let n=document.createElement("style");n.id=o,n.textContent=t,document.head.appendChild(n)}function c(){let t=p(),o=u();if(!o&&t.placement==="inline")return;let n=h(t);b(n);let a=t.ai.map(e=>x(t,e));if(t.placement==="floating"){let e=document.createElement("div");e.className="ai-share-button-container",e.style.cssText="position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;";let i=`
      @media (max-width: 768px) {
        .ai-share-button-container {
          bottom: 16px;
          right: 16px;
        }
      }
    `,s=document.getElementById("ai-share-button-styles");s&&(s.textContent+=i),a.forEach(r=>{r.classList.remove("ai-share-button-floating"),e.appendChild(r)}),document.body.appendChild(e)}else if(o){let e=document.createElement("div");e.className="ai-share-button-wrapper",e.style.cssText="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px;",a.forEach(i=>e.appendChild(i)),o.hasAttribute("data-ai-share-button")?o.replaceWith(e):o.appendChild(e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();})();
