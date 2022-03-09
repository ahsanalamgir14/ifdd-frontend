import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { OrgsSdg } from '../orgs-sdg';
import { Target } from '../target';
import { TargetService } from '../target.service';

@Component({
  selector: 'app-org-sdg',
  templateUrl: './org-sdg.component.html',
  styleUrls: ['./org-sdg.component.scss']
})
export class OrgSdgComponent {
  private _mobileQueryListener: () => void;
  @Input() orgSdg!: OrgsSdg;
  @Input() selected = false;
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
  }

  getTargets(): void {
    this.loading = true;
    this.targetService.getTargetsForSdg(this.orgSdg.sdg.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(targets => {
        this.targets = targets;
        this.initializeForm();
      });
  }

  getCdkConnectedOverlayPanelClasses(): string[] {
    if (this.mobileQuery.matches) {
      return ['fixed', '!top-0', '!bottom-0', '!left-0', '!right-0'];
    }

    return ['max-h-72', '-translate-y-8'];
  }

  getSelectPlaceholder(): string {
    const targets = this.form.get('targets');
    if (targets && targets.value && targets.value.length !== this.targets.length) {
      const selectedTexts: string[] = [];
      targets.value.forEach((id: string) => {
        selectedTexts.push(this.i18n.instant('text.target', {target: id}));
      });

      return selectedTexts.join(', ');
    }

    return this.i18n.instant('text.all_goal_targets', {number: this.orgSdg.sdg.id});
  }

  allSelected(): boolean {
    return this.form.get('targets')?.value.length === this.targets.length;
  }

  initializeForm(): void {
    const checkboxArray: FormArray = this.form.get('targets') as FormArray;
    this.targets.forEach((target: Target) => {
      checkboxArray.push(new FormControl(target.id));
    })
  }

  onCheckboxChange(event: any): void {
    const checkboxArray: FormArray = this.form.get('targets') as FormArray;
    if (event.target && event.target.checked) {
      checkboxArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkboxArray.controls.forEach((item: AbstractControl) => {
        if (item.value === event.target.value) {
          checkboxArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
}
