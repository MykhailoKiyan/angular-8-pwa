import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;

  constructor(
    private meta: Meta,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('angular.ganata: Progressive Web Application by Angular 8');
    this.meta.addTag({
      name: 'angular.eight.pwa',
      content: 'Demo Angular 8 PWA'
    });
    this.meta.updateTag({
      name: 'description',
      content: 'This application was created by Angular version 8.2.14 just for demo'
    });
  }
}
