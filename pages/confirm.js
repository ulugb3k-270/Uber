import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import RideSelector from "./components/RideSelector";



function Confirm() {
    const [pickupCoordinates, setPickupCoordinates] = useState("");
    const [dropoffCoordinates, setDropoffCoordinates] = useState("");
    const router = useRouter()

    const { from, to } = router.query

    const getPickupCoordinates = () => {
        const pickup = from;

        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
                access_token:
                    "pk.eyJ1IjoidWx1YmdrM2syNzAiLCJhIjoiY2t5d2xkNDNzMDlnYjJvbXhnODYyY3FmZyJ9.YHE5j4Z7Z9QCfCSukMujng",
                limit: 1,
            })
        )
            .then((res) => res.json())
            .then((data) => setPickupCoordinates(data.features[0].center));
    };

    const getDropoffCoordinates = () => {
        const dropoff = to;

        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
            new URLSearchParams({
                access_token:
                    "pk.eyJ1IjoidWx1YmdrM2syNzAiLCJhIjoiY2t5d2xkNDNzMDlnYjJvbXhnODYyY3FmZyJ9.YHE5j4Z7Z9QCfCSukMujng",
                limit: 1,
            })
        )
            .then((res) => res.json())
            .then((data) => setDropoffCoordinates(data.features[0].center));
    };

    useEffect(() => {
        getPickupCoordinates();
        getDropoffCoordinates();
        // eslint-disable-next-line
    }, []);

    return (
        <Wrapper>
            <Map pickup={pickupCoordinates} dropoff={dropoffCoordinates} />
            <RideContainer>
                <RideSelector />
                <BottomContainer>
                    <Link href="/search" passHref>
                        <ConfirmButton>
                        Select Another Place
                    </ConfirmButton>
                    </Link>
                </BottomContainer>
            </RideContainer>
        </Wrapper>

    );
}

const Wrapper = tw.div`
flex flex-col h-screen
`;
const RideContainer = tw.div`
flex flex-col  flex-1 
`;

const BottomContainer = tw.div`
border-t-2
`;

const ConfirmButton = tw.div`
text-center bg-black text-white p-2 text-lg rounded-lg m-4 cursor-pointer 
 
`;



export default Confirm;
