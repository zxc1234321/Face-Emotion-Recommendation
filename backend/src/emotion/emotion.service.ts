import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class EmotionService {
  async analyzeEmotion(image: any): Promise<any> {
    const scriptPath = path.resolve(__dirname, '../../analyze.py');
    console.log('Script Path:', scriptPath); // 경로 출력

    return new Promise((resolve, reject) => {
      const process = spawn('python3', [scriptPath, image]);

      let stdoutData = '';
      let stderrData = '';

      process.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });

      process.stderr.on('data', (data) => {
        stderrData += data.toString();
      });

      process.on('error', (error) => {
        reject(`error: ${error.message}`);
      });

      process.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Command failed with exit code ${code}\n${stderrData}`));
          return;
        }

        try {
          const result = JSON.parse(stdoutData);
          console.log('Analysis Result:', result); // 결과 로그 출력
          if (result.error) {
            reject(result.error);
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(`Failed to parse JSON: ${stdoutData}`);
        }
      });
    });
  }
}
