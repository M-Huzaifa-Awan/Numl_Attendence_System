function showErrorAnimation() {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
        // Add error shadow
        wrapper.style.boxShadow = "13px 13px 20px red, -13px -13px 20px red";

        // Optional: Reset the shadow after 3 seconds
        setTimeout(() => {
            wrapper.style.boxShadow = "13px 13px 20px #cacaca, -13px -13px 20px #ffffff";
        }, 3000);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const loginToggle = document.getElementById("loginToggle");
    const isTeacherInput = document.getElementById("isTeacher");

    loginToggle.addEventListener("change", function () {
        isTeacherInput.value = loginToggle.checked ? "false" : "true"; 
    });
});

