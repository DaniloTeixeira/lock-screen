import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
// import { auditTime, distinctUntilChanged, fromEvent, map } from "rxjs";
import { Platform } from "@angular/cdk/platform";

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
  private platform = inject(Platform);

  constructor() {
    if (this.platform.ANDROID || this.platform.IOS) {
      (screen.orientation as any)?.lock("landscape");
    }

    // fromEvent(window, "resize")
    //   .pipe(
    //     map((event) => (event.target as Window).innerWidth),
    //     distinctUntilChanged(),
    //     auditTime(500)
    //   )
    //   .subscribe((value: number) => {
    //     console.log("Size:", value);
    //   });
  }

  onOrientationChange(event: any) {
    console.log(event, this.platform.IOS, this.platform.ANDROID);
  }
}
