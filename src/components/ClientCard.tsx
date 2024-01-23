// Client list member element - card item
import {useMemo, ReactNode} from "react";
import {ClientCardPropsI, PropertyItemRemappedT, PropertyTypeE, ClientKeys, ClientPropertyI} from "../types/types";
import useProperty from "../hooks/useProperty";
import text from "../data/text.json";

// COMPONENT
const ClientCard = ({clientData}: ClientCardPropsI) => {
  // CONTEXT
  const {property} = useProperty();

  // MEMO
  const convertedPropertyData: Record<string, PropertyItemRemappedT> = useMemo(() => {
    return property?.reduce((accumulator: Record<string, PropertyItemRemappedT>, { id, ...rest }) => {
      accumulator[id] = { ...rest, type: rest.type as unknown as PropertyTypeE };
      return accumulator;
    }, {});
  }, [property]);

    const clientKeys: ClientKeys[] = useMemo(() => {
    return Object.keys(clientData) as ClientKeys[];
  }, [clientData]);

  // STYLES
  const clientItemStyle: string = "flex flex-col p-5 bg-color_2 rounded-md";
  const clientItemCategoryStyle: string = "flex items-center justify-center text-color_3 rounded-md h-10 text-xl my-2 first:mt-0";
  const clientItemContent: string = "grid grid-cols-1 gap-3 min-h-[50px] w-full mb-4";
  const clientItemContentTitle: string = "w-full h-full bg-color_6 text-color-4 rounded text-base capitalize p-2 truncate";
  const clientItemContentValue: string = "w-full h-full text-base pl-2"

  // JSX
  const basicInfoElements: ReactNode[] = [];
  const propertyElements: ReactNode[] = [];

  clientKeys.forEach((key: ClientKeys) => {
    if (key === "id") return;
    else if (key === "properties") {
      clientData[key].forEach((property: ClientPropertyI) => {

        const convertedProperty: PropertyItemRemappedT = convertedPropertyData && convertedPropertyData[property.id];
        if (convertedProperty && convertedProperty.type === PropertyTypeE.checkbox) {
          basicInfoElements.push(
            <div key={property.id} className={clientItemContent}>
              <span title={convertedProperty.label} className={clientItemContentTitle}>{convertedProperty.label}</span>
              <span className={clientItemContentValue}>
              <span>{property.value ? "yes" : "no"}</span> 
              </span>
            </div>
          );
        } else if (convertedProperty) {
          basicInfoElements.push(
            <div key={property.id} className={clientItemContent}>
              <span title={convertedProperty.label} className={clientItemContentTitle}>{convertedProperty.label}</span>
              <span className={clientItemContentValue}>{property.value}</span>
            </div>
          );
        }
      });
    } else {
      propertyElements.push(
        <div key={key} className={clientItemContent}>
          <span title={key} className={clientItemContentTitle}>{key}</span>
          <span className={clientItemContentValue}>{clientData[key]}</span>
        </div>
      );
    }
  });

  return (
    <div data-testid="client-list-card" className={clientItemStyle}> 
      <h3 className={clientItemCategoryStyle}>{text["title-client-card-basic-info"]}</h3>  
      {propertyElements}
      {!!basicInfoElements.length && (
        <>
          <h3 className={clientItemCategoryStyle}>{text["title-client-card-properties"]}</h3> 
          {basicInfoElements}
        </>
      )}
    </div>
  )
}

export default ClientCard;