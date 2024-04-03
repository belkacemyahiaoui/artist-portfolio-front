import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useGetPerfomancesQuery } from "../store/api";

function Home() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetPerfomancesQuery(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {JSON.stringify(error)}</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Home</h1>
      <div className="flex flex-row gap-4 justify-center">
        <Button onClick={() => navigate("/screen-recorder")}>
          Record webcam
        </Button>
        <Button onClick={() => navigate("/webcam-recorder")}>
          Record screen
        </Button>
      </div>
      <div>
        {data?.map((video) => (
          <div
            key={video.id}
            className="flex flex-row gap-2 border w-[800px] border-gray-200 p-2"
          >
            <video
              src={video.url}
              style={{ width: "300px", height: "auto" }}
              controls
            ></video>
            <div className="flex flex-col gap-4 text-left">
              <div>Title: {video.title}</div>
              <div>Duration: {video.duration}</div>
              <div>
                Creation date: {new Date(video.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      .
    </div>
  );
}

export default Home;
