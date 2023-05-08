(()=>{"use strict";function e(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");s(t)}}var t;t=document.querySelectorAll(".popup__overlay"),Array.from(t).forEach((function(e){e.addEventListener("click",(function(){return s(e.closest(".popup"))}))}));var n,o,r,a,c,i,l,u=function(t){t.classList.add("popup_opened"),document.addEventListener("keydown",e)},s=function(t){t.classList.remove("popup_opened"),document.removeEventListener("keydown",e)},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))},m=document.querySelector(".popup_type_profile"),p=m.querySelector(".popup__form-submit"),f=document.querySelector(".profile__title"),_=document.querySelector(".profile__signature"),h=document.querySelector(".profile__name-button"),v=m.querySelector('input[name = "name"]'),y=m.querySelector('input[name = "profession"]'),b=document.querySelector(".profile__img"),S=document.querySelector(".profile__img-container"),k=document.querySelector(".popup_type_avatar"),q=k.querySelector(".popup__form-submit"),C=k.querySelector('input[name = "avatar-link"]'),L=document.querySelector(".profile__img-button"),g=document.querySelector(".popup_type_card"),E=g.querySelector('input[name = "card-title"]'),x=g.querySelector('input[name="link"]'),A=g.querySelector(".popup__form-submit"),U=document.querySelector(".elements__list"),T={baseUrl:"https://nomoreparties.co/v1/plus-cohort-23/",headers:{authorization:"181415f7-ca80-4d4d-a37f-42db628425bb","Content-Type":"application/json"}};function j(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function O(e,t){var n=document.querySelector(".add-card-template").content.querySelector(".element").cloneNode(!0),o=n.querySelector(".element__like-button"),r=n.querySelector(".element__like-count"),a=n.querySelector(".element__trash-btn"),c=n.querySelector(".element__img");return n.querySelector(".element__title").textContent=e.name,c.src=e.link,c.alt=e.name,c.addEventListener("click",(function(){return t=e.name,n=e.link,r=(o=document.querySelector(".popup_type_image")).querySelector(".popup__fullsize-image"),a=o.querySelector(".popup__figcaption"),r.src=n,r.alt=t,a.textContent=t,void u(o);var t,n,o,r,a})),r.textContent=e.likes.length,e.likes.length<=0?r.classList.add("element__like-count_disabled"):r.classList.remove("element__like-count_disabled"),o.addEventListener("click",(function(t){var n;o.classList.contains("element__like-button_active")?(n=e._id,fetch("".concat(T.baseUrl,"cards/likes/").concat(n),{method:"DELETE",headers:T.headers}).then(j)).then((function(e){r.textContent=e.likes.length,o.classList.remove("element__like-button_active"),e.likes.length<=0?r.classList.add("element__like-count_disabled"):r.classList.remove("element__like-count_disabled")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(T.baseUrl,"cards/likes/").concat(e),{method:"PUT",headers:T.headers}).then(j)}(e._id).then((function(e){r.textContent=e.likes.length,o.classList.add("element__like-button_active"),e.likes.length<=0?r.classList.add("element__like-count_disabled"):r.classList.remove("element__like-count_disabled")})).catch((function(e){console.log(e)}))})),e.likes.forEach((function(e){e._id===t&&o.classList.add("element__like-button_active")})),e.owner._id!==t?a.classList.add("element__trash-btn-hidden"):a.addEventListener("click",(function(){var t;(t=e._id,fetch("".concat(T.baseUrl,"cards/").concat(t),{method:"DELETE",headers:T.headers}).then(j)).then((function(){a.closest(".element").remove()})).catch((function(e){console.log(e)}))})),n}function w(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}h.addEventListener("click",(function(){v.value=f.textContent,y.value=_.textContent,u(m)})),S.addEventListener("click",(function(){return u(k)})),L.addEventListener("click",(function(){return u(g)})),document.querySelectorAll(".popup__close-button").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return s(t)}))})),g.addEventListener("submit",(function(e){var t;e.preventDefault(),A.textContent="Сохранение...",(t={name:E.value,link:x.value},fetch("".concat(T.baseUrl,"cards"),{method:"POST",headers:T.headers,body:JSON.stringify(t)}).then(j)).then((function(t){U.prepend(O(t,l)),s(g),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){A.textContent="Сохранить"}))})),k.addEventListener("submit",(function(e){var t;e.preventDefault(),q.textContent="Сохранение...",(t={avatar:C.value},fetch("".concat(T.baseUrl,"users/me/avatar"),{method:"PATCH",headers:T.headers,body:JSON.stringify(t)}).then(j)).then((function(t){b.src=t.avatar,s(k),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){q.textContent="Сохранить"}))})),m.addEventListener("submit",(function(e){var t;e.preventDefault(),p.textContent="Сохранение...",(t={name:v.value,about:y.value},fetch("".concat(T.baseUrl,"users/me"),{method:"PATCH",headers:T.headers,body:JSON.stringify(t)}).then(j)).then((function(t){f.textContent=t.name,_.textContent=t.about,s(m),e.target.reset()})).catch((function(e){console.log(e)})).finally((function(){p.textContent="Сохранить"}))})),o=(n={formClass:".popup__form",inputClass:".popup__form-input",activeButtonClass:".popup__form-submit",submitInactiveClass:"popup__form-submit_type_inactive",inputErrorClass:"popup__form-input_type_error"}).formClass,r=n.inputClass,a=n.activeButtonClass,c=n.submitInactiveClass,i=n.inputErrorClass,Array.from(document.querySelectorAll(o)).forEach((function(e){e.addEventListener("submit",(function(t){t.preventDefault();var n=e.querySelector(".popup__form-submit");n.classList.add(c),n.disabled=!0})),function(e,t,n,o,r){var a=Array.from(e.querySelectorAll(t)),c=e.querySelector(n);d(a,c,o),a.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.add(o),r.textContent=n}(e,t,t.validationMessage,n),t.validity.patternMismatch?t.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):t.setCustomValidity("")}(e,t,r),d(a,c,o)}))}))}(e,r,a,c,i)})),Promise.all([fetch("".concat(T.baseUrl,"users/me"),{method:"GET",headers:T.headers}).then(j),fetch("".concat(T.baseUrl,"cards"),{method:"GET",headers:T.headers}).then(j)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,a,c,i=[],l=!0,u=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(o=a.call(n)).done)&&(i.push(o.value),i.length!==t);l=!0);}catch(e){u=!0,r=e}finally{try{if(!l&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(u)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return w(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?w(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],a=o[1];b.src=r.avatar,f.textContent=r.name,_.textContent=r.about,l=r._id,a.forEach((function(e){return U.append(O(e,l))}))})).catch((function(e){console.log(e)}))})();