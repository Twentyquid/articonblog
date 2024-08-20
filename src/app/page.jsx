import Navbar from "@/components/Navbar";

function HomePage() {
  return (
    <>
      <main className="bg-slate-400 h-screen w-full">
        <Navbar />
        <div className="h-1/3 w-full  flex items-center">
          <h1 className="text-9xl p-20">ARTICON</h1>
        </div>
      </main>
    </>
  );
}

export default HomePage;
