import { animate, state, style, transition, trigger } from '@angular/animations';

export const notificationExpand = trigger('notificationExpand', [
    state('collapsed', style({ 'padding-top': 'inherit', 'padding-bottom': 'inherit' })),
    state('expanded', style({ 'padding-top': '1rem', 'padding-bottom': '1rem' })),
    transition('expanded <=> collapsed', animate('200ms ease-in-out')),
]);
