import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../Redux/features/StateSlice";


type Props = {
  state?: string,
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
    }
  }, [dispatch, props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;