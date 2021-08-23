export interface User {
    email?: string
    avatar?: string
    name?: string
    issuer?: string
    DIDToken?:string
    loading: boolean;
    isConnected: boolean
}

export interface GraphQlInfo {
    fieldNodes: Array<{
      selectionSet: {
        selections: Array<{
          name: {
            value: string;
          };
        }>;
      };
    }>;
  }