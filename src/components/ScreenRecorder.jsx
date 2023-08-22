import  { useState } from 'react';
import  VideoRecordSvg  from "/video.svg"
import VideoStopSvg from "/RecordStop.svg"
import Timer from './Timer';
function ScreenRecorder() {
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const recorder = new MediaRecorder(stream);

    setMediaStream(stream);
    setMediaRecorder(recorder);

    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'chatBubble-recording.webm';
      a.click();
      URL.revokeObjectURL(url);
      setMediaStream(null);
    };

    recorder.start();
    setRecording(true);
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaStream.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  }

  return (
    <div className="text-black bg-white rounded-md absolute right-5 top-5 cursor-pointer">
      {
        recording ? (
            <div onClick={stopRecording} className="flex p-2 gap-1.5">
              <button>Stop Recording</button>
              <img src={VideoStopSvg} alt="stop" className="w-[23px]"/>
              <Timer />
            </div>
          ) : (
            <div onClick={startRecording} className="flex p-2 gap-1.5">
              <button>Start Recording</button>
              <img src={VideoRecordSvg} alt="record" className="w-[23px]" />
            </div>
          )
      }

    </div>
  );
}

export default ScreenRecorder;
