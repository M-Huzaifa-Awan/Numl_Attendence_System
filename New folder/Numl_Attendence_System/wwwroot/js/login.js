document.addEventListener("DOMContentLoaded", function () {
    

    const forgotPasswordLink = document.getElementById('forgotPassword');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            const passwordField = document.getElementById('pwd');
            const submitButton = document.querySelector('.btn');
            const form = document.getElementById('loginForm');

            if (passwordField) {
                passwordField.type = 'text';
                passwordField.name = 'mobileNo';
                passwordField.id = 'mobileNo';
                passwordField.placeholder = 'Mobile Number';
            }

            if (submitButton) {
                submitButton.textContent = 'Reset';
            }

            if (form) {
                form.action = '/Login/ResetPassword';
            }
        });
    }

    const loginToggle = document.getElementById("loginToggle");
    const isTeacherInput = document.getElementById("isTeacher");

    if (loginToggle && isTeacherInput) {
        loginToggle.addEventListener("change", function () {
            isTeacherInput.value = loginToggle.checked ? "false" : "true";
        });
    }
});