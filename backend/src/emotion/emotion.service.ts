import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execPromise = promisify(exec);

@Injectable()
export class EmotionService {
  async analyzeEmotion(imagePath: string): Promise<any> {
    try {
      const scriptPath = path.join(__dirname, '..', '..', 'analyze.py');
      const { stdout, stderr } = await execPromise(
        `python ${scriptPath} ${imagePath}`,
      );
      if (stderr) {
        console.error('Python script stderr:', stderr);
        throw new Error(stderr);
      }
      return JSON.parse(stdout);
    } catch (error) {
      console.error('Error executing Python script:', error);
      throw new Error('Failed to analyze emotion');
    }
  }
}
