import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { OrgsSdg } from '../orgs-sdg';
import { Target } from '../target';
import { TargetService } from '../target.service';

@Component({
  selector: 'app-org-sdg',
  templateUrl: './org-sdg.component.html'
})
export class OrgSdgComponent {
  private _mobileQueryListener: () => void;
  @Input() orgSdg!: OrgsSdg;
  @Input() selected = false;
  @Input() lite: boolean = false;
  @Output() targetsSelection: EventEmitter<Target[]> = new EventEmitter();
  mobileQuery: MediaQueryList;
  form: FormGroup;
  showTargets: boolean = false;
  targets: Target[] = [];
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: TranslateService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private targetService: TargetService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.form = this.formBuilder.group({
      targets: this.formBuilder.array([])
    });
  }

  toggleTargets(): void {
    this.showTargets = !this.showTargets;

    if (this.showTargets && !this.targets.length) {
      this.getTargets();
    }

    if (!this.showTargets) {
      this.targetsSelection.emit(this.getSelectedTargets())
    }
  }

  getTargets(): void {
    this.loading = true;
    this.targetService.getTargetsForSdg(this.orgSdg.sdg.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: targets => {
          this.targets = targets;
          this.initializeForm();
        }
      });
  }

  getCdkConnectedOverlayPanelClasses(): string[] {
    if (this.mobileQuery.matches) {
      return ['fixed', '!top-0', '!bottom-0', '!left-0', '!right-0'];
    }

    return ['max-h-72', '-translate-y-8'];
  }

  getSelectedTargets(): Target[] {
    const selectedTargets: Target[] = [];

    const targetsFormControl = this.form.get('targets') as FormArray;
    targetsFormControl.controls.forEach((control: AbstractControl, index: number) => {
      if (control.value) {
        selectedTargets.push(this.targets[index]);
      }
    });

    return selectedTargets;
  }

  getSelectPlaceholder(): string {
    const targets = this.form.get('targets');
    if (!this.allSelected()) {
      const selectedTargets: Target[] = this.getSelectedTargets();
      const selectedTexts: string[] = [];
      selectedTargets.forEach((target: Target) => {
        selectedTexts.push(this.i18n.instant('text.target', {target: target.id}));
      });

      return selectedTexts.join(', ');
    }

    return this.i18n.instant('text.all_goal_targets', {number: this.orgSdg.sdg.id});
  }

  allSelected(): boolean {
    return this.form.get('targets')?.value.every((value: boolean) => value);
  }

  initializeForm(): void {
    const checkboxArray: FormArray = this.form.get('targets') as FormArray;
    this.targets.forEach((target: Target) => {
      checkboxArray.push(new FormControl(true));
    })
  }

  onSelectAll(event: any): void {
    const targetsFormControl = this.form.get('targets') as FormArray;
    const value = event.target?.checked || false;

    targetsFormControl.controls.forEach((control: AbstractControl) => {
      control.setValue(value);
    });
  }

  onCheckboxChange(event: any, position: number): void {
    const targetsFormControl = this.form.get('targets') as FormArray;
    targetsFormControl.controls.forEach((control: AbstractControl, index: number) => {
      if (position === index) {
        control.setValue(control.value);
      }
    });
  }

  onOverlayKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.toggleTargets();
    }
  }
}
