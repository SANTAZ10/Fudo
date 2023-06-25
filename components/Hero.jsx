import React from "react";
import css from "../styles/Hero.module.css";
import cherry from "../assets/Cherry.png";
import HeroImage from "../assets/HeroImage.png";
import Image from "next/image";
import { UilPhone } from "@iconscout/react-unicons";
import Pizza1 from "../assets/p1.jpg";

const Hero = () => {
  return (
    <div className={css.container}>
      {/* left side */}
      <div className={css.left}>
        <div className={css.cherryDiv}>
          <span>More than faster</span>
          <Image src={cherry} alt="" width={40} height={25} />
        </div>

        <div className={css.heroText}>
          <span>Be The Fastest</span>
          <span>In Delivering</span>
          <span>
            Your <span style={{ color: "var(--themeRed)" }}>Pizza</span>
          </span>
        </div>

        <span className={css.miniText}>
          Our mission is to bring delightful food directly to you, combining convenience and swift
          delivery, completely free of charge.
        </span>

        <button className={`btn ${css.btn}`}>Get Started</button>
      </div>

      {/* right side */}
      <div className={css.right}>
        <div className={css.imageContainer}>
          <Image src={HeroImage} alt="" layout="intrinsic" />
        </div>

        <div className={css.contactUs}>
          <span>Contact us</span>
          <div>
            <UilPhone color="white" />
          </div>
        </div>

        <div className={css.pizza}>
          <div>
            <Image src={Pizza1} alt="" objectFit="cover" layout="intrinsic" />
          </div>

          <div className={css.details}>
            <span>Italian Pizza</span>
            <span> <span style={{color: "var(--themeRed)"}}>$</span> 17.49</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
