import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WebcamService {
  async analyzeImage(image: Express.Multer.File): Promise<any> {
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

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(`Python script exited with code ${code}`);
        } else {
          resolve(JSON.parse(result));
        }
      });
    });
  }
}
