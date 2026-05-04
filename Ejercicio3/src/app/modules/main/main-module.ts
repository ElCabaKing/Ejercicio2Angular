import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Main } from './main/main';
import { MainRoutingModule } from './main-module-router';

@NgModule({
  declarations: [
  ],
  imports: [CommonModule, MainRoutingModule, Main],
})
export class MainModule {}
