import { Component, OnInit, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { ItemsService } from './items.service';

const STATE_KEY_ITEMS = makeStateKey('items');

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: any = [];

  constructor(
    private itemsService: ItemsService,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    const newState = this.state.get(STATE_KEY_ITEMS, [] as any);

    if (!newState || !(newState.length) || newState.length === 0) {
      this.itemsService.getItems('https://jsonplaceholder.typicode.com/users')
        .subscribe(items => {
          const platform = isPlatformBrowser(this.platformId) ? 'in the browser' : 'on the server';
          console.log(`getUsers: Running ${platform} with appId ${this.appId} and platformId ${this.platformId}`);
          this.items = items;
          this.state.set(STATE_KEY_ITEMS, items as any);
        });
    } else {
      this.items = newState;
    }
  }
}
