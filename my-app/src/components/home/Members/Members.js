import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { MemberData } from "../../../data/MembersData";

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
        {MemberData.map((item) => {
          return (
            <MemberCard key={item.id}>
              <MemberIcon src={item.img} />
              <MemberH2>{item.title}</MemberH2>
              <MemberP>{item.position}</MemberP>
              <MemberP>
                <Link href={item.linkedin} target="_blank">
                  <LinkedInIcon />
                </Link>{" "}
                &nbsp;&nbsp;
                <Link href={item.instagram} target="_blank">
                  <InstagramIcon />
                </Link>
                &nbsp;&nbsp;
                <Link href={item.github} target="_blank">
                  <GitHubIcon />
                </Link>
              </MemberP>
            </MemberCard>
          );
        })}
      </MemberWrapper>
    </MemberContainer>
  );
};

export default Members;
