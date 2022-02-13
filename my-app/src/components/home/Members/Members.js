import React from "react";
import arnav from "../../../assests/arnav.jpg";
import anuj from "../../../assests/anuj.jpg";
import rishabh from "../../../assests/rishabh.jpg";
import sid from "../../../assests/sid.jpg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

import {
  MemberContainer,
  MemberH1,
  MemberWrapper,
  MemberCard,
  MemberIcon,
  MemberH2,
  MemberP,
} from "./MembersComp";
import { Link } from "@mui/material";

const Members = () => {
  return (
    <MemberContainer id="team">
      <MemberH1>Our Team</MemberH1>
      <MemberWrapper>
        <MemberCard>
          <MemberIcon src={anuj} />
          <MemberH2>
            Team Leader
            <br /> & Designer
          </MemberH2>
          <MemberP>
            <Link
              href="https://www.linkedin.com/in/anuj-agrawal-0067761a0/"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>{" "}
            &nbsp;&nbsp;
            <Link
              href="https://www.instagram.com/__anuj__aa__/"
              target="_blank"
            >
              <InstagramIcon />
            </Link>
          </MemberP>
        </MemberCard>
        <MemberCard>
          <MemberIcon src={arnav} />
          <MemberH2>
            Front-end
            <br /> Developer
          </MemberH2>
          <MemberP>
            <Link
              href="https://www.linkedin.com/in/arnav-ranjan/"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>{" "}
            &nbsp;&nbsp;
            <Link href="https://www.instagram.com/arnavr15/" target="_blank">
              <InstagramIcon />
            </Link>
          </MemberP>
        </MemberCard>

        <MemberCard>
          <MemberIcon src={rishabh} />
          <MemberH2>
            Architecture Designing
            <br /> & Intergration
          </MemberH2>
          <MemberP>
            <Link
              href="https://www.linkedin.com/in/rishabh-mishra-4b647b167/"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>{" "}
            &nbsp;&nbsp;
            <Link
              href="https://www.instagram.com/rishabhh.mishraa/"
              target="_blank"
            >
              <InstagramIcon />
            </Link>
          </MemberP>
        </MemberCard>
        <MemberCard>
          <MemberIcon src={sid} />
          <MemberH2>
            Back-end <br />
            Developer
          </MemberH2>
          <MemberP>
            <Link
              href="https://www.linkedin.com/in/siddharth-dubey-54b0ba1a9/"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>{" "}
            &nbsp;&nbsp;
            <Link href="https://www.instagram.com/its_sid_007/" target="_blank">
              <InstagramIcon />
            </Link>
          </MemberP>
        </MemberCard>
      </MemberWrapper>
    </MemberContainer>
  );
};

export default Members;
