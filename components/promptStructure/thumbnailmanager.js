export default function ThumbnailManager({ preview, type }) {
  return (
    <div>
      {/* img other */}
      {type === "image/jpeg" ||
      type === "image/svg+xml" ||
      type === "image/png" ||
      type === "image/bmp" ||
      type === "image/webp" ? (
        <img className="min-w-[30vh]"src={preview}></img>
      ) : (
        <iframe
          className="w-full min-h-[60vh]"
          src={preview}
          frameborder="0"
         
        ></iframe>
      )}
    </div>
  );
}
