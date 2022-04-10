import { Animation } from '../graphics/Animation';
import { Texture } from '../graphics/Texture';
import { Sound } from '../Sound';

export interface AnimationOptions {
  clips: string[];
  spead: number;
  repeat?: boolean;
}

export class ResourceManager {
  private static cashedImages: Map<string, Promise<Texture>> = new Map();
  private static cashedData: Map<string, Promise<any>> = new Map();
  private static cashedAudio: Map<string, Promise<Sound>> = new Map();

  static async loadTexture(url: string): Promise<Texture> {
    if(ResourceManager.cashedImages.has(url)) {
      return ResourceManager.cashedImages.get(url);
    }

    const loadingPromise = new Promise<Texture>((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(new Texture(image));
      image.onerror = () => reject(new Error(`Fail on load image (${url})`));
    });

    this.cashedImages.set(url, loadingPromise);
    return loadingPromise;
  }

  static async loadAnimation({ clips, spead, repeat = true}: AnimationOptions): Promise<Animation> {
    const textures = await Promise.all(
      clips.map(url => ResourceManager.loadTexture(url))
    );

    return new Animation(textures, spead, repeat);
  }

  static async loadJSON<T>(url: string): Promise<T> {
    if(ResourceManager.cashedData.has(url)) {
      return ResourceManager.cashedData.get(url) as Promise<T>;
    }

    const loadingPromise = new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = () => {
        const status = xhr.status;
        if (status === 200) {
          resolve(xhr.response as T);
        } else {
          reject(new Error(`Error during loading file '${url}', statis: ${xhr.statusText}`));
        }
      };
      xhr.send();
    });

    this.cashedData.set(url, loadingPromise);
    return loadingPromise;
  }

  static async loadSound(url: string, loop: boolean = false): Promise<Sound> {
    if(ResourceManager.cashedAudio.has(url)) {
      return ResourceManager.cashedAudio.get(url);
    }

    const loadingPromise = new Promise<Sound>((resolve, reject) => {
      const audio = new Audio(url);
      audio.loop = loop;
      audio.addEventListener('loadeddata', () => resolve(new Sound(audio)));
      audio.onerror = () => reject(new Error(audio.error.message));
    });

    this.cashedAudio.set(url, loadingPromise);
    return loadingPromise;
  }
}
