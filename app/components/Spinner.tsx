export default function Spinner() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#141313] bg-opacity-20 backdrop-blur-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
}
