// src/pages/admin/portofolio/components/ImageReorder.tsx

type ImageItem = {
  id: number;
  image: string;
  order: number;
};

type Props = {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
};

export default function ImageReorder({ images, onChange }: Props) {
  const move = (from: number, to: number) => {
    const arr = [...images];
    const item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);

    onChange(
      arr.map((img, i) => ({
        ...img,
        order: i,
      }))
    );
  };

  return (
    <div className="space-y-2">
      {images.map((img, i) => (
        <div
          key={img.id}
          className="flex items-center gap-3 bg-zinc-900 p-2 rounded"
        >
          <img src={img.image} className="h-16 w-20 object-cover rounded" />

          <div className="ml-auto flex gap-2">
            <button
              disabled={i === 0}
              onClick={() => move(i, i - 1)}
              className="px-2 py-1 bg-zinc-700 rounded disabled:opacity-30"
            >
              ↑
            </button>
            <button
              disabled={i === images.length - 1}
              onClick={() => move(i, i + 1)}
              className="px-2 py-1 bg-zinc-700 rounded disabled:opacity-30"
            >
              ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
