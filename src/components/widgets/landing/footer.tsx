import { Link, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import ChrysusGray from "src/assets/icons/svg/chrysus-gray.svg";
import { CIconLink, CLink } from "src/types/ui";

interface LinkList {
  title: string;
  links: CLink[];
}

interface IFooterProps {
  footerLinks: LinkList[];
  socialLinks: CIconLink[];
}

export const Footer = ({ footerLinks, socialLinks }: IFooterProps) => {
  return (
    <div style={{ background: "#262522", borderRadius: "8px 8px 0px 0px" }}>
      <Container>
        <div className="row p-5">
          {/* left col */}
          <div className="col-lg-4 my-3">
            <div className="d-flex flex-column justify-content-start align-items-start">
              {/* logo */}
              <div className="d-flex flex-row align-items-center justify-content-center">
                <img
                  style={{ opacity: "0.5" }}
                  src={ChrysusGray}
                  alt="chrysus-gray.svg"
                />
                <span
                  className="mx-3"
                  style={{
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "29px",
                    opacity: "0.5",
                  }}
                >
                  Chrysus
                </span>
              </div>
              {/* hr */}
              <div
                className="my-4"
                style={{
                  borderBottom: "2px solid #846424",
                  opacity: "0.5",
                  width: "80%",
                }}
              />
              {/* Text */}
              <span
                className="my-2"
                style={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "17px",
                  opacity: "0.5",
                }}
              >
                2022, All Rights Reserved with {""}
                <span style={{ fontWeight: 600 }}>Chrysus.</span>
              </span>
              <span
                className="my-2"
                style={{
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "17px",
                  opacity: "0.5",
                }}
              >
                Developed by {""}
                <span style={{ fontWeight: 600 }}>
                  BlocksGenie Technologies
                </span>
              </span>
            </div>
          </div>
          {/* middle col */}
          <div className="col-lg-4 my-3">
            <div className="d-flex flex-row align-items-start justify-content-between">
              {footerLinks.map((footerLink) => (
                <div className="d-flex flex-column align-items-start">
                  <FooterLinkHeading text={footerLink.title} />
                  {footerLink.links.map((link) => (
                    <FooterLink
                      className="my-3"
                      data={{ url: link.url, label: link.label }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* right col */}
          <div className="col-lg-4 my-3 text-center">
            {socialLinks.map((socialLink) => (
              <Link
                className="mx-2"
                to={socialLink.url}
                style={{ textDecoration: "none" }}
              >
                {socialLink.icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

const FooterLinkHeading = ({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: any;
}) => {
  return (
    <span
      className={`${className}`}
      style={{
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "16px",
        alignItems: "center",
        letterSpacing: "1px",
        color: "#846424",
        ...style,
      }}
    >
      {text}
    </span>
  );
};
const FooterLink = ({
  data,
  className,
  style,
}: {
  data: CLink;
  className?: string;
  style?: any;
}) => {
  return (
    <Link
      className={`${className}`}
      to={data.url}
      style={{
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "16px",
        alignItems: "center",
        letterSpacing: "1px",
        color: "#FFFFFF",
        opacity: "0.5",
        textDecoration: "none",
        ...style,
      }}
    >
      {data.label}
    </Link>
  );
};
