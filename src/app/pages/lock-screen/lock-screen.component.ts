import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
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
export class LockScreenComponent {
  private elem: any;
  private platform = inject(Platform);

  constructor(@Inject(DOCUMENT) private document: any) {}
  ngOnInit(): void {
    this.elem = this.document.documentElement;
    this.openFullscreen();
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }

    if (this.platform.ANDROID || this.platform.IOS) {
      (window.screen.orientation as any)?.lock("landscape");
    }
  }
}
