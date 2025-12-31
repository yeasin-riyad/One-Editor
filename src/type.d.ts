import type { Connection } from "mongoose";

export {};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  } | undefined;
}
