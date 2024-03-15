// TODO: Add info field textarea toggle dropdown
// Client card & related logic: map out info groups, group associated data
import { memo, useMemo } from "react";
import { objKeysToLabels } from "../utility/misc";
import {
  ClientCardPropsI,
  ClientDataI,
  ClientPropertyRemappedI,
  ClientItemWithoutPropertiesI,
} from "../types/types";

const ClientCard = ({ clientData }: ClientCardPropsI) => {
  const memoizedGroupHeader = useMemo(() => {
    return (title: string) => (
      <h3 className="flex items-center justify-center bg-color_6 p-2">
        {objKeysToLabels(title, true)}
      </h3>
    );
  }, []);

  const memoizedGroupData = useMemo(() => {
    return (data: ClientPropertyRemappedI & ClientItemWithoutPropertiesI) => (
      <div className="flex flex-col rounded-md bg-color_2 p-5">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="my-2 flex h-10 items-center justify-center rounded-md text-xl text-color_3 first:mt-0"
            data-testid="client-list-card"
          >
            <div className="text-color-4 items-centertruncate flex h-full w-[200px] justify-center rounded bg-color_6 p-2 text-base capitalize">
              {objKeysToLabels(key, true) || "-"}
            </div>
            <div className="flex h-full w-full items-center pl-2 text-base">
              {value.toString() || "-"}
            </div>
          </div>
        ))}
      </div>
    );
  }, []);

  return (
    <>
      {clientData.map((dataGroup: ClientDataI) => (
        <div key={dataGroup.key}>
          {memoizedGroupHeader(dataGroup.key)}
          {memoizedGroupData(dataGroup.data)}
        </div>
      ))}
    </>
  );
};

const MemoizedClientCard = memo(ClientCard);
export default MemoizedClientCard;
