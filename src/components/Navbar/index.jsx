import Link from "next/link";

function Navbar() {
  return (
    <>
      <main className="h-1/6 w-full flex flex-row">
        <div className="h-full w-1/2 bg-red-800 flex items-center">
          <h1 className="text-5xl p-10">ARTICON</h1>
        </div>
        <div className="h-full w-1/2 flex flex-row">
          <nav className="h-full w-full flex items-center">
            <ul className="w-full flex flex-row justify-around">
              <li>
                <Link href="">Placeholder</Link>
              </li>
              <li>
                <Link href="">Placeholder</Link>
              </li>
              <li>
                <Link href="">Placeholder</Link>
              </li>
              <li>
                <Link href="">Placeholder</Link>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}

export default Navbar;
