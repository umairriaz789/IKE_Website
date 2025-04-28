import React from "react";
import { CircleExpandButton } from "./buttons";
import {
  TelegramGoldIcon,
  TelegramWhiteIcon,
  TwitterGoldIcon,
  TwitterWhiteIcon,
  FacebookGoldIcon,
  FacebookWhiteIcon,
  DiscordGoldIcon,
  DiscordWhiteIcon,
  Linkdin,
  Linkd,
} from "../assets";

const Community = () => {
  return (
    // w-100 max-w-[70%]
    // <div className="mx-auto">
    <div className=" xl:mx-auto py-3 sm:px-5">
      <div className=" flex max-[800px]:flex-col items-center max-[1699px]:justify-center justify-center    min-[800px]:gap-[230px]  min-[2000px]:px-[150px] min-[2200px]:px-[200px]  min-[2400px]:px-[280px] min-[2000px]:justify-between">
        <div>
          {/* <div className="w-[70%]"> */}
          <span
            style={{
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "32px",
            }}
            className=" text-transparent bg-clip-text bg-gradient-to-t from-[#d6aded] to-[#ac40ea] font-montserrat"
          >
            Join Our Community
          </span>
          {/* </div> */}
          <div className="min-[800px]:max-w-[592px] w-[100%]  my-3 fontsize flex flex-nowrap">
            <p
              className="font-poppins "
              style={{
                fontWeight: "300",
                lineHeight: "24px",
                color: "#FFFFFF",
              }}
            >
              Our community is vibrant and welcoming to all who share our
              passions. We foster meaningful relationships, learn from each
              other, and provide support and resources to help everyone achieve
              their goals. Join us in improving the future.
            </p>
          </div>
        </div>
        {/* w-[70%] xl:w-[100%] */}
        <div className=" flex items-start justify-center flex-nowrap">
          <div className="my-2" />
          <a target="_blank" href="https://t.me/">
            <CircleExpandButton
              color="primary"
              outline
              icon={<img src={TelegramGoldIcon} alt="telegram-gold.svg" />}
              hoverIcon={
                <img src={TelegramGoldIcon} alt="telegram-white.svg" />
              }
              text={"Telegram"}
            />
          </a>
          <a target="_blank" href=" https://twitter.com/">
            <CircleExpandButton
              color="primary"
              outline
              icon={<img src={TwitterGoldIcon} alt="twitter-gold.svg" />}
              hoverIcon={<img src={TwitterGoldIcon} alt="twitter-white.svg" />}
              text="Twitter"
            />
          </a>
          <a target="_blank" href="https://www.facebook.com/">
            <CircleExpandButton
              color="primary"
              outline
              icon={<img src={FacebookGoldIcon} alt="facebook-gold.svg" />}
              hoverIcon={
                <img src={FacebookGoldIcon} alt="facebook-white.svg" />
              }
              text="Facebook"
            />
          </a>
          <a
            target="_blank"
            href="https://discord.com/"
          >
            <CircleExpandButton
              color="primary"
              outline
              icon={<img src={DiscordGoldIcon} alt="discord-gold.svg" />}
              hoverIcon={<img src={DiscordGoldIcon} alt="discord-white.svg" />}
              text="Discord"
            />
          </a>
          <a
            target="_blank"
            href=" https://www.linkedin.com/"
          >
            <CircleExpandButton
              color="primary"
              outline
              icon={
                <img
                  style={{ width: "30px", height: "20px" }}
                  src={Linkdin}
                  alt="linkd.svg"
                />
              }
              hoverIcon={
                <img
                  src={Linkdin}
                  style={{ width: "30px", height: "20px" }}
                  alt="linkdin.svg"
                />
              }
              text="Linkedin"
            />
          </a>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Community;
