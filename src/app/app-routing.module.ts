import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {RegisterComponent} from "./register/register.component";


const appRoutes: Routes = [
  {path: '', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]


})
export class AppRoutingModule {}
