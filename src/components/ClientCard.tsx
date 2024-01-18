// Client list member element - card item
import { useMemo, ReactNode } from "react";
import { ClientCardPropsI, PropertyItemRemappedT, PropertyTypeE, ClientKeys, ClientPropertyI } from "../types/types";
import useProperty from "../hooks/useProperty";

// COMPONENT
const ClientCard = ({clientData}: ClientCardPropsI) => {
  // CONTEXT
  const {property} = useProperty();

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
  const clientItemStyle: string = "flex flex-col p-4 bg-slate-500 rounded-md";
  const clientItemCategoryStyle: string = "flex items-center p-2 bg-gray-900 bg-opacity-50 text-gray-300 rounded-md mb-0 h-10 text-lg mt-2 first:mt-0";
  const clientItemContent: string = "grid grid-cols-2 gap-2 h-12 w-full";
  const clientItemContentTitle: string = "flex justify-start items-center w-full h-full text-lg p-2";
  const clientItemContentValue: string = "flex justify-center items-center w-full h-full text-lg p-2"

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
              <span className={clientItemContentTitle}>{convertedProperty.label}</span>
              <span className={clientItemContentValue}>
              <span>{property.value ? "yes" : "no"}</span> 
              </span>
            </div>
          );
        } else if (convertedProperty) {
          basicInfoElements.push(
            <div key={property.id} className={clientItemContent}>
              <span className={clientItemContentTitle}>{convertedProperty.label}</span>
              <span className={clientItemContentValue}>{property.value}</span>
            </div>
          );
        }
      });
    } else {
      propertyElements.push(
        <div key={key} className={clientItemContent}>
          <span className={clientItemContentTitle}>{key}</span>
          <span className={clientItemContentValue}>{clientData[key]}</span>
        </div>
      );
    }
  });

  return (
    <div className={clientItemStyle}> 
      <h3 className={clientItemCategoryStyle}>Basic info</h3>  
      { propertyElements }
      { !!basicInfoElements.length && (
        <>
          <h3 className={clientItemCategoryStyle}>Properties</h3> 
          { basicInfoElements }
        </>
      )}
      
   
    </div>
  )
}

export default ClientCard;