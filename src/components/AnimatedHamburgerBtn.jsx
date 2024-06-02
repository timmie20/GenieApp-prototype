import React, { useState } from "react";
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const AnimatedHamburgerBtn = () => {
  const [active, setActive] = useState(false);

  const VARIANTS = {
    top: {
      open: {
        rotate: ["0deg", "0deg", "45deg"],
        top: ["35%", "50%", "50%"],
      },
      closed: {
        rotate: ["45deg", "0deg", "0deg"],
        top: ["50%", "50%", "35%"],
      },
    },
    middle: {
      open: {
        rotate: ["0deg", "0deg", "-45deg"],
      },
      closed: {
        rotate: ["-45deg", "0deg", "0deg"],
      },
    },
    bottom: {
      open: {
        rotate: ["0deg", "0deg", "45deg"],
        bottom: ["35%", "50%", "50%"],
        left: "50%",
      },
      closed: {
        rotate: ["45deg", "0deg", "0deg"],
        bottom: ["50%", "50%", "35%"],
        left: "calc(50% + 10px)",
      },
    },
  };
  return (
    <>
      <MotionConfig
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {active && (
          <AnimatePresence>
            <motion.div
              className={`absolute right-0 top-0 flex h-20 w-full items-center bg-zinc-50`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "backInOut",
              }}
            >
              <nav className="mx-[14px] flex gap-2 text-wrap text-sm text-[#1753F5]">
                <Link to="#">TWITTER</Link>
                <Link to="#">REQUEST A DEMO</Link>
              </nav>
            </motion.div>
          </AnimatePresence>
        )}

        <motion.button
          initial={true}
          animate={active ? "open" : "closed"}
          onClick={() => setActive((pv) => !pv)}
          className="relative h-16 w-8"
        >
          <motion.span
            variants={VARIANTS.top}
            className={`absolute h-1 w-10 ${active ? "bg-black" : "bg-white"}`}
            style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className={`absolute h-1 w-10 ${active ? "bg-black" : "bg-white"}`}
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className={`absolute h-1 w-5 ${active ? "bg-black" : "bg-white"}`}
            style={{
              x: "-50%",
              y: "50%",
              bottom: "35%",
              left: "calc(50% + 10px)",
            }}
          />
        </motion.button>
      </MotionConfig>
    </>
  );
};
