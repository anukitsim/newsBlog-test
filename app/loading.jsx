import Image from "next/image";

export default function Loading() {
  return (
    <main className="flex justify-center items-center">
      <Image src='/loader.svg' alt="loader" width={150} height={100} />
    </main>
  );
}
