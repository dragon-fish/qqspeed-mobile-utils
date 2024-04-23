import * as models from './models'
export { models }

export class QQSpeedM {
  static readonly models = models
  get models() {
    return QQSpeedM.models
  }

  createCar(attrs: Partial<models.QCarBase> & { name: string }) {
    return new this.models.QCar(attrs)
  }
}
