export const convertTimestampEpochToISO = (
  timestampEpoch: bigint | number
): string => {
  const timestamp =
    typeof timestampEpoch === "bigint"
      ? Number(timestampEpoch)
      : timestampEpoch;
  return new Date(timestamp).toISOString();
};
