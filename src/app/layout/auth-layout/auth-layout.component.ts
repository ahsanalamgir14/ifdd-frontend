import { Component } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { TermsComponent } from 'src/app/shared/terms/terms.component';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  constructor(private dialogService: DialogService) {}

  showTerms(): void {
    this.dialogService.open(TermsComponent);
  }
}
