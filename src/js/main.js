import Vue from 'vue';
import headerComponent from './headerComponent';
import hoverSections from './hoverSections';
import mosaicComponent from './mosaicComponent';
import footerComponent from './footerComponent';
import createjs from 'createjs';

Vue.component('headerComponent', headerComponent);
Vue.component('hoverSections', hoverSections);
Vue.component('mosaicComponent', mosaicComponent);
Vue.component('footerComponent', footerComponent);



const header = new Vue({
    el: '#header',
    render: render => render(headerComponent),
});

const hover = new Vue({
    el: '#hover',
    render: render => render(hoverSections),
});


const mosaic = new Vue({
    el: '#mosaic',
    render: render => render(mosaicComponent),
});

const footer = new Vue({
    el: '#footer',
    render: render => render(footerComponent),
});

require("./canvasJS.js");
const runningReindeer = require("./raindeerSpriteCanvas.js");

const controller = new ScrollMagic.Controller();
console.log(controller);

runningReindeer.runReindeerRun();


const runIt = (el, effect, duration, trigger) => {

    const tween = TweenMax.to(`${el}`, 1, { className: `+=${effect}` });

    const scene = new ScrollMagic.Scene({ triggerElement: `${el}`, duration: duration, offset: -50, triggerHook: trigger })
        .setTween(tween)
        .addTo(controller);
};

const fadeIn = new ScrollMagic.Scene({
    triggerElement: ".startRunning",
    triggerHook: 1
}).on('start', function() {
    runningReindeer.runReindeerRun();
}).addTo(controller);


runIt(".devider-to-rigth", "devider-fix", 500, 0.5);
runIt(".devider-to-left", "devider-fix", 500, 0.5);
runIt(".image-mosaic", "image-mosaic-fix", 1000, 0.5);
runIt(".video", "video-fix", 3000, 0.5);
runIt("#addBounce", "bounceEffect", 3000, 0.8);

const footerPosition = new ScrollMagic.Scene({
    triggerElement: "#trigger",
    triggerHook: 1,
    offset: 500
}).setClassToggle(".mainFooter", "positionChange").addIndicators().addTo(controller);












//