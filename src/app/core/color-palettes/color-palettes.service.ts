import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { defaultPalette, IPalette, availablePalettes } from 'src/app/app-color-palettes';

@Injectable({
  providedIn: 'root'
})
export class ColorPalettesService {
  currentPalette: IPalette = defaultPalette;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  init(): void {
    this.setPalette(defaultPalette.name);
  }

  setPalette(paletteName: string): void {
    // Set default theme
    const selectedPalette: IPalette = availablePalettes.find((palette: IPalette) => {
      return palette.name === paletteName;
    });

    if (selectedPalette) {
      const rootElement = this.document.documentElement;

      if (rootElement) {
        rootElement.setAttribute('color-palette', selectedPalette.name);
      }

      this.currentPalette = selectedPalette;
    }
  }
}
