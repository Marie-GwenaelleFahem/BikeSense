// convert a timestamp epoch (data stored in the database) to ISO 8601
export const convertTimestampEpochToISO = (
  timestampEpoch: bigint | number
): string => {
  const timestamp =
    typeof timestampEpoch === "bigint"
      ? Number(timestampEpoch)
      : timestampEpoch;
  return new Date(timestamp).toISOString();
};
