import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-lock-screen",
  standalone: true,
  imports: [RouterModule],
  template: `
    <button routerLink="../">Back to App</button>
    <h1>Lock Screen works!</h1>
  `,
})
export class LockScreenComponent {}
