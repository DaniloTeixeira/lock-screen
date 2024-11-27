import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink],
  template: `
    <button routerLink="/lock-screen">Go to Lock Screen</button>
    <h1>Home works!</h1>
  `,
})
export class HomeComponent {}
