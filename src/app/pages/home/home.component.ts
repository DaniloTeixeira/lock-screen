import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink],
  template: ` <a routerLink="/lock-screen">Go to Lock Screen</a> `,
})
export class HomeComponent {}
