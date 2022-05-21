import React from 'react';
import styled from 'styled-components';
import { Widget } from '../Widget/Widget';

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export interface DashboardProps {
  urlList: string[];
  // eslint-disable-next-line no-unused-vars
  onWidgetClick: (url: string) => void;
}

export function Dashboard({ urlList, onWidgetClick }: DashboardProps) {
  let video!: any;
  let canvas!: any;
  let img!: any;

  function startCapture() {
    try {
      // @ts-ignore
      navigator.mediaDevices
        .getDisplayMedia()
        .then((value) => {
          setTimeout(() => {
            console.log('start capturing !!!');
            // @ts-ignore
            video.srcObject = value;
          }, 3000);

          setTimeout(() => {
            alert('img !!!');
            // take pic
            console.log(600, 800);
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL();
            img.src = dataURL;
            console.log(dataURL);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  return (
    <div>
      <div>video</div>
      <video
        id="video"
        ref={(ref) => {
          video = ref;
        }}
        autoPlay
      />
      <div>canvas</div>
      <canvas
        id="canvas"
        ref={(ref) => {
          canvas = ref;
        }}
      />
      <div>img</div>
      <img
        id="img"
        alt=""
        ref={(ref) => {
          img = ref;
        }}
      />
      <button type="button" onClick={startCapture}>
        capture
      </button>
      <DashboardContainer>
        {urlList.map((url) => (
          <Widget url={url} onClick={onWidgetClick} />
        ))}
      </DashboardContainer>
    </div>
  );
}
