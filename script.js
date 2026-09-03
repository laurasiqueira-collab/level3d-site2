const products = [

    {
        id: 1,
        name: "Vaso Geométrico",
        category: "Decoracao",
        price: 49.90,
        description:
            "Vaso decorativo com design geométrico moderno, perfeito para deixar qualquer ambiente mais estiloso.",
        icon: "◇",
        badge: "DESTAQUE"
    },

    {
        id: 2,
        name: "Suporte para Celular",
        category: "Utilidades",
        price: 34.90,
        description:
            "Suporte compacto e funcional para celular. Ideal para mesa de trabalho, estudos ou uso diário.",
        icon: "▣",
        badge: "POPULAR"
    },

    {
        id: 3,
        name: "Mini Figura Geek",
        category: "Geek",
        price: 59.90,
        description:
            "Mini figura decorativa inspirada no universo geek. Uma ótima opção para colecionadores.",
        icon: "✦",
        badge: "NOVO"
    },

    {
        id: 4,
        name: "Organizador de Mesa",
        category: "Utilidades",
        price: 44.90,
        description:
            "Organizador de mesa produzido em impressão 3D para manter seus objetos sempre organizados.",
        icon: "▤",
        badge: ""
    },

    {
        id: 5,
        name: "Luminária Decorativa",
        category: "Decoracao",
        price: 89.90,
        description:
            "Peça decorativa com design diferenciado para complementar seu ambiente.",
        icon: "◉",
        badge: "DESTAQUE"
    },

    {
        id: 6,
        name: "Porta-Fone",
        category: "Utilidades",
        price: 29.90,
        description:
            "Suporte para fones de ouvido que ajuda a organizar sua mesa de forma prática.",
        icon: "◌",
        badge: ""
    },

    {
        id: 7,
        name: "Estatueta Geek",
        category: "Geek",
        price: 79.90,
        description:
            "Estatueta decorativa para fãs da cultura geek e colecionadores.",
        icon: "★",
        badge: "POPULAR"
    },

    {
        id: 8,
        name: "Peça Personalizada",
        category: "Personalizados",
        price: 0,
        description:
            "Tenha uma peça criada especialmente para você. Envie sua ideia e solicite um orçamento.",
        icon: "✎",
        badge: "SOB MEDIDA"
    }

];


let cart = JSON.parse(
    localStorage.getItem("level3d_cart")
) || [];


function formatPrice(price) {

    if (price === 0) {
        return "Sob orçamento";
    }

    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


function getCategoryName(category) {

    const names = {

        Decoracao: "DECORAÇÃO",
        Geek: "GEEK",
        Utilidades: "UTILIDADES",
        Personalizados: "PERSONALIZADOS"

    };

    return names[category] || category;

}

const productsGrid =
    document.getElementById("productsGrid");

const filterButtons =
    document.querySelectorAll(".filter");

const categoryCards =
    document.querySelectorAll(".category-card");

const cartButton =
    document.getElementById("openCart");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const productModal =
    document.getElementById("productModal");

const modalBackground =
    document.getElementById("modalBackground");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");

const modalAdd =
    document.getElementById("modalAdd");

const menuButton =
    document.getElementById("menuButton");

const menu =
    document.getElementById("menu");

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");



function saveCart() {

    localStorage.setItem(
        "level3d_cart",
        JSON.stringify(cart)
    );

}

function renderProducts(filter = "Todos") {

    if (!productsGrid) {
        return;
    }

    let filteredProducts = products;

    if (filter !== "Todos") {

        filteredProducts = products.filter(
            product =>
                product.category === filter
        );

    }

    if (filteredProducts.length === 0) {

        productsGrid.innerHTML = `

            <div class="empty-products">

                <div class="empty-products-icon">
                    ◇
                </div>

                <h3>
                    Nenhum produto encontrado
                </h3>

                <p>
                    Ainda não temos produtos nessa categoria.
                </p>

            </div>

        `;

        return;
    }


    productsGrid.innerHTML =
        filteredProducts.map(product => {

            const price =
                product.price === 0
                    ? "Sob orçamento"
                    : formatPrice(product.price);

            return `

                <article
                    class="product-card"
                    data-id="${product.id}"
                >

                    <div class="product-image">

                        ${
                            product.badge
                                ? `
                                    <span class="product-badge">
                                        ${product.badge}
                                    </span>
                                `
                                : ""
                        }

                        <div class="product-placeholder">

                            <span>
                                ${product.icon}
                            </span>

                        </div>

                    </div>


                    <div class="product-info">

                        <span class="product-category">
                            ${getCategoryName(product.category)}
                        </span>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${product.description}
                        </p>

                        <div class="product-bottom">

                            <span class="product-price">
                                ${price}
                            </span>

                            <div class="product-actions">

                                <button
                                    class="product-action view-product"
                                    data-id="${product.id}"
                                    type="button"
                                    aria-label="Visualizar produto"
                                >
                                    👁
                                </button>

                                <button
                                    class="product-action add-product"
                                    data-id="${product.id}"
                                    type="button"
                                    aria-label="Adicionar ao carrinho"
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

    attachProductEvents();

}

function attachProductEvents() {

    document
        .querySelectorAll(".view-product")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(button.dataset.id);

                    openProductModal(id);

                }
            );

        });


    document
        .querySelectorAll(".add-product")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(button.dataset.id);

                    addToCart(id);

                }
            );

        });

}

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            renderProducts(
                button.dataset.filter
            );

        }
    );

});

categoryCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const category =
                card.dataset.category;

            filterButtons.forEach(button => {

                button.classList.remove("active");

                if (
                    button.dataset.filter === category
                ) {

                    button.classList.add("active");

                }

            });

            renderProducts(category);

            const productsSection =
                document.getElementById("produtos");

            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) {
        return;
    }


    if (product.price === 0) {

        closeProductModal();

        const contact =
            document.getElementById("contato");

        if (contact) {

            contact.scrollIntoView({
                behavior: "smooth"
            });

        }

        return;
    }


    const existingItem =
        cart.find(
            item => item.id === productId
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    openCartSidebar();

}

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    renderCart();

}

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            item => item.id === productId
        );

    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    renderCart();

}

function renderCart() {

    if (!cartItems) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <span>
                    🛒
                </span>

                <h3>
                    Seu carrinho está vazio
                </h3>

                <p>
                    Adicione alguns produtos para continuar.
                </p>

            </div>

        `;


        if (cartTotal) {

            cartTotal.textContent =
                "R$ 0,00";

        }


        if (cartCount) {

            cartCount.textContent =
                "0";

        }


        if (checkoutButton) {

            checkoutButton.disabled =
                true;

        }

        return;

    }


    let total = 0;

    let quantityTotal = 0;


    cartItems.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );


            if (!product) {
                return "";
            }


            const subtotal =
                product.price *
                item.quantity;


            total += subtotal;

            quantityTotal +=
                item.quantity;


            return `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <div>
                            ${product.icon}
                        </div>

                    </div>


                    <div class="cart-item-info">

                        <h4>
                            ${product.name}
                        </h4>

                        <p>
                            ${formatPrice(product.price)}
                        </p>


                        <div class="quantity-controls">

                            <button
                                type="button"
                                class="decrease"
                                data-id="${product.id}"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                type="button"
                                class="increase"
                                data-id="${product.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="remove-item"
                        data-id="${product.id}"
                    >
                        REMOVER
                    </button>

                </div>

            `;

        }).join("");


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(total);

    }


    if (cartCount) {

        cartCount.textContent =
            quantityTotal;

    }


    if (checkoutButton) {

        checkoutButton.disabled =
            false;

    }


    attachCartEvents();

}

function attachCartEvents() {

    document
        .querySelectorAll(".increase")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        Number(button.dataset.id),
                        1
                    );

                }
            );

        });


    document
        .querySelectorAll(".decrease")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        Number(button.dataset.id),
                        -1
                    );

                }
            );

        });


    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        Number(button.dataset.id)
                    );

                }
            );

        });

}

function openCartSidebar() {

    if (
        !cartSidebar ||
        !cartOverlay
    ) {
        return;
    }


    cartSidebar.classList.add(
        "active"
    );

    cartOverlay.classList.add(
        "active"
    );

    document.body.classList.add(
        "no-scroll"
    );

}

function closeCartSidebar() {

    if (
        !cartSidebar ||
        !cartOverlay
    ) {
        return;
    }


    cartSidebar.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCartSidebar
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartSidebar
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartSidebar
    );

}
let currentProductId = null;


function openProductModal(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (
        !product ||
        !productModal
    ) {
        return;
    }


    currentProductId =
        productId;


    if (modalImage) {

        modalImage.innerHTML = `

            <span>
                ${product.icon}
            </span>

        `;

    }


    if (modalCategory) {

        modalCategory.textContent =
            getCategoryName(
                product.category
            );

    }


    if (modalTitle) {

        modalTitle.textContent =
            product.name;

    }


    if (modalDescription) {

        modalDescription.textContent =
            product.description;

    }


    if (modalPrice) {

        modalPrice.textContent =
            formatPrice(
                product.price
            );

    }


    if (modalAdd) {

        modalAdd.textContent =
            product.price === 0
                ? "Solicitar orçamento"
                : "Adicionar ao carrinho";

    }


    productModal.classList.add(
        "active"
    );

    document.body.classList.add(
        "no-scroll"
    );

}

function closeProductModal() {

    if (!productModal) {
        return;
    }


    productModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProductModal
    );

}


if (modalBackground) {

    modalBackground.addEventListener(
        "click",
        closeProductModal
    );

}


if (modalAdd) {

    modalAdd.addEventListener(
        "click",
        () => {

            if (
                currentProductId !== null
            ) {

                addToCart(
                    currentProductId
                );

                closeProductModal();

            }

        }
    );

}


if (
    menuButton &&
    menu
) {

    menuButton.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "active"
            );

        }
    );


    menu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "active"
                    );

                }
            );

        });

}

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    ?.value.trim();


            const email =
                document
                    .getElementById("email")
                    ?.value.trim();


            const message =
                document
                    .getElementById("message")
                    ?.value.trim();


            if (
                !name ||
                !email ||
                !message
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Preencha todos os campos.";

                }

                return;

            }


            if (formMessage) {

                formMessage.textContent =
                    "Mensagem preparada com sucesso!";

            }


            contactForm.reset();

        }
    );

}


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {
                return;
            }


            saveCart();


            window.location.href =
                "pagamento.html";

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        closeCartSidebar();

        closeProductModal();

    }
);


document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderProducts();

        renderCart();

    }
);
