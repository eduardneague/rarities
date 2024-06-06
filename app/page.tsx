"use client";

import React, { useState } from "react";

export default function Home() {
  const [gems, setGems] = useState<number>(500000);
  const [notEnough, setNotEnough] = useState<boolean>(false);
  const [generatedSummons, setGeneratedSummons] = useState<any>([]);
  const [lastPull, setLastPull] = useState<any>([]);
  const [gemsSpent, setGemsSpent] = useState<number>(0);
  const [totalPulls, setTotalPulls] = useState<number>(0);
  const [selectedRarity, setSelectedRarity] = useState<string>("");

  const onePull = 50;

  type Rarity = "secret" | "mythic" | "legendary" | "epic" | "rare" | "common";

  interface RarityObject {
    secret: number;
    mythic: number;
    legendary: number;
    epic: number;
    rare: number;
    common: number;
  }

  const rarities: RarityObject = {
    secret: 0.01,
    mythic: 0.49,
    legendary: 0.98,
    epic: 9.8,
    rare: 29.4,
    common: 59.32,
  };

  const summonOne = () => {
    if (gems - onePull < 0) {
      setNotEnough(true);
      return;
    } else {
      setNotEnough(false);
      setGems((prevGems) => prevGems - onePull);

      setGemsSpent((prevGems) => prevGems + onePull);
      setTotalPulls((prevPulls) => prevPulls + 1);

      const { rarity, generatedNumber } = getRandomRarity(rarities);
      const newSummon = { rarity, generatedNumber };
      setLastPull([newSummon]);
      setGeneratedSummons((prevSummons: any) => [...prevSummons, newSummon]);
    }
  };

  const summonTen = () => {
    if (gems - onePull * 10 < 0) {
      setNotEnough(true);
      return;
    } else {
      setGems((prevGems) => prevGems - onePull * 10);
      setNotEnough(false);

      setGemsSpent((prevGems) => prevGems + onePull * 10);
      setTotalPulls((prevPulls) => prevPulls + 10);

      const newSummons: any = [];
      for (let i = 0; i < 10; i++) {
        const { rarity, generatedNumber } = getRandomRarity(rarities);
        const newSummon = { rarity, generatedNumber };
        newSummons.push(newSummon);
      }

      setLastPull(newSummons); // The last ten summons
      setGeneratedSummons((prevSummons: any) => [
        ...prevSummons,
        ...newSummons,
      ]);
    }
  };

  const getRandomRarity = (
    rarities: RarityObject
  ): { rarity: Rarity; generatedNumber: number } => {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (const [rarity, percentage] of Object.entries(rarities)) {
      cumulative += percentage;
      if (random < cumulative) {
        return { rarity: rarity as Rarity, generatedNumber: random };
      }
    }

    return { rarity: "common", generatedNumber: random };
  };

  const handleRarityClick = (rarity: string) => {
    setSelectedRarity(rarity);
  };

  return (
    <main className="min-h-screen w-full flex justify-center items-center gap-[1rem]">
      <div className="wrapper w-[80%] flex flex-col items-center gap-[1rem]">
        <h1 className="text-3xl mt-[2rem] font-bold">
          edu's gambling <span className="line-through"> addiction</span>{" "}
          dedication
        </h1>

        <div className="flex justify-center items-center">
          <h1 className="text-3xl mb-[0.5rem] ">💎</h1>
          <h1 className="font-bold text-blue-400 text-3xl">
            {gems.toLocaleString()}
          </h1>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={summonOne}
              className="p-3 bg-blue-500 text-white font-bold rounded-xl shadow-blue-500 shadow transition-all duration-100 hover:bg-pink-500 hover:shadow-pink-500 hover:scale-110"
            >
              Summon 1x
            </button>
            <div className="flex justify-center items-center">
              <h1 className=" mb-[0.3rem]">💎</h1>
              <h1 className="font-bold text-blue-400">
                {onePull.toLocaleString()}{" "}
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <button
              onClick={summonTen}
              className="p-3 bg-blue-500 text-white font-bold rounded-xl shadow-blue-500 shadow transition-all duration-100 hover:bg-pink-500 hover:shadow-pink-500 hover:scale-110"
            >
              Summon 10x
            </button>
            <div className="flex justify-center items-center">
              <h1 className=" mb-[0.3rem]">💎</h1>
              <h1 className="font-bold text-blue-400">
                {(onePull * 10).toLocaleString()}{" "}
              </h1>
            </div>
          </div>
        </div>

        <h1>{notEnough ? "not enough gems" : ""}</h1>
        <div className="flex gap-4">
          <h1 className="font-bold text-purple-500">
            Total Pulls: {totalPulls.toLocaleString()}{" "}
          </h1>
          <h1 className="font-bold text-blue-500">
            Gems Spent: {gemsSpent.toLocaleString()}{" "}
          </h1>
        </div>
        <div className=" w-full flex gap-2 justify-center items-center">
          {lastPull.map((pull: any, index: any) => {
            let bgColor;

            if (pull.rarity === "common") {
              bgColor = "gray";
            } else if (pull.rarity === "rare") {
              bgColor = "lightBlue";
            } else if (pull.rarity === "epic") {
              bgColor = "purple";
            } else if (pull.rarity === "legendary") {
              bgColor = "yellow";
            } else if (pull.rarity === "mythic") {
              bgColor = "green";
            } else if (pull.rarity === "secret") {
              bgColor = "red";
            }

            return (
              <div
                key={index}
                style={{ backgroundColor: bgColor }}
                className="flex items-center justify-center p-2 w-[5rem] aspect-square font-bold "
              >
                {pull.rarity.toUpperCase()}{" "}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col">
          <h2>Filter</h2>
          <div className="flex justify-between">
            {Object.keys(rarities).map((rarity) => (
              <button
                key={rarity}
                className="p-2"
                onClick={() => handleRarityClick(rarity)}
                style={{
                  backgroundColor: selectedRarity === rarity ? "lightgray" : "",
                }}
              >
                {rarity.toUpperCase()}
              </button>
            ))}
            <button onClick={() => handleRarityClick("")}>All</button>
          </div>
        </div>

        <div className="flex justify-center w-full gap-3 my-[2rem]">
          {Object.entries(rarities).map(([rarity, _]) => {
            const count = generatedSummons.filter(
              (pull: any) => pull.rarity === rarity
            ).length;
            let bgColor;

            if (rarity === "common") {
              bgColor = "gray";
            } else if (rarity === "rare") {
              bgColor = "#6495ED";
            } else if (rarity === "epic") {
              bgColor = "purple";
            } else if (rarity === "legendary") {
              bgColor = "#FFA500";
            } else if (rarity === "mythic") {
              bgColor = "green";
            } else if (rarity === "secret") {
              bgColor = "red";
            }

            return (
              <div key={rarity} className="flex flex-col gap-2 items-center">
                <div
                  style={{ backgroundColor: bgColor }}
                  className="w-10 h-10"
                ></div>
                <h2 className="font-bold">{rarity.toUpperCase()}</h2>
                <p style={{ color: bgColor }} className="font-bold">
                  {count}
                </p>
              </div>
            );
          })}
        </div>

        <div className="w-2/3 flex flex-col justify-center items-center gap-3 min-h-[30rem]  overflow-y-auto p-5">
          {generatedSummons
            .filter((pull: any) =>
              selectedRarity ? pull.rarity === selectedRarity : true
            )
            .map((pull: any, index: any) => {
              let bgColor;
              let boxShadowColor;

              if (pull.rarity === "common") {
                bgColor = "gray";
                boxShadowColor = "rgba(0, 0, 0, 0.2)";
              } else if (pull.rarity === "rare") {
                bgColor = "#6495ED";
                boxShadowColor = "rgba(173, 216, 230, 0.2)";
              } else if (pull.rarity === "epic") {
                bgColor = "purple";
                boxShadowColor = "rgba(128, 0, 128, 0.2)";
              } else if (pull.rarity === "legendary") {
                bgColor = "#FFA500";
                boxShadowColor = "rgba(255, 255, 0, 0.2)";
              } else if (pull.rarity === "mythic") {
                bgColor = "green";
                boxShadowColor = "rgba(0, 128, 0, 0.2)";
              } else if (pull.rarity === "secret") {
                bgColor = "red";
                boxShadowColor = "rgba(255, 0, 0, 0.2)";
              }

              return (
                <div
                  className={`flex bg-gray-100 shadow justify-between w-full p-3`}
                  style={{
                    borderColor: bgColor,
                    borderLeft: `50px solid ${bgColor}`,
                    boxShadow: `1px 2px 1px 1px ${boxShadowColor}`,
                  }}
                  key={index}
                >
                  <h1>{index + 1}</h1>
                  <h1>{pull.rarity.toUpperCase()} </h1>
                  <h1>{pull.generatedNumber.toFixed(2)} </h1>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
