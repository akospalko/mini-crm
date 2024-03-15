// Display a list of clients: full (default) or filtered (based on role)
import { ReactElement, memo } from "react";
import EmptyList from "./EmptyList";
import MemoizedClientCard from "./ClientCard";
import {
  ClientItemI,
  ClientListPropsI,
  BASIC_CLIENT_DATA_FIELD,
  ClientPropertyRemappedI,
  ClientPropertyI,
  ClientItemWithoutPropertiesI,
  ClientDataI,
} from "../types/types";

const ClientList = ({ data }: ClientListPropsI) => {
  if (!Array.isArray(data)) {
    console.error("ClientList: Data must be an array.");
    return null;
  }

  // UTIL
  // Remap client's properties[] to direct client entry
  const remappedClients = data.map((client: ClientItemI) => {
    const remappedProperties: ClientPropertyRemappedI =
      client.properties.reduce(
        (acc: ClientPropertyRemappedI, property: ClientPropertyI) => {
          acc[property.label] = property.value;
          return acc;
        },
        {}
      );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { properties, ...clientWithoutProperties } = client;
    return { ...clientWithoutProperties, ...remappedProperties };
  });

  // JSX
  // Display the remapped client cards
  const displayedList: ReactElement[] = remappedClients.map(
    (client: ClientItemWithoutPropertiesI) => {
      const basicInfoGroup: ClientPropertyRemappedI &
        ClientItemWithoutPropertiesI = {} as ClientPropertyRemappedI &
        ClientItemWithoutPropertiesI;
      const propertyGroup: ClientPropertyRemappedI &
        ClientItemWithoutPropertiesI = {} as ClientPropertyRemappedI &
        ClientItemWithoutPropertiesI;
      const enumKeys: BASIC_CLIENT_DATA_FIELD[] = Object.values(
        BASIC_CLIENT_DATA_FIELD
      );

      // Iterate over the keys of the client object
      Object.keys(client).forEach((key) => {
        // Check if the key is included in the CLIENT_FIELD_ENUM
        if (enumKeys.includes(key as BASIC_CLIENT_DATA_FIELD)) {
          // Add to basic info group
          basicInfoGroup[key] = client[key as BASIC_CLIENT_DATA_FIELD];
        } else {
          // Add to property info group
          propertyGroup[key] = client[key as BASIC_CLIENT_DATA_FIELD];
        }
      });

      const clientData: ClientDataI[] = [
        { key: "basic_info", data: basicInfoGroup }, // key can be used as label if converted
        { key: "properties_info", data: propertyGroup },
      ];

      // Return client card
      return (
        <div
          className="flex flex-col overflow-hidden rounded-md bg-color_2"
          key={client.id}
        >
          <MemoizedClientCard clientData={clientData} />
        </div>
      );
    }
  );

  return (
    <div data-testid="client-list" className="flex w-full flex-col gap-5">
      {data.length > 0 ? displayedList : <EmptyList />}
    </div>
  );
};

const MemoizedCartLineItem = memo(ClientList);
export default MemoizedCartLineItem;
