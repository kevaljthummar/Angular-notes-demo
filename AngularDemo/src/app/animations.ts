import { trigger, transition, animate, style, state, animation, useAnimation } from '@angular/animations';

export const fadeInAnimation = animation([
    style({ opacity: 0 }),
    animate(2000)
]);

export let fade = trigger('fade', [

    transition(':enter, :leave', [ // void <=> *
        useAnimation(fadeInAnimation)
    ])
    // tslint:disable-next-line: eofline
]);