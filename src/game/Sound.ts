export class Sound {
  audio: HTMLAudioElement;

  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
    this.audio.currentTime = 0;
  }

  play(): void {
    this.audio.play();
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.pause();
    this.audio.currentTime = 0;
  }
}