import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";
import ActiveLink from "@components/ui/common/link";
import { useRouter } from "next/router";
import { useAccount } from "@components/hooks/web3";

export default function Navbar() {
  const { pathname } = useRouter();
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account: AccountData } = useAccount();
  const { data: account, isAdmin } = AccountData;

  const onClickButton = () => {
    if (!requireInstall) {
      !account && connect();
    } else {
      window.open("https://metamask.io/download", "_blank");
    }
  };

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <div>
              <ActiveLink href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>
              <ActiveLink href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </ActiveLink>
              <ActiveLink href="/blogs">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </ActiveLink>
            </div>
            <div className="text-center">
              <ActiveLink href="/wishlist">
                <a className="font-medium sm:mr-8 mr-2 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </ActiveLink>
              {isLoading ? (
                <Button disabled={true}>Loading...</Button>
              ) : (
                <Button
                  onClick={onClickButton}
                  hoverable={!account}
                  className={account && "cursor-default"}
                >
                  {!requireInstall
                    ? account
                      ? `Hi there ${isAdmin ? "Admin" : ""}`
                      : "Connect"
                    : "Install Metamask"}
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account}
          </div>
        </div>
      )}
    </section>
  );
}
