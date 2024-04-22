import * as models from './models'
export { models }

export class QQSpeedM {
  static readonly models = models

  createCar(attrs: Partial<models.QCarBase> & { name: string }) {
    return new QQSpeedM.models.QCar(attrs)
  }
}
