import { registerIcon } from "../SVGIconRegistry.js";

const name = "sap-icon://hello-world";
const d = "M252 64q30 0 56.5 11.5t46 31.5 31 46 11.5 56q0 29-11.5 55t-31 45.5-46 31T252 352t-56-11.5-45.5-31T120 264t-11-55q0-30 11-56t30.5-46T196 75.5 252 64zm0 25q-20 9-31 32.5T206 165h94q-6-21-15.5-43T252 89zm-49 96q-1 6-1 11.5V220l1 11h100q0-5 .5-11t.5-12-.5-11.5-.5-11.5H203zm19-98q-29 8-52 28.5T136 165h51q4-20 12.5-41.5T222 87zm-94 121q0 14 3 23h53q-1-5-1-11v-23.5l1-11.5h-53q-3 12-3 23zm8 43q11 29 34 49.5t52 28.5q-14-15-22.5-36T187 251h-51zm116 76q22-9 32.5-32.5T300 251h-94q4 20 15 43.5t31 32.5zm32 2q29-8 52-28.5t34-49.5h-51q-3 21-12 42t-23 36zm94-121q0-11-3-23h-53q0 6 .5 11.5t.5 11.5-.5 12-.5 11h53q3-9 3-23zm-8-43q-11-29-34-49.5T284 87q14 15 23 36.5t12 41.5h51zM448 0q27 0 45.5 19T512 64v288q0 26-18.5 45T448 416h-32v75q0 10-6.5 15.5T395 512q-7 0-12-4l-79-91-240-1q-26 0-45-19T0 352V64q0-26 19-45T64 0h384zm32 64q0-13-9-22.5T448 32H64q-13 0-22.5 9.5T32 64v288q0 14 9.5 23t22.5 9h256l64 80v-80h64q14 0 23-9t9-23V64z";

registerIcon(name, d);
