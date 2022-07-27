// Общее
var queryParams = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
var button = document.querySelector('#button');
var form = document.querySelector('#form');
var alert = document.querySelector('#alert');
var country_code = queryParams.country_code;
var language = queryParams.language;

// Проверка телефона
var input = document.querySelector("#phone");
var errorMsg = document.querySelector("#error-msg");
var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
var iti;
try {
	iti = window.intlTelInput(input, ({
		nationalMode: false,
		autoHideDialCode: false,
		initialCountry: country_code || 'us',
		utilsScript: "intlTelInput/js/utils.js"
	}));
} catch (e) {
	iti = window.intlTelInput(input, ({
		nationalMode: false,
		autoHideDialCode: false,
		initialCountry: 'us',
		utilsScript: "intlTelInput/js/utils.js"
	}));
}
var reset = function() {
	input.classList.remove("is-invalid");
	errorMsg.innerHTML = "";
	errorMsg.classList.add("hide");
};
var setPhoneError = function() {
	input.classList.add("is-invalid");
	var errorCode = iti.getValidationError();
	errorMsg.innerHTML = errorMap[errorCode] || "Invalid number";
	errorMsg.classList.remove("hide");
}
input.addEventListener('blur', function() {
	reset();
	if (input.value.trim()) {
		if (!iti.isValidNumber()) {
			setPhoneError();
		}
	}
});
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

// Клик по кнопке
button.addEventListener('click', function() {
	dataLayer.push({
		'event': 'click_button'
	})
});

// Отправка формы
form.addEventListener('submit', function(event) {
	event.preventDefault();

    // Проверка выбрана ли опция
    var checkboxSetted = $('.checkbox-group :checkbox:checked').length > 0;
    $(".option-checkbox").removeClass("is-invalid");
    $("#phrase18").hide();
    if (!checkboxSetted) {
        $(".option-checkbox").addClass("is-invalid");
        $("#phrase18").show();
        return false;
    }

    // Проверка телефона
	if (!iti.isValidNumber()) {
		setPhoneError();
		return false
	}

	var data = new FormData(event.target);
	var formData = {
		option: data.getAll("option"),
		gender: data.get("gender"),
		age: data.get("age"),
		phone: data.get("phone"),
		email: data.get("email"),
		country_code,
		language
	}

    button.disabled = true;
    document.getElementById("button").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    $.ajax({
        type: "POST",
        url: "send.php",
        data: formData,
        success: function () {
            form.style.display = 'none';
            alert.style.display = 'block';
            dataLayer.push({
                'event': 'forma_send'
            })
        }
    });
});

//Перевод
var currentLanguage = language?.toLowerCase().split("-").shift();
var translationData = translation[currentLanguage] || translation.en;
$.each(translationData, function(key, value) {
    document.getElementById(key).innerHTML = value;
});


// Проверка cookie
$("#phrase21").click(function() {
    $(".cookie-wrapper").hide();
    localStorage.setItem('cookie', 'yes');
})
if (localStorage.getItem('cookie') !== 'yes') {
    $(".cookie-wrapper").css('display', 'flex');
}