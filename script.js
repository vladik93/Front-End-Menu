// const categoryItems = document.querySelectorAll('.category-items');
const body = document.body;
const categoryNavs = document.querySelectorAll('.category');
const modalCloseBtn = document.getElementById('modal-close-btn');
const overlay = document.getElementById('overlay');
const cartBtn = document.getElementById('cart-btn');
const sidePanel = document.getElementById('side-panel');
const sidePanelClose = document.getElementById('side-panel-close');
const sidePanelBody = document.getElementById('side-panel-body');
const cartCount = document.getElementById('cart-count');

let itemQuantityCounter = 1;

let menu = [
    { 
        category: 'popular',
        items: [
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Americano', price: 4.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
        ]
    },
    { 
        category: 'breakfast',
        items: [
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
        ]
    },
    { 
        category: 'launch',
        items: [
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
        ]
    },
    { 
        category: 'pastries',
        items: [
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
        ]
    },
    { 
        category: 'drinks',
        items: [
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
            { title: 'Cappuccino', price: 3.5, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam.', image: "./images/section_2_item_4.jpg" },
        ]
    },
]

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function onItemIncrement(item) {
    closeItemModal();

    itemQuantityCounter++;

    buildItemModal(item);
}

const onItemDecrement = (item) => {
    closeItemModal();

    if(itemQuantityCounter <= 1) {
        itemQuantityCounter = 1;
    } else {
        itemQuantityCounter -= 1;
    }

    buildItemModal(item);
}

const formatMoney = (num) => {
    return "NiS " + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const calculateItemOverallTotal = (item) => {
    let total = item.price * itemQuantityCounter;

    return formatMoney(total);
}

const calculateLengthCartItems = () => {
    if(cart.length > 0 && cart !== null) {
        cartCount.classList.add('show');
        let total = cart.reduce((accumulator, currentObj) => {
            return accumulator + currentObj.quantity;
        }, 0);

        return total;
    } else {
        cartCount.classList.remove('show');
    }
}

const setCartCount = () => {
    cartCount.innerText = calculateLengthCartItems(); 
}

setCartCount();

const calculateCartTotal = () => {
    if(cart.length > 0 && cart !== null) {
        let reduced = cart.reduce((accumulator, currentObj) => {
            return accumulator + currentObj.total * currentObj.quantity;
        }, 0)

        return formatMoney(reduced);
    }
}

const closeItemModal = () => {
    const itemModal = document.getElementById('item-modal');
    
    itemModal.remove();
    overlay.classList.remove('active');
    body.style.overflow = "auto";
    
}


const addToCart = (item) => {
    let cartItem = {
        title: item.title,
        image: item.image, 
        quantity: itemQuantityCounter,
        total: item.price * itemQuantityCounter
    }

    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    itemQuantityCounter = 1;
    
    setCartCount();

    buildSidebar();

    closeItemModal();
}

const buildItemModal = (item) => {  
    overlay.classList.add('active');

    const itemModalEl = document.createElement('div');
    itemModalEl.classList.add('item-modal', 'active');
    itemModalEl.id = "item-modal";

    const itemModalHeaderEl = document.createElement('div');
    itemModalHeaderEl.classList.add('item-modal-header');
    
    itemModalEl.appendChild(itemModalHeaderEl);

    const modalCloseBtnEl = document.createElement('button');
    modalCloseBtnEl.classList.add('modal-close-btn');
    modalCloseBtnEl.id = "modal-close-btn";
    modalCloseBtnEl.innerText = "X";

    modalCloseBtnEl.addEventListener('click', closeItemModal);

    itemModalHeaderEl.appendChild(modalCloseBtnEl);

    const itemModalContentEl = document.createElement('div');
    itemModalContentEl.classList.add('item-modal-content');
    
    itemModalEl.appendChild(itemModalContentEl);

    const itemModalImgWrapperEl = document.createElement('div');
    itemModalImgWrapperEl.classList.add('item-modal-img-wrapper');
    
    itemModalContentEl.appendChild(itemModalImgWrapperEl);

    const itemModalImgEl = document.createElement('img');
    itemModalImgEl.classList.add('item-modal-img');
    itemModalImgEl.src = "./images/section_2_item_4.jpg";

    itemModalImgWrapperEl.appendChild(itemModalImgEl);

    const itemModalAddonWrapperEl = document.createElement('div');
    itemModalAddonWrapperEl.classList.add('item-modal-addon-wrapper');
    
    itemModalContentEl.appendChild(itemModalAddonWrapperEl);

    const menuItemTitleEl = document.createElement('h3');
    menuItemTitleEl.classList.add('menu-item-title');
    menuItemTitleEl.innerText = item.title;

    itemModalAddonWrapperEl.appendChild(menuItemTitleEl);

    const menuItemCostEl = document.createElement('span');
    menuItemCostEl.classList.add('menu-item-cost');
    menuItemCostEl.innerText = formatMoney(item.price);

    itemModalAddonWrapperEl.appendChild(menuItemCostEl);

    const itemModalFooterEl = document.createElement('div');
    itemModalFooterEl.classList.add('item-modal-footer');

    itemModalEl.appendChild(itemModalFooterEl);

    const itemQuantWrapper = document.createElement('div');
    itemQuantWrapper.classList.add('item-quant-wrapper');

    itemModalFooterEl.appendChild(itemQuantWrapper);

    const quantBtnMinusEl = document.createElement('button');
    quantBtnMinusEl.classList.add("quant-btn-minus", "quant-btn");
    quantBtnMinusEl.innerText = "-";
    
    quantBtnMinusEl.addEventListener('click', onItemDecrement.bind(this, item));

    itemQuantWrapper.appendChild(quantBtnMinusEl);

    const itemQuantPanelEl = document.createElement('span');
    itemQuantPanelEl.classList.add('item-quant-panel');
    itemQuantPanelEl.innerText = itemQuantityCounter;

    itemQuantWrapper.appendChild(itemQuantPanelEl);

    const quantBtnPlusEl = document.createElement('button');
    quantBtnPlusEl.classList.add("quant-btn-plus", "quant-btn");
    quantBtnPlusEl.innerText = "+";

    quantBtnPlusEl.addEventListener('click', onItemIncrement.bind(this, item));

    itemQuantWrapper.appendChild(quantBtnPlusEl);

    const toCartBtnEl = document.createElement('button');
    toCartBtnEl.classList.add('to-cart-btn');
    toCartBtnEl.id = "to-cart-btn";

    toCartBtnEl.addEventListener('click', addToCart.bind(this, item));

    itemModalFooterEl.appendChild(toCartBtnEl);

    const modalBtnTextEl = document.createElement('span');
    modalBtnTextEl.innerText = "Add to Cart";
    
    toCartBtnEl.appendChild(modalBtnTextEl);

    const modalSumEl = document.createElement('span');
    modalSumEl.classList.add('modal-sum');
    modalSumEl.id = "modal-sum";
    modalSumEl.innerText = calculateItemOverallTotal(item);

    toCartBtnEl.appendChild(modalSumEl);
    
    body.appendChild(itemModalEl);    

    body.style.overflow = "hidden";
}

const setNavMenuScroll = (...menuItems) => {
    const observerOptions = {
        root: null,
        threshold: 1,
        rootMargin: "0px"
    }
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                categoryNavs.forEach(category => {
                    if(category.id === entry.target.id + "Nav") {
                        category.classList.add('active');
                    } else {
                        category.classList.remove('active');
                    }
                })
            }
        })
    }, observerOptions);

    menuItems.forEach(item => {
        observer.observe(item);
    })
}

const buildMenu = () => {
    const menuItemsWrapper = document.getElementById('menu-items-wrapper');

    menu.map((menu) => {
        const categoryItemsEl = document.createElement('div');
        categoryItemsEl.classList.add('category-items');
        categoryItemsEl.id = menu.category;
        
        const categoryHeadingEl = document.createElement('h1');
        categoryHeadingEl.classList.add('category-heading');
        categoryHeadingEl.innerText = menu.category;
        
        categoryItemsEl.appendChild(categoryHeadingEl);
        
        const menuItemsWrapperEl = document.createElement('div');
        menuItemsWrapperEl.classList.add('menu-items-wrapper');
        
        categoryItemsEl.appendChild(menuItemsWrapperEl);
    
        menu.items.map((item) => {
            const menuItemEl = document.createElement('div');
            menuItemEl.classList.add('menu-item');
            menuItemEl.addEventListener('click', buildItemModal.bind(this, item));

            const menuItemImgWrapperEl = document.createElement('div');
            menuItemImgWrapperEl.classList.add('menu-item-img-wrapper');
            menuItemEl.appendChild(menuItemImgWrapperEl);

            const menuItemImgEl = document.createElement('img');
            menuItemImgEl.src = item.image;

            menuItemImgWrapperEl.appendChild(menuItemImgEl);

            const menuItemTxtWrapperEl = document.createElement('div');
            menuItemTxtWrapperEl.classList.add('menu-item-txt-wrapper');

            menuItemEl.appendChild(menuItemTxtWrapperEl);

            const menuItemTitleEl = document.createElement('h3');
            menuItemTitleEl.classList.add('menu-item-title');
            menuItemTitleEl.innerText = item.title;
            
            menuItemTxtWrapperEl.appendChild(menuItemTitleEl);

            const menuItemCostEl = document.createElement('span');
            menuItemCostEl.classList.add('menu-item-cost');
            menuItemCostEl.innerText = formatMoney(item.price);

            menuItemTxtWrapperEl.appendChild(menuItemCostEl);

            const menuItemDescriptionEl = document.createElement('p');
            menuItemDescriptionEl.classList.add('menu-item-description');
            menuItemDescriptionEl.innerText = item.description;

            menuItemTxtWrapperEl.appendChild(menuItemDescriptionEl);

            menuItemsWrapperEl.appendChild(menuItemEl);

        });

        menuItemsWrapper.appendChild(categoryItemsEl);

        setNavMenuScroll(categoryItemsEl);
    })
}

const onCartItemDecrement = (item) => {
    if(cart.indexOf(item) > -1) {
        if(item.quantity > 1) {
            let cartItemIndex = cart.indexOf(item);
           
            cart.map((val, index) => index === cartItemIndex ? val.quantity -= 1 : val);               
        } else {
            deleteCartItem(item);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));   
    
    setCartCount();

    buildSidebar();
}

const onCartItemIncrement = (item) => {
    if(cart.indexOf(item) > -1) {
        let cartItemIndex = cart.indexOf(item);
        
        cart.map((val, index) => index === cartItemIndex ? val.quantity += 1 : val);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    setCartCount();

    buildSidebar();
}


const buildSidebar = () => {
    sidePanelBody.replaceChildren();
    
    if(cart.length > 0 && cart !== null) {
        const cartTitleEl = document.createElement('h2');
        cartTitleEl.innerText = "Your Cart";
    
        sidePanelBody.appendChild(cartTitleEl);
    
        const cartCountParagEl = document.createElement('p');
        cartCountParagEl.classList.add('cart-count-parag');
    
        const cartItemCountEl = document.createElement('span');
        cartItemCountEl.classList.add('cart-item-count');
        cartItemCountEl.innerText = cart.length;
    
        cartCountParagEl.innerText = "You have " +  calculateLengthCartItems()  + " items";
        
        sidePanelBody.appendChild(cartCountParagEl);
    
        const toCartBtnEl = document.createElement('button');
        toCartBtnEl.classList.add('to-cart-btn');
        toCartBtnEl.id = "to-cart-btn";
       
        const modalBtnTextEl = document.createElement('span');
        modalBtnTextEl.classList.add('modal-btn-text');
        modalBtnTextEl.innerText = "Checkout";
        
        toCartBtnEl.appendChild(modalBtnTextEl);
    
        const modalSumEl = document.createElement('span');
        modalSumEl.classList.add('modal-sum');
        modalSumEl.id = "modal-sum";
        modalSumEl.innerText = calculateCartTotal();
    
        toCartBtnEl.appendChild(modalSumEl);
    
        sidePanelBody.appendChild(toCartBtnEl);
        
        const cartItemListEl = document.createElement('ul');
        cartItemListEl.classList.add('cart-item-list');

        cart.map((item) => {
            const cartItemEl = document.createElement('li');
            
            const cartItemImgEl = document.createElement('img');
            cartItemImgEl.classList.add('cart-item-img');
            cartItemImgEl.src = item.image;

            cartItemEl.appendChild(cartItemImgEl);

            const cartItemTxtWrapperEl = document.createElement('div');
            cartItemTxtWrapperEl.classList.add('cart-item-txt-wrapper');

            cartItemEl.appendChild(cartItemTxtWrapperEl);

            const cartItemTitle = document.createElement('p');
            cartItemTitle.innerText = item.title;

            cartItemTxtWrapperEl.appendChild(cartItemTitle);
            
            const cartItemTotalEl = document.createElement('span');
            cartItemTotalEl.classList.add('cart-item-total');
            cartItemTotalEl.id = "cart-item-total";
            cartItemTotalEl.innerText = formatMoney(item.total);

            cartItemTxtWrapperEl.appendChild(cartItemTotalEl);

            const cartItemActionWrapper = document.createElement('div');
            cartItemActionWrapper.classList.add('cart-item-action-wrapper');

            const cartActionRowEl = document.createElement('div');
            cartActionRowEl.classList.add('cart-action-row');

            cartItemActionWrapper.appendChild(cartActionRowEl);
            

            const quantBtnMinusEl = document.createElement('button');
            quantBtnMinusEl.classList.add('quant-btn-minus', 'quant-btn');
            quantBtnMinusEl.innerText = "-";
            quantBtnMinusEl.addEventListener('click', onCartItemDecrement.bind(this, item));

            cartActionRowEl.appendChild(quantBtnMinusEl);

            const itemQuantPanel = document.createElement('span');
            itemQuantPanel.classList.add('item-quant-panel');
            itemQuantPanel.innerText = item.quantity;

            cartActionRowEl.appendChild(itemQuantPanel);

            const quantBtnPlusEl = document.createElement('button');
            quantBtnPlusEl.classList.add('quant-btn-plus', 'quant-btn');
            quantBtnPlusEl.innerText = "+";
            quantBtnPlusEl.addEventListener('click', onCartItemIncrement.bind(this, item));

            cartActionRowEl.appendChild(quantBtnPlusEl);

            const cartActionRow2El = document.createElement('div');
            cartActionRow2El.classList.add('cart-action-row');

            cartItemActionWrapper.appendChild(cartActionRow2El);

            const removeItemBtnEl = document.createElement('button');
            removeItemBtnEl.classList.add('remove-item-btn');
            removeItemBtnEl.id = "remove-item-btn";
            removeItemBtnEl.addEventListener('click', deleteCartItem.bind(this, item));
            
            const removeItemIconEl = document.createElement('i');
            removeItemIconEl.classList.add('fa-solid', 'fa-trash');

            removeItemBtnEl.appendChild(removeItemIconEl);

            cartActionRow2El.appendChild(removeItemBtnEl);
            
            cartItemEl.appendChild(cartItemActionWrapper);

            cartItemListEl.appendChild(cartItemEl);
        });

        sidePanelBody.appendChild(cartItemListEl);
    }
}

const deleteCartItem = (item) => {
    if(cart.indexOf(item) > -1) {
        let targetItem = cart.indexOf(item);
        cart.splice(targetItem, 1);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartCount();
    }
    buildSidebar();
}

const openCartSidePanel = () => {
    sidePanel.classList.add('active');    
}

const closeCartSidePanel = () => {
    sidePanel.classList.remove('active');
}


// Events 
cartBtn.addEventListener('click', openCartSidePanel);
sidePanelClose.addEventListener('click', closeCartSidePanel);

// Invoked Functions 
buildMenu();
buildSidebar();


