import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

  @Input() brightness = '70%';

  constructor(private element: ElementRef, private render: Renderer) {}

  /**
   * @setElementStyle
   * @param1 : recebe o elemento do HTML que irá receber os estilos.
   * @param2 : nome da classe CSS que será aplicada.
   * @param3 : valor que será definido para a classe CSS.
   */
  @HostListener('mouseover')
  darkenOn() {
    this.render.setElementStyle(this.element.nativeElement, 'filter', `brightness(${this.brightness})`);
  }

  @HostListener('mouseleave')
  darkenOff() {
    this.render.setElementStyle(this.element.nativeElement, 'filter', 'brightness(100%)');
  }
}
