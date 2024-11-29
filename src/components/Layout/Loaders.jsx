import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { Dot } from "../styles/StyledComponents";

export const LayoutLoader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={"5rem"} />
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        xs={4}
        md={4}
        lg={3}
        height={"100%"}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};

// export const TypingLoader = ({ sameSender }) => {
//   return (
//     <Box
//       sx={{
//         alignSelf: sameSender ? "flex-end" : "flex-start",
//         backgroundColor: sameSender ? "#007bff" : "#f1f1f1",
//         color: sameSender ? "#ffffff" : "#333333",
//         borderRadius: "0.75rem",
//         padding: "0.5rem 0.75rem",
//         maxWidth: "65%",
//         marginBottom: "0.6rem",
//         boxShadow: "0 0.125rem 0.3125rem rgba(0, 0, 0, 0.15)",
//         display: "flex",
//         flexDirection: "column",
//         overflowWrap: "break-word",
//       }}
//     >
//       <Stack
//         spacing={"0.5rem"}
//         direction={"row"}
//         padding={"0.5rem"}
//         justifyContent={"flex-start"}
//       >
//         <BouncingSkeleton
//           variant="circular"
//           width="0.9375rem"
//           height="0.9375rem"
//           style={{
//             animationDelay: "0.1s",
//             backgroundColor: sameSender
//               ? "rgba(255, 255, 255, 0.6)"
//               : "rgba(0, 123, 255, 0.6)",
//           }}
//         />
//         <BouncingSkeleton
//           variant="circular"
//           width="0.9375rem"
//           height="0.9375rem"
//           style={{
//             animationDelay: "0.2s",
//             backgroundColor: sameSender
//               ? "rgba(255, 255, 255, 0.6)"
//               : "rgba(0, 123, 255, 0.6)",
//           }}
//         />
//         <BouncingSkeleton
//           variant="circular"
//           width="0.9375rem"
//           height="0.9375rem"
//           style={{
//             animationDelay: "0.4s",
//             backgroundColor: sameSender
//               ? "rgba(255, 255, 255, 0.6)"
//               : "rgba(0, 123, 255, 0.6)",
//           }}
//         />
//         <BouncingSkeleton
//           variant="circular"
//           width="0.9375rem"
//           height="0.9375rem"
//           style={{
//             animationDelay: "0.6s",
//             backgroundColor: sameSender
//               ? "rgba(255, 255, 255, 0.6)"
//               : "rgba(0, 123, 255, 0.6)",
//           }}
//         />
//       </Stack>
//     </Box>
//   );
// };

export const TypingLoader = ({ sameSender }) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "primary.main" : "grey.100",
        borderRadius: "1rem",
        padding: "0.5rem 0.75rem",
        minWidth: "2.75rem",
        maxHeight: "2rem",
      }}
    >
      {[0, 1, 2].map((i) => (
        <Dot
          key={i}
          sx={{
            backgroundColor: sameSender ? "white" : "grey.500",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </Box>
  );
};
