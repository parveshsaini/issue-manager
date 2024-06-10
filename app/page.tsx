import Pagination from "@/components/Pagination";
import Image from "next/image";

export default function Home({searchParams}: {searchParams: {page: string}}) {
  return (
    <main className="">
      <Pagination itemsCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/>
      </main>
  );
}
