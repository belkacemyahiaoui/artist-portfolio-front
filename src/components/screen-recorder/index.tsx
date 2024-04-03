import { useRef, useState } from "react";
import Button from "../button";
import Timer from "../timer";

type ScreenRecorderProps = {
  onSave: any;
};

function ScreenRecorder({ onSave }: ScreenRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [_, setWebcamStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<null | HTMLVideoElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      const recorder = new MediaRecorder(stream);
      setWebcamStream(stream);
      setMediaRecorder(recorder);

      let chunks: BlobPart[] = [];
      recorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      recorder.onstop = function (e) {
        const blob = new Blob(chunks, {
          type: "video/x-matroska;codecs=avc1,opus",
        });
        chunks = [];
        const videoURL = URL.createObjectURL(blob);
        setVideoUrl(videoURL);
        onSave(blob);
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setWebcamStream(null);
    }
  };

  return (
    <div>
      <h1>Video Recorder</h1>
      <div className="flex flex-col items-center justify-center">
        <video
          style={{ width: "300px", height: "auto" }}
          autoPlay
          playsInline
          muted
          ref={videoRef}
        ></video>

        <Timer recording={recording} />
        {videoUrl && (
          <video
            style={{ width: "300px", height: "auto" }}
            src={videoUrl}
            controls
          ></video>
        )}
      </div>
      {!recording ? (
        <Button className="bg-black" onClick={startRecording}>
          Start Recording
        </Button>
      ) : (
        <Button className="bg-red-500" onClick={stopRecording}>
          Stop Recording
        </Button>
      )}
    </div>
  );
}

export default ScreenRecorder;
