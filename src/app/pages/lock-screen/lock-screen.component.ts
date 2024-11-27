import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Component, OnDestroy, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import screenfull from "screenfull";

@Component({
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
  private platform = inject(Platform);
  private document: any = inject(DOCUMENT);

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

  // private openFullscreen() {
  //   const el = this.document?.documentElement;

  //   if (el?.requestFullscreen) {
  //     el?.requestFullscreen();
  //   } else if (el?.mozRequestFullScreen) {
  //     /* Firefox */
  //     el?.mozRequestFullScreen();
  //   } else if (el?.webkitRequestFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     el?.webkitRequestFullscreen();
  //   } else if (el?.msRequestFullscreen) {
  //     /* IE/Edge */
  //     el?.msRequestFullscreen();
  //   }

  //   if (this.platform.ANDROID || this.platform.IOS) {
  //     this.lockOrientation();
  //   }
  // }
  // /* Close fullscreen */
  // private closeFullscreen() {
  //   if (this.document?.exitFullscreen) {
  //     this.document?.exitFullscreen();
  //   } else if (this.document?.mozCancelFullScreen) {
  //     /* Firefox */
  //     this.document?.mozCancelFullScreen();
  //   } else if (this.document?.webkitExitFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     this.document?.webkitExitFullscreen();
  //   } else if (this.document?.msExitFullscreen) {
  //     /* IE/Edge */
  //     this.document?.msExitFullscreen();
  //   }

  //   if (this.platform.ANDROID || this.platform.IOS) {
  //     this.unlockOrientation();
  //   }
  // }
}
