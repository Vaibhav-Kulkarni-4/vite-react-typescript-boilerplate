import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Loader.module.scss";

interface ILoaderProps {
  isLoading: boolean;
  loaderMessage?: string;
}

const Loader: React.FC<ILoaderProps> = ({ isLoading, loaderMessage }) => {
  return (
    isLoading && (
      <div className={styles.loaderOverlayContainer}>
        <div className={styles.loaderContainer}>
          <svg width={0} height={0}>
            <defs>
              <linearGradient
                id="my_gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress
            size="3.5rem"
            sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
          />
          <div>{loaderMessage}</div>
        </div>
      </div>
    )
  );
};

export default Loader;
