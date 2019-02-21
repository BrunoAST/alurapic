import { Component, Input } from '@angular/core';

import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert';

@Component({
  selector: 'ap-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {

  @Input() timeout = 3000;
  alerts: Array<Alert> = new Array<Alert>();

  constructor(private alertService: AlertService) {

    /**
     * Se inscreve em 'getAlert' para recuperar os alertas que foram emitidos,
     * cada alerta é inserido em um array, seus valores são exibidos de acordo com sua
     * ordem de entrada.
     * No template, a diretiva '*ngFor' controla a emissão dessas mensagens.
     * O tempo padrão de display das mensagens é de 3 segundos, a função 'setTimeOut'
     * faz o controle deste tempo, chamando a próxima mensagem apenas quando o tempo da
     * atual terminar.
     */
    this.alertService.getAlert()
        .subscribe(alert => {
          if (!alert) {
            this.alerts = [];
            return;
          }
          this.alerts.push(alert);
          setTimeout(() => this.removeAlert(alert), this.timeout);
        });
  }

  removeAlert(alertToRemove: Alert) {
    /**
     * Só permanecerá no array os alertas que forem diferentes de 'alertToRemove'.
     */
    this.alerts = this.alerts.filter(alert => alert !== alertToRemove);
  }

  getAlertClass(alert: Alert) {
    if (!alert) {
      return '';
    }

    switch (alert.alertType) {
      case AlertType.DANGER:
        return 'alert alert-danger';
      case AlertType.INFO:
        return 'alert alert-info';
      case AlertType.SUCCESS:
        return 'alert alert-success';
      case AlertType.WARNING:
        return 'alert alert-warning';
    }
  }
}
