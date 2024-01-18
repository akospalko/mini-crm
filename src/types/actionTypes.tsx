// REDUCER 
export enum REDUCER_ACTION_TYPE_CLIENT {
  CREATE_CLIENT = "CREATE_CLIENT",
  UPDATE_CLIENT = "UPDATE_CLIENT",
  UPDATE_FILTERED_CLIENTS = "UPDATE_FILTERED_CLIENTS",
  UPDATE_ACTIVE_CLIENT = "UPDATE_ACTIVE_CLIENT",
  DELETE_CLIENT = "DELETE_CLIENT",
}
export enum REDUCER_ACTION_TYPE_PROPERTY {
  CREATE_PROPERTY = "CREATE_PROPERTY",
  UPDATE_PROPERTY = "UPDATE_PROPERTY",
  UPDATE_ACTIVE_PROPERTY = "UPDATE_ACTIVE_PROPERTY",
  DELETE_PROPERTY = "DELETE_PROPERTY",
}

// ACTIVE MENU
export enum ACTIVE_MENU_ACTION_TYPE {
  DEFAULT = "DEFAULT",
  CREATE_CLIENT = "CREATE_CLIENT",
  EDIT_CLIENT = "EDIT_CLIENT",
  CREATE_PROPERTY = "CREATE_PROPERTY",
  EDIT_PROPERTY = "EDIT_PROPERTY",
}

// ACTIVE MANAGEMENT
export enum ACTIVE_MANAGEMENT {
  CLIENT_MANAGEMENT = "CLIENT_MANAGEMENT",
  PROPERTY_MANAGEMENT = "PROPERTY_MANAGEMENT"
}

export enum PAGE_ROUTES {
  CLIENTS_LIST = "/clients",
  CLIENTS_FILTERED = "/clients-filtered",
  MANAGE_CLIENTS = "/manage-clients",
  MANAGE_PROPERTIES = "/manage-properties"
}

export enum DATABASE_RESOURCES {
  CLIENTS = "clients",
  PROPERTIES = "properties"
}