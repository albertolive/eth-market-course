import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const handler = (web3, contract) => (course, account) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
    async () => {
      const courseHash = createCourseHash(web3)(course.id, account);
      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();

      if (ownedCourse.owner === ZERO_ADDRESS) return null;

      return normalizeOwnedCourse(web3)(course, ownedCourse);
    }
  );

  return swrRes;
};
