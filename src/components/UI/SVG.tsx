// Document to store project's svg-s as components
import {ReactElement, CSSProperties } from "react";
import testID from "../../data/data_test_id.json";

// TYPES
type IconWrapperStyleType = {
  children: ReactElement | ReactElement[],
  wrapperCustomStyle?: CSSProperties 
}
type IconComponentType = {
  width?: string,
  height?: string,
  fill?: string,
  fill2?: string,
  stroke?: string,
  strokeWidth?: string,
  wrapperCustomStyle?: CSSProperties 
}

// ICON WRAPPER
function IconWrapper ({children, wrapperCustomStyle}: IconWrapperStyleType): ReactElement | ReactElement[] {
  return (
    <div 
      data-testid={testID["icon"]}
      className="flex justify-center items-center w-full h-full"
      style={{...wrapperCustomStyle}}
    >
      {children}
    </div>
  )
}

// ICON COMPONENTS
// Plus / add
export function PlusIcon({width, height, fill, stroke, strokeWidth, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ||  "100%"}
        height={height || "100%"}
        viewBox="0 0 16 16"
      >
        <path
          fill={fill || "#888" }
          stroke={stroke || "#000" }
          strokeWidth={strokeWidth || "0.5"}
          d="M8 2a1 1 0 00-1 1v4H3a1 1 0 100 2h4v4a1 1 0 102 0V9h4a1 1 0 100-2H9V3a1 1 0 00-1-1z"
        ></path>
      </svg>
    </IconWrapper>
  );
}

// Delete 
export function DeleteIcon({width, height, fill}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1024 1024"
        width={width || "100%"}
        height={height || "100%"}
        fill={fill || "#888"}
      >
        <path d="M160 256H96a32 32 0 010-64h256V95.936a32 32 0 0132-32h256a32 32 0 0132 32V192h256a32 32 0 110 64h-64v672a32 32 0 01-32 32H192a32 32 0 01-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32zm192 0a32 32 0 01-32-32V416a32 32 0 0164 0v320a32 32 0 01-32 32z"></path>
      </svg>
    </IconWrapper>
  );
}

// Edit 
export function EditIcon({width, height, fill}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        width={width || "100%"}
        height={height || "100%"}
        fill={fill || "#888"}
      >
        <g>
          <path d="M18.52 4l-1 1H2V4zM2 8v1h11.52l1-1zm4.52 8H2v1h3.655a1.477 1.477 0 01.282-.417zM2 12v1h7.52l1-1zm20.95-6.066a.965.965 0 01.03 1.385L9.825 20.471 5.73 22.227a.371.371 0 01-.488-.487l1.756-4.097L20.15 4.491a.965.965 0 011.385.03zM9.02 19.728l-1.28-1.28-.96 2.24zM20.093 8.79L18.68 7.376 8.382 17.674l1.413 1.414zm1.865-2.445l-.804-.838a.42.42 0 00-.6-.007l-1.167 1.17L20.8 8.083l1.152-1.151a.42.42 0 00.006-.587z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </IconWrapper>
  );
}

// Close  
export function CloseIcon({width, height, fill}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 -0.5 21 21"
        width={width || "100%"}
        height={height || "100%"}
      >
        <g>
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g fill={fill || "#000"} transform="translate(-419 -240)">
              <g transform="translate(56 160)">
                <path d="M375.0183 90L384 98.554 382.48065 100 373.5 91.446 364.5183 100 363 98.554 371.98065 90 363 81.446 364.5183 80 373.5 88.554 382.48065 80 384 81.446z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </IconWrapper>
  );
}

// Display Client Page  
export function DisplayClientIcon({width, height, fill}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        width={width || "100%"}
        height={height || "100%"}
        fill={fill || "#888"}
      >
        <g>
          <path d="M1 21h22V3H1zm1-1V7h20v13zM22 4v2H2V4zM9.355 13.16a2.5 2.5 0 10-3.71 0A2.496 2.496 0 004 15.5V18h7v-2.5a2.496 2.496 0 00-1.645-2.34zM7.5 10A1.5 1.5 0 116 11.5 1.502 1.502 0 017.5 10zm2.5 7H5v-1.5A1.502 1.502 0 016.5 14h2a1.502 1.502 0 011.5 1.5zm3-7h7v1h-7zm0 3h7v1h-7zm1 3h5v1h-5z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </IconWrapper>
  );
}

// Manage Properties
export function ManagePropertiesIcon({width, height, fill}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        width={width || "100%"}
        height={height || "100%"}
        fill={fill || "#888"}
      >
        <g>
          <path d="M19 5h4v1h-4v4h-1V6h-4V5h4V1h1zm1 7h1v10H2V3h10v9zm-9 1H3v8h8zm0-9H3v8h8zm9 9h-8v8h8z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </IconWrapper>
  );
}

// Manage client
export function ManageClientIcon({width, height, fill}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        width={width || "100%"}
        height={height || "100%"}
        fill={fill || "#888"}
      >
        <g>
          <path d="M12 10.8A4.8 4.8 0 107.2 6a4.805 4.805 0 004.8 4.8zm0-8.6A3.8 3.8 0 118.2 6 3.804 3.804 0 0112 2.2zM4 22v-4.5A5.506 5.506 0 019.5 12h5a5.465 5.465 0 013.152 1H9.5A4.505 4.505 0 005 17.5V21h6v.999zm18-3v.999h-4V24h-1v-4.001h-4V19h4v-4h1v4z"></path>
          <path fill="none" d="M0 0h24v24H0z"></path>
        </g>
      </svg>
    </IconWrapper>
  );
}