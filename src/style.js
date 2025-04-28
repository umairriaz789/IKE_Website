const styles = {
  // xl:max-w-[1536px]
  boxWidth: " w-full",

  heading2:
    "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph: "font-poppins font-normal text-dimWhite ",

  flexCenter: "flex justify-center items-center sm:flex-wrap",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingXX: "px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
};

export const layout = {
  section: `flex  flex-col ${styles.paddingY}`,
  sectionReverse: `gap-2 flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1  flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex flex-col items-center`,
};

export default styles;
