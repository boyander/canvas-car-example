/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Point } from "../types/Point";

const checkLimits = (pos: Point) => {
  if (pos.x < 600 && pos.x > -50 && pos.y < 400 && pos.y > -20) {
    return true;
  }
  return false;
};

export default checkLimits;
