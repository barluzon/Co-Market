

jQuery(document).ready(function($){
        //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
        var $L = 1200,
            $menu_navigation = $('#main-nav'),
            $cart_trigger = $('#cd-cart-trigger'),
            $lateral_cart = $('#cd-cart'),
            $shadow_layer = $('#cd-shadow-layer');



        //open cart

        $cart_trigger.on('click', function(event){
            vent.preventDefault();
            //clos lateral menu (if it's open)
            $menu_navigation.removeClass('speed-in');
            toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
        });

        //close lateral cart or lateral menu
        $shadow_layer.on('click', function(){
            $shadow_layer.removeClass('is-visible');
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            if( $lateral_cart.hasClass('speed-in') ) {
                $lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                    $('body').removeClass('overflow-hidden');
                });
                $menu_navigation.removeClass('speed-in');
            } else {
                $menu_navigation.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                    $('body').removeClass('overflow-hidden');
                });
                $lateral_cart.removeClass('speed-in');
            }
        });

        //move #main-navigation inside header on laptop
        //insert #main-navigation after header on mobile
        move_navigation( $menu_navigation, $L);
        $(window).on('resize', function(){
            move_navigation( $menu_navigation, $L);

            if( $(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
                $menu_navigation.removeClass('speed-in');
                $shadow_layer.removeClass('is-visible');
                $('body').removeClass('overflow-hidden');
            }

        });
    });

    function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
        if( $lateral_panel.hasClass('speed-in') ) {
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            $lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $body.removeClass('overflow-hidden');
            });
            $background_layer.removeClass('is-visible');

        } else {
            $lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $body.addClass('overflow-hidden');
            });
            $background_layer.addClass('is-visible');
        }
    }

    function move_navigation( $navigation, $MQ) {
        if ( $(window).width() >= $MQ ) {
            $navigation.detach();
            $navigation.appendTo('header');
        } else {
            $navigation.detach();
            $navigation.insertAfter('header');
        }
    }

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('cd-item-remove cd-img-replace')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cd-qty')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('btn btn-success cart-button px-5')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
        button.addEventListener('click', addProductToCart)
    }

    document.getElementsByClassName('checkout-btn')[0].addEventListener('click', purchaseClicked)

    var compareProduct = document.getElementsByClassName('compare-title')
    for (var i = 0; i < compareProduct.length; i++) {
        var input = compareProduct[i]
        input.addEventListener('change', openCompare)
        input.addEventListener('change',compareBranchesText)
    }


}

function purchaseClicked() {
    document.location.href = '/checkout';
    // alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText

    addItemToCart(title, price)
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('li')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cd-cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <h7 class="cart-item-title">${title}\n</h7>
        <div class="cd-price">${price}</div>
        <a href="#0" class="cd-item-remove cd-img-replace">Remove</a>
        <input class="cd-qty" type="number" value="1">
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cd-item-remove cd-img-replace')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cd-qty')[0].addEventListener('change', quantityChanged)
    updateCartTotal()

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cd-cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    // console.log(cartItemContainer)
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        console.log(cartRow)

        var priceElement = cartRow.getElementsByClassName('cd-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cd-qty')[0]

        var price = parseFloat(priceElement.innerText.replace('₪', ''))
        console.log(quantityElement.value)
        var quantity = parseFloat(quantityElement.value)
        // var quantityval = parseFloat(document.getElementById("val").value)
        // console.log(quantityval)

        console.log(quantity)
        console.log(price)
        console.log(total)
        total = total + (price * quantity)
        console.log("total: " + total)

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cd-cart-total')[0].innerText = '₪' + total
}
function addProductToCart(){
    let button =this;
    button.classList.add('clicked');
}

function openCompare(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
}

$( document ).ready(function() {
    $('.compare-title').on('click', function() {
        $('.modal-wrapper').toggleClass('open');
        $('.shop-item-title').toggleClass('blur-it');
        return false;
    });
});
function compareBranchesText() {

    document.getElementById('inputfile')
        .addEventListener('change', function () {

            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('output')
                    .textContent = fr.result;
            }

            fr.readAsText(this.files[0]);
        })
}

