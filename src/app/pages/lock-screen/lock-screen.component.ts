import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnDestroy, inject } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  host: {
    "window:orientationchange": "onOrientationChange($event)",
  },
  selector: "app-lock-screen",
  standalone: true,
  imports: [RouterModule],
  template: `
    <div>
      <a routerLink="../">Back to App</a>
      <h1>Lock Screen works!</h1>
    </div>
  `,
})
export class LockScreenComponent implements OnDestroy {
  private el: any;
  private platform = inject(Platform);
  private document = Inject(DOCUMENT);

  ngOnInit(): void {
    this.el = this.document.documentElement;
    this.openFullscreen();

    if (this.platform.ANDROID || this.platform.IOS) {
      this.blockOrientation();
    }
  }

  ngOnDestroy(): void {
    this.closeFullscreen();
  }

  private openFullscreen(): void {
    const requestFullscreen =
      this.el.requestFullscreen ||
      this.el.mozRequestFullScreen || // Para Firefox
      this.el.webkitRequestFullscreen || // Para Chrome, Safari, Opera
      this.el.msRequestFullscreen; // Para IE/Edge

    if (requestFullscreen) {
      requestFullscreen.call(this.el);
    }

    this.blockOrientation();
  }

  private closeFullscreen(): void {
    const exitFullscreen =
      this.el.exitFullscreen ||
      this.el.mozCancelFullScreen || // Para Firefox
      this.el.webkitExitFullscreen || // Para Chrome, Safari, Opera
      this.el.msExitFullscreen; // Para IE/Edge

    if (exitFullscreen) {
      exitFullscreen.call(this.el);
    }
  }

  private blockOrientation() {
    (window.screen.orientation as any)?.lock("landscape");
  }
}
