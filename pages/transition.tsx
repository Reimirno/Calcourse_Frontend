/*
transition.tsx
Description: A wrapper that could creates a transition effect on pages.
Author: Yu Long
*/
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

const TIMEOUT = 300;
const getTransitionStyles = {
  entering: {
    //position: `absolute`,
    opacity: 0,
    //transform: `translateX(50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    //transform: `translateX(0px)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    //transform: `translateX(-50px)`,
  },
  // exited: {
  //   position: `absolute`,
  //   opacity: 0,
  //   //transform: `translateX(50px)`,
  // },
};
const Transition = ({ children, location }) => {
  return (
    // <TransitionGroup style={{ position: "relative" }}>
    <TransitionGroup>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};
export default Transition;
