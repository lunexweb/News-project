import Image from "next/image";

export default function PhotoGallery({
  items,
}: {
  items: { id: string; title: string; src: string }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((img) => (
        <figure key={img.id} className="relative h-36 md:h-44 rounded-xl overflow-hidden bg-white border border-black/10 shadow-sm">
          <Image src={img.src} alt={img.title} fill className="object-cover" />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-2 py-1 line-clamp-1">
            {img.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
