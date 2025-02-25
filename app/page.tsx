import Image from "next/image";
import Example from "~/components/Example";
import bgImage from "~/public/bg.jpg";
export default function Home() {
  return (
    <>


    <div className="absolute inset-0 w-full h-full">
      <Image
        src={bgImage}
        alt="Background"
        quality={100}
        fill
        className='object-cover object-center'
      />
    </div>

    <Example />
  </>
  );
}
