import { keyframes, styled } from "@mui/material";

import { Link as LinkedComponent } from "react-router-dom";
export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkedComponent)`
  text-decoration: none;
  color: black;
  padding: "1rem";
  &: hover {
    background-color: #f0f0f0;
  }
`;

// export const InputBox = styled("input")`
//   width: 100%;
//   height: 70%;
//   border: 1px solid #ccc;
//   outline: none;
//   padding: 0.75rem 1rem; /* Add padding for comfort */
//   border-radius: 1.5rem;
//   background-color: #f9f9f9; /* Light background color */
//   box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Inner shadow for depth */
//   transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transitions */

//   &:hover {
//     border-color: #b3b3b3; /* Slight border change on hover */
//   }

//   &:focus {
//     border-color: #1e90ff; /* Blue border on focus */
//     box-shadow: 0 0 5px rgba(30, 144, 255, 0.5); /* Outer glow on focus */
//     background-color: #ffffff; /* Change background color on focus */
//   }
// `;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  margin-left: 1rem; /* Add margin to separate from the icon */
  border-radius: 20px;
  background-color: #f1f0f0;
  font-size: 1rem;
  color: #333;
  transition: background-color 0.3s, box-shadow 0.3s;
`;

// export const SearchField = styled("input")`
//   padding: 1rem 2rem;
//   width: 20vmax;
//   border: none;
//   outline: none;
//   border-radius: 1.5rem;
//   background-color: #f0f0f0;
//   font-size: 1.1rem;
// `;

// export const CurveButton = styled("button")`
//   border-radius: 1.5rem;
//   padding: 1rem 2rem;
//   border: none;
//   outline: none;
//   cursor: pointer;
//   background-color: #1a1a1a;
//   color: white;
//   font-size: 1.1rem;
//   &:hover {
//     background-color: rgba(0, 0, 0, 0.8);
//   }
// `;

export const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 100%;
  max-width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
  color: #1a1a1a;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const CurveButton = styled("button")`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: rgba(26, 26, 26, 0.8);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

// const bounceAnimation = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.5); }
//   100% { transform: scale(1); }
// `;

// export const BouncingSkeleton = styled(Skeleton)(() => ({
//   animation: `${bounceAnimation} 1s infinite`,
// }));

const pulseAnimation = keyframes`
  0% { opacity: .35; }
  50% { opacity: 1; }
  100% { opacity: .35; }
`;

export const Dot = styled("span")(({ theme }) => ({
  width: 10,
  height: 10,
  borderRadius: "50%",
  display: "inline-block",
  margin: "0 2px",
  animation: `${pulseAnimation} 1s ease-in-out infinite`,
}));
