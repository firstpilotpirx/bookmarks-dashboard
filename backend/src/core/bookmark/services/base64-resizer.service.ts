export interface Base64ResizerService {
  resize(base64Image: string): Promise<string>;
}
