export interface Base64ResizerService {
  resize(base64Image: string, newWidth: number, newHeight: number): Promise<string>;
}
