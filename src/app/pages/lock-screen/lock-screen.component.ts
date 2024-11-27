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
    const el = this.document?.documentElement;

    if (el?.requestFullscreen) {
      el?.requestFullscreen();
      alert("Fullscreen");
    } else if (el?.mozRequestFullScreen) {
      /* Firefox */
      el?.mozRequestFullScreen();
      alert("Firefox");
    } else if (el?.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      el?.webkitRequestFullscreen();
      alert("Chrome, Safari and Opera");
    } else if (el?.msRequestFullscreen) {
      /* IE/Edge */
      el?.msRequestFullscreen();
      alert("IE/Edge");
    }

    if (this.platform.ANDROID || this.platform.IOS) {
      alert(
        `Lock screen - ANDROID:${this.platform.ANDROID} - IOS:${this.platform.IOS}`
      );
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
