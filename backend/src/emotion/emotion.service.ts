import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class EmotionService {
  async analyzeEmotion(imagePath: string): Promise<any> {
    const { stdout, stderr } = await execPromise(`python analyze.py ${imagePath}`);
    if (stderr) {
      throw new Error(stderr);
    }
    return JSON.parse(stdout);
  }
}
