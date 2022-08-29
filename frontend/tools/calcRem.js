export default function (rem) {
    return rem * parseFloat(getComputedStyle(document.body).fontSize);
}
