// (C) 2021-2024 GoodData Corporation

import React from "react";

import { IIconProps } from "../typings.js";

/**
 * @internal
 */
export const Schedule: React.FC<IIconProps> = ({ color = "#94A1AD", className, width = 14, height = 14 }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.3545 2.34961C11.6689 2.66406 11.9469 3.00358 12.1885 3.36816C12.43 3.72819 12.6328 4.10872 12.7969 4.50977C12.9609 4.90625 13.0863 5.31868 13.1729 5.74707C13.2594 6.1709 13.3027 6.60612 13.3027 7.05273C13.3027 7.49479 13.2594 7.93001 13.1729 8.3584C13.0863 8.78678 12.9609 9.19922 12.7969 9.5957C12.6328 9.99219 12.43 10.3727 12.1885 10.7373C11.9469 11.1019 11.6689 11.4391 11.3545 11.749C11.04 12.0635 10.7005 12.3438 10.3359 12.5898C9.97591 12.8314 9.59538 13.0342 9.19434 13.1982C8.79785 13.3623 8.38542 13.4854 7.95703 13.5674C7.52865 13.654 7.09342 13.6973 6.65137 13.6973C6.20475 13.6973 5.76725 13.654 5.33887 13.5674C4.91504 13.4854 4.5026 13.3623 4.10156 13.1982C3.70508 13.0342 3.32454 12.8314 2.95996 12.5898C2.59993 12.3438 2.2627 12.0635 1.94824 11.749C1.63379 11.4391 1.35579 11.1019 1.11426 10.7373C0.872721 10.3727 0.667643 9.99219 0.499023 9.5957C0.334961 9.19922 0.209635 8.78678 0.123047 8.3584C0.0410156 7.93001 0 7.49479 0 7.05273C0 6.60612 0.0410156 6.1709 0.123047 5.74707C0.209635 5.31868 0.334961 4.90625 0.499023 4.50977C0.667643 4.10872 0.872721 3.72819 1.11426 3.36816C1.35579 3.00358 1.63379 2.66406 1.94824 2.34961C2.2627 2.03516 2.59993 1.75716 2.95996 1.51562C3.32454 1.27409 3.70508 1.07129 4.10156 0.907227C4.5026 0.738607 4.91504 0.613281 5.33887 0.53125C5.76725 0.444661 6.20475 0.401367 6.65137 0.401367C7.09342 0.401367 7.52865 0.444661 7.95703 0.53125C8.38542 0.613281 8.79785 0.738607 9.19434 0.907227C9.59538 1.07129 9.97591 1.27409 10.3359 1.51562C10.7005 1.75716 11.04 2.03516 11.3545 2.34961ZM6.65137 13C7.47168 13 8.24186 12.8451 8.96191 12.5352C9.68652 12.2207 10.3177 11.7946 10.8555 11.2568C11.3932 10.7191 11.8171 10.0902 12.127 9.37012C12.4414 8.64551 12.5986 7.87305 12.5986 7.05273C12.5986 6.23242 12.4414 5.46224 12.127 4.74219C11.8171 4.01758 11.3932 3.38639 10.8555 2.84863C10.3177 2.30632 9.68652 1.88021 8.96191 1.57031C8.24186 1.25586 7.47168 1.09863 6.65137 1.09863C5.83105 1.09863 5.05859 1.25586 4.33398 1.57031C3.61393 1.88021 2.98275 2.30632 2.44043 2.84863C1.90267 3.38639 1.47656 4.01758 1.16211 4.74219C0.852214 5.46224 0.697266 6.23242 0.697266 7.05273C0.697266 7.87305 0.852214 8.64551 1.16211 9.37012C1.47656 10.0902 1.90267 10.7191 2.44043 11.2568C2.98275 11.7946 3.61393 12.2207 4.33398 12.5352C5.05859 12.8451 5.83105 13 6.65137 13ZM10.5889 4.77637C10.639 4.8584 10.6504 4.94727 10.623 5.04297C10.6003 5.13411 10.5456 5.20475 10.459 5.25488L6.82227 7.35352C6.82227 7.35352 6.81999 7.35579 6.81543 7.36035C6.81087 7.36035 6.80859 7.36035 6.80859 7.36035C6.80404 7.36491 6.7972 7.36947 6.78809 7.37402C6.78353 7.37402 6.77897 7.37402 6.77441 7.37402C6.77441 7.37858 6.77214 7.38086 6.76758 7.38086C6.76302 7.38086 6.75618 7.38314 6.74707 7.3877C6.74251 7.3877 6.73796 7.3877 6.7334 7.3877C6.7334 7.3877 6.73112 7.3877 6.72656 7.3877C6.72201 7.39225 6.71517 7.39453 6.70605 7.39453C6.7015 7.39453 6.69694 7.39453 6.69238 7.39453C6.68327 7.39909 6.67415 7.40137 6.66504 7.40137C6.66048 7.40137 6.65592 7.40137 6.65137 7.40137C6.64681 7.40137 6.64225 7.40137 6.6377 7.40137C6.63314 7.40137 6.62858 7.40137 6.62402 7.40137C6.62402 7.40137 6.62174 7.40137 6.61719 7.40137C6.61263 7.39681 6.60807 7.39453 6.60352 7.39453C6.59896 7.39453 6.5944 7.39453 6.58984 7.39453C6.58529 7.39453 6.58301 7.39453 6.58301 7.39453C6.58301 7.39453 6.58073 7.39453 6.57617 7.39453C6.57617 7.39453 6.57389 7.39453 6.56934 7.39453C6.56934 7.38997 6.56706 7.3877 6.5625 7.3877C6.5625 7.3877 6.56022 7.3877 6.55566 7.3877C6.55111 7.3877 6.54655 7.3877 6.54199 7.3877C6.54199 7.38314 6.54199 7.38086 6.54199 7.38086C6.54199 7.38086 6.53971 7.38086 6.53516 7.38086C6.5306 7.38086 6.52604 7.38086 6.52148 7.38086C6.52148 7.3763 6.52148 7.37402 6.52148 7.37402C6.51693 7.37402 6.51237 7.37402 6.50781 7.37402C6.50326 7.36947 6.4987 7.36719 6.49414 7.36719C6.49414 7.36263 6.49414 7.36035 6.49414 7.36035C6.48958 7.36035 6.48503 7.36035 6.48047 7.36035C6.48047 7.35579 6.47819 7.35352 6.47363 7.35352C6.47363 7.35352 6.47135 7.35124 6.4668 7.34668C6.4668 7.34668 6.46452 7.34668 6.45996 7.34668C6.4554 7.34212 6.45312 7.33984 6.45312 7.33984C6.45312 7.33984 6.45085 7.33984 6.44629 7.33984L3.58203 5.33008C3.50456 5.27539 3.45671 5.2002 3.43848 5.10449C3.42025 5.00879 3.43848 4.9222 3.49316 4.84473C3.55241 4.7627 3.6276 4.71484 3.71875 4.70117C3.81445 4.68294 3.90332 4.70117 3.98535 4.75586L6.66504 6.63574L10.1104 4.64648C10.1969 4.59635 10.2858 4.58496 10.377 4.6123C10.4727 4.63509 10.5433 4.68978 10.5889 4.77637Z"
                fill={color}
            />
        </svg>
    );
};