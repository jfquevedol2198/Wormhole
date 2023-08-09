import { Component } from '@angular/core';

import { childRoutes } from './wormhole.child-routes';

@Component({
    selector: 'app-wormhole',
    templateUrl: './wormhole.component.html',
})
export class WormholeComponent {
    childRoutes = childRoutes;
}
