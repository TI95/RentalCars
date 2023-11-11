new WOW().init({
    boxClass: 'wow',
    animateClass: 'animate__animated',
});

$('.slider').slick({
    dots: false,
    speed: 500,
});

$('.multiple-items').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    dots: true,
    responsive: [
        {
            breakpoint: 1251,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 785,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});


$('#burger').click(function () {
    $('#menu').addClass('open');
});

$('#menu *').click(function () {
    $('#menu').removeClass('open');
});


const orderCall = $('#order-call')
const miniPopupBody = $('#mini-popup-body')
orderCall.click(() => {
    openPopup(miniPopupBody);
});


$('#mini-popup-btn').click(function () {
    const miniPopupName = $('#mini-popup-name')
    const miniPopupNumber = $('#mini-popup-number')
    let hasError = false;
    $('.error').hide();

    if (!miniPopupName.val()) {
        setControlError(miniPopupName);
        hasError = true;
    } else {
        resetControlError(miniPopupNumber);
    }
    if (!miniPopupNumber.val()) {
        setControlError(miniPopupNumber);
        hasError = true;
    } else {
        resetControlError(miniPopupNumber);
    }
    if (!hasError) {
        $.ajax({
            method: 'POST',
            url: ' https://testologia.site/checkout',
            data: {name: miniPopupName.val(), phone: miniPopupNumber.val()}
        })
            .done(function (message) {
                if (message.success) {

                    $('.popup-title').hide();
                    $('.form-container').hide();
                    $('.order-success-container').show();
                    $('#order-success-btn').click(() => {
                        $('#mini-popup-form')[0].reset();
                        closePopup(miniPopupBody);
                    });


                } else {
                    alert('Ошибка!');
                }
            });


    }
});

$('.popup-body').click(() => {
    $('.popup-body').css({
        display: ('none')
    })
    $('body').css({
        overflow: 'unset'
    })
})

const setControlError = (control) => {
    control.next().show();
    control.css({
        border: ('1px solid red'),
        marginBottom: ('10px')
    });
}

let errorStarEndDate = $('.error-start-end-date')

const setStarEndDateError = (control) => {
    errorStarEndDate.show();
    control.css({
        border: ('1px solid red'),
        marginBottom: ('10px')
    });
}
const mailValidationError = (control) => {
    $('.mail-validation-error').show();
    control.css({
        border: ('1px solid red'),
        marginBottom: ('10px')
    });
}

const resetControlError = (control) => {
    control.css({
        border: (' 1px solid rgb(70, 70, 70)')
    });
}

const popupBody = $('#popup-body');
const orderCar = $('.order-car');


orderCar.click(() => {
    openPopup(popupBody);
});


const openPopup = (popup) => {

    popup.show();
    $('body').css({overflow: 'hidden'});

    $('.your-name').on('keypress', function (keydown) {
        const key = keydown.key;
        if (!/^[A-Za-z]$/.test(key)) {
            keydown.preventDefault();
        }
    });

    $('.your-number').on('keypress', function (keydown) {
        const key = keydown.key;
        if (!/^[0-9+]$/.test(key)) {
            keydown.preventDefault();
        }

    });

    startDate.on('keypress', function (keydown) {
        const key = keydown.key;
        if (!/^[0-9.]$/.test(key)) {
            keydown.preventDefault();
        }
    });
    endDate.on('keypress', function (keydown) {
        const key = keydown.key;
        if (!/^[0-9.]$/.test(key)) {
            keydown.preventDefault();
        }
    });


}


const closePopup = (popup) => {
    popup.hide();
    $('.popup-title').show();
    $('.form-container').show();
    $('.order-success-container').hide();
    $('body').css({overflow: 'unset'});

}


let startDate = $('#popup-star-date');
let endDate = $('#popup-end-date');

$('#popup-btn').click(() => {

    const carSelect = $('#select-lambo');

    const selectLocation = $('#select-location');
    const popupName = $('#popup-name');
    const popupNumber = $('#popup-number');
    const popupEmail = $('#popup-email');
    const emailPatter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const email = popupEmail.val();

    let hasError = false;
    $('.error').hide();
    $('.error-start-date').hide()

    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let plusDay = today.getDate() + 1;


    if (day < 10 || plusDay < 10) {
        day = '0' + day;
        plusDay = '0' + plusDay;
    }
    if (month < 10) {
        month = '0' + month;
    }

    let minDate = month + '.' + day + '.' + year;
    let minMaxDate = month + '.' + plusDay + '.' + year;
    let dateTime = new Date(minDate).getTime();
    let inputStartDate = new Date(startDate.val()).getTime();
    let inputEndDate = new Date(endDate.val()).getTime();


    if (inputEndDate && (inputStartDate < dateTime || isNaN(inputStartDate))) {
        setStarEndDateError(startDate);
        startDate.val(minDate);
        hasError = true;
    } else {
        resetControlError(startDate);
        errorStarEndDate.hide();
    }

    if (inputEndDate && (inputEndDate <= dateTime || isNaN(inputEndDate))) {
        setStarEndDateError(endDate);
        endDate.val(minMaxDate);
        hasError = true;
    } else {
        resetControlError(endDate);
        errorStarEndDate.hide();
    }

    if (inputStartDate >= inputEndDate) {
        console.log(inputStartDate > inputEndDate);
        alert('Дата окончания аренды должна быть как минимум на день позже даты начала аренды!');
        hasError = true;
    }


    if (!carSelect.val()) {
        setControlError(carSelect);
        hasError = true;
    } else {
        resetControlError(carSelect);
    }
    if (!startDate.val()) {
        setControlError(startDate);
        hasError = true;
    } else {
        resetControlError(startDate);
    }

    if (!endDate.val()) {
        setControlError(endDate);
        hasError = true;
    } else {
        resetControlError(endDate);
    }
    if (!selectLocation.val()) {
        setControlError(selectLocation);
        hasError = true;
    } else {
        resetControlError(selectLocation);
    }
    if (!popupName.val()) {
        setControlError(popupName);
        hasError = true;
    } else {
        resetControlError(popupName);
    }
    if (!popupNumber.val()) {
        setControlError(popupNumber);
        hasError = true;
    } else {
        resetControlError(popupNumber);
    }
    if (!popupEmail.val()) {
        setControlError(popupEmail);
        hasError = true;
    } else {
        resetControlError(popupEmail);
    }

    if (popupEmail.val()) {
        if (!emailPatter.test(email)) {
            mailValidationError(popupEmail);
            hasError = true;
        } else {
            resetControlError(email);
        }
    }

    if (!hasError) {
        $.ajax({
            method: 'POST',
            url: ' https://testologia.site/checkout',
            data: {
                Car: carSelect.val(),
                startDate: startDate.val(),
                endDate: endDate.val(),
                location: selectLocation.val(),
                name: popupName.val(),
                phone: popupNumber.val(),
                email: popupEmail.val()
            }
        })
            .done(function (message) {
                if (message.success) {
                    $('.popup-title').hide();
                    $('.form-container').hide();
                    $('.order-success-container').show();
                    $('#validation-success-btn').click(() => {
                        closePopup(popupBody);
                        $('#popup-form')[0].reset();

                    });
                } else {
                    alert('Упс, что-то не так!')
                }
            });


    }

});

