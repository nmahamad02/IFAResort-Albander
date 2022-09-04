import { Component, OnInit, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutsService } from '../../layouts/layouts.service';
import { ColorPalettesService } from '../../color-palettes/color-palettes.service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent implements OnInit {
  @HostBinding('class.actions-on-top') topActions = true;
  @HostBinding('class.actions-on-bottom') bottomActions = true;

  settingsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sideMenusService: SideMenusService,
    private layoutsService: LayoutsService,
    private colorPalettesService: ColorPalettesService
  ) {
    this.settingsForm = this.formBuilder.group({
      layout: new FormControl(this.layoutsService.currentLayout.name),
      colorPalette: new FormControl(this.colorPalettesService.currentPalette.name)
    });
  }

  ngOnInit() {
  }

  closeAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('close');
  }

  previewSettings(): void {
    const selectedLayout = this.settingsForm.get('layout').value;
    const selectedPalette = this.settingsForm.get('colorPalette').value;

    this.layoutsService.switchLayout(selectedLayout);
    // this.layoutsService.switchLayoutSubject.next(selectedLayout);
    this.colorPalettesService.setPalette(selectedPalette);

    this.closeAltMenu();
  }
}
