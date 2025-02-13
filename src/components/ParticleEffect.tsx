"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface ParticleEffectProps {
  type: "confetti" | "hearts";
}

export default function ParticleEffect({ type }: ParticleEffectProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions =
    type === "confetti"
      ? {
          particles: {
            color: {
              value: [
                "#ff0000",
                "#00ff00",
                "#0000ff",
                "#ffff00",
                "#ff00ff",
                "#00ffff",
              ],
            },
            move: {
              direction: "bottom",
              enable: true,
              outModes: "out",
              speed: 6,
            },
            number: { value: 100 },
            opacity: { value: 0.7 },
            shape: { type: "circle" },
            size: { value: 3 },
          },
          detectRetina: true,
        }
      : {
          particles: {
            color: { value: "#ff0000" },
            move: {
              direction: "none",
              enable: true,
              outModes: "destroy",
              speed: 2,
              straight: false,
            },
            number: { value: 40, density: { enable: true, area: 800 } },
            opacity: {
              value: 0.8,
              animation: {
                enable: true,
                speed: 0.05,
                sync: true,
                startValue: "max",
                destroy: "min",
              },
            },
            shape: { type: "heart" },
            size: { value: 10 },
            life: {
              duration: {
                value: 5,
              },
              count: 1,
            },
          },
          detectRetina: true,
          emitters: {
            direction: "none",
            rate: {
              quantity: 5,
              delay: 0.15,
            },
            size: {
              width: 0,
              height: 0,
            },
            position: {
              x: 50,
              y: 50,
            },
          },
        };

  return (
    <Particles
      id={`tsparticles-${type}`}
      init={particlesInit}
      options={options}
    />
  );
}
