import { Component, OnInit } from '@angular/core';
import 'bootstrap';

@Component
({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit
{
    constructor() {}
    
    ngOnInit()
    {
    }
    
    selectedViewType: String = "Month";
}
