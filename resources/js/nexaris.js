// Nexaris version 3.1

window.addEventListener("DOMContentLoaded", function(e) {

    adaptiveHeader();

    closeTag();

    closeBanner();

    dropdownsInit();

    runInputNumber();

    initCopyHtml();

    modalInit();

    initPrefixSelect();

    initCustomSelect();

    dropdownSections.init(); // Accordion

    tabsInit();

    respTabs();

    dropboxInit();

});

window.addEventListener("resize", function(e) {

    adaptiveHeader();

});


// slideToggle Polyfill
HTMLElement.prototype.slideToggle = function(duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function(duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {

    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    let elStyles        = window.getComputedStyle(el);

    let elHeight        = parseFloat(elStyles.getPropertyValue('height'));
    let elPaddingTop    = parseFloat(elStyles.getPropertyValue('padding-top'));
    let elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    let elMarginTop     = parseFloat(elStyles.getPropertyValue('margin-top'));
    let elMarginBottom  = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    let stepHeight        = elHeight        / duration;
    let stepPaddingTop    = elPaddingTop    / duration;
    let stepPaddingBottom = elPaddingBottom / duration;
    let stepMarginTop     = elMarginTop     / duration;
    let stepMarginBottom  = elMarginBottom  / duration;

    let start;

    function step(timestamp) {

        if (start === undefined) start = timestamp;

        let elapsed = timestamp - start;

        if (isDown) {
            el.style.height        = (stepHeight        * elapsed) + "px";
            el.style.paddingTop    = (stepPaddingTop    * elapsed) + "px";
            el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop     = (stepMarginTop     * elapsed) + "px";
            el.style.marginBottom  = (stepMarginBottom  * elapsed) + "px";
        } else {
            el.style.height        = elHeight        - (stepHeight        * elapsed) + "px";
            el.style.paddingTop    = elPaddingTop    - (stepPaddingTop    * elapsed) + "px";
            el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop     = elMarginTop     - (stepMarginTop     * elapsed) + "px";
            el.style.marginBottom  = elMarginBottom  - (stepMarginBottom  * elapsed) + "px";
        }

        if (elapsed >= duration) {
            el.style.height        = "";
            el.style.paddingTop    = "";
            el.style.paddingBottom = "";
            el.style.marginTop     = "";
            el.style.marginBottom  = "";
            el.style.overflow      = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === 'function') callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// Matches Polyfill
if( !Element.prototype.matches ) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Closest Polyfill
if( !Element.prototype.closest ) {
    Element.prototype.closest = function (s) {
        let el = this;

        do {
            if( Element.prototype.matches.call(el, s) ) return el;
            el = el.parentElement || el.parentNode;
        } while( el !== null && el.nodeType === 1 );

        return null;
    };
}

// Adaptive header
function adaptiveHeader() {
    let hiddenListHolders = document.querySelectorAll('.hidden-list-holder');

    hiddenListHolders.forEach(function(hiddenListHolder) {
        let w = window.innerWidth;
        let h = window.innerHeight;
        replaceHeader(hiddenListHolder, w, h);
    });
}

function replaceHeader(hiddenListHolder, w, h) {

    let buttonsHiddenList = hiddenListHolder.querySelector('.buttons-hidden-list');

    let hiddenDropdownMenu = hiddenListHolder.querySelector('.hidden-dropdown-menu');

    if (w < 991) {
        if (!buttonsHiddenList.classList.contains('mobile')) {
            buttonsHiddenList.classList.add('mobile');
            hiddenDropdownMenu.appendChild(buttonsHiddenList);
        }
    } else {
        if (buttonsHiddenList.classList.contains('mobile')) {
            buttonsHiddenList.classList.remove('mobile');
            hiddenListHolder.prepend(buttonsHiddenList);
        }
    }
}



// Close tag
function closeTag() {
    let buttons = document.querySelectorAll('.tag-close');
    buttons.forEach((button)=>{
        button.addEventListener('click', (e)=>{
            e.preventDefault();
            e.stopPropagation();
            button.parentElement.style.display = 'none';
        });
    });
}



// Close banner
function closeBanner() {
    let buttons = document.querySelectorAll('.banner-close');
    buttons.forEach((button)=>{
        button.addEventListener('click', (e)=>{
            e.preventDefault();
            button.closest('.banner').style.display = 'none';
        });
    });
}


// Dropdowns
function dropdownsInit() {

    let oldButton = null;
    document.body.addEventListener('click', function(e){

        if(e.target.classList.contains('dropdown-toggle')) {
            let $this = e.target;

            if ($this !== oldButton ) {
                closeDropdowns();
                oldButton = $this;
            }

            $this.closest('.dropdown').classList.toggle('show');
            $this.classList.toggle('show');
            $this.nextElementSibling.classList.toggle('show');
        } else {
            closeDropdowns();
        }

    }, true);

    function closeDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdownMenus.forEach(function (menu) {
            menu.classList.remove('show');
        });
        dropdownToggles.forEach(function (toggle) {
            toggle.classList.remove('show');
        });
        dropdowns.forEach(function (dropdown) {
            dropdown.classList.remove('show');
        });
    }

}


// Input type number script
function runInputNumber() {
    let inputNumberElements = document.querySelectorAll('.form-input.input-number');

    inputNumberElements.forEach(function(inputNumberElement) {
        let inputWrapper = inputNumberElement.querySelector('.input-wrapper');

        let plusBtn = document.createElement('span');
        plusBtn.classList.add('inc-btn');
        plusBtn.textContent = "+";

        let minusBtn = document.createElement('span');
        minusBtn.classList.add('dec-btn');
        minusBtn.textContent = "-";

        inputWrapper.appendChild(plusBtn);
        inputWrapper.appendChild(minusBtn);

        let incBtn = inputWrapper.querySelector('.inc-btn');
        let decBtn = inputWrapper.querySelector('.dec-btn');

        incBtn.addEventListener('click', function(e) {
            let incDecButton = e.target;
            let oldValue = parseFloat(incDecButton.parentNode.querySelector('input').value);
            let newVal = oldValue + 1;
            incDecButton.parentNode.querySelector('input').value = newVal;
            let event = new Event('change');
            incDecButton.parentNode.querySelector('input').dispatchEvent(event);
        });

        decBtn.addEventListener('click', function(e) {
            let incDecButton = e.target;
            let oldValue = parseFloat(incDecButton.parentNode.querySelector('input').value);
            let newVal = oldValue > 0 ? oldValue - 1 : 0;
            incDecButton.parentNode.querySelector('input').value = newVal;
            let event = new Event('change');
            incDecButton.parentNode.querySelector('input').dispatchEvent(event);
        });
    });
}



function initCopyHtml() {

    function copyToClipboard(text) {
        const temp = document.createElement('textarea');
        document.body.appendChild(temp);
        temp.value = text;
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
    }

    function copyCode(selector) {
        const codeBlocks = document.querySelectorAll(selector);
        codeBlocks.forEach(function(block) {
            const code = block.querySelector('xmp');
            const copyBtn = document.createElement('button');
            copyBtn.className = 'site-copy-code';
            copyBtn.title = 'copy';
            const save = document.createElement('span');
            save.className = 'site-save-code';
            save.textContent = 'Copied';
            block.appendChild(copyBtn);

            code.innerHTML = code.innerHTML.trim();

            copyBtn.addEventListener('click', function() {
                copyToClipboard(code.innerHTML);
                block.appendChild(save);
                setTimeout(function() {
                    save.remove();
                }, 1000);
            });
        });
    }

    copyCode('.site-section-code');
    copyCode('.code-example-simple');

    // Code copy to clipboard
    var copyButtons = document.querySelectorAll('.clipboard-btn');
    [].forEach.call(copyButtons, function(copyButton) {
        copyButton.addEventListener('click', function(e){
            var copySuccess = this.nextElementSibling;
            var codeBlock = this.parentNode.nextElementSibling.querySelector('code');
            var text = codeBlock.innerText;
            var element = document.createElement('textarea');
            document.body.appendChild(element);
            element.value = text;
            element.select();
            document.execCommand('copy');
            document.body.removeChild(element);
            setTimeout(function(){
                copySuccess.classList.add('show');
                setTimeout(function(){
                    copySuccess.classList.remove('show');
                },3000);
            },500);
        });
    });
}



function modalInit() {

    function openModal(modalId) {
        let modal = document.querySelector('#' + modalId);
        let header = document.querySelector('header');
        if (document.querySelector('.modal.active')) {
            let activeModal = document.querySelector('.modal.active');
            activeModal.classList.remove('active');
            activeModal.querySelector('.modal-inner').classList.remove('active');
            header && (header.style.right = '0');
            document.body.style.paddingRight = '';
            document.body.classList.remove('modal-open');
        }

        let scrollBarWidth = window.innerWidth - document.body.offsetWidth;
        header && (header.style.right = scrollBarWidth + 'px');
        document.body.style.paddingRight = scrollBarWidth + 'px';
        document.body.classList.add('modal-open');

        modal.classList.add('active');
        modal.querySelector('.modal-inner').classList.add('active');
    }

    function closeModal(modalId) {
        let modal = document.querySelector('#' + modalId);
        let header = document.querySelector('header');
        setTimeout(function() {
            header && (header.style.right = '0');
            document.body.style.paddingRight = '';
            document.body.classList.remove('modal-open');
        }, 300);
        modal.scrollTop = 0;
        modal.classList.remove('active');
        modal.querySelector('.modal-inner').classList.remove('active');
    }

    document.querySelectorAll('.modal').forEach(function(modal) {
        modal.addEventListener('click', function() {
            closeModal(this.id);
        });
        modal.querySelector('.modal-inner').addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    document.querySelectorAll('.open-modal-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('data-target');
            openModal(target);
        });
    });

    document.querySelectorAll('.close-modal-btn, .js-close-modal-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.closest('.modal').id;
            closeModal(target);
        });
    });

}



// insertAfter Polyfill
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function initPrefixSelect() {

    let selectHolders = document.querySelectorAll('.select-prefix-js');

    selectHolders.forEach(function(selectHolder) {
        let select = selectHolder.querySelector('select');
        let selectBlock = document.createElement('div');
        selectBlock.className = 'select-block';
        let selectCurrent = document.createElement('div');
        selectCurrent.className = 'select-text-current';
        let selectPrefix = selectHolder.querySelector('.select-text-prefix');

        selectBlock.appendChild(selectPrefix);
        selectBlock.appendChild(selectCurrent);
        select.parentNode.insertBefore(selectBlock, select.nextSibling);
        selectCurrent.textContent = select.options[select.selectedIndex].text;

        if (!select.disabled) {
            select.addEventListener('change', function() {
                selectCurrent.textContent = select.options[select.selectedIndex].text;
            });
        }
    });
}


function initCustomSelect() {
    let selectDropdowns = document.querySelectorAll('.select-dropdowns-js');

    selectDropdowns.forEach(function(selectDropdown) {
        let selectHolder = selectDropdown;
        let select = selectHolder.querySelector('select');
        let selectBlock = document.createElement('div');
        selectBlock.className = 'select-block';
        selectBlock.setAttribute("tabindex", "0");
        let selectCurrent = document.createElement('div');
        selectCurrent.className = 'select-text-current';
        let selectOptions = select.querySelectorAll('option');
        let selectDropdownsContainer = document.createElement('div');
        selectDropdownsContainer.className = 'select-dropdowns';

        selectOptions.forEach(function(option) {
            let text = option.text;
            let value = option.value;
            let optionItem = document.createElement('div');
            optionItem.className = 'option-item';
            optionItem.setAttribute('data-value', value);
            optionItem.textContent = text;
            selectDropdownsContainer.appendChild(optionItem);
        });

        select.style.display = 'none';
        insertAfter(selectBlock, select);
        selectBlock.appendChild(selectCurrent);
        selectBlock.appendChild(selectDropdownsContainer);
        selectCurrent.textContent = select.options[select.selectedIndex].text;

        if (!select.disabled) {
            selectCurrent.addEventListener('click', function() {
                this.closest('.select-dropdowns-js').classList.toggle('open');
            });

            let optionItems = selectDropdownsContainer.querySelectorAll('.option-item');
            optionItems.forEach(function(optionItem) {
                optionItem.addEventListener('click', function() {
                    let current = this;
                    selectCurrent.textContent = current.textContent;
                    select.value = current.getAttribute('data-value');
                    selectHolder.classList.remove('open');
                });
            });
        }
    });
}


// Storage
if( typeof storage !== 'object' ) {
    var storage = {
        get: function( name, key ) {
            if( !this.checkSupport() ) return undefined;
            if( localStorage[name] === undefined ) return undefined;

            var lsObj = JSON.parse(localStorage[name]);
            var dateString = lsObj.expires;
            var value = lsObj.value;

            if( key ) value = lsObj.value[key];

            if( !dateString ) return value;

            var now = new Date().getTime().toString();
            if( now - lsObj.expires  > 0 ) {
                localStorage.removeItem(name);
                return undefined;
            }

            return value;
        },

        set: function( params, easyValue ) {
            if( !this.checkSupport() ) return undefined;
            params = params || {};

            if( typeof params === 'string' && easyValue !== undefined ) {
                params = {name: params, value: easyValue };
            }

            var name    = params.name;
            var value   = params.value;
            var key     = params.key;
            var expires = params.expires ? params.expires : null;

            var lsObj = {value: value, expires: null};

            if( key ) {
                var currentValue = this.get( name );
                if( !currentValue || Object.prototype.toString.call(currentValue) !== '[object Object]' ) currentValue = {};
                currentValue[key] = value;

                lsObj.value = currentValue;
            }

            if( expires ) {
                expires = parseInt(expires);
                var d = new Date();
                d.setTime(d.getTime() + (expires * 1000));
                lsObj.expires = d.getTime().toString();
            }

            localStorage[name] = JSON.stringify(lsObj);
        },

        remove: function( name ) {
            if( this.checkSupport() ) localStorage.removeItem( name );
        },

        checkSupport: function() {
            try {
                return 'localStorage' in window && window.localStorage;
            } catch (e) {
                return false;
            }
        },

        // use storage like LocalStorage
        getItem: function( name, key ) {
            return this.get( name, key );
        },
        setItem: function( params, easyValue ) {
            this.set( params, easyValue );
        },
        removeItem: function( name ) {
            this.remove( name );
        }
    };
}



// Accordion

if( !Element.prototype.toggleClass ) {
    Element.prototype.toggleClass = function(name, flag) {
        if( flag ) this.classList.add(name);
        else this.classList.remove(name);
    };
}

if( typeof dropdownSections != 'object' ) {
    var dropdownSections = {
        storageName:  'dropdown_sections_state',
        sectionClass: 'dropdown-section',
        headerClass:  'dropdown-section-header',
        activeClass:  'dropdown-section-active',
        headerActionsClass:  'dropdown-section-header-actions',

        init: function( appname ) {
            appname = appname || '';
            if( appname ) this.storageName = appname + '-' + this.storageName;

            // set dropdowns states on loading
            let section, dropdownsStates = storage.get(this.storageName);
            if( dropdownsStates ) {
                for( const[selector, value] of Object.entries(dropdownsStates)) {
                    section = document.getElementById(selector);
                    if( section && section.dataset.dsContinuousState !== undefined ) section.toggleClass(this.activeClass, value == 1);
                }
            }

            // listeners
            document.addEventListener('click', event => {

                const path = event.path || (event.composedPath && event.composedPath());

                for (let i = 0; i < path.length; i++) {
                    const el = path[i];

                    if( el.classList ) {
                        if( el.classList.contains(this.headerActionsClass) ) {
                            event.stopPropagation();
                            break;
                        }

                        if( el.classList.contains(this.headerClass) ) {

                            let section  = el.closest('.' + this.sectionClass);
                            let newState = section.classList.contains(this.activeClass) ? 0 : 1;
                            let content = section.querySelector('.dropdown-section-content');

                            section.toggleClass(this.activeClass, newState);

                            if (section.classList.contains('dropdown-section-active')) {
                                content.style.maxHeight = content.scrollHeight + 'px';
                            } else {
                                content.style.maxHeight = '0';
                            }

                            if( newState && section.dataset.dsNoScroll === undefined ) this.scrollTo(el);

                            if( section.dataset.dsContinuousState !== undefined ) {
                                storage.set({
                                    name:  this.storageName,
                                    key:   section.id,
                                    value: newState
                                });
                            }
                        }
                    }
                }
            });
        },

        scrollTo: function(el) {
            let appContent = document.getElementById('app-content');
            if (appContent) {
                appContent.scrollTo({
                    top: el.offsetTop - appContent.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: el.getBoundingClientRect().top + window.pageYOffset,
                    behavior: 'smooth'
                });
            }
        }

    };
}



function tabsInit(parentSelector = '.resptabs') {

    const parentElements = document.querySelectorAll(parentSelector);

    let tabname = 'tab';

    parentElements.forEach(function (parentElement) {

        let tabElements = parentElement.querySelectorAll(':scope > .primary-list > li > .tab-item');
        let tabContents = parentElement.querySelectorAll(':scope > .tab-contents > .tab-content-item');

        if(tabElements.length !== 0) {
            tabElements[0].classList.add('active');
        }
        if(tabContents.length !== 0) {
            tabContents[0].classList.add('active');
        }

        let indexEl = 1;
        let indexCont = 1;

        tabElements.forEach(function (tabElement) {
            tabElement.setAttribute('data-tab', tabname + '-' + indexEl);
            indexEl++;
        });

        tabContents.forEach(function (tabContent) {
            tabContent.setAttribute('data-tab-content', tabname + '-' + indexCont);
            indexCont++;
        });

        parentElement.addEventListener('click', function (e) {

            e.preventDefault();
            e.stopPropagation();

            const targetTabElement = e.target.closest('.tab-item');

            if ( targetTabElement ) {

                parentElement = targetTabElement.closest('.resptabs');

                const targetTab = targetTabElement.getAttribute('data-tab');
                const target = parentElement.querySelector(`:scope > .tab-contents > [data-tab-content="${targetTab}"]`);

                if ( target ) {
                    const tabElements = parentElement.querySelectorAll(':scope > .primary-list > li > .tab-item');
                    const tabContents = parentElement.querySelectorAll(':scope > .tab-contents > .tab-content-item');

                    const tabSecondary = parentElement.querySelectorAll(':scope > .primary-list > .more-btn > .secondary-list > li > .tab-item');

                    tabContents.forEach(function (tabContent) {
                        tabContent.classList.remove('active');
                    });

                    tabElements.forEach(function (element) {
                        element.classList.remove('active');
                    });

                    tabSecondary.forEach(function (element) {
                        element.classList.remove('active');
                    });

                    targetTabElement.classList.add('active');
                    target.classList.add('active');
                }
            }

            // new part of code was here

        });

    });

}



function respTabs(selector = '.resptabs') {

    const containers = document.querySelectorAll(selector);

    containers.forEach(function(container){

        // new part of code
        container.addEventListener('click', function (e) {

            e.preventDefault();
            const targetTabElement = e.target.closest('.tab-item');

            if ( targetTabElement && targetTabElement.closest('.secondary-list') ) {

                const tabSecondary = container.querySelectorAll(':scope > .primary-list > .more-btn > .secondary-list > li > .tab-item');
                tabSecondary.forEach(function (element) {
                    element.classList.remove('active');
                });

                let secondaryEl = targetTabElement.closest('li');
                let secondaryList = secondaryEl.parentNode;

                let secondaryChildren = Array.from(secondaryList.children);
                let indexLi = secondaryChildren.indexOf(secondaryEl);

                secondaryList.insertBefore(secondaryEl, secondaryList.firstChild);

                let primaryList = container.querySelector(':scope > .primary-list');
                let primaryChildren = primaryList.children;
                let primaryEl = null;
                if (primaryChildren.length >= (indexLi -1) ) {
                    primaryEl = primaryChildren[indexLi];
                    if(primaryEl.classList.contains('hidden')) {
                        primaryEl.classList.remove('hidden');
                        primaryEl.querySelector('.tab-item').classList.add('active');
                    }
                }

                primaryList.insertBefore(primaryEl, primaryList.firstChild);

                window.dispatchEvent(new Event('resize'));

                primaryList.closest('.resptabs').classList.remove('show-secondary-list');
                secondaryList.closest('.more-btn').querySelector('button').setAttribute('aria-expanded', false);
            }

        })
        // end new part of code

        container.classList.add('--jsfied');

        const primary = container.querySelector(':scope > .primary-list');
        let primaryItems = primary.querySelectorAll(':scope > li:not(.more-btn)');

        // insert "more" button and duplicate the list
        primary.insertAdjacentHTML('beforeend', `
			<li class="more-btn">
				<button type="button" aria-haspopup="true" aria-expanded="false">
					More
					<span>
						<svg viewBox="0 0 20 20" class="Icon_Icon__Dm3QW" style="width: 20px; height: 20px;"><path d="M6 10a2 2 0 1 1-4.001-.001 2 2 0 0 1 4.001.001zm6 0a2 2 0 1 1-4.001-.001 2 2 0 0 1 4.001.001zm6 0a2 2 0 1 1-4.001-.001 2 2 0 0 1 4.001.001z"></path></svg>
					</span>
				</button>
				<ul class="secondary-list">
					${primary.innerHTML}
				</ul>
			</li>
		`);

        const secondary = primary.querySelector(':scope > .more-btn > .secondary-list');
        let secondaryItems = secondary.querySelectorAll('li');

        const allItems = primary.querySelectorAll(':scope > li, :scope > .more-btn > .secondary-list > li');
        const moreLi = primary.querySelector(':scope > .more-btn');
        const moreBtn = moreLi.querySelector('button');

        moreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let currentContainer = moreBtn.closest('.resptabs');
            currentContainer.classList.toggle('show-secondary-list');
            moreBtn.setAttribute('aria-expanded', currentContainer.classList.contains('show-secondary-list'));
        })

        // adapt tabs

        const doAdapt = () => {
            // reveal all items for the calculation
            allItems.forEach((item) => {
                item.classList.remove('hidden');
            });

            // hide items that won't fit in the Primary
            let stopWidth = moreBtn.offsetWidth;
            let hiddenItems = [];
            const primaryWidth = primary.offsetWidth;
            let addNew = true; // new
            primaryItems = container.querySelectorAll(':scope > .primary-list > li:not(.more-btn)'); // new
            primaryItems.forEach((item, i) => {

                if(primaryWidth >= stopWidth + item.offsetWidth && addNew) { // new
                    stopWidth += item.offsetWidth;
                    stopWidth += 10; // 08.08.2024 fix to prevent the button More falling out of the container
                } else {
                    addNew = false; // new
                    item.classList.add('hidden');
                    hiddenItems.push(i);
                }
            })
            // toggle the visibility of More button and items in Secondary
            if(!hiddenItems.length) {
                moreLi.classList.add('hidden');
                container.classList.remove('show-secondary-list');
                moreBtn.setAttribute('aria-expanded', false);
            }
            else {
                secondaryItems = secondary.querySelectorAll('li'); // new
                secondaryItems.forEach((item, i) => {
                    if(!hiddenItems.includes(i)) {
                        item.classList.add('hidden');
                    }
                })
            }
            //console.log('adapted');
        }

        doAdapt(); // adapt immediately on load

        window.addEventListener('resize', doAdapt); // adapt on window resize

        // hide Secondary on the outside click

        document.addEventListener('click', (e) => {
            let el = e.target
            while(el) {
                if(el === secondary || el === moreBtn) {
                    return;
                }
                el = el.parentNode;
            }
            container.classList.remove('show-secondary-list');
            moreBtn.setAttribute('aria-expanded', false);
        })

    });

}


function dropboxInit() {

    function showElement(element) {
        if (!element) return;
        element.removeAttribute('hidden');
    }

    function hideElement(element) {
        if (!element) return;
        element.setAttribute('hidden', '');
    }

    const imageUploadWrap = document.querySelector('.image-upload-wrap');
    const uploadFileInputExternal = document.querySelector('.js-upload-file-input-ext');
    const uploadFileInputInternal = document.querySelector('.js-upload-file-input-int');
    const uploadFileContent = document.querySelector('.js-upload-file-content');
    const uploadFileRemoveBtn = document.querySelector('.js-upload-file-remove-btn');
    const uploadFilePreview = document.querySelector('.js-upload-file-preview');

    imageUploadWrap && imageUploadWrap.addEventListener('dragover', (event) => {
        imageUploadWrap.classList.add('image-dropping');
    });

    imageUploadWrap && imageUploadWrap.addEventListener('dragleave', (event) => {
        imageUploadWrap.classList.remove('image-dropping');
    });

    uploadFileRemoveBtn && uploadFileRemoveBtn.addEventListener('click', (event) => {
        URL.revokeObjectURL(uploadFileInputInternal.value);
        uploadFileInputExternal.value = null;
        uploadFileInputInternal.value = null;
        hideElement(uploadFileContent);
        showElement(imageUploadWrap);
        uploadFilePreview.src = '';
        imageUploadWrap.classList.remove('image-dropping');
    });

    uploadFileInputExternal && uploadFileInputExternal.addEventListener('change', (event) => {
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        hideElement(imageUploadWrap);
        showElement(uploadFileContent);
        uploadFilePreview.src = imageUrl;
        uploadFileInputInternal.value = imageUrl;
    });

}


/*

usage:

	const nestedFields = new NxrsNestedFields([
		"test1",
		"test2, test3"
	]);

	data-target input type="radio" or type="checkbox"

	----------------------checkbox--------------------------------
	<input type="checkbox" name="test.test1" data-target="test1">

	<div class="" data-view="test1"></div>

	----------------------radio-----------------------------------

	<input type="radio" value="val1" name="general.test" data-target="test2">
	<input type="radio" value="val2" name="general.test" data-target="test3">

	<div class="" data-view="test2"></div>
	<div class="" data-view="test3"></div>

*/

class NxrsNestedFields {
    constructor(items) {
        if (!items) return;

        this.items = items;

        this.init();
    }

    init(){
        this.items.forEach(item => {

            let names = Array.isArray(item) ? item : item.split(',');

            const targets = names.map(name => `[data-target="${name.trim()}"]`);
            const targetsNode = document.querySelectorAll(targets.join(', '));

            const blocks = names.map(name => `[data-view="${name.trim()}"]`);
            const blocksNode = document.querySelectorAll(blocks.join(', '));

            targetsNode.forEach(targetNode => {
                this.displayToggle(targetNode, blocksNode); // first init

                targetNode.addEventListener('change', (() => {
                    this.displayToggle(targetNode, blocksNode);
                }));
            });

        });
    }

    displayToggle(targetNode, blocksNode){
        const {type} = targetNode;

        if(type === 'radio'){
            const {checked} = targetNode;

            blocksNode.forEach(block => {
                if(checked) {
                    targetNode.dataset.target === block.dataset.view ? block.style.display = 'block' : block.style.display = 'none';
                }
            });
        }

        if(type === 'checkbox'){
            const {checked} = targetNode;

            blocksNode.forEach(block => {
                checked ? block.style.display = 'block' : block.style.display = 'none';
            });
        }
    }
}
