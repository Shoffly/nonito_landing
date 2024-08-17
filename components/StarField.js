import React, { useEffect, useRef } from "react";
import styles from "../styles/starfield.module.css";

const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const stars = {};
    let starIndex = 0;
    let numStars = 0;
    const acceleration = 1;
    const starsToDraw = (canvas.width * canvas.height) / 200;

    class Star {
      constructor() {
        this.X = canvas.width / 2;
        this.Y = canvas.height / 2;
        this.SX = Math.random() * 10 - 5;
        this.SY = Math.random() * 10 - 5;

        const start = Math.max(canvas.width, canvas.height);
        this.X += (this.SX * start) / 10;
        this.Y += (this.SY * start) / 10;

        this.W = 1;
        this.H = 1;
        this.age = 0;
        this.dies = 500;
        starIndex++;
        stars[starIndex] = this;
        this.ID = starIndex;
        this.C = "#ffffff";
      }

      draw() {
        this.X += this.SX;
        this.Y += this.SY;

        this.SX += this.SX / (50 / acceleration);
        this.SY += this.SY / (50 / acceleration);
        this.age++;

        if (
          this.age === Math.floor(50 / acceleration) ||
          this.age === Math.floor(150 / acceleration) ||
          this.age === Math.floor(300 / acceleration)
        ) {
          this.W++;
          this.H++;
        }

        if (
          this.X + this.W < 0 ||
          this.X > canvas.width ||
          this.Y + this.H < 0 ||
          this.Y > canvas.height
        ) {
          delete stars[this.ID];
          numStars--;
        }

        ctx.fillStyle = this.C;
        ctx.fillRect(this.X, this.Y, this.W, this.H);
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)");
      gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.9)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      return gradient;
    };

    const draw = () => {
      ctx.fillStyle = createGradient();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = numStars; i < starsToDraw; i++) {
        new Star();
        numStars++;
      }

      for (let star in stars) {
        stars[star].draw();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className={styles.starfieldContainer}>
      <canvas ref={canvasRef} className={styles.starfield} />
    </div>
  );
};

export default StarField;
