
window.addEventListener('load', () => {
const sr= ScrollReveal ({
    distance: "10px",
    origin:"bottom",
    duration: 500,
    reset: true,
});

//header container
sr.reveal(".header_container h1");
sr.reveal(".header_container .btn",{
    delay: 500,
});
//about container
sr.reveal(".about_item",{
    delay: 500,
});

//stats container

sr.reveal(".stats_image img", {
    origin:"right",
    interval: 700,
});

sr.reveal(".stats_card", {
    interval: 500,
    delay:1000,
});
sr.reveal(".mission-vision_content h2,.para", {
    interval: 600,
    delay:600,
});

});