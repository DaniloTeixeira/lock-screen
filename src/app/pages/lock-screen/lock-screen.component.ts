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

    <button (click)="openFullscreen()">click</button>
  `,
})
export class LockScreenComponent implements OnDestroy {
  private el: any;
  private platform = inject(Platform);
  private document = Inject(DOCUMENT);

  ngOnInit(): void {
    this.openFullscreen();

    if (this.platform.ANDROID || this.platform.IOS) {
      this.blockOrientation();
    }
  }

  ngOnDestroy(): void {
    this.closeFullscreen();
  }

  private blockOrientation() {
    (window.screen.orientation as any)?.lock("landscape");
  }

  openFullscreen() {
    this.el = this.document?.documentElement;

    if (this.el?.requestFullscreen) {
      this.el?.requestFullscreen();
    } else if (this.el?.mozRequestFullScreen) {
      /* Firefox */
      this.el?.mozRequestFullScreen();
    } else if (this.el?.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.el?.webkitRequestFullscreen();
    } else if (this.el?.msRequestFullscreen) {
      /* IE/Edge */
      this.el?.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  closeFullscreen() {
    if (this.document?.exitFullscreen) {
      this.document?.exitFullscreen();
    } else if (this.document?.mozCancelFullScreen) {
      /* Firefox */
      this.document?.mozCancelFullScreen();
    } else if (this.document?.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document?.webkitExitFullscreen();
    } else if (this.document?.msExitFullscreen) {
      /* IE/Edge */
      this.document?.msExitFullscreen();
    }
  }
}
