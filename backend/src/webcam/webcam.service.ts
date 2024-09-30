import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class WebcamService {
  async captureImage(): Promise<string> {
    const imagePath = 'path/to/captured/image.jpg';
    await execPromise(`webcam-capture-command --output ${imagePath}`);
    return imagePath;
  }
}
