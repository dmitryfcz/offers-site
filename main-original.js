// Общее
var queryParams = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});
var button = document.querySelector('#button')
var form = document.querySelector('#form')
var alert = document.querySelector('#alert')
var geo = queryParams.geo;
var lang = queryParams.lang;

// Проверка телефона
var input = document.querySelector("#phone");
var errorMsg = document.querySelector("#error-msg");
var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
var iti = window.intlTelInput(input, ({
	nationalMode: false,
	autoHideDialCode: false,
	initialCountry: geo || 'ru',
	utilsScript: "intlTelInput/js/utils.js"
}));
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
		geo,
		lang
	}
	button.disabled = true;
	document.getElementById("button").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
	setTimeout(function() {
		form.style.display = 'none';
		alert.style.display = 'block';
	}, 2000);
	dataLayer.push({
		'event': 'forma_send'
	})
});

//Перевод
const translationData = translation[lang] || translation.en
document.getElementById("phrase1").innerHTML = translationData.phrase1;
document.getElementById("phrase2").innerHTML = translationData.phrase2;
document.getElementById("phrase3").innerHTML = translationData.phrase3;
document.getElementById("phrase4").innerHTML = translationData.phrase4;
document.getElementById("phrase5").innerHTML = translationData.phrase5;
document.getElementById("phrase6").innerHTML = translationData.phrase6;
document.getElementById("phrase7").innerHTML = translationData.phrase7;
document.getElementById("phrase8").innerHTML = translationData.phrase8;
document.getElementById("phrase9").innerHTML = translationData.phrase9;
document.getElementById("phrase10").innerHTML = translationData.phrase10;
document.getElementById("phrase11").innerHTML = translationData.phrase11;
document.getElementById("phrase12").innerHTML = translationData.phrase12;
document.getElementById("phrase13").innerHTML = translationData.phrase13;
document.getElementById("phrase14").innerHTML = translationData.phrase14;
document.getElementById("phrase15").innerHTML = translationData.phrase15;
document.getElementById("phrase16").innerHTML = translationData.phrase16;
document.getElementById("phrase17").innerHTML = translationData.phrase17;
document.getElementById("email").placeholder = translationData.email;
document.getElementById("button").innerHTML = translationData.button;

// Ссылка на шифровальщик https://javascriptobfuscator.com/javascript-obfuscator.aspx