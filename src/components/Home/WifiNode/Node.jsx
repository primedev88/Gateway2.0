import styles from './Node.module.css';
import propTypes from 'prop-types'


function Node(props) {
    const { mac } = props;
    return (
        <div
            className={styles.node}
        >
            <div className={styles.svg}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 5 5"
                    fill="none"
                >
                    <path
                        d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z"
                        fill="#03334E"
                    />
                </svg>
            </div>
            <div className={styles.mac}>
                {mac}
            </div>
        </div>
    );
}

export default Node;
Node.propTypes = { mac: propTypes.string }