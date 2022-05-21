// const axios = require('axios').default;

export class DashboardService {
  // // https://shot.screenshotapi.net/screenshot?&url=https%3A%2F%2Fyoutube.com&output=image&file_type=png&wait_for_event=load
  // // https://shot.screenshotapi.net/screenshot?&url=https%3A%2F%2Fgoogle.com&full_page=true&output=image&file_type=png&wait_for_event=load
  // constructor() {
  //   axios
  //     .get(
  //       'https://shot.screenshotapi.net/screenshot?&url=https%3A%2F%2Fgoogle.com&full_page=true&output=image&file_type=png&wait_for_event=load',
  //     )
  //     .then((response: any) => {
  //       console.log(response);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }

  onWidgetClick(url: string): void {
    console.log(`redirect to: ${url}`);
    window.location.href = url;
  }
}
