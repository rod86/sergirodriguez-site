$(document).ready(function () {
    if ($('.glide').length) {
        new Glide('.glide', {
            type: 'carousel',
            gap: 20,
            animationDuration: 1000
        }).mount();  
    }
});
