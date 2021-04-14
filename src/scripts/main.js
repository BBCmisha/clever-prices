// Price form
const currency_items = document.querySelectorAll('.price-form__currency-item');
// Table
const table_form = document.querySelector('.table__form');
const table_rows = document.querySelectorAll('.table__row');
const total_price_number = document.querySelector('.total-price__number');
// Navigation
const navigation = document.querySelector('.navigation');
const navigation_inner = document.querySelector('.navigation__inner');
const burger_menu = document.querySelector('.burger-menu');


/** Price form logic **/
currency_items.forEach((item) => {
    item.addEventListener('click', () => {
        if (!item.classList.contains('active')) {
            removeActiveClassFromCurrencyItems();
            item.classList.add('active');
        }
    }) 
});

function removeActiveClassFromCurrencyItems () {
    currency_items.forEach((item) => {
        item.classList.remove('active');
    })
}


/** Table logic **/
table_rows.forEach((item) => {
    item.addEventListener('click', (e) => {
            if (e.target.tagName == "INPUT" && e.target.checked == false) {
                setTotalPrice();
            } else if (e.target.tagName == "INPUT") {
                removeActiveClassFromLabels(item);
                e.target.checked = true;
                setTotalPrice();
            }
    });
});

function removeActiveClassFromLabels (row) {
    let checkboxes = row.querySelectorAll('input');

    checkboxes.forEach((item) => {
        item.checked = false;
    });

}

function setTotalPrice () {
    let checkedCells = table_form.querySelectorAll('.table__cell input:checked');
    let total_price = 0;

    checkedCells.forEach((item) => {
        total_price += +item.value;
    });

    total_price_number.innerHTML = total_price;
}

/** Navigation logic **/
window.addEventListener('scroll', () => {
    navigation.classList.toggle('sticky', window.scrollY > 0);
});

burger_menu.addEventListener('click', () => {
    burger_menu.classList.toggle('active');
    navigation.classList.toggle('active');
});

