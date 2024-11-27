import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Component, OnDestroy, inject } from "@angular/core";
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
      <a routerLink="../">Back to Home</a>
      <h1>Lock Screen works!</h1>
    </div>
  `,
})
export class LockScreenComponent implements OnDestroy {
  private el: any;
  private platform = inject(Platform);
  private document: any = inject(DOCUMENT);

  ngOnInit(): void {
    this.openFullscreen();
  }

  ngOnDestroy(): void {
    this.closeFullscreen();
  }

  private lockOrientation() {
    (window.screen.orientation as any)?.lock("landscape");
  }

  private unlockOrientation() {
    (window.screen.orientation as any)?.unlock();
  }

  private openFullscreen() {
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

    if (this.platform.ANDROID || this.platform.IOS) {
      this.lockOrientation();
    }
  }
  /* Close fullscreen */
  private closeFullscreen() {
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

    if (this.platform.ANDROID || this.platform.IOS) {
      this.unlockOrientation();
    }
  }
}
