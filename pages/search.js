import { AddCircleOutline, ArrowBack, Star } from "@material-ui/icons";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fromLocationAction, toLocationAction } from "../redux/action";

import tw from "tailwind-styled-components";
function Search() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Head>
        <title>Order</title>
      </Head>
      <ButtonContainer>
        <ArrowBack className="cursor-pointer" onClick={() => router.back()} />
      </ButtonContainer>
      <InputContainer>
        <FromToIcons>
          <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
          <Line src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
          <Square src="https://img.icons8.com/windows/50/000000/square-full.png" />
        </FromToIcons>
        <InputBoxes>
          <Input
            type="text"
            placeholder="Enter pickup location"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Where to?"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </InputBoxes>
        <AddCircleOutline className="!w-7 !h-7  cursor-pointer !text-gray-400" />
      </InputContainer>
      <Link
        href={{
          pathname: "/confirm",
          query: {
            from: from,
            to: to,
          },
        }}
        passHref
      >
        <ConfirmButton
          onClick={() => {
            dispatch(fromLocationAction(from));
            dispatch(toLocationAction(to));
          }}
        >
          Confirm Locations
        </ConfirmButton>
      </Link>
    </Wrapper>
  );
}

const Wrapper = tw.div`
bg-gray-200 h-screen
`;

const ButtonContainer = tw.div`
bg-white p-2`;

const InputContainer = tw.div`
bg-white mt-2 p-2 flex gap-3 items-center 
`;

const FromToIcons = tw.div`
w-10 flex flex-col items-center gap-1
`;

const Circle = tw.img`
h-2.5
`;

const Line = tw.img`
h-10
`;

const Square = tw.img`
h-3
`;

const InputBoxes = tw.div`
flex flex-col flex-1
`;

const Input = tw.input`
h-10 bg-gray-200 rounded-lg my-2 p-3 outline-none border-none
`;

const SavedPlaces = tw.div`
  bg-white mt-2 px-4 py-2 flex items-center text-xl
`;

const ConfirmButton = tw.div`
bg-black text-white rounded-lg text-center p-2 mt-2 mx-3 cursor-pointer text-xl
`;

export default Search;
