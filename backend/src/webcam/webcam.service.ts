import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { SpotifyService } from '../spotify/spotify.service';

@Injectable()
export class WebcamService {
  constructor(private readonly spotifyService: SpotifyService) {}

  async analyzeImage(image: Express.Multer.File, accessToken: string): Promise<any> {
    const imagePath = path.join(__dirname, '..', '..', 'uploaded_image.jpg');
    fs.writeFileSync(imagePath, image.buffer);

    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [path.join(__dirname, '..', '..', 'analyze.py'), imagePath], {
        env: {
          ...process.env,
          PATH: `${process.env.PATH}:${path.join(__dirname, '..', '..', 'venv', 'bin')}`,  // 가상환경의 PATH 추가
        },
      });

      let result = '';
      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        reject(data.toString());
      });

      pythonProcess.on('close', async (code) => {
        if (code !== 0) {
          reject(`Python script exited with code ${code}`);
        } else {
          try {
            const analysis = JSON.parse(result);
            if (analysis.emotion) {
              const tracks = await this.spotifyService.searchTracksByEmotion(analysis.emotion, accessToken);
              resolve(tracks);
            } else {
              reject('Emotion analysis failed');
            }
          } catch (e) {
            reject(`Failed to parse JSON: ${e.message}`);
          }
        }
      });
    });
  }
}