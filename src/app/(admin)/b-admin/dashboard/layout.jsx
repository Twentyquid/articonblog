export default async function Layout({ children }) {
  return (
    <>
      <div className="flex h-full w-full bg-red-200">
        {/* left pane */}
        <div className="basis-[20%] border-r border-black">
          <div className="flex flex-col">
            <div>
              <p className="text-2xl font-bold">Articon</p>
            </div>
            <p>Dashboard</p>
            <p>View Site</p>
            <div>
              <p>Posts</p>
            </div>
          </div>
        </div>
        {/* right pane */}
        <div className="px-8 py-6 basis-full">{children}</div>
      </div>
    </>
  );
}
