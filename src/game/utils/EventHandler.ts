type Callback<T extends any[] = any[]> = (...T) => void;
type UnsubscribeCallback = () => void;

export class EventHandler<T extends any[] = any[]> {
  /**
   * @type {Function}
   */
  static NO_ACTION = () => {};

  private callbacks: Callback<T>[];

  constructor() {
    this.callbacks = [];
  }

  /**
   * Add event subscription
   * @param {Callback} fn - subscribtion function
   * @returns {UnsubscribeCallback} unsubscribe function
   */
   public on(fn: Callback<T> = EventHandler.NO_ACTION): UnsubscribeCallback {
    this.callbacks.push(fn);

    return () => this.off(fn);
  }


  /**
   * Remove event subscription
   * @param {Callback} fn - subscribtion function
   * @returns {UnsubscribeCallback} unsubscribe function
   */
   public off(fn: Callback<T> = EventHandler.NO_ACTION): void {
    const index = this.callbacks.findIndex(fn);
    if (index) {
      this.callbacks.splice(index, 1);
    }
  }

  /**
   * Emit event
   * @param  {...any} data - list of event params
   */
  public emit(...data: T): void {
    this.callbacks.forEach(callback => callback(...data));
  }

  /**
   * Unsubscribe from all subscriptions
   */
  public removeAll(): void {
    this.callbacks = [];
  }
}
