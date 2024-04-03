import { useState } from "react";
import ScreenRecorder from "../components/screen-recorder";
import { useSavePerfomanceMutation } from "../store/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

function ScreenRecordPage() {
  const navigate = useNavigate();
  const [save, { isError, isLoading }] = useSavePerfomanceMutation();
  const [title, setTitle] = useState<string>("");
  const [video, setVideo] = useState<Blob | null>(null);
  const disabled = !video || !title;

  function handleSave() {
    if (disabled) return alert("Please record a video and add a title");
    const formData = new FormData();
    formData.append("data", JSON.stringify({ title }));
    formData.append("video", video);
    save(formData)
      .unwrap()
      .then(() => {
        setTitle("");
        navigate("/");
      });
  }

  if (isError) {
    return <div>Error, please refresh the page</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-2xl font-medium">Screen record page</h1>
      <input
        className="border"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <ScreenRecorder onSave={setVideo} />
      <Button disabled={disabled} className="bg-green-500" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
export default ScreenRecordPage;
