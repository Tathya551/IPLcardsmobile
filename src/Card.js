import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import rcbLogo from "./logos/rcb.png";
import dcLogo from "./logos/dc.png";
import kkrLogo from "./logos/kkr.png";
import gtLogo from "./logos/gt.png";
import srhLogo from "./logos/srh.png";
import lsgLogo from "./logos/lsg.png";
import pbksLogo from "./logos/pbks.png";
import miLogo from "./logos/mi.png";
import rrLogo from "./logos/rr.png";
import cskLogo from "./logos/csk.png";

const teamThemes = {
  RCB: {
    background1: "#9D0001",
    background2: "#030212",
    text: "white",
    statColor: "#DECB64",
  },
  DC: {
    background1: "#458CFE",
    background2: "#F9402E",
    text: "black",
    statColor: "white",
    outlineColor: "",
    statOutlineColor: "black",
  },
  KKR: {
    background1: "#413769",
    background2: "#FABE04",
    text: "white",
    statColor: "#FABE04",
    outlineColor: "#413769",
    statOutlineColor: "#000000",
  },
  CSK: {
    background2: "#E9E14E",
    background1: "#2A2567",
    text: "white",
    statColor: "#E9E14E",
    outlineColor: "#000000",
    statOutlineColor: "#000000",
  },
  MI: {
    background2: "#25429E",
    background1: "#BDAD5F",
    text: "white",
    statColor: "#25429E",
    outlineColor: "#25429E",
    statOutlineColor: "white",
  },
  SRH: {
    background1: "#171916",
    background2: "#FA472C",
    text: "white",
    statColor: "white",
    outlineColor: "#000000",
    statOutlineColor: "#000000",
  },
  LSG: {
    background1: "#152851",
    background2: "#F43200",
    text: "white",
    statColor: "white",
    outlineColor: "#152851",
    statOutlineColor: "#152851",
  },
  GT: {
    background1: "#19253D",
    background2: "#D8C99E",
    text: "white",
    statColor: "white",
    outlineColor: "#19253D",
    statOutlineColor: "#19253D",
  },
  RR: {
    background1: "#252042",
    background2: "#F5399B",
    text: "white",
    statColor: "white",
    outlineColor: "#F5399B",
    statOutlineColor: "#F5399B",
  },
  PBKS: {
    background1: "#D6C478",
    background2: "#CA343B",
    text: "black",
    outlineColor: "white",
    statOutlineColor: "#D6C478",
  },
};

const Card = ({
  card,
  hidden,
  onStatSelect,
  isUserTurn,
  gameEnded,
  isUserCard,
}) => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (card) {
      const img = new Image();
      img.src = teamLogos[card.team];
      img.onload = () => setLogoLoaded(true);

      const imgCard = new Image();
      imgCard.src = card.img;
      imgCard.onload = () => setImageLoaded(true);
    }
  }, [card]);

  if (!card) {
    return null;
  }

  const teamTheme = teamThemes[card.team] || {};

  const gradientStyle = {
    background: `linear-gradient(45deg, ${
      teamTheme.background1 || "red"
    } 50%, ${teamTheme.background2 || "blue"} 50%)`,
  };

  const cardStyles = {
    color: teamTheme.text || "black",
    p: "2",
    borderRadius: "12px",
    boxShadow: "md",
    m: "2",
    display: "inline-block",
    textAlign: "center",
    width: "calc(25% - 8px)",
    height: "auto",
    mr: "calc(2% + 4px)",
    ml: "calc(2% + 4px)",
    padding: "20px",
    lineHeight: "1.6",
    border: isUserCard ? "none" : "2px solid #000000",
    ...gradientStyle,
    transform: "scale(1.1)",
  };

  const statStyles = {
    color: teamTheme.statColor || "black",
    textShadow: `1px 1px 2px ${teamTheme.statOutlineColor || ""}`,
  };

  const textStyles = {
    color: teamTheme.text || "black",
    textShadow: `1px 1px 2px ${teamTheme.outlineColor || ""}`,
  };

  const statsLeft = ["runs", "batAvg", "batSR", "highScore"];
  const statsRight = ["wickets", "bowlAvg", "bowlER", "bestBowling"];

  const cardDetails = Object.entries(card).map(([key, value]) => {
    if (key !== "img") {
      return (
        <div key={key}>
          <Text
            as="span"
            fontWeight="bold"
            color="blue.500"
            cursor={isUserTurn && !gameEnded ? "pointer" : "default"}
            onClick={() => isUserTurn && !gameEnded && onStatSelect(key)}
            style={textStyles}
          >
            {key}:
          </Text>{" "}
          {value}
        </div>
      );
    }
    return null;
  });

  const teamLogos = {
    RCB: rcbLogo,
    DC: dcLogo,
    KKR: kkrLogo,
    GT: gtLogo,
    SRH: srhLogo,
    LSG: lsgLogo,
    PBKS: pbksLogo,
    MI: miLogo,
    RR: rrLogo,
    CSK: cskLogo,
  };

  const backgroundImageUrl = isUserCard
    ? `url(${card.img})`
    : "url('https://akm-img-a-in.tosshub.com/indiatoday/images/author/21_08_2020-ipl_logo_20650553.jpg?VersionId=1LSxOLdYkLhQ9JrbrV.LPIccow8TJohg')";

  const backgroundStyle = {
    background: backgroundImageUrl,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <Box
      style={isUserCard ? cardStyles : { ...cardStyles, ...backgroundStyle }}
    >
      {!hidden && (
        <>
          {isUserCard && imageLoaded && (
            <img
              src={card.img}
              alt={card.name}
              style={{
                width: "110%",
                height: "175px",
                objectFit: "cover",
                objectPosition: "top right",
                marginBottom: "11px",
                borderRadius: "11px",
                transform: "scale(1.04)",
              }}
            />
          )}
          <Text fontSize="19" fontWeight="bold" mb="2" style={textStyles}>
            {card.name.toUpperCase()}
          </Text>
          <Box mb="11px">
            {logoLoaded && (
              <img
                src={teamLogos[card.team]}
                alt={`${card.team} Logo`}
                style={{
                  minWidth: "63px",
                  minHeight: "55px",
                  maxWidth: "65px",
                  maxHeight: "65px",
                  margin: "auto",
                  display: logoLoaded ? "block" : "none",
                  transform: "scale(1.1)",
                }}
                onLoad={() => setLogoLoaded(true)}
              />
            )}
          </Box>
          <Flex justify="space-between">
            <Box w="48%" textAlign="left">
              {statsLeft.map((key) => (
                <div
                  key={key}
                  id={key}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={() => handleMouseLeave(key)}
                >
                  <Text
                    as="span"
                    fontWeight="bold"
                    color={teamTheme.statColor || "black"}
                    cursor={isUserTurn && !gameEnded ? "pointer" : "default"}
                    onClick={() =>
                      isUserTurn && !gameEnded && onStatSelect(key)
                    }
                    style={statStyles}
                  >
                    {key}:
                  </Text>{" "}
                  {card[key]}
                </div>
              ))}
            </Box>
            <Box w="48%" textAlign="right">
              {statsRight.map((key) => (
                <div
                  key={key}
                  id={key}
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={() => handleMouseLeave(key)}
                >
                  {card[key]}{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                    color={teamTheme.statColor || "black"}
                    cursor={isUserTurn && !gameEnded ? "pointer" : "default"}
                    onClick={() =>
                      isUserTurn && !gameEnded && onStatSelect(key)
                    }
                    style={statStyles}
                  >
                    {key}
                  </Text>
                </div>
              ))}
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );

  function handleMouseEnter(key) {
    const element = document.getElementById(key);
    if (element) {
      element.style.transform = "scale(1.1)";
    }
  }

  function handleMouseLeave(key) {
    const element = document.getElementById(key);
    if (element) {
      element.style.transform = "scale(1)";
    }
  }
};

export default Card;
