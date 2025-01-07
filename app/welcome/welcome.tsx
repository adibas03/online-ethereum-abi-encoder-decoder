import Sponsor from "app/root/sponsor";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[860px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <div className="text-center mt-3 leading-6 text-gray-700 dark:text-gray-200 ">
              <p className="text-lg mb-3">
                Welcome to the Online Ethereum Abi encoder and decoder
              </p>
              <p className="text-sm">
                The tool was designed to make easy encoding and decoding of
                Ethereum solidity abi data.
              </p>

              <p className="text-sm">
                <a
                  target="_blank"
                  className="text-blue-200"
                  href="https://github.com/adibas03/online-ethereum-abi-encoder-decoder"
                >
                  github.com/adibas03/online-ethereum-abi-encoder-decoder
                </a>
              </p>
              <div className="mt-12">
                <Sponsor />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
