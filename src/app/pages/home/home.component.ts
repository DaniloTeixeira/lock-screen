import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/lock-screen">Go to Lock Screen</a>
    <h1>Home works!</h1>
  `,
})
export class HomeComponent {}
