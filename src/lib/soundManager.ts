import { SOUND_FILES } from '../data';
import type {SoundType} from '../types';

class MindWellSoundManager {
  private currentAudio: HTMLAudioElement | null = null;
  public isPlaying: boolean = false;
  public currentSoundType: SoundType | '' = '';
  public volume: number = 0.7;

  async playSound(soundType: SoundType): Promise<boolean> {
    this.stopSound();
    try {
      const audioFile = SOUND_FILES[soundType];
      if (!audioFile) return false;

      this.currentAudio = new Audio(audioFile);
      this.currentAudio.loop = true;
      this.currentAudio.volume = this.volume;

      await new Promise<void>((resolve, reject) => {
        this.currentAudio!.addEventListener('canplaythrough', () => resolve(), { once: true });
        this.currentAudio!.addEventListener('error', () => reject(new Error('Erro no áudio')), { once: true });
        this.currentAudio!.load();
      });

      await this.currentAudio.play();
      this.isPlaying = true;
      this.currentSoundType = soundType;
      return true;
    } catch {
      return false;
    }
  }

  stopSound(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    this.isPlaying = false;
    this.currentSoundType = '';
  }

  setVolume(volume: number): void {
    this.volume = volume;
    if (this.currentAudio) this.currentAudio.volume = volume;
  }
}

export default MindWellSoundManager;