import { Platform } from "@angular/cdk/platform";
import { Component, HostListener } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  host: {
    "window:orientationchange": "onOrientationChange($event)",
  },
  selector: "app-lock-screen",
  standalone: true,
  imports: [RouterModule],
  template: `
    <a routerLink="../">Back to App</a>
    <h1>Lock Screen works!</h1>

    <!-- <div style="display: flex; gap: 1rem">
      <button>Lock on portrait</button>
      <button>Lock on landscape</button>
    </div> -->
  `,
})
export class LockScreenComponent {
  @HostListener("window:orientationchange", ["$event"])
  onOrientationChange(event: Event) {
    event.preventDefault();
  }

  constructor(private platform: Platform) {
    if (this.platform.ANDROID || this.platform.IOS) {
      (screen.orientation as any).lock("landscape");
    }
  }
}
