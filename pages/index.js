import { Search } from "@material-ui/icons";
import Head from "next/head";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getProviders, signIn, signOut } from "next-auth/react";

export default function Home({ providers }) {
  const { data: session } = useSession();

  return (
    <div className="">
      {session ? (
        <>
          <Head>
            <title>Taxi</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Wrapper>
            <Map />
            <ActionItems>
              <Header>
                <UberLogo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg" />
                <Profile>
                  <Name>{session?.user.name}</Name>
                  <UserImage
                    src={session?.user.image}
                    onClick={() => signOut()}
                  />
                </Profile>
              </Header>

              <ActionButtons>
                <Link href="search" passHref>
                  <ActionButton>
                    <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
                    Ride
                  </ActionButton>
                </Link>
                <Link href="order" passHref>
                  <ActionButton>
                    <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
                    My Orders
                  </ActionButton>
                </Link>
              </ActionButtons>

              <Link href="search" passHref>
                <InputButton>
                  Where to ?
                  <Search />
                </InputButton>
              </Link>
            </ActionItems>
          </Wrapper>
        </>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
          <div className="rounded-lg w-90 bg-white p-4">
            {/* eslint-disable-next-line */}
            <img
              src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg"
              alt="logo"
              className="w-60"
            />
            {Object.values(providers).map((provider) => (
              <>
                <button
                  className="flex gap-2 justify-center  w-full p-2 rounded-lg border hover:bg-gray-100"
                  onClick={() => signIn(provider.id)}
                >
                  Log in with {provider.name}
                  {/* eslint-disable-next-line */}
                  <img
                    src="https://freesvg.org/img/1534129544.png"
                    alt="google-logo"
                    className="w-7"
                  />
                </button>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

const Wrapper = tw.div`
  flex flex-col h-screen
`;

const ActionItems = tw.div`
 flex-1 p-4
`;

// bottom side of app

const Header = tw.div`
  flex items-center justify-between
`;

const UberLogo = tw.img`
 h-28
`;

const Profile = tw.div`
flex items-center cursor-pointer
`;

const Name = tw.div`
w-20 text-sm mr-3 text-right font-bold 
`;

const UserImage = tw.img`
w-20 h-20 rounded-full  border border-gray-200 p-px fit-contain
`;

const ActionButtons = tw.div`
flex gap-2
`;

const ActionButton = tw.div`

flex flex-col justfy-center items-center bg-gray-200 flex-1 text-center cursor-pointer h-32 hover:bg-gray-300 rounded-lg  transform hover:scale-105 transition  
`;

const ActionButtonImage = tw.img`
  h-3/5
`;

const InputButton = tw.div`
h-20 bg-gray-200 mt-8 rounded-lg text-2xl p-4 flex items-center cursor-pointer hover:bg-gray-300 justify-between
`;
