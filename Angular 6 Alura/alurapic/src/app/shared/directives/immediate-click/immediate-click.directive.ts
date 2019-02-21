import { Directive, ElementRef, OnInit } from '@angular/core';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
  selector: '[apImmediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  constructor(private elementRef: ElementRef<any>, private platformDetector: PlatformDetectorService) { }

  ngOnInit() {
    /**
    * Usado para quando uma template necessite que algum elemento sofra um click de imediato.
    */
    if (this.platformDetector.isPlatformBrowser()) {
      this.elementRef.nativeElement.click();
    }
  }
}
