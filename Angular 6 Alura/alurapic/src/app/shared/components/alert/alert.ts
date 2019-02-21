export enum AlertType {
  SUCCESS,
  WARNING,
  DANGER,
  INFO
}

export class Alert {

  constructor(public readonly alertType: AlertType, public readonly message: string) { }

}
