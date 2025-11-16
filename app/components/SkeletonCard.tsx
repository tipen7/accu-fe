export const SkeletonCard = () => {
  return (
    <div className="rounded-xl bg-[#AA14F0] flex flex-col p-4 lg:w-[300px] md:w-[200px] w-[100px] items-center justify-center text-white animate-pulse">
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
      <div className="flex space-x-2">
        <div className="h-8 bg-gray-300 rounded w-16"></div>
        <div className="h-8 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );
};
