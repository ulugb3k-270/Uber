import { Close } from "@material-ui/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import db from "../../firebase/config";
import tw from "tailwind-styled-components";
import Link from "next/link";

export default function RideSelector() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedCar, setSelectedCar] =  useState("")
  const [selectedPlanMultipy, setSelectedPlanMultipy] = useState("")
  const [selectedPlanActive, setSelectedPlanActive] = useState(false);
  const { fromLocation, toLocation } = useSelector((state) => state);
  const  [plans, setPlans] = useState([
    {
      img: "https://i.ibb.co/cyvcpfF/uberx.png",
      service: "Economy",
      multipy: 1,
    },
    {
      img: "https://i.ibb.co/YDYMKny/uberxl.png",
      service: "Comfort",
      multipy: 1.5,
    },
    {
      img: "https://i.ibb.co/Xx4G91m/uberblack.png",
      service: "Business",
      multipy: 2,
    },
    {
      img: "https://i.ibb.co/1nStPWT/uberblacksuv.png",
      service: "Delivery",
      multipy: 2.5,
    },
  ])

  const { data: session } = useSession();


  const confirmOrder = (service, img, price) => {
    setSelectedPlan(service);
    setSelectedPlanActive(true);
    setSelectedPlanMultipy(price)
    setSelectedCar(img)
  };


  const handleOrder = () => {
    addDoc(collection(db, session?.user.email), {
      from: fromLocation,
      to: toLocation,
      class: selectedPlan,
      carImg: selectedCar,
      price: selectedPlanMultipy * 12,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <>
      {selectedPlanActive && (
        <ConfirmPage>
          <ConfirmBox>
            <Close
              className="cursor-pointer"
              onClick={() => setSelectedPlanActive(false)}
            />

            <Link href="/" passHref>
              <ConfirmButton onClick={handleOrder}>
                Order {selectedPlan}{" "}
              </ConfirmButton>
            </Link>
            <Link href="/" passHref>
              <HomeButton>Home to</HomeButton>
            </Link>
          </ConfirmBox>
        </ConfirmPage>
      )}
      <Wrapper>
        <Title>Choose the plan</Title>
        <CarList>
          {plans.map((plan) => (
            <Car key={plan.id} onClick={() => confirmOrder(plan.service, plan.img, plan.multipy)}>
              <CarImage src={plan.img} />
              <CarDetails>
                <CarName>{plan.service}</CarName>
                <CarTime>5 min away</CarTime>
              </CarDetails>
              <CarPrice>${plan.multipy * 12}</CarPrice>
            </Car>
          ))}
        </CarList>
      </Wrapper>
      ;
    </>
  );
}

const Wrapper = tw.div`
flex-1 
`;
const ConfirmPage = tw.div`
absolute w-full h-screen top-0 z-[999] flex flex-col justify-center items-center bg-[#000000a1]
`;

const ConfirmBox = tw.div`
bg-white rounded-lg p-3 w-60 text-right
`;

const ConfirmButton = tw.div`
w-full text-center p-2 bg-black text-white rounded-lg mt-2 cursor-pointer
`;
const HomeButton = tw.div`
w-full text-center p-2  cursor-pointer border mt-2 rounded-lg 
`;

const Title = tw.div`
text-center text-gray-500 text-xs py-2 border-b

`;
const CarList = tw.div`


`;
const Car = tw.div`
flex p-4 items-center gap-2 hover:bg-gray-100 cursor-pointer 

`;
const CarImage = tw.img`

w-14  mr-2
`;
const CarDetails = tw.div`
flex-1

`;
const CarName = tw.div`
font-medium

`;
const CarTime = tw.div`
text-blue-400

`;
const CarPrice = tw.div`
font-bold

`;
