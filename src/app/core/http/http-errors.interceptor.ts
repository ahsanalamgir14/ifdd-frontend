import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'src/app/shared/messages/message.service';
import { Message } from 'src/app/shared/messages/message';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.messageService.addMessage(
            'error',
            'Erreur Serveur',
            'Une erreur est survenue lors du traitement de votre requête. Veuillez réessayer.'
          );
        }

        if (error.status === 404) {
          this.messageService.addMessage(
            'error',
            'Ressource Introuvable',
            'La ressource que vous avez demandée est introuvable.'
          );
        }

        if (error.status === 400) {
          this.messageService.addMessage(
            'error',
            'Erreur de validation',
            'Votre requête est invalide. Veuillez vérifier et réessayer.'
          );
        }

        if (error.status === 0) {
          this.messageService.addMessage(
            'error',
            'Pas de connexion',
            'Impossible de contacter le serveur. Veuillez vérifier votre connexion internet et réessayer.'
          );
        }

        return throwError(() => error);
      })
    );
  }
}
