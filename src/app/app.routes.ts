import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadComponent: () =>
      import("./pages/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "lock-screen",
    loadComponent: () =>
      import("./pages/lock-screen/lock-screen.component").then(
        (c) => c.LockScreenComponent
      ),
  },
];
