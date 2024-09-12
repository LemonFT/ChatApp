import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="w-full h-full min-w-[100vw]  min-h-screen flex flex-col items-center justify-center gap-[5px] bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 text-font-primary">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-[50px]">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <span className="flex justify-center items-center gap-[5px] w-[200px] h-[40px] px-[10px] py-[5px] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          <span><svg className='text-[20px] text-white' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linejoin="round" stroke-width="32" d="M240 424v-96c116.4 0 159.39 33.76 208 96 0-119.23-39.57-240-208-240V88L64 256z"></path></svg></span>
          <span className='text-[17px] leading-[20px] font-bold'>Back</span>
        </span>
      </Link>
    </div>
  );
};

export default Custom404;
