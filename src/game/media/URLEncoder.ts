export class URLEncoder {
  static imageToLink(encodedFile: string): string {
    return `data:image/png;base64,${encodedFile}`;
  }
}
