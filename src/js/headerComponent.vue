<script>

let booleanValue = false;

const toggleElClass = (el,elClass) => {
     Array.from(document.querySelectorAll(`${el}`)).map(i => {
         i.classList.toggle(`${elClass}`);
     })
}


const burgerMenuClick = () => {

   const booleanTracker = value => {
        booleanValue = value
        return booleanValue
    }

    const menuColorChange = color => {
        Array.from(document.querySelectorAll(".menu-general")).map(i => {
        i.style.stroke = `${color}`;
        });
    }

    
    toggleElClass(".left-side","translate-fix");
    toggleElClass(".right-side","translate-fix");
    toggleElClass("#innerHeader","header");
    toggleElClass("body","body-menu");
    toggleElClass(".body-wrap","body-menu"); 
    toggleElClass("#menuSvgInside path","dash-path");
    toggleElClass("#menuSvgInside line","shape-show");
    toggleElClass("#menuSvgInside text","shape-show");
    

    if (!booleanValue) {
            document.querySelector(".menu").style.height="auto";
            document.querySelector(".twoLine").style.display = "none";
            document.querySelector(".firstLine").setAttribute("y2", "25");
            document.querySelector(".thirdLine").setAttribute("y2", "5");
            booleanTracker(true);
            menuColorChange("#ffffff");
    } else if (booleanValue) {
            document.querySelector(".menu").style.height="0px";
            document.querySelector(".twoLine").style.display = "block";
            document.querySelector(".firstLine").setAttribute("y2", "5");
            document.querySelector(".thirdLine").setAttribute("y2", "25");
            booleanTracker(false);
            menuColorChange("#EB0029");
    }
   
}

import burgerMenu from './menu';
import anime from 'animejs/lib/anime.es.js';
export default {
    methods: {
        logoAnimation() {
            const neverSettle = document.querySelector(".neverSettle");
            const logoAnime = anime.timeline({
                targets: neverSettle,
                easing: 'linear',
                duration: 2500,
                translateX: 5,
                keyframes: [
                    {fill: '#494949'},
                    {fill: '#0C0C0C'},
                    {fill: '#EB0029'}
                    
                ],
            }).add({ targets: neverSettle, fill: '#494949' }, 0)
        },
        showMenu() {
            burgerMenuClick()
        }
    },
    components: {
        burgerMenu
    },
    mounted: function () {
        this.$nextTick(function () {
            this.logoAnimation();
            
        });
    } 
}
</script>
<template>
<div id="header">
    <div id="innerHeader" class="container-fluid pt-4">
        <div class="row">
            <div class="col-6 text-left">
                <svg class="logoSVG" viewBox="0 0 350 100" > 
                    <rect x="3" y="10" width="40" height="40" />
                    <text  x="10" y="45">1</text>
                    <line x1="30" y1="10" x2="46" y2="10" style="stroke:#ffffff;stroke-width:5" />
                    <line x1="43" y1="10" x2="43" y2="23" style="stroke:#ffffff;stroke-width:5" />
                    <line class="plus" x1="33" y1="10" x2="52" y2="10"/>
                    <line class="plus" x1="43" y1="2" x2="43" y2="20"/>
                    <text class="neverSettle" x="60" y="45">Never Settle</text>
                </svg>
            </div>
            <div class="col-6 menu-buttom text-right">
                <svg @click="showMenu" id="menuSVG" viewBox="0 0 40 40" > 
                    <line class="firstLine menu-general" x1="0" y1="5" x2="35" y2="5"/>
                    <line class="twoLine menu-general" x1="0" y1="15" x2="35" y2="15" />
                    <line class="thirdLine menu-general" x1="0" y1="25" x2="35" y2="25"/>
                </svg>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <burgerMenu> </burgerMenu>
    </div>
    
    
    
   
</div>

</template>

