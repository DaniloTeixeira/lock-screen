// import { Platform } from "@angular/cdk/platform";
import { Component, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import screenfull from "screenfull";

@Component({
  selector: "app-lock-screen",
  standalone: true,
  imports: [RouterModule],
  template: `
    <div>
      <a routerLink="../">Back to Home</a>
    </div>
    <h3 class="landscape-warn-info">
      For the best experience, please rotate your device to landscape mode.
    </h3>
  `,
  styleUrl: "./lock-screen.component.scss",
})
export class LockScreenComponent implements OnDestroy {
  constructor() {
    if (screenfull.isEnabled) {
      screenfull.request();
      this.lockOrientation();
    }
  }

  ngOnDestroy(): void {
    // this.closeFullscreen();
    screenfull.exit();
    this.unlockOrientation();
  }

  private lockOrientation() {
    (window.screen.orientation as any)?.lock("landscape-primary");
  }

  private unlockOrientation() {
    (window.screen.orientation as any)?.unlock();
  }
}
