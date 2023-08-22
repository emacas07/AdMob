import { FullScreenAdEvent, FullScreenAdHandlerType, FullScreenAdOptions, RequestOptions } from '../../types';

import FullScreenAd from './FullScreenAd';

let _interstitialRequest = 0;

export default class InterstitialAd extends FullScreenAd {
  private constructor(
    requestId: number,
    unitId: string,
    options?: FullScreenAdOptions
  ) {
    super('Interstitial', requestId, unitId, options);
  }
  private static sharedInstance: InterstitialAd | null = null;

  private static checkInstance() {
    if (!this.sharedInstance) {
      throw new Error('Interstitial is not created.');
    }
  }
  /**
   * Creates a new RewardedAd instance.
   * @param unitId The Ad Unit ID for the Rewarded Ad. You can find this on your Google AdMob dashboard.
   * @param options Optional FullScreenAdOptions for this ad.
   */
  static createAd(unitId: string, options?: FullScreenAdOptions) {
    const _options = { ...options };
    this.sharedInstance?.destroy();
    const requestId = _interstitialRequest++;
    this.sharedInstance = new InterstitialAd(requestId, unitId, _options);
    return this.sharedInstance;
  }
  /**
   * Returns loaded App Open Ad instance.
   */
  static getAd() {
    return this.sharedInstance;
  }

  /**
   * Loads a new App Open ad.
   * @param requestOptions Optional RequestOptions used to load the ad.
   */
  static load(requestOptions?: RequestOptions) {
    this.checkInstance();
    return this.sharedInstance!.load(requestOptions);
  }

  /**
   * Shows loaded App Open Ad.
   */
  static show() {
    this.checkInstance();
    return this.sharedInstance!.show();
  }

  /**
   * Destroys the App Open Ad.
   */
  static destroy() {
    this.checkInstance();
    this.sharedInstance!.destroy();
    this.sharedInstance = null;
  }



  /**
   * Adds an event handler for an ad event.
   * @param event Event name
   * @param handler Event handler
   */
  static addEventListener(
    event: FullScreenAdEvent,
    handler: FullScreenAdHandlerType
  ) {
    this.checkInstance();
    console.log('FullScreenAdEvent FullScreenAdEvent ');
    
    return this.sharedInstance!.addEventListener(event, handler);
  }

  /**
   * Removes all registered event handlers for this ad.
   */
  static removeAllListeners() {
    this.checkInstance();
    return this.sharedInstance!.removeAllListeners();
  }
}
