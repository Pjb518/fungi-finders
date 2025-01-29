function parseBooleanString(str) {
    return /^true$/i.test(str);
}

globalThis.addEventListener("DOMContentLoaded", () => {
    const navigationButton = document.querySelector("[aria-controls='primary-nav']");
    const primaryNavigation = document.getElementById("primary-nav");

    navigationButton.addEventListener("click", function (event) {
        const currentExpandedState = parseBooleanString(this.getAttribute("aria-expanded"));
        this.setAttribute("aria-expanded", !currentExpandedState);
    });
});