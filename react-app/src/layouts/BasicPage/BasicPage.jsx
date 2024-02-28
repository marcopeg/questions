import React, { useEffect, useRef, forwardRef } from "react";
import { Box } from "@mui/material";
import useBrowser from "../../utils/use-browser";
import TitleBar from "./TitleBar";
import FooterBar from "./FooterBar";
import PageWrapper from "./styled/PageWrapper";
import PageBody from "./styled/PageBody";
import { isFullScreen, IOS_SPACING_BOTTOM } from "../../utils/is-fullscreen";
import { useScrollCallback } from "./use-scroll";

const BasicPage = (
  {
    id = Math.random(),
    fullpage,
    standalone,
    height = "100%",
    title,
    subtitle,
    backTo,
    actions,
    children,
    footer,
    sx,
    onScroll = () => {},
    onScrollDebounce = 250,
    onScrollPrecision = 0.001,
    wrapperProps = {},
    titleProps = {}
  },
  apiRef
) => {
  const { isMobile } = useBrowser();
  const bodyRef = useRef(null);

  // Used to sync the scrollbar
  useScrollCallback(() => {}, {
    id,
    targetRef: bodyRef,
    debounce: 0,
    precision: 0.001,
    evtName: "scrolling"
  });

  // Used to capture a full scroll and offer APIs
  const { scrollTo } = useScrollCallback(onScroll, {
    id,
    targetRef: bodyRef,
    debounce: onScrollDebounce,
    precision: onScrollPrecision
  });

  // Expose the api to scroll with the scrollEnd debounced callbacks.
  useEffect(() => {
    if (apiRef) {
      apiRef.current = { scrollTo };
    }
  }, [id]);

  const _wrapperProps = {
    ...wrapperProps,
    fullpage: String(fullpage),
    ismobile: String(isMobile),
    scrollable: "true",
    spacing: 0,
    sx
  };

  const _titleProps = { ...titleProps, id, title, subtitle, backTo, actions };

  const page = (
    <PageWrapper {..._wrapperProps} elevation={0}>
      {/* <TitleBar {..._titleProps} /> */}
      {/* <PageBody ref={bodyRef} scrollable="true">
        {children}
        {isFullScreen() && <Box sx={{ minHeight: IOS_SPACING_BOTTOM }} />}
      </PageBody> */}
      {/* <PageBody ref={bodyRef} scrollable="true">
        {children}
      </PageBody> */}
      {/* <Box sx={{
        flexGrow: 1,
        // display: "flex",
        // flexDirection: "column",
        // height,
        // width: "100%",
        background: 'yellow',
        color: 'black'
      }}>
        dwedewdew
        </Box> */}
      {/* {footer && <FooterBar>{footer}</FooterBar>} */}
      fooo
    </PageWrapper>
  );

  return page;
  // return standalone ? (
  //   <Box
  //     component="main"
  //     sx={{
  //       display: "flex",
  //       flexDirection: "column",
  //       height,
  //       width: "100%",
  //       background: 'yellow'
  //     }}
  //   >
  //     {/* {page} */}
  //     xxx
  //   </Box>
  // ) : (
  //   page
  // );
};

export default forwardRef(BasicPage);
