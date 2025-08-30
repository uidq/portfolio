"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong! (totally not our fault)</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again please!
      </button>
    </div>
  );
}
